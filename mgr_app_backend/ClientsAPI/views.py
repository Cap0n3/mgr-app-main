from django.shortcuts import render
from rest_framework import generics
from .models import Clients, Teacher
from django.contrib.auth.models import User
from .serializers import (
	CreateUserSerializer, 
	ReadUserSerializer, 
	UpdateUserSerializer, 
	ClientSerializer, 
	TeacherSerializer
) 
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrUser, IsAdminOrOwner, IsAdminOrTeacher, IsSignUp
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser
from rest_framework.exceptions import APIException
from django.core.exceptions import PermissionDenied
from .utils.exceptionhandler import PasswordCheckFailed

# ****************************************************** #
# *************** JWT TOKEN CUSTOM VIEWS *************** #
# ****************************************************** #

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)
		# Add custom claims
		if user.is_superuser:
			token['isAdmin'] = True
			token['username'] = user.username
			token['role'] = "Admin"
		else:
			token['isAdmin'] = False
			token['username'] = user.username
			token['fname'] = user.teacher.teacher_fname
			token['lname'] = user.teacher.teacher_lname
			token['teacher_id'] = user.teacher.id
			token['role'] = "User"

		return token

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer

# ************************************************ #
# *************** APP VIEW CLASSES *************** #
# ************************************************ #

# ================== #
# ====== USER ====== #
# ================== #

class CreateUserView(generics.CreateAPIView):
	'''
	View to create a new user during signup, a new teacher will be automatically 
	created after user creation (thx to post_save receiver from signals.py).
	
	Note : One user <=> one teacher
	'''
	serializer_class = CreateUserSerializer
	permission_classes = [IsSignUp]

class ListUpdateUserView(generics.RetrieveUpdateAPIView):
	'''
	View to view and update basic user account infos (username & password).
	'''
	queryset = User.objects.all()
	permission_classes = [IsAuthenticated, IsAdminOrUser]

	def get_serializer_class(self):
		'''
		Define dynamically which serializer to use. For GET requests, it'll use 
		ReadUserSerializer to avoid giving away critical infos like password hash
		to user.

		On the other hand for PUT requests, we'll use more fields to allow
		password update. 
		'''
		# Select correct serializer depending on request method
		method = self.request.method
		if method == "GET":
			return ReadUserSerializer
		elif method == "PUT":
			return UpdateUserSerializer
	
	def perform_update(self, serializer):
		isAdmin = self.request.user.is_superuser
		# Get current password entered by user
		currentPasswd = self.request.POST.get('current_password')
		# If not admin check old password
		if not isAdmin:
			# Get user instance (to use check_password)
			currentUser = self.request.user
			user = User.objects.get(username=currentUser)
			# Compare passwd entered by user with stored password (to allow password/username update)
			if user.check_password(currentPasswd):
				# Authorize update of profile infos (username and/or password)
				instance = serializer.save()
			else:
				raise PasswordCheckFailed
		elif isAdmin:
			# Skip password security check
			instance = serializer.save()

class DeleteUserView(generics.DestroyAPIView):
	'''
	View used to delete User, it'll also delete associated teacher.
	'''
	queryset = User.objects.all()
	serializer_class = CreateUserSerializer
	permission_classes = [IsAuthenticated, IsAdminOrUser]

# ===================== #
# ====== TEACHER ====== #
# ===================== #

class TeachersView(generics.ListAPIView):
	'''
	This view handles viewing of all teacher personal infos.
	Note : One user can have only one teacher
	'''
	queryset = Teacher.objects.all()
	serializer_class = TeacherSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		isAdmin = self.request.user.is_superuser
		currentUser = self.request.user
		if not isAdmin:
			# Get teacher linked to user
			linkedTeacher = Teacher.objects.filter(user=currentUser)
		allTeachers = Teacher.objects.all()
		return allTeachers if isAdmin else linkedTeacher

class UpdateTeacherView(generics.RetrieveUpdateAPIView):
	'''
	View used to update Teacher infos.
	'''
	queryset = Teacher.objects.all()
	serializer_class = TeacherSerializer
	permission_classes = [IsAuthenticated, IsAdminOrTeacher]

	def perform_update(self, serializer):
		instance = serializer.save()

# ===================== #
# ====== CLIENTS ====== #
# ===================== #

class ClientsView(generics.ListAPIView):
	'''
	View used to display all clients owned by a specific teacher.
	'''
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		isAdmin = self.request.user.is_superuser
		currentUser = self.request.user
		# Admin should not have a teacher associated
		if not isAdmin:
			# Get teacher linked to user
			linkedTeacher = Teacher.objects.get(user=currentUser)
		allClients = Clients.objects.all()
		return allClients if isAdmin else allClients.filter(teacher=linkedTeacher.id)

class ClientDetailView(generics.RetrieveAPIView):
	'''
	View used to display client informations.
	'''
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated, IsAdminOrOwner]

class CreateClientView(generics.CreateAPIView):
	# Parser => To handle multipart/form-data HTTP request 
	parser_classes = [MultiPartParser]
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated]

	def perform_create(self, serializer):
		isAdmin = self.request.user.is_superuser
		currentUser = self.request.user
		# Must send instance and not just pk
		if not isAdmin:
			linkedTeacher = Teacher.objects.get(user=currentUser)
			serializer.save(teacher=linkedTeacher)
		else:
			# Admin can choose to create a client for any teacher/user
			chosenTeacherId = self.request.POST['teacher']
			teacherInstance = Teacher.objects.get(id=chosenTeacherId)
			# Get user linked to specific teacher
			userID = teacherInstance.user.id
			linkedTeacher = Teacher.objects.get(user=userID)
			serializer.save(teacher=linkedTeacher)

class UpdateClientView(generics.RetrieveUpdateAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated, IsAdminOrOwner]

	def perform_update(self, serializer):
		instance = serializer.save()

class DeleteClientView(generics.DestroyAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated, IsAdminOrOwner]

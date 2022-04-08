from django.shortcuts import render
from rest_framework import generics
from .models import Clients, Teacher
from django.contrib.auth.models import User
from .serializers import UserSerializer, ClientSerializer, TeacherSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrUser, IsAdminOrOwner, IsAdminOrTeacher, IsSignUp
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser

# === JWT TOKEN CUSTOM VIEWS === #
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
			token['role'] = "User"

		return token

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer

# ======================== #
# === APP VIEW CLASSES === #
# ======================== #

# === TEACHER === #
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

# === USER === #
class CreateUserView(generics.CreateAPIView):
	'''
	View to create a new user, a new teacher must also be created at the same time
	(no user without exactly one teacher)
	'''
	#queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsSignUp]

	def createTeacher(self, _userInstance, **_userInfos):
		'''
		This custom method allow to create a teacher just after user creation for sign up.
		Teacher will inherit of basic user infos (first name, last name, email).

		Params
		------
		userInstance : User object
			Instance of user freshly created.
		
		userInfos : dict
			Dictionnary containing user infos.
		'''
		teacher = Teacher(user=_userInstance, teacher_fname=_userInfos["fname"], teacher_lname=_userInfos["lname"])
		teacher.save()
	
	def perform_create(self, serializer):
		username = self.request.POST["username"]
		fname = self.request.POST["first_name"]
		lname = self.request.POST["last_name"]
		email = self.request.POST["email"]

		userInfos = {
			"username" : username,
			"fname" : fname,
			"lname" : lname,
			"email" : email
		}
		# Crete user
		userInstance = serializer.save()

		# Create teacher
		self.createTeacher(userInstance, **userInfos)

class DeleteUserView(generics.DestroyAPIView):
	'''
	View used to delete User, it'll also delete associated teacher.
	'''
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated, IsAdminOrUser]

# === CLIENTS === #
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

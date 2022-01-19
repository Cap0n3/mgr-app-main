from django.shortcuts import render
from rest_framework import generics
from .models import Clients, Teacher
from .serializers import ClientSerializer, TeacherSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrOwner
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# === JWT TOKEN CUSTOM VIEWS === #
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)

		# Add custom claims
		token['fname'] = user.teacher.teacher_fname
		token['lname'] = user.teacher.teacher_lname
		# ...

		return token

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer

# === APP VIEW CLASSES === #
class TeachersView(generics.ListAPIView):
	queryset = Teacher.objects.all()
	serializer_class = TeacherSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		userID = self.request.user.id
		queryset = Teacher.objects.all()
		isAdmin = self.request.user.is_superuser
		return queryset if isAdmin else queryset.filter(user=userID)

class ClientsView(generics.ListAPIView):
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		userID = self.request.user.id
		queryset = Clients.objects.all()
		isAdmin = self.request.user.is_superuser
		return queryset if isAdmin else queryset.filter(teacher=userID)

class ClientDetailView(generics.RetrieveAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated, IsAdminOrOwner]

class CreateClientView(generics.CreateAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated]

	def perform_create(self, serializer):
		userID = self.request.user.id
		# Must send instance and not just pk
		teacherObj = Teacher.objects.get(pk=userID)
		serializer.save(teacher=teacherObj)

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

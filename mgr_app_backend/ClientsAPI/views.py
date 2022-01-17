from django.shortcuts import render
from rest_framework import generics
from .models import Clients, Teacher
from .serializers import ClientSerializer, TeacherSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

#TEST
class IsOwner(permissions.BasePermission):
	# def has_permission(self, request, view):
	# 	return True
		#return request.user and request.user.is_authenticated()

	def has_object_permission(self, request, view, obj):
		return obj.teacher.id == request.user.id
	

# Create your views here.
class TeachersView(generics.ListAPIView):
	queryset = Teacher.objects.all()
	serializer_class = TeacherSerializer
	permission_classes = [IsAuthenticated]

class ClientsView(generics.ListAPIView):
	#queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user.id
		return Clients.objects.filter(teacher=user)

class ClientDetailView(generics.RetrieveAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated, IsOwner]

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
	permission_classes = [IsAuthenticated]

class DeleteClientView(generics.DestroyAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer
	permission_classes = [IsAuthenticated]

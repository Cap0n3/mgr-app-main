from django.shortcuts import render
from rest_framework import generics
from .models import Clients, Teacher
from .serializers import ClientSerializer, TeacherSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions


class IsAdminOrOwner(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		isAdmin = request.user.is_superuser
		isOwner = obj.teacher.id == request.user.id
		if isAdmin:
			return True
		elif isOwner:
			return True
		else:
			return False

class TeachersView(generics.ListAPIView):
	queryset = Teacher.objects.all()
	serializer_class = TeacherSerializer
	permission_classes = [IsAuthenticated]

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

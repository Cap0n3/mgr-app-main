from django.shortcuts import render
from rest_framework import generics
from .models import Clients
from .serializers import ClientSerializer


# Create your views here.
class ClientsView(generics.ListAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer

class ClientDetailView(generics.RetrieveAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer

class CreateClientView(generics.CreateAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer

class UpdateClientView(generics.RetrieveUpdateAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer

class DeleteClientView(generics.DestroyAPIView):
	queryset = Clients.objects.all()
	serializer_class = ClientSerializer

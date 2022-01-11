from django.shortcuts import render
from rest_framework import generics
from .models import Clients
from .serializers import ClientSerializer


# Create your views here.
class ClientsView(generics.ListAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientSerializer

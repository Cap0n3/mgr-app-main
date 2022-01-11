from django.urls import path
from .views import *

urlpatterns = [
	path('clients/', ClientsView.as_view(), name="clients"),
	path('client/<pk>', ClientDetailView.as_view(), name="client-detail"),
]
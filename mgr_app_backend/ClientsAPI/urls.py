from django.urls import path
from .views import *

urlpatterns = [
    path('clients/', ClientsView.as_view(), name="dummy_view")
]
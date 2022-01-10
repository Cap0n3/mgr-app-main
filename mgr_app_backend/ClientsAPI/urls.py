from django.urls import path
from .views import *

urlpatterns = [
    path('dummy/', DummyView.as_view(), name="dummy_view")
]
from django.urls import path
from .views import *

urlpatterns = [
	path('teacher/', TeachersView.as_view(), name="teachers"),
	path('teacher/update/<pk>', UpdateTeacherView.as_view(), name="teacher-update"),
	path('user/delete/<pk>', DeleteUserView.as_view(), name="user-delete"),
	path('clients/', ClientsView.as_view(), name="clients"),
	path('client/<pk>', ClientDetailView.as_view(), name="client-detail"),
	path('client/create/', CreateClientView.as_view(), name="client-creation"),
	path('client/update/<pk>', UpdateClientView.as_view(), name="client-update"),
	path('client/delete/<pk>', DeleteClientView.as_view(), name="client-delete"),
]
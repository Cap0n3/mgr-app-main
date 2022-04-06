# Import de la classe "ModelSerializers"
from django.db.models import fields
from rest_framework import serializers
from django.conf import settings

# Import des modèles
from django.contrib.auth.models import User
from .models import Teacher
from .models import Clients

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
	class Meta:
		model = Teacher
		fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
	lesson_hour = serializers.TimeField(format=settings.TIME_FORMAT, input_formats=None)
	class Meta:
		model = Clients
		fields = '__all__'
		#exclude = ['teacher']
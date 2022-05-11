# Import de la classe "ModelSerializers"
from django.db.models import fields
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth.hashers import make_password

# Import des modèles
from django.contrib.auth.models import User
from .models import Teacher
from .models import Clients

class UserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(required=True, max_length=128, style={'input_type': 'password'})
	class Meta:
		model = User
		fields = ['id', 'username', 'first_name', 'last_name', 'is_active', 'email', 'password']
	
	# Hash Password
	def create(self, validated_data):
		validated_data['password'] = make_password(validated_data.get('password'))
		return super(UserSerializer, self).create(validated_data)

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
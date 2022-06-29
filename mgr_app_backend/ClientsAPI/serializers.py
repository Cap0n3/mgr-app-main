# Import de la classe "ModelSerializers"
from django.db.models import fields
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth.hashers import make_password

# Import des modèles
from django.contrib.auth.models import User
from .models import Teacher
from .models import Clients

class ReadUserSerializer(serializers.ModelSerializer):
	'''
	Used to serialize read informations about user (and not giving away password hash).
	'''
	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name', 'email']

class UserSerializer(serializers.ModelSerializer):
	'''
	Used to create new user and update existing user infos (username, password, etc...).

	Note : Only for user creation & update. Don't use this one for reading user infos since it'll 
	give away passsword hash
	'''
	password = serializers.CharField(required=True, max_length=128, style={'input_type': 'password'})
	class Meta:
		model = User
		fields = ['id', 'username', 'first_name', 'last_name', 'is_active', 'email', 'password']
	
	def create(self, validated_data):
		'''
		Hash Password (with pbkdf2) & create user
		'''
		validated_data['password'] = make_password(validated_data.get('password'))
		return super(UserSerializer, self).create(validated_data)

	def update(self, instance, validated_data):
		'''
		Update user information and new password
		'''
		instance.username = validated_data.get('username')
		instance.password = make_password(validated_data.get('password'))
		instance.save()
		return instance

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
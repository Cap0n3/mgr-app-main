# Import de la classe "ModelSerializers"
from django.db.models import fields
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth.hashers import make_password

# Import des modèles
from django.contrib.auth.models import User
from .models import Teacher
from .models import Clients

# ==================================== #
# =============== USER =============== #
# ==================================== #

class CreateUserSerializer(serializers.ModelSerializer):
	'''
	Used to create a new user during signup or delete user.

	Note : Only for user creation. Don't use this one for reading user infos since it'll 
	give away passsword hash.
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
		return super(CreateUserSerializer, self).create(validated_data)

class ReadUserSerializer(serializers.ModelSerializer):
	'''
	Used to serialize read informations about user (and not giving away password hash).
	'''
	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name', 'email']

class UpdateUserSerializer(serializers.ModelSerializer):
	'''
	Used to update user name and password.
	'''
	# Set password to "write only" to avoid returning hash in response when updating
	password = serializers.CharField(required=False, max_length=128, style={'input_type': 'password'}, write_only=True)
	class Meta:
		model = User
		fields = ['username', 'password']
	
	def update(self, instance, validated_data):
		'''
		Update user information and new password.
		'''
		# Get new password (if any)
		newPassword = validated_data.get('password')
		# Get other infos
		instance.username = validated_data.get('username')
		# Only replace password if a new one was entered (to avoid saving None or string "undefined" as password !)
		if newPassword != None and newPassword != "undefined" :
			instance.password = make_password(validated_data.get('password'))
		instance.save()
		return instance

# ======================================= #
# =============== TEACHER =============== #
# ======================================= #

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
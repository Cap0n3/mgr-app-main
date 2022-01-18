# Import de la classe "ModelSerializers"
from django.db.models import fields
from rest_framework import serializers

# Import du Modèle
from .models import Teacher
from .models import Clients

class TeacherSerializer(serializers.ModelSerializer):
	class Meta:
		model = Teacher
		fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Clients
		fields = '__all__'
		#exclude = ['teacher']
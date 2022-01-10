# Import de la classe "ModelSerializers"
from rest_framework import serializers

# Import du Modèle
from .models import Clients

# Création du serialiseur

class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Clients
		fields = '__all__'

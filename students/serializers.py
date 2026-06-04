from rest_framework import serializers
from .models import Etudiant, Filiere, Niveau

class FiliereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filiere
        fields = '__all__'

class NiveauSerializer(serializers.ModelSerializer):
    class Meta:
        model = Niveau
        fields = '__all__'

class EtudiantSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(
        source='user.full_name',
        read_only=True
    )
    email = serializers.CharField(
        source='user.email',
        read_only=True
    )
    filiere_nom = serializers.CharField(
        source='filiere.nom',
        read_only=True
    )
    niveau_nom = serializers.CharField(
        source='niveau.nom',
        read_only=True
    )

    class Meta:
        model = Etudiant
        fields = [
            'id', 'matricule', 'full_name', 'email',
            'filiere', 'filiere_nom', 'niveau', 'niveau_nom',
            'date_naissance', 'lieu_naissance',
            'annee_inscription', 'actif'
        ]
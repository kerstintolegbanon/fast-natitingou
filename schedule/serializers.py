from rest_framework import serializers
from .models import EmploiDuTemps

class EmploiDuTempsSerializer(serializers.ModelSerializer):
    matiere_nom = serializers.CharField(
        source='matiere.nom',
        read_only=True
    )
    enseignant_nom = serializers.CharField(
        source='enseignant.full_name',
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
        model = EmploiDuTemps
        fields = [
            'id', 'matiere', 'matiere_nom',
            'enseignant', 'enseignant_nom',
            'filiere', 'filiere_nom',
            'niveau', 'niveau_nom',
            'jour', 'heure_debut', 'heure_fin',
            'salle', 'type_cours'
        ]
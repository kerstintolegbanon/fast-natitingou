from rest_framework import serializers
from .models import Matiere, Note

class MatiereSerializer(serializers.ModelSerializer):
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
        model = Matiere
        fields = [
            'id', 'nom', 'code', 'credits', 'coefficient',
            'filiere', 'filiere_nom', 'niveau', 'niveau_nom',
            'enseignant', 'enseignant_nom'
        ]

class NoteSerializer(serializers.ModelSerializer):
    etudiant_nom = serializers.CharField(
        source='etudiant.user.full_name',
        read_only=True
    )
    matiere_nom = serializers.CharField(
        source='matiere.nom',
        read_only=True
    )
    matricule = serializers.CharField(
        source='etudiant.matricule',
        read_only=True
    )

    class Meta:
        model = Note
        fields = [
            'id', 'etudiant', 'etudiant_nom', 'matricule',
            'matiere', 'matiere_nom', 'note_exam', 'moyenne',
            'semestre', 'annee_academique', 'valide',
            'date_saisie', 'date_modification'
        ]
        read_only_fields = ['moyenne', 'date_saisie', 'date_modification']
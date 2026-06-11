from django.contrib import admin
from .models import Matiere, Note

@admin.register(Matiere)
class MatiereAdmin(admin.ModelAdmin):
    list_display = ['code', 'nom', 'filiere', 'niveau', 'enseignant']
    list_filter = ['filiere', 'niveau']
    search_fields = ['code', 'nom']

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['etudiant', 'matiere', 'note_exam', 'moyenne', 'valide']
    list_filter = ['valide', 'semestre', 'annee_academique']
    search_fields = ['etudiant__matricule', 'matiere__nom']
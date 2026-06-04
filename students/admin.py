from django.contrib import admin
from .models import Etudiant, Filiere, Niveau

@admin.register(Filiere)
class FiliereAdmin(admin.ModelAdmin):
    list_display = ['code', 'nom']
    search_fields = ['code', 'nom']

@admin.register(Niveau)
class NiveauAdmin(admin.ModelAdmin):
    list_display = ['nom']

@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ['matricule', 'user', 'filiere', 'niveau', 'actif']
    list_filter = ['filiere', 'niveau', 'actif']
    search_fields = ['matricule', 'user__first_name', 'user__last_name']
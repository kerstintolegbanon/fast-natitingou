from django.contrib import admin
from .models import EmploiDuTemps

@admin.register(EmploiDuTemps)
class EmploiDuTempsAdmin(admin.ModelAdmin):
    list_display = ['matiere', 'enseignant', 'filiere', 'niveau', 'jour', 'heure_debut', 'heure_fin', 'salle']
    list_filter = ['jour', 'filiere', 'niveau']
    search_fields = ['matiere__nom', 'salle']
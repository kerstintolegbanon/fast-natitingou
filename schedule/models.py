from django.db import models
from users.models import User
from grades.models import Matiere
from students.models import Filiere, Niveau

class EmploiDuTemps(models.Model):
    JOUR_CHOICES = [
        ('lundi', 'Lundi'),
        ('mardi', 'Mardi'),
        ('mercredi', 'Mercredi'),
        ('jeudi', 'Jeudi'),
        ('vendredi', 'Vendredi'),
        ('samedi', 'Samedi'),
    ]

    matiere = models.ForeignKey(
        Matiere,
        on_delete=models.CASCADE,
        related_name='emplois_du_temps'
    )
    enseignant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='emplois_du_temps'
    )
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.CASCADE,
        related_name='emplois_du_temps'
    )
    niveau = models.ForeignKey(
        Niveau,
        on_delete=models.CASCADE,
        related_name='emplois_du_temps'
    )
    jour = models.CharField(max_length=10, choices=JOUR_CHOICES)
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    salle = models.CharField(max_length=50)
    type_cours = models.CharField(
        max_length=10,
        choices=[('CM','Cours Magistral'), ('TD','Travaux Dirigés'), ('TP','Travaux Pratiques')],
        default='CM'
    )

    class Meta:
        verbose_name = "Emploi du temps"
        verbose_name_plural = "Emplois du temps"

    def __str__(self):
        return f"{self.matiere} - {self.jour} {self.heure_debut}"
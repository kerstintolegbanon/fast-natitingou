from django.db import models
from users.models import User

class Filiere(models.Model):
    nom = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Filière'
        verbose_name_plural = 'Filières'

    def __str__(self):
        return f"{self.code} - {self.nom}"


class Niveau(models.Model):
    NIVEAU_CHOICES = [
        ('L1', 'Licence 1'),
        ('L2', 'Licence 2'),
        ('L3', 'Licence 3'),
        ('M1', 'Master 1'),
        ('M2', 'Master 2'),
    ]
    nom = models.CharField(max_length=5, choices=NIVEAU_CHOICES, unique=True)

    class Meta:
        verbose_name = 'Niveau'
        verbose_name_plural = 'Niveaux'

    def __str__(self):
        return self.nom


class Etudiant(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='etudiant_profile'
    )
    matricule = models.CharField(max_length=20, unique=True)
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.SET_NULL,
        null=True,
        related_name='etudiants'
    )
    niveau = models.ForeignKey(
        Niveau,
        on_delete=models.SET_NULL,
        null=True,
        related_name='etudiants'
    )
    date_naissance = models.DateField(null=True, blank=True)
    lieu_naissance = models.CharField(max_length=100, blank=True)
    annee_inscription = models.IntegerField(default=2026)
    actif = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Étudiant'
        verbose_name_plural = 'Étudiants'

    def __str__(self):
        return f"{self.matricule} - {self.user.full_name}"
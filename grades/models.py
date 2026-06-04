from django.db import models
from students.models import Etudiant, Filiere, Niveau
from users.models import User

class Matiere(models.Model):
    nom = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    credits = models.IntegerField(default=3)
    coefficient = models.FloatField(default=1.0)
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.CASCADE,
        related_name='matieres'
    )
    niveau = models.ForeignKey(
        Niveau,
        on_delete=models.CASCADE,
        related_name='matieres'
    )
    enseignant = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='matieres_enseignees'
    )

    class Meta:
        verbose_name = 'Matière'
        verbose_name_plural = 'Matières'

    def __str__(self):
        return f"{self.code} - {self.nom}"


class Note(models.Model):
    etudiant = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        related_name='notes'
    )
    matiere = models.ForeignKey(
        Matiere,
        on_delete=models.CASCADE,
        related_name='notes'
    )
    note_cc = models.FloatField(
        null=True, blank=True,
        verbose_name='Contrôle Continu'
    )
    note_tp = models.FloatField(
        null=True, blank=True,
        verbose_name='Travaux Pratiques'
    )
    note_exam = models.FloatField(
        null=True, blank=True,
        verbose_name='Examen'
    )
    moyenne = models.FloatField(
        null=True, blank=True,
        verbose_name='Moyenne'
    )
    semestre = models.CharField(
        max_length=10,
        choices=[('S1','Semestre 1'), ('S2','Semestre 2')],
        default='S1'
    )
    annee_academique = models.CharField(max_length=9, default='2025-2026')
    valide = models.BooleanField(default=False)
    date_saisie = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
        unique_together = ['etudiant', 'matiere', 'semestre', 'annee_academique']

    def save(self, *args, **kwargs):
        # Calcul automatique de la moyenne
        notes = []
        if self.note_cc is not None:
            notes.append(self.note_cc * 0.3)
        if self.note_tp is not None:
            notes.append(self.note_tp * 0.2)
        if self.note_exam is not None:
            notes.append(self.note_exam * 0.5)
        if notes:
            self.moyenne = round(sum(notes), 2)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.etudiant} - {self.matiere} : {self.moyenne}"
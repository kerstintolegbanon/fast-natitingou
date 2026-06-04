from rest_framework import generics, permissions
from .models import EmploiDuTemps
from .serializers import EmploiDuTempsSerializer

class EmploiDuTempsListView(generics.ListCreateAPIView):
    serializer_class = EmploiDuTempsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return EmploiDuTemps.objects.all()
        elif user.role == 'teacher':
            return EmploiDuTemps.objects.filter(
                enseignant=user
            )
        elif user.role == 'student':
            try:
                etudiant = user.etudiant_profile
                return EmploiDuTemps.objects.filter(
                    filiere=etudiant.filiere,
                    niveau=etudiant.niveau
                )
            except:
                return EmploiDuTemps.objects.none()
        return EmploiDuTemps.objects.none()

class EmploiDuTempsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmploiDuTemps.objects.all()
    serializer_class = EmploiDuTempsSerializer
    permission_classes = [permissions.IsAuthenticated]
from rest_framework import generics, permissions
from .models import Etudiant, Filiere, Niveau
from .serializers import EtudiantSerializer, FiliereSerializer, NiveauSerializer

class IsAdminOrTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['admin', 'teacher']

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class FiliereListView(generics.ListCreateAPIView):
    queryset = Filiere.objects.all()
    serializer_class = FiliereSerializer
    permission_classes = [permissions.IsAuthenticated]

class NiveauListView(generics.ListAPIView):
    queryset = Niveau.objects.all()
    serializer_class = NiveauSerializer
    permission_classes = [permissions.IsAuthenticated]

class EtudiantListView(generics.ListCreateAPIView):
    serializer_class = EtudiantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Etudiant.objects.all()
        elif user.role == 'teacher':
            return Etudiant.objects.filter(actif=True)
        elif user.role == 'student':
            return Etudiant.objects.filter(user=user)
        return Etudiant.objects.none()

class EtudiantDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EtudiantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Etudiant.objects.all()
        elif user.role == 'student':
            return Etudiant.objects.filter(user=user)
        return Etudiant.objects.none()
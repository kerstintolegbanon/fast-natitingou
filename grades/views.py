from rest_framework import generics, permissions
from .models import Matiere, Note
from .serializers import MatiereSerializer, NoteSerializer

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['admin', 'teacher']

class MatiereListView(generics.ListCreateAPIView):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    permission_classes = [permissions.IsAuthenticated]

class MatiereDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    permission_classes = [permissions.IsAuthenticated]

class NoteListView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Note.objects.all()
        elif user.role == 'teacher':
            return Note.objects.filter(
                matiere__enseignant=user
            )
        elif user.role == 'student':
            return Note.objects.filter(
                etudiant__user=user
            )
        return Note.objects.none()

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Note.objects.all()
        elif user.role == 'teacher':
            return Note.objects.filter(
                matiere__enseignant=user
            )
        elif user.role == 'student':
            return Note.objects.filter(
                etudiant__user=user
            )
        return Note.objects.none()

class ValiderNoteView(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return Note.objects.all()

    def perform_update(self, serializer):
        serializer.save(valide=True)
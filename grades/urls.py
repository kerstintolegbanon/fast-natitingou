from django.urls import path
from .views import (
    MatiereListView, MatiereDetailView,
    NoteListView, NoteDetailView, ValiderNoteView
)

urlpatterns = [
    path('matieres/', MatiereListView.as_view(), name='matiere_list'),
    path('matieres/<int:pk>/', MatiereDetailView.as_view(), name='matiere_detail'),
    path('notes/', NoteListView.as_view(), name='note_list'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note_detail'),
    path('notes/<int:pk>/valider/', ValiderNoteView.as_view(), name='valider_note'),
]
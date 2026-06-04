from django.urls import path
from .views import EtudiantListView, EtudiantDetailView, FiliereListView, NiveauListView

urlpatterns = [
    path('', EtudiantListView.as_view(), name='etudiant_list'),
    path('<int:pk>/', EtudiantDetailView.as_view(), name='etudiant_detail'),
    path('filieres/', FiliereListView.as_view(), name='filiere_list'),
    path('niveaux/', NiveauListView.as_view(), name='niveau_list'),
]
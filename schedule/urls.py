from django.urls import path
from .views import EmploiDuTempsListView, EmploiDuTempsDetailView

urlpatterns = [
    path('', EmploiDuTempsListView.as_view(), name='edt_list'),
    path('<int:pk>/', EmploiDuTempsDetailView.as_view(), name='edt_detail'),
]
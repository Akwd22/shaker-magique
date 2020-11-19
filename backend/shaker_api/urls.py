from django.urls import path
from .views import *

app_name = 'shaker_api'

urlpatterns = [
    path('cocktails/<int:pk>/', CocktailDetail.as_view(), name='detailcreate'),
    path('cocktails/', CocktailList.as_view(), name='listcreate'),
    path('contenir/', ContenirList.as_view(), name='listcreate'),
    path('comptes/', CompteList.as_view(), name='listcreate'),
    path('favoris/', FavoriList.as_view(), name='listcreate'),
    path('ingredients/', IngredientList.as_view(), name='listcreate'),
    path('membres/', MembreList.as_view(), name='listcreate'),
    path('notes/', NoterList.as_view(), name='listcreate'),
    path('preferences/', PreferenceList.as_view(), name='listcreate'),
]
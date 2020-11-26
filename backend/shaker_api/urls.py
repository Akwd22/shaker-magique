from django.urls import path
from .views import *

app_name = 'shaker_api'

urlpatterns = [
    path('cocktails/<int:pk>/', CocktailDetail.as_view(), name='detailcreate'),
    path('cocktails/', CocktailList.as_view(), name='listcreate'),
    path('contenir/', ContenirList.as_view(), name='contenir'),
    path('comptes/', CompteList.as_view(), name='comptes'),
    path('favoris/', FavoriList.as_view(), name='favoris'),
    path('ingredients/', IngredientList.as_view(), name='ingredients'),
    path('membres/', MembreList.as_view(), name='membres'),
    path('notes/', NoterList.as_view(), name='notes'),
    path('preferences/', PreferenceList.as_view(), name='preferences'),
    path('stock/', StockerList.as_view(), name='stocker'),
    path('proposer/', ProposerList.as_view(), name='Proposer'),
]
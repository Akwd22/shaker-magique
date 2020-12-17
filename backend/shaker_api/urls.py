from django.urls import path, re_path
from .views import *

app_name = 'shaker_api'

urlpatterns = [
    path('cocktails/<int:pk>/', CocktailDetail.as_view(), name='cocktail-detail'),
    path('cocktails/', CocktailList.as_view(), name='cocktail-list'),
    path('cocktails/new', CocktailCreate.as_view(), name='cocktail-new'),
    path('cocktails/filtre/', CocktailSearch.as_view(), name='cocktail-search'),
    path('contenir/', ContenirList.as_view(), name='contenir'),
    path('favoris/', FavoriList.as_view(), name='favoris'),
    path('ingredients/', IngredientList.as_view(), name='ingredients'),
    path('notes/', NoterList.as_view(), name='notes'),
    path('preferences/', PreferenceList.as_view(), name='preferences'),
    path('preferences/<int:idmembre>', PreferenceListByMember.as_view(), name='preferencesByMember'),
    path('stock/', StockerList.as_view(), name='stocker'),
    path('proposer/', ProposerList.as_view(), name='proposer'),
    path('proposer/<int:idmembre>', ProposerListByMember.as_view(), name='proposer-member'),
    path('joindre_hote/', JoinHostAnon.as_view(), name='join-host-anon'),
    path('joindre_hote/<int:pk>', JoinHost.as_view(), name='join-host'),
]

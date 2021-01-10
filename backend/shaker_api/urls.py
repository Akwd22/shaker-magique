from django.urls import path, re_path
from .views import *

app_name = 'shaker_api'

urlpatterns = [
    path('cocktails/<int:pk>/', CocktailDetail.as_view(), name='cocktail-detail'),
    path('cocktails/', CocktailList.as_view(), name='cocktail-list'),
    path('cocktails/new', CocktailCreate.as_view(), name='cocktail-new'),
    path('cocktails/image/<int:pk>/', CocktailImage.as_view(), name='cocktail-image'),
    path('cocktails/filtre/', CocktailSearch.as_view(), name='cocktail-search'),
    path('contenir/<int:idcocktail>/', ContenirDetail.as_view(), name='contenir-detail'),
    path('favoris/', FavoriList.as_view(), name='favoris'),
    path('ingredients/', IngredientsList.as_view(), name='ingredients'),
    path('ingredients/detail/<int:pk>/', IngredientsDetail.as_view(), name='ingredients-detail'),
    path('notes/', NoterList.as_view(), name='notes'),
    path('preferences/', PreferenceList.as_view(), name='preferences'),
    path('preferences/<int:idmembre>/', PreferenceListByMember.as_view(), name='preferences-by-member'),
    path('stocklist/', StockList.as_view(), name='stock'),
    path('stockcurrent/', StockCurrent.as_view(), name='stockcurrent'),
    path('stockupdate/<int:idingredient>/', StockUpdate.as_view(), name='stock-update'),
    path('proposer/detail/<int:idcocktail>', ProposerDetail.as_view(), name='proposer'),
    path('proposer/<int:idmembre>/', ProposerListByMember.as_view(), name='proposer-member'),
    path('joindre_hote/', JoinHostAnon.as_view(), name='join-host-anon'),
    path('joindre_hote/<int:pk>/', JoinHost.as_view(), name='join-host'),
]

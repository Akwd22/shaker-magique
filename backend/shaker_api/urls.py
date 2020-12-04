from django.urls import path
from .views import *
import rest_framework
from django.conf.urls import include


app_name = 'shaker_api'

urlpatterns = [
    path('cocktails/<int:pk>/', CocktailDetail.as_view(), name='detailcreate'),
    path('cocktails/', CocktailList.as_view(), name='listcreate'),
    path('contenir/', ContenirList.as_view(), name='contenir'),
    path('favoris/', FavoriList.as_view(), name='favoris'),
    path('ingredients/', IngredientList.as_view(), name='ingredients'),
    path('notes/', NoterList.as_view(), name='notes'),
    path('preferences/', PreferenceList.as_view(), name='preferences'),
    path('preferences/<int:idmembre>', PreferenceListByMember.as_view(), name='preferencesByMember'),
    path('stock/', StockerList.as_view(), name='stocker'),
    path('proposer/', ProposerList.as_view(), name='Proposer'),
    path('proposer/detail/<int:pk>', ProposeDetail.as_view(), name='ProposerDetail'),
    path('proposer/<int:idmembre>', ProposerListByMember.as_view(), name='ProposerByMember'),
]
from django.urls import path
from .views import CocktailList, CocktailDetail

app_name = 'shaker_api'

urlpatterns = [
    path('cocktails/<int:pk>/', CocktailDetail.as_view(), name='detailcreate'),
    path('cocktails/', CocktailList.as_view(), name='listcreate'),
]
from django.urls import path
from .views import CocktailList, CocktailDetail

app_name = 'shaker_api'

urlpatterns = [
    path('<int:pk>/', CocktailDetail.as_view(), name='detailcreate'),
    path('', CocktailList.as_view(), name='listcreate'),
]
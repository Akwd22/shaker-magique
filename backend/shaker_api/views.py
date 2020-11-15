from rest_framework import generics
from shaker.models import Cocktail
from .serializers import CocktailSerializer


class CocktailList(generics.ListCreateAPIView):
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer


class CocktailDetail(generics.RetrieveDestroyAPIView):
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer
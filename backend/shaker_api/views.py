from rest_framework import generics
from shaker.models import *
from .serializers import *


class CocktailList(generics.ListCreateAPIView):
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer


class CocktailDetail(generics.RetrieveDestroyAPIView):
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer


class ContenirList(generics.ListCreateAPIView):
    queryset = Contenir.objects.all()
    serializer_class = ContenirSerializer

class CompteList(generics.ListCreateAPIView):
    queryset = Contenir.objects.all()
    serializer_class = CompteSerializer

class FavoriList(generics.ListCreateAPIView):
    queryset = Favori.objects.all()
    serializer_class = CompteSerializer
    
class IngredientList(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class MembreList(generics.ListCreateAPIView):
    queryset = Membre.objects.all()
    serializer_class = MembreSerializer

class NoterList(generics.ListCreateAPIView):
    queryset = Noter.objects.all()
    serializer_class = NoterSerializer

class PreferenceList(generics.ListCreateAPIView):
    queryset = Preference.objects.all()
    serializer_class = PreferenceSerializer
    
class StockerList(generics.ListCreateAPIView):
    queryset = Stocker.objects.all()  
    serializer_class = StockerSerializer
    
class ProposerList(generics.ListCreateAPIView):
    queryset = Propose.objects.all()
    serializer_class = ProposerSerializer
    
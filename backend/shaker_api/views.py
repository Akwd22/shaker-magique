from rest_framework import generics
from shaker.models import *
from .serializers import *
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

class CocktailList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer


class CocktailDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer

class ContenirList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Contenir.objects.all()
    serializer_class = ContenirSerializer

class CompteList(generics.ListCreateAPIView):
    queryset = Contenir.objects.all()
    serializer_class = CompteSerializer

class FavoriList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Favori.objects.all()
    serializer_class = CompteSerializer
    
class IngredientList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class MembreList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Membre.objects.all()
    serializer_class = MembreSerializer

class NoterList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Noter.objects.all()
    serializer_class = NoterSerializer

class PreferenceList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Preference.objects.all()
    serializer_class = PreferenceSerializer
    
class StockerList(generics.ListCreateAPIView):
    queryset = Stocker.objects.all()  
    serializer_class = StockerSerializer
    
class ProposerList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Propose.objects.all()
    serializer_class = ProposerSerializer

class ProposeDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Propose.objects.all()
    serializer_class = ProposerSerializer    
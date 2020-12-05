from rest_framework import generics
from rest_framework.views import APIView
from shaker.models import *
from .serializers import *
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from .permissions import *
from django.urls import reverse


class CocktailList(generics.ListCreateAPIView): 
    """Liste de tous les cocktails
    """
    # Vue qui liste (List) tous les cocktails,
    # permet aussi d'ajouter de nouveaux cocktails (Create)

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly] # Classe(s) de permission utilisée(s)
    serializer_class   = CocktailSerializer                       # Classe de sérialisation associée
    queryset           = Cocktail.objects.all()


class CocktailDetail(generics.RetrieveUpdateDestroyAPIView): 
    """Détail d'un cocktail
    """
    # Vue qui affiche le détail (Retrieve) d'un cocktail,
    # permet aussi de le modifier (Update), et supprimer (Destroy)

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset           = Cocktail.objects.all()
    serializer_class   = CocktailSerializer


class ContenirList(generics.ListCreateAPIView): 
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset           = Contenir.objects.all()
    serializer_class   = ContenirSerializer


class FavoriList(generics.ListCreateAPIView): 
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset           = Favori.objects.all()
    serializer_class   = FavoriSerializer


class IngredientList(generics.ListCreateAPIView): 
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset           = Ingredient.objects.all()
    serializer_class   = IngredientSerializer


class NoterList(generics.ListCreateAPIView): 
    """Toutes les notes de tous les cocktails
    """
    permission_classes = [NoterPermission]
    queryset           = Noter.objects.all()
    serializer_class   = NoterSerializer


class PreferenceList(generics.ListCreateAPIView): 
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset           = Preference.objects.all()
    serializer_class   = PreferenceSerializer


class StockerList(generics.ListCreateAPIView): 
    permission_classes = [StockerPermission]
    queryset           = Stocker.objects.all()
    serializer_class   = StockerSerializer


class ProposerList(generics.ListCreateAPIView): 
    """[summary]
    Liste de tous les cocktails proposé par des hôtes
                      Args    : 
             generics ([type]): [description]
    """
    permission_classes = [ProposerPermission]
    queryset           = Propose.objects.all()
    serializer_class   = ProposerSerializer


class ProposerListByMember(generics.ListCreateAPIView): 
    permission_classes = [ProposerPermission]
    serializer_class   = ProposerSerializer

    def get_queryset(self): 
        return Propose.objects.filter(idmembre=self.kwargs['idmembre'])


class ProposeDetail(generics.RetrieveDestroyAPIView): 
    """[summary]
    Uniquement les cocktails que nous proposons en tant qu'hôte
                      Args    : 
             generics ([type]): [description]
    """
    permission_classes = [ProposerDetailPermission]
    queryset           = Propose.objects.all()
    serializer_class   = ProposerSerializer

from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from shaker.models import *
from .serializers import *
from rest_framework.permissions import *
from .permissions import *
from django.urls import reverse
from user.models import Member
from pprint import PrettyPrinter
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.shortcuts import get_object_or_404


class CocktailList(generics.ListCreateAPIView):
    """Liste de tous les cocktails
    """
    # Vue qui liste (List) tous les cocktails,
    # permet aussi d'ajouter de nouveaux cocktails (Create)

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]  # Classe(s) de permission utilisée(s)
    serializer_class = CocktailSerializer                     # Classe de sérialisation associée
    queryset = Cocktail.objects.all()


class CocktailSearch(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = CocktailSerializer
    queryset = Cocktail.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['intitule', '=categorie', 'description']

# '^' Starts-with search.
    # '=' Exact matches.
    # '' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.


class CocktailDetail(generics.RetrieveUpdateDestroyAPIView):
    """Détail d'un cocktail
    """
    # Vue qui affiche le détail (Retrieve) d'un cocktail,
    # permet aussi de le modifier (Update), et supprimer (Destroy)

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer


class ContenirList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Contenir.objects.all()
    serializer_class = ContenirSerializer


class FavoriList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Favori.objects.all()
    serializer_class = FavoriSerializer


class IngredientList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class NoterList(generics.ListCreateAPIView):
    """Toutes les notes de tous les cocktails
    """
    permission_classes = [NoterPermission]
    queryset = Noter.objects.all()
    serializer_class = NoterSerializer


class PreferenceList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Preference.objects.all()
    serializer_class = PreferenceSerializer


class PreferenceListByMember(generics.ListCreateAPIView):
    permission_classes = [PreferencePermission]
    serializer_class = PreferenceSerializer

    def get_queryset(self):
        return Preference.objects.filter(idmembre=self.kwargs['idmembre'])


class StockerList(generics.ListCreateAPIView):
    permission_classes = [StockerPermission]
    queryset = Stocker.objects.all()
    serializer_class = StockerSerializer


class ProposerList(generics.ListCreateAPIView):
    """[summary]
    Liste de tous les cocktails proposé par des hôtes
                    Args    : 
            generics ([type]): [description]
    """
    permission_classes = [ProposerPermission]
    queryset = Propose.objects.all()
    serializer_class = ProposerSerializer


class ProposerListByMember(generics.ListCreateAPIView):
    permission_classes = [ProposerPermission]
    serializer_class = ProposerSerializer

    def get_queryset(self):
        return Propose.objects.filter(idmembre=self.kwargs['idmembre'])

    '''def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'POST':
            serializer_class = ProposerSerializerWithoutMembre

        return serializer_class'''


class ProposeDetail(generics.RetrieveDestroyAPIView):
    """[summary]
    Uniquement les cocktails que nous proposons en tant qu'hôte
                    Args    : 
            generics ([type]): [description]
    """
    permission_classes = [ProposerDetailPermission]
    queryset = Propose.objects.all()
    serializer_class = ProposerSerializer


class JoinHost(generics.RetrieveUpdateAPIView):
    """Visualiser l'hôte d'un membre, en joindre ou en quitter un.
    """
    permission_classes = [JoinHostPermission]
    serializer_class = JoinHostSerializer
    queryset = Member.objects.none()

    def retrieve(self, request, *args, **kwargs):
        instance = get_object_or_404(Member.objects, pk=kwargs["pk"])
        serializer = self.get_serializer(instance)      # On instancie notre sérialiseur en passant en paramètre notre instance
        return Response(serializer.data)


""" Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""

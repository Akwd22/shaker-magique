from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import *
from shaker.models import *
from .serializers import *
from rest_framework.permissions import *
from .permissions import *
from django.urls import reverse
from user.models import Member
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.shortcuts import get_object_or_404
from django.db.models.query import *
from django.db.models import Count, Sum
import json



class CocktailList(generics.ListAPIView):
    """Liste de tous les cocktails
    """
    # Vue qui liste (List) tous les cocktails,

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]  # Classe(s) de permission utilisée(s)
    serializer_class = CocktailSerializer                     # Classe de sérialisation associée
    queryset = Cocktail.objects.all()

class CocktailCreate(generics.CreateAPIView):
    # permet d'ajouter de nouveaux cocktails (Create)
    permission_classes = [IsAdminUser]
    serializer_class = CustomCocktailSerializer


# class CocktailCreate(generics.CreateAPIView):
#     permission_classes = [IsAdminUser] 
#     serializer_class=CustomCocktailSerializer

#     def post(self, request, format='json'):
#         print(request.data)
#         serializer = CustomCocktailSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)    


class CocktailDetail(generics.RetrieveUpdateDestroyAPIView):
    """Détail d'un cocktail*
    """
    # Vue qui affiche le détail (Retrieve) d'un cocktail,
    # permet aussi de le modifier (Update), et supprimer (Destroy)

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Cocktail.objects.all()
    serializer_class = CocktailSerializer

class CocktailImage(generics.RetrieveUpdateAPIView):
    permission_classes = [AllowAny]
    queryset = Cocktail.objects.all()
    serializer_class = CocktailImageSerializer


class CocktailSearch(generics.ListAPIView):
    """Liste des cocktails par filtrage

    Paramètres URL :
    - hote=<int>
    - cat=(A|D|AD)
    - search=ananas+citron
    - tri=<nom de la colonne>
    - manquants=<int>
    - alc=(0|1)

    Il n'est pas obligé de spécifier tous les paramètres. Si "manquants" est utilisé, alors "hote" doit l'être aussi. L'ordre n'est pas important.

    Exemples :
    "?search=ananas+oeuf&cat=D&tri=forcealc&hote=3&manquants=0"
    - Recherche les cocktails de l'hôte 3 avec les ingrédients "ananas" et "oeuf" de catégorie digestif, triés par force, dont tous les ingrédients sont en réserve
    "?search=alcapulco"
    - Recherche le cocktail qui se nomme Alcapulco
    """

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = CocktailSerializer
    queryset = Cocktail.objects.all()
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['intitule']

    def list(self, request, *args, **kwargs):
        instances = Cocktail.objects.all()

        search    = request.query_params.get("search")
        cat       = request.query_params.get("cat")
        hote      = request.query_params.get("hote")
        tri       = request.query_params.get("tri")
        alc       = request.query_params.get("alc")
        manquants = request.query_params.get("manquants")

        # Récupérer que les cocktails d'un hôte
        if(hote):
            instances = instances.filter(membres__id=hote)

        # Filtrer par catégorie
        if(cat):
            instances = instances.filter(categorie=cat)

        # Filtrer sans alcool
        if(alc == "0"):
            instances = instances.filter(forcealc=0) | instances.filter(forcealc=None)

        # Filtrer par mots-clés (recherche dans titre cocktail et titre ingrédients)
            #rhum vodka, ananas
        if(search):
            ouet = search.split(",")
            ou = ouet[0].split(" ")
            et=[]
            if (len(ouet)>1):
                et = ouet[1].split(" ")

            temp = {}
            n=0
            for i in ou:
                temp[n] = (instances.filter(ingredients__intitule__icontains=i) | instances.filter(intitule__icontains=i)).distinct()
                for j in et:
                    temp[n] = temp[n].filter(ingredients__intitule__icontains=j) | temp[n].filter(intitule__icontains=j)
                n+=1
            for x in range(n):
                instances =  temp[0].union(temp[x])

        # Filtrer par nombre d'ingrédients manquants
        if (hote and manquants):
            for cocktail in instances:
                stock = Stocker.objects.filter(idmembre=hote)                                  # Les ingredients de l'hôte
                stock = stock.filter(idingredient__in=cocktail.ingredients.values_list("id"))  # Les ingredients de l'hôte qui correspondent au cocktail

                # Exclure le cocktail car l'hôte ne possède un ou plusieurs ingrédients du cocktail
                if (cocktail.ingredients.count() != stock.count()):
                    instances = instances.exclude(pk=cocktail.id)
                    continue

                nb_manquants = stock.count() - stock.aggregate(Sum('enreserve'))['enreserve__sum']  # Calcul du nombre d'ingrédients manquants

                # Exclure le cocktail s'il ne respecte pas le critère du nombre d'ingrédients manquants
                if (nb_manquants != int(manquants)):
                    instances = instances.exclude(pk=cocktail.id)

        # Trier les cocktails
        if (tri):
            instances = instances.order_by(tri)

        serializer = self.get_serializer(instances, many=True)
        return Response(serializer.data)


class ContenirList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Contenir.objects.all()
    serializer_class = ContenirListSerializer

    def create(self, request, *args, **kwargs):
        """
        #checks if post request data is an array initializes serializer with many=True
        else executes default CreateModelMixin.create function 
        """
        is_many = isinstance(request.data, list)
        if not is_many:
            return super(ContenirList, self).create(request, *args, **kwargs)
        else:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ContenirDetail(generics.RetrieveUpdateDestroyAPIView):
    """Afficher une relation contenir ingrédient/cocktail
    """
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Contenir.objects.all()
    serializer_class = ContenirDetailSerializer

    def get_object(self):
        return Contenir.objects.get(idcocktail=self.kwargs['idcocktail'], idingredient=self.kwargs['idingredient'],)


class FavoriList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Favori.objects.all()
    serializer_class = FavoriSerializer


class IngredientsList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientsDetail(generics.RetrieveUpdateDestroyAPIView):
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


class StockList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Preference.objects.all()
    serializer_class = PreferenceSerializer

class StockCurrent(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = StockerSerializer
    queryset = Stocker.objects.all()
    def get_queryset(self):
        return Stocker.objects.filter(idmembre=self.request.user.id)

class StockUpdate(generics.RetrieveUpdateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = StockerSerializer
    lookup_field = 'idingredient'

    def get_queryset(self, *args, **kwargs):
        queryset = Stocker.objects.get_or_create(idmembre=self.request.user, idingredient=Ingredient.objects.get(pk=self.kwargs['idingredient']))
        queryset = Stocker.objects.filter(idmembre=self.request.user, idingredient=Ingredient.objects.get(pk=self.kwargs['idingredient']))
        return queryset


class ProposerList(generics.ListCreateAPIView):
    """[summary]
    Liste de tous les cocktails proposé par des hôtes
                    Args    : 
            generics ([type]): [description]
    """
    permission_classes = [ProposerPermission]
    queryset = Propose.objects.all()
    serializer_class = StockerSerializer

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
    Pour quitter un hôte, ne rien renseigner comme login.
    """
    permission_classes = [JoinHostPermission]
    serializer_class = JoinHostSerializer
    queryset = Member.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = get_object_or_404(Member.objects, pk=kwargs["pk"])
        serializer = self.get_serializer(instance)  # On instancie notre sérialiseur en passant en paramètre notre instance
        return Response(serializer.data)

    def perform_update(self, serializer):
        hote_login = serializer.context["request"].data["hote_login"]   # Extraire le login de l'hôte de la requête

        hote = None
        if (hote_login):
            hote = get_object_or_404(Member.objects, user_name=hote_login)  # Récupérer l'hôte par son login

        serializer.save(id_hote=hote)


class JoinHostAnon(generics.UpdateAPIView):
    """Joindre un hôte en tant qu'anonyme.
    Si l'hôte existe, le code de retour HTTP est 200, sinon 404.
    """
    permission_classes = [AllowAny]
    serializer_class = JoinHostSerializer
    queryset = Member.objects.none()

    def update(self, request, *args, **kwargs):
        hote_login = request.data["hote_login"]  # Extraire le login de l'hôte de la requête

        hote = None
        if (hote_login):
            hote = get_object_or_404(Member.objects, user_name=hote_login)  # Récupérer l'hôte par son login

        return Response({"id_hote": hote.id if hote else None})


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

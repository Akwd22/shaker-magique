from rest_framework import serializers
from django.db.models import Avg
from user.models import Member
from shaker.models import *
import pprint

#Serializer de création d'un cocktail
class CocktailContenirSerializer(serializers.HyperlinkedModelSerializer):
    """Sérialisateur affichant l'association Contenir pour un cocktail

    https://stackoverflow.com/questions/17256724/include-intermediary-through-model-in-responses-in-django-rest-framework
    """
    idingredient = serializers.ReadOnlyField(source="idingredient.id")
    intitule = serializers.ReadOnlyField(source="idingredient.intitule")
    degrealcool = serializers.ReadOnlyField(source="idingredient.degrealcool")

    class Meta:
        fields = ('idingredient', 'intitule', 'degrealcool', 'quantite', 'unite')
        model = Contenir

#serializer d'un cocktail
class CocktailSerializer(serializers.ModelSerializer):
    ingredients = CocktailContenirSerializer(read_only=True, source="contenir_set", many=True)

    class Meta:
        fields = ('id', 'intitule', 'illustrationurl', 'categorie', 'description',
                'forcealc', 'ingredients', 'moyenne')
        model = Cocktail

#serializer d'un cocktail sans demander le champs illustrationurl
class CustomCocktailSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'illustrationurl', 'categorie', 'description',
                'forcealc')
        model = Cocktail
        depth = 1
        read_only_fields = ("illustrationurl",)

#serializer d'ajout/modif d'une image à un cocktail
class CocktailImageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('illustrationurl',)
        model = Cocktail
        depth = 1

#serializer d'une instance d'une instance de la table contenir
class ContenirListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idingredient', 'quantite', 'unite')
        model = Contenir

#serializer d'une instance de la table Favori
class FavoriSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idmembre')
        model = Favori

#serializer d'une instance de la table Ingredient
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'degrealcool')
        model = Ingredient

#serializer d'une instance de la table Noter
class NoterSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idmembre', 'idcocktail', 'note')
        model = Noter

#serializer d'une instance de la table Preference
class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idingredient', 'idmembre')
        model = Preference

#serializer d'une instance de la table Noter
class StockerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idingredient', 'idmembre', 'enreserve')
        model = Stocker
        read_only_fields = ("idingredient", "idmembre",)

#serializer d'une instance de la table Propose
class ProposerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idmembre')
        model = Propose

class JoinHostSerializer(serializers.ModelSerializer):
    # Champ qui ne fait pas parti du modèle
    # Il sert uniquement au formulaire
    hote_login = serializers.CharField(write_only=True, allow_blank=True)

    class Meta:
        fields = ('id_hote', 'hote_login')
        read_only_fields = ('id_hote',)
        model = Member

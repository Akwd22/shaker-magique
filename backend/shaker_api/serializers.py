from rest_framework import serializers
from django.db.models import Avg
from user.models import Member
from shaker.models import *
import pprint


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


class CocktailSerializer(serializers.ModelSerializer):
    ingredients = CocktailContenirSerializer(read_only=True, source="contenir_set", many=True)

    class Meta:
        fields = ('id', 'intitule', 'illustrationurl', 'categorie', 'description',
                   'forcealc', 'ingredients', 'moyenne')
        model = Cocktail


class CustomCocktailSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'illustrationurl', 'categorie', 'description',
                  'forcealc')
        model = Cocktail
        depth = 1
        read_only_fields = ("illustrationurl",)


class CocktailImageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('illustrationurl',)
        model = Cocktail
        depth = 1


class ContenirListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idingredient', 'quantite', 'unite')
        model = Contenir


class FavoriSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idmembre')
        model = Favori


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'degrealcool')
        model = Ingredient


class NoterSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idmembre', 'idcocktail', 'note')
        model = Noter


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idingredient', 'idmembre')
        model = Preference


class StockerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idingredient', 'idmembre', 'enreserve')
        model = Stocker
        read_only_fields = ("idingredient", "idmembre",)


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

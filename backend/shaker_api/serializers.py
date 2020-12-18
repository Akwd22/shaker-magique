from rest_framework import serializers
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
    ingredients = CocktailContenirSerializer(source="contenir_set", many=True)

    class Meta:
        fields = ('id', 'intitule', 'illustrationurl', 'categorie', 'description',
                  'forcealc', 'ingredients')
        model = Cocktail
        depth = 1


class ContenirSerializer(serializers.HyperlinkedModelSerializer):
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


class ProposerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idmembre')
        model = Propose
        depth = 1


class JoinHostSerializer(serializers.ModelSerializer):
    # Champ qui ne fait pas parti du modèle
    # Il sert uniquement au formulaire
    hote_login = serializers.CharField(write_only=True, allow_blank=True)

    class Meta:
        fields = ('id_hote', 'hote_login')
        read_only_fields = ('id_hote',)
        model = Member

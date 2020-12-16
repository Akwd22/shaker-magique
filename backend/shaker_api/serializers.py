from rest_framework import serializers
from user.models import Member
from shaker.models import *
import pprint


class CocktailSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'intitule', 'illustrationurl', 'categorie', 'description', 'forcealc', 'ingredients')
        model = Cocktail


class ContenirSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idingredient', 'quantite', 'unite')
        model = Contenir
        depth = 1


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
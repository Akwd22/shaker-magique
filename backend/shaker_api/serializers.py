from rest_framework import serializers
from shaker.models import *

class CocktailSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'illustrationurl', 'categorie', 'description', 'forcealc')
        model = Cocktail


class ContenirSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idingredient', 'quantite', 'unite')
        model = Contenir

class CompteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'login', 'passhash', 'email', 'datecreation', 'enligne', 'sessionid', 'idmembre')
        model = Compte

class FavoriSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idmembre')
        model = Favori

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'degrealcool')
        model = Ingredient

class MembreSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'prenom', 'nom', 'daten', 'genre', 'idcompte', 'idhote')
        model = Membre

class NoterSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idmembre', 'idcocktail', 'note')
        model = Noter

class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idingredient', 'idmembre')
        model = Preference
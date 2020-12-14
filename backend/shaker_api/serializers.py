from rest_framework import serializers
from shaker.models import *
import pprint


class CocktailSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'illustrationurl',
                'categorie', 'description', 'forcealc')
        model = Cocktail


class ContenirSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idingredient', 'quantite', 'unite')
        model  = Contenir



class FavoriSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail', 'idmembre')
        model  = Favori


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'intitule', 'degrealcool')
        model  = Ingredient


class NoterSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('idmembre', 'idcocktail', 'note')
        model  = Noter


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


'''class ProposerSerializerWithoutMembre(serializers.ModelSerializer):
    class Meta:
        fields = ('idcocktail',)
        model = Propose
    
    def validate(self, data):
        pp = pprint.PrettyPrinter()
        pp.pprint(self.instance)
        
        return data'''

from django.contrib import admin
from . import models


@admin.register(models.Cocktail)
class CocktailAdmin(admin.ModelAdmin):
    """Panneau d'administration des cocktails
    """

    # Attributs affichés dans la liste
    list_display = (
        'id',
        'intitule',
        'description',
        'categorie',
        'forcealc',
    )
    search_fields = ('id', 'intitule',)  # Attributs inclus pour une recherche
    list_filter = ('categorie',)         # Attributs inclus dans les critères de filtre
    ordering = ('id',)                   # Triage par défaut de la liste

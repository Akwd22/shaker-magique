from django.contrib import admin
from . import models


@admin.register(models.Cocktail)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('intitule', 'description')
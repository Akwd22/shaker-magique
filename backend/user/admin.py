from django.contrib import admin
from user.models import Member
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    """Affichage des utilisateurs dans le panel d'administration
    """
    
    model = Member
    search_fields = ('email', 'user_name', 'first_name',)
    list_filter = ('email', 'user_name', 'first_name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('user_name', 'email', 'first_name', 'last_name', 'birthday', 'gender', 'id_hote', 'is_active', 'is_staff')

    # Champs du formulaire de modification des membres
    fieldsets = (
        (None, {'fields': ('user_name', 'email', 'first_name', 'last_name', 'birthday', 'gender')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')})
    )

    '''formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }'''

    # Champs du formulaire d'ajout d'un membre
    add_fieldsets = (
        (None, {
            'classes': ('wide'),
            'fields': ('user_name', 'email', 'first_name', 'last_name', 'birthday', 'gender', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(Member, UserAdminConfig)
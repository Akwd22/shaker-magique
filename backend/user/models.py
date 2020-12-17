from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User, Group
from django.conf import settings
from django import forms
import datetime


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, user_name, email, first_name, last_name, birthday, password, gender, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(user_name, email, first_name, last_name, birthday, password, gender, **other_fields)

    def create_user(self, user_name, email, first_name, last_name, birthday, password, gender ,**other_fields):
        if not user_name:
            raise ValueError(_('Vous devez fournir un nom d''utilisateur'))

        if not email:
            raise ValueError(_('Vous devez fournir une adresse email'))

        email = self.normalize_email(email)
        user = self.model(user_name=user_name, email=email, first_name=first_name, last_name=last_name, birthday=birthday, gender=gender, **other_fields)
        user.set_password(password)

        user.save()
        return user


class Member(AbstractBaseUser, PermissionsMixin):

    GENDER = [
        ('M', 'M'),
        ('F', 'F'),
    ]   
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=32, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    start_date = models.DateTimeField(default=timezone.now)
    birthday = models.DateTimeField(default=timezone.now)
    gender = models.CharField(max_length=1, choices = GENDER, default = "F")
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    id_hote = models.ForeignKey('self', models.DO_NOTHING, default=None, blank=True, null=True)
    stock_ingredients = models.ManyToManyField("shaker.Ingredient", through="shaker.Stocker", through_fields=("idmembre", "idingredient"))
    
    objects = CustomAccountManager()

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'birthday', "gender"]

    def __str__(self):
        return self.user_name
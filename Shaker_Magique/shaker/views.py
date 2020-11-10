from django.shortcuts import render

from .models import Compte,Cocktail
# Create your views here.

def home(request):
	return render(request, 'shaker/home.html')
def index(request):
	comptes = Compte.objects.all()
	return render(request, 'shaker/index.html',{'comptes': comptes})
def cocktails(request):
	cocktails = Cocktail.objects.all()
	return render(request, 'shaker/cocktails.html',{'cocktails': cocktails})
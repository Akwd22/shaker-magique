from rest_framework.permissions import BasePermission, SAFE_METHODS

class PostCocktailPermission(BasePermission):
    message = "Vous devez être membre pour pouvoir ajouter un cocktail"
    
    def has_object_permission(self, request, view, obj):
        
        
        
        return super().has_object_permission(request, view, obj)
    
    
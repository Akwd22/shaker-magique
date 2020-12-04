from rest_framework.permissions import BasePermission, SAFE_METHODS
from .serializers import ProposerSerializer
import pprint
import re


class ProposerPermission(BasePermission):
    message = "Vous ne pouvez ajouter des cocktails qu'à votre carte"

    def has_permission(self, request, view):

        if ("idmembre" in request.data) and request.method == "POST":
            return (int(request.data["idmembre"]) == int(request.user.id)) or request.user.is_superuser

        return True


class ProposerDetailPermission(BasePermission):
    message = "Vous ne pouvez modifier que les cocktails de votre carte"

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return (obj.idmembre == request.user) or request.user.is_superuser


class NoterPermission(BasePermission):
    """@todo
    """
    message = "Vous ne pouvez modifier que vos notes"

    def has_permission(self, request, view):
        
        if request.method in SAFE_METHODS:
            return True

        # N'importe qui, peut GET
        if request.method in SAFE_METHODS:
            return True

        # L'admin à tous les droits
        if (request.user.is_superuser):
            return True

        # Un membre ne peut noter qu'uniquement pour lui-même

        return False


class StockerPermission(BasePermission):
    message = "Vous ne pouvez consulter que votre stock d'ingrédients"

    def has_permission(self, request, view):

        if (request.user.is_superuser):
            return True

        return False


class PreferencePermission(BasePermission):
    """[Ne pouvoir modifier, supprimer ou ajouter des ingrédients uniquement à sa liste]

    Args:
        BasePermission ([type]): [description]

    Returns:
        [type]: [description]
    """
    message = "Vous pouvez uniquement ajouté de nouveaux ingrédients préféré à votre liste"

    def has_permission(self, request, view):
        allo = pprint.PrettyPrinter()
        # allo.pprint(request.path_info)
        # regex = r"3'$"
        
        if request.method in SAFE_METHODS:
            return True

        if("idmembre" in request.data) and request.method == "POST":
            return (int(request.data["idmembre"]) == int(request.user.id)) or request.user.is_superuser
        
        if not(request.user.id):
            return False

        """allo.pprint(re.match(regex, request.path_info))
        if(re.match(r'\/'+str   (request.user.id)+"$", request.path_info)):
            return True"""
                      
        return True   
        
"""
BONUS:
class FavoriPermission(BasePermission):
    message = "Vous ne pouvez ajouter des favoris qu'à vous même"
    
    def has_permission(self, resquest, view):
        pass"""

from rest_framework.permissions import BasePermission, SAFE_METHODS
from .serializers import ProposerSerializer
import pprint


class ProposerPermission(BasePermission): 
    message = "Vous ne pouvez ajouter des cocktails qu'à votre carte"

    def has_permission(self, request, view): 

        if ("idmembre" in request.data) and request.method == "POST":
            return (request.data["idmembre"] == request.user.id) or request.user.is_superuser

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

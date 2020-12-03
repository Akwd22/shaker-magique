from rest_framework.permissions import BasePermission, SAFE_METHODS
from .serializers import ProposerSerializer
import pprint


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
    message = "Vous ne pouvez modifier que vos notes"

    def has_permission(self, request, view):

        if (request.user.is_superuser):
            return True

        if (request.method == "POST") and (request.data):
            if int(request.data["idmembre"]) != request.user.id:
                return False

        return True

class StockerPermission(BasePermission):
    message = "Vous ne pouvez consulter que votre stock d'ingrédients"

    def has_permission(self, request, view):

        if (request.user.is_superuser):
            return True

        return False
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

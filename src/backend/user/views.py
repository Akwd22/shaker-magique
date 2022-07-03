from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, CurrentUserSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password, password_validators_help_texts
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import *
from django.contrib.auth.models import Group
from rest_framework import viewsets
from user.models import Member

#vue de creation d'un utilisateur
class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
            except:
                return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

            if user:
                json = serializer.data
                # Ajouter le nouveau compte au groupe "Membre"
                user.groups.add(Group.objects.get(name='Membre'))
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#vue de l'utilisateur actuel
class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

#vue qui permet la déconnexion
class CurentUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CurrentUserSerializer

    def get_object(self):
        obj = Member.objects.get(user_name=self.request.user.user_name)
        return obj

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.groups.remove(Group.objects.get(name='Membre'))
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

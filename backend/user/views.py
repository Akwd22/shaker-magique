from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status,generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, CurrentUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import *
from django.contrib.auth.models import Group
from rest_framework import viewsets
from user.models import Member

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                # Ajouter le nouveau compte au groupe "Membre"
                user.groups.add(Group.objects.get(name='Membre'))
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class CurentUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class  = CurrentUserSerializer

    def get_object(self):
        obj = Member.objects.get(user_name=self.request.user.user_name)
        return obj

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.groups.remove(Group.objects.get(name='Membre'))
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

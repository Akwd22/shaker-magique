from rest_framework import serializers
from user.models import Member
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

#serializer de creation d'un utilisateur
class CustomUserSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=6, write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    birthday = serializers.DateTimeField(input_formats=['%Y-%m-%d'], required=True)
    gender = serializers.CharField(max_length=1, required=True)

    class Meta:
        model = Member
        fields = ('user_name', 'email', 'password', 'first_name', 'last_name', 'birthday', 'gender')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

#serializer de l'utilisateur actuel
class CurrentUserSerializer(serializers.ModelSerializer): 
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = Member
        fields = ('user_name', "email","password",)  
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Sérialiseur pour ajouter des champs dans le token
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Champs supplémentaires
        token['is_staff'] = user.is_staff

        return token



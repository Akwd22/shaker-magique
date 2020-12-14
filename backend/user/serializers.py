from rest_framework import serializers
from user.models import Member

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


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'user_name','email','first_name','last_name','start_date','birthday','gender','is_staff','is_active','id_hote')
        model  = Member
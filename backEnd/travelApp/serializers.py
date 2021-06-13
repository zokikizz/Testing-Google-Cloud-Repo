from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Trip

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user

    class Meta:
        model = UserModel
        fields = ("id", "username", "email", "password",)


class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("id", "username")


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = '__all__'

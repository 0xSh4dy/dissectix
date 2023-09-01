from rest_framework import serializers
from .models import DissectixUser,Challenge
from .utils import getSha256Hash
from django.contrib.auth.models import User

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = '__all__'  # You can customize the fields as needed

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password","email"]

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = DissectixUser
        fields = ["username"]
    
    def create(self,validated_data):
        user = DissectixUser.objects.create(**validated_data)
        return user


class DissectixUserSerializer(serializers.ModelSerializer):
    created_challenges = ChallengeSerializer(many=True, read_only=True)
    class Meta:
        model = DissectixUser
        fields = ['username', 'password', 'email', 'score', 'attempted_challenges', 'created_challenges']
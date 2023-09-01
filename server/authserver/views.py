from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import SignupSerializer
from .utils import getSha256Hash
from .models import DissectixUser
from .serializers import UserSerializer
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class RegistrationView(APIView):
    def post(self,request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            signupSerializer = SignupSerializer(data=request.data)
            if signupSerializer.is_valid():
                serializer.save()
                user = User.objects.get(username=request.data["username"])
                user.set_password(request.data["password"])
                token = Token.objects.create(user=user)
                user.save()
                signupSerializer.save()
                return Response({"token":token.key,"status":"success"},status=status.HTTP_200_OK)
            else:
                return Response({"errors":signupSerializer.errors},status=status.HTTP_400_BAD_REQUEST)      
        return Response({"errors":serializer.errors},status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def get(self,request,format=None):
        return Response({"status":"success"},status=status.HTTP_200_OK)

    def post(self,request,format=None):
        username = request.data["username"]
        password = request.data["password"]
        user = get_object_or_404(User,username=username)
        if not user.check_password(password):
            return Response({"detail":"Invalid credentials"},status=status.HTTP_404_NOT_FOUND)
        token,created = Token.objects.get_or_create(user=user)
        return Response({"token":token.key,"detail":"Success"},status=status.HTTP_200_OK)


    

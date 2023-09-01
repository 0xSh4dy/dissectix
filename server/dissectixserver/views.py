from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LoginSerializer,SignupSerializer

class RegistrationView(APIView):
    def post(self,request):
        signupData = SignupSerializer(data=request.data)
        print(signupData.is_valid())
        print("Rendering")
        if signupData.is_valid():
            signupData.save()
            return Response({"status":"success"},status=200)
        else:
            error_messages = []
            for field, errors in signupData.errors.items():
                for error in errors:
                    error_messages.append(f"{field.capitalize()}: {error}")
            error_string = error_messages[0]
            return Response({"status":"failure","errors":error_string},status=400)

class UserHandler(APIView):
    def get(self,request,format=None):
        return Response({"status":"success"},status=200)
    
    def post(self,request,format=None):
        item = LoginSerializer(data=request.data)
        print(item.is_valid())
        return Response({"status":"success"},status=200)

from .views import UserHandler,RegistrationView
from django.urls import path

urlpatterns = [
    path("register/",RegistrationView.as_view()),
    path("users/",UserHandler.as_view())
]
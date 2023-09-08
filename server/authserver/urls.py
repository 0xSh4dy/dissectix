from .views import LoginView,RegistrationView,AccountDeletionView
from django.urls import path

urlpatterns = [
    path("register/",RegistrationView.as_view()),
    path("login/",LoginView.as_view()),
    path("delete/",AccountDeletionView.as_view()),
]
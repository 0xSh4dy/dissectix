from django.urls import path
from .views import ChallengeView,CodeTestingView

urlpatterns = [
    path("challenge/",ChallengeView.as_view()),
    path("codetesting/",CodeTestingView.as_view())
]
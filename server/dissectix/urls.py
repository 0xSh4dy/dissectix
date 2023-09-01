from django.urls import path
from .views import ChallengeView

urlpatterns = [
    path("create_challenge/",ChallengeView.as_view())
]
from django.urls import path
from .views import ChallengeView

urlpatterns = [
    path("challenge/",ChallengeView.as_view())
]
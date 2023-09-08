from django.urls import path
from .views import ChallengeView,CodeTestingView,CodeSubmissionView,LeaderboardView,ProfileView

urlpatterns = [
    path("challenge/",ChallengeView.as_view()),
    path("codetesting/",CodeTestingView.as_view()),
    path("submitcode/",CodeSubmissionView.as_view()),
    path("leaderboard/",LeaderboardView.as_view()),
    path("profile/",ProfileView.as_view())
]
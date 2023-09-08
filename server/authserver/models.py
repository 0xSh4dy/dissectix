from django.db import models
from dissectix.models import Challenge

class DissectixUser(models.Model):
    username = models.CharField(max_length=50,unique=True)
    score = models.IntegerField(default=0)
    solve_count = models.IntegerField(default=0)
    solved_challenges = models.JSONField(default=dict)
    created_challenges = models.JSONField(default=dict)



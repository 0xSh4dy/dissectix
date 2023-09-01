from django.db import models
from dissectix.models import Challenge

class DissectixUser(models.Model):
    username = models.CharField(max_length=50,unique=True)
    score = models.IntegerField(null=True)
    attempted_challenges = models.JSONField(null=True)
    created_challenges = models.ForeignKey("dissectix.challenge",on_delete=models.CASCADE,related_name="chall_author",null=True)



from django.db import models

class DissectixUser(models.Model):
    username = models.CharField(max_length=50,unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    score = models.IntegerField(null=True)
    attempted_challenges = models.JSONField(null=True)
    created_challenges = models.ForeignKey("Challenge",on_delete=models.CASCADE,related_name="chall_author",null=True)

class Challenge(models.Model):
    name = models.CharField(max_length=50,unique=True)
    author = models.CharField(max_length=50)
    is_public = models.BooleanField()
    file_url = models.TextField()
    solve_percentage = models.JSONField()
    points = models.IntegerField()
    difficulty = models.CharField(max_length=20)
    language = models.CharField(max_length=20)


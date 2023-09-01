from django.db import models

class Challenge(models.Model):
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    is_public = models.BooleanField()
    file_url = models.TextField()
    solve_percentage = models.JSONField()
    points = models.IntegerField()
    difficulty = models.CharField(max_length=20)
    language = models.CharField(max_length=20)
    functions = models.TextField() # func1|func2|func3|func4
    code = models.TextField(default="")

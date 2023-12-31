from django.db import models

class Challenge(models.Model):
    name = models.CharField(max_length=50,unique=True)
    chall_id = models.TextField(unique=True)
    author = models.CharField(max_length=50)
    is_public = models.BooleanField()
    description = models.TextField(default="")
    file_url = models.TextField(default="")
    solve_percentage = models.JSONField(default=dict)
    points = models.IntegerField()
    difficulty = models.CharField(max_length=20)
    language = models.CharField(max_length=20)
    functions = models.TextField(default="") # func1|func2|func3|func4
    code = models.TextField(default="")

from django.db import models
# Create your models here.
class TaskBoard(models.Model):
    username = models.CharField(max_length=40)
    task_name = models.CharField(max_length=100)
    task_description = models.TextField()
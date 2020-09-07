from django.db import models

class Text(models.Model):
  PlayerLine = models.CharField(max_length=1000)
  def __str__(self):
    return self.PlayerLine
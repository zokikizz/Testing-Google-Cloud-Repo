from django.db import models

from travelApp.models import Trip


class Destination(models.Model):
    location = models.CharField(max_length=50)
    booking = models.CharField(max_length=50, null=True)
    booking_price = models.IntegerField()
    belongs_to = models.ForeignKey(Trip, related_name='part_of', on_delete=models.CASCADE)
    start_destination = models.BooleanField(default=False)
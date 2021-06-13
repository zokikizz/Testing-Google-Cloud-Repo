from django.db import models

from destinationApp.models import Destination
from travelApp.models import Trip


class Transit(models.Model):
    TRANSIT_TYPE = (
        ('train', 'TRAIN'),
        ('bus', 'BUS'),
        ('plane', 'PLANE'),
        ('ship', 'SHIP')
    )
    company_name = models.CharField(max_length=50)
    price = models.IntegerField()
    transit_type = models.CharField(max_length=10, choices=TRANSIT_TYPE, default='train')
    start = models.DateTimeField(null=True)
    end = models.DateTimeField(null=True)
    trip = models.ForeignKey(Trip, related_name='belongs_to', on_delete=models.CASCADE)
    start_destination = models.ForeignKey(Destination, related_name='start_location', on_delete=models.CASCADE,
                                          default='')
    end_destination = models.ForeignKey(Destination, related_name='end_location', on_delete=models.CASCADE, default='')

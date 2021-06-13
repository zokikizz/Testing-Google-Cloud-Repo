from django.db import models
from django.contrib.auth import get_user_model
from django.utils.timezone import now

User = get_user_model()


class Trip(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    budget = models.IntegerField(blank=False)
    budget_left = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    travelers = models.ManyToManyField(User, related_name='travelers', blank=True)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'title: %s, budget: %s, left: %s' % (self.title, self.budget, self.budget_left)

    class Meta:
        ordering = ['created']


class Destination(models.Model):
    location = models.CharField(max_length=50)
    booking = models.CharField(max_length=50, null=True)
    booking_price = models.IntegerField()
    belongs_to = models.ForeignKey(Trip, related_name='part_of', on_delete=models.CASCADE)
    start_destination = models.BooleanField(default=False)


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


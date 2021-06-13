from django.db import models
from django.contrib.auth import get_user_model

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

from django.conf.urls import url
from destinationApp import views as destination_views

urlpatterns = [
    # Destination API
    url(r'^(?P<travel_pk>\d+)/list', destination_views.DestinationListAPI.as_view(),
        name='list destinations for one trip'),
    url(r'^(?P<pk>\d+)/create', destination_views.DestinationCreateAPI.as_view(), name='create destination'),
    url(r'^(?P<pk>\d+)', destination_views.DestinationRetrieveUpdateDeleteAPI.as_view(),
        name='update/delete/get destination'),

]

# localhost:8000/api/v1/trip/list?page=2

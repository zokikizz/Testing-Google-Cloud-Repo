from django.conf.urls import url
from transitionApp import views as transition_views

urlpatterns = [
    url(r'^(?P<travel_pk>\d+)/list', transition_views.TransitListAPI.as_view(), name='transit list'),
    url(r'^(?P<travel_pk>\d+)/create', transition_views.TransitCreateAPI.as_view(), name='create transit'),
    url(r'^(?P<transit_pk>\d+)', transition_views.TransitRetrieveUpdateDeleteAPI.as_view(),
        name='update/delete/get transit')
]

# localhost:8000/api/v1/trip/list?page=2

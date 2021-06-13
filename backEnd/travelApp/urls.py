from django.conf.urls import url
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from travelApp import views as travelViews
from travelApp.views import TransitCreateAPI, TransitListAPI, TransitRetrieveUpdateDeleteAPI

urlpatterns = [
    # auth
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('register', travelViews.CreateUserView.as_view(), name='register'),

    # Trip API
    path('trip', travelViews.TripCreateAPI.as_view(), name='create trip'),
    path('trip/list', travelViews.TripListAPI.as_view(), name='list trips'),
    url(r'^trip/(?P<pk>\d+)$', travelViews.TripUpdateDeleteRetrieveAPI.as_view(), name='update/delete/get trip'),

    # Destination API
    url(r'^destination/(?P<travel_pk>\d+)/list', travelViews.DestinationListAPI.as_view(),
        name='list destinations for one trip'),
    url(r'^destination/(?P<pk>\d+)/create', travelViews.DestinationCreateAPI.as_view(), name='create destination'),
    url(r'^destination/(?P<pk>\d+)', travelViews.DestinationRetrieveUpdateDeleteAPI.as_view(),
        name='update/delete/get destination'),

    # Transit
    url(r'^transit/(?P<travel_pk>\d+)/list', TransitListAPI.as_view(), name='transit list'),
    url(r'^transit/(?P<travel_pk>\d+)/create', TransitCreateAPI.as_view(), name='create transit'),
    url(r'^transit/(?P<transit_pk>\d+)', TransitRetrieveUpdateDeleteAPI.as_view(), name='update/delete/get transit')
]

# localhost:8000/api/v1/trip/list?page=2

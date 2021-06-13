from django.conf.urls import url
from django.urls import include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from travelApp import views as travel_views

urlpatterns = [
    # auth
    url('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    url('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    url('register', travel_views.CreateUserView.as_view(), name='register'),

    # Trip API
    url('trip', travel_views.TripCreateAPI.as_view(), name='create trip'),
    url('trip/list', travel_views.TripListAPI.as_view(), name='list trips'),
    url(r'^trip/(?P<pk>\d+)$', travel_views.TripUpdateDeleteRetrieveAPI.as_view(), name='update/delete/get trip'),

    url('transit/', include('transitionApp.urls')),
    url('destination/', include('destinationApp.urls')),
]

# localhost:8000/api/v1/trip/list?page=2

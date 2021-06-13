from rest_framework import status, permissions
from rest_framework.generics import (CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from .serializers import UserSerializer, TripSerializer, UsernameSerializer
from .models import Trip

User = get_user_model()


class CreateUserView(CreateAPIView):

    model: User
    permission_classes = [permissions.AllowAny]
    # authentication_classes = []
    serializer_class = UserSerializer


class TripCreateAPI(CreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def post(self, request, *args, **kwargs):
        new_trip = {**request.data, 'owner': request.user, }
        trip = Trip(**new_trip)

        trip.save()

        return Response({
            **TripSerializer(trip).data
        })


class TripUpdateDeleteRetrieveAPI(RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def put(self, request, *args, **kwargs):
        updated_trip = {**request.data, 'owner': request.user}
        trip = Trip.objects.get(pk=kwargs['pk'])

        trip.__dict__.update(updated_trip)
        trip.save()
        return Response({
            **TripSerializer(trip).data
        })

    def patch(self, request, *args, **kwargs):
        trip = Trip.objects.get(pk=kwargs['pk'])
        if request.data['travelers']:
            trip.travelers.set(())
            [trip.travelers.add(User.objects.get(pk=travelerId)) for travelerId in request.data['travelers']]

        return Response({
            **TripSerializer(trip).data
        })


class TripListAPI(ListAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.filter(owner=self.request.user) | Trip.objects.filter(travelers__id=self.request.user.id)


class UsernameListAPI(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UsernameSerializer

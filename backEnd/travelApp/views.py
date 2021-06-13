from rest_framework import status, permissions
from rest_framework.generics import (ListCreateAPIView, CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from .serializers import UserSerializer, TripSerializer, DestinationSerializer, TransitSerializer
from .models import Trip, Destination, Transit

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

# Destination


class DestinationCreateAPI(CreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

    def post(self, request, *args, **kwargs):

        trip = Trip.objects.get(pk=kwargs['pk'])
        new_destination = {**request.data, 'belongs_to': trip}
        destination = Destination(**new_destination)

        if destination.booking and trip.budget_left >= destination.booking_price:
            trip.budget_left = trip.budget_left - destination.booking_price
            trip.save()
            destination.save()
            return Response({
                **DestinationSerializer(destination).data
            })
        else:
            return Response(
                {
                    "message": "You don't have enough budget. Budget left is not enough for booking price"
                },
                status=status.HTTP_406_NOT_ACCEPTABLE
            )


class DestinationListAPI(ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

    def get_queryset(self):
        travel_pk = self.kwargs['travel_pk']
        if Trip.objects.get(pk=travel_pk).owner.id == self.request.user.id or \
                Trip.objects.filter(travelers__id=self.request.user.id) is not None:
            return Destination.objects.filter(belongs_to=travel_pk)
        else:
            return Response(
                {"message": "You don't have permission"},
                status=status.HTTP_403_FORBIDDEN
            )


class DestinationRetrieveUpdateDeleteAPI(RetrieveUpdateDestroyAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

    def put(self, request, *args, **kwargs):

        destination = Destination.objects.get(pk=kwargs['pk'])
        trip = destination.belongs_to

        # update budget left
        if request.data.booking_price:
            previous_booking_price = destination.booking_price
            destination.booking_price = request.data.booking_price
            if (trip.budget_left + previous_booking_price - destination.booking_price) < 0:
                return Response(
                    {
                        "message": "You don't have enough budget. Budget left is not enough for booking price"
                    },
                    status=status.HTTP_406_NOT_ACCEPTABLE
                )
            else:
                trip.budget_left = trip.budget_left + previous_booking_price - destination.booking_price

        new_destination = {**request.data, 'belongs_to': trip, id: destination.id}
        destination = Destination(**new_destination)

        destination.save()
        trip.save()

        return Response({
            **DestinationSerializer(destination).data
        })

    def delete(self, request, *args, **kwargs):
        destination = Destination.objects.get(pk=kwargs['pk'])
        trip = destination.belongs_to
        if destination.booking_price:
            trip.budget_left = trip.budget_left + destination.booking_price
            trip.save()

        return self.destroy(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return Response({"message": "Not implemented "}, status=status.HTTP_501_NOT_IMPLEMENTED)


# Transit

class TransitCreateAPI(CreateAPIView):
    queryset = Transit.objects.all()
    serializer_class = TransitSerializer

    def post(self, request, *args, **kwargs):
        travel_pk = kwargs['travel_pk']
        trip = Trip.objects.get(pk=travel_pk)

        start_destination = Destination.objects.get(pk=request.data['start_destination'])
        end_destination = Destination.objects.get(pk=request.data['end_destination'])

        new_transit = {
            **request.data,
            'start_destination': start_destination,
            'end_destination': end_destination,
            'trip': trip
            }
        transit = Transit(**new_transit)
        trip.budget_left = trip.budget_left - transit.price

        trip.save()
        transit.save()

        return Response({
            **TransitSerializer(Transit.objects.get(pk=transit.id)).data
        })


class TransitListAPI(ListAPIView):
    queryset = Transit.objects.all()
    serializer_class = TransitSerializer

    def get_queryset(self):
        travel_pk = self.kwargs['travel_pk']
        if Trip.objects.get(pk=travel_pk).owner.id == self.request.user.id or \
                Trip.objects.filter(travelers__id=self.request.user.id) is not None:
            return Transit.objects.filter(trip=travel_pk)
        else:
            return Response(
                {"message": "You don't have permission"},
                status=status.HTTP_403_FORBIDDEN
            )


class TransitRetrieveUpdateDeleteAPI(RetrieveUpdateDestroyAPIView):
    queryset = Transit.objects.all()
    serializer_class = TransitSerializer

    def delete(self, request, *args, **kwargs):
        transit = Transit.objects.get(pk=kwargs['transit_pk'])
        trip = transit.trip
        trip.budget_left = trip.budget_left + transit.price
        return self.destroy(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return Response({"message": "Not implemented "}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request, *args, **kwargs):
        transit = Transit.objects.get(pk=kwargs['transit_pk'])
        trip = transit.trip

        if request.data['price'] != transit.price:
            trip.budget_left = trip.budget_left - transit.price + request.data['price']
            transit.price = request.data['price']
            start_destination = Destination.objects.get(pk=request.data['start_destination'])
            end_destination = Destination.objects.get(pk=request.data['end_destination'])

            if trip.budget_left < 0:
                return Response(
                    {
                        "message": "You don't have enough budget. Budget left is not enough for booking price"
                    },
                    status=status.HTTP_406_NOT_ACCEPTABLE
                )

            new_transit = {
                **request.data,
                'trip': trip,
                'id': transit.id,
                'start_destination': start_destination,
                'end_destination': end_destination
            }
            print(new_transit)
            transit = Transit(**new_transit)

            transit.save()
            trip.save()

            return Response({
                **TransitSerializer(transit).data
            })




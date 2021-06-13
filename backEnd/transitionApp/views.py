from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from destinationApp.models import Destination
from transitionApp.models import Transit
from transitionApp.serializers import TransitSerializer
from travelApp.models import Trip


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

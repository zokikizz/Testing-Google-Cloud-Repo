from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from destinationApp.models import Destination
from destinationApp.pagination import StandardResultsSetPagination
from destinationApp.serializers import DestinationSerializer
from travelApp.models import Trip


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
    pagination_class = StandardResultsSetPagination

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
        if request.data['booking_price']:
            previous_booking_price = destination.booking_price
            destination.booking_price = request.data["booking_price"]
            if (trip.budget_left + previous_booking_price - destination.booking_price) < 0:
                return Response(
                    {
                        "message": "You don't have enough budget. Budget left is not enough for booking price"
                    },
                    status=status.HTTP_406_NOT_ACCEPTABLE
                )
            else:
                trip.budget_left = trip.budget_left + previous_booking_price - destination.booking_price

        new_destination = {**request.data, 'belongs_to': trip, 'id': destination.id}
        print(new_destination)
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


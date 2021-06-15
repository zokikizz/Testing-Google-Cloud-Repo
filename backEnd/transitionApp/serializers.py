from rest_framework import serializers

from destinationApp.serializers import DestinationSerializer
from transitionApp.models import Transit


class TransitSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    start_destination = DestinationSerializer()
    end_destination = DestinationSerializer()

    class Meta:
        model = Transit
        fields = '__all__'
        depth: 2

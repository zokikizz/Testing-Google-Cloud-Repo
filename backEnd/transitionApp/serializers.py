from rest_framework import serializers

from transitionApp.models import Transit


class TransitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transit
        fields = '__all__'

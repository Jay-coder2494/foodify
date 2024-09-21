from rest_framework import serializers
from .models import (Pizza, Burgers, Gujrati, Desert)


class PizzaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pizza
        fields = "__all__"


class BurgersItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Burgers
        fields = "__all__"


class GujratiItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gujrati
        fields = "__all__"

class DesertItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desert
        fields = "__all__"

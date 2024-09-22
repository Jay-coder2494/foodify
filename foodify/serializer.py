from rest_framework import serializers
from .models import *


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


class ThaliSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thali
        fields = "__all__"


class SouthItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = South
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "cart_details",
            "last_updated",
            "quantity",
        ]
        read_only_fields = ["user", "last_updated"]

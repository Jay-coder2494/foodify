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


class UserDataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserData
        fields = ["email", "first_name", "last_name", "password"]

    def create(self, validated_data):
        user = UserData(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])  # Hash the password
        user.save()
        return user

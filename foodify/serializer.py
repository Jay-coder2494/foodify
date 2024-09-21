from rest_framework import serializers
from .models import Pizza, Burgers


class PizzaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pizza
        fields = "__all__"


class BurgersItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Burgers
        fields = "__all__"

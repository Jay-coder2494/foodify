# myapp/urls.py
from django.urls import path
from .views import *


urlpatterns = [
    path("", SampleView.as_view(), name="hello-world"),
    # food
    path("api/pizza/", PizzaAPIView.as_view(), name="pizza-api"),
    path("api/burger/", BurgersAPIView.as_view(), name="burger-api"),
    path("api/gujrati/", GujratiAPIView.as_view(), name="gujrati-api"),
    path("api/desert/", DesertAPIView.as_view(), name="desert-api"),
    path("api/thali/", ThaliAPIView.as_view(), name="thali-api"),
    path("api/south/", SouthAPIView.as_view(), name="thali-api"),
    

    # other
    path("api/send-otp/", send_otp, name="send-otp"),
    path("api/verify-otp/", verify_otp, name="verify-otp"),
    path(
        "api/check-authentication/", check_authentication, name="check-authentication"
    ),
]


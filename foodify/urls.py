# myapp/urls.py
from django.urls import path
from .views import *


urlpatterns = [
    path("", SampleView.as_view(), name="hello-world"),
    # food
    path("api/pizza/", PizzaAPIView.as_view(), name="pizza-api"),
    path("api/burger/", BurgersAPIView.as_view(), name="burger-api"),

    # other
    path("api/send-otp/", send_otp, name="send-otp"),
    path("api/verify-otp/", verify_otp, name="verify-otp"),
    path(
        "api/check-authentication/", check_authentication, name="check-authentication"
    ),
]


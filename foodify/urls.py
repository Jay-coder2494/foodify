# myapp/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('', HelloWorldView.as_view(), name='hello-world'),
    path('api/send-otp/', send_otp, name='send-otp'),
    path('api/verify-otp/', verify_otp, name='verify-otp'),
    path('api/check-authentication/', check_authentication, name='check-authentication'),
]

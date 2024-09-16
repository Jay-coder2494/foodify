from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from .models import UserData


class OTPBackend(ModelBackend):
    def authenticate(self, request, email=None, otp=None):
        try:
            data = UserData.objects.get(email=email)
            # if UserData.is_expired(self):
            # return None
            if data.otp == otp:
                return data
        except UserData.DoesNotExist:
            return None

    def get_user(self, user_id):
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

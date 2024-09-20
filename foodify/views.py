# myapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random, json, requests
from django.core.mail import send_mail

from django.contrib.auth import authenticate, login, logout

from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class HelloWorldView(APIView):
    def get(self, request):
        return Response({"message": "jay shree krishna!"}, status=status.HTTP_200_OK)



@csrf_exempt
def send_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        if email:
            try:
                otp = random.randint(100000, 999999)

                user_data = User.objects.get(email=email)
                user_data.otp = otp
                user_data.created_at = timezone.now()
                user_data.save()
                # Save OTP and email to the database or cache for verification
                # For example: cache.set(email, otp, timeout=300)  # Store OTP for 5 minutes

                subject = f"verification of otp"
                email_message = f"<h1>Here is the HTML message OTP: {otp}</h1>"
                email_from = settings.EMAIL_HOST_USER
                recp = [email]

                send_mail(
                    subject,
                    email_message,
                    email_from,
                    recp,
                    fail_silently=False,
                    html_message=email_message,
                )
            except User.DoesNotExist:
                return JsonResponse({"status": "error", "message": "data not found"})
            return JsonResponse({"status": "success", "message": "OTP sent"})
        return JsonResponse(
            {"status": "error", "message": "Email is required"}, status=400
        )
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=405
    )


@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        otp = data.get("otp")
        if email and otp:
            try:
                user_data = User.objects.get(email=email)
                if user_data.otp == otp:
                    user = authenticate(request, email=email, otp=otp)
                    print("done")
                    login(request, user)

                    return JsonResponse(
                        {"status": "success", "message": "OTP verified"}
                    )
            except User.DoesNotExist:
                return JsonResponse({"status": "error", "message": "Data Not Found"})
            return JsonResponse(
                {"status": "error", "message": "Invalid OTP"}, status=400
            )
        return JsonResponse(
            {"status": "error", "message": "Email and OTP are required"}, status=400
        )
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=405
    )


@csrf_exempt
def check_authentication(request):
    print("User is authenticated:", request.user)
    if request.user.is_authenticated:
        try:
            user_profile = User.objects.get(email=request.user.email)
            data = {
                "id": user_profile.id,
                # "phone": user_profile.phone,
                "first_name": user_profile.first_name,
                "last_name": user_profile.last_name,
                "email": user_profile.email,
                # "address": user_profile.address,
                # "my_username": user_profile.my_username,
            }
            return JsonResponse({"status": "success", "data": data})
        except User.DoesNotExist:
            return JsonResponse(
                {"status": "error", "message": "User profile not found."}, status=404
            )
    else:
        return JsonResponse(
            {"status": "error", "message": "User is not authenticated."}, status=401
        )

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
from .models import *

from .serializer import *

# serializeer


User = get_user_model()


class SampleView(APIView):
    x = "http://127.0.0.1:8000/"

    def get(self, request):
        data = {
            "pizza-api": f"{self.x}api/pizza/",
            "burger-api": f"{self.x}api/burger/",
            "gujrati-api": f"{self.x}api/gujrati/",
            "desert-api": f"{self.x}api/desert/",
            "Thali-api": f"{self.x}api/thali/",
            "south-api": f"{self.x}api/south/",
        }
        return Response(data)


class PizzaAPIView(APIView):
    def get(self, request):
        pizza_items = Pizza.objects.all()
        serializer = PizzaItemSerializer(pizza_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PizzaItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BurgersAPIView(APIView):
    def get(self, request):
        items = Burgers.objects.all()
        serializer = BurgersItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BurgersItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GujratiAPIView(APIView):
    def get(self, request):
        items = Gujrati.objects.all()
        serializer = GujratiItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GujratiItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DesertAPIView(APIView):
    def get(self, request):
        items = Desert.objects.all()
        serializer = DesertItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DesertItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ThaliAPIView(APIView):
    def get(self, request):
        items = Thali.objects.all()
        serializer = ThaliSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ThaliSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SouthAPIView(APIView):
    def get(self, request):
        items = South.objects.all()
        serializer = SouthItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SouthItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


# for add to cart


# cart data rest framework(get, post, delete)
class CartAPIView(APIView):
    # get cart data
    def get(self, request):
        user_id = request.query_params.get("user_id")

        if not user_id:
            return Response(
                {"error": "user_id parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            cart_items = Cart.objects.filter(user_id=user_id)
            serializer = CartItemSerializer(cart_items, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # save to cart model
    def post(self, request, item_id):
        try:
            cart_item = Cart.objects.get(id=item_id)

            # Update the ordered status to True
            cart_item.ordered = True
            cart_item.save()
            print(cart_item)
            return JsonResponse(
                {"message": "Order confirmed successfully!"}, status=200
            )
        except Cart.DoesNotExist:
            return JsonResponse({"error": "Cart item not found"}, status=404)

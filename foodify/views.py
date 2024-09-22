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
from rest_framework.decorators import api_view, permission_classes

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
            "cart-api": f"{self.x}api/cart/",
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
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
@csrf_exempt
def get_cart_items(request):
    user_id = request.query_params.get("user_id")  # Get user_id from query parameters

    if user_id:
        carts = Cart.objects.filter(
            user=user_id, ordered=False
        )  # Filter cart items by user_id
    else:
        return Response(
            {"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    serializer = CartSerializer(carts, many=True)  # Serialize the cart items
    return Response(serializer.data, status=status.HTTP_200_OK)  # Retu


@api_view(["POST"])
@csrf_exempt
def add_to_cart(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("user_id")
        cart_details = data.get("cart_details")
        quantity = data.get("quantity")

        print(user_id)
        user = User.objects.get(id=user_id)

        print(user, cart_details, quantity)

        # Check if the cart item already exists for the user
        cart_item = Cart.objects.filter(user=user, cart_details=cart_details).first()

        if cart_item:
            # Item exists, update the quantity
            cart_item.quantity += quantity
            cart_item.save()
            return Response({"message": "Quantity updated"}, status=status.HTTP_200_OK)
        else:
            # Item does not exist, create a new cart entry
            Cart(user=user, cart_details=cart_details, quantity=quantity).save()
            return Response(
                {"message": "Added to cart"}, status=status.HTTP_201_CREATED
            )


@api_view(["GET"])
def get_final_orders(request):
    try:
        if request.user.is_authenticated:
            # Fetch final orders for the authenticated user
            orders = FinalOrders.objects.filter(
                user=request.user
            ).values()  # Use values() to return dictionaries
            return Response(orders, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
# @csrf_exempt
def remove_from_cart(request):
    try:
        # Extract item_id from the request body
        item_id = request.data.get("item_id")

        # Get the current authenticated user
        user = request.user

        # Check if the user is authenticated
        if not user.is_authenticated:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )

        # Try to find the cart item based on item_id and user
        cart_item = Cart.objects.get(id=item_id, user=user)

        # Delete the cart item
        cart_item.delete()

        return Response(
            {"message": "Item removed from cart"}, status=status.HTTP_200_OK
        )

    except Cart.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def confirm_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")
            print(user_id)

            # Fetch user by user_id
            user = User.objects.get(id=user_id)

            # Fetch all cart items for this user that haven't been ordered yet
            cart_items = Cart.objects.filter(user=user, ordered=False)

            print(cart_items)

            if not cart_items.exists():
                return JsonResponse({"error": "No items to confirm"}, status=400)

            # Confirm all cart items by creating FinalOrders
            final_orders = []
            for cart_item in cart_items:
                final_order = FinalOrders.objects.create(
                    user=user,
                    item_id=cart_item.id,
                    order_details=cart_item.cart_details,  # Assuming cart_details is JSON
                    quantity=cart_item.quantity,
                )
                final_orders.append(final_order.id)

                # Mark the cart item as ordered
                cart_item.ordered = True
                cart_item.save()
            print(final_orders)

            # Return success response with the list of confirmed orders
            return JsonResponse(
                {"success": True, "order_ids": final_orders}, status=201
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)



@api_view(["POST"])
@csrf_exempt
def logout_view(request):
    logout(request)
    return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
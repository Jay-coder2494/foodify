from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils import timezone
import random
import string
from django.conf import settings


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class UserData(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    otp = models.CharField(max_length=6, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    password = models.CharField(max_length=5000)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    # def is_expired(self):
    #     expiration_time = timezone.now() - timezone.timedelta(
    #         minutes=5
    #     )  # OTP valid for 5 minutes
    #     return self.created_at < expiration_time

    def save(self, *args, **kwargs):
        if not self.pk:  # if it's a new instance
            self.otp = "".join(random.choices(string.digits, k=6))
        super().save(*args, **kwargs)


class Pizza(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} :: {self.price}"


class Burgers(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} :: {self.price}"


class Gujrati(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} :: {self.price}"


class Desert(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} :: {self.price}"


class Thali(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} :: {self.price}"


class South(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} :: {self.price}"


class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cart_details = models.JSONField()  # Store cart items in JSON format
    ordered = models.BooleanField(default=False)  # Track whether the item is ordered
    last_updated = models.DateTimeField(auto_now=True)  # Auto update on every save
    quantity = models.PositiveIntegerField(default=1)  # Quantity of the food item

    def __str__(self):
        return f"Cart for {self.id} - {self.last_updated}"


class FinalOrders(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item_id = models.IntegerField()  # Storing the ID of the item ordered
    order_details = models.JSONField()  # Store detailed cart info (JSON structure)
    phone = models.CharField(max_length=15, blank=True)
    ordered_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=50, default="Pending")
    order_status = models.CharField(max_length=50, default="Confirmed")
    quantity = models.PositiveIntegerField(default=1, blank=True)

    def __str__(self):
        return f"Order {self.id} by {self.user}"

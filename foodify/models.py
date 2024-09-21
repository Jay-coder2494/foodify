from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils import timezone
import random
import string


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

class Burgers(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)

# create a new model for Gujrati 
class Gujrati(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)


class Desert(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=100)
    text = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    time = models.CharField(max_length=100)


    def __str__(self):
        return f"{self.title} :: {self.price}"

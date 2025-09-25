# api/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=[("admin", "Admin"), ("intern", "Intern"), ("manager", "Manager")],
        default="intern"
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    username = models.CharField(max_length=150, blank=False, unique=False)

    USERNAME_FIELD = "email"  # Đăng nhập bằng email
    REQUIRED_FIELDS = ["username"]  # bắt buộc phải có username khi tạo user

    def __str__(self):
        return self.email

from django.db import models
from django.conf import settings

class Task(models.Model):
    STATUS_CHOICES = [
        ("todo", "To Do"),
        ("in_progress", "In Progress"),
        ("done", "Done"),
    ]

    title = models.CharField(max_length=255)  # Tiêu đề task
    des = models.TextField(blank=True, null=True)  # Mô tả task
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="todo"
    )  # Trạng thái task
    deadline = models.DateTimeField(blank=True, null=True)  # Hạn hoàn thành
    created_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Liên kết đến User
        on_delete=models.CASCADE,
        related_name="created_tasks"
    )  # Người tạo task

    def __str__(self):
        return self.title

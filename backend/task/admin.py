from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "status", "deadline", "created_user")  # các cột hiển thị
    list_filter = ("status", "created_user")  # bộ lọc ở sidebar
    search_fields = ("title", "des")  # ô search
    ordering = ("-id",)  # sắp xếp mặc định theo id giảm dần

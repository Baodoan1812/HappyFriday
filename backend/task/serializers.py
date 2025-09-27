from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "des", "status","start", "deadline", "created_user"]
        read_only_fields = ["id", "created_user"]

    # Gán created_user = user hiện tại khi tạo task
    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            validated_data["created_user"] = request.user
        return super().create(validated_data)

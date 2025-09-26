from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by("-id")
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Chỉ lấy task do user hiện tại tạo
    def get_queryset(self):
        return Task.objects.filter(created_user=self.request.user)

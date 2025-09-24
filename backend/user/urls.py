from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, SignupView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename="user")

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', TokenObtainPairView.as_view(), name='signin'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]

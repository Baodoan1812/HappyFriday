from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # chỉ ghi, không trả ra ngoài

    class Meta:
        model = User
        fields = ["id", "email", "username", "password", "role", "created", "updated"]
        read_only_fields = ["created", "updated"]

    def create(self, validated_data):
        # dùng set_password để hash mật khẩu
        password = validated_data.pop("password", None)
        user = self.Meta.model(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

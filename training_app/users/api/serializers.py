from rest_framework.serializers import ModelSerializer
from vislaw.users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "user_type"
        ]

import uuid
from enum import Enum
from django.contrib.auth.models import AbstractUser
from django.db.models import UUIDField, CharField


class UserTypeIdentifier(Enum):
    SUPER_ADMIN = 'Super Admin'
    MANAGER = 'Manager'
    CLIENT = 'Client'


class User(AbstractUser):
    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = CharField(blank=True, max_length=255)
    user_type = CharField(
        max_length=64,
        default=UserTypeIdentifier.CLIENT.name,
        choices=[(_.name, _.value) for _ in UserTypeIdentifier],
    )

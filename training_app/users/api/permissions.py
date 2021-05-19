from rest_framework.permissions import BasePermission
from training_app.users.models import UserTypeIdentifier


SUPER_ADMIN = UserTypeIdentifier.SUPER_ADMIN.name
MANAGER = UserTypeIdentifier.MANAGER.name
CLIENT = UserTypeIdentifier.CLIENT.name


class IsSuperAdmin(BasePermission):

    def has_permission(self, request, view):
        return request.user.user_type == SUPER_ADMIN


class IsManager(BasePermission):

    def has_permission(self, request, view):
        return request.user.user_type == MANAGER


class IsClient(BasePermission):

    def has_permission(self, request, view):
        return request.user.user_type == CLIENT


def is_super(user_type):
    return user_type == SUPER_ADMIN

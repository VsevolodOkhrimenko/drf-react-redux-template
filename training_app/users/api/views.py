from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from .permissions import is_super
from .serializers import UserSerializer

User = get_user_model()


class UserViewSet(RetrieveModelMixin,
                  ListModelMixin,
                  GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self, *args, **kwargs):
        if is_super(self.request.user.user_type):
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=["GET"])
    def me(self, request):
        serializer = self.serializer_class(
            request.user, context={"request": request})
        return Response(data=serializer.data)

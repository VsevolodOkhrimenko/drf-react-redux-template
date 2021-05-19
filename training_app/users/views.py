from datetime import datetime
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from training_app.utils.encrypt import rsa_decrypt
from .serializers import BranchUserSerializer, BranchSiteSerializer
from .models import BranchSite

User = get_user_model()


class UserViewSet(mixins.CreateModelMixin,
                  viewsets.GenericViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    serializer_class = BranchUserSerializer
    queryset = User.objects.all()

    def create(self, request):
        data = request.data
        password = rsa_decrypt(data.get('password', ''))
        user = User.objects.create_user(
            data.get('branch_id', ''), '', password)
        user.first_name = data.get('first_name', '')
        user.last_name = data.get('last_name', '')
        user.save()
        return Response({'status': 'ok'})


class BranchSiteViewSet(mixins.CreateModelMixin,
                        mixins.DestroyModelMixin,
                        mixins.UpdateModelMixin,
                        viewsets.GenericViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = BranchSite.objects.all()
    serializer_class = BranchSiteSerializer

    def create(self, request):
        data = request.data
        password = rsa_decrypt(data.get('password', ''))
        branch_id = data.get('branch_id', '')
        site_id = rsa_decrypt(data.get('site_id', ''))
        core_id = data.get('core_id', '')
        expiration_date = data.get('expiration_date', None)
        if expiration_date:
            expiration_date = datetime.strptime(
                expiration_date, '%Y-%m-%d %H:%M:%S')
        user = User.objects.filter(username=branch_id).first()
        if user and user.check_password(password):
            site, created = BranchSite.objects.get_or_create(
                user=user,
                core_id=core_id,
                site_id=site_id)
            if created:
                site.expiration_date = expiration_date
                site.save()
            return Response({'site_id': site.id})
        return Response({
            'errors': ['User has no permission ' +
                       'to add sites to this project']},
            status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        return Response({
            'errors': ['PUT method not allowed.']},
            status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, pk=None):
        data = request.data
        core_id = pk
        password = rsa_decrypt(data.get('password', ''))
        branch_id = data.get('branch_id', '')
        expiration_date = data.get('expiration_date', None)
        if expiration_date:
            expiration_date = datetime.strptime(
                expiration_date, '%Y-%m-%d %H:%M:%S')
        user = User.objects.filter(username=branch_id).first()
        if user and user.check_password(password):
            site = BranchSite.objects.filter(
                user=user.id,
                core_id=core_id).first()
            if site:
                site.expiration_date = expiration_date
                site.save()
            return Response({'site_id': site.id})
        return Response({
            'errors': ['User has no permission ' +
                       'to update this branch']},
            status=status.HTTP_401_UNAUTHORIZED)

    def destroy(self, request, pk=None):
        data = request.data
        user = User.objects.filter(username=data.get('branch_id', '')).first()
        password = rsa_decrypt(data.get('password', ''))
        site = self.queryset.filter(user=user, core_id=pk).first()
        if site and user.check_password(password):
            site.delete()
            return Response({
                'status': 'No content'}, status=status.HTTP_204_NO_CONTENT)
        return Response({
            'core_id': ['Incorrect site core id or cross ' +
                        'api project password']},
                        status=status.HTTP_401_UNAUTHORIZED)

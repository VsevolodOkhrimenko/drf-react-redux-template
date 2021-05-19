from rest_framework import serializers
from .models import BranchSite


class BranchUserSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=256)
    branch_id = serializers.UUIDField(format='hex_verbose')


class BranchSiteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=256)
    branch_id = serializers.UUIDField(format='hex_verbose')
    fingerprint = serializers.CharField(max_length=256)
    site_id = serializers.CharField(max_length=256, required=False)

    class Meta:
        model = BranchSite
        fields = (
            'password',
            'branch_id',
            'fingerprint',
            'site_id',
        )

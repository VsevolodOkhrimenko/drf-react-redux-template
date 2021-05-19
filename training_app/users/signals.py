from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from .models import UserExtensionModel

User = get_user_model()


def user_created(sender, instance, created, **kwargs):
    if created:
        user_extension = UserExtensionModel(user=instance)
        user_extension.save()


post_save.connect(user_created, sender=User)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site
from .forms import UserChangeForm, UserCreationForm
from .models import User


class UserAdmin(UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name", "user_type",)}),) + UserAdmin.fieldsets
    list_display = ["username", "name", "is_superuser"]
    search_fields = ["name"]


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
admin.site.unregister(Site)

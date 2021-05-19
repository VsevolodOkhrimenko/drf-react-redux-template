from django.conf import settings
from django.urls import include, path
from rest_framework.routers import DefaultRouter, SimpleRouter


if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()


app_name = 'api'
api_urls = [
  path(r'', include(router.urls)),
]

urlpatterns = [path(r'v1/', include(api_urls))]

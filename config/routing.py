from django.conf.urls import url
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from config.token_auth import TokenAuthMiddlewareStack
from training_app.users.consumers import SocketsConsumer


application = ProtocolTypeRouter({
  "websocket": AllowedHostsOriginValidator(
        TokenAuthMiddlewareStack(
            URLRouter([
              url(r"^sockets/", SocketsConsumer),
            ])
        ),
    ),
})

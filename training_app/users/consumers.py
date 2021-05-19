import logging
from channels.generic.websocket import AsyncJsonWebsocketConsumer


logger = logging.getLogger(__name__)


class SocketsConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add(
            self.scope['user'].username.lower(), self.channel_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.scope['user'].username.lower(), self.channel_name)

    async def receive(self, text_data):
        logger.info("CUSTOM MESSAGE RECIVED", text_data)

    async def notification_send(self, notification_data):
        await self.send_json(content=notification_data['payload'])

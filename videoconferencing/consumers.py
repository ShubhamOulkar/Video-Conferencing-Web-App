# chat/consumers.py
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer

logger = logging.getLogger('root')

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["channel_name"]
        self.room_group_name = "chat_%s" % self.room_name
        logger.info('new channel is formed.')
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        logger.info('channel is closed.')
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # print(text_data_json)
        # Send message to room group
        logger.info("message is received from websocket.")
        await self.channel_layer.group_send(
            self.room_group_name, {"type":"send.message","message": text_data_json}
        )

    # Receive message from room group
    async def send_message(self, event):
        message = event["message"]
        # Send message to WebSocket
        logger.info("Message is send back to websocket.")
        await self.send(text_data=json.dumps({"message": message}))
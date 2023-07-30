# chat/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/videocall/(?P<channel_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
]

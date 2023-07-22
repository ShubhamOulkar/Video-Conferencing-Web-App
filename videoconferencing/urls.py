from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home view'),
    # path('', views.index ),
    # path('channel_room/<str:channel_name>/', views.channel_room, name='channel_room' ),
]

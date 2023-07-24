from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home view'),
    path('let-me-in/', views.signup, name='let-me-in'),
    # path('', views.index ),
    # path('channel_room/<str:channel_name>/', views.channel_room, name='channel_room' ),
]

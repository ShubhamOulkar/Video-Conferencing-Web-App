from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'), # type: ignore
    path('login/', views.user_login, name='login'), # type: ignore
    path('signout/', views.signout, name='signout'),
    path('room/', views.index, name='room' ),
    # path('channel_room/<str:channel_name>/', views.channel_room, name='channel_room' ),
]

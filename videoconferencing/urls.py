from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'), 
    path('login/', views.user_login, name='login'),  # type:ignore
    path('signout/', views.signout, name='signout'),
    path('forgotpassword/', views.forgotpassword, name='forgotpassword'),
    path('send_email/',views.send_email, name='send_email'),
    path('verify_code/',views.verify_code, name='verify_code'), # type: ignore
    path('reset_password/', views.reset_password, name='reset_password'), 
    path('room/', views.index, name='room' ),
    # path('channel_room/<str:channel_name>/', views.channel_room, name='channel_room' ),
]

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, logout, login
from django.contrib import messages
import random 
import time
import re
import json
from .models import *


# home page function view
def home(request):
    return render(request, 'videoconferencing/home.html')


def signup(request):
    if request.method == "POST":
        name = request.POST["name"]
        email = request.POST["email"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["conformpassword"]

        if password != confirmation:
            messages.error(request, 'Password must match')
            return render(request, "videoconferencing/home.html")
        
        print({'name':name, "email":email, 'password': password})

        #     # Attempt to create new user
        # try:
        #     user = User.objects.create_user(username, email, password) 
        #     user.save()
        # except IntegrityError:
        #     messages.error(request, 'Username / Email Already taken.')
        #     return render(request, "webvc/getin.html")

        # login(request, user)
        return HttpResponseRedirect(reverse("room"))
    else:
        return HttpResponseRedirect(reverse("home"))


def user_login(request):
    if request.method == 'POST':
        
        email_username = request.POST["email"]
        password = request.POST["password"]

        print({'user':email_username, 'password':password})
        return HttpResponseRedirect(reverse("room"))
        # # check if email_username is an email or username
        # if re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email_username):
        #     # get an username for an email
        #     try:
        #         username = User.objects.get(email=email_username)
        #         user = authenticate(request, username=username.username, password=password)

        #         if user is None:
        #         # check why none ? because of username or password
        #             if not username.check_password(password):
        #                 messages.error(request, "Password is incorrect.")
    
        #     except User.DoesNotExist:
        #         user = None
        #         messages.error(request, "Email does not exist")
        #     else :
        #         try:
        #             username = User.objects.get(username=email_username.lower())
        #             user = authenticate(request, username=email_username.lower(), password=password)
                   
        #             if user is None:
        #             # check why none ? because of username or password
        #                 if not username.check_password(password):
        #                     messages.error(request, "Password is incorrect.")
                            
        #         except User.DoesNotExist:
        #             user = None
        #             messages.error(request, "Username does not exist")
                
                
        # # Check if authentication successful
        # if user is not None:
        #     login(request, user)
        #     return HttpResponseRedirect(reverse("room"))
        # else:
        #     return HttpResponseRedirect(reverse("home"))


def signout(request):
    logout(request)
    return HttpResponseRedirect(reverse("home"))



# WEBRTC function view
def index(request):
    return render(request, 'videoconferencing/index.html')


def channel_room(request, channel_name):
    return render(request, 'videoconferencing/channel_room.html',{'channel_name':channel_name})
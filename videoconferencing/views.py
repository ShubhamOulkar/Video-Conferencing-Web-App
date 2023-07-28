from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth import authenticate, logout, login
from django.contrib import messages
from django.conf import settings
from django.core.mail import BadHeaderError, send_mail
import random 
import time
import re
import json
from .models import *

# varification code choice number from this list
number_list = [0,1, 2, 3, 4, 5, 6, 7, 8, 9 ]

# home page function view
def home(request):
    return render(request, 'videoconferencing/home.html')


def signup(request):
    if request.method == "POST":
        username = request.POST["name"]
        email = request.POST["email"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["conformpassword"]

        if password != confirmation:
            messages.error(request, 'Password must match')
            return render(request, "videoconferencing/home.html")
        
        # print({'name':username, "email":email, 'password': password})

            # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)  # type: ignore
            user.save()
        except IntegrityError:
            messages.error(request, 'Username / Email Already taken.')
            return render(request, "videoconferencing/home.html")

        login(request, user)
        return HttpResponseRedirect(reverse("room"))
    else:
        return HttpResponseRedirect(reverse("home"))


def user_login(request):
    if request.method == 'POST':
        
        email_username = request.POST["email"]
        password = request.POST["password"]

        # check if email_username is an email or username
        if re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email_username):
            # get an username for an email
            try:
                username = User.objects.get(email=email_username)
                user = authenticate(request, username=username.username, password=password)

                if user is None:
                # check why none ? because of username or password
                    if not username.check_password(password):
                        messages.error(request, "Password is incorrect.")
    
            except User.DoesNotExist:
                user = None
                messages.error(request, "Email does not exist")
        else :
            try:
                username = User.objects.get(username=email_username.lower())
                user = authenticate(request, username=email_username.lower(), password=password)
                   
                if user is None:
                # check why none ? because of username or password
                    if not username.check_password(password):
                        messages.error(request, "Password is incorrect.")
                            
            except User.DoesNotExist:
                    user = None
                    messages.error(request, "Username does not exist")
                
                
            # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("room"))
        else:
            return HttpResponseRedirect(reverse("home"))



def signout(request):
    logout(request)
    return HttpResponseRedirect(reverse("home"))


def forgotpassword(request):
    return render(request, 'videoconferencing/forgotpassword.html')


# API -> send email for verification
def send_email(request):
    if request.method == 'POST':
        email = json.loads(request.body)
        subject = 'Connect RTC: Reset Password varification code'
        global code
        code = random.choices(number_list, k=6)
        # check email exist or not
        to_email = email['email']
        try:
            email = User.objects.get(email=to_email)
        except User.DoesNotExist:
            to_email = False
            message = "Following email is not valid."
            return JsonResponse({'message':message, 'email':email['email'], 'status':False}, safe=False)
            
        from_email = settings.EMAIL_HOST_USER
        if subject and code and to_email:
            try:
                send_mail(subject, ''.join(map(str,code)), from_email, [to_email])
            except BadHeaderError:
                return HttpResponse("Invalid header found.")
            message = "verification code is send to following email." 
            return JsonResponse({'message':message, 'email':to_email}, safe=False)      
    return render(request, 'webvc/forgetpassword.html')
        

# API -> verify user received code
def verify_code(request):
    if request.method == 'POST':
        code0 = json.loads(request.body)
        
        if code0['code'] == ''.join(map(str,code)):
            message = "verification is done! now set your password for following email."
            status = True
        else:
            message = "verification failed! for following email."
            status = False
            return JsonResponse({'message':message,'email':code0['email'], 'status':status}, safe=False)
        return JsonResponse({'message':message,'email':code0['email']}, safe=False) 


# API -> reset and save new password
def reset_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        password = data['password']
        user = User.objects.get(email=data['email'])
        user.set_password(password)
        user.save()
    return JsonResponse({'message':'Password Saved, try login for following email'}, safe=False)


# WEBRTC function view
def index(request):
    return render(request, 'videoconferencing/index.html')


def channel_room(request, channel_name):
    return render(request, 'videoconferencing/channel_room.html',{'channel_name':channel_name})
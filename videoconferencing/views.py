from django.shortcuts import render


# home page function view
def home(request):
    return render(request, 'videoconferencing/home.html')


def signup(request):
    return render(request, 'videoconferencing/signup.html')



# WEBRTC function view
def index(request):
    return render(request, 'videoconferencing/index.html')


def channel_room(request, channel_name):
    return render(request, 'videoconferencing/channel_room.html',{'channel_name':channel_name})
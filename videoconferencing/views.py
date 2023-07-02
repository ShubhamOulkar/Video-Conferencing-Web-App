from django.shortcuts import render


def index(request):
    return render(request, 'videoconferencing/index.html')


def channel_room(request, channel_name):
    return render(request, 'videoconferencing/channel_room.html',{'channel_name':channel_name})
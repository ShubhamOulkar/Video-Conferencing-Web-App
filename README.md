# Video-Conferencing-Web-App

### Peer to Peer video calling connection with screen sharing 

### How to run application locally ?
#### 1 - Clone repo
```
 git clone https://github.com/ShubhamOulkar/Video-Conferencing-Web-App.git
```
#### 2 - Create/activate virtual environment in your current directory

#### 3 - Install requirements
```
pip install -r requirements.txt
```
#### 4 - change directory to mainfolders
```
cd main
```
### 5 - open main folder and create .env file add following varibles
```
REDIS_URL: {create redis stack acount https://app.redislabs.com/#/ and add free redis server url here}
EMAIL_HOST_USER: {your email address}
EMAIL_HOST_PASSWORD: {gmail app password}

<!-- Adding external redis url will slow down our signalling process I dont recommend this only use when your hosting environment dont have internal redis server-->
```

```
<!-- Don't forget to change settings.py file as follows -->

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [env('REDIS_URL')], 
        },
    },
}
```

#### option:1 If redis is available on machine then change following hosts address  and port. Default port is 6379.
```
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [('ADD-YOUR-REDIS-ADDRESS', REDIS-PORT)], 
        },
    },
}
```

#### option:2 if you dont have above options then just use django-channels in memory channel_layer as follows.  This layer can be helpful in Testing or for local-development purposes:

```
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}
```

#### 6 - run following commands for migrations in terminal
```
python manage.py makemigrations
```
```
python manage.py migrate
```

#### 7 - Start server
```
python manage.py runserver
```


# Readme file will be updated soon.



import * as store from './store_stream.js';

let userconnection;
let signaling_connection;


const server = {
    iceServer: [{
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }]
}

const channel_name = document.querySelector('#channel-name').innerHTML;
    
signaling_connection = new  WebSocket('ws://' + window.location.host + '/ws/channel_room/' + channel_name + '/')

const getLocalMedia = async ()=>{
    await navigator.mediaDevices.getUserMedia({'audio':false, 'video':true})
    .then(localMedia => {
        store.setLocalStrem(localMedia);
        const localUser = document.querySelector('#localuser');
        localUser.srcObject = localMedia;
        console.log('local media devices got connected:',localMedia)
    }).catch(err => {
        console.log('accessing local media devices error: ', err);
    }); 
    createUserConnection(); 
};

getLocalMedia();

const createUserConnection = ()=>{
    userconnection = new RTCPeerConnection(server);
    console.log('RTC userconnection established.')

    userconnection.onicecandidate = (event)=>{
        if(event.candidate){
            // send ice candidate
            console.log('icecandidate send')
        };
    };

    userconnection.onconnectionstatechange = (event)=>{
        if(userconnection.connectionState === 'connected'){
            console.log('succesfully connected to remote user.')
        };
    };

    // add receiving tracks from remote user
    const remoteMedia = new MediaStream();
    const remoteUser = document.querySelector('#remoteuser');
    remoteUser.srcObject = remoteMedia;
    store.setRemoteStream(remoteMedia);
    userconnection.ontrack = (event)=>{
        remoteMedia.addTrack(event.track);
        console.log('remote tracks added to RTC connection:',remoteMedia);
    };
    
    // add local media 
    const localMedia = store.getState().localStream;
    
    localMedia.getTracks().forEach((track) => {
        userconnection.addTrack(track, localMedia);
        console.log('local tracks added to RTC connection:',localMedia);
    });
};


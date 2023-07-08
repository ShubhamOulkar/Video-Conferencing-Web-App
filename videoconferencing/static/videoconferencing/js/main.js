import * as store from './store_stream.js';

let userconnection;
let signaling_connection;
let uid =  Math.floor((Math.random() * 1000));

const server = {
    iceServer: [{
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }]
}

const channel_name = document.querySelector('#channel-name').innerHTML;

const getLocalMedia = async ()=>{
    await navigator.mediaDevices.getUserMedia({'audio':true, 'video':true})
    .then(localMedia => {
        store.setLocalStrem(localMedia);
        const localUser = document.querySelector('#localuser');
        localUser.srcObject = localMedia;
        console.log('local media devices got connected:',localMedia)
    }).catch(err => {
        console.log('accessing local media devices error: ', err);
    }); 

    signaling_connection = new  WebSocket('ws://' + window.location.host + '/ws/channel_room/' + channel_name + '/')

    signaling_connection.onopen = ()=>{
        signaling_connection.send(JSON.stringify({'type':'ready'}));
    };
    
    signaling_connection.addEventListener('message', handleMessage);
};

getLocalMedia();

const createUserConnection = ()=>{
    userconnection = new RTCPeerConnection(server);
    console.log('RTC userconnection established.');

    userconnection.onicecandidate = (event)=>{
        if(event.candidate){
            // send ice candidate
            signaling_connection.send(JSON.stringify({
                'uid':uid,
                'type':'candidate',
                'candidate':event.candidate,
            }));
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

const handleMessage = (event)=>{
    const data = JSON.parse(event.data);
    console.log('received message from server:',data.message);

    switch (data.message.type){
        case 'offer':
            if(uid === data.message.uid){
                return;
            }else{
                sendUserAnswer(data.message.offer);
            };
            break;
        case 'answer':
            if(uid === data.message.uid){
                return;
            }else{
                addAnswer(data.message.answer);
            };
            break;
        case 'candidate':
            if(uid === data.message.uid){
                return;
            }else{
                addCandidate(data.message.candidate);
            };
            break;
        case 'ready':
            sendUserOffer();
            break;
        default:
            return;
    }
};

const sendUserOffer = async()=>{
    createUserConnection();

    store.setLocalUser(userconnection);

    let localuser = store.getState().localUser;

    const offer = await localuser.createOffer();
    await localuser.setLocalDescription(offer);

    signaling_connection.send(JSON.stringify({
        'uid' : uid,
        'type':'offer',
        'offer':offer,
    }));
};

const sendUserAnswer = async (offer)=>{
    createUserConnection();

    store.setRemoteUser(userconnection);

    let remoteuser = store.getState().remoteUser;

    await remoteuser.setRemoteDescription(offer);

    const answer = await remoteuser.createAnswer();
   
    await remoteuser.setLocalDescription(answer);

    signaling_connection.send(JSON.stringify({
        'uid':uid,
        'type' : 'answer',
        'answer' : answer,
    }));
};

const addAnswer = (answer)=>{
    let localuser = store.getState().localUser;
    localuser.setRemoteDescription(answer);
    console.log('webrtc answer came:', answer)
};

const addCandidate = async (candidate)=>{
    console.log('icecandidate:',candidate);
    try{
        await userconnection.addIceCandidate(candidate);
    }catch (error) {
        console.log('error occured while ice candidate:',error);
    }
};

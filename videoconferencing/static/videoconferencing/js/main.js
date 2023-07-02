let client;
let channel;
let localMedia;
let remoteMedia;
let screenMedia;
let userconnection;
let signaling_connection;

const server = {
    iceServer: [{
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }]
}

let stratApp = async () => {
    const channel_name = document.querySelector('#channel-name').innerHTML;

    signaling_connection = new WebSocket('ws://' + window.location.host + '/ws/channel_room/' + channel_name + '/')

    signaling_connection.onmessage =  (e) => {
        const data = JSON.parse(e.data);
        console.log('sdp received :', data.message) 
    };

    signaling_connection.onclose = async (e) => {
        console.error('Chat socket closed unexpectedly');
    };

    localMedia = await navigator.mediaDevices.getUserMedia({ 'video': true, 'audio': true, });

    document.querySelector('#screen-share-button').addEventListener('click', async (e) => {
        e.preventDefault
        screenMedia = await navigator.mediaDevices.getDisplayMedia({ 'video': true, 'audio': false, });
        document.querySelector('#screen-share').style.display = 'block';
        document.querySelector('#screen-share').srcObject = screenMedia
    })

    document.querySelector('#localuser').srcObject = localMedia

    createOffer()
}

let createOffer = async () => {
    userconnection = new RTCPeerConnection(server)

    remoteMedia = new MediaStream()
    document.querySelector('#remoteuser').srcObject = remoteMedia

    localMedia.getTracks().forEach((track) => {
        userconnection.addTrack(track, localMedia)
    })

    userconnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteMedia.addTrack(track)
        })
    }

    userconnection.onicecandidate = (event) => {
        if (event.candidate) {
            // console.log("ICE", event.candidate)
        }
    }

    userconnection.createOffer()
    .then((offer)=>{
        userconnection.setLocalDescription(offer)
        signaling_connection.send(JSON.stringify({'type':'offer','message':offer}))
        console.log('sdp send:', offer)
    })
    .catch((error)=>{
        console.log('error:',error)
    })
}

stratApp()
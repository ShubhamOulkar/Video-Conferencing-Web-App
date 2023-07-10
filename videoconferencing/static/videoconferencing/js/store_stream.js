let streams = {
    localStream : null,
    remoteStream : null,
    screenSharingStream : null,
    remoteUser: null,
    localUser: null,
    screenSharingActive : false,
};


export const setLocalStrem = (stream) => {
    streams = {
        ...streams,
        localStream: stream,
    };
};

export const setScreenSharingActive = (state)=>{
    streams = {
        ...streams,
        screenSharingActive : state,
    };
};

export const setScreenSharingStream = (stream) => {
    streams = {
        ...streams,
        screenSharingStream:stream,
    };
};

export const setRemoteStream = (stream)=>{
    streams = {
        ...streams,
        remoteStream:stream,
    };
};


export const setLocalUser = (uid) => {
    streams = {
        ...streams,
        localUser: uid,
    };
};

export const setRemoteUser = (uid) => {
    streams = {
        ...streams,
        remoteUser: uid,
    };
};


export const getState = ()=>{
    return streams
};
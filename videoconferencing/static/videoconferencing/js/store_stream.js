let streams = {
    localStream : null,
    remoteStream : null,
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

export const setScreenSharingActive = (screenSharingActive) => {
    streams = {
        ...streams,
        screenSharingActive: screenSharingActive,
    };
};


export const getState = ()=>{
    return streams
};
let streams = {
    localStream : null,
    remoteStream : null,
    screenSharingStream : null,
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


export const getState = ()=>{
    return streams
};
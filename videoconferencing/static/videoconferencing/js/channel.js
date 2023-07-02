const channel_name = document.querySelector('#channel-name');
const join_btn = document.querySelector('#join-btn');

channel_name.onkeyup = function (e){
    if(e.keyCode === 13 ){
        join_btn.click();
    }
}


join_btn.onclick = function (e){
    window.location.pathname = '/channel_room/' + channel_name.value + '/' ;
}
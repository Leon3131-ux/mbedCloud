const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

$( document ).ready(function() {
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/temp", function (temp){
            console.log("temperature: " + temp);
        });
    })
});

$(window).on('beforeunload', function(){
    socket.close();
});

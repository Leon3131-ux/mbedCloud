const socket = new WebSocket("ws://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    console.log("successfully connected");
    stompClient.subscribe("/topic/temp", function (temp){
        console.log("temperature: " + temp);
    });
})

const socket = new WebSocket("ws://localhost:8080/websocket");
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    console.log("successfully connected");
    stompClient.subscribe("/topic/temp", function (temp){
        console.log("temperature: " + temp);
    });
})

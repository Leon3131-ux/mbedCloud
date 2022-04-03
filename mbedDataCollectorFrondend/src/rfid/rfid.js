const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

$( document ).ready(function() {
    $("#navbar").load("../shared/navbar.html", function (){
        $("#rfidLink").attr("aria-current", "true").addClass("active");
    });
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/rfid", function (rfid) {
            updateHeader(rfid.body);
        });
    });
});

$(window).on('beforeunload', function(){
    socket.close();
});

function updateHeader(uuid){
    $("#rfidHeader").text("Current RFID UUID: " + uuid);
}

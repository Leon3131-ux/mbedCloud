const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

let display = null;

$( document ).ready(function() {
    $("#navbar").load("../shared/navbar.html", function (){
        $("#displayLink").attr("aria-current", "true").addClass("active");
    });
});

function submitText() {
    $.ajax({
        type: 'POST',
        url: 'http://164.92.173.232:23552/api/display',
        contentType: 'application/json',
        data: JSON.stringify({"displayText": $("#displayText").val()}),
        success: function (){
            console.log('Display text submitted successfully');
        },
        dataType: 'text'
    })
}
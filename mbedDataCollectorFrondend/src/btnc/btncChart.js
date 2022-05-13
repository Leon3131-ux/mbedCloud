const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

let btncChart = null;

$( document ).ready(function() {
    $("#navbar").load("../shared/navbar.html", function (){
        $("#btncChartLink").attr("aria-current", "true").addClass("active");
    });
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/button", function (clicks) {
            if(btncChart != null){
                addValueToChart(clicks.body, btncChart);
            }
        });
    });
    const btncChartElement = $("#btncChart");
    btncChart = initializeButtonChart(btncChartElement);
});

$(window).on('beforeunload', function(){
    socket.close();
});

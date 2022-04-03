const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

let tempChart = null;

$( document ).ready(function() {
    $("#navbar").load("../shared/navbar.html", function (){
        $("#tempChartLink").attr("aria-current", "true").addClass("active");
    });
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/temp", function (temp) {
            if(tempChart != null){
                addValueToChart(temp.body, tempChart);
            }
        });
    });
    const tempChartElement = $("#tempChart");
    tempChart = initializeTempChart(tempChartElement);
});

$(window).on('beforeunload', function(){
    socket.close();
});

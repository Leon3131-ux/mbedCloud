const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

let gyroChart = null;

$( document ).ready(function() {
    $("#navbar").load("../shared/navbar.html", function (){
        $("#gyroChartLink").attr("aria-current", "true").addClass("active");
    });
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/gyro", function (taps) {
            if(gyroChart != null){
                addValueToChart(taps.body, gyroChart);
            }
        });
    });
    const gyroChartElement = $("#gyroChart");
    gyroChart = initializeGyroChart(gyroChartElement);
});

$(window).on('beforeunload', function(){
    socket.close();
});

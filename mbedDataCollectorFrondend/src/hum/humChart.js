const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

let humChart = null;

$( document ).ready(function() {
    $("#navbar").load("../shared/navbar.html", function (){
        $("#humChartLink").attr("aria-current", "true").addClass("active");
    });
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/hum", function (humidity) {
            if(humChart != null){
                addValueToChart(humidity.body, humChart);
            }
        });
    });
    const humChartElement = $("#humChart");
    humChart = initializeHumChart(humChartElement);
});

$(window).on('beforeunload', function(){
    socket.close();
});

const socket = new SockJS("mbed-cloud-git-ws-test-project.apps.ocp-dev01.wgn.wuerth.com/websocket");
const stompClient = Stomp.over(socket);

let buttonChart = null;
let tempChart = null;
let humChart = null;
let gyroChat = null;

$( document ).ready(function() {
    $("#navbar").load("../shared/navbar.html", function (){
        $("#allChartsLink").attr("aria-current", "true").addClass("active");
    });
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/btnc", function (clicks) {
            if(buttonChart != null){
                addValueToChart(clicks.body, buttonChart);
            }
        });
        stompClient.subscribe("/topic/temp", function (temp) {
            if(tempChart != null){
                addValueToChart(temp.body, tempChart);
            }
        });
        stompClient.subscribe("/topic/humidity", function (humidity) {
            if(humChart != null){
                addValueToChart(humidity.body, humChart);
            }
        });
        stompClient.subscribe("/topic/gyro", function (taps) {
            if(gyroChat != null){
                addValueToChart(taps.body, gyroChat);
            }
        });
        stompClient.subscribe("/topic/rfid", function (rfid) {
            updateRfidHeader(rfid.body);
        });
    });
    const buttonChartElement = $("#btncChart");
    const tempChartElement = $("#tempChart");
    const humChartElement = $("#humChart");
    const gyroChartElement = $("#gyroChart");
    buttonChart = initializeButtonChart(buttonChartElement);
    tempChart = initializeTempChart(tempChartElement);
    humChart = initializeHumChart(humChartElement);
    gyroChat = initializeGyroChart(gyroChartElement);
});

$(window).on('beforeunload', function(){
    socket.close();
});

function updateRfidHeader(uuid){
    $("#rfidHeader").text("Current RFID UUID: " + uuid);
}

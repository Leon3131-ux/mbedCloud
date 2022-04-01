const socket = new SockJS("http://164.92.173.232:23552/websocket");
const stompClient = Stomp.over(socket);

var buttonChart = null;
var tempChart = null;


$( document ).ready(function() {
    stompClient.connect({}, () => {
        console.log("successfully connected");
        stompClient.subscribe("/topic/btnc", function (click) {
            if(buttonChart != null){
                addValueToChart(click.body, buttonChart);
            }
        });
        stompClient.subscribe("/topic/temp", function (click) {
            if(tempChart != null){
                addValueToChart(click.body, tempChart);
            }
        });
    });
    const buttonChartElement = $("#btncChart");
    const tempChartElement = $("#tempChart");
    initializeButtonChart(buttonChartElement);
    initializeTempChart(tempChartElement);
});

$(window).on('beforeunload', function(){
    socket.close();
});

function addValueToChart(value, chart){
    let labels = chart.data.labels;
    if(chart.data.datasets[0].data.length >= labels.length){
        chart.data.datasets[0].data.splice(0, 1);

        labels.splice(0, 1)
        labels.push(labels[labels.length - 1] + 1);
    }
    chart.data.datasets[0].data.push(value);
    chart.update();
}

function initializeButtonChart(element){
    const labels = [];
    for(let i = 0; i < 10; i++){
        labels.push(i);
    }
    buttonChart = new Chart(element, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of clicks',
                data: [],
                fill: true,
                backgroundColor: "rgba(61, 166, 167, 0.2)"

            }]
        },
        options: {
            showLines: true,
            scales: {
                y: {
                    min: 0,
                    suggestedMax: 10,
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time passed in seconds',
                        align: 'center'
                    }
                }
            }
        }
    })
}

function initializeTempChart(element){
    const labels = [];
    for(let i = 0; i < 10; i++){
        labels.push(i);
    }
    tempChart = new Chart(element, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature in Celsius',
                data: [],
                fill: true,
                backgroundColor: "rgba(61, 166, 167, 0.2)"

            }]
        },
        options: {
            showLines: true,
            scales: {
                y: {
                    min: -10,
                    suggestedMax: 40,
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time passed in seconds',
                        align: 'center'
                    }
                }
            }
        }
    })
}
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
    return initializeChart(
        element,
        0,
        10,
        "rgba(61, 166, 167, 0.2)",
        'Number of clicks'
    );
}

function initializeTempChart(element){
    return initializeChart(
        element,
        -10,
        40,
        "rgba(245, 34, 34, 0.2)",
        'Temperature in Celsius'
    );
}

function initializeHumChart(element){
    return initializeChart(
        element,
        0,
        100,
        "rgba(52, 58, 233, 0.2)",
        'Humidity in Percent'
    );
}

function initializeGyroChart(element){
    return initializeChart(
        element,
        0,
        10,
        "rgba(233, 141, 52, 0.2)",
        'Taps detected by Gyroscope'
    );
}

function initializeChart(element, labelRangeMin, labelRangeMax, fillColor, lineLabelText){
    const labels = [];
    for(let i = 0; i <= 10; i++){
        labels.push(i);
    }
    return new Chart(element, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: lineLabelText,
                data: [],
                fill: true,
                backgroundColor: fillColor

            }]
        },
        options: {
            showLines: true,
            scales: {
                y: {
                    min: labelRangeMin,
                    suggestedMax: labelRangeMax,
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
    });
}

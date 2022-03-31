$(document).ready(function () {
    comcastifyjs.letsPrepareTheseImages();
});

$(window).load(function () {
    comcastifyjs.fixMyImagesLoadingSoFast({
        loadMaxPercent: 0.75,
        loadSpeed: 1000,
        loadIncrement: 5,
        boxColor: '#ece4d8'
    })();
});
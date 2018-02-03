require("jquery-flight-indicators/js/jquery.flightindicators.min.js");
require("jquery-flight-indicators/css/flightindicators.css");
var { ipcRenderer } = require("electron");

var indicator_options = { 
    img_directory: '../node_modules/jquery-flight-indicators/img/',
    showBox: false
}

var attitude = $.flightIndicator('.attitude', 'attitude', indicator_options);
var heading = $.flightIndicator('.heading', 'heading', indicator_options);
var airspeed = $.flightIndicator('.airspeed', 'airspeed', indicator_options);
var altimeter = $.flightIndicator('.altimeter', 'altimeter', indicator_options);

ipcRenderer.on('drone-attitude', (event, payload) => {
    var roll = payload.roll * (180 / Math.PI) * -1;
    var pitch = payload.pitch * (180 / Math.PI);
    var yaw = payload.yaw * (180 / Math.PI);

    // Update Gauges
    attitude.setRoll(roll);
    attitude.setPitch(pitch);
    heading.setHeading(yaw);
});

ipcRenderer.on('drone-gps', (event, payload) => {

});
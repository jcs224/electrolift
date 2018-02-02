require("./scss/style.scss");
require("leaflet/dist/leaflet.css");
require("jquery-flight-indicators/css/flightindicators.css");
var L = require("leaflet");
require("jquery-flight-indicators/js/jquery.flightindicators.min.js");

// Weird leaflet stuff
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// End weirdness

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

var indicator_options = { 
    img_directory: '../node_modules/jquery-flight-indicators/img/',
    showBox: false
}

var attitude = $.flightIndicator('.attitude', 'attitude', indicator_options);
var heading = $.flightIndicator('.heading', 'heading', indicator_options);
var airspeed = $.flightIndicator('.airspeed', 'airspeed', indicator_options);
var altimeter = $.flightIndicator('.altimeter', 'altimeter', indicator_options);
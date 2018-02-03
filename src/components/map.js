var L = require("leaflet");
var { ipcRenderer } = require("electron");

var drone_marker; // Drone marker
var is_centered = false; // Is the map already centered in the right spot?

// Weird leaflet stuff
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// End weirdness

var map = L.map('map').setView([51.505, -0.09], 13);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


Esri_WorldImagery.addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

ipcRenderer.on('drone-gps', (event, payload) => {
    // Update map
    if (drone_marker) {
        var newLatLng = new L.LatLng(payload.lat, payload.lon);
        drone_marker.setLatLng(newLatLng)
        // .setRotationAngle(payload.hdg / 100 - 180).setRotationOrigin('center center');
        
        if (!is_centered) {
            map.setView(newLatLng);
            is_centered = true;
        }
    } else {
        var noshadow_icon = new L.Icon.Default();
        noshadow_icon.options.shadowSize = [0,0];
        drone_marker = L.marker([payload.lat, payload.lon], {zIndexOffset: 1000 }).addTo(map);
    }

    // Update gauges
});

module.exports = map;
require("./scss/style.scss");
require("leaflet/dist/leaflet.css");
require("./components/indicators");
require("./components/map");
var state = require("./state");
var m = require("mithril");
var Waypoints = require('./components/waypoints');
var Buttons = require("./components/buttons");

m.mount($('#waypoints')[0], Waypoints);
m.mount($('.buttons')[0], Buttons);
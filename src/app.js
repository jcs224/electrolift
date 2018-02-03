require("./scss/style.scss");
require("leaflet/dist/leaflet.css");
require("./components/indicators");
require("./components/map");
var state = require("./state");

var m = require("mithril");

m.render($('.buttons')[0], m('button', { 
    onclick: () => {
        state.center_map = state && state.center_map ? false : true;
    }
}, 'Center map'));
require("./scss/style.scss");
require("leaflet/dist/leaflet.css");
require("./components/indicators");
require("./components/map");
var state = require("./state");

var m = require("mithril");

m.render(document.getElementById('buttons'), m('button', { 
    onclick: () => { 
        console.log('sup');
        if (state && state.center_map) {
            state.center_map = false;
        } else {
            state.center_map = true;
        }
    }
}, 'Center map'));
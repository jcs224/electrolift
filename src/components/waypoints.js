var m = require("mithril");
var Sortable = require("sortablejs");
var sortable = Sortable.create($("#waypoints")[0]);
var { ipcRenderer } = require("electron");
var waypoints = [];

ipcRenderer.on('drone_waypoints', (event, payload) => {
    waypoints = payload;
    m.redraw();
});

var Waypoints = {
    view() {
        return waypoints.map((wp) => {
            return m('div', {class: 'waypoint'}, wp.seq);
        });
    }
}

module.exports = Waypoints;
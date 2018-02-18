var m = require("mithril");
var Sortable = require("sortablejs");
var sortable = Sortable.create($("#waypoints")[0]);
var { ipcRenderer } = require("electron");
var missionKey = require("../lib/missionKey");
var waypoints = [];
var current_waypoint = null;

ipcRenderer.on('drone_waypoints', (event, payload) => {
    waypoints = payload;
    m.redraw();
});

ipcRenderer.on('drone_current_waypoint', (event, payload) => {
    current_waypoint = payload;
    m.redraw();
});

var Waypoints = {
    view() {
        return waypoints.map((wp) => {
            return m('div', {class: 'waypoint', style: current_waypoint == wp.seq ? 'background-color: white' : ''}, `${wp.seq} ${missionKey.getHumanReadable(wp.command)}`);
        });
    }
}

module.exports = Waypoints;
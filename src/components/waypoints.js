var m = require("mithril");

var Waypoints = {
    view() {
        return [
            m('div', {class: 'waypoint'}, '1'),
            m('div', {class: 'waypoint'}, '2'),
            m('div', {class: 'waypoint'}, '3'),
            m('div', {class: 'waypoint'}, '4'),
            m('div', {class: 'waypoint'}, '5'),
            m('div', {class: 'waypoint'}, '6'),
            m('div', {class: 'waypoint'}, '7'),
            m('div', {class: 'waypoint'}, '8'),
            m('div', {class: 'waypoint'}, '9'),
        ];
    }
}

module.exports = Waypoints;
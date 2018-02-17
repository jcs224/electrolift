var _ = require('lodash');

var key = [
    {
        id: 16,
        name: "Waypoint",
    },
    {
        id: 22,
        name: "Takeoff",
    },
    {
        id: 82,
        name: "Spline",
    },
    {
        id: 18,
        name: "Loiter (turns)",
    },
    {
        id: 20,
        name: "RTL",
    }
];

var missionKey = {
    getHumanReadable(id) {
        var obj = _.find(key, {id: id});
        return obj.name;
    }
}

module.exports = missionKey;
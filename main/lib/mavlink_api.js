var state = require("../state");

var mavlink_api = {
    /*----- Functions ----*/

    // Argument 1: command ID
    // Argument 2: array of parameters
    sendCommand(command, parameters) {
        // Not sure why I need to declare this again to work...
        const dgram = require('dgram');
        const mavlink = require('mavlink');
        const mavlink_helper = new mavlink(1,1);
        const server = dgram.createSocket('udp4');

        // Are there parameters?
        if (typeof parameters == 'undefined') {
            parameters = [null,null,null,null,null,null,null];
        }

        mavlink_helper.on('ready', function() {
            mavlink_helper.createMessage('COMMAND_LONG', {
                'target_system': state.drone_data.heartbeat_message.system,
                'target_component': state.drone_data.heartbeat_message.component,
                'command': command,
                'confirmation': true,
                'param1': parameters[0] ? parameters[0] : null,
                'param2': parameters[1] ? parameters[1] : null,
                'param3': parameters[2] ? parameters[2] : null,
                'param4': parameters[3] ? parameters[3] : null,
                'param5': parameters[4] ? parameters[4] : null,
                'param6': parameters[5] ? parameters[5] : null,
                'param7': parameters[6] ? parameters[6] : null
            }, function(message) {
                server.send(message.buffer, state.remote_port, state.remote_ip, function(err, bytes) {
                    if (err) throw err;
                    server.close();
                });
            });
        });
    },

    sendMessage(message_name, parameters) {
        // Not sure why I need to declare this again to work...
        const dgram = require('dgram');
        const mavlink = require('mavlink');
        const mavlink_helper = new mavlink(1,1);
        const server = dgram.createSocket('udp4');

        mavlink_helper.on('ready', function() {
            mavlink_helper.createMessage(message_name, parameters, function(message) {
                server.send(message.buffer, state.remote_port, state.remote_ip, function(err, bytes) {
                    if (err) throw err;
                    server.close();
                });
            });
        });
    },

    startMission() {
        this.sendMessage('SET_MODE', {
            'target_system': state.drone_data.heartbeat_message.system,
            'base_mode': state.drone_data.heartbeat_fields.base_mode,
            'custom_mode': 0
        });
        this.sendCommand(400, [1]);
        this.sendMessage('SET_MODE', {
            'target_system': state.drone_data.heartbeat_message.system,
            'base_mode': state.drone_data.heartbeat_fields.base_mode,
            'custom_mode': 3
        });
        this.sendCommand(300);
    },

    getWaypoints() {
        this.sendMessage('MISSION_REQUEST_LIST', {
            'target_system': state.drone_data.heartbeat_message.system,
            'target_component': state.drone_data.heartbeat_message.component,
            'mission_type': 0
        });
    }
}

module.exports = mavlink_api;
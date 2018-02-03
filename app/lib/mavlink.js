var win = require("../main").win;

const dgram = require('dgram');
const mavlink = require('mavlink');
const mavlink_helper = new mavlink(1,1);
const server = dgram.createSocket('udp4');

/*----- Variables ----*/
var server_port = 14551; // This UDP server
var remote_port = null; // Remote server. Set upon heartbeat from drone
var remote_ip = '127.0.0.1'; // UPD server of remote IP

server.on('message', function(message, remote) {
    mavlink_helper.parse(message);
    remote_port = remote.port;
});

server.bind(server_port);

module.exports = mavlink_helper;
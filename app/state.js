module.exports = {
    drone_data: {
        gps: null, // GPS
        att: null, // Attitude
        armed: false, // Is it armed?
        system_status: null,
        mission_count: 0, // How many missions?
        mission_items: [], // Array of waypoints and their metadata
        current_mission: 0,
        heartbeat_fields: null,
        heartbeat_message: null
    },

    remote_port: null,
    remote_ip: '127.0.0.1',
    server_port: 14551
}
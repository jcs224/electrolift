const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
var state = require("./state");
const dgram = require('dgram');
const mavlink = require('mavlink');
const mavlink_helper = new mavlink(1,1);
const server = dgram.createSocket('udp4');
var mavlink_api = require("./lib/mavlink_api");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1280, height: 720})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Hide dev tools by default, open with ctrl+shift+i
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// Send incoming drone data to renderer
mavlink_helper.on('ATTITUDE', function(message, fields) {
  state.drone_data.att = fields;
  win.webContents.send('drone-attitude', fields);
});

mavlink_helper.on('GLOBAL_POSITION_INT', function(message, fields) {
  var gps = {};
  gps.lat = fields.lat / 1e7;
  gps.lon = fields.lon / 1e7;
  gps.relative_alt = fields.relative_alt / 1000;
  gps.hdg = fields.hdg;
  state.drone_data.gps = gps;
  win.webContents.send('drone-gps', gps);
});

// Heartbeat
mavlink_helper.on('HEARTBEAT', function(message, fields) {
  state.drone_data.heartbeat_fields = fields;
  state.drone_data.heartbeat_message = message;

  // Is it armed?
  if (fields.base_mode == 209) {
      state.drone_data.armed = true;
  }

  if (fields.base_mode == 81) {
      state.drone_data.armed = false;
  }
});

mavlink_helper.on('MISSION_COUNT', (message, fields) => {
  state.drone_data.mission_count = fields.count;

  // Get mission waypoints.
  for (var i = 0; i < fields.count; i++) {
    mavlink_api.sendMessage('MISSION_REQUEST', {
      'target_system': state.drone_data.heartbeat_message.system,
      'target_component': state.drone_data.heartbeat_message.component,
      'seq': i,
      'mission_type': 0
    });
  }
});

mavlink_helper.on('MISSION_ITEM', (message, fields) => {
  if (state.drone_data.mission_items[fields.seq]) {
    // Not sure what we're going to do here yet
  } else {
    state.drone_data.mission_items.push(fields);
    mavlink_api.getWaypoints();
    win.webContents.send('drone_waypoints', state.drone_data.mission_items);
  }
});

// Main/render process link
ipcMain.on("doMission", (event, payload) => {
  mavlink_api.startMission();
});

ipcMain.on("sendCommand", (event, payload) => {
  mavlink_api.sendCommand(payload);
});

// UDP boilerplate
server.on('message', function(message, remote) {
  mavlink_helper.parse(message);
  state.remote_port = remote.port;
});

server.bind(state.server_port);
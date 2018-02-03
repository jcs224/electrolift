const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
var mavlink = require("./lib/mavlink");

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
mavlink.on('ATTITUDE', function(message, fields) {
  process.stdout.write('roll: ' + fields.roll + "\n");
  process.stdout.write('pitch: ' + fields.pitch + "\n");
  process.stdout.write('yaw: ' + fields.yaw + "\n");
  win.webContents.send('drone-attitude', fields);
});

mavlink.on('GLOBAL_POSITION_INT', function(message, fields) {
  var gps = {};
  gps.lat = fields.lat / 1e7;
  gps.lon = fields.lon / 1e7;
  gps.relative_alt = fields.relative_alt / 1000;
  win.webContents.send('drone-gps', gps);
});
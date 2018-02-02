console.log('sup');

var { ipcRenderer } = require("electron");

ipcRenderer.on('attitude-stuff', (event, payload) => {
    console.log(payload);
});
var m = require("mithril");
var { ipcRenderer } = require("electron");

var Buttons = {
    view() {
        return [
            m('button', { 
                onclick: () => {
                    state.center_map = state && state.center_map ? false : true;
                }
            }, 'Center map'),
            m('button', { 
                onclick: () => {
                    ipcRenderer.send("doMission", true);
                }
            }, 'Start Mission'),
            m('button', { 
                onclick: () => {
                    ipcRenderer.send("sendCommand", 20);
                }
            }, 'Return to Launch'),
        ];
    }
}

module.exports = Buttons;
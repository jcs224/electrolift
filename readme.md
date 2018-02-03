# ElectroLift
## Ground Control Station (GCS) built with web technologies

This project is a very basic ground control station (GCS) for autonomous UAVs. Currently, it can communicate via UDP only. This project is built using only web-based technologies. Desktop builds are possible on all major operating systems thanks to Electron.

This app has only been tested on Ubuntu Linux so far. YMMV.

### Libraries and Technologies used
- [Electron](https://electronjs.org/)
- [Leaflet](http://leafletjs.com/)
- [Mithril](https://mithril.js.org/)
- [jQuery](https://jquery.com/)
- [jQuery Flight Indicators](http://sebmatton.github.io/flightindicators/)
- [MAVLink](http://qgroundcontrol.org/mavlink/start)
- [Webpack](https://webpack.js.org/)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

## Prerequisites
You must have [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/)installed to run the development version of ElectroLift.

### To build
`yarn install`

### To run
`yarn start`

## Running the simulator
You will also need a drone simulator. Go to the link here and follow the instructions. Return to these docs after you complete the step where you run `vagrant up`:
http://ardupilot.org/dev/docs/setting-up-sitl-using-vagrant.html

In `Tools/autotest/locations.txt`, there is a list of location names along with their lat/lon coordinates. Feel free to add your own entries.

In the same directory, run:
`vagrant ssh -c "sim_vehicle.py -j 2 -L <name-of-location>"`

You'll currently need another ground control station (GCS) to set missions up. Once you have a mission planned and written to the device, you can just click "Start Mission" on the interface to launch the (virtual) drone!

## License
This project uses the MIT License, so you're free to pretty much do whatever you want with it. However, there are GPL libraries used in this project.
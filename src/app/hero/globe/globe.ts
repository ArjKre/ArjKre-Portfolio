import * as EncomGlobe from 'encom-globe';
import { grid } from './grid';
import { GeolocationData } from './geoloactionData';
export function InitializeGlobe(globeCanvas: HTMLElement,Data : GeolocationData) {
  const WIDTH = window.innerWidth;
  const HEIGHT = globeCanvas.parentElement!.clientHeight;
  const globe = new EncomGlobe(WIDTH, HEIGHT, {
    font: "Satoshi, sans-serif",
    data: [],
    tiles: grid.tiles,
    baseColor: '#000000',
    markerColor: '#8e44ad',
    pinColor: '#aacfd1',
    satelliteColor: '#aacfd1',
    scale: 1.2,
    dayLength: 14000,
    introLinesDuration: 1000,
    maxPins: 500,
    maxMarkers: 4,
    viewAngle: 0.5,
  });

  globeCanvas.append(globe.domElement);
  globe.init();
  assignCanvasId();

  function animate() {
    globe.tick();
    requestAnimationFrame(animate);
  }

  globe.init(() => {

    animate();

    var constellation = [];
    var opts = {
      coreColor: '#ff0000',
      numWaves: 8,
    };
    var alt = 1;

    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 3; j++) {
        constellation.push({
          lat: 50 * i - 30 + 15 * Math.random(),
          lon: 120 * j - 120 + 30 * i,
          altitude: alt,
        });
      }
    }
    let markerOpts = {
      fontSize: 16,
    }

    globe.addConstellation(constellation, opts);
    globe.addPin(Data.latitude, Data.longitude,`${Data.ip}`);
    // globe.addMarker(Data.latitude, Data.longitude,`${Data.ip}`,);
  });


  function assignCanvasId() : void {
    const canvasElement = globeCanvas.querySelector('canvas');
    if (canvasElement) {
      canvasElement.id = 'encom-globe-canvas';
    }
  }

}

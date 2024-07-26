import * as EncomGlobe from 'encom-globe';
import { grid } from './grid';

export function InitializeGlobe(globeCanvas: HTMLElement) {
  const WIDTH = window.innerWidth;
  const HEIGHT = globeCanvas.parentElement!.clientHeight;
  const globe = new EncomGlobe(WIDTH, HEIGHT, {
    font: 'Inconsolata',
    data: [],
    tiles: grid.tiles,
    baseColor: '#000000',
    markerColor: '#8e44ad',
    pinColor: '#aacfd1',
    satelliteColor: '#aacfd1',
    scale: 1,
    dayLength: 14000,
    introLinesDuration: 2000,
    maxPins: 500,
    maxMarkers: 4,
    viewAngle: 0.3,
  });

  globeCanvas.append(globe.domElement);
  globe.init();

  function animate() {
    globe.tick();
    requestAnimationFrame(animate);
  }

  globe.init(() => {
    let userLocation = getUserLocation();
    console.log(userLocation.finally());
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

    globe.addConstellation(constellation, opts);
  });


}

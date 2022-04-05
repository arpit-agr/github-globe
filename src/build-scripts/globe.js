import createGlobe from "cobe";

let phi = 4.5;
let canvas = document.getElementById("cobe");

const globe = createGlobe(canvas, {
  devicePixelRatio: 2,
  width: 720 * 2,
  height: 720 * 2,
  phi: 0,
  theta: -0.1,
  dark: 1,
  diffuse: 1.2,
  scale: 1,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.05490196, 0.11764706, 0.14509804],
  markerColor: [0.97254902, 0.98823529, 0.98823529],
  glowColor: [0.05490196, 0.11764706, 0.14509804],
  offset: [0, 0],
  markers: [
    // latitude longitude
    { location: [19.075983, 72.877655], size: 0.05 },
    { location: [1.290270, 103.851959], size: 0.05 },
    { location: [35.893955, 117.924896], size: 0.05 }
  ],
  onRender: (state) => {
    // Called on every animation frame.
    // `state` will be an empty object, return updated params.
    state.phi = phi;
    phi -= 0.005;
  }
});

// `globe` will be a Phenomenon (https://github.com/vaneenige/phenomenon) instance.
// To pause requestAnimationFrame:
// `globe.toggle()`
// To remove the instance:
// `globe.destroy()`
// ...
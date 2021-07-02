import perlinNoise from "./modules/perlin.js";
import { outlineCircle, solidCircle, Color } from "./modules/drawing.js";

const makePerlinNoiseCanvas = ({ width, height }) => {
  const canvas = document.createElement('canvas');
  const contentDiv = document.getElementById('box');
  canvas.width = width;
  canvas.height = height;

  return canvas;
};

const makeHeightGaugeCanvas = ({ width, height }) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style = "border: 1pt solid black";

  return canvas;
};

export const renderPerlinNoiseInElement = (parentContainerId) => {
  const parentContainer = document.getElementById(parentContainerId);
  const W = 512;
  const H = 512;
  const RADIUS = W/3;
  const STEPS = 360;
  let step = 0;

  const heightGaugeCanvas = makeHeightGaugeCanvas({ width: 255, height: 12 });

  const span = document.createElement('span');
  const label = document.createTextNode('height: ');
  span.append(label);

  const heightGaugeDiv = document.createElement('div');
  heightGaugeDiv.appendChild(span);
  heightGaugeDiv.appendChild(heightGaugeCanvas);

  parentContainer.append(heightGaugeDiv);

  const perlinNoiseCanvas = makePerlinNoiseCanvas({ width: W, height: H });
  parentContainer.append(perlinNoiseCanvas);
  const ctx = perlinNoiseCanvas.getContext("2d");

  let imageData = ctx.getImageData(0, 0, W, H);
  let data = imageData.data;
  let elev = perlinNoise(W, H, 16, 16);  //Uint8Array(W * H);

  window.setInterval(tick, 20);
  function findCircleX() {return RADIUS * Math.cos(Math.PI * step/STEPS) + W/2;}
  function findCircleY() {return RADIUS * Math.sin(Math.PI * step/STEPS) + H/2;}

  function tick() {
    step++;
    if (step >= STEPS*2) step = 0;
    ctx.clearRect(0, 0, W, H);
    printBackground();
    let x = Math.floor(findCircleX());
    let y = Math.floor(findCircleY());
    solidCircle(x, y, 5, new Color(255, 255, 255).returnRGB(), ctx);
    let gN = elev[y * W + x];
    const ctx2 = heightGaugeCanvas.getContext("2d");
    ctx2.clearRect(0, 0, 512, 12);
    solidCircle(gN, 6, 5, new Color(40,40,40).returnRGB(), ctx2);
  }

  function printBackground() {
    for (let i = 0; i < data.length; i += 4) {
      let showRedGrid = false;
      if (showRedGrid) {
        if ((i/4) % 32 === 0 || Math.floor((i/4)/512) % 32 === 0) {
          data[i] = 255;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
      } else {
        data[i] = data[i + 1] = data[i + 2] = elev[i/4];
      }
      data[i + 3] = 255;
    };

    ctx.putImageData(imageData, 0, 0);
  }
}

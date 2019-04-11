const body = document.querySelector("body");
const canvas = document.createElement("canvas");
body.appendChild(canvas);
canvas.id = "canvas1";
const W = canvas.width = 512;
const H = canvas.height = W;
canvas.style.border = "1px solid black";
const ctx = canvas.getContext("2d");
const RADIUS = W/3;
const STEPS = 360;
let step = 0;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let imageData = ctx.getImageData(0, 0, W, H);
let data = imageData.data;
let elev = generatePerlinArray(W, H, 8);//Uint8Array(W * H);
console.log(elev);

window.setInterval(tick, 20);

function outlineCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgb(255,255,255)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function solidCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fill();
}

function findCircleX() {return RADIUS * Math.cos(Math.PI * step/STEPS) + W/2;}
function findCircleY() {return RADIUS * Math.sin(Math.PI * step/STEPS) + H/2;}

function tick() {
  step++;
  if (step >= STEPS*2) step = 0;
  ctx.clearRect(0, 0, W, H);
  printBackground();
  let x = Math.floor(findCircleX());
  let y = Math.floor(findCircleY());
  solidCircle(x, y, 5);

  let color = elev[y * W + x];

//  body.style.backgroundColor = `rgb(${color},${color},${color})`;
}

function printBackground() {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i + 1] = data[i + 2] = elev[i/4];
    data[i + 3] = 255;
  };
  ctx.putImageData(imageData, 0, 0);
}

function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y
}

//not sure this works...
//goalv must be in terms of % of grid squares
function bilinearInterpolationBetweenDotProducts(goalv, vTL, vTR, vBL, vBR, dP1, dP2, dP3, dP4) {
  let AB = ((1 - goalv.x) * dP1) + (goalv.x * dP2);
  let CD = ((1 - goalv.x) * dP3) + (goalv.x * dP4);
  
  let ABCD = (((1 - goalv.y)/1) * AB) + ((goalv.y) * CD);
  return ABCD;
}

function fade(value) {
  return ((6 * Math.pow(value, 5)) - (15 * Math.pow(value, 4)) + (10 * Math.pow(value, 3)));
}

function createBigGrid(detail) {
    let randomVecs = {
    0: new Vector(1, 0), 
    1: new Vector(-1, 0), 
    2: new Vector(0, 1),
    3: new Vector(0, -1),
    4: new Vector(Math.sqrt(.5), Math.sqrt(.5)),
    5: new Vector(-Math.sqrt(2), Math.sqrt(.5)),
    6: new Vector(Math.sqrt(.5), -Math.sqrt(.5)),
    7: new Vector(-Math.sqrt(.5), -Math.sqrt(.5))
  };

  let bigGrid = new Array(Math.pow(detail + 1, 2));
  for (let i = 0; i < (bigGrid.length); i++) {
    bigGrid[i] = randomVecs[Math.floor(8 * Math.random())];
  }

  return bigGrid;
}

function generatePerlinArray(w, h, detail) {
  while (W % detail !== 0) {
    detail --;
  }
  let smoothSurface = new Uint8Array(w * h);
  let squaresPerBigGrid = W/detail;
  // create a big overlay grid with random vectors
  let bigGrid = createBigGrid(detail);
  //dot products, bilinear interpolation, and fade for each point
  for (let i = 0; i < w * h; i++) {

    //get x & y coord from index
    let x = i % W;
    let y = Math.floor(i / W);

    //get x & y relative to big grid
    let relativeX = (x % squaresPerBigGrid)/(squaresPerBigGrid - 1);
    let relativeY = (y % squaresPerBigGrid)/(squaresPerBigGrid - 1);
    
    //get big grid top left coord
    let bigGridX = Math.floor(x/W * detail);
    let bigGridY = Math.floor(y/W * detail);

    //define four corners:
    let indexTL = indexFromXY(bigGridX, bigGridY, detail);
    let indexTR = indexFromXY(bigGridX + 1, bigGridY, detail);
    let indexBL = indexFromXY(bigGridX, bigGridY + 1, detail);
    let indexBR = indexFromXY(bigGridX + 1, bigGridY + 1, detail);
    let vTL = bigGrid[indexTL];
    let vTR = bigGrid[indexTR];
    let vBL = bigGrid[indexBL];
    let vBR = bigGrid[indexBR];

    //dot products for four corners:
    let dP1 = dotProduct(new Vector(relativeX, -1 + relativeY), vTL);
    let dP2 = dotProduct(new Vector(-1 + relativeX, -1 + relativeY), vTR);
    let dP3 = dotProduct(new Vector(relativeX, relativeY), vBL);
    let dP4 = dotProduct(new Vector(-1 + relativeX, relativeY), vBR);

    //bilinear interpolation of point from four corners
    let bI = bilinearInterpolationBetweenDotProducts(new Vector(relativeX, relativeY), vTL, vTR, vBL, vBR, dP1, dP2, dP3, dP4);
    bI = (bI + 1)/2;
    let gradient = Math.floor(bI * 256);

    //fade value
    gradient = 6 * Math.pow(gradient, 5) - 15 * Math.pow(gradient, 4) + 10 * Math.pow(gradient, 3);
    //add value to small grid array
    smoothSurface[i] = gradient;
  }
  
  debugger
  return smoothSurface;
}

function indexFromXY(x, y, w) {
  return (x + y * w);
}

/*
perlin noise: random noise where each point is related to the points around it
  three steps:
  1. create grid
    the grid has to be fewer points than the end result array (a 256x256 end result would want something between 8x8 and 64x64)
    this grid needs random normalized vectors on each node
  2. dot products for each point
    each point in the end result must have dot product for the surrounding 4 and the directional vector from large grid node to specific end result square (in 2d space) calculated (four dot products):
      dot product of two vectors = v1.x * v2.x + v1.y * v2.y
  3. bilinear interpolation of the four dot products to the end result point (better images with cosine interpolation)
  4. perlin noise actually uses a fade function--after final color is determined it is faded by the function: 6t^5 - 15t^4 + 10t^3
  */



import { Vector, dotProduct, indexFromVector, vectorFromIndex, bilinearInterpolation } from "./vectors.js"

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

function perlinNoise(w, h, overlayWidth, overlayHeight) {
  //create overlay grid one row and one column bigger than oW and oH respectively
  //fill it with random one of 8 directions
  let unitGrid = createUnitGrid(overlayWidth, overlayHeight);

  //determine how many pixels per unitGrid
  let widthDivisions = w / overlayWidth;
  let heightDivisions = h / overlayHeight;
  console.log(widthDivisions, heightDivisions);
  //instantiate the perlin grid
  let perlin = new Uint8Array(w * h);

  for (let i = 0; i < unitGrid.length - (overlayWidth + 1); i++) {
    console.log(i % (overlayWidth + 1));
    if (i % (overlayWidth + 1) === overlayWidth) continue;
    for (let j = 0; j < heightDivisions; j++) {
      for (let k = 0; k < widthDivisions; k++) {
        //find four dot products for this pixel
        let dotProducts = [];

        dotProducts[0] = dotProduct(unitGrid[i], new Vector(j/heightDivisions, k/widthDivisions));
        dotProducts[1] = dotProduct(unitGrid[i + 1], new Vector(j/heightDivisions, -1 + k/widthDivisions));
        dotProducts[2] = dotProduct(unitGrid[i + overlayWidth + 1], new Vector(-1 + j/heightDivisions, k/widthDivisions));
        dotProducts[3] = dotProduct(unitGrid[i + overlayWidth + 1 + 1], new Vector(-1 + j/heightDivisions, -1 + k/widthDivisions));

        //bilinear interpolate
        let thisVector = new Vector(fade(j/heightDivisions), (k/widthDivisions));
        let gradient = Math.floor(255 * (.5 * (1 + bilinearInterpolation(thisVector, dotProducts))));

        //figure index of this pixel
        let x = k + (i % (overlayWidth + 1) * widthDivisions);
        let y = j + (Math.floor(i / (overlayHeight + 1)) * heightDivisions);
        let index = x + (y * h);
        perlin[index] = gradient;
      }
    }
  }

  return perlin;
}

function fade(n) {
  return n*n*n*(n*(n*6-15)+10);
}

function createUnitGrid(w, h) {
  let grid = new Array((w + 1) * (h +1));
  let randomVecs = {
    0: new Vector(1, 0), 
    1: new Vector(-1, 0), 
    2: new Vector(0, 1),
    3: new Vector(0, -1),
    4: new Vector(Math.sqrt(.5), Math.sqrt(.5)),
    5: new Vector(-Math.sqrt(.5), Math.sqrt(.5)),
    6: new Vector(Math.sqrt(.5), -Math.sqrt(.5)),
    7: new Vector(-Math.sqrt(.5), -Math.sqrt(.5))
  };

  for (let i = 0; i < grid.length; i++) {
    grid[i] = randomVecs[Math.floor(8 * Math.random())];
  }

  return grid;
}

export default perlinNoise;

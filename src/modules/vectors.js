export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    const length = this.magnitude();
    return new Vector(this.x / length, this.y / length);
  }

  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
}

// working with vectors
export function dotProduct(v1, v2) {
  return (v1.x * v2.x + v1.y * v2.y);
}

export function indexFromVector(v, w) {
  return v.x + v.y * w;
}

export function vectorFromIndex(i, w) {
  return new Vector(i % w, Math.floor(i / w));
}

export function linearInterpolation(known, v1, v2) {
  const denominator = v2.x - v1.x;
  const numerator1 = v1.y * (v2.x - known);
  const numerator2 = v2.y * (known - v1.x);

  return (numerator1 + numerator2) / denominator;
}

export function bilinearInterpolation(goalV, dotProducts) {
  const AB = linearInterpolation(
    goalV.x,
    new Vector(0, dotProducts[0]),
    new Vector(1, dotProducts[1]),
  );
  const CD = linearInterpolation(
    goalV.x,
    new Vector(0, dotProducts[2]),
    new Vector(1, dotProducts[3]),
  );

  const ABCD = linearInterpolation(goalV.y, new Vector(0, AB), new Vector(1, CD));

  return ABCD;
}

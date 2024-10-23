import { Vector3 } from 'three'

/**
 * A class to represent a line through two points.
 *
 * Parametric equation of the line:
 * x = a1 + b1 * t
 * y = a2 + b2 * t
 * z = a3 + b3 * t
 */
export class LineThroughTwoPoints {
  private point1: Vector3

  // Vector equation of line from point 1 to point 2
  private ab: Vector3

  constructor(point1: Vector3, point2: Vector3) {
    this.point1 = point1

    this.ab = new Vector3(point2.x - point1.x, point2.y - point1.y, point2.z - point1.z)
  }

  getCoordOfPointOnLineWhenZIs(z: number): Vector3 {
    const t = (z - this.point1.z) / this.ab.z
    return new Vector3(this.point1.x + this.ab.x * t, this.point1.y + this.ab.y * t, z)
  }

  getCoordOfPointOnLineWhenXIs(x: number): Vector3 {
    const t = (x - this.point1.x) / this.ab.x
    return new Vector3(x, this.point1.y + this.ab.y * t, this.point1.z + this.ab.z * t)
  }

  getCoordOfPointOnLineWhenYIs(y: number): Vector3 {
    const t = (y - this.point1.y) / this.ab.y
    return new Vector3(this.point1.x + this.ab.x * t, y, this.point1.z + this.ab.z * t)
  }
}

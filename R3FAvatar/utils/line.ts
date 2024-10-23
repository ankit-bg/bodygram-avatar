import { Vector2, Vector3 } from 'three'
import { LineThroughTwoPoints } from './LineThroughTwoPoints'

type GetHorizontalLineStartAndEndCoordsArgs = {
  /**
   * A point in the 3D space from which the horizontal line should pass.
   *
   * This is point is treated as the center of the line.
   */
  point: Vector3
  /**
   * Distance from the object.
   */
  distanceFromObject: number
  /**
   * Width of the object.
   */
  objectWidth: number
  /**
   * Angle formed by the line on the x-axis.
   *
   * It should be in radian.
   */
  angleFormedByLineOnXAxis: number
  /**
   * The camera coordinates.
   */
  cameraCoords: Vector3
}

/**
 * This will return the start and end coordinates of the horizontal line, which we will draw on the avatar.
 *
 * This line will be drawn on x-y plane.
 */
export function getHorizontalLineStartAndEndCoords(args: GetHorizontalLineStartAndEndCoordsArgs): [Vector3, Vector3] {
  const { point, objectWidth, angleFormedByLineOnXAxis, distanceFromObject, cameraCoords } = args

  const radius = objectWidth / 2

  const xOffset = radius * Math.cos(angleFormedByLineOnXAxis)
  const yOffset = radius * Math.sin(angleFormedByLineOnXAxis)

  const start = new Vector3(point.x + xOffset, point.y + yOffset, point.z)
  const end = new Vector3(point.x - xOffset, point.y - yOffset, point.z)

  const line1 = new LineThroughTwoPoints(start, cameraCoords)
  const line2 = new LineThroughTwoPoints(end, cameraCoords)

  return [
    line1.getCoordOfPointOnLineWhenZIs(distanceFromObject),
    line2.getCoordOfPointOnLineWhenZIs(distanceFromObject),
  ]
}

type GetVerticalLineStartAndEndCoordsArgs = {
  /**
   * A point in the 3D space from which the horizontal line should pass.
   *
   * This is point is treated as the center of the line.
   */
  point: Vector3
  /**
   * Distance from the object.
   */
  distanceFromObject: number
  /**
   * Height of the object.
   */
  objectHeight: number
  /**
   * Angle formed by the line on the x-axis.
   *
   * It should be in radian.
   */
  angleFormedBYLineOnYAxis: number
  /**
   * The camera coordinates.
   */
  cameraCoords: Vector3
  /**
   * If true then the point is treated as mid point. Else it is treated as the start point.
   *
   * @default true
   */
  isMidPoint?: boolean
}

/**
 * This will return the start and end coordinates of the vertical line, which we will draw on the avatar.
 *
 * This line will be drawn on y-z plane.
 */
export function getVerticalLineStartAndEndCoords(args: GetVerticalLineStartAndEndCoordsArgs): [Vector3, Vector3] {
  const { point, objectHeight, angleFormedBYLineOnYAxis, distanceFromObject, cameraCoords, isMidPoint = true } = args

  const radius = isMidPoint ? objectHeight / 2 : objectHeight

  const yOffset = radius * Math.cos(angleFormedBYLineOnYAxis)
  const zOffset = radius * Math.sin(angleFormedBYLineOnYAxis)

  const start = isMidPoint ? new Vector3(point.x, point.y + yOffset, point.z + zOffset) : point
  const end = isMidPoint
    ? new Vector3(point.x, point.y - yOffset, point.z - zOffset)
    : new Vector3(point.x, point.y + yOffset, point.z + zOffset)

  const line1 = new LineThroughTwoPoints(start, cameraCoords)
  const line2 = new LineThroughTwoPoints(end, cameraCoords)

  return [
    line1.getCoordOfPointOnLineWhenXIs(distanceFromObject),
    line2.getCoordOfPointOnLineWhenXIs(distanceFromObject),
  ]
}

export type GetIntersectingPointOfTwoLinesPoint = {
  coord: Vector2
  /**
   * In radian, angle formed by the horizontal axis.
   */
  angle: number
}

/**
 * This will return the intersecting point of two lines.
 */
export function getIntersectingPointOfTwoLines(
  point1: GetIntersectingPointOfTwoLinesPoint,
  point2: GetIntersectingPointOfTwoLinesPoint,
): Vector2 {
  if (point1.angle === Math.PI / 2 && point2.angle === 0) {
    return new Vector2(point1.coord.x, point2.coord.y)
  }

  if (point2.angle === Math.PI / 2 && point1.angle === 0) {
    return new Vector2(point2.coord.x, point1.coord.y)
  }

  if (point1.angle === point2.angle) {
    return point1.coord
  }

  // Equation: y = m * x + c
  // m = tan(angle)
  // c = y - m * x
  const m1 = Math.tan(point1.angle)
  const c1 = point1.coord.y - m1 * point1.coord.x

  const m2 = Math.tan(point2.angle)
  const c2 = point2.coord.y - m2 * point2.coord.x

  // Intersection point of two lines.
  const x = (c2 - c1) / (m1 - m2)
  const y = m1 * x + c1

  return new Vector2(x, y)
}

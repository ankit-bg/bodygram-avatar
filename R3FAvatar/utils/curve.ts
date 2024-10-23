import { Vector3 } from 'three'
import { getMaxAndMinCoords } from './point'

function linearLerp(x: number, x0: number, x1: number, y0: number, y1: number): number {
  return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0)
}

export function getCentroid(coords: Vector3[]) {
  const centroid = coords.reduce((acc, cur) => {
    acc.x += cur.x
    acc.y += cur.y
    acc.z += cur.z
    return acc
  }, new Vector3())

  return new Vector3(centroid.x / coords.length, centroid.y / coords.length, centroid.z / coords.length)
}

export function smoothenEllipticalCurveCoordsOnXZPlane(coords: Vector3[]) {
  const { whenXIsMax, whenXIsMin } = getMaxAndMinCoords(coords)

  const centroid = getCentroid(coords)

  return coords.map((coord) => {
    const offset = 0.01

    const xOffset = centroid.x > coord.x ? -offset : +offset
    const zOffset = centroid.z > coord.z ? -offset : +offset

    const x = coord.x + xOffset
    const y = linearLerp(coord.x, whenXIsMin.x, whenXIsMax.x, whenXIsMin.y, whenXIsMax.y)
    const z = coord.z + zOffset

    return new Vector3(x, y, z)
  })
}

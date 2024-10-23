import { Group, Mesh, Vector3 } from 'three'

/**
 * A point has three coordinates (x, y, z) in 3D space.
 * `position.array` contains x, y, z coordinates of all the vertices of the object.
 *
 * So, it is in the format [x1, y1, z1, x2, y2, z2, ...]. x1, y1, z1 are the
 * coordinates of the first vertex, x2, y2, z2 are the coordinates of the
 * second vertex and so on.
 *
 * This is a utility function to get the coordinates of a vertex in the object.
 *
 * @param object Target object
 * @param firstIdx First index of the vertex in the position array of the object
 */
export function getVertexCoord(object: Group, firstIdx: number): Vector3 {
  const positionArray = (object.children[0] as Mesh)?.geometry?.attributes.position.array

  if (!positionArray) return new Vector3(0, 0, 0)

  return new Vector3(positionArray[firstIdx], positionArray[firstIdx + 1], positionArray[firstIdx + 2])
}

type GetMaxAndMinCoordsReturn = {
  whenXIsMax: Vector3
  whenXIsMin: Vector3
  whenYIsMax: Vector3
  whenYIsMin: Vector3
  whenZIsMax: Vector3
  whenZIsMin: Vector3
}

export function getMaxAndMinCoords(coords: Vector3[]): GetMaxAndMinCoordsReturn {
  const coord = {
    whenXIsMax: coords[0],
    whenXIsMin: coords[0],
    whenYIsMax: coords[0],
    whenYIsMin: coords[0],
    whenZIsMax: coords[0],
    whenZIsMin: coords[0],
  }

  for (const c of coords) {
    if (c.x > coord.whenXIsMax.x) coord.whenXIsMax = c
    if (c.x < coord.whenXIsMin.x) coord.whenXIsMin = c

    if (c.y > coord.whenYIsMax.y) coord.whenYIsMax = c
    if (c.y < coord.whenYIsMin.y) coord.whenYIsMin = c

    if (c.z > coord.whenZIsMax.z) coord.whenZIsMax = c
    if (c.z < coord.whenZIsMin.z) coord.whenZIsMin = c
  }

  return coord
}

import { OrbitControlsProps } from '@react-three/drei'
import { Camera } from '@react-three/fiber'
import { Box3, EventDispatcher, Object3D, PerspectiveCamera, Vector3, Event } from 'three'
import { MathUtils } from 'three'

export type CameraDirection = 'front' | 'back' | 'right' | 'left'

type MoveCameraToProps = {
  /**
   * The position to look at.
   */
  targetPosition: Vector3
  /**
   * From which direction to look at the target position.
   */
  direction: CameraDirection
  /**
   * The camera to move.
   */
  camera: PerspectiveCamera
  /**
   * The distance from the target position.
   */
  distance: number
}

/**
 * A util function to move the camera in the position to look at the target object.
 */
export function moveCameraTo(props: MoveCameraToProps) {
  const { targetPosition, direction, camera, distance } = props
  switch (direction) {
    case 'front':
      camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z + distance)
      camera.userData.direction = 'front'
      break
    case 'back':
      camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z - distance)
      camera.userData.direction = 'back'
      break
    case 'right':
      camera.position.set(targetPosition.x + distance, targetPosition.y, targetPosition.z)
      camera.userData.direction = 'right'
      break
    case 'left':
      camera.position.set(targetPosition.x - distance, targetPosition.y, targetPosition.z)
      camera.userData.direction = 'left'
      break
  }
}

type FitObjectToViewProps = {
  /**
   * The controls to update the target position.
   */
  controls?: EventDispatcher<Event> | null
  /**
   * The camera.
   */
  camera: PerspectiveCamera
  /**
   * The object to fit in the view.
   */
  object: Object3D
  /**
   * The offset.
   */
  offset?: number
  /**
   * Form which direction to look at the object.
   *
   * @default 'front'
   */
  lookFrom?: CameraDirection
  /**
   * If true then make the current position of control as the default position.
   *
   * @default true
   */
  reset?: boolean
}

/**
 * A util function to fit the object in the view.
 */
export function fitObjectToView(props: FitObjectToViewProps) {
  const { controls, object, lookFrom = 'front', camera, reset = true, offset = -0.1 } = props

  if (!controls || !object) return

  const box = new Box3().setFromObject(object)
  const size = box.getSize(new Vector3())
  const mid = box.getCenter(new Vector3())
  const fov = MathUtils.degToRad(camera.fov)
  const maxDim = Math.max(size.x, size.y, size.z)
  const distance = Math.abs((maxDim / 4) * Math.tan(fov)) * (1 + offset)

  moveCameraTo({
    targetPosition: mid,
    direction: lookFrom,
    camera,
    distance: distance,
  })
  camera.lookAt(object.position)
  camera.updateProjectionMatrix()
  camera.updateMatrixWorld(true)

  if (reset && isOrbitControls(controls)) {
    controls.target = mid
    if (typeof controls.saveState === 'function') {
      controls.saveState()
    }
    controls.update()
  }
}

export type OrbitControlsInstance = OrbitControlsProps & {
  update: () => void
  reset: () => void
}

/**
 * To check whether control is OrbitControls instance.
 *
 * This will check whether the control has the following properties:
 * - update
 * - reset
 * - enableDamping
 * - dampingFactor
 *
 * If it has all of the above, then it is an OrbitControls instance.
 */
export function isOrbitControls(controls: unknown): controls is OrbitControlsInstance {
  if (!controls) return false

  return (
    controls &&
    typeof controls === 'object' &&
    'update' in controls &&
    'reset' in controls &&
    'enableDamping' in controls &&
    'dampingFactor' in controls
  )
}

export function resetOrbitControls(controls: OrbitControlsInstance) {
  if (!controls) return
  /**
   * Before resetting we need to stop current movement. Otherwise, the camera will
   * continue moving after the reset.
   *
   * So we set dampingFactor to 0 and enableDamping to false. This will stop the
   * camera movement. Then we update the controls to apply the changes.
   *
   * After that, we reset the camera and enable the damping again.
   */
  controls.dampingFactor = 0
  controls.enableDamping = false
  controls.update()

  controls.reset()
  controls.enableDamping = true
  controls.dampingFactor = 0.05
}

/**
 * A helper function to convert screen coordinates to world coordinates.
 * @param x x in px
 * @param y y in px
 * @param camera camera
 * @param size canvas width and height
 * @returns world coordinates
 */
export function screenToWorldCoords(x: number, y: number, camera: Camera, size: { width: number; height: number }) {
  const ndcX = (x / size.width) * 2 - 1
  const ndcY = -(y / size.height) * 2 + 1
  const ndcVector = new Vector3(ndcX, ndcY, 1)
  ndcVector.unproject(camera)
  const direction = ndcVector.sub(camera.position).normalize()
  const distance = -camera.position.z / direction.z
  return camera.position.clone().add(direction.multiplyScalar(distance))
}

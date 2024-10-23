import { Box3, BufferGeometry, Vector3 } from 'three'
import { getVertexCoord } from './utils/point'
import { getHorizontalLineStartAndEndCoords } from './utils/line'
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { AvatarPostureLine } from './AvatarPostureLine'
import { MathUtils } from 'three'
import { useR3FAvatar } from './store'

type AvatarPostureHorizontalLinesProps = {
  /**
   * To draw a dashed line, we need the first index of the position array of the avatar object.
   * To draw the actual line we need the angle it makes with the dashed line.
   */
  lineData: {
    firstIndexInAvatarPositionArray: number
    angle: number
  }[]
}

/**
 * This component is used to draw horizontal lines on the avatar.
 *
 * Note: At the moment this component is heavily dependent on the camera position. To use
 * this component, make sure the camera is focused on the front of the avatar. If
 * the camera is focused on the back/left/right of the avatar, the lines will not be drawn properly.
 * This is the limitation of the current implementation. We will improve this in the future.
 */
export function AvatarHorizontalPostureLines(props: AvatarPostureHorizontalLinesProps) {
  const { avatar, avatarType, cameraDirection } = useR3FAvatar(state => ({
    avatar: state.avatar,
    avatarType: state.avatarType,
    cameraDirection: state.cameraDirection,
  }))
  const { lineData } = props
  const { camera } = useThree()

  const { avatarWidth, lineDistanceFromAvatar, box } = useMemo(() => {
    // If camera direction is not front, return 0 as the width.
    if (cameraDirection !== 'front') return { avatarWidth: 0, lineDistanceFromAvatar: 0, box: new Box3() }

    const box = new Box3().setFromObject(avatar)
    const avatarWidth = Math.abs(box.max.x - box.min.x)
    const lineDistanceFromAvatar = box.max.z
    return { avatarWidth, lineDistanceFromAvatar, box }
  }, [avatar, cameraDirection])

  if (avatarType !== 'photo' && avatarType !== 'photo-future-you') {
    console.error(`Drawing on avatar is not supported for ${avatarType}.`)
    return null
  }

  if (cameraDirection !== 'front') return null

  return (
    <>
      {lineData.map(data => {
        const { firstIndexInAvatarPositionArray, angle } = data
        const vertexCoord = getVertexCoord(avatar, firstIndexInAvatarPositionArray)

        const dashLineGeometry = new BufferGeometry().setFromPoints(
          getHorizontalLineStartAndEndCoords({
            point: vertexCoord,
            objectWidth: avatarWidth * 1.1,
            distanceFromObject: box.max.z,
            angleFormedByLineOnXAxis: 0,
            cameraCoords: camera.position,
          }),
        )

        const positionArr = dashLineGeometry.attributes.position.array
        const lineWidth = new Vector3(positionArr[0], positionArr[1], positionArr[2]).distanceTo(
          new Vector3(positionArr[3], positionArr[4], positionArr[5]),
        )

        const dashLength = lineWidth / 30
        const dashGapLength = dashLength

        const actualLineGeometry = new BufferGeometry().setFromPoints(
          getHorizontalLineStartAndEndCoords({
            point: vertexCoord,
            objectWidth: avatarWidth * 0.9,
            distanceFromObject: lineDistanceFromAvatar,
            angleFormedByLineOnXAxis: MathUtils.degToRad(angle),
            cameraCoords: camera.position,
          }),
        )

        return (
          <AvatarPostureLine
            key={firstIndexInAvatarPositionArray}
            dashGapLength={dashGapLength}
            dashLength={dashLength}
            dashLineGeometry={dashLineGeometry}
            actualLineGeometry={actualLineGeometry}
          />
        )
      })}
    </>
  )
}

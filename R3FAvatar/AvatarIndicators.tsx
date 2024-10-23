import { Box3, Vector3 } from 'three'
import { getMaxAndMinCoords, getVertexCoord } from './utils/point'
import { AvatarIndicatorLine } from './AvatarIndicatorLine'
import { useMemo, useState } from 'react'
import { useR3FAvatar } from './store'
import { RingMeasurementNames } from './utils/constants'
import { processIndicatorYCoords } from './utils/indicator'
import { useFrame, useThree } from '@react-three/fiber'
import { screenToWorldCoords } from './utils/camera'

export type AvatarIndicator = {
  /**
   * Name of the indicator.
   */
  name: RingMeasurementNames
  /**
   * Side on which the indicator will be shown.
   */
  side: 'left' | 'right'
  /**
   * A component that will be shown as an indicator.
   */
  IndicatorComponent: JSX.Element
  /**
   * If false, the indicator will not be shown.
   * @default true
   */
  showLine?: boolean
}

export type AvatarIndicatorsProps = {
  /**
   * Array of indicators that will be shown on the avatar.
   * Add the indicator in the order you want them to be shown.
   */
  indicators: AvatarIndicator[]
  /**
   * Expected width of the indicator in pixels.
   */
  indicatorExpectedWidth?: number
}

export function AvatarIndicators(props: AvatarIndicatorsProps) {
  const { indicators, indicatorExpectedWidth = 110 } = props
  const { avatar, ringCoords, cameraDirection } = useR3FAvatar(state => ({
    avatar: state.avatar,
    ringCoords: state.ringCoords,
    cameraDirection: state.cameraDirection,
  }))
  const { camera, size } = useThree()

  const indicatorsWithCoords = useMemo(() => {
    const ringCoordsMap = new Map<RingMeasurementNames, Vector3[]>()
    ringCoords.forEach(part => {
      ringCoordsMap.set(
        part.name,
        part.indices.map(v => getVertexCoord(avatar, v)),
      )
    })

    return indicators
      .filter(indicator => ringCoordsMap.has(indicator.name))
      .map(part => ({
        vertexCoord: ringCoordsMap.get(part.name) || [],
        ...part,
      }))
  }, [ringCoords, indicators, avatar])

  const box = new Box3().setFromObject(avatar)
  const avatarSize = box.getSize(new Vector3())
  const [leftMostWorldCoord, setLeftMostWorldCoord] = useState<Vector3 | null>(null)

  const indicatorYCoords = useMemo(
    () => processIndicatorYCoords(avatarSize.y, indicatorsWithCoords),
    [indicatorsWithCoords, avatarSize],
  )

  useFrame(() => {
    if (!cameraDirection) return
    const minX = screenToWorldCoords(indicatorExpectedWidth, 0, camera, size)
    if (leftMostWorldCoord) {
      if (minX.equals(leftMostWorldCoord)) return
    }

    setLeftMostWorldCoord(minX)
  })

  if (!leftMostWorldCoord) return null

  return (
    <group>
      {indicatorsWithCoords.map(part => {
        const { name, side, vertexCoord, IndicatorComponent, showLine = true } = part
        if (!name || !side) return null

        const { whenXIsMax, whenXIsMin } = getMaxAndMinCoords(vertexCoord)
        const coordOnRing = side === 'right' ? whenXIsMax : whenXIsMin
        const xCoordMultiplier = side === 'right' ? -1 : 1

        const indicatorCoord = new Vector3(
          leftMostWorldCoord.x * xCoordMultiplier,
          indicatorYCoords[name] || 0,
          leftMostWorldCoord.z,
        )

        return (
          <group key={name}>
            {IndicatorComponent && <group position={indicatorCoord}>{IndicatorComponent}</group>}
            {showLine && <AvatarIndicatorLine startCoord={indicatorCoord} endCoord={coordOnRing} />}
          </group>
        )
      })}
    </group>
  )
}

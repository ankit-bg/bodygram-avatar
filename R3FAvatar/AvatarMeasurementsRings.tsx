import { RingMeasurementNames } from './utils/constants'
import { AvatarMeasurementRing } from './AvatarMeasurmentRing'
import { getVertexCoord } from './utils/point'
import { useR3FAvatar } from './store'
import { useMemo } from 'react'

export type AvatarRingOptions = {
  /**
   * To show the coordinates of the ring.
   */
  debugRing?: boolean
  /**
   * Color of the ring.
   */
  color?: string
  /**
   * Colour of the debug dots
   */
  debugDotColor?: string
}

export type AvatarMeasurementRingsProps = {
  /**
   * To add the rings on the avatar.
   */
  rings: Partial<Record<RingMeasurementNames, AvatarRingOptions>>
}

export function AvatarMeasurementRings(props: AvatarMeasurementRingsProps) {
  const { rings } = props

  const { avatar, ringCoords } = useR3FAvatar(state => ({ avatar: state.avatar, ringCoords: state.ringCoords }))

  const coords = useMemo(
    () =>
      ringCoords
        .filter(part => part.name in rings)
        .map(part => ({
          name: part.name,
          vertexCoord: part.indices.map(v => getVertexCoord(avatar, v)),
        })),
    [ringCoords, rings, avatar],
  )

  return (
    <group>
      {coords.map(part => {
        const config = rings[part.name]
        if (!config) return null

        return (
          <AvatarMeasurementRing
            key={part.name}
            coords={part.vertexCoord}
            showCoords={config.debugRing}
            color={config.color}
            debugDotColor={config.debugDotColor}
          />
        )
      })}
    </group>
  )
}

import { AvatarIndicator } from '../AvatarIndicators'
import { RingMeasurementNames } from './constants'

export type IndicatorYCoords = { [key in RingMeasurementNames]?: number }
export function processIndicatorYCoords(
  avatarHeight: number,
  indicators: Partial<AvatarIndicator>[],
): IndicatorYCoords {
  const coords: IndicatorYCoords = {}

  const rightSideIndicators = indicators.filter(indicator => indicator.side === 'right')
  const leftSideIndicators = indicators.filter(indicator => indicator.side === 'left')

  const rightSideIndicatorsCount = rightSideIndicators.length
  const leftSideIndicatorsCount = leftSideIndicators.length

  const rightSideYOffset = avatarHeight / (rightSideIndicatorsCount - 1)
  const leftSideYOffset = avatarHeight / (leftSideIndicatorsCount - 1)

  function getCoord(currentIdx: number, count: number, offset: number) {
    if (count === 1) {
      return avatarHeight / 2
    }

    return avatarHeight - offset * currentIdx
  }

  rightSideIndicators.forEach((indicator, index) => {
    if (!indicator.name) return

    coords[indicator.name] = getCoord(index, rightSideIndicatorsCount, rightSideYOffset)
  })

  leftSideIndicators.forEach((indicator, index) => {
    if (!indicator.name) return

    coords[indicator.name] = getCoord(index, leftSideIndicatorsCount, leftSideYOffset)
  })

  return coords
}

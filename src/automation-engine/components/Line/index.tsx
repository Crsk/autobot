import { getConnectionPoints, getNodesOrientation } from '@/automation-engine/utils'
import React from 'react'
import { Point } from '@/automation-engine/types'
import Dot from '../Dot'
import LineTextLabel from '../LineTextLabel'

function Line({ origin, destination }: { origin: Point, destination: Point }) {
  const { originPoint, destinationPoint } = getConnectionPoints(origin, destination)
  const { orientation } = getNodesOrientation(origin, destination)
  const { x1, y1, x2, y2 } = {
    x1: originPoint.x,
    y1: originPoint.y,
    x2: destinationPoint.x,
    y2: destinationPoint.y,
  }
  const textPosition = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
  const tension = 0.5
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  const { x: originX, y: originY } = originPoint
  const { x: destX, y: destY } = destinationPoint
  const tensionDistance = tension * distance
  const horizontal = orientation === 'HORIZONTAL'
  const tensionX = originX < destX ? tensionDistance : -tensionDistance
  const tensionY = originY < destY ? tensionDistance : -tensionDistance
  const cp1x = horizontal ? x1 + tensionX : x1
  const cp1y = horizontal ? y1 : y1 + tensionY
  const cp2x = horizontal ? x2 - tensionX : x2
  const cp2y = horizontal ? y2 : y2 - tensionY
  const pathD = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}` // Create the Bezier curve

  return (
    <>
      <path
        d={pathD}
        stroke="#058af0"
        strokeWidth={1.5}
        fill="none"
      />
      <LineTextLabel x={textPosition.x} y={textPosition.y} text="Yes" />
      <Dot x={originPoint.x} y={originPoint.y} />
      <Dot x={destinationPoint.x} y={destinationPoint.y} />
    </>
  )
}

export default Line

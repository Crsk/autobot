import { getConnectionPoints } from '@/automation-engine/utils'
import React from 'react'
import { Point } from '@/automation-engine/types'
import Dot from '../Dot'
import LineTextLabel from '../LineTextLabel'

function Line({ origin, destination }: { origin: Point, destination: Point }) {
  const { originPoint, destinationPoint } = getConnectionPoints(origin, destination)
  const { x1, y1, x2, y2 } = {
    x1: originPoint.x,
    y1: originPoint.y,
    x2: destinationPoint.x,
    y2: destinationPoint.y,
  }
  const textPosition = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }

  // Calculate the alignment distance
  const horizontalDistance = Math.abs(x2 - x1)
  const verticalDistance = Math.abs(y2 - y1)
  const alignmentDistance = Math.min(horizontalDistance, verticalDistance)

  // Calculate tension based on the alignment distance
  const maxTension = 0.25
  const tension = (alignmentDistance / Math.max(horizontalDistance, verticalDistance)) * maxTension

  // Calculate the control points for the curve
  const midPoint = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
  const vector = { x: (x2 - x1) * tension, y: (y2 - y1) * tension }
  const controlPoint1 = { x: midPoint.x - vector.y, y: midPoint.y + vector.x }
  const controlPoint2 = { x: midPoint.x + vector.y, y: midPoint.y - vector.x }

  // Create the line curvature
  const pathD = `M ${x1} ${y1} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${x2} ${y2}`

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

import React from 'react'
import { Point } from 'shared/src/types/utils'
import { getConnectionPoints, getNodesOrientation } from 'shared/src/utils'
import ConnectionTextLabel from '../ConnectionTextLabel/ConnectionTextLabel'

// Helper function to calculate a point on a Bezier curve at a specific time (t)
function bezierPoint(p0: number, p1: number, p2: number, p3: number, t: number) {
  const mt = 1 - t

  return mt ** 3 * p0 + 3 * mt ** 2 * t * p1 + 3 * mt * t ** 2 * p2 + t ** 3 * p3
}

function getCurve(origin: Point, destination: Point, targetPercentage: number = 0.8) {
  const { orientation, verticalDistance } = getNodesOrientation(origin, destination)
  const { originPoint: connectionOrigin, destinationPoint: connectionDest } = getConnectionPoints(origin, destination)
  const { x1, y1, x2, y2 } = {
    x1: connectionOrigin.x,
    y1: connectionOrigin.y,
    x2: connectionDest.x,
    y2: connectionDest.y,
  }
  const tension = 0.5
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  const { x: originX, y: originY } = connectionOrigin
  const { x: destX, y: destY } = connectionDest
  const tensionDistance = tension * distance
  const horizontal = orientation === 'HORIZONTAL'
  const tensionX = originX < destX ? tensionDistance : -tensionDistance
  const tensionY = originY < destY ? tensionDistance : -tensionDistance
  const cp1x = horizontal ? x1 + tensionX : x1
  const cp1y = horizontal ? y1 : y1 + tensionY
  const cp2x = horizontal ? x2 - tensionX : x2
  const cp2y = horizontal ? y2 : y2 - tensionY
  const pathD = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}` // Create the Bezier curve

  // Calculate a point along the curve that is a certain percentage of the total distance from the origin to the destination node
  const pointDistance = distance * targetPercentage
  const t = pointDistance / distance
  const bx = bezierPoint(x1, cp1x, cp2x, x2, t)
  const by = bezierPoint(y1, cp1y, cp2y, y2, t)

  return {
    point: { x: bx, y: by },
    curve: pathD,
    connection: {
      origin: connectionOrigin,
      destination: connectionDest,
    },
    verticalDistance,
  }
}

function Connection({ origin, destination }: { origin: Point; destination: Point }) {
  const { point, curve, verticalDistance } = getCurve(origin, destination)

  return (
    <>
      <path d={curve} stroke="#0080ff" strokeWidth={1.5} fill="none" />
      <circle cx={point.x} cy={point.y} r={3} fill="#0080ff" />
      <ConnectionTextLabel x={point.x} y={point.y} text="Yes" verticalDistance={verticalDistance} />
    </>
  )
}

export default Connection

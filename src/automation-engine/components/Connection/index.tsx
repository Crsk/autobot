import { colors, getConnectionPoints, getNodesOrientation } from '@/automation-engine/utils'
import React from 'react'
import { Point } from '@/automation-engine/types'
import ConnectionTextLabel from '../ConnectionTextLabel'

function getCurve(origin: Point, destination: Point) {
  const { orientation } = getNodesOrientation(origin, destination)
  const { originPoint: connectionOrigin, destinationPoint: connectionDest } = getConnectionPoints(origin, destination)
  const { x1, y1, x2, y2 } = { x1: connectionOrigin.x, y1: connectionOrigin.y, x2: connectionDest.x, y2: connectionDest.y }
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

  return {
    center: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 },
    curve: pathD,
    connection: {
      origin: connectionOrigin,
      destination: connectionDest,
    },
  }
}

function Connection({ origin, destination }: { origin: Point, destination: Point }) {
  const { center, curve } = getCurve(origin, destination)

  return (
    <>
      <path d={curve} stroke={colors.primary} strokeWidth={1.5} fill="none" />
      <ConnectionTextLabel x={center.x} y={center.y} text="Yes" />
    </>
  )
}

export default Connection

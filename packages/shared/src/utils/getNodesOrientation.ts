import { Point } from 'shared/types/utils/Point.type'
import { defaultNodeHeight, defaultNodeWidth, verticallyThreshold } from './helper'

export default (node1: Point, node2: Point): {
  orientation: 'HORIZONTAL' | 'VERTICAL',
  alignmentDistance: number,
  horizontalDistance: number,
  verticalDistance: number,
  nodeCenter1: Point,
  nodeCenter2: Point
} => {
  const nodeCenter1 = { x: node1.x + defaultNodeWidth / 2, y: node1.y + defaultNodeHeight / 2 }
  const nodeCenter2 = { x: node2.x + defaultNodeWidth / 2, y: node2.y + defaultNodeHeight / 2 }
  const horizontalDistance = Math.abs(nodeCenter1.x - nodeCenter2.x)
  const verticalDistance = Math.abs(nodeCenter1.y - nodeCenter2.y)
  const orientation = verticalDistance * verticallyThreshold > horizontalDistance ? 'VERTICAL' : 'HORIZONTAL'
  const alignmentDistance = Math.min(horizontalDistance, verticalDistance)

  return {
    orientation,
    alignmentDistance,
    horizontalDistance,
    verticalDistance,
    nodeCenter1,
    nodeCenter2,
  }
}

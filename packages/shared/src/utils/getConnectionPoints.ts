import { Point } from '../types/utils'
import { defaultNodeHeight, defaultNodeWidth, verticallyThreshold } from './helper'

export default (origin: Point, destination: Point) => {
  const sourceSides = {
    left: { x: origin.x, y: origin.y + defaultNodeHeight / 2 },
    right: { x: origin.x + defaultNodeWidth, y: origin.y + defaultNodeHeight / 2 },
    top: { x: origin.x + defaultNodeWidth / 2, y: origin.y },
    bottom: { x: origin.x + defaultNodeWidth / 2, y: origin.y + defaultNodeHeight },
  }

  const destinationSides = {
    left: { x: destination.x, y: destination.y + defaultNodeHeight / 2 },
    right: { x: destination.x + defaultNodeWidth, y: destination.y + defaultNodeHeight / 2 },
    top: { x: destination.x + defaultNodeWidth / 2, y: destination.y },
    bottom: { x: destination.x + defaultNodeWidth / 2, y: destination.y + defaultNodeHeight },
  }

  // Calculate the horizontal and vertical distances between the center points of the two nodes
  const horizontalDistance = Math.abs(origin.x + defaultNodeWidth / 2 - (destination.x + defaultNodeWidth / 2))
  const verticalDistance = Math.abs(origin.y + defaultNodeHeight / 2 - (destination.y + defaultNodeHeight / 2))

  let sourceConnection: Point = { x: 0, y: 0 }
  let destinationConnection: Point = { x: 0, y: 0 }

  // Determine whether the nodes are more aligned vertically or horizontally
  if (verticalDistance * verticallyThreshold > horizontalDistance) {
    // Vertically more aligned
    sourceConnection = origin.y < destination.y ? sourceSides.bottom : sourceSides.top
    destinationConnection = origin.y < destination.y ? destinationSides.top : destinationSides.bottom
  } else {
    // Horizontally more aligned
    sourceConnection = origin.x < destination.x ? sourceSides.right : sourceSides.left
    destinationConnection = origin.x < destination.x ? destinationSides.left : destinationSides.right
  }

  return {
    originPoint: { x: sourceConnection.x, y: sourceConnection.y },
    destinationPoint: { x: destinationConnection.x, y: destinationConnection.y },
  }
}

import { Node } from '@/automation-engine/models/node'
import { Point } from '../types'

export const defaultBoxWidth = 225
export const defaultBoxHeight = 75
export const snapValue = 25

export const snapToGrid = (val: number) => Math.round(val / snapValue) * snapValue

// Define a threshold to determine when the nodes are considered aligned
export const alignmentThreshold = 10

// Check if the nodes are aligned vertically or horizontally
export const areNodesAligned = (origin: Point, destination: Point) => Math.abs(origin.x - destination.x) <= alignmentThreshold || Math.abs(destination.y - destination.y) <= alignmentThreshold

export const getConnectionPoints = (origin: Point, destination: Point) => {
  const sourceSides = {
    left: { x: origin.x, y: origin.y + defaultBoxHeight / 2 },
    right: { x: origin.x + defaultBoxWidth, y: origin.y + defaultBoxHeight / 2 },
    top: { x: origin.x + defaultBoxWidth / 2, y: origin.y },
    bottom: { x: origin.x + defaultBoxWidth / 2, y: origin.y + defaultBoxHeight },
  }

  const destinationSides = {
    left: { x: destination.x, y: destination.y + defaultBoxHeight / 2 },
    right: { x: destination.x + defaultBoxWidth, y: destination.y + defaultBoxHeight / 2 },
    top: { x: destination.x + defaultBoxWidth / 2, y: destination.y },
    bottom: { x: destination.x + defaultBoxWidth / 2, y: destination.y + defaultBoxHeight },
  }

  // Calculate the horizontal and vertical distances between the center points of the two nodes
  const horizontalDistance = Math.abs((origin.x + defaultBoxWidth / 2) - (destination.x + defaultBoxWidth / 2))
  const verticalDistance = Math.abs((origin.y + defaultBoxHeight / 2) - (destination.y + defaultBoxHeight / 2))

  let sourceConnection: Point = { x: 0, y: 0 }
  let destinationConnection: Point = { x: 0, y: 0 }

  // Determine whether the nodes are more aligned vertically or horizontally
  if (verticalDistance > horizontalDistance) {
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

export function getConnections(nodes: Node[]): { origin: Node; destination: Node }[] {
  return nodes.flatMap((node) => node.childrenIds
    .map((childId: string) => nodes.find((n) => n.id === childId))
    .filter((childNode) => !!childNode)
    .map((childNode) => ({ origin: node, destination: childNode }))) as { origin: Node; destination: Node }[]
}

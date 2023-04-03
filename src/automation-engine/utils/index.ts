import { Point } from '../types'

export const defaultNodeWidth = 210
export const defaultNodeHeight = 70
export const defaultNodeRadius = 12
export const snapValue = 35
const verticallyThreshold = 1 // the greater the value, the wider the range to change from vertical to horizontal
export const colors = {
  background: {
    light: '#f8f8f8',
    dark: '#f8f8f8', // TODO
  },
  primary: '#00378e',
  strong: '#232830',
}

export const snapToGrid = (val: number) => Math.round(val / snapValue) * snapValue

// Define a threshold to determine when the nodes are considered aligned
export const alignmentThreshold = 10

// Check if the nodes are aligned vertically or horizontally
export const areNodesAligned = (origin: Point, destination: Point) => Math.abs(origin.x - destination.x) <= alignmentThreshold || Math.abs(destination.y - destination.y) <= alignmentThreshold

export const getConnectionPoints = (origin: Point, destination: Point) => {
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
  const horizontalDistance = Math.abs((origin.x + defaultNodeWidth / 2) - (destination.x + defaultNodeWidth / 2))
  const verticalDistance = Math.abs((origin.y + defaultNodeHeight / 2) - (destination.y + defaultNodeHeight / 2))

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

export const getNodesOrientation = (node1: Point, node2: Point): {
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

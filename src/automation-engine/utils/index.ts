export const defaultBoxWidth = 225
export const defaultBoxHeight = 75
export const snapValue = 25

export const snapToGrid = (val: number) => Math.round(val / snapValue) * snapValue

// Define a threshold to determine when the nodes are considered aligned
export const alignmentThreshold = 10

// Check if the nodes are aligned vertically or horizontally
export const areNodesAligned = (origin: Point, destination: Point) => Math.abs(origin.x - destination.x) <= alignmentThreshold || Math.abs(destination.y - destination.y) <= alignmentThreshold


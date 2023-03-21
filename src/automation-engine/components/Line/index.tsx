import React from 'react'

function Line({
  x1,
  y1,
  x2,
  y2,
}: { x1: number, y1: number, x2: number, y2: number }) {
  // Define a threshold to determine when the nodes are considered aligned
  const alignmentThreshold = 10

  // Calculate the control points for the curve
  const controlPoint1 = {
    x: (x1 + x2) / 2,
    y: y1,
  }

  const controlPoint2 = {
    x: (x1 + x2) / 2,
    y: y2,
  }

  // Check if the nodes are aligned vertically or horizontally
  const areNodesAligned = Math.abs(x1 - x2) <= alignmentThreshold || Math.abs(y1 - y2) <= alignmentThreshold

  // Calculate the path's d attribute based on nodes' alignment
  const pathD = areNodesAligned
    ? `M ${x1} ${y1} L ${x2} ${y2}`
    : `M ${x1} ${y1} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${x2} ${y2}`

  return (
    <path
      d={pathD}
      stroke="#058af0"
      strokeWidth={1.5}
      fill="none"
    />
  )
}

export default Line

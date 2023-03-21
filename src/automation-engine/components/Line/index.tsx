import React from 'react'

function Line({
  x1,
  y1,
  x2,
  y2,
}: { x1: number, y1: number, x2: number, y2: number }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#058af0"
      strokeWidth={1.5}
    />
  )
}

export default Line

import React from 'react'
import styles from './text-label.module.scss'

function ConnectionTextLabel({ x, y, text, verticalDistance }: { x: number, y: number, text: string, verticalDistance: number }) {
  return (
    <g className={styles['non-selectable']} textAnchor="middle">
      <rect
        x={x - 15}
        y={y - 15}
        width={text.length * 7 + 10}
        height={20}
        rx={5}
        ry={5}
        fill="rgb(20, 24, 30)"
      />
      <text x={x} y={y + (verticalDistance < 60 ? 4 : 0)} fontSize={12} fill="darkcyan">
        {text}
      </text>
    </g>
  )
}

export default ConnectionTextLabel

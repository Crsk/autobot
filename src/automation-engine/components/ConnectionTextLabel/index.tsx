import { colors } from '@/automation-engine/utils'
import React from 'react'
import styles from './text-label.module.scss'

function ConnectionTextLabel({ x, y, text }: { x: number, y: number, text: string }) {
  return (
    <g className={styles['non-selectable']} textAnchor="middle">
      <rect
        x={x - 15}
        y={y - 15}
        width={text.length * 7 + 10}
        height={20}
        rx={5}
        ry={5}
        fill="#14161b"
      />
      <text x={x} y={y} fontSize={12} fill={colors.primary}>
        {text}
      </text>
    </g>
  )
}

export default ConnectionTextLabel

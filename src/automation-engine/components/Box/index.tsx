import React from 'react'
import { defaultBoxWidth, defaultBoxHeight, snapToGrid } from '@/automation-engine/utils'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import styles from './box.module.scss'

function Box({ x, y, onPositionChange }: { x: number, y: number, onPositionChange: any }) {
  const ref = React.useRef(null)
  useDrag(ref, snapToGrid, onPositionChange)

  return (
    <rect
      ref={ref}
      x={x}
      y={y}
      rx={5}
      width={defaultBoxWidth}
      height={defaultBoxHeight}
      fill="#058af0"
      className={styles.box}
    />
  )
}

export default Box

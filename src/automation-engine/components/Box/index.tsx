import React from 'react'
import { defaultBoxWidth, defaultBoxHeight } from '@/automation-engine/utils'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import styles from './box.module.scss'

function Box({ x, y, setBoxPosition }: { x: number, y: number, setBoxPosition: ActionCreatorWithPayload<any, string> }) {
  const ref = React.useRef(null)
  useDrag(ref, setBoxPosition)

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

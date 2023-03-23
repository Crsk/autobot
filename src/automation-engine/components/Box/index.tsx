import React from 'react'
import { defaultBoxWidth, defaultBoxHeight } from '@/automation-engine/utils'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { Node } from '@/automation-engine/models/node'
import NewNode from '../NewNode'
import styles from './box.module.scss'

function Box({ node }: { node: Node }) {
  const ref = React.useRef<SVGRectElement>(null)
  useDrag(ref, node.id)

  return (
    <>
      <rect
        ref={ref}
        x={node.x}
        y={node.y}
        rx={5}
        width={defaultBoxWidth}
        height={defaultBoxHeight}
        fill="#058af0"
        className={styles.box}
      />
      <NewNode parentNode={node} />
    </>
  )
}

export default Box

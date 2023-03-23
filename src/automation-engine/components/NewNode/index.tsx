import React, { useState } from 'react'
import useDragDot from '@/automation-engine/hooks/drag/useDragDot'
import { Node } from '@/automation-engine/models/node'
import { useSelector } from 'react-redux'
import styles from './new-node.module.scss'

function NewNode({ parentNode }: { parentNode: Node }) {
  const ref = React.useRef<SVGRectElement>(null)
  const newNode: { x: number, y: number } = useSelector((state: any) => state.newNode)
  const [isExpanded, setIsExpanded] = useState(false)
  useDragDot(ref, parentNode.id)

  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)

  return (
    <g
      ref={ref}
      transform={`translate(${newNode?.x ? newNode.x : parentNode.x + 113}, ${newNode?.y ? newNode.y : parentNode.y + 101})`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      x={newNode ? newNode.x : -10}
      y={newNode ? newNode.y : -10}
    >
      <rect ref={ref} rx={4} className={`${styles.dot} ${isExpanded ? styles.dotExpanded : ''}`} />
    </g>
  )
}

export default NewNode

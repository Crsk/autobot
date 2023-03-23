import React, { useRef, useState } from 'react'
import { Node } from '@/automation-engine/models/node'
import { useSelector } from 'react-redux'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { v4 as uuid } from 'uuid'
import styles from './new-node.module.scss'

function NewNode({ parentNode }: { parentNode: Node }) {
  const ref = React.useRef<SVGRectElement>(null)
  const newNodeIdRef = useRef<string>(uuid())
  const [isExpanded, setIsExpanded] = useState(false)
  const newNode: Node = useSelector((state: any) => state.nodesById[newNodeIdRef.current])
  useDrag(ref, newNodeIdRef.current, parentNode.id)

  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)

  return (
    <g
      ref={ref}
      transform={`translate(${newNode?.x ? newNode.x : parentNode.x + 113}, ${newNode?.y ? newNode.y : parentNode.y + 101})`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      x={newNode?.x ? newNode.x : parentNode.x + 113}
      y={newNode?.y ? newNode.y : parentNode.y + 101}
    >
      <rect ref={ref} rx={4} className={`${styles.dot} ${isExpanded ? styles.dotExpanded : ''}`} />
    </g>
  )
}

export default NewNode

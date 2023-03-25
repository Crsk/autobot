import React, { useRef, useState } from 'react'
import { Node } from '@/automation-engine/models/node'
import { useSelector } from 'react-redux'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { v4 as uuid } from 'uuid'
import { defaultNodeHeight, defaultNodeRadius, defaultNodeWidth } from '@/automation-engine/utils'
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
      transform={`translate(${newNode?.x ? newNode.x : parentNode.x - 4 + defaultNodeWidth / 2}, ${newNode?.y ? newNode.y : parentNode.y + defaultNodeHeight + 16})`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      x={newNode?.x ? newNode.x : parentNode.x + defaultNodeWidth / 2}
      y={newNode?.y ? newNode.y : parentNode.y + defaultNodeHeight + 16}
    >
      <rect
        ref={ref}
        rx={defaultNodeRadius}
        style={{ width: isExpanded ? `${defaultNodeWidth}px` : '8px', height: isExpanded ? `${defaultNodeHeight}px` : '8px' }}
        className={styles.dot}
      />
    </g>
  )
}

export default NewNode

import React, { useRef, useState, memo } from 'react'
import { Node } from '@/automation-engine/models/node'
import { useDispatch, useSelector } from 'react-redux'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { defaultNodeHeight, defaultNodeRadius, defaultNodeWidth, snapToGrid } from '@/automation-engine/utils'
import { Point } from '@/automation-engine/types'
import useSubscribe from '@/automation-engine/hooks/useSubscribe'
import { addNodeTrigger, clearNewChild } from '@/redux/slices/nodeSlice'
import { DraggingDataPayload } from '@/redux/types'
import { v4 as uuid } from 'uuid'
import styles from './new-node.module.scss'

const dotWidth = 4
const dotSeparation = 8

const getPosition = (newNode: Node | null, parent: Node): Point => ({
  x: newNode ? newNode.x : parent.x - dotWidth / 2 + defaultNodeWidth / 2,
  y: newNode ? newNode.y : parent.y + defaultNodeHeight + dotSeparation,
})

function NewNode({ parentNode }: { parentNode: Node }) {
  const dispatch = useDispatch()
  const dotRef = useRef<SVGRectElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const newNode = useSelector((state: any) => state.newNode)
  const parentNodeStore: Node & Partial<{ newChild: Point }> = useSelector((state: any) => state.nodesById[parentNode.id])
  const { x: dotX, y: dotY } = getPosition(newNode, parentNode)
  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)
  const draggingData = useSelector((state: { draggingData: DraggingDataPayload }) => state.draggingData)

  /**
   * Enable dragging functionality for the node.
   * Callback runs on drop event to:
   * 1. create a new node
   * 2. call clearNewChild() to move the dot to its initial point
   */
  useSubscribe(useDrag(dotRef, parentNode.id, true), () => {
    const { x, y } = parentNodeStore.newChild! // newChild exists temporary only before new node drop
    dispatch(addNodeTrigger({ id: uuid(), name: '', parentId: parentNode.id, x: snapToGrid(x), y: snapToGrid(y) }))
    dispatch(clearNewChild({ parentId: parentNode.id }))
  })

  return (
    <g
      ref={dotRef}
      transform={`translate(${parentNodeStore.newChild?.x || dotX}, ${parentNodeStore.newChild?.y || dotY})`} // Drag position
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      x={dotX}
      y={dotY}
      style={{ transition: !parentNodeStore.newChild && !draggingData.draggingNode ? 'transform 0.8s ease-in-out' : 'none' }}
    >
      <rect
        ref={dotRef}
        x="-8"
        y="-4"
        rx={defaultNodeRadius}
        width={isExpanded ? defaultNodeWidth : dotWidth}
        height={isExpanded ? defaultNodeHeight : dotWidth}
        className={styles.container}
      />
      <rect
        rx={defaultNodeRadius}
        style={{
          width: isExpanded ? `${defaultNodeWidth}px` : `${dotWidth}px`,
          height: isExpanded ? `${defaultNodeHeight}px` : `${dotWidth}px`,
          padding: '16px',
        }}
        className={styles.dot}
      />
    </g>
  )
}

export default memo(NewNode)

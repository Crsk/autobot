import React, { useRef, useState, memo } from 'react'
import { Point } from 'shared/src/types/utils'
import { Node } from 'shared/src/types/models'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { defaultNodeHeight, defaultNodeRadius, defaultNodeWidth, snapToGrid } from 'shared/src/utils'
import useDrag from '@/hooks/useDrag'
import useSubscribe from '@/hooks/useSubscribe'
import { addNodeTrigger, clearNewChild } from '@/redux/slices/nodeSlice'
import { RootState } from '@/redux/types'
import styles from './new-node.module.scss'

const dotWidth = 4
const dotSeparation = 8

const getPosition = (newNode: Node | null, parent: Node, isExpanded: boolean = false): Point => ({
  x: newNode ? newNode.x : parent.x - dotWidth / 2 + defaultNodeWidth / 2 - (isExpanded ? defaultNodeWidth / 2 : 0),
  y: newNode ? newNode.y : parent.y + defaultNodeHeight + dotSeparation,
})

function NewNode({ parentNode }: { parentNode: Node }) {
  const dispatch = useDispatch()
  const dotRef = useRef<SVGRectElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const parentNodeStore: Node & Partial<{ newChild: Point }> = useSelector((state: RootState) => state.node.nodesById[parentNode.id])
  const { x: dotX, y: dotY } = getPosition(null, parentNode, isExpanded)
  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)
  const draggingData = useSelector((state: RootState) => state.node.draggingData)

  /**
   * Enable dragging functionality for the node.
   * Callback runs on drop event to:
   * 1. create a new node
   * 2. call clearNewChild() to move the dot to its initial point
   */
  useSubscribe(useDrag(dotRef, parentNode.id, true), () => {
    // No new child means user just clicked on the dot
    if (!parentNodeStore.newChild) {
      setIsExpanded(false)
      dispatch(addNodeTrigger({ id: uuid(), name: '', parentId: parentNode.id, x: snapToGrid(dotX), y: snapToGrid(dotY + defaultNodeHeight) }))
    } else { // User dropped the node
      const { x, y } = parentNodeStore.newChild! // newChild exists temporary only before new node drop
      dispatch(addNodeTrigger({ id: uuid(), name: '', parentId: parentNode.id, x: snapToGrid(x), y: snapToGrid(y) }))
    }
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
      style={{ transition: !parentNodeStore.newChild && !draggingData.draggingNode ? 'transform 0.4s ease-in-out' : 'none' }}
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

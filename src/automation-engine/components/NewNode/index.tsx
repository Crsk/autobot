import React, { useRef, useState, useEffect, memo } from 'react'
import { Node } from '@/automation-engine/models/node'
import { useDispatch, useSelector } from 'react-redux'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { defaultNodeHeight, defaultNodeRadius, defaultNodeWidth } from '@/automation-engine/utils'
import { Point } from '@/automation-engine/types'
import useSubscribe from '@/automation-engine/hooks/useSubscribe'
import { addNodeTrigger, clearNewChild } from '@/redux/slices/nodeSlice'
import styles from './new-node.module.scss'

const dotWidth = 8
const dotSeparation = 16

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
  const [coords, setCoords] = useState<Point>({ x: dotX, y: dotY })
  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)

  /**
   * Enable dragging functionality for the node.
   * Callback runs on drop event to:
   * 1. create a new node
   * 2. move the dot to its initial point
   */
  useSubscribe(useDrag(dotRef, parentNode.id, true), () => {
    const { x, y } = parentNodeStore.newChild! // newChild exists temporary only before new node drop
    dispatch(addNodeTrigger({ name: '', parentId: parentNode.id, x, y }))
    dispatch(clearNewChild({ parentId: parentNode.id }))
  })

  useEffect(() => {
    setCoords({ x: dotX, y: dotY })
  }, [dotX, dotY])

  return (
    <g
      ref={dotRef}
      transform={`translate(${parentNodeStore.newChild?.x || coords.x}, ${parentNodeStore.newChild?.y || coords.y})`} // Drag position
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      x={coords.x} // Reset position (after drop)
      y={coords.y} // Reset position (after drop)
    >
      <rect
        ref={dotRef}
        x="-12"
        y="-12"
        rx={defaultNodeRadius}
        width={isExpanded ? defaultNodeWidth + 32 : dotWidth + 32}
        height={isExpanded ? defaultNodeHeight + 32 : dotWidth + 32}
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

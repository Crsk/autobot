import React, { useRef, useState, useEffect, memo } from 'react'
import { Node } from '@/automation-engine/models/node'
import { useSelector } from 'react-redux'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { v4 as uuid } from 'uuid'
import { defaultNodeHeight, defaultNodeRadius, defaultNodeWidth } from '@/automation-engine/utils'
import { Point } from '@/automation-engine/types'
import styles from './new-node.module.scss'

const dotWidth = 8
const dotSeparation = 16

const getPosition = (newNode: Node, parent: Node): Point => ({
  x: newNode ? newNode.x : parent.x - dotWidth / 2 + defaultNodeWidth / 2,
  y: newNode ? newNode.y : parent.y + defaultNodeHeight + dotSeparation,
})

function NewNode({ parentNode }: { parentNode: Node }) {
  const ref = useRef<SVGRectElement>(null)
  const newNodeIdRef = useRef<string>(uuid())
  const [isExpanded, setIsExpanded] = useState(false)
  const newNode = useSelector((state: any) => state.nodesById[newNodeIdRef.current])
  const { x: dotX, y: dotY } = getPosition(newNode, parentNode)
  const [coords, setCoords] = useState<Point>({ x: dotX, y: dotY })
  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)

  useDrag(ref, newNodeIdRef.current, parentNode.id)

  useEffect(() => {
    setCoords({ x: dotX, y: dotY })
  }, [dotX, dotY])

  return (
    <g
      ref={ref}
      transform={`translate(${coords.x}, ${coords.y})`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      x={coords.x}
      y={coords.y}
    >
      <rect
        ref={ref}
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

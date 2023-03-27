import React, { useState } from 'react'
import { defaultNodeWidth, defaultNodeHeight, defaultNodeRadius, colors } from '@/automation-engine/utils'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { Node as NodeType } from '@/automation-engine/models/node'
import NewNode from '../NewNode'
import styles from './node.module.scss'

function Node({ node }: { node: NodeType }) {
  const ref = React.useRef<SVGRectElement>(null)
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleDoubleClick = () => setEditMode(!editMode)
  const handleInputToLabel = () => setEditMode(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleInputToLabel()
  }
  useDrag(ref, node.id)

  return (
    <>
      <rect
        ref={ref}
        x={node.x}
        y={node.y}
        rx={defaultNodeRadius}
        width={defaultNodeWidth}
        height={defaultNodeHeight}
        fill={colors.primary}
        className={styles.node}
        onDoubleClick={handleDoubleClick}
      />
      {editMode
        ? (
          <foreignObject x={node.x} y={node.y} width={defaultNodeWidth} height={defaultNodeHeight}>
            <input
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleInputToLabel}
              onKeyDown={handleKeyDown}
              className={styles.blinkingCursor}
            />
          </foreignObject>
        )
        : (
          <text
            x={node.x + defaultNodeWidth / 2}
            y={node.y + defaultNodeHeight / 2}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ pointerEvents: 'none', fill: 'white', fontFamily: 'Roboto, sans-serif', fontSize: '1.1em' }}
            className={styles.nonSelectable}
          >
            {inputValue}
          </text>
        )}
      <NewNode parentNode={node} />
    </>
  )
}

export default Node

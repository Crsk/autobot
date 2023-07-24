import React, { useState } from 'react'
import { Node as NodeType } from 'shared/src/types/models'
import { defaultNodeHeight, defaultNodeRadius, defaultNodeWidth } from 'shared/src/utils'
import useDrag from '@/hooks/useDrag'
import NewNode from '../NewNode/NewNode'
import styles from './node.module.scss'
import NodePopover from './NodePopover/NodePopover'
import useSubscribe from '@/hooks/useSubscribe'

function Node({ node }: { node: NodeType }) {
  const ref = React.useRef<SVGRectElement>(null)
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState('')
  // const handleDoubleClick = () => setEditMode(!editMode)
  const handleInputToLabel = () => setEditMode(false)
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleInputToLabel()
  }
  useSubscribe(useDrag(ref, node.id), ({ dx, dy }) => {
    const isTap = dx === 0 && dy === 0
    if (isTap) setShowPopover(!showPopover)
  })

  return (
    <>
      <rect
        ref={ref}
        x={node.x}
        y={node.y}
        rx={defaultNodeRadius}
        width={defaultNodeWidth}
        height={defaultNodeHeight}
        fill="black"
        className={styles.node}
        // onDoubleClick={handleDoubleClick}
      />
      <text
        x={node.x + 7}
        y={node.y - 8}
        textAnchor="start"
        dominantBaseline="central"
        style={{ pointerEvents: 'none', fill: 'black', fontSize: '0.6em' }}
        className={styles.nonSelectable}
      >
        Action
      </text>
      {editMode ? (
        <foreignObject x={node.x} y={node.y} width={defaultNodeWidth} height={defaultNodeHeight}>
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onBlur={handleInputToLabel}
            onKeyDown={handleKeyDown}
            className={styles.blinkingCursor}
          />
        </foreignObject>
      ) : (
        <text
          x={node.x + 14}
          y={node.y + 24}
          textAnchor="start"
          dominantBaseline="central"
          style={{ pointerEvents: 'none', fill: '#dadada', fontSize: '0.8em', fontWeight: 'bold' }}
          className={styles.nonSelectable}
        >
          Do something
        </text>
      )}
      <text
        x={node.x + 14}
        y={node.y + 46}
        textAnchor="start"
        dominantBaseline="central"
        style={{ pointerEvents: 'none', fill: 'darkgray', fontSize: '0.7em' }}
        className={styles.nonSelectable}
      >
        Description of do something...
      </text>

      <NewNode parentNode={node} />
      {showPopover && <NodePopover node={node} />}
    </>
  )
}

export default Node

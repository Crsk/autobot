import React from 'react'
import { Node } from 'shared/src/types/models'
import { useDispatch } from 'react-redux'
import { deleteNodeTrigger } from '@/redux/slices/nodeSlice'
import ActionButton from '@/design-system/buttons/ActionButton'
import styles from './node-popover.module.scss'

function NodePopover({ node }: { node: Node }) {
  const { x, y } = node
  const actionButtonWidth = 32
  const dispatch = useDispatch()
  const handleDelete = () => dispatch(deleteNodeTrigger({ id: node.id }))
  const actionButtons = [
    <ActionButton type="DELETE" onPress={handleDelete} />,
  ]
  const buttonsCount = actionButtons.length + 1

  return (
    <foreignObject
      x={x - (buttonsCount * actionButtonWidth) / 2}
      y={y - 75}
      width={buttonsCount * actionButtonWidth}
      height={50}
    >
      <div className={styles.popover}>
        {actionButtons.map((Button) => Button)}
      </div>
    </foreignObject>
  )
}

export default NodePopover

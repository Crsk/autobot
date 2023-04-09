import React from 'react'
import { ActionButton, View } from '@adobe/react-spectrum'
import { Node } from 'shared/src/types/models'
import { useDispatch } from 'react-redux'
import { Delete } from '@/assets/icons'
import { deleteNodeTrigger } from '@/redux/slices/nodeSlice'
import styles from './node-popover.module.scss'

function NodePopover({ node }: { node: Node }) {
  const { x, y } = node
  const actionButtonWidth = 32
  const dispatch = useDispatch()
  const handleDelete = () => dispatch(deleteNodeTrigger({ id: node.id }))
  const actionButtons = [
    <ActionButton key="delete" isQuiet onPress={handleDelete}>
      <Delete />
    </ActionButton>,
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
        <View>
          {actionButtons.map((Button) => Button)}
        </View>
      </div>
    </foreignObject>
  )
}

export default NodePopover

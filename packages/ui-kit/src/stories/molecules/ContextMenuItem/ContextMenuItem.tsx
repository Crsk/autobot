import React, { MouseEvent } from 'react'
import { Text } from '../../atoms/Text/Text'
import styles from './ContextMenuItem.module.scss'

type ContextMenuItemProps = {
  value: string
  disabled?: boolean
  onClick: () => void
  onContextMenu: (event: MouseEvent<HTMLButtonElement>) => void
}

const ContextMenuItem = ({ value, disabled, onClick, onContextMenu }: ContextMenuItemProps) => (
  <button onClick={onClick} disabled={disabled} className={`${styles.container}`} onContextMenu={onContextMenu}>
    <Text level="primary">{value}</Text>
  </button>
)

export { ContextMenuItem }

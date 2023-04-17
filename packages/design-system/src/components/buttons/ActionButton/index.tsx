import React, { ReactNode } from 'react'
import { DeleteIcon } from '../../icons'
import styles from './button.module.scss'

export type ButtonType = 'DELETE'

export function ActionButton({ onPress, disabled, children, type }: {
  // eslint-disable-next-line react/require-default-props
  onPress: () => void, disabled?: boolean, children?: ReactNode, type?: ButtonType
}) {
  return (
    <button
      type="button"
      className={styles.actionButton}
      onClick={onPress}
      disabled={disabled}
    >
      {type === 'DELETE' && <DeleteIcon color={disabled ? 'disabled' : 'dark'} />}
      {!type && children}
    </button>
  )
}

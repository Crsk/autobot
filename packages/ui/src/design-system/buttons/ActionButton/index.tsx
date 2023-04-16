import React, { ReactNode } from 'react'
import { Delete } from '@/assets/icons'
import styles from './button.module.scss'

export type ButtonType = 'DELETE'

function ActionButton({ onPress, disabled, children, type }: {
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
      {type === 'DELETE' && <Delete color={disabled ? 'disabled' : 'dark'} />}
      {!type && children}
    </button>
  )
}

export default ActionButton

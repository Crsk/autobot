import React, { FC, MouseEvent, useRef } from 'react'
import styles from './ContextMenu.module.scss'
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem'
import { Separator } from '../../atoms/Separator/Separator'
import { useOnClickOutside } from '../../../utils/hooks/useOnClickOutside'

type Props = {
  theme: 'light' | 'dark'
  options: {
    type: 'button' | 'separator'
    label?: string
    isDisabled?: boolean
    onClick?: () => void
    onContextMenu?: (e: MouseEvent<HTMLButtonElement>) => void
  }[]
  x: number
  y: number
  onClose: () => void
}

const ContextMenu: FC<Props> = ({ theme, options, x, y, onClose }: Props) => {
  const handleClick = (onClick: () => void) => {
    onClick()
    onClose()
  }
  const contextMenuRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(contextMenuRef, onClose)

  return (
    <div ref={contextMenuRef} className={`${styles.container}`} style={{ top: `${y}px`, left: `${x}px` }}>
      {options.map(option =>
        option.type === 'button' ? (
          <ContextMenuItem
            value={option.label!}
            disabled={option.isDisabled}
            onClick={() => handleClick(option.onClick!)}
            onContextMenu={e => option.onContextMenu!(e)}
            key={option.label}
          />
        ) : (
          <Separator theme={theme} />
        )
      )}
    </div>
  )
}

export { ContextMenu }

import React, { MouseEvent, ReactNode, useState } from 'react'
import styles from './NavItem.module.scss'
import { Text } from '../../atoms/Text/Text'
import { Closed, Open, Public, View, ViewClosed } from '../../atoms/Icon'
import { Private } from '../../atoms/Icon/Private.vector'

type TreeProps = {
  value: string
  isFolder?: boolean
  isOpen?: boolean
  isPrivate?: boolean
  isVisible?: boolean
  level?: number
  theme?: 'light' | 'dark'
  children?: React.ReactNode
  onContextMenu?: (e: MouseEvent<HTMLButtonElement>) => void
}

const NavItem = ({
  value,
  isFolder,
  isOpen,
  isPrivate = false,
  isVisible = true,
  level = 0,
  theme = 'dark',
  children,
  onContextMenu,
}: TreeProps) => {
  const [privateState, setPrivateState] = useState(isPrivate)
  const [visibleState, setVisibleState] = useState(isVisible)
  const [openState, setOpenState] = useState(isOpen)

  const Icon = (): ReactNode => (!openState ? Closed(theme) : Open(theme))

  return (
    <div className={`${styles.container}`}>
      <button className={`${styles.nav}`} onContextMenu={onContextMenu}>
        <div className={`${styles.nav} ${styles.container}`}>
          <div className={`${styles.nav}`}>
            {isFolder && (
              <button
                data-testid="nav-folder"
                aria-expanded={openState}
                onClick={() => setOpenState(!openState)}
                style={{ marginLeft: `${level * 16}px` }}
              >
                {isFolder && Icon()}
              </button>
            )}

            {!isFolder && <div data-testid="nav-item" style={{ marginLeft: `${level * 16}px` }} />}

            <Text
              theme={theme}
              level={!privateState && isFolder ? 'secondary' : 'primary'}
              color={privateState ? 'private' : 'base'}
            >
              <span>{value}</span>
            </Text>
            <div className={[styles.nav, styles.options].join(' ')}>
              {isFolder && (
                <button
                  data-testid="privacy-toggle"
                  data-aria-readonly={privateState}
                  onClick={() => setPrivateState(!privateState)}
                >
                  {privateState ? Private(theme, privateState) : Public(theme)}
                </button>
              )}
              {isFolder && (
                <button
                  data-testid="visibility-toggle"
                  data-aria-hidden={visibleState}
                  onClick={() => setVisibleState(!visibleState)}
                >
                  {visibleState ? View(theme, privateState) : ViewClosed(theme, privateState)}
                </button>
              )}
            </div>
          </div>
        </div>
      </button>
      {openState && children}
    </div>
  )
}

export { NavItem }

import React, { FC, MouseEvent, useCallback, useState } from 'react'
import styles from './NavTree.module.scss'
import { Search } from '../../molecules/Search/Search'
import { NavItem } from '../../molecules/NavItem/NavItem'
import { TreeItem } from './types/TreeItem'
import { getAllNodes } from './utils/getAllNodes'
import { ContextMenu } from '../../molecules/ContextMenu/ContextMenu'

/**
 * Recursively renders a NavChild
 */
const NavChild: FC<TreeItem> = ({ value, isFolder, level, isPrivate, children, onContextMenu }: TreeItem) => (
  <NavItem value={value} isFolder={isFolder} level={level} isOpen isPrivate={isPrivate} onContextMenu={onContextMenu}>
    {children?.map(child => <NavChild key={child.value} {...child} onContextMenu={onContextMenu} />)}
  </NavItem>
)

type NavTreeProps = {
  theme?: 'light' | 'dark'
  tree: TreeItem[]
}

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
}

const NavTree = ({ theme = 'dark', tree }: NavTreeProps) => {
  const [filteredNavItems, setFilteredNavItems] = useState<TreeItem[]>(tree)
  const [contextMenu, setContextMenu] = useState(initialContextMenu)
  const onSearch = useCallback(
    (search: string) => {
      if (search === '') {
        setFilteredNavItems(tree)

        return
      }

      const searchResult = getAllNodes(tree).filter(child => child.value.toLowerCase().includes(search.toLowerCase()))
      setFilteredNavItems(searchResult)
    },
    [tree]
  )

  const onContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { clientX, clientY } = e
    setContextMenu({
      show: true,
      x: clientX,
      y: clientY,
    })
  }

  return (
    <div>
      {contextMenu.show && (
        <ContextMenu
          theme={theme}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(initialContextMenu)}
          options={[
            {
              type: 'button',
              label: 'New node',
              isDisabled: false,
              onClick: () => {},
            },
            { type: 'separator' },
            {
              type: 'button',
              label: 'New folder',
              isDisabled: false,
              onClick: () => {},
            },
            {
              type: 'button',
              label: 'Duplicate',
              isDisabled: false,
              onClick: () => {},
            },
            {
              type: 'button',
              label: 'Rename',
              isDisabled: false,
              onClick: () => {},
            },
            {
              type: 'button',
              label: 'Move to...',
              isDisabled: true,
              onClick: () => {},
            },
            {
              type: 'separator',
            },
            {
              type: 'button',
              label: 'Delete',
              isDisabled: false,
              onClick: () => {},
            },
          ]}
        />
      )}
      <div className={`${styles.navtree} ${styles[`navtree--${theme}`]}`}>
        <Search placeholder="Search" onSearch={onSearch} />
        <br />
        {filteredNavItems.map(child => (
          <NavChild key={child.value} {...child} onContextMenu={onContextMenu} />
        ))}
      </div>
    </div>
  )
}

export { NavTree }

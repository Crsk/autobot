import React, { FC, useCallback, useState } from 'react'
import styles from './NavTree.module.scss'
import { Search } from '../../molecules/Search/Search'
import { NavItem } from '../../molecules/NavItem/NavItem'
import { TreeItem } from './types/TreeItem'
import { Tree } from './types/Tree'
import { getAllNodes } from './utils/getAllNodes'

/**
 * Recursively renders a NavChild
 */
const NavChild: FC<TreeItem> = ({ value, isGroup, level, isPrivate, children }: TreeItem) => (
  <NavItem value={value} isGroup={isGroup} level={level} isOpen isPrivate={isPrivate}>
    {children?.map(child => <NavChild key={child.value} {...child} />)}
  </NavItem>
)

type NavTreeProps = {
  theme?: 'light' | 'dark'
  tree: Tree
}

const NavTree = ({ theme = 'dark', tree }: NavTreeProps) => {
  const [filteredNavItems, setFilteredNavItems] = useState<Tree>(tree)
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

  return (
    <div className={`${styles.navtree} ${styles[`navtree--${theme}`]}`}>
      <Search placeholder="Search" onSearch={onSearch} />
      <br />
      {filteredNavItems.map(child => (
        <NavChild key={child.value} {...child} />
      ))}
    </div>
  )
}

export { NavTree }

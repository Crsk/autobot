import { Tree } from '../types/Tree'
import { TreeItem } from '../types/TreeItem'

const getRoot = (tree: Tree): TreeItem => ({
  value: tree[0].value,
  isGroup: tree[0].isGroup,
  level: tree[0].level,
  isPrivate: tree[0].isPrivate,
  children: [],
})

/**
 * Recursively gets all children from tree (doesn't include root node)
 */
const getAllChildren = (tree: Tree): Tree => {
  if (tree.length === 0) return []

  const allChildren = tree.reduce(
    (acc: Tree, curr: TreeItem) => [...acc, ...curr.children, ...getAllChildren(curr.children)],
    []
  )

  return allChildren
}

/**
 * Recursively gets all nodes from tree (does include root node)
 */
export const getAllNodes = (tree: Tree): Tree => [getRoot(tree), ...getAllChildren(tree)]

import { TreeItem } from '../types/TreeItem'

const getRoot = (tree: TreeItem[]): TreeItem => ({
  value: tree[0].value,
  isFolder: tree[0].isFolder,
  level: tree[0].level,
  isPrivate: tree[0].isPrivate,
  children: [],
})

/**
 * Recursively gets all children from tree (doesn't include root node)
 */
const getAllChildren = (tree: TreeItem[]): TreeItem[] => {
  if (tree.length === 0) return []

  const allChildren = tree.reduce(
    (acc: TreeItem[], curr: TreeItem) => [...acc, ...curr.children, ...getAllChildren(curr.children)],
    []
  )

  return allChildren
}

/**
 * Recursively gets all nodes from tree (does include root node)
 */
export const getAllNodes = (tree: TreeItem[]): TreeItem[] => [getRoot(tree), ...getAllChildren(tree)]

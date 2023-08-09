import { sampleTree } from '../__fixtures__/tree'
import { TreeItem } from '../types/TreeItem'
import { getAllNodes } from './getAllNodes'

describe('getAllNodes', () => {
  it('should return all nodes from tree', () => {
    const tree: TreeItem[] = sampleTree.data
    const result = getAllNodes(tree).length

    expect(result).toEqual(sampleTree.totalNodes)
  })
})

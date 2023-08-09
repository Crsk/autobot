import { sampleTree } from '../__fixtures__/tree'
import { Tree } from '../types/Tree'
import { getAllNodes } from './getAllNodes'

describe('getAllNodes', () => {
  it('should return all nodes from tree', () => {
    const tree: Tree = sampleTree.data
    const result = getAllNodes(tree).length

    expect(result).toEqual(sampleTree.totalNodes)
  })
})

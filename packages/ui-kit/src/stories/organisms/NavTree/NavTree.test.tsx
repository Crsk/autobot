import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { NavTree } from './NavTree'
import { Tree } from './types/Tree'
import { sampleTree } from './__fixtures__/tree'

describe('NavTree', () => {
  const setup = () => {
    const tree: Tree = sampleTree.data
    const utils = render(<NavTree tree={tree} />)

    return { ...utils }
  }

  it('renders the children from the object argument', () => {
    const { getAllByTestId } = setup()
    const groups = getAllByTestId('nav-group')
    const nodes = getAllByTestId('nav-item')
    expect(groups).toHaveLength(sampleTree.totalGroups)
    expect(nodes).toHaveLength(sampleTree.totalLeafNodes)
  })

  it('filters leaf nodes when the search input changes', () => {
    const { getAllByTestId, getByPlaceholderText } = setup()

    let leafNodes = getAllByTestId('nav-item')
    expect(leafNodes).toHaveLength(sampleTree.totalLeafNodes)

    const input = getByPlaceholderText('Search')

    fireEvent.change(input, { target: { value: 'leaf node 1' } })
    leafNodes = getAllByTestId('nav-item')
    expect(leafNodes).toHaveLength(1)

    fireEvent.change(input, { target: { value: 'leaf node' } })
    leafNodes = getAllByTestId('nav-item')
    expect(leafNodes).toHaveLength(2)
  })

  it('filters group nodes when the search input changes', () => {
    const { getAllByTestId, getByPlaceholderText } = setup()

    let groupNodes = getAllByTestId('nav-group')
    expect(groupNodes).toHaveLength(sampleTree.totalGroups)

    const input = getByPlaceholderText('Search')

    fireEvent.change(input, { target: { value: 'group 1' } })
    groupNodes = getAllByTestId('nav-group')
    expect(groupNodes).toHaveLength(1)

    fireEvent.change(input, { target: { value: 'group' } })
    groupNodes = getAllByTestId('nav-group')
    expect(groupNodes).toHaveLength(2)
  })
})

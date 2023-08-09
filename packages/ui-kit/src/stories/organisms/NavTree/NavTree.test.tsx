import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { NavTree } from './NavTree'
import { TreeItem } from './types/TreeItem'
import { sampleTree } from './__fixtures__/tree'

describe('NavTree', () => {
  const setup = () => {
    const tree: TreeItem[] = sampleTree.data
    const utils = render(<NavTree tree={tree} />)

    return { ...utils }
  }

  it('renders the children from the object argument', () => {
    const { getAllByTestId } = setup()
    const folders = getAllByTestId('nav-folder')
    const nodes = getAllByTestId('nav-item')
    expect(folders).toHaveLength(sampleTree.totalFolders)
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

  it('filters folder nodes when the search input changes', () => {
    const { getAllByTestId, getByPlaceholderText } = setup()

    let folderNodes = getAllByTestId('nav-folder')
    expect(folderNodes).toHaveLength(sampleTree.totalFolders)

    const input = getByPlaceholderText('Search')

    fireEvent.change(input, { target: { value: 'folder 1' } })
    folderNodes = getAllByTestId('nav-folder')
    expect(folderNodes).toHaveLength(1)

    fireEvent.change(input, { target: { value: 'folder' } })
    folderNodes = getAllByTestId('nav-folder')
    expect(folderNodes).toHaveLength(2)
  })
})

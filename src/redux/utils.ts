const createChild = (state: any, parentId: string | null, childId: string, x: number, y: number) => {
  const parent = parentId ? state.nodesById[parentId] : null
  parent?.childrenIds.push(childId)
  state.nodesById[childId] = { id: childId, x, y, childrenIds: [] }
}

// eslint-disable-next-line import/prefer-default-export
export { createChild }

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getConnections } from '@/automation-engine/utils'
import { AddNodePayload, UpdateNodePositionPayload, UpdateConnectionsPayload, State, InitializeNodesPayload } from '../types'

const initialState: State = {
  nodesById: {},
  connections: [],
}

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    fetchNodes: (state) => state, // "trigger" action to initiate the process of fetching nodes.
    setNodes: (state, { payload: { nodes } }: PayloadAction<InitializeNodesPayload>) => {
      state.nodesById = nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
    },
    addNode: (state, { payload: { id, name, parentId, x, y } }: PayloadAction<AddNodePayload>) => {
      state.nodesById[id] = { id, name, parentId, x, y }
    },
    updateNodePosition: (state, { payload: { id, x, y } }: PayloadAction<UpdateNodePositionPayload>) => {
      state.nodesById[id] = { ...state.nodesById[id], x, y }
    },
    updateConnections: (state, { payload: { nodes, snapToGrid = false } }: PayloadAction<UpdateConnectionsPayload>) => {
      state.connections = getConnections(nodes, snapToGrid)
    },
    deleteNode: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      // Remove the node
      delete state.nodesById[id]

      // Rebuild all the connections according to the remaining nodes
      state.connections = getConnections(Object.values(state.nodesById), true)
    },
  },
})

export const { fetchNodes, setNodes, addNode, updateNodePosition, updateConnections, deleteNode } = nodeSlice.actions
export default nodeSlice

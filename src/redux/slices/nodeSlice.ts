import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getConnections } from '@/automation-engine/utils'
import { AddNodePayload, UpdateNodePositionPayload, UpdateConnectionsPayload, State } from '../types'

const initialState: State = {
  nodesById: {},
  connections: [],
}

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {

    addNode: (state, { payload: { id, name, parentId, x, y } }: PayloadAction<AddNodePayload>) => {
      state.nodesById[id] = { id, name, parentId, x, y }
    },
    updateNodeCoords: (state, { payload: { id, x, y } }: PayloadAction<UpdateNodePositionPayload>) => {
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

export const { addNode, updateNodeCoords, updateConnections, deleteNode } = nodeSlice.actions
export default nodeSlice

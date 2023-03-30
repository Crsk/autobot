/* eslint-disable @typescript-eslint/no-unused-vars */
import { getConnections } from '@/automation-engine/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node } from '@/automation-engine/models/node'
import { State, FetchNodesPayload, AddNodePayload, UpdateNodePayload, UpdateConnectionsPayload, DeleteNodePayload, NodeActionTypes, ConnectionActionTypes } from '../types'

const initialState: State = {
  nodesById: {},
  connections: [],
}

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    fetchNodesTrigger: (state) => state,
    addNodeTrigger: (state, _action: PayloadAction<{ id: string, name: string, parentId: string, x: number, y: number }>) => state,
    updateNodeTrigger: (state, _action: PayloadAction<{ id: string, propsToUpdate: Partial<Node> }>) => state,
    deleteNodeTrigger: (state, _action: PayloadAction<{ id: string }>) => state,
    updateConnectionsTrigger: (state, _action: PayloadAction<{ nodes: Node[], snapToGrid: boolean }>) => state,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action): action is PayloadAction<FetchNodesPayload> => action.type === NodeActionTypes.FETCH,
        (state, { payload: { nodes } }) => {
          state.nodesById = nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
        },
      )
      .addMatcher(
        (action): action is PayloadAction<AddNodePayload> => action.type === NodeActionTypes.ADD,
        (state, { payload: { id, name, parentId, x, y } }) => {
          state.nodesById[id] = { id, name, parentId, x, y }
        },
      )
      .addMatcher(
        (action): action is PayloadAction<UpdateNodePayload> => action.type === NodeActionTypes.UPDATE,
        (state, { payload: { id, propsToUpdate } }) => {
          state.nodesById[id] = { ...state.nodesById[id], ...propsToUpdate }
        },
      )
      .addMatcher(
        (action): action is PayloadAction<DeleteNodePayload> => action.type === NodeActionTypes.DELETE,
        (state, { payload: { id } }) => {
          // Remove the node
          delete state.nodesById[id]

          // Rebuild all the connections according to the remaining nodes
          state.connections = getConnections(Object.values(state.nodesById), true)
        },
      )
      .addMatcher(
        (action): action is PayloadAction<UpdateConnectionsPayload> => action.type === ConnectionActionTypes.UPDATE,
        (state, { payload: { nodes, snapToGrid = false } }) => {
          state.connections = getConnections(nodes, snapToGrid)
        },
      )
  },
})

export const {
  fetchNodesTrigger,
  addNodeTrigger,
  updateNodeTrigger,
  updateConnectionsTrigger,
  deleteNodeTrigger,
} = nodeSlice.actions

export default nodeSlice

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node } from '@/automation-engine/models/node'
import { State, FetchNodesPayload, AddNodePayload, UpdateNodePayload, DeleteNodePayload, NodeActionTypes } from '../types'

const initialState: State = {
  nodesById: {},
}

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    fetchNodesTrigger: (state) => state,
    addNodeTrigger: (state, _action: PayloadAction<{ id?: number, name: string, parentId: number, x: number, y: number }>) => state,
    updateNodeTrigger: (state, _action: PayloadAction<{ id: number, propsToUpdate: Partial<Node> }>) => state,
    deleteNodeTrigger: (state, _action: PayloadAction<{ id: number }>) => state,
    updateNewChild: (state, { payload: { id, x, y } }: PayloadAction<{ id: number, x: number, y: number }>) => {
      state.nodesById[id].newChild = { x, y }
    },
    clearNewChild: (state, { payload: { parentId } }: PayloadAction<{ parentId: number }>) => { state.nodesById[parentId].newChild = undefined },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action): action is PayloadAction<FetchNodesPayload> => action.type === NodeActionTypes.FETCH,
        (state, { payload }) => {
          state.nodesById = payload?.nodes
            ? payload.nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
            : state.nodesById
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
        (state, { payload: { id } }) => { delete state.nodesById[id] }, // Deleting, this is only needed while dragging a new child node
      )
  },
})

export const {
  fetchNodesTrigger,
  addNodeTrigger,
  updateNodeTrigger,
  deleteNodeTrigger,
  updateNewChild,
  clearNewChild,
} = nodeSlice.actions

export default nodeSlice

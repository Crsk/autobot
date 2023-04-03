/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node } from '@/automation-engine/models/node'
import { State, FetchNodesPayload, AddNodePayload, UpdateNodePayload, DeleteNodePayload, NodeActionTypes, DraggingDataPayload } from '../types'

const initialState: State = {
  nodesById: {},
  draggingData: { draggingNode: false },
}

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    fetchNodesTrigger: (state) => state,
    addNodeTrigger: (state, _action: PayloadAction<{ id?: string, name: string, parentId: string, x: number, y: number }>) => state,
    updateNodeTrigger: (state, _action: PayloadAction<{ id: string, propsToUpdate: Partial<Node> }>) => state,
    deleteNodeTrigger: (state, _action: PayloadAction<{ id: string }>) => state,
    updateNewChild: (state, { payload: { id, x, y } }: PayloadAction<{ id: string, x: number, y: number }>) => {
      state.nodesById[id].newChild = { x, y }
    },

    // Before a new child is created, a temporary node is created until the new node is dropped, after drop it is cleared
    clearNewChild: (state, { payload: { parentId } }: PayloadAction<{ parentId: string }>) => { state.nodesById[parentId].newChild = undefined },
    draggingData: (state, { payload: { draggingNode } }: PayloadAction<{ draggingNode: boolean }>) => { state.draggingData.draggingNode = draggingNode },
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
          if (id) state.nodesById[id] = { id, name, parentId, x, y }
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
  draggingData,
} = nodeSlice.actions

export default nodeSlice

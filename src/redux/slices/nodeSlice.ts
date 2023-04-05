/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node } from '@/automation-engine/models/node'
import { State, FetchNodesPayload, AddNodePayload, UpdateNodePayload, DeleteNodePayload, NodeActionTypes, DeleteFromQueue } from '../types'

const initialState: State = {
  nodesById: {},
  draggingData: { draggingNode: false },
  syncQueue: { NODE: { ADD: {}, UPDATE: {}, DELETE: {} } },
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
    syncNodesTrigger: (state) => state,
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
        (action): action is PayloadAction<AddNodePayload & { queueTimestamp: number }> => action.type === NodeActionTypes.ADD,
        (state, { payload: { id, name, parentId, x, y, queueTimestamp } }) => {
          if (queueTimestamp) {
            state.syncQueue.NODE.ADD[id] = { id, name, parentId, x, y, timestamp: queueTimestamp }
          }
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
      .addMatcher(
        (action): action is PayloadAction<DeleteFromQueue> => action.type === NodeActionTypes.DELETE_FROM_QUEUE,
        (state, { payload: { operation, id } }) => {
          delete state.syncQueue.NODE[operation]?.[id]
        },
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
  syncNodesTrigger,
} = nodeSlice.actions

export default nodeSlice

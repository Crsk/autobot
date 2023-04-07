import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddNodePayload, DeleteNodePayload, UpdateNodePayload } from '@/automation-engine/api/node/payloads'
import { QueueState, DeleteFromQueue, QueueActionTypes } from '../types'

const initialState: QueueState = {
  NODE: { ADD: {}, UPDATE: {}, DELETE: {} },
}

const queueSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    syncNodesTrigger: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action): action is PayloadAction<AddNodePayload> => action.type === QueueActionTypes.ADD_NODE,
        (state, { payload: { id, name, parentId, x, y } }) => { state.NODE.ADD[id] = { id, name, parentId, x, y } },
      )
      .addMatcher(
        (action): action is PayloadAction<UpdateNodePayload> => action.type === QueueActionTypes.UPDATE_NODE,
        (state, { payload: { id, propsToUpdate } }) => { state.NODE.UPDATE[id] = { id, propsToUpdate } },
      )
      .addMatcher(
        (action): action is PayloadAction<DeleteNodePayload> => action.type === QueueActionTypes.DELETE_NODE,
        (state, { payload: { id } }) => { state.NODE.DELETE[id] = { id } },
      )
      .addMatcher(
        (action): action is PayloadAction<DeleteFromQueue> => action.type === QueueActionTypes.DELETE_FROM_QUEUE,
        (state, { payload: { operation, id } }) => { delete state.NODE[operation]?.[id] },
      )
  },
})

export const { syncNodesTrigger } = queueSlice.actions
export default queueSlice

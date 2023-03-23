// store.ts
import { createSlice, configureStore, DevToolsEnhancerOptions, PayloadAction } from '@reduxjs/toolkit'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Node } from '@/automation-engine/models/node'

interface AddNodePayload {
  parentId: string | null
  id: string
  x: number
  y: number
}

interface UpdateNodePayload {
  id: string
  x: number
  y: number
}

interface NewNodePayload {
  x: number
  y: number
}

interface State {
  nodesById: Record<string, Node>
  newNode: NewNodePayload | null
}

const initialState: State = {
  nodesById: {},
  newNode: { x: 0, y: 0 } || null,
}

const createChild = (state: any, parentId: string | null, childId: string, x: number, y: number) => {
  const parent = parentId ? state.nodesById[parentId] : null
  parent?.childrenIds.push(childId)
  state.nodesById[childId] = { id: childId, x, y, childrenIds: [] }
  state.newNode = null
}

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    addNode: (state, { payload: { parentId, id, x, y } }: PayloadAction<AddNodePayload>) => {
      createChild(state, parentId, id, x, y)
    },
    updateNode: (state, { payload: { id, x, y } }: PayloadAction<UpdateNodePayload>) => {
      state.nodesById[id] = { ...state.nodesById[id], x, y }
    },
    updateNewNode: (state, { payload: { x, y } }: PayloadAction<NewNodePayload>) => {
      state.newNode = { x, y }
    },
    dropNewNode: (state, { payload: { parentId, id, x, y } }: PayloadAction<AddNodePayload>) => {
      createChild(state, parentId, id, x, y)
    },
  },
})

export const { addNode, updateNode, updateNewNode, dropNewNode } = nodeSlice.actions

const store = configureStore({
  reducer: nodeSlice.reducer,
  devTools: [devToolsEnhancer({ realtime: true } as any)] as DevToolsEnhancerOptions,
})

export default store

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
  newNode: null,
}

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<AddNodePayload>) => {
      const { parentId, id, x, y }: { parentId: string | null, id: string, x: number, y: number } = action.payload
      const parent = parentId ? state.nodesById[parentId] : null
      parent?.childrenIds.push(id)
      state.nodesById[id] = { id, x, y, childrenIds: [] }
    },
    updateNode: (state, action: PayloadAction<UpdateNodePayload>) => {
      const { id, x, y } = action.payload
      state.nodesById[id].x = x
      state.nodesById[id].y = y
    },
    startNewNode: (state, action: PayloadAction<NewNodePayload>) => {
      state.newNode = action.payload
    },
    updateNewNode: (state, action: PayloadAction<NewNodePayload>) => {
      if (state.newNode) {
        state.newNode.x = action.payload.x
        state.newNode.y = action.payload.y
      }
    },
    dropNewNode: (state, action: PayloadAction<AddNodePayload>) => {
      const { parentId, id, x, y } = action.payload
      const parent = parentId ? state.nodesById[parentId] : null
      parent?.childrenIds.push(id)
      state.nodesById[id] = { id, x, y, childrenIds: [] }
      state.newNode = null
    },
  },
})

export const { addNode, updateNode, startNewNode, updateNewNode, dropNewNode } = nodeSlice.actions

const store = configureStore({
  reducer: nodeSlice.reducer,
  devTools: [devToolsEnhancer({ realtime: true } as any)] as DevToolsEnhancerOptions,
})

export default store

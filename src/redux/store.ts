// store.ts
import { createSlice, configureStore, DevToolsEnhancerOptions, PayloadAction } from '@reduxjs/toolkit'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Node } from '@/automation-engine/models/node'
import { getConnections } from '@/automation-engine/utils'

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

interface UpdateConnectionsPayload {
  nodes: Node[]
  snapToGrid?: boolean // the idea is not to snap to grid while dragging, only on drop so it moves smoothly
}

interface State {
  nodesById: Record<string, Node>
  connections: { origin: Node; destination: Node }[]
}

const initialState: State = {
  nodesById: {},
  connections: [],
}

const createChild = (state: any, parentId: string | null, childId: string, x: number, y: number) => {
  const parent = parentId ? state.nodesById[parentId] : null
  parent?.childrenIds.push(childId)
  state.nodesById[childId] = { id: childId, x, y, childrenIds: [] }
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
    updateConnections: (state, { payload: { nodes, snapToGrid = false } }: PayloadAction<UpdateConnectionsPayload>) => {
      state.connections = getConnections(nodes, snapToGrid)
    },
    deleteNode: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      const node = state.nodesById[id]
      if (node) {
        // Remove the deleting nodeId from each parent
        const parentNodes = Object.values(state.nodesById).filter((n) => n.childrenIds.includes(id))
        parentNodes.forEach((parent) => {
          parent.childrenIds = parent.childrenIds.filter((childId) => childId !== id)
        })

        // Remove the node
        delete state.nodesById[id]

        // Rebuild all the connections according to the remaining nodes
        state.connections = getConnections(Object.values(state.nodesById), true)
      }
    },
  },
})

export const { addNode, updateNode, updateConnections, deleteNode } = nodeSlice.actions

const store = configureStore({
  reducer: nodeSlice.reducer,
  devTools: [devToolsEnhancer({ realtime: true } as any)] as DevToolsEnhancerOptions,
})

export default store

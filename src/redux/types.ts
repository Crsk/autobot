import { Node } from '@/automation-engine/models/node'

interface FetchNodesPayload {
  nodes: Node[]
}

interface AddNodePayload {
  id: string
  name: string
  parentId: string | null
  x: number
  y: number
}

interface UpdateNodePayload {
  id: string
  propsToUpdate: Partial<Node>
}

interface UpdateConnectionsPayload {
  nodes: Node[]
  snapToGrid?: boolean
}

interface DeleteNodePayload {
  id: string
}

interface State {
  nodesById: Record<string, Node>
}

type RootState = State

export enum NodeActionTypes {
  FETCH = 'node/fetch',
  ADD = 'node/add',
  UPDATE = 'node/update',
  DELETE = 'node/delete',
}

export type {
  FetchNodesPayload,
  AddNodePayload,
  UpdateNodePayload,
  UpdateConnectionsPayload,
  State,
  RootState,
  DeleteNodePayload,
}

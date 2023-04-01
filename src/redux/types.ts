import { Node } from '@/automation-engine/models/node'

interface FetchNodesPayload {
  nodes: Node[]
}

interface AddNodePayload {
  id: number
  name: string
  parentId: number | null
  x: number
  y: number
}

interface UpdateNodePayload {
  id: number
  propsToUpdate: Partial<Node>
}

interface UpdateConnectionsPayload {
  nodes: Node[]
  snapToGrid?: boolean
}

interface DeleteNodePayload {
  id: number
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

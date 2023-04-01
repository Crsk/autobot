import { Node } from '@/automation-engine/models/node'
import { Point } from '@/automation-engine/types'

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
  nodesById: Record<string, Node & Partial<{ newChild: Point }>> // newChild is pretty temporal, it exists only while dragging a new child
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

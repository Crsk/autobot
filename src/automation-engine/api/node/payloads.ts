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

interface DraggingDataPayload {
  draggingNode: boolean
}

export type {
  FetchNodesPayload,
  AddNodePayload,
  UpdateNodePayload,
  UpdateConnectionsPayload,
  DeleteNodePayload,
  DraggingDataPayload,
}

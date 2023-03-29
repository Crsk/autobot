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

interface UpdateConnectionsPayload {
  nodes: Node[]
  snapToGrid?: boolean
}

interface State {
  nodesById: Record<string, Node>
  connections: { origin: Node; destination: Node }[]
}

type RootState = State

export type { AddNodePayload, UpdateNodePayload, UpdateConnectionsPayload, State, RootState }

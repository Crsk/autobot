import { ConnectionNode } from '@/automation-engine/types'
import { Node } from '@/automation-engine/models/node'

interface AddNodePayload {
  id: string
  name: string
  parentId: string | null
  x: number
  y: number
}

interface UpdateNodePositionPayload {
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
  connections: { origin: ConnectionNode; destination: ConnectionNode }[]
}

type RootState = State

export type { AddNodePayload, UpdateNodePositionPayload, UpdateConnectionsPayload, State, RootState }

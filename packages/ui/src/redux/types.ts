import { Point } from 'shared/src/types/utils'
import { CreateNodeBody, DeleteNodeParams, UpdateNodeBody } from 'shared/src/types/dto'

interface DeleteFromQueue {
  operation: 'ADD' | 'UPDATE' | 'DELETE'
  id: string
}

interface NodeState {
  nodesById: Record<string, CreateNodeBody & Partial<{ newChild: Point }>> // newChild is pretty temporal, it exists only while dragging a new child
  draggingData: DraggingDataPayload,
}

interface QueueState {
  NODE: QueueOperation<CreateNodeBody, UpdateNodeBody, DeleteNodeParams>
}

export type QueueOperation<AddPayload, UpdatePayload, DeletePayload> = {
  ADD: Record<string, AddPayload>,
  UPDATE: Record<string, UpdatePayload>,
  DELETE: Record<string, DeletePayload>,
}

type RootState = {
  node: NodeState
  queue: QueueState
}

export enum NodeActionTypes {
  FETCH = 'node/fetch',
  ADD = 'node/add',
  UPDATE = 'node/update',
  DELETE = 'node/delete',
}

export enum QueueActionTypes {
  SYNC = 'queue/sync',
  DELETE_FROM_QUEUE = 'queue/deleteFromQueue',
  ADD_NODE = 'queue/addNode',
  UPDATE_NODE = 'queue/updateNode',
  DELETE_NODE = 'queue/deleteNode',
}

type DraggingDataPayload = { draggingNode: boolean }

export type {
  NodeState,
  QueueState,
  RootState,
  DeleteFromQueue,
}

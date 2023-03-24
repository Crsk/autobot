import { Node } from '@/automation-engine/models/node'

export type Point = { x: number, y: number }
export type ConnectionNode = { id: string } & Node
export type Connection = { origin: ConnectionNode; destination: ConnectionNode }

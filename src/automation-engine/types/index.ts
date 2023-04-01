export type Point = { x: number, y: number }
export type ConnectionNode = { id: number } & Point
export type Connection = { origin: ConnectionNode; destination: ConnectionNode }

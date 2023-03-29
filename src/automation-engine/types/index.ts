export type Point = { x: number, y: number }
export type ConnectionNode = { id: string } & Point
export type Connection = { origin: ConnectionNode; destination: ConnectionNode }

export default interface Node {
  createdAt?: string
  id: string
  name: string
  parentId: string | null
  x: number
  y: number
}

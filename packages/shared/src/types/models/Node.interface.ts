export default interface Node {
  code?: string
  createdAt?: string
  description?: string
  embeddings?: string
  id: string
  name?: string
  parentId: string | null
  x: number
  y: number
}

export interface Connection {
  id: number
  name: string
  parentId: number | null
  childId: number | null
}

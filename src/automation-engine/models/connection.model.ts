export interface Connection {
  id: number
  name: string
  parentId: string | null
  childId: string | null
}

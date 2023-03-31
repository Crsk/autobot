export interface Connection {
  id: string
  name: string
  parentId: string | null
  childId: string | null
}

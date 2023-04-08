// Node is a global keyword in Typescript, so if exporting as default, it will conflict when importing.
export interface Node {
  createdAt?: string
  id: string
  name: string
  parentId: string | null
  x: number
  y: number
}

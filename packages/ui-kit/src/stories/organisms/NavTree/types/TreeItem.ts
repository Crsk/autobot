export type TreeItem = {
  value: string
  isGroup: boolean
  level: number
  isPrivate?: boolean
  children: TreeItem[]
}

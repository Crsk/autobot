export type TreeItem = {
  value: string
  isFolder: boolean
  level: number
  isPrivate?: boolean
  children: TreeItem[]
  onContextMenu?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

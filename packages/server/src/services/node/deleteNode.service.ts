import { deleteRow } from '../../database'

export const deleteNode = async (id: string): Promise<boolean> => {
  const affectedRows = await deleteRow('node', id)

  return !!affectedRows
}

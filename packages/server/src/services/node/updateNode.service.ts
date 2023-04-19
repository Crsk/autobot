import { Node } from 'shared/src/types/models'
import { getRow, updateRow } from '../../database'
import { SnakeCase } from '../../utils/types'

export const updateNode = async (id: string, updatedNode: Partial<SnakeCase<Node>>): Promise<SnakeCase<Node> | undefined> => {
  await updateRow('node', id, updatedNode)
  const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', id)

  return nodes[0]
}

import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../../utils/types'
import { getRow } from '../../database'

export const getNode = async (id: string): Promise<SnakeCase<Node> | undefined> => {
  const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', id)

  return nodes[0]
}

import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../../utils/types'
import { getRows } from '../../database'

export const getNodes = async (): Promise<SnakeCase<Node>[] | undefined> => {
  const nodes: SnakeCase<Node>[] = await getRows<SnakeCase<Node>>('node')

  return nodes
}

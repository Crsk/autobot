import { CreateNodeBody } from 'shared/src/types/dto'
import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../../utils/types'
import { getRow, insertRow } from '../../database'

export const createNode = async (newNode: SnakeCase<CreateNodeBody>): Promise<SnakeCase<Node> | undefined> => {
  const affectedRows: number = await insertRow('node', newNode)
  if (!affectedRows) return undefined

  const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', newNode.id)

  return nodes[0]
}

import { CreateNodeBody } from 'shared/src/types/dto'
import { ResultSetHeader } from 'mysql2'
import { SnakeCase } from '../../../utils/types'
import runTransaction from '../../../database/runTransaction'

export const createNodes = async (newNodes: SnakeCase<CreateNodeBody>[]): Promise<number | undefined> => {
  let transactionQueries: { query: string, params: any[] }[] = []
  const queryResult: ResultSetHeader[] = []

  const commitTransaction = async () => {
    if (transactionQueries.length > 0) {
      const results = await runTransaction(transactionQueries)
      queryResult.push(...results)
      transactionQueries = []
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const node of newNodes) {
    const isParentInTransaction = transactionQueries.some((q) => q.params[0] === node.parent_id)
    // eslint-disable-next-line no-await-in-loop
    if (isParentInTransaction) await commitTransaction()

    transactionQueries.push({
      query: 'INSERT INTO node (id, name, x, y, parent_id) VALUES (?, ?, ?, ?, ?)',
      params: [node.id, node.name, node.x, node.y, node.parent_id],
    })
  }
  await commitTransaction()

  return queryResult.length
}

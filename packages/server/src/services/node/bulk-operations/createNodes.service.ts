import { CreateNodeBody } from 'shared/src/types/dto'
import format from 'pg-format'
import { SnakeCase } from '../../../utils/types'
import runTransaction from '../../../database/runTransaction'

export const createNodes = async (newNodes: SnakeCase<CreateNodeBody>[]): Promise<number | undefined> => {
  let transactionQueries: { query: string; id: string }[] = []
  const queryResult = []

  const commitTransaction = async () => {
    if (transactionQueries.length > 0) {
      const results = await runTransaction(transactionQueries)
      queryResult.push(...results)
      transactionQueries = []
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const node of newNodes) {
    const isParentInTransaction = transactionQueries.some(q => q.id === node.parent_id)
    // eslint-disable-next-line no-await-in-loop
    if (isParentInTransaction) await commitTransaction()

    const columns = Object.keys(node)
    const values = Object.values(node)
    const query = format('INSERT INTO %I (%I) VALUES (%L)', 'node', columns, values)

    transactionQueries.push({ query, id: node.id })
  }
  await commitTransaction()

  return queryResult.length
}

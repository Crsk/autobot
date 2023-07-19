import format from 'pg-format'
import runTransaction from '../../../database/runTransaction'

export const deleteNodes = async (idsToDelete: string[]): Promise<number | undefined> => {
  const transactionQueries: { query: string; id: string }[] = idsToDelete.map(idToDelete => ({
    query: format('DELETE FROM %I WHERE id = %L', 'node', idToDelete),
    id: idToDelete,
  }))
  const results = await runTransaction(transactionQueries)

  return results.length
}

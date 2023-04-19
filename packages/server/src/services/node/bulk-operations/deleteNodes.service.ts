import runTransaction from '../../../database/runTransaction'

export const deleteNodes = async (idsToDelete: string[]): Promise<number | undefined> => {
  const transactionQueries: { query: string, params: any[] }[] = idsToDelete.map((idToDelete) => ({
    query: 'DELETE FROM node WHERE id = ?',
    params: [idToDelete],
  }))
  const results = await runTransaction(transactionQueries)

  return results.length
}

import { PoolClient, QueryResult } from 'pg'
import withConnection from './withConnection'

export default async <T extends QueryResult>(queries: Array<{ query: string, id: string }>): Promise<T[]> => withConnection(async (client: PoolClient) => {
  try {
    await client.query('BEGIN')
    const results = await Promise.all(queries.map(({ query }) => client.query<T>(query)))
    console.log('results', results)
    await client.query('COMMIT')

    return results as T[]
  } catch (err) {
    console.error('Transaction error:', err)
    await client.query('ROLLBACK')
    throw err
  }
})

import { ResultSetHeader } from 'mysql2/promise'
import getPool from './getPool'

export default async <T extends ResultSetHeader>(queries: Array<{ query: string, params: any[] }>): Promise<T[]> => {
  const conn = await getPool().getConnection()

  try {
    conn.beginTransaction()
    const results = await Promise.all(queries.map(async ({ query, params }) => await conn.query<T>(query, params) as unknown as T[]))
    await conn.commit()
    const flattenedResults: T[] = ([] as T[]).concat(...results)

    return flattenedResults
  } catch (err) {
    console.error('Transaction error:', err)
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

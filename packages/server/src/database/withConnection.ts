import { PoolConnection } from 'mysql2/promise'
import getPool from './getPool'

export default async <T>(callback: (conn: PoolConnection) => Promise<T>): Promise<T> => {
  const conn = await getPool().getConnection()
  try {
    return await callback(conn)
  } finally {
    conn.release()
  }
}

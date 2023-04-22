import { PoolClient } from 'pg'
import getPool from './getPool'

export default async <T>(callback: (client: PoolClient) => Promise<T>): Promise<T> => {
  const client = await getPool().connect()
  const schema = process.env.DB_SCHEMA

  try {
    await client.query(`SET search_path TO ${schema}`, (err) => err && console.log('err', err))

    return await callback(client)
  } finally {
    client.release()
  }
}

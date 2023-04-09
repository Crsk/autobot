import { RowDataPacket } from 'mysql2'
import { Table } from './tables'
import withConnection from './withConnection'

export default async <T>(table: Table): Promise<T[]> => withConnection(async (conn) => {
  const [rows] = await conn.query<RowDataPacket[]>('SELECT * FROM ??', [table])

  return rows as T[]
})

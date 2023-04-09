import { RowDataPacket } from 'mysql2'
import { Table } from './tables'
import withConnection from './withConnection'

export default async <T>(table: Table, id: number | string): Promise<T[]> => withConnection(async (conn) => {
  const [rows] = await conn.query<RowDataPacket[]>('SELECT * FROM ?? WHERE ID = ?', [table, id])

  return rows as T[]
})

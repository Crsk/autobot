import { OkPacket } from 'mysql2'
import { Table } from './tables'
import withConnection from './withConnection'

export default async <T>(table: Table, row: Partial<T>): Promise<number> => withConnection(async (conn) => {
  const [result] = await conn.query<OkPacket>('INSERT INTO ?? SET ?', [table, row])

  return result.affectedRows
})

import { OkPacket } from 'mysql2'
import { Table } from './tables'
import withConnection from './withConnection'

export default async (table: Table, id: number | string): Promise<boolean> => withConnection(async (conn) => {
  const [result] = await conn.query<OkPacket>('DELETE FROM ?? WHERE id = ?', [table, id])

  return result.affectedRows > 0
})

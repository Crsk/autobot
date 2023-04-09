import { Table } from './tables'
import withConnection from './withConnection'

export default async <T>(table: Table, id: number | string, updates: Partial<T>): Promise<void> => withConnection(async (conn) => {
  conn.query('UPDATE ?? SET ? WHERE id = ?', [table, updates, id])
})

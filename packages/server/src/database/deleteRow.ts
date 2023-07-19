import { PoolClient } from 'pg'
import format from 'pg-format'
import { Table } from './tables'
import withConnection from './withConnection'

export default async (table: Table, id: number | string): Promise<boolean> =>
  withConnection(async (client: PoolClient) => {
    const query = format('DELETE FROM %I WHERE id = %L', table, id)
    const result = await client.query(query)

    return result.rowCount > 0
  })

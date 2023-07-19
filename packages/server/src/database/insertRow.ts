import { PoolClient } from 'pg'
import format from 'pg-format'
import { Table } from './tables'
import withConnection from './withConnection'

export default async <T>(table: Table, row: Partial<T>): Promise<number> =>
  withConnection(async (client: PoolClient) => {
    const columns = Object.keys(row)
    const values = Object.values(row)
    const query = format('INSERT INTO %I (%I) VALUES (%L)', table, columns, values)
    const { rowCount } = await client.query(query)

    return rowCount
  })

import { PoolClient, QueryResultRow } from 'pg'
import format from 'pg-format'
import { Table } from './tables'
import withConnection from './withConnection'

export default async <T extends QueryResultRow>(table: Table, id: number | string): Promise<T[]> =>
  withConnection(async (client: PoolClient) => {
    const query = format('SELECT * FROM %I WHERE id = %L', table, id)
    const { rows } = await client.query<T>(query)

    return rows
  })

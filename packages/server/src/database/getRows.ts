import { PoolClient, QueryResultRow } from 'pg'
import format from 'pg-format'
import { Table } from './tables'
import withConnection from './withConnection'

export default async <T extends QueryResultRow>(table: Table): Promise<T[]> => withConnection(async (client: PoolClient) => {
  const query = format('SELECT * FROM %I', table)
  const { rows } = await client.query<T>(query)

  return rows
})

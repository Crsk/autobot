import { PoolClient } from 'pg'
import format from 'pg-format'
import generateSetClause from 'shared/src/utils/backend/generateSetClause'
import { Table } from './tables'
import withConnection from './withConnection'

export default async <T>(table: Table, id: number | string, updates: Partial<T>): Promise<void> =>
  withConnection(async (client: PoolClient) => {
    const setArguments = generateSetClause(updates)
    const query = format('UPDATE %I SET %s WHERE id = %L', table, setArguments, id)
    client.query(query)
  })

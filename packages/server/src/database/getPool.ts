import { Pool } from 'pg'

let pool: Pool | null = null

export default () => {
  if (pool === null) {
    const { DB_HOST, DB_USER, DB_NAME, DB_PASS } = process.env
    pool = new Pool({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      port: 5432,
      password: DB_PASS,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  }

  return pool
}

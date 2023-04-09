import { createPool, Pool } from 'mysql2/promise'

let pool: Pool | null = null

export default () => {
  if (pool === null) {
    pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      connectionLimit: 10,
    })
  }

  return pool
}

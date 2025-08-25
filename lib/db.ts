import { Pool } from '@neondatabase/serverless'

// Create a connection pool for Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Create a connection function (for compatibility with existing API code)
export async function createConnection() {
  return pool
}

// Direct pool export for more efficient usage
export { pool }

// Helper function to execute queries
export async function executeQuery(query: string, params: unknown[] = []) {
  try {
    const result = await pool.query(query, params)
    return result.rows
  } catch (error) {
    console.error('Database query failed:', error)
    throw new Error('Database query failed')
  }
}
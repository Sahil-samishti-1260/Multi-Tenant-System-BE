import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const commonPool = new Pool({
  connectionString: process.env.MASTER_DB_URI,
});

commonPool.on('connect', () => {
  console.log('[CommonDB] Master Database connected successfully');
});

commonPool.on('error', (err) => {
  console.error('[CommonDB] Unexpected error on idle client', err);
  process.exit(-1);
});

// Test the connection immediately
commonPool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('[CommonDB] Master Database connection failed:', err.message);
  } else {
    console.log('[CommonDB] Master Database connection test successful');
  }
});


export const query = (text, params) => commonPool.query(text, params);
export const pool = commonPool;


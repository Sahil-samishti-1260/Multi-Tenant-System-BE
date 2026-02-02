import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const commonPool = new Pool({
  connectionString: process.env.MASTER_DB_URI,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

commonPool.on('connect', () => {
  console.log('Common Database connected successfully');
});

commonPool.on('error', (err) => {
  console.error('Unexpected error on idle client in Common DB', err);
  process.exit(-1);
});

export const query = (text, params) => commonPool.query(text, params);
export const pool = commonPool;


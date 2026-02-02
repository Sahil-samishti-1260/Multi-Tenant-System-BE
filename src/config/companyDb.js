import pg from 'pg';
const { Pool } = pg;

const companyPools = {};

export const getCompanyPool = (connectionString) => {

  if (companyPools[connectionString]) {
    console.log(`[CompanyDB] Reusing existing connection pool for: ${connectionString.split('@').pop()}`);
    return companyPools[connectionString];
  }

  console.log(`[CompanyDB] Creating NEW connection pool for: ${connectionString.split('@').pop()}`);
  const pool = new Pool({
    connectionString: connectionString,
    max: 20, // Increased pool size
    idleTimeoutMillis: 30000, // 30 seconds
    connectionTimeoutMillis: 2000, // 2 seconds
  });

  pool.on('connect', () => {
    console.log(`[CompanyDB] Connected to company database: ${connectionString.split('/').pop()}`);
  });

  pool.on('error', (err) => {
    console.error('[CompanyDB] Unexpected error on idle client', err);
    delete companyPools[connectionString]; // Remove broken pool
  });

  companyPools[connectionString] = pool;
  return pool;
};

export default {
  getCompanyPool,
};
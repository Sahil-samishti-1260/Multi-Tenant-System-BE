import pg from 'pg';
const { Pool } = pg;

const tenantPools = {};

export const getTenantPool = (connectionString) => {

  if (tenantPools[connectionString]) {
    return tenantPools[connectionString];
  }

  const pool = new Pool({
    connectionString: connectionString,
  });

  tenantPools[connectionString] = pool;
  return pool;
};

export default {
  getTenantPool,
};



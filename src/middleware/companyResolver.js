import * as commonDb from '../config/commonDb.js';
import companyDb from '../config/companyDb.js';
const { getCompanyPool } = companyDb;

const resolveCompany = async (req, res, next) => {

  const slug = (req.query.company || req.headers['x-company-slug'])?.trim();
  console.log(`[CompanyResolver] Resolving company for slug: "${slug}"`);

  if (!slug || slug === 'null' || slug === 'undefined') {
    return res.status(400).json({ error: 'Valid company slug is required' });
  }

  try {
    // Fetch company configuration from common Database
    const result = await commonDb.query(
      'SELECT tenant_id, tenant_name, slug, connection_uri FROM tenants WHERE slug = $1',
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const companyInfo = result.rows[0];
    console.log('[CompanyResolver] Company Info:', companyInfo);
    console.log(`[CompanyResolver] Found Company: ID=${companyInfo.tenant_id}, Name="${companyInfo.tenant_name}"`);
    console.log(`[CompanyResolver] Connection String: ${companyInfo.connection_uri}`);

    console.log(`[DatabaseSwitch] >>> Switching request context to Company DB: ${companyInfo.slug} <<<`);
    req.companyDb = getCompanyPool(companyInfo.connection_uri);
    req.companyInfo = companyInfo;

    next();
  } catch (error) {
    console.error('Error resolving company:', error);
    res.status(500).json({ error: 'Internal server error resolving tenant' });
  }
};


export default resolveCompany;


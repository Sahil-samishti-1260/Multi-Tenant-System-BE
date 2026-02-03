import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import commonRoutes from './routes/common.routes.js';
import companyRoutes from './routes/company.routes.js';
import resolveCompany from './middleware/companyResolver.js';

const app = express();

/////////////////////////////////////

app.use(cors());
app.use(express.json());

// Authentication routes (public)
app.use('/api/auth', authRoutes);

// Common routes (access common DB to list/get tenant info)
app.use('/api/companies', commonRoutes);

// Company-specific data routes (require company resolution and access tenant DB)
app.use('/api/company-data', companyRoutes);

// Tenant-specific routes example
app.use('/api/tenant', resolveCompany, (req, res) => {
  res.json({ message: `Accessing data for company ${req.companyInfo.tenant_name}` });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;

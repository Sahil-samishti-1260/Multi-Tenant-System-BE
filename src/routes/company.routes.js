import express from 'express';
const router = express.Router();
import * as companyDataController from '../controllers/company-data.controller.js';
import authenticate from '../middleware/authMiddleware.js';
import resolveCompany from '../middleware/companyResolver.js';

// All company routes require both company resolution and authentication
router.get('/top-customers', resolveCompany, authenticate, companyDataController.getTopCustomers);
router.get('/top-products', resolveCompany, authenticate, companyDataController.getTopProducts);

export default router;
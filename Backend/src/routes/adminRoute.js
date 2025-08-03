import express from 'express';

import adminController from '../controllers/adminController.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/session', authmiddleware, adminController.getAdminProfile);

router.post('/add-operator', authmiddleware, adminController.addOperator)
export default router;

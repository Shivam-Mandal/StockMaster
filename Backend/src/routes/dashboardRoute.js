import express from 'express';

import dashboardController from '../controllers/dashboardController.js';
import authmiddleware from '../middleware/authmiddleware.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/stats', authmiddleware,authorize('admin','operator'), dashboardController.getDashboardStats);


export default router;

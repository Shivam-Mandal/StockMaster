import express from 'express';

import adminController from '../controllers/adminController.js';
import authmiddleware from '../middleware/authmiddleware.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/session', authmiddleware,authorize('super-admin','admin','operator'), adminController.getAdminProfile);

router.post('/add-operator', authmiddleware,authorize('admin'), adminController.addOperator)
export default router;

import express from 'express';

import adminController from '../controllers/adminController.js';
import authmiddleware from '../middleware/authmiddleware.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/session', authmiddleware,authorize('super-admin','admin','operator'), adminController.getAdminProfile);


router.post('/add-operator', authmiddleware,authorize('admin'), adminController.addOperator);

router.get('/update-session', authmiddleware, adminController.updateSession);

router.get('/all-operators', authmiddleware, authorize('super-admin', 'admin'), adminController.getAllOperators);

router.post('/operator-info', authmiddleware, authorize('super-admin', 'admin'), adminController.getOperatorInfo);


router.get('/inactive-stores', authmiddleware, authorize('super-admin'), adminController.getInactiveStores);

router.post

export default router;


// send reuest to get store Active
// create a shchema to store reques and create notifications
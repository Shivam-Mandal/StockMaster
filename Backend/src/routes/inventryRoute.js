import express from 'express';

import inventryController from '../controllers/inventryController.js'
import authmiddleware from '../middleware/authmiddleware.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/category-list',authmiddleware,authorize('admin','operator'),inventryController.getCategories)
router.get('/product-list',authmiddleware,authorize('admin','operator'),inventryController.getAllProducts)
router.post('/add-product',authmiddleware,authorize('admin','operator'),inventryController.addProducts)


export default router;
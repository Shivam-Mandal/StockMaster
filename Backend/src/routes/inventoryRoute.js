import express from 'express';

import inventoryController from '../controllers/inventoryController.js'
import authmiddleware from '../middleware/authmiddleware.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/category-list',authmiddleware,authorize('admin','operator'),inventoryController.getCategories)
router.get('/product-list',authmiddleware,authorize('admin','operator'),inventoryController.getAllProducts)
router.post('/add-product',authmiddleware,authorize('admin','operator'),inventoryController.addProducts)


export default router;
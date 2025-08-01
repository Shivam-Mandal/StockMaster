import express from 'express';
import getAdminProfile from '../controllers/adminController.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/session', authmiddleware, getAdminProfile);

export default router;

import express from 'express';
import authController from '../controllers/authcontroller.js';
import authMiddleware from '../middleware/authmiddleware.js';
import authcontroller from '../controllers/authcontroller.js';

const router = express.Router();

// Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/change-password', authMiddleware, authController.changePassword);

export default router;

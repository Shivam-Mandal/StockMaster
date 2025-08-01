import express from 'express';
import authController from '../controllers/authcontroller.js';

const router = express.Router();

// Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;

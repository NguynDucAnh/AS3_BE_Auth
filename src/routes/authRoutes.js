import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', verifyAdmin, authController.getAllUsers);

export default router;
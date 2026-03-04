import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Auth endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);

// User endpoints
router.get('/users', verifyAdmin, authController.getAllUsers);
router.get('/users/:userId', authController.getUserById);
router.put('/users/:userId', verifyAdmin, authController.updateUser);
router.delete('/users/:userId', verifyAdmin, authController.deleteUser);

export default router;
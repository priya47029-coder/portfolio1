import { Router } from 'express';
import { login, getMe } from '../controllers/authController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/me', authenticateAdmin, getMe);

export default router;

import { Router } from 'express';
import { getDashboardStats } from '../controllers/statsController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateAdmin, getDashboardStats);

export default router;

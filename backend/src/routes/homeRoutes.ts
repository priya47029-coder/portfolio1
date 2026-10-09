import { Router } from 'express';
import { getHome, updateHome } from '../controllers/homeController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getHome);
router.put('/', authenticateAdmin, updateHome);

export default router;

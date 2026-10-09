import { Router } from 'express';
import { getNavbar, updateNavbar } from '../controllers/navbarController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getNavbar);
router.put('/', authenticateAdmin, updateNavbar);

export default router;

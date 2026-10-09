import { Router } from 'express';
import { getFooter, updateFooter } from '../controllers/footerController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getFooter);
router.put('/', authenticateAdmin, updateFooter);

export default router;

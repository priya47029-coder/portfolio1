import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAbout);
router.put('/', authenticateAdmin, updateAbout);

export default router;

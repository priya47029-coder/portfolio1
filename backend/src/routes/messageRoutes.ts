import { Router } from 'express';
import { getMessages, markMessageRead, deleteMessage } from '../controllers/messageController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateAdmin, getMessages);
router.put('/:id/read', authenticateAdmin, markMessageRead);
router.delete('/:id', authenticateAdmin, deleteMessage);

export default router;

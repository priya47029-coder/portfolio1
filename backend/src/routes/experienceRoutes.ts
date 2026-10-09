import { Router } from 'express';
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getExperience);

// Protected admin routes
router.post('/', authenticateAdmin, createExperience);
router.put('/:id', authenticateAdmin, updateExperience);
router.delete('/:id', authenticateAdmin, deleteExperience);

export default router;

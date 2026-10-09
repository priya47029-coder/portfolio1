import { Router } from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
} from '../controllers/certificationController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getCertifications);

// Protected admin routes
router.post('/', authenticateAdmin, createCertification);
router.put('/:id', authenticateAdmin, updateCertification);
router.delete('/:id', authenticateAdmin, deleteCertification);

export default router;

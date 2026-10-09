import { Router } from 'express';
import { getContactInfo, updateContactInfo } from '../controllers/contactInfoController';
import { submitContactMessage } from '../controllers/contactController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public route to get contact details
router.get('/', getContactInfo);

// Protected admin route to update contact details
router.put('/', authenticateAdmin, updateContactInfo);

// Public route to submit a contact message
router.post('/', submitContactMessage);

export default router;

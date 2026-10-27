import express from 'express';
import { getPestLogs, createPestLog, updatePestLog, deletePestLog } from '../controllers/pestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/plant/:plantId').get(protect, getPestLogs).post(protect, createPestLog);
router.route('/:id').put(protect, updatePestLog).delete(protect, deletePestLog);

export default router;

import express from 'express';
import { getGrowthLogs, createGrowthLog } from '../controllers/growthController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id/growth').get(protect, getGrowthLogs).post(protect, createGrowthLog);

export default router;

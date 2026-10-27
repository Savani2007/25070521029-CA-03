import express from 'express';
import { getFertilizerLogs, createFertilizerLog, deleteFertilizerLog } from '../controllers/fertilizerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/plant/:plantId').get(protect, getFertilizerLogs).post(protect, createFertilizerLog);
router.route('/:id').delete(protect, deleteFertilizerLog);

export default router;

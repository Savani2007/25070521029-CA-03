import express from 'express';
import {
  getPlants,
  createPlant,
  getPlant,
  updatePlant,
  deletePlant,
  waterPlant,
  getWateringReminders
} from '../controllers/plantController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getPlants).post(protect, createPlant);
router.route('/:id').get(protect, getPlant).put(protect, updatePlant).delete(protect, deletePlant);
router.route('/:id/water').post(protect, waterPlant);
router.route('/watering/reminders').get(protect, getWateringReminders);

export default router;

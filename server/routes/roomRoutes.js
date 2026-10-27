import express from 'express';
import { getRooms, createRoom, getRoomWithPlants, updateRoom, deleteRoom } from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getRooms).post(protect, createRoom);
router.route('/:id').get(protect, getRoomWithPlants).put(protect, updateRoom).delete(protect, deleteRoom);

export default router;

import express from 'express';
import { getGallery, addPhoto, deletePhoto } from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/plant/:plantId').get(protect, getGallery).post(protect, addPhoto);
router.route('/:id').delete(protect, deletePhoto);

export default router;

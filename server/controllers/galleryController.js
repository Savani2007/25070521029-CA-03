import PlantPhoto from '../models/PlantPhoto.js';
import Plant from '../models/Plant.js';

export const getGallery = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const photos = await PlantPhoto.find({ plantId: req.params.plantId }).sort({ takenAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPhoto = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const photo = await PlantPhoto.create({
      userId: req.user.id,
      plantId: req.params.plantId,
      ...req.body
    });
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const photo = await PlantPhoto.findById(req.params.id);
    if (!photo || photo.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await PlantPhoto.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import FertilizerLog from '../models/FertilizerLog.js';
import Plant from '../models/Plant.js';

export const getFertilizerLogs = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const logs = await FertilizerLog.find({ plantId: req.params.plantId }).sort({ appliedAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFertilizerLog = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const log = await FertilizerLog.create({
      userId: req.user.id,
      plantId: req.params.plantId,
      ...req.body
    });
    if (req.body.appliedAt) plant.lastFertilized = req.body.appliedAt;
    await plant.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFertilizerLog = async (req, res) => {
  try {
    const log = await FertilizerLog.findById(req.params.id);
    if (!log || log.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await FertilizerLog.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

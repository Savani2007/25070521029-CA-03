import GrowthLog from '../models/GrowthLog.js';
import Plant from '../models/Plant.js';
import { calculateHealthScore } from '../services/healthScoreService.js';

export const getGrowthLogs = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const growthLogs = await GrowthLog.find({ plantId: req.params.id }).sort({ observationDate: 1 });
    res.status(200).json(growthLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGrowthLog = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { observationDate, heightCm, leafCount, leafCondition, notes } = req.body;

    if (!heightCm || !leafCondition) {
      return res.status(400).json({ message: 'Please add height and leaf condition' });
    }

    const growthLog = await GrowthLog.create({
      userId: req.user.id,
      plantId: req.params.id,
      observationDate: observationDate ? new Date(observationDate) : new Date(),
      heightCm,
      leafCount: leafCount || 0,
      leafCondition,
      notes: notes || ''
    });

    plant.currentHeight = heightCm;
    await plant.save();

    const healthScore = await calculateHealthScore(plant._id);
    plant.healthScore = healthScore;
    await plant.save();

    res.status(201).json(growthLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

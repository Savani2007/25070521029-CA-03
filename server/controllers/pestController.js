import PestLog from '../models/PestLog.js';
import Plant from '../models/Plant.js';

export const getPestLogs = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const logs = await PestLog.find({ plantId: req.params.plantId }).sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPestLog = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant || plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const log = await PestLog.create({
      userId: req.user.id,
      plantId: req.params.plantId,
      ...req.body
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePestLog = async (req, res) => {
  try {
    const log = await PestLog.findById(req.params.id);
    if (!log || log.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (req.body.resolved && !log.resolved) {
      req.body.resolvedAt = new Date();
    }
    const updated = await PestLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePestLog = async (req, res) => {
  try {
    const log = await PestLog.findById(req.params.id);
    if (!log || log.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await PestLog.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

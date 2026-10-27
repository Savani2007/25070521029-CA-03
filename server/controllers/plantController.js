import Plant from '../models/Plant.js';
import GrowthLog from '../models/GrowthLog.js';
import WateringLog from '../models/WateringLog.js';
import { calculateNextWateringDate } from '../services/wateringService.js';
import { calculateHealthScore } from '../services/healthScoreService.js';

export const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlant = async (req, res) => {
  try {
    const {
      name,
      species,
      imageUrl,
      location,
      dateAdded,
      lastWatered,
      wateringIntervalDays,
      sunlightRequirement,
      currentHeight,
      notes
    } = req.body;

    if (!name || !species || !location || !wateringIntervalDays || !sunlightRequirement) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const lastWateredDate = lastWatered ? new Date(lastWatered) : new Date();
    const nextWateringDate = calculateNextWateringDate(lastWateredDate, wateringIntervalDays);

    const plant = await Plant.create({
      userId: req.user.id,
      name,
      species,
      imageUrl: imageUrl || '',
      location,
      dateAdded: dateAdded ? new Date(dateAdded) : new Date(),
      lastWatered: lastWateredDate,
      wateringIntervalDays,
      nextWateringDate,
      sunlightRequirement,
      currentHeight: currentHeight || 0,
      notes: notes || '',
      healthScore: 70
    });

    const healthScore = await calculateHealthScore(plant._id);
    plant.healthScore = healthScore;
    await plant.save();

    res.status(201).json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    if (req.body.lastWatered || req.body.wateringIntervalDays) {
      const lastWateredDate = req.body.lastWatered ? new Date(req.body.lastWatered) : plant.lastWatered;
      const interval = req.body.wateringIntervalDays || plant.wateringIntervalDays;
      req.body.nextWateringDate = calculateNextWateringDate(lastWateredDate, interval);
    }

    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    const healthScore = await calculateHealthScore(updatedPlant._id);
    updatedPlant.healthScore = healthScore;
    await updatedPlant.save();

    res.status(200).json(updatedPlant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Plant.findByIdAndDelete(req.params.id);
    await GrowthLog.deleteMany({ plantId: req.params.id });
    await WateringLog.deleteMany({ plantId: req.params.id });

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const waterPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (plant.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const wateredAt = new Date();
    plant.lastWatered = wateredAt;
    plant.nextWateringDate = calculateNextWateringDate(wateredAt, plant.wateringIntervalDays);
    await plant.save();

    await WateringLog.create({
      userId: req.user.id,
      plantId: plant._id,
      wateredAt,
      notes: req.body.notes || ''
    });

    const healthScore = await calculateHealthScore(plant._id);
    plant.healthScore = healthScore;
    await plant.save();

    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWateringReminders = async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.user.id });
    const now = new Date();
    const reminders = [];

    plants.forEach(plant => {
      const nextWatering = new Date(plant.nextWateringDate);
      const diffTime = nextWatering - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      reminders.push({
        plant,
        diffDays,
        status: diffDays < 0 ? 'Overdue' : diffDays === 0 ? 'Water Today' : diffDays === 1 ? 'Water Soon' : diffDays <= 3 ? 'Water Soon' : 'Upcoming'
      });
    });

    reminders.sort((a, b) => a.diffDays - b.diffDays);
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

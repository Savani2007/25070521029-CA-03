import Plant from '../models/Plant.js';
import { getWateringStatus } from '../services/wateringService.js';

export const getDashboardStats = async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.user.id });
    const totalPlants = plants.length;

    let plantsNeedingWater = 0;
    let upcomingReminders = 0;
    let totalHealth = 0;

    plants.forEach(plant => {
      const { status } = getWateringStatus(plant.nextWateringDate);
      if (status === 'Water Today' || status === 'Overdue') {
        plantsNeedingWater++;
      }
      if (status === 'Water Today' || status === 'Water Soon' || status === 'Overdue') {
        upcomingReminders++;
      }
      totalHealth += plant.healthScore || 0;
    });

    const averageHealth = totalPlants > 0 ? Math.round(totalHealth / totalPlants) : 0;

    res.status(200).json({
      totalPlants,
      plantsNeedingWater,
      upcomingReminders,
      averageHealth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

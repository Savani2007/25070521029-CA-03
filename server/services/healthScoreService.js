import Plant from '../models/Plant.js';
import GrowthLog from '../models/GrowthLog.js';

export const calculateHealthScore = async (plantId) => {
  const plant = await Plant.findById(plantId);
  if (!plant) return 70;

  let score = 0;

  // Get latest growth log
  const latestGrowth = await GrowthLog.findOne({ plantId }).sort({ observationDate: -1 });
  
  // A. Leaf condition (40 points)
  if (latestGrowth) {
    if (latestGrowth.leafCondition === 'Healthy') score += 40;
    else if (latestGrowth.leafCondition === 'Yellowing' || latestGrowth.leafCondition === 'Brown edges') score += 25;
    else if (latestGrowth.leafCondition === 'Wilting') score += 15;
    else if (latestGrowth.leafCondition === 'Pest damage') score += 5;
    else score += 25;
  } else {
    score += 10; // No observations
  }

  // B. Watering condition (30 points)
  const now = new Date();
  const nextWatering = new Date(plant.nextWateringDate);
  const diffDays = Math.ceil((nextWatering - now) / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1) score += 30;
  else if (diffDays === 0 || diffDays === 1) score += 20;
  else if (diffDays < 0 && diffDays >= -3) score += 10;
  else score += 0;

  // C. Growth condition (20 points)
  const growthLogs = await GrowthLog.find({ plantId }).sort({ observationDate: 1 });
  if (growthLogs.length >= 2) {
    const first = growthLogs[0];
    const last = growthLogs[growthLogs.length - 1];
    if (last.heightCm > first.heightCm) score += 20;
    else if (last.heightCm === first.heightCm) score += 12;
    else score += 5;
  } else if (growthLogs.length === 1) {
    score += 12;
  } else {
    score += 10;
  }

  // D. Care information completeness (10 points)
  let completeness = 0;
  if (plant.name) completeness += 2;
  if (plant.species) completeness += 2;
  if (plant.location) completeness += 2;
  if (plant.wateringIntervalDays) completeness += 2;
  if (plant.sunlightRequirement) completeness += 2;
  
  if (completeness >= 8) score += 10;
  else if (completeness >= 4) score += 5;
  else score += 0;

  return Math.max(0, Math.min(100, score));
};

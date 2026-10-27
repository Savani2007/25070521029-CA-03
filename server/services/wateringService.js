export const getWateringStatus = (nextWateringDate) => {
  const now = new Date();
  const next = new Date(nextWateringDate);
  const diffTime = next - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return { status: 'Overdue', color: 'red' };
  if (diffDays === 0) return { status: 'Water Today', color: 'orange' };
  if (diffDays === 1) return { status: 'Water Soon', color: 'yellow' };
  if (diffDays <= 3) return { status: 'Water Soon', color: 'yellow' };
  return { status: 'Recently Watered', color: 'green' };
};

export const calculateNextWateringDate = (lastWateredDate, intervalDays) => {
  const nextDate = new Date(lastWateredDate);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  return nextDate;
};

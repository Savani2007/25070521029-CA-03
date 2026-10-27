const PlantCard = ({ plant, onWater, onDelete }) => {
  const getStatusColor = (score) => {
    if (score >= 80) return '#00b894';
    if (score >= 60) return '#00cec9';
    if (score >= 40) return '#fdcb6e';
    return '#d63031';
  };

  const getWateringStatus = (nextWateringDate) => {
    const now = new Date();
    const next = new Date(nextWateringDate);
    const diffDays = Math.ceil((next - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: '#d63031' };
    if (diffDays === 0) return { text: 'Water Today', color: '#e17055' };
    if (diffDays === 1) return { text: 'Water Soon', color: '#fdcb6e' };
    return { text: 'OK', color: '#00b894' };
  };

  const status = getWateringStatus(plant.nextWateringDate);
  const healthColor = getStatusColor(plant.healthScore);

  return (
    <div className="card plant-card">
      <div className="plant-image">
        {plant.imageUrl ? (
          <img src={plant.imageUrl} alt={plant.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'; }} />
        ) : (
          <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" alt={plant.name} />
        )}
      </div>
      <div className="plant-info">
        <h3>{plant.name}</h3>
        <p className="plant-species">{plant.species}</p>
        <p>📍 {plant.location}</p>
        <p>💧 Last: {new Date(plant.lastWatered).toLocaleDateString()}</p>
        <p>📅 Next: {new Date(plant.nextWateringDate).toLocaleDateString()}</p>
        <div className="plant-badges">
          <span className="badge" style={{ backgroundColor: healthColor }}>
            Health: {plant.healthScore}/100
          </span>
          <span className="badge" style={{ backgroundColor: status.color }}>
            {status.text}
          </span>
        </div>
        <div className="plant-actions">
          <button onClick={() => onWater(plant._id)} className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            Mark as Watered
          </button>
          <button onClick={() => onDelete(plant._id)} className="btn btn-danger" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;

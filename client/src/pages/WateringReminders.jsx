import { useState, useEffect } from 'react';
import { plantService } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import PlantImage from '../components/PlantImage';
import { getPlantImage } from '../utils/plantImages';
import './WateringReminders.css';

const WateringReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [watering, setWatering] = useState(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await plantService.getWateringReminders();
      setReminders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWater = async (plantId) => {
    setWatering(plantId);
    try {
      await plantService.waterPlant(plantId);
      await fetchReminders();
      alert('Plant watered successfully! 💧');
    } catch (error) {
      alert('Error watering plant');
    } finally {
      setWatering(null);
    }
  };

  const getStatusInfo = (status, diffDays) => {
    if (status === 'Overdue') return { color: '#dc2626', bg: '#fef2f2', text: `Overdue by ${Math.abs(diffDays)} days` };
    if (status === 'Water Today') return { color: '#ea580c', bg: '#fff7ed', text: 'Water Today' };
    if (status === 'Water Soon') return { color: '#d97706', bg: '#fffbeb', text: `In ${diffDays} day${diffDays === 1 ? '' : 's'}` };
    return { color: '#059669', bg: '#f0fdf4', text: `In ${diffDays} day${diffDays === 1 ? '' : 's'}` };
  };

  const filteredReminders = reminders.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'overdue') return r.status === 'Overdue';
    if (filter === 'today') return r.status === 'Water Today';
    if (filter === 'upcoming') return r.status === 'Water Soon' || r.status === 'Upcoming';
    return true;
  });

  const groupedReminders = {
    overdue: filteredReminders.filter(r => r.status === 'Overdue'),
    today: filteredReminders.filter(r => r.status === 'Water Today'),
    upcoming: filteredReminders.filter(r => r.status === 'Water Soon' || r.status === 'Upcoming')
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Loading watering schedule...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="watering-page">
        <div className="watering-header">
          <div>
            <h1 className="watering-title">Watering Schedule</h1>
            <p className="watering-subtitle">Keep your plants happy and hydrated</p>
          </div>
          <div className="watering-filters">
            <button onClick={() => setFilter('all')} className={`filter-chip ${filter === 'all' ? 'active' : ''}`}>
              All ({reminders.length})
            </button>
            <button onClick={() => setFilter('overdue')} className={`filter-chip ${filter === 'overdue' ? 'active' : ''}`}>
              Overdue ({groupedReminders.overdue.length})
            </button>
            <button onClick={() => setFilter('today')} className={`filter-chip ${filter === 'today' ? 'active' : ''}`}>
              Today ({groupedReminders.today.length})
            </button>
            <button onClick={() => setFilter('upcoming')} className={`filter-chip ${filter === 'upcoming' ? 'active' : ''}`}>
              Upcoming ({groupedReminders.upcoming.length})
            </button>
          </div>
        </div>

        {reminders.length === 0 ? (
          <div className="empty-watering">
            <div className="empty-icon">💧</div>
            <h3>All caught up!</h3>
            <p>No plants need watering right now. Your plants are well taken care of!</p>
          </div>
        ) : (
          <div className="watering-sections">
            {groupedReminders.overdue.length > 0 && (filter === 'all' || filter === 'overdue') && (
              <section className="watering-section">
                <h2 className="section-heading overdue">🚨 Overdue</h2>
                <div className="watering-cards">
                  {groupedReminders.overdue.map((reminder, index) => {
                    const statusInfo = getStatusInfo(reminder.status, reminder.diffDays);
                    const plantImg = reminder.plant.imageUrl || getPlantImage(reminder.plant.species);
                    return (
                      <div key={index} className="watering-card overdue-card">
                        <PlantImage src={plantImg} alt={reminder.plant.name} className="watering-card-img" />
                        <div className="watering-card-content">
                          <div className="watering-card-header">
                            <div>
                              <h3>{reminder.plant.name}</h3>
                              <p className="plant-species">{reminder.plant.species}</p>
                            </div>
                            <span className="status-badge" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                              {statusInfo.text}
                            </span>
                          </div>
                          <div className="watering-card-details">
                            <div className="detail-item">
                              <span className="detail-label">Last Watered</span>
                              <span className="detail-value">{new Date(reminder.plant.lastWatered).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Next Watering</span>
                              <span className="detail-value">{new Date(reminder.plant.nextWateringDate).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Location</span>
                              <span className="detail-value">📍 {reminder.plant.location}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleWater(reminder.plant._id)} 
                            className="btn btn-danger watering-btn"
                            disabled={watering === reminder.plant._id}
                          >
                            {watering === reminder.plant._id ? 'Watering...' : '💧 Water Now'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {groupedReminders.today.length > 0 && (filter === 'all' || filter === 'today') && (
              <section className="watering-section">
                <h2 className="section-heading today">💧 Water Today</h2>
                <div className="watering-cards">
                  {groupedReminders.today.map((reminder, index) => {
                    const statusInfo = getStatusInfo(reminder.status, reminder.diffDays);
                    const plantImg = reminder.plant.imageUrl || getPlantImage(reminder.plant.species);
                    return (
                      <div key={index} className="watering-card today-card">
                        <PlantImage src={plantImg} alt={reminder.plant.name} className="watering-card-img" />
                        <div className="watering-card-content">
                          <div className="watering-card-header">
                            <div>
                              <h3>{reminder.plant.name}</h3>
                              <p className="plant-species">{reminder.plant.species}</p>
                            </div>
                            <span className="status-badge" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                              {statusInfo.text}
                            </span>
                          </div>
                          <div className="watering-card-details">
                            <div className="detail-item">
                              <span className="detail-label">Last Watered</span>
                              <span className="detail-value">{new Date(reminder.plant.lastWatered).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Location</span>
                              <span className="detail-value">📍 {reminder.plant.location}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleWater(reminder.plant._id)} 
                            className="btn btn-primary watering-btn"
                            disabled={watering === reminder.plant._id}
                          >
                            {watering === reminder.plant._id ? 'Watering...' : '💧 Water Now'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {groupedReminders.upcoming.length > 0 && (filter === 'all' || filter === 'upcoming') && (
              <section className="watering-section">
                <h2 className="section-heading upcoming">📅 Coming Up</h2>
                <div className="watering-cards">
                  {groupedReminders.upcoming.map((reminder, index) => {
                    const statusInfo = getStatusInfo(reminder.status, reminder.diffDays);
                    const plantImg = reminder.plant.imageUrl || getPlantImage(reminder.plant.species);
                    return (
                      <div key={index} className="watering-card">
                        <PlantImage src={plantImg} alt={reminder.plant.name} className="watering-card-img" />
                        <div className="watering-card-content">
                          <div className="watering-card-header">
                            <div>
                              <h3>{reminder.plant.name}</h3>
                              <p className="plant-species">{reminder.plant.species}</p>
                            </div>
                            <span className="status-badge" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                              {statusInfo.text}
                            </span>
                          </div>
                          <div className="watering-card-details">
                            <div className="detail-item">
                              <span className="detail-label">Last Watered</span>
                              <span className="detail-value">{new Date(reminder.plant.lastWatered).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Location</span>
                              <span className="detail-value">📍 {reminder.plant.location}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleWater(reminder.plant._id)} 
                            className="btn btn-secondary watering-btn"
                            disabled={watering === reminder.plant._id}
                          >
                            {watering === reminder.plant._id ? 'Watering...' : '💧 Mark as Watered'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WateringReminders;

import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { plantService, dashboardService } from '../services/api';
import PlantImage from '../components/PlantImage';
import { getPlantImage } from '../utils/plantImages';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardNew.css';

const DashboardNew = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState([]);
  const [stats, setStats] = useState({
    totalPlants: 0,
    plantsNeedingWater: 0,
    upcomingReminders: 0,
    averageHealth: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plantsRes, statsRes] = await Promise.all([
        plantService.getAllPlants(),
        dashboardService.getStats()
      ]);
      setPlants(plantsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWater = async (plantId) => {
    try {
      await plantService.waterPlant(plantId);
      fetchData();
      alert('Plant watered successfully! 💧');
    } catch (error) {
      alert('Error watering plant');
    }
  };

  const getFilteredPlants = () => {
    let filtered = plants;

    if (searchTerm) {
      filtered = filtered.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === 'healthy') {
      filtered = filtered.filter(plant => plant.healthScore >= 80);
    } else if (filter === 'attention') {
      filtered = filtered.filter(plant => plant.healthScore >= 40 && plant.healthScore < 80);
    } else if (filter === 'needWater') {
      filtered = filtered.filter(plant => {
        const now = new Date();
        const next = new Date(plant.nextWateringDate);
        const diffDays = Math.ceil((next - now) / (1000 * 60 * 60 * 24));
        return diffDays <= 1;
      });
    }

    return filtered;
  };

  const getWateringStatus = (nextWateringDate) => {
    const now = new Date();
    const next = new Date(nextWateringDate);
    const diffDays = Math.ceil((next - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: '#dc2626', bg: '#fef2f2' };
    if (diffDays === 0) return { text: 'Water Today', color: '#ea580c', bg: '#fff7ed' };
    if (diffDays === 1) return { text: 'Water Soon', color: '#d97706', bg: '#fffbeb' };
    return { text: 'On Track', color: '#059669', bg: '#f0fdf4' };
  };

  const getHealthStatus = (score) => {
    if (score >= 80) return { text: 'Thriving', color: '#059669' };
    if (score >= 60) return { text: 'Doing Well', color: '#0d9488' };
    if (score >= 40) return { text: 'Needs Attention', color: '#d97706' };
    return { text: 'Critical', color: '#dc2626' };
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Loading your green world...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-new">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">Your little green world.</h2>
              <p className="hero-subtitle">Every plant has a story. Let's help yours grow.</p>
              <p className="hero-motivation">Small moments of care create beautiful growth.</p>
              <div className="hero-actions">
                <Link to="/add-plant" className="btn btn-primary hero-btn">
                  <span>+</span>
                  <span>Add a Plant</span>
                </Link>
                <Link to="/plant-care-guide" className="btn btn-ghost hero-btn">
                  <span>📚</span>
                  <span>Explore Plant Care</span>
                </Link>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="hero-image-bg"></div>
              <PlantImage 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=500&fit=crop"
                alt="Beautiful indoor plants"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card stat-card-1">
              <div className="stat-icon">🌱</div>
              <div className="stat-info">
                <div className="stat-number">{stats.totalPlants}</div>
                <div className="stat-label">My Plants</div>
              </div>
            </div>
            <div className="stat-card stat-card-2">
              <div className="stat-icon">💧</div>
              <div className="stat-info">
                <div className="stat-number">{stats.plantsNeedingWater}</div>
                <div className="stat-label">Water Today</div>
              </div>
            </div>
            <div className="stat-card stat-card-3">
              <div className="stat-icon">✨</div>
              <div className="stat-info">
                <div className="stat-number">{plants.filter(p => p.healthScore >= 80).length}</div>
                <div className="stat-label">Thriving Plants</div>
              </div>
            </div>
            <div className="stat-card stat-card-4">
              <div className="stat-icon">❤️</div>
              <div className="stat-info">
                <div className="stat-number">{stats.averageHealth}%</div>
                <div className="stat-label">Average Health</div>
              </div>
            </div>
          </div>
        </section>

        {/* Plant Collection */}
        <section className="collection-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">My Green Corner</h2>
              <p className="section-subtitle">Your plants are growing, one little step at a time.</p>
            </div>
            <div className="collection-controls">
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
                <option value="all">All Plants</option>
                <option value="healthy">Healthy</option>
                <option value="attention">Needs Attention</option>
                <option value="needWater">Needs Water</option>
              </select>
            </div>
          </div>

          {getFilteredPlants().length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">🌿</div>
              <h3>Your green journey begins here</h3>
              <p>Add your first plant and start caring for your little green world!</p>
              <Link to="/add-plant" className="btn btn-primary">
                <span>+</span>
                <span>Add Your First Plant</span>
              </Link>
            </div>
          ) : (
            <div className="plants-grid">
              {getFilteredPlants().map((plant) => {
                const waterStatus = getWateringStatus(plant.nextWateringDate);
                const healthStatus = getHealthStatus(plant.healthScore);
                const plantImg = plant.imageUrl || getPlantImage(plant.species);
                
                return (
                  <div key={plant._id} className="plant-card-new">
                    <div className="plant-card-image-container">
                      <PlantImage 
                        src={plantImg}
                        alt={plant.name}
                        className="plant-card-image"
                      />
                      <div className="plant-card-overlay">
                        <Link to={`/plants/${plant._id}`} className="view-details-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                    <div className="plant-card-content">
                      <div className="plant-card-header">
                        <div>
                          <h3 className="plant-card-name">{plant.name}</h3>
                          <p className="plant-card-species">{plant.species}</p>
                        </div>
                      </div>
                      <div className="plant-card-location">📍 {plant.location}</div>
                      <div className="plant-card-badges">
                        <span 
                          className="health-badge"
                          style={{ color: healthStatus.color }}
                        >
                          ❤️ {plant.healthScore}/100 • {healthStatus.text}
                        </span>
                      </div>
                      <div className="plant-card-watering">
                        <div className="watering-info">
                          <span className="watering-label">Next Watering</span>
                          <span className="watering-date">
                            {new Date(plant.nextWateringDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <span 
                          className="watering-status-badge"
                          style={{ color: waterStatus.color, background: waterStatus.bg }}
                        >
                          {waterStatus.text}
                        </span>
                      </div>
                      <div className="plant-card-actions">
                        <button onClick={() => handleWater(plant._id)} className="btn btn-primary btn-sm">
                          💧 Water Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNew;

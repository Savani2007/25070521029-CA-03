import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { plantService, dashboardService } from '../services/api';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import PlantCard from '../components/PlantCard';
import './Dashboard.css';

const Dashboard = () => {
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
      alert('Plant watered successfully!');
    } catch (error) {
      alert('Error watering plant');
    }
  };

  const handleDelete = async (plantId) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await plantService.deletePlant(plantId);
        fetchData();
      } catch (error) {
        alert('Error deleting plant');
      }
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

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Your plants, your care routine, your little green world.</p>
        </div>

        <div className="stats-grid">
          <StatCard title="Total Plants" value={stats.totalPlants} icon="🌱" />
          <StatCard title="Plants Needing Water" value={stats.plantsNeedingWater} icon="💧" />
          <StatCard title="Upcoming Watering Reminders" value={stats.upcomingReminders} icon="⏰" />
          <StatCard title="Average Plant Health" value={`${stats.averageHealth}%`} icon="❤️" />
        </div>

        <div className="plants-section">
          <div className="section-header">
            <h2>My Plant Collection</h2>
            <div className="filters">
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '200px', marginBottom: 0 }}
              />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 'auto', marginBottom: 0 }}>
                <option value="all">All Plants</option>
                <option value="healthy">Healthy Plants</option>
                <option value="attention">Needs Attention</option>
                <option value="needWater">Needs Water</option>
              </select>
            </div>
          </div>

          {getFilteredPlants().length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No plants found</h3>
              <p>Start by adding your first plant!</p>
            </div>
          ) : (
            <div className="plants-grid">
              {getFilteredPlants().map(plant => (
                <PlantCard 
                  key={plant._id} 
                  plant={plant} 
                  onWater={handleWater}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

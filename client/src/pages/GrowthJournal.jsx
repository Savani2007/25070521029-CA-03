import DashboardLayout from '../components/DashboardLayout';
import { plantService } from '../services/api';
import PlantImage from '../components/PlantImage';
import { getPlantImage } from '../utils/plantImages';
import { useState, useEffect } from 'react';
import './GrowthJournal.css';

const GrowthJournal = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [growthLogs, setGrowthLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    observationDate: new Date().toISOString().split('T')[0],
    heightCm: '',
    leafCount: '',
    leafCondition: 'Healthy',
    notes: ''
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    if (selectedPlant) {
      fetchGrowthLogs(selectedPlant._id);
    }
  }, [selectedPlant]);

  const fetchPlants = async () => {
    try {
      const res = await plantService.getAllPlants();
      setPlants(res.data);
      if (res.data.length > 0) {
        setSelectedPlant(res.data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGrowthLogs = async (plantId) => {
    try {
      const res = await import('../services/api').then(m => m.growthService.getGrowthLogs(plantId));
      setGrowthLogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { growthService } = await import('../services/api');
      await growthService.createGrowthLog(selectedPlant._id, {
        ...formData,
        heightCm: Number(formData.heightCm),
        leafCount: Number(formData.leafCount) || 0
      });
      setShowForm(false);
      setFormData({
        observationDate: new Date().toISOString().split('T')[0],
        heightCm: '',
        leafCount: '',
        leafCondition: 'Healthy',
        notes: ''
      });
      fetchGrowthLogs(selectedPlant._id);
      fetchPlants();
      alert('Growth record added! 📈');
    } catch (error) {
      alert('Error adding growth record');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Loading growth journal...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="growth-journal">
        <div className="journal-header">
          <div>
            <h1 className="journal-title">My Growth Journal</h1>
            <p className="journal-subtitle">Every new leaf tells a story.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            <span>📈</span>
            <span>Record Growth</span>
          </button>
        </div>

        {plants.length === 0 ? (
          <div className="empty-journal">
            <div className="empty-icon">🌱</div>
            <h3>No plants yet</h3>
            <p>Add your first plant to start tracking its growth journey!</p>
          </div>
        ) : (
          <>
            <div className="plant-selector">
              {plants.map(plant => (
                <button
                  key={plant._id}
                  onClick={() => setSelectedPlant(plant)}
                  className={`plant-select-btn ${selectedPlant?._id === plant._id ? 'active' : ''}`}
                >
                  <PlantImage 
                    src={plant.imageUrl || getPlantImage(plant.species)}
                    alt={plant.name}
                    className="plant-select-img"
                  />
                  <div>
                    <div className="plant-select-name">{plant.name}</div>
                    <div className="plant-select-species">{plant.species}</div>
                  </div>
                </button>
              ))}
            </div>

            {showForm && (
              <div className="growth-form-card">
                <h3>Record New Growth Observation</h3>
                <form onSubmit={handleSubmit} className="growth-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Observation Date</label>
                      <input type="date" value={formData.observationDate} onChange={(e) => setFormData({...formData, observationDate: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Height (cm)</label>
                      <input type="number" step="0.1" value={formData.heightCm} onChange={(e) => setFormData({...formData, heightCm: e.target.value})} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Leaf Count</label>
                      <input type="number" value={formData.leafCount} onChange={(e) => setFormData({...formData, leafCount: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Leaf Condition</label>
                      <select value={formData.leafCondition} onChange={(e) => setFormData({...formData, leafCondition: e.target.value})}>
                        <option value="Healthy">Healthy</option>
                        <option value="Yellowing">Yellowing</option>
                        <option value="Wilting">Wilting</option>
                        <option value="Brown edges">Brown edges</option>
                        <option value="Pest damage">Pest damage</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows="3"></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Save Record</button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="timeline-section">
              <h2>Growth Timeline</h2>
              {growthLogs.length === 0 ? (
                <div className="empty-timeline">
                  <p>No growth records yet. Start tracking to see your plant's progress!</p>
                </div>
              ) : (
                <div className="timeline">
                  {growthLogs.map((log, index) => (
                    <div key={log._id} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <h4>{new Date(log.observationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
                          <span className="timeline-height">{log.heightCm} cm</span>
                        </div>
                        <div className="timeline-details">
                          <span>🍃 {log.leafCount || 0} leaves • {log.leafCondition}</span>
                        </div>
                        {log.notes && <p className="timeline-notes">{log.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GrowthJournal;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plantService, growthService } from '../services/api';
import Navbar from '../components/Navbar';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [growthLogs, setGrowthLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGrowthForm, setShowGrowthForm] = useState(false);
  const [growthForm, setGrowthForm] = useState({
    observationDate: new Date().toISOString().split('T')[0],
    heightCm: '',
    leafCount: '',
    leafCondition: 'Healthy',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [plantRes, growthRes] = await Promise.all([
        plantService.getPlant(id),
        growthService.getGrowthLogs(id)
      ]);
      setPlant(plantRes.data);
      setGrowthLogs(growthRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrowthSubmit = async (e) => {
    e.preventDefault();
    try {
      await growthService.createGrowthLog(id, {
        ...growthForm,
        heightCm: Number(growthForm.heightCm),
        leafCount: Number(growthForm.leafCount) || 0
      });
      setShowGrowthForm(false);
      setGrowthForm({
        observationDate: new Date().toISOString().split('T')[0],
        heightCm: '',
        leafCount: '',
        leafCondition: 'Healthy',
        notes: ''
      });
      fetchData();
      alert('Growth record added!');
    } catch (error) {
      alert('Error adding growth record');
    }
  };

  const getHealthStatus = (score) => {
    if (score >= 80) return 'Healthy';
    if (score >= 60) return 'Doing Well';
    if (score >= 40) return 'Needs Attention';
    return 'Critical Attention';
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!plant) return <div className="loading">Plant not found</div>;

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
          ← Back to Dashboard
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
              <img 
                src={plant.imageUrl || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'} 
                alt={plant.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'; }}
              />
              <div>
                <h2 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>{plant.name}</h2>
                <p style={{ fontStyle: 'italic', color: 'var(--text-light)', marginBottom: '1rem' }}>{plant.species}</p>
                <p><strong>Location:</strong> {plant.location}</p>
                <p><strong>Sunlight:</strong> {plant.sunlightRequirement}</p>
                <p><strong>Current Height:</strong> {plant.currentHeight} cm</p>
                <p><strong>Date Added:</strong> {new Date(plant.dateAdded).toLocaleDateString()}</p>
                <p><strong>Notes:</strong> {plant.notes || 'None'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--primary-green)', marginBottom: '1rem' }}>Health Score</h3>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: plant.healthScore >= 80 ? '#00b894' : plant.healthScore >= 60 ? '#00cec9' : plant.healthScore >= 40 ? '#fdcb6e' : '#d63031' }}>
                {plant.healthScore}/100
              </div>
              <p style={{ fontWeight: '600' }}>{getHealthStatus(plant.healthScore)}</p>
            </div>
            <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '10px', height: '10px' }}>
              <div style={{ 
                width: `${plant.healthScore}%`, 
                backgroundColor: plant.healthScore >= 80 ? '#00b894' : plant.healthScore >= 60 ? '#00cec9' : plant.healthScore >= 40 ? '#fdcb6e' : '#d63031',
                height: '10px',
                borderRadius: '10px'
              }}></div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--primary-green)' }}>Growth History</h3>
            <button onClick={() => setShowGrowthForm(!showGrowthForm)} className="btn btn-primary">
              {showGrowthForm ? 'Cancel' : 'Record Growth'}
            </button>
          </div>

          {showGrowthForm && (
            <form onSubmit={handleGrowthSubmit} style={{ background: 'var(--cream-bg)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Observation Date *</label>
                  <input type="date" value={growthForm.observationDate} onChange={(e) => setGrowthForm({...growthForm, observationDate: e.target.value})} required />
                </div>
                <div>
                  <label>Height (cm) *</label>
                  <input type="number" value={growthForm.heightCm} onChange={(e) => setGrowthForm({...growthForm, heightCm: e.target.value})} required min="0" step="0.1" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Leaf Count</label>
                  <input type="number" value={growthForm.leafCount} onChange={(e) => setGrowthForm({...growthForm, leafCount: e.target.value})} min="0" />
                </div>
                <div>
                  <label>Leaf Condition *</label>
                  <select value={growthForm.leafCondition} onChange={(e) => setGrowthForm({...growthForm, leafCondition: e.target.value})} required>
                    <option value="Healthy">Healthy</option>
                    <option value="Yellowing">Yellowing</option>
                    <option value="Wilting">Wilting</option>
                    <option value="Brown edges">Brown edges</option>
                    <option value="Pest damage">Pest damage</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Notes</label>
                <textarea value={growthForm.notes} onChange={(e) => setGrowthForm({...growthForm, notes: e.target.value})} rows="2"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Save Record</button>
            </form>
          )}

          {growthLogs.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>No growth records yet</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--cream-bg)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Height (cm)</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Leaves</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Condition</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {growthLogs.map(log => (
                    <tr key={log._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem' }}>{new Date(log.observationDate).toLocaleDateString()}</td>
                      <td style={{ padding: '0.75rem' }}>{log.heightCm}</td>
                      <td style={{ padding: '0.75rem' }}>{log.leafCount || '-'}</td>
                      <td style={{ padding: '0.75rem' }}>{log.leafCondition}</td>
                      <td style={{ padding: '0.75rem' }}>{log.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlantDetails;

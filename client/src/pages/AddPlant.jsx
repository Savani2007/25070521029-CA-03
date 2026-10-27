import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { plantService } from '../services/api';
import Navbar from '../components/Navbar';

const AddPlant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    imageUrl: '',
    location: '',
    dateAdded: new Date().toISOString().split('T')[0],
    lastWatered: new Date().toISOString().split('T')[0],
    wateringIntervalDays: '',
    sunlightRequirement: '',
    currentHeight: '',
    notes: ''
  });

  const speciesOptions = [
    'Aloe Vera',
    'Snake Plant',
    'Money Plant / Pothos',
    'Peace Lily',
    'Spider Plant',
    'Tulsi',
    'Rose',
    'Hibiscus',
    'Basil',
    'Succulent',
    'Other'
  ];

  const speciesWateringDefaults = {
    'Aloe Vera': 14,
    'Snake Plant': 14,
    'Money Plant / Pothos': 7,
    'Peace Lily': 7,
    'Spider Plant': 7,
    'Tulsi': 3,
    'Rose': 3,
    'Hibiscus': 3,
    'Basil': 2,
    'Succulent': 21,
    'Other': 7
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      if (name === 'species' && speciesWateringDefaults[value]) {
        updated.wateringIntervalDays = speciesWateringDefaults[value];
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await plantService.createPlant({
        ...formData,
        wateringIntervalDays: Number(formData.wateringIntervalDays),
        currentHeight: Number(formData.currentHeight) || 0
      });
      alert('Plant added successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--primary-green)', marginBottom: '1.5rem' }}>Add New Plant</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Plant Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label>Species *</label>
                <select name="species" value={formData.species} onChange={handleChange} required>
                  <option value="">Select species</option>
                  {speciesOptions.map(species => (
                    <option key={species} value={species}>{species}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label>Plant Image URL (optional)</label>
              <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Plant Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Living Room, Balcony" />
              </div>
              <div>
                <label>Sunlight Requirement *</label>
                <select name="sunlightRequirement" value={formData.sunlightRequirement} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="Bright Indirect">Bright Indirect</option>
                  <option value="Full Sun">Full Sun</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Date Added *</label>
                <input type="date" name="dateAdded" value={formData.dateAdded} onChange={handleChange} required />
              </div>
              <div>
                <label>Last Watered Date *</label>
                <input type="date" name="lastWatered" value={formData.lastWatered} onChange={handleChange} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Watering Interval (days) *</label>
                <input type="number" name="wateringIntervalDays" value={formData.wateringIntervalDays} onChange={handleChange} required min="1" />
              </div>
              <div>
                <label>Initial Height (cm)</label>
                <input type="number" name="currentHeight" value={formData.currentHeight} onChange={handleChange} min="0" step="0.1" />
              </div>
            </div>

            <div>
              <label>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"></textarea>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Plant'}
              </button>
              <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPlant;

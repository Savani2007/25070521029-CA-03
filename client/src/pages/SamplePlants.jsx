import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { plantService } from '../services/api';
import PlantImage from '../components/PlantImage';
import { getPlantImage } from '../utils/plantImages';
import { useState } from 'react';
import './SamplePlants.css';

const SamplePlants = () => {
  const { user } = useAuth();
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const samplePlants = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      species: 'Monstera Deliciosa',
      image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=400&h=300&fit=crop',
      location: 'Living Room',
      wateringIntervalDays: 7,
      sunlightRequirement: 'Bright Indirect',
      notes: 'Swiss Cheese Plant - loves humidity'
    },
    {
      id: 2,
      name: 'Snake Plant',
      species: 'Snake Plant',
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop',
      location: 'Bedroom',
      wateringIntervalDays: 14,
      sunlightRequirement: 'Low',
      notes: 'Hardy and air purifying'
    },
    {
      id: 3,
      name: 'Golden Pothos',
      species: 'Money Plant / Pothos',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      location: 'Shelf',
      wateringIntervalDays: 7,
      sunlightRequirement: 'Bright Indirect',
      notes: 'Trailing vine, easy to propagate'
    },
    {
      id: 4,
      name: 'Peace Lily',
      species: 'Peace Lily',
      image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=400&h=300&fit=crop',
      location: 'Bathroom',
      wateringIntervalDays: 7,
      sunlightRequirement: 'Low',
      notes: 'Beautiful white blooms'
    },
    {
      id: 5,
      name: 'Aloe Vera',
      species: 'Aloe Vera',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop',
      location: 'Kitchen',
      wateringIntervalDays: 21,
      sunlightRequirement: 'Full Sun',
      notes: 'Medicinal succulent'
    },
    {
      id: 6,
      name: 'Spider Plant',
      species: 'Spider Plant',
      image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=300&fit=crop',
      location: 'Hanging',
      wateringIntervalDays: 7,
      sunlightRequirement: 'Bright Indirect',
      notes: 'Produces baby plantlets'
    }
  ];

  const togglePlant = (plant) => {
    setSelectedPlants(prev => 
      prev.find(p => p.id === plant.id) 
        ? prev.filter(p => p.id !== plant.id)
        : [...prev, plant]
    );
  };

  const addSelectedPlants = async () => {
    if (selectedPlants.length === 0) {
      alert('Please select at least one plant');
      return;
    }
    setLoading(true);
    try {
      for (const plant of selectedPlants) {
        await plantService.createPlant({
          name: plant.name,
          species: plant.species,
          imageUrl: plant.image,
          location: plant.location,
          dateAdded: new Date().toISOString().split('T')[0],
          lastWatered: new Date().toISOString().split('T')[0],
          wateringIntervalDays: plant.wateringIntervalDays,
          sunlightRequirement: plant.sunlightRequirement,
          currentHeight: 10,
          notes: plant.notes
        });
      }
      alert(`Added ${selectedPlants.length} plant(s) successfully!`);
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Error adding plants');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="sample-plants">
        <div className="sample-header">
          <h1>Let's build your little green world</h1>
          <p>Choose a few plants to get started, or add your own</p>
        </div>

        <div className="sample-grid">
          {samplePlants.map(plant => (
            <div 
              key={plant.id} 
              className={`sample-card ${selectedPlants.find(p => p.id === plant.id) ? 'selected' : ''}`}
              onClick={() => togglePlant(plant)}
            >
              <div className="sample-image-container">
                <PlantImage src={plant.image} alt={plant.name} className="sample-image" />
                {selectedPlants.find(p => p.id === plant.id) && (
                  <div className="selected-badge">✓ Selected</div>
                )}
              </div>
              <div className="sample-content">
                <h3>{plant.name}</h3>
                <p className="sample-species">{plant.species}</p>
                <div className="sample-details">
                  <span>💧 Every {plant.wateringIntervalDays} days</span>
                  <span>☀️ {plant.sunlightRequirement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sample-actions">
          <button onClick={addSelectedPlants} className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : `Add Selected Plants (${selectedPlants.length})`}
          </button>
          <button onClick={() => window.location.href = '/dashboard'} className="btn btn-ghost">
            Skip for now
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SamplePlants;

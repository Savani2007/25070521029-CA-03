import DashboardLayout from '../components/DashboardLayout';
import { useState } from 'react';
import './PlantCareGuide.css';

const PlantCareGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const careGuides = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=400&h=300&fit=crop',
      category: 'Tropical Foliage',
      difficulty: 'Beginner Friendly',
      light: 'Bright indirect light',
      water: 'Every 1-2 weeks',
      humidity: '60-80%',
      description: 'Known for its iconic split leaves, the Swiss Cheese Plant is a tropical beauty.',
      tips: ['Wipe leaves to remove dust', 'Provide support as it grows', 'Watch for yellowing leaves']
    },
    {
      id: 2,
      name: 'Snake Plant',
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop',
      category: 'Low Light',
      difficulty: 'Beginner Friendly',
      light: 'Low to bright indirect',
      water: 'Every 2-4 weeks',
      humidity: '30-50%',
      description: 'Nearly indestructible, perfect for beginners and low-light spaces.',
      tips: ['Allow soil to dry completely', 'Avoid overwatering', 'Great for bedrooms']
    },
    {
      id: 3,
      name: 'Money Plant / Pothos',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      category: 'Tropical Foliage',
      difficulty: 'Beginner Friendly',
      light: 'Low to bright indirect',
      water: 'Every 1-2 weeks',
      humidity: '50-70%',
      description: 'Fast-growing trailing vine that brings prosperity and purifies air.',
      tips: ['Trim to encourage bushier growth', 'Propagates easily in water', 'Tolerates neglect']
    },
    {
      id: 4,
      name: 'Peace Lily',
      image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=400&h=300&fit=crop',
      category: 'Flowering Plants',
      difficulty: 'Beginner Friendly',
      light: 'Low to medium indirect',
      water: 'Every 1-2 weeks',
      humidity: '50-60%',
      description: 'Elegant white blooms and glossy leaves make it a classic choice.',
      tips: ['Droopy leaves signal thirst', 'Wipe leaves regularly', 'Remove spent flowers']
    },
    {
      id: 5,
      name: 'Aloe Vera',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop',
      category: 'Succulents',
      difficulty: 'Beginner Friendly',
      light: 'Bright indirect to direct',
      water: 'Every 3-4 weeks',
      humidity: '30-40%',
      description: 'Medicinal succulent with thick, fleshy leaves.',
      tips: ['Use well-draining soil', 'Water sparingly', 'Great for sunny windowsills']
    },
    {
      id: 6,
      name: 'Spider Plant',
      image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=300&fit=crop',
      category: 'Tropical Foliage',
      difficulty: 'Beginner Friendly',
      light: 'Bright indirect',
      water: 'Every 1-2 weeks',
      humidity: '40-60%',
      description: 'Produces baby plantlets and thrives with minimal care.',
      tips: ['Brown tips from fluoride/water', 'Hang or let trail', 'Easy to propagate']
    },
    {
      id: 7,
      name: 'Jade Plant',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      category: 'Succulents',
      difficulty: 'Beginner Friendly',
      light: 'Bright direct/indirect',
      water: 'Every 2-3 weeks',
      humidity: '30-50%',
      description: 'Symbol of good luck with thick, glossy leaves.',
      tips: ['Prone to overwatering', 'Can live for decades', 'Great for bonsai']
    },
    {
      id: 8,
      name: 'Areca Palm',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      category: 'Tropical Foliage',
      difficulty: 'Intermediate',
      light: 'Bright indirect',
      water: 'Every 1-2 weeks',
      humidity: '50-60%',
      description: 'Elegant feathery fronds bring tropical vibes indoors.',
      tips: ['Mist regularly for humidity', 'Yellow fronds are normal', 'Avoid direct sun']
    }
  ];

  const categories = ['all', 'Beginner Friendly', 'Low Light', 'Tropical Foliage', 'Flowering Plants', 'Succulents'];

  const filteredGuides = careGuides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      guide.difficulty === selectedCategory || 
      guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="care-guide">
        <div className="guide-header">
          <div>
            <h1 className="guide-title">Plant Care Guide</h1>
            <p className="guide-subtitle">Practical care tips for your green companions</p>
          </div>
        </div>

        <div className="guide-filters">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="guide-search"
          />
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="guides-grid">
          {filteredGuides.map(guide => (
            <div key={guide.id} className="guide-card">
              <div className="guide-image-container">
                <img src={guide.image} alt={guide.name} className="guide-image" />
                <div className="guide-badges">
                  <span className="guide-badge">{guide.difficulty}</span>
                  <span className="guide-badge">{guide.category}</span>
                </div>
              </div>
              <div className="guide-content">
                <h3 className="guide-name">{guide.name}</h3>
                <p className="guide-description">{guide.description}</p>
                <div className="guide-details">
                  <div className="guide-detail">
                    <span className="detail-icon">☀️</span>
                    <div>
                      <div className="detail-label">Light</div>
                      <div className="detail-value">{guide.light}</div>
                    </div>
                  </div>
                  <div className="guide-detail">
                    <span className="detail-icon">💧</span>
                    <div>
                      <div className="detail-label">Water</div>
                      <div className="detail-value">{guide.water}</div>
                    </div>
                  </div>
                  <div className="guide-detail">
                    <span className="detail-icon">💨</span>
                    <div>
                      <div className="detail-label">Humidity</div>
                      <div className="detail-value">{guide.humidity}</div>
                    </div>
                  </div>
                </div>
                <div className="guide-tips">
                  <h4>Quick Tips</h4>
                  <ul>
                    {guide.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlantCareGuide;

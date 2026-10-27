import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Landing = () => {
  const { user } = useAuth();

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="home-nav-container">
          <Link to="/" className="home-nav-logo">
            <span className="home-nav-logo-icon">🌿</span>
            <span>PlantPal</span>
          </Link>
          
          <ul className="home-nav-links">
            <li><Link to="/" className="home-nav-link">Home</Link></li>
            <li><a href="#features" onClick={scrollToFeatures} className="home-nav-link">Features</a></li>
            <li><a href="#showcase" className="home-nav-link">Plant Care</a></li>
            <li><a href="#footer" className="home-nav-link">About</a></li>
          </ul>
          
          <div className="home-nav-actions">
            {user ? (
              <Link to="/dashboard" className="home-nav-btn-primary">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="home-nav-btn-ghost">Login</Link>
                <Link to="/register" className="home-nav-btn-primary">Get Started</Link>
              </>
            )}
          </div>
          
          <button className="mobile-menu-btn">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-home">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🌿</span>
              <span>YOUR PERSONAL PLANT CARE COMPANION</span>
            </div>
            <h1 className="hero-title">
              Grow a little <span className="hero-title-highlight">happier.</span>
            </h1>
            <p className="hero-description">
              Bring your green space to life. Keep every plant thriving with thoughtful care, 
              smart watering reminders, and a little love.
            </p>
            <div className="hero-actions">
              {user ? (
                <Link to="/dashboard" className="hero-btn-primary">
                  <span>Go to Dashboard</span>
                  <span>→</span>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="hero-btn-primary">
                    <span>Start Growing</span>
                    <span>→</span>
                  </Link>
                  <a href="#features" onClick={scrollToFeatures} className="hero-btn-secondary">
                    Explore Plant Care
                  </a>
                </>
              )}
            </div>
            <div className="hero-trust">
              <div className="hero-trust-icons">
                <span>🌱</span>
                <span>🌿</span>
                <span>🍃</span>
              </div>
              <span>Made for plant lovers, from beginners to green thumbs.</span>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop" 
                alt="Beautiful indoor plants collection"
                className="hero-image"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=800&h=600&fit=crop'; }}
              />
              <div className="hero-image-overlay"></div>
            </div>
            <div className="floating-card floating-card-1">
              <span className="floating-card-icon">💧</span>
              <div className="floating-card-text">
                <span className="floating-card-title">Watering Reminder</span>
                <span className="floating-card-subtitle">Your Monstera is ready for a drink</span>
              </div>
            </div>
            <div className="floating-card floating-card-2">
              <span className="floating-card-icon">💚</span>
              <div className="floating-card-text">
                <span className="floating-card-title">Plant Health</span>
                <span className="floating-card-subtitle">Looking healthy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-header">
          <h2 className="features-title">Everything your plants need to thrive.</h2>
          <p className="features-subtitle">Simple tools to help you build better plant-care habits.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💧</div>
            <h3 className="feature-card-title">Smart Watering</h3>
            <p className="feature-card-description">
              Stay on top of watering schedules with reminders tailored to your plants.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3 className="feature-card-title">Plant Collection</h3>
            <p className="feature-card-description">
              Keep all your plants organized in one beautiful, easy-to-manage collection.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3 className="feature-card-title">Growth Journal</h3>
            <p className="feature-card-description">
              Record milestones and follow your plants' progress as they grow.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💚</div>
            <h3 className="feature-card-title">Plant Health</h3>
            <p className="feature-card-description">
              Keep track of plant-care information and monitor your plants' health.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="showcase-section">
        <div className="showcase-grid">
          <img 
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop" 
            alt="Indoor plants care"
            className="showcase-image"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600&h=400&fit=crop'; }}
          />
          <div>
            <h2 className="showcase-title">A little care goes a long way.</h2>
            <div className="showcase-list">
              <div className="showcase-item">
                <span className="showcase-bullet">🌿</span>
                <span>Know when to water.</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-bullet">🌱</span>
                <span>Remember every milestone.</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-bullet">💚</span>
                <span>Build a healthier green space.</span>
              </div>
            </div>
            <Link to="/register" className="hero-btn-primary">
              <span>Start Your Plant Journey</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="steps-header">
          <h2 className="steps-title">Your greener space starts here.</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Add Your Plants</h3>
            <p className="step-description">Build your personal collection.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Follow Their Needs</h3>
            <p className="step-description">Keep track of watering and care.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Watch Them Grow</h3>
            <p className="step-description">Record growth and monitor progress.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-banner">
          <h2 className="cta-title">Ready to grow something beautiful?</h2>
          <p className="cta-description">
            Give your plants the care they deserve, one small habit at a time.
          </p>
          <Link to="/register" className="cta-btn">
            Get Started — It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="home-footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <span>🌿</span>
                <span>PlantPal</span>
              </div>
              <p className="footer-tagline">Care for your plants. Grow your peace.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Navigation</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#showcase">Plant Care</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Account</h4>
                <ul>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>App</h4>
                <ul>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/plants">My Plants</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} PlantPal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

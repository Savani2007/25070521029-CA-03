import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthNew.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-hero-panel">
        <div className="auth-hero-content">
          <div className="auth-brand">
            <span className="auth-brand-icon">🌿</span>
            <span className="auth-brand-text">PlantPal</span>
          </div>
          <div className="auth-hero-main">
            <span className="auth-hero-label">YOUR PERSONAL PLANT CARE COMPANION</span>
            <h1 className="auth-hero-heading">Grow a little<br />happier.</h1>
            <p className="auth-hero-text">
              Bring your green space to life. Keep every plant thriving with thoughtful care, 
              simple reminders, and a little love.
            </p>
          </div>
        </div>
        <div className="auth-hero-footer">
          <p>Every leaf has a story.</p>
        </div>
      </div>
      
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome back.</h2>
            <p className="auth-form-subtitle">Your plants have been growing. Let's see how they're doing.</p>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={onSubmit} className="auth-form-content">
            <div className="auth-field-group">
              <label className="auth-label">Email address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="auth-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="auth-field-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="auth-input has-toggle"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              <span>🌿</span>
              <span>{loading ? 'Signing in...' : 'Welcome Back'}</span>
            </button>
          </form>
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <p className="auth-footer-text">
            Don't have an account? <Link to="/register" className="auth-footer-link">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

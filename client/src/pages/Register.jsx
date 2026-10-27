import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthNew.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password, confirmPassword });
      navigate('/sample-plants');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
            <h1 className="auth-hero-heading">Let's grow<br />together.</h1>
            <p className="auth-hero-text">
              Create your account and start building your own little green world. 
              Your plant-care journey starts here.
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
            <h2 className="auth-form-title">Create account</h2>
            <p className="auth-form-subtitle">Join PlantPal and start caring for your plants</p>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={onSubmit} className="auth-form-content">
            <div className="auth-field-group">
              <label className="auth-label">Full name</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="auth-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            
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
                  placeholder="At least 6 characters"
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
            
            <div className="auth-field-group">
              <label className="auth-label">Confirm password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔒</span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  className="auth-input has-toggle"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-password-toggle"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              <span>🌱</span>
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <p className="auth-footer-text">
            Already have an account? <Link to="/login" className="auth-footer-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

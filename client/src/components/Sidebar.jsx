import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Overview' },
    { path: '/plants', icon: '🌿', label: 'My Plants' },
    { path: '/reminders', icon: '💧', label: 'Watering Schedule' },
    { path: '/growth-journal', icon: '📈', label: 'Growth Journal' },
    { path: '/plant-care-guide', icon: '📚', label: 'Plant Care Guide' },
    { path: '/sample-plants', icon: '🌱', label: 'Add Sample Plants' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        ☰
      </button>
      
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">PlantPal</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-email">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isMobileOpen && <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </>
  );
};

export default Sidebar;

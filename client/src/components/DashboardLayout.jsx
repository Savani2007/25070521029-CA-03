import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="greeting">
              <h1>Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
              <p className="header-date">{getCurrentDate()}</p>
            </div>
          </div>
          <div className="header-right">
            <button className="header-btn" onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
              <span>{isDark ? '☀️' : '🌙'}</span>
            </button>
            <button className="header-btn">
              <span>🔔</span>
              <span className="notification-dot"></span>
            </button>
            <div className="header-user">
              <div className="header-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="header-username">{user?.name}</span>
            </div>
            <Link to="/add-plant" className="btn btn-primary">
              <span>+</span>
              <span>Add Plant</span>
            </Link>
          </div>
        </header>
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

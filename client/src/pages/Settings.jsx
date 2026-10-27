import DashboardLayout from '../components/DashboardLayout';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="settings">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account and app preferences</p>
        </div>

        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Theme</h3>
              <p>Choose between light and dark mode</p>
            </div>
            <button onClick={toggleTheme} className="theme-toggle-btn">
              <span>{isDark ? '☀️' : '🌙'}</span>
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Profile Information</h3>
              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>About</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>PlantPal</h3>
              <p>Smart Plant Care Management System</p>
              <p>Version 2.0 - Premium Edition</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌿 PlantPal
        </Link>
        <ul className="nav-menu">
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/plants" className="nav-link">My Plants</Link>
              </li>
              <li className="nav-item">
                <Link to="/reminders" className="nav-link">Reminders</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-plant" className="nav-link">Add Plant</Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">Hi, {user.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

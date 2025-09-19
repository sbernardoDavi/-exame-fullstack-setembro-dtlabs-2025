import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NotificationIcon from '../Notification/notification';
import './header.css';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header-app">
      <nav className="nav-links">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>HOME</NavLink>
        <NavLink to="/devices" className={({ isActive }) => isActive ? 'active' : ''}>DEVICES</NavLink>
        <NavLink to="/notification" className={({ isActive }) => isActive ? 'active' : ''}>NOTIFICATION</NavLink>
      </nav>

      <div className="header-actions">
        <div className="notification-icon-wrapper">
          <NotificationIcon hasNotifications={true} />
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;

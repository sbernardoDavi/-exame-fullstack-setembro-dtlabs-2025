import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="header-app">
      <nav className="nav-links">
        <NavLink to="/home" style={{ marginLeft: '20px' }} className={({ isActive }) => isActive ? 'active' : ''}>HOME</NavLink>
        <NavLink to="/devices" className={({ isActive }) => isActive ? 'active' : ''}>DEVICES</NavLink>
        <NavLink to="/notification" className={({ isActive }) => isActive ? 'active' : ''}>NOTIFICATION</NavLink>
      </nav>

      <button onClick={onLogout} className="logout-button">Logout</button>
    </header>
  );
};

export default Header;
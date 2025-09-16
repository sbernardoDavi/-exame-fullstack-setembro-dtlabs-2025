import React from 'react';
import './header.css';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
  return (
    <header className="header-app">
      <h1>{title}</h1>
      <button onClick={onLogout} className="logout-button">Logout</button>
    </header>
  );
};

export default Header;

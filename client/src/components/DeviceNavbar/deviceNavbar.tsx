import React from 'react';
import './deviceNavbar.css';

type Props = {
  onAdd: () => void;
  onFilter: () => void;
};

const DeviceNavbar: React.FC<Props> = ({ onAdd, onFilter }) => {
  return (
    <div className="device-navbar">
      <button className="navbar-button add" onClick={onAdd}>+ Adicionar Dispositivo</button>
      <button className="navbar-button filter" onClick={onFilter}>Filtrar</button>
    </div>
  );
};

export default DeviceNavbar;

import React, { useState } from 'react';
import './deviceNavbar.css';

type Props = {
  onAdd: () => void;
  onFilter: (filters: { name: string; days: number }) => void;
};

const DeviceNavbar: React.FC<Props> = ({ onAdd, onFilter }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [dayFilter, setDayFilter] = useState(7); // Default: últimos 7 dias

  const handleFilterSubmit = () => {
    onFilter({ name: nameFilter, days: dayFilter });
  };

  return (
    <div className="device-navbar">
      <button className="navbar-button add" onClick={onAdd}>
        + Adicionar Dispositivo
      </button>

      <div className="filter-form">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <select value={dayFilter} onChange={(e) => setDayFilter(Number(e.target.value))}>
          <option value={1}>Últimos 3 dias</option>
          <option value={7}>Últimos 7 dias</option>
          <option value={15}>Últimos 15 dias</option>
          <option value={30}>Últimos 30 dias</option>
        </select>

        <button className="navbar-button filter" onClick={handleFilterSubmit}>
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default DeviceNavbar;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header';
import './device.css';

interface Device {
  id: string;
  name: string;
}

const mockDevices: Device[] = [
  { id: '1', name: 'Dispositivo A' },
  { id: '2', name: 'Dispositivo B' },
];

const DevicePage: React.FC = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [period, setPeriod] = useState<string>('24h');
  const [heartbeatData, setHeartbeatData] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (!selectedDeviceId) return;

    const fetchData = () => {
      //Dados simulados
      const data = Array.from({ length: 10 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 3600000).toLocaleString(),
        cpu: Math.random() * 100,
        ram: Math.random() * 100,
      })).reverse();
      setHeartbeatData(data);
    };

    fetchData();
  }, [selectedDeviceId, period]);

  return (
    <div className="page-container">
      <Header onLogout={handleLogout}/>
      <main className="dispositivos-content">
        
        <div className="filters">
          <label>Dispositivo:</label>
          <select value={selectedDeviceId} onChange={e => setSelectedDeviceId(e.target.value)}>
            <option value="">Selecione</option>
            {mockDevices.map(device => (
              <option key={device.id} value={device.id}>{device.name}</option>
            ))}
          </select>

          <label>Período:</label>
          <select value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="24h">Últimas 24h</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
          </select>
        </div>

        {selectedDeviceId && heartbeatData.length > 0 ? (
          <div className="charts">
            <h3>Uso de CPU e RAM</h3>
            <div className="chart">
              <ul>
                {heartbeatData.map((entry, idx) => (
                  <li key={idx}>
                    <strong>{entry.timestamp}</strong>: CPU: {entry.cpu.toFixed(1)}% | RAM: {entry.ram.toFixed(1)}%
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Selecione um dispositivo para visualizar os dados.</p>
        )}
      </main>
    </div>
  );
};

export default DevicePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

interface Device {
  id: string;
  name: string;
  cpu_usage: number;
  ram_usage: number;
  temperature: number;
  connectivity: number;
  disk_free: number;
  latency_dns: number;
  boot_time: string;
}

const mockDevices: Device[] = [
  {
    id: 'device-1',
    name: 'Dispositivo A',
    cpu_usage: 45.2,
    ram_usage: 67.3,
    temperature: 55.1,
    disk_free: 20480,
    latency_dns: 34,
    connectivity: 1,
    boot_time: '2025-09-16T10:30:00Z'
  },
  {
    id: 'device-2',
    name: 'Dispositivo B',
    cpu_usage: 81.4,
    ram_usage: 90.1,
    temperature: 72.0,
    disk_free: 10240,
    latency_dns: 88,
    connectivity: 0,
    boot_time: '2025-09-15T18:00:00Z'
  }
];

const HomePage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    //Simulando Retorno de API
    setTimeout(() => {
      setDevices(mockDevices);
    }, 500);
  }, []);

  const handleLogout = () => {
    //remover token se estiver usando autenticação
    //localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Dashboard de Dispositivos</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <main className="home-container">
        <div className="device-grid">
          {devices.map(device => (
            <div className="device-card" key={device.id}>
              <h2>{device.name}</h2>
              <p><strong>CPU:</strong> {device.cpu_usage}%</p>
              <p><strong>RAM:</strong> {device.ram_usage}%</p>
              <p><strong>Temperatura:</strong> {device.temperature} °C</p>
              <p><strong>Conectividade:</strong> {device.connectivity ? '🟢 Online' : '🔴 Offline'}</p>
              <p><strong>Latência DNS:</strong> {device.latency_dns} ms</p>
              <p><strong>Disco Livre:</strong> {device.disk_free} MB</p>
              <p><strong>Boot:</strong> {new Date(device.boot_time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

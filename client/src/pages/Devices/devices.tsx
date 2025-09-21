import React, { useEffect, useState } from 'react';
import { Device } from '../../types/device';
import { fetchDevices, createDevice, updateDevice, deleteDevice } from '../../services/deviceService';
import DeviceList from '../../components/DeviceCard/deviceCard';
import Header from '../../components/Header/header';
import DeviceNavbar from '../../components/DeviceNavbar/deviceNavbar';
import DeviceModal from '../../components/DeviceModal/deviceModal';
import './devices.css';

const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [period, setPeriod] = useState('7d');
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const user_id = localStorage.getItem('user_id') || '';
  const loadDevices = async () => {
    // const data = await fetchDevices(user_id);
    const mockDevices: Device[] = [
      {
        uuid: '11111111-1111-1111-1111-111111111111',
        name: 'Dispositivo A',
        location: 'Sala 1',
        sn: '123456789012',
        description: 'Monitor principal',
        user_id: 'fake-user-id',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        uuid: '22222222-2222-2222-2222-222222222222',
        name: 'Dispositivo B',
        location: 'Sala 2',
        sn: '987654321098',
        description: 'Sensor de temperatura',
        user_id: 'fake-user-id',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    setDevices(mockDevices);
  };


  useEffect(() => {
    loadDevices();
  }, []);

  const handleAdd = async (device: Partial<Device>) => {
    await createDevice({ ...device, user_id });
    loadDevices();
  };

  const handleOpenAdd = () => {
    setCurrentDevice({
      uuid: crypto.randomUUID(),
      name: '',
      sn: '',
      location: '',
      description: '',
      user_id: 'fake-user-id',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setIsEditing(false);
    setModalVisible(true);
  };

  const handleEdit = async (device: Partial<Device>) => {
    if (editingDevice) {
      await updateDevice(editingDevice.uuid, device);
      setEditingDevice(null);
      loadDevices();
    }
  };

  const handleDelete = async (uuid: string) => {
    await deleteDevice(uuid);
    loadDevices();
  };

  const handleAddDevice = () => {
    
  };

  const handleFilterDevices = () => {
    
  };

  return (
    <>
      <Header onLogout={() => {}} />
      <div className="device-page">
        <h2>Gerenciamento e Análise de Dispositivos</h2>
        <DeviceNavbar 
          onAdd={() => {
            setEditingDevice({
              uuid: crypto.randomUUID(),
              name: '',
              sn: '',
              location: '',
              description: '',
              user_id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }}
          onFilter={handleFilterDevices} 
        />

        <DeviceList
          devices={devices}
          onEdit={setEditingDevice}
          onDelete={handleDelete}
          onSelect={setSelectedDevices}
          selectedDevices={selectedDevices}
          onAddNew={handleOpenAdd}
        
        />
        <DeviceModal
          visible={!!editingDevice}
          device={editingDevice}
          isEditing={devices.some(d => d.uuid === editingDevice?.uuid)}
          onClose={() => setEditingDevice(null)}
          onSave={(device) => {
            if (devices.some(d => d.uuid === device.uuid)) {
              handleEdit(device);
            } else {
              handleAdd(device);
            }
          }}
        />

      </div>
    </>
  );
};

export default DevicesPage;

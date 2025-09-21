import React from 'react';
import { Device } from '../../types/device';
import './deviceCard.css';

type Props = {
  devices: Device[];
  onEdit: (device: Device) => void;
  onDelete: (uuid: string) => Promise<void>;
  onSelect: (ids: string[]) => void;
  selectedDevices: string[];
  onAddNew: () => void;
};

const DeviceList: React.FC<Props> = ({ devices, onEdit, onDelete, onSelect, selectedDevices, onAddNew }) => {

  const handleSelect = (uuid: string) => {
    if (selectedDevices.includes(uuid)) {
      onSelect(selectedDevices.filter((id) => id !== uuid));
    } else {
      onSelect([...selectedDevices, uuid]);
    }
  };

  return (
    <div>
      <div className="device-cards-container">
        {devices.length === 0 && <p className="no-devices-text">Nenhum dispositivo registrado.</p>}

        {devices.map((device) => (
          <div
            key={device.uuid}
            className="device-card"
            onClick={() => onEdit(device)}
          >
            <h4 className="device-name">{device.name}</h4>
            <p><strong>ID:</strong> {device.uuid}</p>
            <p><strong>SN:</strong> {device.sn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;

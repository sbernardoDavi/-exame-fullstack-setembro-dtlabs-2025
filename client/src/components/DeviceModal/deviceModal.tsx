import React, { useState, useEffect } from 'react';
import { Device } from '../../types/device';
import './deviceModal.css';

type Props = {
  visible: boolean;
  device: Device | null;
  isEditing: boolean;
  onClose: () => void;
  onSave: (device: Device) => void;
  onDelete: (uuid: string) => void;
};

const DeviceModal: React.FC<Props> = ({ visible, device, isEditing, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Device | null>(null);
  useEffect(() => {
        if (device) {
        setFormData({ ...device });
        } else {
        setFormData(null);
        }
    }, [device]);

     if (!visible || !formData) return null;

    const handleChange = (field: keyof Device, value: string) => {
        setFormData((prev) => prev ? { ...prev, [field]: value } : prev);
    };

    const handleSubmit = () => {
        if (formData) {
            onSave(formData);
            onClose();
        }
    };

    const handleDelete = () => {
      if (formData?.uuid) {
        onDelete(formData.uuid);
        onClose();
      }
    };


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2>{isEditing ? 'Editar Dispositivo' : 'Adicionar Dispositivo'}</h2>

        <label>
          Nome:
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </label>

        <label>
          Serial Number:
          <input
            type="text"
            maxLength={12}
            pattern="\d{12}"
            value={formData.sn || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,12}$/.test(value)) {
                handleChange('sn', value);
              }
            }}
            required
          />
        </label>

        <label>
          Localização:
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </label>

        <label>
          Descrição:
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button className="modal-button save" onClick={handleSubmit}>Salvar</button>
          {isEditing && (
            <button className="modal-button remove" onClick={handleDelete}>Apagar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceModal;

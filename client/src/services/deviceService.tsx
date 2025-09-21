import axios from 'axios';
import { Device } from '../types/device';
const token = localStorage.getItem('token');

const API = 'http://localhost:5000/api/devices';

export const fetchDevices = async (user_id: string) => {
  const res = await axios.get(`${API}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return res.data as Device[];
};

export const createDevice = async (device: Partial<Device>) => {
  const res = await axios.post(API, device, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return res.data;
};

export const updateDevice = async (uuid: string, device: Partial<Device>) => {
  const res = await axios.put(`${API}/${uuid}`, device, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return res.data;
};

export const deleteDevice = async (uuid: string) => {
  await axios.delete(`${API}/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

import axios from 'axios';
import { Device } from '../types/device';

const API = 'http://localhost:5000/api/devices';

export const fetchDevices = async (user_id: string) => {
  const res = await axios.get(`${API}?user_id=${user_id}`);
  return res.data as Device[];
};

export const createDevice = async (device: Partial<Device>) => {
  const res = await axios.post(API, device);
  return res.data;
};

export const updateDevice = async (uuid: string, device: Partial<Device>) => {
  const res = await axios.put(`${API}/${uuid}`, device);
  return res.data;
};

export const deleteDevice = async (uuid: string) => {
  await axios.delete(`${API}/${uuid}`);
};

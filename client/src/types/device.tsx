export interface Device {
  uuid: string;
  name: string;
  location: string;
  sn: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default Device;



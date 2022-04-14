import axios from 'axios';
import { getToken } from '../utils';

const instance = axios.create({
  baseURL: '/api/',
});

instance.interceptors.request.use((config) => {
  const user = getToken();
  if (!user) return config;
  config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default instance;

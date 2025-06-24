import axios, { AxiosInstance } from 'axios';
import { appUrl } from '@/config/env';

const api: AxiosInstance = axios.create({
  baseURL: appUrl,
  withCredentials: true,
});
export default api;

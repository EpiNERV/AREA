import axios from 'axios';
import { useAuth } from './AuthContext';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

AxiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshAccessToken } = useAuth();
      await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;

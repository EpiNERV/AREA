// axiosInstance.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = axios.create({
  baseURL: 'http://192.168.1.71:5000/api/v1',
});

interface TokenType {
  access_token: string;
  refresh_token: string;
}

const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await AxiosInstance.post<TokenType>('/user/auth/refresh_token', {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token } = response.data;
    await AsyncStorage.setItem('accessToken', access_token);
    await AsyncStorage.setItem('refreshToken', refresh_token);
    return access_token;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw error;
  }
};


// Request Interceptor
AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(new Error('Error when refreshing token: ' + refreshError));
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;

import AxiosInstance from './axiosInstance';

interface TokenType {
    access_token: string;
    refresh_token: string;
}

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }
  
  try {
    const response = await AxiosInstance.post<TokenType>('/user/auth/refresh_token', {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token } = response.data;
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    return access_token;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw error;
  }
};

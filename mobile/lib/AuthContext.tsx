// AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface AuthContextType {
  loading: boolean;
  accessToken: string | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log(accessToken);
  console.log(refreshToken);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        if (storedToken && storedRefreshToken) {
          setAccessToken(storedToken);
          setRefreshToken(storedRefreshToken);
        }
      } catch (e) {
        console.error('Failed to load tokens', e);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  const login = useCallback(
    async (accessToken: string, refreshToken: string) => {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      try {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
      } catch (e) {
        console.error('Failed to save tokens', e);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setAccessToken(null);
    setRefreshToken(null);
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (e) {
      console.error('Failed to remove tokens', e);
    }
    router.replace('/welcome/login');
  }, [router]);

  const authContextProviderValue = useMemo(
    () => ({ loading, accessToken, login, logout }),
    [loading, accessToken, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

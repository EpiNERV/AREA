// app/components/ProtectedRoute.tsx
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'expo-router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, accessToken } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (!accessToken) {
    router.replace('/welcome/login'); // Redirect to login if not authenticated
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

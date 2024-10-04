import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    console.info("Need to wait for the user context to load");
    return <div></div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

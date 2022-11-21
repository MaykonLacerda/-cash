import { useAuthService } from 'hooks/services/useAuthService';
import React from 'react';
import { Navigate } from 'react-router-dom';

export interface Props {
  children: JSX.Element;
}

export function PrivateRoute({ children }: Props) {
  const authService = useAuthService();
  const isLoggedIn = !!authService.token();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

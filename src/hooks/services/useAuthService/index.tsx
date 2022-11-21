import api from 'hooks/services';
import { useEffect, useState } from 'react';
import { AuthenticateDTO, AuthenticateResponse } from './dtos';

export const useAuthService = () => {
  const authTokenKey = 'Authorization';
  const storageToken = localStorage.getItem(authTokenKey);
  const [token, setToken] = useState<string | null>(storageToken);

  const getTokenInStorage = () => localStorage.getItem(authTokenKey);

  useEffect(() => {
    const token = getTokenInStorage();

    setToken(token);
  }, []);

  const setTokenInStorage = (token: string) => {
    setToken(token);
    localStorage.setItem(authTokenKey, token);
  };

  const login = async (data: AuthenticateDTO) => {
    const response = await api.post<AuthenticateResponse>('/auth', data);

    setTokenInStorage(response?.data.token);

    return response;
  };

  const resetToken = (key: string) => {
    localStorage.removeItem(key);
    setToken('');
  };

  const logout = () => {
    resetToken(authTokenKey);
  };

  return {
    token: () => token,
    login,
    logout,
  };
};

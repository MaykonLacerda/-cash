import api from 'services';
import { AuthenticateDTO, AuthenticateResponse } from './dtos';

export const AuthService = () => {
  const authTokenKey = 'Authorization';

  const login = async (data: AuthenticateDTO) => {
    const response = await api.post<AuthenticateResponse>('/auth', data);

    return response;
  };

  const setToken = (token: string) => {
    localStorage.setItem(authTokenKey, token);
  };

  const getToken = () => {
    localStorage.getItem(authTokenKey);
  };

  const resetToken = (key: string) => {
    localStorage.removeItem(key);
  };

  const logout = () => {
    resetToken(authTokenKey);
  };

  return {
    login,
    setToken,
    getToken,
    logout,
  };
};

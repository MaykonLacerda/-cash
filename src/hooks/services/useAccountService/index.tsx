import api from 'hooks/services';
import { useAuthService } from 'hooks/services/useAuthService';
import { GetAccountResponse } from './dtos';

export const useAccountService = () => {
  const baseRoute = '/account';
  const authService = useAuthService();

  const getAccountByUserId = (userId: string) => {
    const token = authService?.token();

    return api.get<GetAccountResponse>(`${baseRoute}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    getAccountByUserId,
  };
};

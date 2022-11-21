import api from 'hooks/services';
import { useAuthService } from 'hooks/services/useAuthService';
import { MeInfoResponse, RegisterUserDTO } from './dtos';

export const useUserService = () => {
  const baseRoute = '/user';
  const authService = useAuthService();

  const register = async (data: RegisterUserDTO) => api.post(baseRoute, data);

  const getMeInfo = async () => {
    const token = authService.token();

    return api.get<MeInfoResponse>(`${baseRoute}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    register,
    getMeInfo,
  };
};

import api from 'services';
import { RegisterUserDTO } from './dtos';

export const UserService = () => {
  const register = async (data: RegisterUserDTO) => {
    const user = await api.post('/user', data);

    return user;
  };

  return {
    register,
  };
};

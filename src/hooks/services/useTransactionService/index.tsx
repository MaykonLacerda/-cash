import api from 'hooks/services';
import { useAuthService } from 'hooks/services/useAuthService';
import { CreateTransactionDTO, IHistoryQuery, TransanctionsResponse } from './dtos';

export const useTransactionService = () => {
  const baseRoute = '/transaction';
  const authService = useAuthService();

  const transfer = (body: CreateTransactionDTO) => {
    const token = authService?.token();

    console.log({ token });

    return api.post(baseRoute, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const history = (query?: IHistoryQuery) => {
    const token = authService?.token();
    const urlParams = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        value && urlParams.set(key, value);
      });
    }

    const queryParams = `?${urlParams.toString()}`;

    return api.get<TransanctionsResponse>(baseRoute + queryParams || '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    history,
    transfer,
  };
};

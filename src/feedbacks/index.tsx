import { AxiosError } from 'axios';
import { toast } from './toast';

export const Feedbacks = () => {
  const success = (message: string) => {
    const type = 'success';

    toast(message, { type });
  };

  const defaultApiError = (error: AxiosError) => {
    const type = 'error';

    switch (error.status) {
      case 500:
        toast(
          'Estamos com problemas em nossos servidores. Por favor, tente novamente.',
          { type },
        );
        break;
      case 401:
        toast('Você não possui autorização para realizar essa operação.', {
          type,
        });
        break;
      default:
        toast(
          'Algo de errado ocorreu. Por favor, cheque as informações e tente novamente.',
          { type },
        );
    }
  };

  return {
    success,
    defaultApiError,
  };
};

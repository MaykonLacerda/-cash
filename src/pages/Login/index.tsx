import { Button } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { Title } from 'components/typography/Title';
import { Feedbacks } from 'feedbacks';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'services/AuthService';
import { AuthenticateDTO } from 'services/AuthService/dtos';
import './styles.css';

export function Login() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<AuthenticateDTO>();
  const authService = AuthService();
  const { success, defaultApiError } = Feedbacks();

  const onSubmit = async (body: AuthenticateDTO) => {
    try {
      const { data } = await authService.login(body);

      authService.setToken(data.token);

      success('Login realizado com sucesso.');
    } catch (error) {
      defaultApiError(error);
    }
  };

  return (
    <div className="login-page">
      <Title title="Fazer login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => <Input required label="Usuário:" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input required label="Senha:" {...field} />}
        />
        <div className="button-group">
          <Button>Entrar</Button>
          <Button onClick={() => navigate('/registrar')}>Não tenho uma conta</Button>
        </div>
      </form>
    </div>
  );
}

import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { Title } from 'components/typography/Title';
import { Feedbacks } from 'feedbacks';
import { useUserService } from 'hooks/services/useUserService';
import { RegisterUserDTO } from 'hooks/services/useUserService/dtos';

export function Register() {
  const { handleSubmit, control } = useForm<RegisterUserDTO>();
  const navigate = useNavigate();
  const userService = useUserService();
  const { success, defaultApiError } = Feedbacks();

  const onSubmit = async (data: RegisterUserDTO) => {
    try {
      await userService.register(data);
      success('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      defaultApiError(error);
    }
  };

  return (
    <div className="register-page">
      <Title title="Registrar" />
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
          <Button>Salvar</Button>
          <Button onClick={() => navigate('/login')}>Já tenho uma conta</Button>
        </div>
      </form>
    </div>
  );
}

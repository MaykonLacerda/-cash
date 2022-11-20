import { useForm, Controller } from 'react-hook-form';
import { Button } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { Title } from 'components/typography/Title';
import './styles.css';

export function Auth() {
  const { handleSubmit, control } = useForm();

  const onSubmit = <T, >(data: T) => console.log(data);

  return (
    <div className="register-page">
      <Title title="Registrar" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => <Input label="Usuário:" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input label="Senha:" {...field} />}
        />
        <div className="button-group">
          <Button>Salvar</Button>
          <Button>Fazer login</Button>
        </div>
      </form>
    </div>
  );
}

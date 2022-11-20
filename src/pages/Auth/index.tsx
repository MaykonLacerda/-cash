import { Button } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { Title } from 'components/typography/Title';
import { TEXT } from 'constants/messages';
import './styles.css';

export function Auth() {
  return (
    <div className="register-page">
      <Title title="Registrar" />
      <form>
        <Input label="Usuário:" placeholder={TEXT.DefaultInputPlaceholder} />
        <Input label="Senha:" placeholder={TEXT.DefaultInputPlaceholder} />
        <div className="button-group">
          <Button>Salvar</Button>
          <Button>Fazer login</Button>
        </div>
      </form>
    </div>
  );
}

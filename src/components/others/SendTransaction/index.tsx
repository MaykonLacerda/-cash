import { Button } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { SubTitle } from 'components/typography/SubTitle';
import { Feedbacks } from 'feedbacks';
import { useTransactionService } from 'hooks/services/useTransactionService';
import { CreateTransactionDTO } from 'hooks/services/useTransactionService/dtos';
import { Controller, useForm } from 'react-hook-form';
import './styles.css';

export type SendTransactionProps = {
  update: () => Promise<void>;
}

export function SendTransaction({ update }: SendTransactionProps) {
  const { success, defaultApiError } = Feedbacks();
  const { handleSubmit, control, reset } = useForm<CreateTransactionDTO>();
  const transactionService = useTransactionService();

  const onSubmit = async (data: CreateTransactionDTO) => {
    try {
      await transactionService.transfer({
        ...data,
        value: Number(data.value),
      });

      success('Transferência realizada com sucesso.');
      await update();
    } catch (error) {
      defaultApiError(error);
    }
  };

  return (
    <div className="send-transaction">
      <SubTitle text="Realizar transferência" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="to"
          render={({ field }) => <Input required label="Usuário:" {...field} />}
        />
        <Controller
          control={control}
          name="value"
          render={({ field }) => <Input required label="Valor:" {...field} />}
        />
        <div className="button-group">
          <Button>Enviar</Button>
          <Button type="reset" onClick={() => reset()}>
            Limpar
          </Button>
        </div>
      </form>
    </div>
  );
}

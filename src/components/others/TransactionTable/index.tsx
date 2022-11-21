import { Button } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { IOption, Select } from 'components/form/Select';
import { Feedbacks } from 'feedbacks';
import { useEffect, useState } from 'react';
import { useTransactionService } from 'hooks/services/useTransactionService';
import { IHistoryQuery, TransanctionsResponse } from 'hooks/services/useTransactionService/dtos';
import { MeInfoResponse } from 'hooks/services/useUserService/dtos';
import './styles.css';
import { SubTitle } from 'components/typography/SubTitle';
import { formatMoney } from 'utils/mask';

export type ISearchURL = {
  type?: string;
  createdAt?: string;
}

export type TransactionTableProps = {
  me?: MeInfoResponse;
  update: () => void;
};

export function TransactionTable({ me, update }: TransactionTableProps) {
  const transactionService = useTransactionService();
  const { defaultApiError } = Feedbacks();
  const [transactions, setTransactions] = useState<
    TransanctionsResponse | undefined
  >();
  const [searchUrl, setSearchUrl] = useState<ISearchURL>();
  const selectOptions: IOption[] = [
    {
      label: 'Crédito',
      value: 'cashIn',
    },
    {
      label: 'Débito',
      value: 'cashOut',
    },
  ];

  const setTransactionState = async (query?: IHistoryQuery) => {
    try {
      const { data } = await transactionService.history(query);
      setTransactions(data);
    } catch (error) {
      defaultApiError(error);
    }
  };

  const reset = async () => {
    setTransactionState();
    setSearchUrl({});
  };

  useEffect(() => {
    (async () => {
      setTransactionState();
    })();
  }, [update]);

  useEffect(() => {
    (async () => {
      setTransactionState({
        ...searchUrl,
        createdAt: searchUrl?.createdAt && new Date(searchUrl?.createdAt).toISOString(),
      });
    })();
  }, [searchUrl]);

  return (
    <div className="transaction-table">
      <div>
        <SubTitle text="Histórico de extratos" />
        <h4>Filtro:</h4>
        <form>
          {/* {
            Essa lógica de filtrar por datas não está funcionando bem
            por causa das diferenças de fuso-horário. Não tive tempo de corrigir
           } */}
          <Input
            type="date"
            name="createdAt"
            lang="pt-br"
            value={searchUrl?.createdAt}
            max={new Date().toISOString()}
            label="Data"
            onChange={(e) => setSearchUrl((prev) => (
              { ...prev, createdAt: e.target.value }
            ))}
          />
          <Select
            options={selectOptions}
            value={searchUrl?.type}
            onChange={(e) => setSearchUrl((prev) => (
              { ...prev, type: e.target.value }
            ))}
          />
          <div className="button-group">
            <Button type="reset" onClick={reset}>Limpar filtro</Button>
          </div>
        </form>
      </div>
      <table>
        <thead className="header">
          <tr>
            <td>Tipo</td>
            <td>Usuário</td>
            <td>Valor</td>
            <td>Data</td>
          </tr>
        </thead>
        <tbody className="body">
          {transactions?.map((transaction) => {
            const isDebit = transaction.debited.user.id === me?.id;
            const thirdPartyUser = isDebit
              ? transaction.credited.user
              : transaction.debited.user;
            const type = isDebit ? 'Débito' : 'Crédito';

            return (
              <tr>
                <td>{type}</td>
                <td>{thirdPartyUser.username}</td>
                <td>{formatMoney(transaction.value)}</td>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!transactions?.length ? (
        <div className="no-data">
          <p>Não há transações para exibir...</p>
        </div>
      ) : null}
    </div>
  );
}

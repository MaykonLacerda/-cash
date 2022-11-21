import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/form/Button';
import { TransactionTable } from 'components/others/TransactionTable';
import { Title } from 'components/typography/Title';
import { SendTransaction } from 'components/others/SendTransaction';
import { Feedbacks } from 'feedbacks';
import { useAccountService } from 'hooks/services/useAccountService';
import { GetAccountResponse } from 'hooks/services/useAccountService/dtos';
import { useAuthService } from 'hooks/services/useAuthService';
import { useUserService } from 'hooks/services/useUserService';
import { MeInfoResponse } from 'hooks/services/useUserService/dtos';
import { formatMoney } from 'utils/mask';
import './styles.css';

export function Home() {
  const userService = useUserService();
  const accountService = useAccountService();
  const authService = useAuthService();
  const { defaultApiError } = Feedbacks();
  const [meInfo, setMeInfo] = useState<MeInfoResponse | undefined>();
  const [account, setAccount] = useState<GetAccountResponse | undefined>();
  const navigate = useNavigate();
  const setAccountState = async (userId: string) => {
    try {
      const { data } = await accountService.getAccountByUserId(userId);
      setAccount(data);
    } catch (error) {
      defaultApiError(error);
    }
  };

  const update = async () => {
    meInfo && (await setAccountState(meInfo?.id));
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const getMeInfo = async () => {
    try {
      const { data } = await userService.getMeInfo();

      return data;
    } catch (error) {
      defaultApiError(error);
    }
  };

  useEffect(() => {
    (async () => {
      const me = await getMeInfo();
      setMeInfo(me);

      if (me) setAccountState(me.id);
    })();
  }, []);

  return (
    <div className="home-page">
      <Title title={`Olá, ${meInfo?.username}`} />
      <div className="current-balance">
        <p>
          Saldo atual:
          {' '}
          <span>{formatMoney(account?.balance)}</span>

        </p>
      </div>
      <SendTransaction update={update} />
      <TransactionTable update={update} me={meInfo} />
      <div className="logout">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

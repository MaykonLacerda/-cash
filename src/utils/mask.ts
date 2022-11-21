export const formatMoney = (value?: number | string) => {
  let money = value;

  if (typeof value === 'string') {
    money = Number(value);
  }

  return money?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || '0';
};

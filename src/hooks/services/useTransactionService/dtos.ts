type User = {
  username: string,
  id: string
}

export type CreateTransactionDTO = {
  to: string;
  value: number;
}

export type TransanctionsResponse = {
  id: string;
  value: string;
  createdAt: Date;
  debited: {
    user: User
  }
  credited: {
    user: User;
  }
}[]

export type IHistoryQuery = {
  type?: string;
  createdAt?: string;
}

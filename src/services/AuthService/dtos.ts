export type AuthenticateDTO = {
  username: string;
  password: string;
}

export type AuthenticateResponse = {
  token: string;
}

export interface IAuth {
  login(email: string, password: string): Promise<string | Error>;
}

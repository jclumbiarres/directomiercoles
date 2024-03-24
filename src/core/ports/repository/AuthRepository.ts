export interface IAuth<T> {
  generateToken(user: T): Promise<string>;
  verifyToken(token: string): Promise<T>;
}

export interface IUser<T> {
  save(user: T): Promise<T>;
  findByEmail(email: string): Promise<T>;
}

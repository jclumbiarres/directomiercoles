import { User } from "$core/domain/User";
import { IUser } from "$core/ports/repository/UserRepository";

export class InMemoryUserRepository implements IUser<User> {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email) as User;
  }
}

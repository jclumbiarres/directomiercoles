import { User } from "$core/domain/User";
import { IUser } from "$core/ports/repository/UserRepository";
import { PrismaClient } from "@prisma/client";

export class OrmUserRepository implements IUser<User> {
  private prisma: PrismaClient = new PrismaClient();

  async save(user: User): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const output = await this.prisma.user.findFirst({
      where: { email },
    });
    return output as User;
  }
}

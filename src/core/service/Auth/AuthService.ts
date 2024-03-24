import { User } from "../../domain/User";
import { AuthError } from "../../error/AuthError";
import { IUser } from "../../ports/repository/UserRepository";
import { HPassService } from "./HashPassService";
import { ITokenService } from "$core/ports/repository/TokenRepository";
import { IAuth } from "$core/ports/repository/AuthRepository";

export class AuthService implements IAuth {
  constructor(
    private readonly userRepository: IUser<User>,
    private readonly hashPassService: HPassService,
    private readonly tokenService: ITokenService
  ) {}

  public async login(email: string, password: string): Promise<string | Error> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const passwordMatch = await this.hashPassService.verifyPass(
        user.password,
        password
      );
      if (passwordMatch) {
        return this.tokenService.generateToken(user);
      } else {
        throw new AuthError("Invalid password");
      }
    } else {
      throw new AuthError("User not found");
    }
  }
}

import { User } from "../domain/User";
import { AuthError, InvalidToken } from "../error/AuthError";
import { IUser } from "../ports/repository/UserRepository";
import jwt from "jsonwebtoken";
import { HPassService } from "./HashPassService";
import { ITokenService } from "$core/ports/repository/TokenRepository";

type TVerifyToken = Error | string | jwt.JwtPayload;

export class AuthService {
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

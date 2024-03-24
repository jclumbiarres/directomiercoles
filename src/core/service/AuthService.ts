import { User } from "../domain/User";
import { AuthError, InvalidToken } from "../error/AuthError";
import { IUser } from "../ports/repository/UserRepository";
import jwt from "jsonwebtoken";
import { HPassService } from "./HashPassService";

type TVerifyToken = Error | string | jwt.JwtPayload;

export class AuthService {
  constructor(
    private readonly userRepository: IUser<User>,
    private readonly hashPassService: HPassService
  ) {}

  public async login(email: string, password: string): Promise<string | Error> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const passwordMatch = await this.hashPassService.verifyPass(
        user.password,
        password
      );
      if (passwordMatch) {
        return this.generateToken(user);
      } else {
        throw new AuthError("Invalid password");
      }
    } else {
      throw new AuthError("User not found");
    }
  }

  private generateToken(user: User): string {
    const payload = { email: user.email };
    const secretOrPrivateKey = process.env.JWT_SECRET || "uh-oh-secret";
    return jwt.sign(payload, secretOrPrivateKey, { expiresIn: "1h" });
  }

  public verifyToken(token: string): TVerifyToken {
    try {
      const secretOrPublicKey = process.env.JWT_SECRET || "uh-oh-secret";
      return jwt.verify(token, secretOrPublicKey);
    } catch (e) {
      throw new InvalidToken("Invalid token");
    }
  }
}

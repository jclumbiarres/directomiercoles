import jwt from "jsonwebtoken";
import { InvalidToken } from "../error/AuthError";
import { User } from "$core/domain/User";
import { ITokenService } from "$core/ports/repository/TokenRepository";

export class TokenService implements ITokenService {
  public generateToken(user: User): string {
    const payload = { email: user.email };
    const secretOrPrivateKey = process.env.JWT_SECRET || "uh-oh-secret";
    return jwt.sign(payload, secretOrPrivateKey, { expiresIn: "1h" });
  }
  public verifyToken(token: string): TVerifyToken | jwt.JwtPayload {
    try {
      const secretOrPublicKey = process.env.JWT_SECRET || "uh-oh-secret";
      return jwt.verify(token, secretOrPublicKey);
    } catch (e) {
      throw new InvalidToken("Invalid token");
    }
  }
}

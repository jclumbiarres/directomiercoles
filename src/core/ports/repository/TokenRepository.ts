import { User } from "$core/domain/User";
import jwt from "jsonwebtoken";

export interface ITokenService {
  generateToken(user: User): string;
  verifyToken(token: string): TVerifyToken | jwt.JwtPayload;
}

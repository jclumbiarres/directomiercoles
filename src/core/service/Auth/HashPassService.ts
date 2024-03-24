import argon2 from "argon2";

export class HPassService {
  async hashPass(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2id });
  }
  async verifyPass(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class InvalidToken extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidToken";
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
    this.message = message;
  }
}

export class InvalidToken extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidToken";
    this.message = message;
  }
}

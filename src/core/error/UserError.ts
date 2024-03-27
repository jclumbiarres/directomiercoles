export class UserNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFound";
    this.message = message;
  }
}

export class UserAlreadyExists extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserAlreadyExists";
    this.message = message;
  }
}

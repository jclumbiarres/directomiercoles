export class DbaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DBError";
  }
}

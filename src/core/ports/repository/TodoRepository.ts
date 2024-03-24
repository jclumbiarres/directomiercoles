export interface ITodo<T> {
  save(todo: T): Promise<Partial<T>>;
  findById(id: string): Promise<Partial<T>>;
  findAll(): Promise<Partial<T>[]>;
  delete(id: string): Promise<void>;
  complete(id: string): Promise<Partial<T>>;
}

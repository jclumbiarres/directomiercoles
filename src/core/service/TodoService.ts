import { Todo } from "$core/domain/Todo";
import { ITodo } from "$core/ports/repository/TodoRepository";

export class TodoService {
  private readonly todoRepository: ITodo<Todo>;
  constructor(todoRepository: ITodo<Todo>) {
    this.todoRepository = todoRepository;
  }
  public async save(todo: Todo): Promise<Partial<Todo>> {
    const todoSaved = await this.todoRepository.save(todo);
    return todoSaved;
  }
  public async findById(id: string): Promise<Partial<Todo>> {
    const todo = await this.todoRepository.findById(id);
    return todo;
  }
  public async findAll(): Promise<Partial<Todo>[]> {
    const todos = await this.todoRepository.findAll();
    return todos;
  }
  public async delete(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
  public async complete(id: string): Promise<Partial<Todo>> {
    const todo = await this.todoRepository.complete(id);
    return todo;
  }
}

import { Todo } from "$core/domain/Todo";
import { ITodo } from "$core/ports/repository/TodoRepository";

export class InMemoryTodoRepository implements ITodo<Todo> {
  private todos: Todo[] = [];

  async save(todo: Todo): Promise<Todo> {
    this.todos.push(todo);
    return todo;
  }

  async findById(id: string): Promise<Todo> {
    return this.todos.find((todo) => todo.id === id) as Todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async delete(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  async complete(id: string): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id) as Todo;
    todo.done = true;
    return todo;
  }
}

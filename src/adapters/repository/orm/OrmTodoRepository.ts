import { PrismaClient } from "@prisma/client";
import { ITodo } from "$core/ports/repository/TodoRepository";
import { Todo } from "$core/domain/Todo";

export class OrmTodoRepository implements ITodo<Todo> {
  private prisma = new PrismaClient();

  async save(todo: Todo): Promise<Partial<Todo>> {
    try {
      const savedTodo = await this.prisma.todo.create({ data: todo });
      return savedTodo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string): Promise<Partial<Todo>> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    return todo!;
  }

  async findAll(): Promise<Partial<Todo>[]> {
    const todos = await this.prisma.todo.findMany();
    return todos!;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.todo.delete({ where: { id } });
  }

  async complete(id: string): Promise<Partial<Todo>> {
    const todo = await this.prisma.todo.update({
      where: { id },
      data: { completed: true },
    });
    return todo;
  }
}

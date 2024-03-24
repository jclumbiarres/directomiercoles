import { Todo } from "$core/domain/Todo";
import { TodoService } from "$core/service/TodoService";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  registerRoutes(server: FastifyInstance) {
    server.post(
      "/todo/add",
      async (request: FastifyRequest<{ Body: Todo }>, reply: FastifyReply) => {
        const todo = request.body;
        const newTodo = await this.todoService.save(todo);
        reply.code(201).send(newTodo);
      }
    );
    server.get("/todo/list", async (_: FastifyRequest, reply: FastifyReply) => {
      const todos = await this.todoService.findAll();
      reply.send(todos);
    });
  }
}

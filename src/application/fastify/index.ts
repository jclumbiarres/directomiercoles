import "module-alias/register";
import { fastify } from "fastify";
import { InMemoryUserRepository } from "$adapters/repository/inMemory/InMemoryUserRepository";
import { UserService } from "$core/service/UserService";
import { UserController } from "./controller/UserController";
import { AuthService } from "$core/service/Auth/AuthService";
import { LoginController } from "./controller/LoginController";
import { HPassService } from "$core/service/Auth/HashPassService";
import { TodoController } from "./controller/TodoController";
import { TodoService } from "$core/service/TodoService";
//import { InMemoryTodoRepository } from "$adapters/repository/inMemory/InMemoryTodoRepository";
import { OrmTodoRepository } from "$adapters/repository/orm/OrmTodoRepository";
import { TokenService } from "$core/service/Auth/TokenService";
import dotenv from "dotenv";
import { InMemoryTodoRepository } from "$adapters/repository/inMemory/InMemoryTodoRepository";

dotenv.config();

const server = fastify({
  logger: true,
});

// Poor's man dependency injection - Si el proyecto crece, se debería de usar un framework de inyección de dependencias

// cifrado
const hPassService = new HPassService();
const tokenService = new TokenService();

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository, hPassService);
const userController = new UserController(userService);

const authService = new AuthService(userRepository, hPassService, tokenService);
const loginController = new LoginController(authService);

const todoRepository = new InMemoryTodoRepository();
//const ormTodo = new OrmTodoRepository();

const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

userController.registerRoutes(server);
loginController.registerRoutes(server);
todoController.registerRoutes(server);

export const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

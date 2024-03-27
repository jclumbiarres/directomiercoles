import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { User } from "$core/domain/User";
import { UserService } from "$core/service/UserService";
import { UserAlreadyExists } from "$core/error/UserError";

export class UserController {
  constructor(private userService: UserService) {}

  registerRoutes(server: FastifyInstance) {
    server.post(
      "/user/add",
      async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
        const user = request.body;
        try {
          const savedUser = await this.userService.save(user);
          const { password, ...userWithoutPassword } = savedUser as User;
          reply.code(201).send(userWithoutPassword);
        } catch (err) {
          if (err instanceof UserAlreadyExists) {
            reply.code(409).send({ error: err.message });
          } else {
            reply.code(500).send({ error: "Internal Server Error" });
          }
        }
      }
    );
    server.post(
      "/user/search",
      async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
        const userData = request.body;
        try {
          const user = await this.userService.findByEmail(userData);
          if (user) {
            reply.send(user);
          } else {
            reply.code(404).send({ error: "User not found" });
          }
        } catch (err) {
          reply.code(500).send({ error: "Internal Server Error" });
        }
      }
    );
  }
}

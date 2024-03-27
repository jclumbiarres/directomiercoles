import { FastifyInstance, FastifyRequest } from "fastify";
import { AuthService } from "$core/service/Auth/AuthService";
import { InvalidToken } from "$core/error/AuthError";

export class LoginController {
  constructor(private authService: AuthService) {}

  registerRoutes(server: FastifyInstance) {
    server.post(
      "/login",
      async (
        request: FastifyRequest<{ Body: { email: string; password: string } }>,
        reply
      ) => {
        const { email, password } = request.body;
        try {
          const token = await this.authService.login(email, password);
          reply.code(200).send({ Token: token });
        } catch (err) {
          if (err instanceof InvalidToken) {
            reply.code(401).send({ error: err.message });
          }
        }
      }
    );
  }
}

import { FastifyInstance, FastifyRequest } from "fastify";
import { AuthService } from "$core/service/AuthService";

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
          reply.code(500).send({ error: err });
        }
      }
    );
  }
}

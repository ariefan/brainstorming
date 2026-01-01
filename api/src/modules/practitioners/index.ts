import type { FastifyInstance } from "fastify";
import { practitionersRoutes } from "./routes/practitioners";

export async function practitionersModule(app: FastifyInstance) {
  practitionersRoutes(app);
}

import type { FastifyInstance } from "fastify";
import { encountersRoutes } from "./routes/encounters";

export async function encountersModule(app: FastifyInstance) {
  encountersRoutes(app);
}

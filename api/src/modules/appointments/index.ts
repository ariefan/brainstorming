import type { FastifyInstance } from "fastify";
import { appointmentsRoutes } from "./routes/appointments";

export async function appointmentsModule(app: FastifyInstance) {
  appointmentsRoutes(app);
}

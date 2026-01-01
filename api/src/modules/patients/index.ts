import type { FastifyInstance } from "fastify";
import { patientsRoutes } from "./routes/patients";

export async function patientsModule(app: FastifyInstance) {
  patientsRoutes(app);
}

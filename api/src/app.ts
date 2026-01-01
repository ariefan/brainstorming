import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import Fastify from "fastify";
import pg from "pg";
import { createAuth, type Auth } from "./lib/auth";
import { initDb } from "db";
import { appointmentsModule } from "./modules/appointments";
import { authRoutes } from "./modules/auth/routes";
import { encountersModule } from "./modules/encounters";
import { healthRoutes } from "./modules/health/routes";
import { patientsModule } from "./modules/patients";
import { practitionersModule } from "./modules/practitioners";

const { Pool } = pg;

// Extend Fastify types
declare module "fastify" {
  interface FastifyInstance {
    auth: Auth;
    authorize: (
      userId: string,
      orgId: string,
      resource: string,
      action: string
    ) => Promise<boolean>;
  }
}

export interface AppConfig {
  databaseUrl: string;
  baseUrl?: string;
  corsOrigin?: string | string[];
}

export async function buildApp(config: AppConfig) {
  const app = Fastify({ logger: true });

  // Initialize database
  const pool = new Pool({ connectionString: config.databaseUrl });
  initDb(config.databaseUrl);

  // Initialize auth (disabled - requires auth tables)
  // const auth = createAuth(pool, config.baseUrl ?? "http://localhost:3000");
  // app.decorate("auth", auth);
  app.decorate("auth", null as unknown as Auth);

  // Simple authorization (allows all for now - implement proper RBAC later)
  app.decorate(
    "authorize",
    async (
      _userId: string,
      _orgId: string,
      _resource: string,
      _action: string
    ) => {
      // TODO: Implement proper RBAC with organization membership checks
      return true;
    }
  );

  // CORS
  await app.register(cors, {
    origin: config.corsOrigin ?? true,
    credentials: true,
  });

  // Cookies
  await app.register(cookie);

  // Health check
  await app.register(healthRoutes);

  // Auth routes (disabled - requires auth tables)
  // await app.register(authRoutes);

  // Clinic Domain Modules
  await app.register(patientsModule, { prefix: "/v1/orgs" });
  await app.register(practitionersModule, { prefix: "/v1/orgs" });
  await app.register(appointmentsModule, { prefix: "/v1/orgs" });
  await app.register(encountersModule, { prefix: "/v1/orgs" });

  // Graceful shutdown
  app.addHook("onClose", async () => {
    await pool.end();
  });

  return app;
}

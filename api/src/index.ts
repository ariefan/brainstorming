import { buildApp } from "./app";

const PORT = parseInt(process.env.PORT ?? "3000", 10);
const HOST = process.env.HOST ?? "0.0.0.0";
const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/clinic";
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "*";

async function main() {
  const app = await buildApp({
    databaseUrl: DATABASE_URL,
    baseUrl: BASE_URL,
    corsOrigin: CORS_ORIGIN,
  });

  try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
    console.log(`📖 API Documentation available at http://${HOST}:${PORT}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();

// Re-export all schema tables and types
export * from "./schema/index.js";

// Re-export drizzle utilities for consistent type usage
export {
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  isNull,
  isNotNull,
  inArray,
  notInArray,
  exists,
  notExists,
  between,
  notBetween,
  like,
  ilike,
  notLike,
  not,
  and,
  or,
  sql,
  asc,
  desc,
  count,
  sum,
  avg,
  min,
  max,
} from "drizzle-orm";

export type { SQL } from "drizzle-orm";

// Re-export db utilities
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function initDb(connectionString: string) {
  pool = new Pool({ connectionString });
  dbInstance = drizzle(pool);
  return dbInstance;
}

export function getDb() {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return dbInstance;
}

export async function closeDb() {
  if (pool) {
    await pool.end();
    pool = null;
    dbInstance = null;
  }
}

// Lazy db getter for convenience
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  },
});

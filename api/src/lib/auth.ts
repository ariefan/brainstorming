import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import type { Pool } from "pg";

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Auth = ReturnType<typeof createAuth>;

export function createAuth(pool: Pool, baseURL: string) {
  return betterAuth({
    database: {
      type: "postgres",
      pool,
    },
    baseURL,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      organization({
        allowUserToCreateOrganization: true,
      }),
    ],
  });
}

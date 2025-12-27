import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknApiTypeEnum,
  bpjsEnvironmentEnum,
  fullFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";

// ============================================================================
// JKN CONFIGURATION TABLE
// ============================================================================

/**
 * JKN Configs table
 * Unified configuration for all 8 JKN/BPJS Kesehatan APIs
 *
 * Supports: VClaim, Antrean, AntreanFKTP, Apotek, Aplicares, ICare, PCare, RekamMedis
 */
export const jknConfigs = pgTable(
  "jkn_configs",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // API Type - which JKN API this config is for
    apiType: jknApiTypeEnum("api_type").notNull(),

    // Environment
    environment: bpjsEnvironmentEnum("environment").notNull(),

    // API Credentials
    consId: varchar("cons_id", { length: 50 }).notNull(),
    secretKey: varchar("secret_key", { length: 255 }).notNull(),
    userKey: varchar("user_key", { length: 255 }),

    // Facility Codes
    ppkPelayanan: varchar("ppk_pelayanan", { length: 20 }).notNull(),
    ppkBpjs: varchar("ppk_bpjs", { length: 20 }).notNull(),

    // Status
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_config_org_id").on(table.organizationId),
    index("idx_jkn_config_branch_id").on(table.branchId),
    index("idx_jkn_config_api_type").on(table.apiType),
    index("idx_jkn_config_active").on(table.isActive),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknConfigsRelations = relations(jknConfigs, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknConfigs.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknConfigs.branchId],
    references: [organizations.id],
  }),
  createdByUser: one(users, {
    fields: [jknConfigs.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknConfigs.updatedBy],
    references: [users.id],
  }),
}));

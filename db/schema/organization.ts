import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  orgTypeEnum,
  subscriptionPlanEnum,
  BsonResource,
  fullFields,
} from "./core";

// ============================================================================
// ORGANIZATION TABLES
// ============================================================================

/**
 * Organizations table
 * Represents healthcare organizations (clinics, hospitals, polyclinics)
 */
export const organizations = pgTable(
  "organizations",
  {
    ...fullFields,

    // Organization fields
    orgCode: varchar("org_code", { length: 20 }).notNull().unique(),
    orgName: varchar("org_name", { length: 255 }).notNull(),
    orgNameId: varchar("org_name_id", { length: 255 }), // Indonesian name
    orgType: orgTypeEnum("org_type").notNull(),
    description: text("description"),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 10 }),
    country: varchar("country", { length: 100 }).default("Indonesia"),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 255 }),
    website: varchar("website", { length: 255 }),
    npwp: varchar("npwp", { length: 20 }), // Tax ID
    siup: varchar("siup", { length: 50 }), // Business license
    licenseNumber: varchar("license_number", { length: 100 }), // Health facility license
    licenseExpiry: timestamp("license_expiry"),
    satusehatOrgId: varchar("satusehat_org_id", { length: 100 }), // SatuSehat organization ID
    bpjsPpkCode: varchar("bpjs_ppk_code", { length: 20 }), // BPJS facility code
    subscriptionPlan:
      subscriptionPlanEnum("subscription_plan").default("basic"),
    subscriptionStart: timestamp("subscription_start"),
    subscriptionEnd: timestamp("subscription_end"),
    isActive: boolean("is_active").default(true),
    logoUrl: varchar("logo_url", { length: 500 }),
    settings: jsonb("settings").$type<{
      timezone?: string;
      language?: string;
      currency?: string;
      dateFormat?: string;
      timeFormat?: "12h" | "24h";
    }>(),
  },
  (table) => [
    index("idx_org_code").on(table.orgCode),
    index("idx_org_type").on(table.orgType),
    index("idx_satusehat_org_id").on(table.satusehatOrgId),
    index("idx_bpjs_ppk_code").on(table.bpjsPpkCode),
    index("idx_org_active").on(table.isActive),
  ]
);

/**
 * Branches table
 * Represents branches/facilities of an organization
 */
export const branches = pgTable(
  "branches",
  {
    ...fullFields,

    // Branch fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchCode: varchar("branch_code", { length: 20 }).notNull(),
    branchName: varchar("branch_name", { length: 255 }).notNull(),
    branchNameId: varchar("branch_name_id", { length: 255 }), // Indonesian name
    branchType: varchar("branch_type", { length: 50 }).default("main"),
    address: text("address").notNull(),
    city: varchar("city", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 10 }),
    country: varchar("country", { length: 100 }).default("Indonesia"),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 255 }),
    fax: varchar("fax", { length: 20 }),
    latitude: varchar("latitude", { length: 20 }),
    longitude: varchar("longitude", { length: 20 }),
    satusehatLocationId: varchar("satusehat_location_id", { length: 100 }), // SatuSehat location ID
    operatingHours: jsonb("operating_hours").$type<{
      monday?: { open: string; close: string; closed?: boolean };
      tuesday?: { open: string; close: string; closed?: boolean };
      wednesday?: { open: string; close: string; closed?: boolean };
      thursday?: { open: string; close: string; closed?: boolean };
      friday?: { open: string; close: string; closed?: boolean };
      saturday?: { open: string; close: string; closed?: boolean };
      sunday?: { open: string; close: string; closed?: boolean };
    }>(),
    isHeadquarters: boolean("is_headquarters").default(false),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_branch_org_id").on(table.organizationId),
    uniqueIndex("idx_branch_code").on(table.organizationId, table.branchCode),
    index("idx_branch_satusehat_id").on(table.satusehatLocationId),
    index("idx_branch_active").on(table.isActive),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const organizationsRelations = relations(organizations, ({ many }) => ({
  branches: many(branches),
}));

export const branchesRelations = relations(branches, ({ one }) => ({
  organization: one(organizations, {
    fields: [branches.organizationId],
    references: [organizations.id],
  }),
}));

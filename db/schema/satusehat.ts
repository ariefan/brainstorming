import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  satusehatEnvironmentEnum,
  satusehatResourceTypeEnum,
  satusehatOperationEnum,
  satusehatSyncStatusEnum,
  satusehatErrorCategoryEnum,
  satusehatErrorResolutionEnum,
  satusehatConsentScopeEnum,
  satusehatConsentMethodEnum,
  satusehatLookupStatusEnum,
  satusehatVerificationMethodEnum,
  BsonResource,
  fullFields,
  baseFields,
  bsonFields,
  softDeleteFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { practitioners } from "./practitioners";

// ============================================================================
// SATUSEHAT INTEGRATION TABLES
// ============================================================================

/**
 * SatuSehat configs table
 * Represents SatuSehat configuration
 */
export const satusehatConfigs = pgTable(
  "satusehat_configs",
  {
    ...fullFields,

    // Config fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    environment: satusehatEnvironmentEnum("environment").notNull(),
    clientId: varchar("client_id", { length: 100 }).notNull(),
    clientSecret: varchar("client_secret", { length: 255 }).notNull(),
    authUrl: varchar("auth_url", { length: 500 }).notNull(),
    apiUrl: varchar("api_url", { length: 500 }).notNull(),
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => [
    index("idx_satusehat_config_org_id").on(table.organizationId),
    index("idx_satusehat_config_branch_id").on(table.branchId),
    index("idx_satusehat_config_active").on(table.isActive),
  ]
);

/**
 * SatuSehat locations table
 * Represents SatuSehat location mappings
 */
export const satusehatLocations = pgTable(
  "satusehat_locations",
  {
    ...fullFields,

    // Location mapping fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    satusehatLocationId: varchar("satusehat_location_id", { length: 100 })
      .notNull()
      .unique(),
    satusehatLocationName: varchar("satusehat_location_name", {
      length: 255,
    }),
    localLocationId: uuid("local_location_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    lastSyncedAt: timestamp("last_synced_at"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_satusehat_location_org_id").on(table.organizationId),
    index("idx_satusehat_location_branch_id").on(table.branchId),
    uniqueIndex("idx_satusehat_location_satusehat_id").on(
      table.satusehatLocationId
    ),
    index("idx_satusehat_location_local_id").on(table.localLocationId),
  ]
);

/**
 * SatuSehat practitioners table
 * Represents SatuSehat practitioner mappings
 */
export const satusehatPractitioners = pgTable(
  "satusehat_practitioners",
  {
    ...fullFields,

    // Practitioner mapping fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    satusehatIhsId: varchar("satusehat_ihs_id", { length: 100 })
      .notNull()
      .unique(),
    satusehatPractitionerName: varchar("satusehat_practitioner_name", {
      length: 255,
    }),
    localPractitionerId: uuid("local_practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    lastSyncedAt: timestamp("last_synced_at"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_satusehat_practitioner_org_id").on(table.organizationId),
    index("idx_satusehat_practitioner_branch_id").on(table.branchId),
    uniqueIndex("idx_satusehat_practitioner_ihs_id").on(table.satusehatIhsId),
    index("idx_satusehat_practitioner_local_id").on(table.localPractitionerId),
  ]
);

/**
 * Patient IHS lookups table
 * Represents patient IHS lookup cache
 */
export const patientIhsLookups = pgTable(
  "patient_ihs_lookups",
  {
    ...fullFields,

    // Lookup fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    nik: varchar("nik", { length: 16 }).notNull(),
    satusehatIhsId: varchar("satusehat_ihs_id", { length: 100 }),
    satusehatPatientId: uuid("satusehat_patient_id"),
    status: satusehatLookupStatusEnum("status").default("not_found"),
    verificationMethod: satusehatVerificationMethodEnum(
      "verification_method"
    ).notNull(),
    verifiedAt: timestamp("verified_at"),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    lookupAttempts: integer("lookup_attempts").default(0),
    lastLookupAt: timestamp("last_lookup_at"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_patient_ihs_lookup_org_id").on(table.organizationId),
    index("idx_patient_ihs_lookup_branch_id").on(table.branchId),
    index("idx_patient_ihs_lookup_patient_id").on(table.patientId),
    index("idx_patient_ihs_lookup_nik").on(table.nik),
    index("idx_patient_ihs_lookup_status").on(table.status),
  ]
);

/**
 * SatuSehat sync queue table
 * Represents SatuSehat synchronization queue
 */
export const satusehatSyncQueue = pgTable(
  "satusehat_sync_queue",
  {
    ...fullFields,

    // Sync queue fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    resourceType: satusehatResourceTypeEnum("resource_type").notNull(),
    operation: satusehatOperationEnum("operation").notNull(),
    localId: uuid("local_id").notNull(),
    satusehatId: varchar("satusehat_id", { length: 100 }),
    payload: jsonb("payload").$type<Record<string, any>>(),
    status: satusehatSyncStatusEnum("status").default("pending"),
    priority: integer("priority").default(0),
    attempts: integer("attempts").default(0),
    lastAttemptAt: timestamp("last_attempt_at"),
    nextRetryAt: timestamp("next_retry_at"),
    errorMessage: text("error_message"),
    completedAt: timestamp("completed_at"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_satusehat_sync_org_id").on(table.organizationId),
    index("idx_satusehat_sync_branch_id").on(table.branchId),
    index("idx_satusehat_sync_status").on(table.status),
    index("idx_satusehat_sync_priority").on(table.priority),
    index("idx_satusehat_sync_next_retry").on(table.nextRetryAt),
  ]
);

/**
 * SatuSehat error logs table
 * Represents SatuSehat error logs
 */
export const satusehatErrorLogs = pgTable(
  "satusehat_error_logs",
  {
    ...fullFields,

    // Error log fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    resourceType: satusehatResourceTypeEnum("resource_type").notNull(),
    operation: satusehatOperationEnum("operation").notNull(),
    localId: uuid("local_id").notNull(),
    satusehatId: varchar("satusehat_id", { length: 100 }),
    category: satusehatErrorCategoryEnum("category").notNull(),
    statusCode: integer("status_code"),
    errorMessage: text("error_message").notNull(),
    resolution: satusehatErrorResolutionEnum("resolution").default("pending"),
    resolvedAt: timestamp("resolved_at"),
    resolvedBy: uuid("resolved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_satusehat_error_org_id").on(table.organizationId),
    index("idx_satusehat_error_branch_id").on(table.branchId),
    index("idx_satusehat_error_category").on(table.category),
    index("idx_satusehat_error_status_code").on(table.statusCode),
    index("idx_satusehat_error_resolution").on(table.resolution),
    index("idx_satusehat_error_created_at").on(table.createdAt),
  ]
);

/**
 * SatuSehat consents table
 * Represents SatuSehat consent records
 */
export const satusehatConsents = pgTable(
  "satusehat_consents",
  {
    ...fullFields,

    // Consent fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    scope: satusehatConsentScopeEnum("scope").notNull(),
    method: satusehatConsentMethodEnum("method").notNull(),
    consentDate: timestamp("consent_date").notNull(),
    consentedBy: uuid("consented_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    isRevoked: boolean("is_revoked").default(false),
    revokedAt: timestamp("revoked_at"),
    revokedBy: uuid("revoked_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_satusehat_consent_org_id").on(table.organizationId),
    index("idx_satusehat_consent_branch_id").on(table.branchId),
    index("idx_satusehat_consent_patient_id").on(table.patientId),
    index("idx_satusehat_consent_scope").on(table.scope),
    index("idx_satusehat_consent_date").on(table.consentDate),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const satusehatConfigsRelations = relations(
  satusehatConfigs,
  ({ many }) => ({
    locations: many(satusehatLocations),
    practitioners: many(satusehatPractitioners),
  })
);

export const satusehatLocationsRelations = relations(
  satusehatLocations,
  ({ one }) => ({
    config: one(satusehatConfigs, {
      fields: [satusehatLocations.organizationId, satusehatLocations.branchId],
      references: [satusehatConfigs.organizationId, satusehatConfigs.branchId],
    }),
  })
);

export const satusehatPractitionersRelations = relations(
  satusehatPractitioners,
  ({ one }) => ({
    config: one(satusehatConfigs, {
      fields: [
        satusehatPractitioners.organizationId,
        satusehatPractitioners.branchId,
      ],
      references: [satusehatConfigs.organizationId, satusehatConfigs.branchId],
    }),
    practitioner: one(practitioners, {
      fields: [satusehatPractitioners.localPractitionerId],
      references: [practitioners.id],
    }),
  })
);

export const patientIhsLookupsRelations = relations(
  patientIhsLookups,
  ({ one }) => ({
    patient: one(patients, {
      fields: [patientIhsLookups.patientId],
      references: [patients.id],
    }),
    verifiedBy: one(users, {
      fields: [patientIhsLookups.verifiedBy],
      references: [users.id],
    }),
  })
);

export const satusehatSyncQueueRelations = relations(
  satusehatSyncQueue,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [satusehatSyncQueue.organizationId, satusehatSyncQueue.branchId],
      references: [organizations.id, organizations.id],
    }),
  })
);

export const satusehatErrorLogsRelations = relations(
  satusehatErrorLogs,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [satusehatErrorLogs.organizationId, satusehatErrorLogs.branchId],
      references: [organizations.id, organizations.id],
    }),
    resolvedBy: one(users, {
      fields: [satusehatErrorLogs.resolvedBy],
      references: [users.id],
    }),
  })
);

export const satusehatConsentsRelations = relations(
  satusehatConsents,
  ({ one }) => ({
    patient: one(patients, {
      fields: [satusehatConsents.patientId],
      references: [patients.id],
    }),
    consentedBy: one(users, {
      fields: [satusehatConsents.consentedBy],
      references: [users.id],
    }),
    revokedBy: one(users, {
      fields: [satusehatConsents.revokedBy],
      references: [users.id],
    }),
  })
);

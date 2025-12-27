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
} from "./core";
import { organizations } from "./organization";
import { polyclinics } from "./practitioners";
import { practitioners } from "./practitioners";
import { patients } from "./patients";
import { users } from "./users";
import { encounters } from "./medical";

// ============================================================================
// SATUSEHAT FHIR R4 INTEGRATION TABLES
// ============================================================================

/**
 * SatuSehat configurations table
 * Stores OAuth2 credentials and configuration for SatuSehat integration
 */
export const satusehatConfigs = pgTable(
  "satusehat_configs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Configuration fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    clientId: varchar("client_id", { length: 255 }).notNull(), // Encrypted at application level
    clientSecret: varchar("client_secret", { length: 255 }).notNull(), // Encrypted at application level
    environment: satusehatEnvironmentEnum("environment")
      .notNull()
      .default("sandbox"),
    orgSatusehatId: varchar("org_satusehat_id", { length: 100 }).notNull(),
    orgName: varchar("org_name", { length: 255 }),
    currentAccessToken: text("current_access_token"), // Encrypted at application level
    tokenExpiresAt: timestamp("token_expires_at"),
    lastTokenRefresh: timestamp("last_token_refresh"),
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),
    lastError: text("last_error"),
  },
  (table) => [
    index("idx_satusehat_config_org").on(table.organizationId),
    uniqueIndex("idx_satusehat_config_org_unique").on(table.organizationId),
  ]
);

/**
 * SatuSehat locations table
 * Maps polyclinics to SatuSehat Location resources
 */
export const satusehatLocations = pgTable(
  "satusehat_locations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Location mapping fields
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    satusehatLocationId: varchar("satusehat_location_id", {
      length: 100,
    }).notNull(),
    locationName: varchar("location_name", { length: 255 }).notNull(),
    locationType: varchar("location_type", { length: 50 }),
    syncedAt: timestamp("synced_at").notNull(),
    status: satusehatSyncStatusEnum("status").notNull().default("completed"),
  },
  (table) => [
    index("idx_satusehat_location_poli").on(table.polyclinicId),
    uniqueIndex("idx_satusehat_location_poli_unique").on(table.polyclinicId),
    index("idx_satusehat_location_id").on(table.satusehatLocationId),
  ]
);

/**
 * SatuSehat practitioners table
 * Maps practitioners to SatuSehat Practitioner resources
 */
export const satusehatPractitioners = pgTable(
  "satusehat_practitioners",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Practitioner mapping fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    ihsNumber: varchar("ihs_number", { length: 100 }).notNull(), // SatuSehat Practitioner ID
    nik: varchar("nik", { length: 16 }).notNull(),
    practitionerName: varchar("practitioner_name", { length: 255 }).notNull(),
    verifiedAt: timestamp("verified_at").notNull(),
    verificationMethod: satusehatVerificationMethodEnum(
      "verification_method"
    ).notNull(),
    status: satusehatSyncStatusEnum("status").notNull().default("completed"),
  },
  (table) => [
    index("idx_satusehat_pract_local").on(table.practitionerId),
    uniqueIndex("idx_satusehat_pract_local_unique").on(table.practitionerId),
    index("idx_satusehat_pract_ihs").on(table.ihsNumber),
    index("idx_satusehat_pract_nik").on(table.nik),
  ]
);

/**
 * Patient IHS lookups table
 * Tracks patient IHS lookups from SatuSehat
 */
export const patientIhsLookups = pgTable(
  "patient_ihs_lookups",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Patient IHS lookup fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    nik: varchar("nik", { length: 16 }).notNull(),
    lookupStatus: satusehatLookupStatusEnum("lookup_status").notNull(),
    ihsPatientId: varchar("ihs_patient_id", { length: 100 }),
    ihsPatientData: jsonb("ihs_patient_data").$type<{
      name?: string;
      gender?: string;
      birthDate?: string;
      address?: string;
    }>(),
    registrationRequired: boolean("registration_required").default(false),
    registrationInstructions: text("registration_instructions"),
    searchedAt: timestamp("searched_at").notNull(),
    searchedBy: uuid("searched_by").references(() => users.id, {
      onDelete: "set null",
    }),
  },
  (table) => [
    index("idx_patient_ihs_patient").on(table.patientId),
    index("idx_patient_ihs_nik").on(table.nik),
    index("idx_patient_ihs_status").on(table.lookupStatus),
  ]
);

/**
 * SatuSehat sync queue table
 * Queue for syncing resources to SatuSehat
 */
export const satusehatSyncQueue = pgTable(
  "satusehat_sync_queue",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Sync queue fields
    resourceType: satusehatResourceTypeEnum("resource_type").notNull(),
    resourceId: uuid("resource_id").notNull(),
    operation: satusehatOperationEnum("operation").notNull(),
    fhirResource: jsonb("fhir_resource").$type<Record<string, any>>(), // FHIR resource payload
    dependsOn: jsonb("depends_on").$type<string[]>(), // Array of queue IDs that must complete first
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }), // Group by encounter
    status: satusehatSyncStatusEnum("status").notNull().default("pending"),
    priority: integer("priority").default(0),
    retryCount: integer("retry_count").default(0),
    maxRetries: integer("max_retries").default(3),
    nextRetryAt: timestamp("next_retry_at"),
    satusehatId: varchar("satusehat_id", { length: 100 }),
    responseStatus: integer("response_status"),
    responseBody: jsonb("response_body").$type<Record<string, any>>(),
    errorMessage: text("error_message"),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
  },
  (table) => [
    index("idx_sync_queue_status").on(table.status),
    index("idx_sync_queue_encounter").on(table.encounterId),
    index("idx_sync_queue_resource").on(table.resourceType, table.resourceId),
    index("idx_sync_queue_retry").on(table.status, table.nextRetryAt),
    index("idx_sync_queue_priority").on(table.priority, table.status),
  ]
);

/**
 * SatuSehat error logs table
 * Logs errors from SatuSehat API calls
 */
export const satusehatErrorLogs = pgTable(
  "satusehat_error_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Error log fields
    syncQueueId: uuid("sync_queue_id").references(() => satusehatSyncQueue.id, {
      onDelete: "set null",
    }),
    resourceType: varchar("resource_type", { length: 50 }).notNull(),
    resourceId: varchar("resource_id", { length: 100 }).notNull(),
    operation: varchar("operation", { length: 20 }).notNull(),
    errorCategory: satusehatErrorCategoryEnum("error_category").notNull(),
    httpStatus: integer("http_status"),
    errorCode: varchar("error_code", { length: 50 }),
    errorMessage: text("error_message").notNull(),
    errorDetails: jsonb("error_details").$type<Record<string, any>>(),
    requestUrl: varchar("request_url", { length: 500 }),
    requestBody: jsonb("request_body").$type<Record<string, any>>(),
    responseBody: jsonb("response_body").$type<Record<string, any>>(),
    resolutionStatus: satusehatErrorResolutionEnum("resolution_status")
      .notNull()
      .default("pending"),
    resolutionNotes: text("resolution_notes"),
    resolvedBy: uuid("resolved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    resolvedAt: timestamp("resolved_at"),
    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => [
    index("idx_error_log_queue").on(table.syncQueueId),
    index("idx_error_log_category").on(table.errorCategory),
    index("idx_error_log_status").on(table.resolutionStatus),
    index("idx_error_log_timestamp").on(table.timestamp),
  ]
);

/**
 * SatuSehat consents table
 * Tracks patient consent for data sharing with SatuSehat
 */
export const satusehatConsents = pgTable(
  "satusehat_consents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Consent fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    consentGiven: boolean("consent_given").notNull(),
    consentScope: satusehatConsentScopeEnum("consent_scope").notNull(),
    consentDatetime: timestamp("consent_datetime").notNull(),
    consentMethod: satusehatConsentMethodEnum("consent_method").notNull(),
    witnessedBy: uuid("witnessed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    consentDocumentUrl: varchar("consent_document_url", { length: 500 }),
    validFrom: timestamp("valid_from").notNull(),
    validUntil: timestamp("valid_until"),
    revoked: boolean("revoked").default(false),
    revokedAt: timestamp("revoked_at"),
    revokedReason: text("revoked_reason"),
  },
  (table) => [
    index("idx_consent_patient").on(table.patientId),
    index("idx_consent_valid").on(table.validFrom, table.validUntil),
    index("idx_consent_revoked").on(table.revoked),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const satusehatConfigsRelations = relations(
  satusehatConfigs,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [satusehatConfigs.organizationId],
      references: [organizations.id],
    }),
  })
);

export const satusehatLocationsRelations = relations(
  satusehatLocations,
  ({ one }) => ({
    polyclinic: one(polyclinics, {
      fields: [satusehatLocations.polyclinicId],
      references: [polyclinics.id],
    }),
  })
);

export const satusehatPractitionersRelations = relations(
  satusehatPractitioners,
  ({ one }) => ({
    practitioner: one(practitioners, {
      fields: [satusehatPractitioners.practitionerId],
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
    searchedByUser: one(users, {
      fields: [patientIhsLookups.searchedBy],
      references: [users.id],
    }),
  })
);

export const satusehatSyncQueueRelations = relations(
  satusehatSyncQueue,
  ({ one, many }) => ({
    encounter: one(encounters, {
      fields: [satusehatSyncQueue.encounterId],
      references: [encounters.id],
    }),
    errorLogs: many(satusehatErrorLogs),
  })
);

export const satusehatErrorLogsRelations = relations(
  satusehatErrorLogs,
  ({ one }) => ({
    syncQueue: one(satusehatSyncQueue, {
      fields: [satusehatErrorLogs.syncQueueId],
      references: [satusehatSyncQueue.id],
    }),
    resolvedByUser: one(users, {
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
    witnessedByUser: one(users, {
      fields: [satusehatConsents.witnessedBy],
      references: [users.id],
    }),
  })
);

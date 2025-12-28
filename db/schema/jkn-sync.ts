import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknApiTypeEnum,
  jknSyncStatusEnum,
  jknSyncResourceTypeEnum,
  jknSyncOperationEnum,
  jknErrorCategoryEnum,
  jknErrorResolutionEnum,
  webhookStatusEnum,
  webhookSourceEnum,
  fullFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";

// ============================================================================
// JKN SYNC QUEUE TABLES
// ============================================================================
// Unified sync queue for all 8 JKN/BPJS APIs
// Follows the SatuSehat sync queue pattern for consistency
// ============================================================================

/**
 * JKN Sync Queue table
 * Unified queue for all JKN API operations
 *
 * Supports all 8 JKN APIs:
 * - VClaim (SEP, Rujukan, Peserta, INACBG, Monitoring Klaim)
 * - PRB (Program Rujuk Balik)
 * - Rencana Kontrol (Surat Kontrol)
 * - LPK (Lembar Pengajuan Klaim)
 * - Antrean FKRTL (Hospital Queue)
 * - Antrean FKTP (Primary Care Queue)
 * - Apotek (Pharmacy Integration)
 * - Aplicares (Bed Availability)
 * - ICare (JKN Mobile Integration)
 * - Rekam Medis (Medical Records)
 */
export const jknSyncQueue = pgTable(
  "jkn_sync_queue",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // API Classification
    apiType: jknApiTypeEnum("api_type").notNull(),
    resourceType: jknSyncResourceTypeEnum("resource_type").notNull(),
    operation: jknSyncOperationEnum("operation").notNull(),

    // Resource References
    localId: uuid("local_id").notNull(),
    externalId: varchar("external_id", { length: 100 }), // noSep, noRujukan, etc.

    // Payload Data
    requestPayload: jsonb("request_payload").$type<Record<string, any>>(),
    responsePayload: jsonb("response_payload").$type<Record<string, any>>(),

    // Status & Processing
    status: jknSyncStatusEnum("status").default("pending"),
    priority: integer("priority").default(0), // Higher = more urgent
    attempts: integer("attempts").default(0),
    maxAttempts: integer("max_attempts").default(3),
    lastAttemptAt: timestamp("last_attempt_at"),
    nextRetryAt: timestamp("next_retry_at"),

    // Retry Backoff Configuration
    baseRetryDelayMs: integer("base_retry_delay_ms").default(60000), // 1 minute base delay
    retryBackoffMultiplier: integer("retry_backoff_multiplier").default(2), // Exponential backoff

    // Error Tracking
    errorCode: varchar("error_code", { length: 20 }),
    errorMessage: text("error_message"),

    // Completion
    completedAt: timestamp("completed_at"),

    // Tracing
    correlationId: varchar("correlation_id", { length: 50 }),

    notes: text("notes"),
  },
  (table) => [
    // Queue polling index - critical for performance
    index("idx_jkn_sync_queue_poll").on(
      table.status,
      table.nextRetryAt,
      table.priority
    ),
    // Resource lookup
    index("idx_jkn_sync_queue_resource").on(
      table.localId,
      table.resourceType,
      table.status
    ),
    // Organization filtering
    index("idx_jkn_sync_queue_org_id").on(table.organizationId),
    index("idx_jkn_sync_queue_branch_id").on(table.branchId),
    // API type filtering
    index("idx_jkn_sync_queue_api_type").on(table.apiType),
    // External ID lookup
    index("idx_jkn_sync_queue_external_id").on(table.externalId),
    // Correlation tracking
    index("idx_jkn_sync_queue_correlation").on(table.correlationId),
  ]
);

/**
 * JKN Error Logs table
 * Detailed error tracking for all JKN API operations
 * Follows SatuSehat error logs pattern
 */
export const jknErrorLogs = pgTable(
  "jkn_error_logs",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // API Classification
    apiType: jknApiTypeEnum("api_type").notNull(),
    resourceType: jknSyncResourceTypeEnum("resource_type").notNull(),
    operation: jknSyncOperationEnum("operation").notNull(),

    // Resource References
    localId: uuid("local_id"),
    externalId: varchar("external_id", { length: 100 }),

    // Queue Reference (optional)
    syncQueueId: uuid("sync_queue_id").references(() => jknSyncQueue.id, {
      onDelete: "set null",
    }),

    // Error Details
    category: jknErrorCategoryEnum("category").notNull(),
    statusCode: integer("status_code"),
    errorCode: varchar("error_code", { length: 20 }),
    errorMessage: text("error_message").notNull(),
    stackTrace: text("stack_trace"),

    // Request/Response for debugging
    requestPayload: jsonb("request_payload").$type<Record<string, any>>(),
    responsePayload: jsonb("response_payload").$type<Record<string, any>>(),

    // Resolution Tracking
    resolution: jknErrorResolutionEnum("resolution").default("pending"),
    resolvedAt: timestamp("resolved_at"),
    resolvedBy: uuid("resolved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    resolutionNotes: text("resolution_notes"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_error_logs_org_id").on(table.organizationId),
    index("idx_jkn_error_logs_branch_id").on(table.branchId),
    index("idx_jkn_error_logs_api_type").on(table.apiType),
    index("idx_jkn_error_logs_category").on(table.category),
    index("idx_jkn_error_logs_status_code").on(table.statusCode),
    index("idx_jkn_error_logs_resolution").on(table.resolution),
    index("idx_jkn_error_logs_sync_queue_id").on(table.syncQueueId),
    index("idx_jkn_error_logs_created_at").on(table.createdAt),
  ]
);

/**
 * JKN Webhooks table
 * Stores incoming webhook events from JKN/BPJS APIs
 * (e.g., claim status updates, antrean notifications)
 */
export const jknWebhooks = pgTable(
  "jkn_webhooks",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Webhook Identification
    webhookId: varchar("webhook_id", { length: 100 }).notNull().unique(),
    source: webhookSourceEnum("source").notNull(),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    apiType: jknApiTypeEnum("api_type").notNull(),
    resourceType: jknSyncResourceTypeEnum("resource_type"),
    externalId: varchar("external_id", { length: 100 }), // noSep, noRujukan, etc.

    // Webhook Data
    headers: jsonb("headers").$type<Record<string, string>>(),
    payload: jsonb("payload").$type<Record<string, any>>().notNull(),

    // Processing Status
    status: webhookStatusEnum("status").default("received"),
    processedAt: timestamp("processed_at"),
    processingError: text("processing_error"),

    // Correlation to local resources
    localResourceId: uuid("local_resource_id"),
    syncQueueId: uuid("sync_queue_id").references(() => jknSyncQueue.id, {
      onDelete: "set null",
    }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_webhook_org_id").on(table.organizationId),
    index("idx_jkn_webhook_branch_id").on(table.branchId),
    uniqueIndex("idx_jkn_webhook_id").on(table.webhookId),
    index("idx_jkn_webhook_source").on(table.source),
    index("idx_jkn_webhook_api_type").on(table.apiType),
    index("idx_jkn_webhook_event_type").on(table.eventType),
    index("idx_jkn_webhook_status").on(table.status),
    index("idx_jkn_webhook_created_at").on(table.createdAt),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknSyncQueueRelations = relations(jknSyncQueue, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknSyncQueue.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknSyncQueue.branchId],
    references: [organizations.id],
  }),
}));

export const jknErrorLogsRelations = relations(jknErrorLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknErrorLogs.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknErrorLogs.branchId],
    references: [organizations.id],
  }),
  syncQueue: one(jknSyncQueue, {
    fields: [jknErrorLogs.syncQueueId],
    references: [jknSyncQueue.id],
  }),
  resolvedByUser: one(users, {
    fields: [jknErrorLogs.resolvedBy],
    references: [users.id],
  }),
}));

export const jknWebhooksRelations = relations(jknWebhooks, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknWebhooks.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknWebhooks.branchId],
    references: [organizations.id],
  }),
  syncQueue: one(jknSyncQueue, {
    fields: [jknWebhooks.syncQueueId],
    references: [jknSyncQueue.id],
  }),
}));

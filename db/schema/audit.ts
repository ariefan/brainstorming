import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  index,
  inet,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { baseFields, auditResourceTypeEnum } from "./core";
import { organizations } from "./organization";
import { users } from "./users";

// ============================================================================
// COMPLIANCE & SECURITY TABLES
// ============================================================================
// Additional audit tables for PHI access tracking and login security
// Note: Main auditLogs table is in users.ts
// ============================================================================

/**
 * Data Access Logs table
 * Specifically tracks PHI (Protected Health Information) access
 * Required for HIPAA compliance and patient data protection
 */
export const dataAccessLogs = pgTable(
  "data_access_logs",
  {
    ...baseFields,

    // Multi-tenant
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Who accessed
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    userRole: varchar("user_role", { length: 50 }).notNull(),

    // What was accessed (patient data)
    patientId: uuid("patient_id").notNull(),
    resourceType: auditResourceTypeEnum("resource_type").notNull(),
    resourceId: uuid("resource_id"),

    // Access details
    accessReason: varchar("access_reason", { length: 255 }),
    emergencyAccess: varchar("emergency_access", { length: 5 }).default(
      "false"
    ),

    // Request context
    ipAddress: inet("ip_address"),
    sessionId: varchar("session_id", { length: 100 }),

    // Tracking
    accessedAt: timestamp("accessed_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_data_access_logs_org_id").on(table.organizationId),
    index("idx_data_access_logs_user_id").on(table.userId),
    index("idx_data_access_logs_patient_id").on(table.patientId),
    index("idx_data_access_logs_accessed_at").on(table.accessedAt),
    // Composite for patient access history
    index("idx_data_access_logs_patient_time").on(
      table.patientId,
      table.accessedAt
    ),
    // Emergency access monitoring
    index("idx_data_access_logs_emergency").on(table.emergencyAccess),
  ]
);

/**
 * Login Attempts table
 * Tracks all authentication attempts for security monitoring
 */
export const loginAttempts = pgTable(
  "login_attempts",
  {
    ...baseFields,

    // Multi-tenant (optional - system-wide logins may not have org)
    organizationId: uuid("organization_id").references(() => organizations.id, {
      onDelete: "cascade",
    }),

    // Attempt details
    email: varchar("email", { length: 255 }).notNull(),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    successful: varchar("successful", { length: 5 }).notNull(), // "true" or "false"
    failureReason: varchar("failure_reason", { length: 100 }),

    // Request context
    ipAddress: inet("ip_address").notNull(),
    userAgent: text("user_agent"),
    location: varchar("location", { length: 255 }),

    // Security flags
    suspiciousActivity: varchar("suspicious_activity", { length: 5 }).default(
      "false"
    ),
    mfaUsed: varchar("mfa_used", { length: 5 }).default("false"),

    attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_login_attempts_email").on(table.email),
    index("idx_login_attempts_user_id").on(table.userId),
    index("idx_login_attempts_ip").on(table.ipAddress),
    index("idx_login_attempts_time").on(table.attemptedAt),
    index("idx_login_attempts_success").on(table.successful),
    // Failed login monitoring
    index("idx_login_attempts_failed").on(
      table.email,
      table.successful,
      table.attemptedAt
    ),
    index("idx_login_attempts_suspicious").on(table.suspiciousActivity),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const dataAccessLogsRelations = relations(dataAccessLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [dataAccessLogs.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [dataAccessLogs.branchId],
    references: [organizations.id],
    relationName: "dataAccessLogBranch",
  }),
  user: one(users, {
    fields: [dataAccessLogs.userId],
    references: [users.id],
  }),
}));

export const loginAttemptsRelations = relations(loginAttempts, ({ one }) => ({
  organization: one(organizations, {
    fields: [loginAttempts.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [loginAttempts.userId],
    references: [users.id],
  }),
}));

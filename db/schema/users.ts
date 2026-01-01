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
  roleEnum,
  genderEnum,
  userStatusEnum,
  BsonResource,
  fullFields,
  baseFields,
  bsonFields,
  softDeleteFields,
} from "./core";
import { organizations, branches } from "./organization";

// ============================================================================
// USER ACCESS MANAGEMENT TABLES
// ============================================================================

/**
 * Users table
 * Represents system users
 */
export const users = pgTable(
  "users",
  {
    ...fullFields,

    // User fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    passwordSalt: varchar("password_salt", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstNameId: varchar("first_name_id", { length: 100 }), // Indonesian name
    lastNameId: varchar("last_name_id", { length: 100 }),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    gender: genderEnum("gender"),
    dateOfBirth: timestamp("date_of_birth"),
    phone: varchar("phone", { length: 20 }),
    mobile: varchar("mobile", { length: 20 }),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    role: roleEnum("role").notNull(),
    status: userStatusEnum("status").default("active"),
    isEmailVerified: boolean("is_email_verified").default(false),
    isPhoneVerified: boolean("is_phone_verified").default(false),
    lastLoginAt: timestamp("last_login_at"),
    lastLoginIp: varchar("last_login_ip", { length: 50 }),
    failedLoginAttempts: varchar("failed_login_attempts", {
      length: 3,
    }).default("0"),
    lockedUntil: timestamp("locked_until"),
    mfaEnabled: boolean("mfa_enabled").default(false),
    mfaSecret: varchar("mfa_secret", { length: 255 }),
    mfaBackupCodes: jsonb("mfa_backup_codes").$type<string[]>(),
    preferences: jsonb("preferences").$type<{
      language?: string;
      timezone?: string;
      theme?: "light" | "dark" | "auto";
      notifications?: {
        email?: boolean;
        sms?: boolean;
        push?: boolean;
      };
    }>(),
    practitionerId: uuid("practitioner_id"), // Link to practitioner if applicable
  },
  (table) => [
    index("idx_user_org_id").on(table.organizationId),
    index("idx_user_branch_id").on(table.branchId),
    uniqueIndex("idx_user_username").on(table.username),
    uniqueIndex("idx_user_email").on(table.email),
    index("idx_user_role").on(table.role),
    index("idx_user_status").on(table.status),
    index("idx_user_practitioner_id").on(table.practitionerId),
  ]
);

/**
 * User invitations table
 * Represents pending user invitations
 */
export const userInvitations = pgTable(
  "user_invitations",
  {
    ...fullFields,

    // Invitation fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    email: varchar("email", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstNameId: varchar("first_name_id", { length: 100 }),
    lastNameId: varchar("last_name_id", { length: 100 }),
    role: roleEnum("role").notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    acceptedAt: timestamp("accepted_at"),
    status: varchar("status", { length: 20 }).default("pending"), // pending, accepted, expired, cancelled
    message: text("message"),
  },
  (table) => [
    index("idx_invitation_org_id").on(table.organizationId),
    index("idx_invitation_branch_id").on(table.branchId),
    index("idx_invitation_email").on(table.email),
    uniqueIndex("idx_invitation_token").on(table.token),
    index("idx_invitation_status").on(table.status),
    index("idx_invitation_expires_at").on(table.expiresAt),
  ]
);

/**
 * User sessions table
 * Represents active user sessions
 */
export const userSessions = pgTable(
  "user_sessions",
  {
    ...baseFields,
    ...bsonFields,
    ...softDeleteFields,

    // Session fields
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    token: varchar("token", { length: 500 }).notNull().unique(),
    refreshToken: varchar("refresh_token", { length: 500 }).unique(),
    deviceType: varchar("device_type", { length: 50 }),
    deviceName: varchar("device_name", { length: 255 }),
    browser: varchar("browser", { length: 100 }),
    os: varchar("os", { length: 100 }),
    ipAddress: varchar("ip_address", { length: 50 }),
    userAgent: text("user_agent"),
    location: jsonb("location").$type<{
      country?: string;
      city?: string;
      latitude?: number;
      longitude?: number;
    }>(),
    expiresAt: timestamp("expires_at").notNull(),
    lastActivityAt: timestamp("last_activity_at").defaultNow(),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_session_user_id").on(table.userId),
    index("idx_session_org_id").on(table.organizationId),
    index("idx_session_branch_id").on(table.branchId),
    uniqueIndex("idx_session_token").on(table.token),
    uniqueIndex("idx_session_refresh_token").on(table.refreshToken),
    index("idx_session_expires_at").on(table.expiresAt),
    index("idx_session_active").on(table.isActive),
  ]
);

/**
 * User branches table
 * Represents branch access for users
 */
export const userBranches = pgTable(
  "user_branches",
  {
    ...fullFields,

    // User-branch assignment fields
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => branches.id, { onDelete: "cascade" }),
    isPrimary: boolean("is_primary").default(false),
    permissions: jsonb("permissions").$type<{
      canView?: boolean;
      canEdit?: boolean;
      canDelete?: boolean;
      canApprove?: boolean;
      customPermissions?: string[];
    }>(),
  },
  (table) => [
    index("idx_user_branch_user_id").on(table.userId),
    index("idx_user_branch_branch_id").on(table.branchId),
    uniqueIndex("idx_user_branch_unique").on(table.userId, table.branchId),
    index("idx_user_branch_primary").on(table.isPrimary),
  ]
);

/**
 * Audit logs table
 * Represents system activity logs
 */
export const auditLogs = pgTable(
  "audit_logs",
  {
    ...baseFields,
    ...bsonFields,

    // Audit fields
    organizationId: uuid("organization_id").references(() => organizations.id, {
      onDelete: "cascade",
    }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    action: varchar("action", { length: 100 }).notNull(),
    entityType: varchar("entity_type", { length: 100 }).notNull(),
    entityId: uuid("entity_id"),
    changes: jsonb("changes").$type<{
      before?: Record<string, any>;
      after?: Record<string, any>;
      fields?: string[];
    }>(),
    ipAddress: varchar("ip_address", { length: 50 }),
    userAgent: text("user_agent"),
    metadata: jsonb("metadata").$type<Record<string, any>>(),
  },
  (table) => [
    index("idx_audit_org_id").on(table.organizationId),
    index("idx_audit_branch_id").on(table.branchId),
    index("idx_audit_user_id").on(table.userId),
    index("idx_audit_action").on(table.action),
    index("idx_audit_entity_type").on(table.entityType),
    index("idx_audit_entity_id").on(table.entityId),
    index("idx_audit_created_at").on(table.createdAt),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(userSessions),
  userBranches: many(userBranches),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export const userBranchesRelations = relations(userBranches, ({ one }) => ({
  user: one(users, {
    fields: [userBranches.userId],
    references: [users.id],
  }),
}));

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknIcareTypeEnum,
  jknIcareStatusEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";

// ============================================================================
// JKN ICARE (IDENTITY VERIFICATION) TABLES
// ============================================================================

/**
 * JKN ICare Verification table
 * Patient identity verification logs
 *
 * Related API: ICare
 * Endpoints: /ICare/validate/fkrtl, /ICare/validate/fktp
 */
export const jknIcareVerification = pgTable(
  "jkn_icare_verification",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Patient
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // Verification Type
    type: jknIcareTypeEnum("type").notNull(), // FKRTL or FKTP

    // Patient Identifiers
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),

    // Doctor Info (required for FKRTL)
    kdDokter: varchar("kd_dokter", { length: 20 }),
    nmDokter: varchar("nm_dokter", { length: 100 }),

    // Facility Info
    kdFaskes: varchar("kd_faskes", { length: 20 }).notNull(),
    nmFaskes: varchar("nm_faskes", { length: 200 }),

    // Verification Result
    status: jknIcareStatusEnum("status").notNull(),
    validationUrl: text("validation_url"), // URL for identity verification

    // Response Data
    responseCode: varchar("response_code", { length: 10 }),
    responseMessage: text("response_message"),

    // Timestamp
    verifiedAt: timestamp("verified_at").defaultNow().notNull(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_icare_verification_org_id").on(table.organizationId),
    index("idx_jkn_icare_verification_branch_id").on(table.branchId),
    index("idx_jkn_icare_verification_patient_id").on(table.patientId),
    index("idx_jkn_icare_verification_type").on(table.type),
    index("idx_jkn_icare_verification_status").on(table.status),
    index("idx_jkn_icare_verification_no_kartu").on(table.noKartu),
    index("idx_jkn_icare_verification_nik").on(table.nik),
    index("idx_jkn_icare_verification_verified_at").on(table.verifiedAt),
  ]
);

/**
 * JKN ICare Session table
 * Verification session tracking for audit trail
 *
 * Related API: ICare
 */
export const jknIcareSession = pgTable(
  "jkn_icare_session",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Verification Reference
    verificationId: uuid("verification_id")
      .notNull()
      .references(() => jknIcareVerification.id, { onDelete: "cascade" }),

    // Session Info
    sessionId: varchar("session_id", { length: 100 }).notNull(),
    sessionToken: varchar("session_token", { length: 255 }),

    // Session Timeline
    sessionStarted: timestamp("session_started").defaultNow().notNull(),
    sessionEnded: timestamp("session_ended"),
    duration: varchar("duration", { length: 20 }), // Duration in seconds

    // User Agent Info
    userAgent: text("user_agent"),
    ipAddress: varchar("ip_address", { length: 50 }),

    // Verification Details
    verificationMethod: varchar("verification_method", { length: 50 }), // fingerprint, face, etc.
    verificationScore: varchar("verification_score", { length: 10 }), // Confidence score

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_icare_session_org_id").on(table.organizationId),
    index("idx_jkn_icare_session_branch_id").on(table.branchId),
    index("idx_jkn_icare_session_verification_id").on(table.verificationId),
    index("idx_jkn_icare_session_session_id").on(table.sessionId),
    index("idx_jkn_icare_session_started").on(table.sessionStarted),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknIcareVerificationRelations = relations(
  jknIcareVerification,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknIcareVerification.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknIcareVerification.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknIcareVerification.patientId],
      references: [patients.id],
    }),
    sessions: many(jknIcareSession),
    createdByUser: one(users, {
      fields: [jknIcareVerification.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknIcareVerification.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknIcareSessionRelations = relations(
  jknIcareSession,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknIcareSession.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknIcareSession.branchId],
      references: [organizations.id],
    }),
    verification: one(jknIcareVerification, {
      fields: [jknIcareSession.verificationId],
      references: [jknIcareVerification.id],
    }),
    createdByUser: one(users, {
      fields: [jknIcareSession.createdBy],
      references: [users.id],
    }),
  })
);

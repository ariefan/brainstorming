import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknRekamMedisStatusEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { encounters } from "./medical";

// ============================================================================
// JKN REKAM MEDIS (ELECTRONIC MEDICAL RECORDS) TABLES
// ============================================================================

/**
 * JKN Rekam Medis FHIR table
 * FHIR R4 medical record bundle submissions to BPJS
 *
 * Related API: Rekam Medis
 * Endpoints: /erekammedis/insertV2
 */
export const jknRekamMedisFhir = pgTable(
  "jkn_rekam_medis_fhir",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Patient & Encounter
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),

    // Bundle Identifier
    bundleId: varchar("bundle_id", { length: 100 }).notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),

    // FHIR Bundle (compressed with GZIP, encrypted with AES-256-CBC)
    fhirBundle: jsonb("fhir_bundle").$type<{
      resourceType: "Bundle";
      type: "document" | "collection";
      timestamp?: string;
      entry?: Array<{
        fullUrl?: string;
        resource: any; // FHIR R4 resources
      }>;
    }>(),

    // Bundle Metadata
    bundleType: varchar("bundle_type", { length: 50 }), // document, collection
    resourceCount: varchar("resource_count", { length: 10 }), // Number of resources in bundle

    // Submission Info
    submissionId: varchar("submission_id", { length: 100 }),
    submittedAt: timestamp("submitted_at"),

    // Response from API
    responseCode: varchar("response_code", { length: 10 }),
    responseMessage: text("response_message"),

    // Status
    status: jknRekamMedisStatusEnum("status").default("pending"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_rekam_medis_fhir_org_id").on(table.organizationId),
    index("idx_jkn_rekam_medis_fhir_branch_id").on(table.branchId),
    index("idx_jkn_rekam_medis_fhir_patient_id").on(table.patientId),
    index("idx_jkn_rekam_medis_fhir_encounter_id").on(table.encounterId),
    index("idx_jkn_rekam_medis_fhir_bundle_id").on(table.bundleId),
    index("idx_jkn_rekam_medis_fhir_status").on(table.status),
    index("idx_jkn_rekam_medis_fhir_submitted_at").on(table.submittedAt),
    uniqueIndex("uk_jkn_rekam_medis_fhir_bundle_id").on(table.bundleId),
  ]
);

/**
 * JKN Rekam Medis Submission table
 * Submission tracking for medical record bundles
 *
 * Related API: Rekam Medis
 */
export const jknRekamMedisSubmission = pgTable(
  "jkn_rekam_medis_submission",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // FHIR Bundle Reference
    fhirId: uuid("fhir_id")
      .notNull()
      .references(() => jknRekamMedisFhir.id, { onDelete: "cascade" }),

    // Submission Attempt Info
    attemptNumber: varchar("attempt_number", { length: 5 }).default("1"),
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),

    // Response
    httpStatus: varchar("http_status", { length: 10 }),
    responseCode: varchar("response_code", { length: 10 }),
    responseMessage: text("response_message"),
    responseData: jsonb("response_data"),

    // Status
    status: jknRekamMedisStatusEnum("status").notNull(),

    // Error Info
    errorType: varchar("error_type", { length: 50 }),
    errorDetails: text("error_details"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_rekam_medis_submission_org_id").on(table.organizationId),
    index("idx_jkn_rekam_medis_submission_branch_id").on(table.branchId),
    index("idx_jkn_rekam_medis_submission_fhir_id").on(table.fhirId),
    index("idx_jkn_rekam_medis_submission_status").on(table.status),
    index("idx_jkn_rekam_medis_submission_submitted_at").on(
      table.submittedAt
    ),
  ]
);

/**
 * JKN Rekam Medis Validation table
 * Validation error tracking for medical records
 *
 * Related API: Rekam Medis
 */
export const jknRekamMedisValidation = pgTable(
  "jkn_rekam_medis_validation",
  {
    ...fullFields,

    // FHIR Bundle Reference
    fhirId: uuid("fhir_id")
      .notNull()
      .references(() => jknRekamMedisFhir.id, { onDelete: "cascade" }),

    // Submission Reference (if error occurred during submission)
    submissionId: uuid("submission_id").references(
      () => jknRekamMedisSubmission.id,
      { onDelete: "set null" }
    ),

    // Validation Error Info
    errorType: varchar("error_type", { length: 50 }).notNull(), // schema, business_rule, reference, etc.
    errorSeverity: varchar("error_severity", { length: 20 }).notNull(), // error, warning, info
    errorCode: varchar("error_code", { length: 20 }),
    errorMessage: text("error_message").notNull(),

    // Location in Bundle
    resourceType: varchar("resource_type", { length: 50 }), // Which FHIR resource type
    resourcePath: varchar("resource_path", { length: 255 }), // JSONPath to the error location
    fieldName: varchar("field_name", { length: 100 }), // Field that caused error

    // Resolution
    isResolved: varchar("is_resolved", { length: 5 }).default("false"),
    resolvedAt: timestamp("resolved_at"),
    resolutionNotes: text("resolution_notes"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_rekam_medis_validation_fhir_id").on(table.fhirId),
    index("idx_jkn_rekam_medis_validation_submission_id").on(
      table.submissionId
    ),
    index("idx_jkn_rekam_medis_validation_error_type").on(table.errorType),
    index("idx_jkn_rekam_medis_validation_severity").on(table.errorSeverity),
    index("idx_jkn_rekam_medis_validation_resolved").on(table.isResolved),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknRekamMedisFhirRelations = relations(
  jknRekamMedisFhir,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknRekamMedisFhir.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRekamMedisFhir.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknRekamMedisFhir.patientId],
      references: [patients.id],
    }),
    encounter: one(encounters, {
      fields: [jknRekamMedisFhir.encounterId],
      references: [encounters.id],
    }),
    submissions: many(jknRekamMedisSubmission),
    validations: many(jknRekamMedisValidation),
    createdByUser: one(users, {
      fields: [jknRekamMedisFhir.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRekamMedisFhir.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRekamMedisSubmissionRelations = relations(
  jknRekamMedisSubmission,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknRekamMedisSubmission.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRekamMedisSubmission.branchId],
      references: [organizations.id],
    }),
    fhir: one(jknRekamMedisFhir, {
      fields: [jknRekamMedisSubmission.fhirId],
      references: [jknRekamMedisFhir.id],
    }),
    validations: many(jknRekamMedisValidation),
    createdByUser: one(users, {
      fields: [jknRekamMedisSubmission.createdBy],
      references: [users.id],
    }),
  })
);

export const jknRekamMedisValidationRelations = relations(
  jknRekamMedisValidation,
  ({ one }) => ({
    fhir: one(jknRekamMedisFhir, {
      fields: [jknRekamMedisValidation.fhirId],
      references: [jknRekamMedisFhir.id],
    }),
    submission: one(jknRekamMedisSubmission, {
      fields: [jknRekamMedisValidation.submissionId],
      references: [jknRekamMedisSubmission.id],
    }),
  })
);

import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  integer,
  numeric,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  accreditationBodyEnum,
  accreditationLevelEnum,
  accreditationStatusEnum,
  qualityIndicatorCategoryEnum,
  incidentSeverityEnum,
  incidentStatusEnum,
  clinicalAuditStatusEnum,
  clinicalAuditTypeEnum,
  credentialTypeEnum,
  credentialStatusEnum,
  documentControlStatusEnum,
  documentControlTypeEnum,
  infectionControlCategoryEnum,
  infectionSurveillanceStatusEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { practitioners } from "./practitioners";
import { encounters } from "./medical";

// ============================================================================
// INDONESIAN CLINIC ACCREDITATION TABLES
// ============================================================================
// Supports SNARS (hospital), KARS, and Kemenkes (clinic/puskesmas) accreditation
// Includes quality indicators, patient safety, clinical audits, credentials, PPI
// ============================================================================

/**
 * Accreditation Standards table
 * Tracks accreditation requirements and compliance status
 */
export const accreditationStandards = pgTable(
  "accreditation_standards",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Accreditation info
    accreditationBody: accreditationBodyEnum("accreditation_body").notNull(),
    currentLevel: accreditationLevelEnum("current_level").default(
      "not_accredited"
    ),
    targetLevel: accreditationLevelEnum("target_level"),
    status: accreditationStatusEnum("status").default("not_started"),

    // Dates
    lastAccreditedAt: timestamp("last_accredited_at"),
    expiresAt: timestamp("expires_at"),
    nextSurveyDate: date("next_survey_date"),

    // Scores
    selfAssessmentScore: numeric("self_assessment_score", {
      precision: 5,
      scale: 2,
    }),
    surveyScore: numeric("survey_score", { precision: 5, scale: 2 }),

    // Surveyor info
    surveyorOrganization: varchar("surveyor_organization", { length: 255 }),
    surveyorTeam: jsonb("surveyor_team").$type<
      Array<{
        name: string;
        role: string;
        specialty?: string;
      }>
    >(),

    // Certificate info
    certificateNumber: varchar("certificate_number", { length: 50 }),
    certificateUrl: varchar("certificate_url", { length: 500 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_accreditation_org_id").on(table.organizationId),
    index("idx_accreditation_branch_id").on(table.branchId),
    index("idx_accreditation_body").on(table.accreditationBody),
    index("idx_accreditation_status").on(table.status),
    index("idx_accreditation_level").on(table.currentLevel),
    index("idx_accreditation_expires").on(table.expiresAt),
  ]
);

/**
 * Quality Indicators table
 * Defines quality metrics for monitoring (Indikator Mutu)
 */
export const qualityIndicators = pgTable(
  "quality_indicators",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Indicator definition
    indicatorCode: varchar("indicator_code", { length: 20 }).notNull(),
    indicatorName: varchar("indicator_name", { length: 255 }).notNull(),
    indicatorNameId: varchar("indicator_name_id", { length: 255 }), // Indonesian name
    category: qualityIndicatorCategoryEnum("category").notNull(),
    description: text("description"),

    // Measurement details
    numeratorDefinition: text("numerator_definition").notNull(),
    denominatorDefinition: text("denominator_definition").notNull(),
    formula: text("formula"), // e.g., "(numerator / denominator) * 100"
    unit: varchar("unit", { length: 20 }).default("%"), // %, count, ratio

    // Targets
    targetValue: numeric("target_value", { precision: 10, scale: 4 }),
    thresholdGreen: numeric("threshold_green", { precision: 10, scale: 4 }), // Good
    thresholdYellow: numeric("threshold_yellow", { precision: 10, scale: 4 }), // Warning
    thresholdRed: numeric("threshold_red", { precision: 10, scale: 4 }), // Critical

    // Monitoring frequency
    measurementFrequency: varchar("measurement_frequency", { length: 20 }).default(
      "monthly"
    ), // daily, weekly, monthly, quarterly

    // Status
    isActive: boolean("is_active").default(true),
    effectiveFrom: date("effective_from"),
    effectiveTo: date("effective_to"),

    // Responsible
    responsibleDepartment: varchar("responsible_department", { length: 100 }),
    responsiblePerson: uuid("responsible_person").references(() => users.id, {
      onDelete: "set null",
    }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_quality_indicator_org_id").on(table.organizationId),
    index("idx_quality_indicator_branch_id").on(table.branchId),
    uniqueIndex("idx_quality_indicator_code").on(
      table.organizationId,
      table.indicatorCode
    ),
    index("idx_quality_indicator_category").on(table.category),
    index("idx_quality_indicator_active").on(table.isActive),
  ]
);

/**
 * Quality Indicator Results table
 * Stores measurement results for quality indicators
 */
export const qualityIndicatorResults = pgTable(
  "quality_indicator_results",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Link to indicator
    indicatorId: uuid("indicator_id")
      .notNull()
      .references(() => qualityIndicators.id, { onDelete: "cascade" }),

    // Measurement period
    periodStart: date("period_start").notNull(),
    periodEnd: date("period_end").notNull(),
    periodType: varchar("period_type", { length: 20 }).notNull(), // daily, weekly, monthly, quarterly

    // Values
    numeratorValue: numeric("numerator_value", { precision: 15, scale: 4 }).notNull(),
    denominatorValue: numeric("denominator_value", { precision: 15, scale: 4 }).notNull(),
    resultValue: numeric("result_value", { precision: 15, scale: 4 }).notNull(),
    targetValue: numeric("target_value", { precision: 15, scale: 4 }),

    // Achievement
    isTargetMet: boolean("is_target_met"),
    performanceLevel: varchar("performance_level", { length: 20 }), // green, yellow, red

    // Analysis
    analysis: text("analysis"),
    rootCause: text("root_cause"),
    improvementPlan: text("improvement_plan"),

    // Verification
    measuredBy: uuid("measured_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    measuredAt: timestamp("measured_at").notNull(),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    verifiedAt: timestamp("verified_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_qi_result_org_id").on(table.organizationId),
    index("idx_qi_result_branch_id").on(table.branchId),
    index("idx_qi_result_indicator_id").on(table.indicatorId),
    index("idx_qi_result_period").on(table.periodStart, table.periodEnd),
    uniqueIndex("idx_qi_result_unique").on(
      table.indicatorId,
      table.periodStart,
      table.periodEnd
    ),
  ]
);

/**
 * Patient Safety Incidents table
 * Tracks patient safety incidents (Insiden Keselamatan Pasien - IKP)
 */
export const patientSafetyIncidents = pgTable(
  "patient_safety_incidents",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Incident identification
    incidentNumber: varchar("incident_number", { length: 30 }).notNull().unique(),
    incidentDate: timestamp("incident_date").notNull(),
    reportedDate: timestamp("reported_date").notNull(),

    // Classification
    severity: incidentSeverityEnum("severity").notNull(),
    status: incidentStatusEnum("status").default("reported"),

    // Location and context
    locationDescription: varchar("location_description", { length: 255 }),
    department: varchar("department", { length: 100 }),

    // Patient info (optional - some incidents may not involve specific patient)
    patientId: uuid("patient_id").references(() => patients.id, {
      onDelete: "set null",
    }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),

    // Incident details
    incidentType: varchar("incident_type", { length: 100 }).notNull(),
    incidentDescription: text("incident_description").notNull(),
    immediateAction: text("immediate_action"),
    patientOutcome: text("patient_outcome"),

    // People involved
    reportedBy: uuid("reported_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    involvedStaff: jsonb("involved_staff").$type<
      Array<{
        userId?: string;
        name: string;
        role: string;
        involvement: string;
      }>
    >(),
    witnessInfo: jsonb("witness_info").$type<
      Array<{
        name: string;
        role?: string;
        statement?: string;
      }>
    >(),

    // Investigation (RCA - Root Cause Analysis)
    investigationStartedAt: timestamp("investigation_started_at"),
    investigationCompletedAt: timestamp("investigation_completed_at"),
    investigatedBy: uuid("investigated_by").references(() => users.id, {
      onDelete: "set null",
    }),
    rootCauseAnalysis: text("root_cause_analysis"),
    contributingFactors: jsonb("contributing_factors").$type<string[]>(),

    // Corrective actions
    correctiveActions: jsonb("corrective_actions").$type<
      Array<{
        action: string;
        responsible: string;
        dueDate: string;
        status: string;
        completedDate?: string;
      }>
    >(),

    // Resolution
    resolvedAt: timestamp("resolved_at"),
    resolvedBy: uuid("resolved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    lessonLearned: text("lesson_learned"),
    preventiveMeasures: text("preventive_measures"),

    // KNKP (Komite Nasional Keselamatan Pasien) reporting
    isReportedToKnkp: boolean("is_reported_to_knkp").default(false),
    knkpReportedAt: timestamp("knkp_reported_at"),
    knkpReportNumber: varchar("knkp_report_number", { length: 50 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_psi_org_id").on(table.organizationId),
    index("idx_psi_branch_id").on(table.branchId),
    uniqueIndex("idx_psi_number").on(table.incidentNumber),
    index("idx_psi_severity").on(table.severity),
    index("idx_psi_status").on(table.status),
    index("idx_psi_date").on(table.incidentDate),
    index("idx_psi_patient_id").on(table.patientId),
    index("idx_psi_reported_by").on(table.reportedBy),
  ]
);

/**
 * Clinical Audits table
 * Tracks clinical audit activities
 */
export const clinicalAudits = pgTable(
  "clinical_audits",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Audit identification
    auditNumber: varchar("audit_number", { length: 30 }).notNull().unique(),
    auditType: clinicalAuditTypeEnum("audit_type").notNull(),
    auditTitle: varchar("audit_title", { length: 255 }).notNull(),
    auditTitleId: varchar("audit_title_id", { length: 255 }), // Indonesian

    // Scope
    department: varchar("department", { length: 100 }),
    auditPeriodStart: date("audit_period_start").notNull(),
    auditPeriodEnd: date("audit_period_end").notNull(),
    sampleSize: integer("sample_size"),
    population: integer("population"),

    // Audit criteria
    auditCriteria: jsonb("audit_criteria").$type<
      Array<{
        criterion: string;
        standard: string;
        weight?: number;
      }>
    >(),

    // Status
    status: clinicalAuditStatusEnum("status").default("planned"),
    plannedStartDate: date("planned_start_date"),
    actualStartDate: date("actual_start_date"),
    completedDate: date("completed_date"),

    // Team
    leadAuditor: uuid("lead_auditor")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    auditTeam: jsonb("audit_team").$type<
      Array<{
        userId?: string;
        name: string;
        role: string;
      }>
    >(),

    // Findings
    findings: jsonb("findings").$type<
      Array<{
        criterion: string;
        finding: string;
        complianceRate?: number;
        severity?: string;
        recommendation?: string;
      }>
    >(),
    overallComplianceRate: numeric("overall_compliance_rate", {
      precision: 5,
      scale: 2,
    }),

    // Report
    summary: text("summary"),
    conclusions: text("conclusions"),
    recommendations: text("recommendations"),

    // Follow-up
    followUpActions: jsonb("follow_up_actions").$type<
      Array<{
        action: string;
        responsible: string;
        dueDate: string;
        status: string;
        completedDate?: string;
      }>
    >(),
    followUpDate: date("follow_up_date"),
    followUpCompletedAt: timestamp("follow_up_completed_at"),

    // Approval
    approvedBy: uuid("approved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    approvedAt: timestamp("approved_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_clinical_audit_org_id").on(table.organizationId),
    index("idx_clinical_audit_branch_id").on(table.branchId),
    uniqueIndex("idx_clinical_audit_number").on(table.auditNumber),
    index("idx_clinical_audit_type").on(table.auditType),
    index("idx_clinical_audit_status").on(table.status),
    index("idx_clinical_audit_period").on(
      table.auditPeriodStart,
      table.auditPeriodEnd
    ),
  ]
);

/**
 * Practitioner Credentials table
 * Tracks credential verification for practitioners (STR, SIP, certifications)
 */
export const practitionerCredentials = pgTable(
  "practitioner_credentials",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Practitioner link
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),

    // Credential info
    credentialType: credentialTypeEnum("credential_type").notNull(),
    credentialNumber: varchar("credential_number", { length: 50 }).notNull(),
    credentialName: varchar("credential_name", { length: 255 }).notNull(),
    issuingAuthority: varchar("issuing_authority", { length: 255 }).notNull(),

    // Validity
    issuedDate: date("issued_date").notNull(),
    expiryDate: date("expiry_date"),
    status: credentialStatusEnum("status").default("pending"),

    // Verification
    verifiedAt: timestamp("verified_at"),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    verificationMethod: varchar("verification_method", { length: 50 }), // online, document, institution

    // Document
    documentUrl: varchar("document_url", { length: 500 }),
    documentHash: varchar("document_hash", { length: 64 }), // SHA-256 hash for integrity

    // Renewal tracking
    renewalReminderSent: boolean("renewal_reminder_sent").default(false),
    renewalReminderSentAt: timestamp("renewal_reminder_sent_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_credential_org_id").on(table.organizationId),
    index("idx_credential_branch_id").on(table.branchId),
    index("idx_credential_practitioner_id").on(table.practitionerId),
    index("idx_credential_type").on(table.credentialType),
    index("idx_credential_status").on(table.status),
    index("idx_credential_expiry").on(table.expiryDate),
    uniqueIndex("idx_credential_unique").on(
      table.practitionerId,
      table.credentialType,
      table.credentialNumber
    ),
  ]
);

/**
 * Document Control table
 * Manages controlled documents for accreditation (SPO, policies, etc.)
 */
export const documentControl = pgTable(
  "document_control",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Document identification
    documentNumber: varchar("document_number", { length: 30 }).notNull(),
    documentType: documentControlTypeEnum("document_type").notNull(),
    documentTitle: varchar("document_title", { length: 255 }).notNull(),
    documentTitleId: varchar("document_title_id", { length: 255 }), // Indonesian

    // Classification
    department: varchar("department", { length: 100 }),
    category: varchar("category", { length: 100 }),

    // Version control
    version: varchar("version", { length: 10 }).notNull(),
    previousVersion: varchar("previous_version", { length: 10 }),
    status: documentControlStatusEnum("status").default("draft"),

    // Content
    purpose: text("purpose"),
    scope: text("scope"),
    content: text("content"),
    attachmentUrl: varchar("attachment_url", { length: 500 }),

    // Workflow dates
    draftedAt: timestamp("drafted_at"),
    draftedBy: uuid("drafted_by").references(() => users.id, {
      onDelete: "set null",
    }),
    reviewedAt: timestamp("reviewed_at"),
    reviewedBy: uuid("reviewed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    approvedAt: timestamp("approved_at"),
    approvedBy: uuid("approved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    publishedAt: timestamp("published_at"),
    publishedBy: uuid("published_by").references(() => users.id, {
      onDelete: "set null",
    }),

    // Validity
    effectiveDate: date("effective_date"),
    reviewDate: date("review_date"), // Next review due
    retirementDate: date("retirement_date"),

    // Distribution
    distributionList: jsonb("distribution_list").$type<string[]>(),
    acknowledgementRequired: boolean("acknowledgement_required").default(false),

    // Revision history
    revisionHistory: jsonb("revision_history").$type<
      Array<{
        version: string;
        date: string;
        changedBy: string;
        changes: string;
      }>
    >(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_doc_control_org_id").on(table.organizationId),
    index("idx_doc_control_branch_id").on(table.branchId),
    uniqueIndex("idx_doc_control_number_version").on(
      table.organizationId,
      table.documentNumber,
      table.version
    ),
    index("idx_doc_control_type").on(table.documentType),
    index("idx_doc_control_status").on(table.status),
    index("idx_doc_control_department").on(table.department),
    index("idx_doc_control_effective").on(table.effectiveDate),
    index("idx_doc_control_review").on(table.reviewDate),
  ]
);

/**
 * Infection Surveillance table
 * Tracks healthcare-associated infections (HAI) for PPI
 */
export const infectionSurveillance = pgTable(
  "infection_surveillance",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Case identification
    surveillanceNumber: varchar("surveillance_number", { length: 30 })
      .notNull()
      .unique(),
    category: infectionControlCategoryEnum("category").notNull(),
    status: infectionSurveillanceStatusEnum("status").default("suspected"),

    // Patient info
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),

    // Detection
    detectionDate: date("detection_date").notNull(),
    reportedDate: date("reported_date").notNull(),
    reportedBy: uuid("reported_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),

    // Location
    ward: varchar("ward", { length: 100 }),
    roomNumber: varchar("room_number", { length: 20 }),

    // Clinical details
    infectionSite: varchar("infection_site", { length: 100 }),
    organism: varchar("organism", { length: 100 }), // Pathogen identified
    cultureResult: text("culture_result"),
    antibioticSensitivity: jsonb("antibiotic_sensitivity").$type<
      Array<{
        antibiotic: string;
        result: "sensitive" | "intermediate" | "resistant";
      }>
    >(),

    // Risk factors
    deviceRelated: boolean("device_related").default(false),
    deviceType: varchar("device_type", { length: 100 }), // catheter, ventilator, etc.
    deviceInsertionDate: date("device_insertion_date"),
    deviceRemovalDate: date("device_removal_date"),
    surgeryRelated: boolean("surgery_related").default(false),
    surgeryDate: date("surgery_date"),
    surgeryType: varchar("surgery_type", { length: 100 }),

    // Outcome
    outcome: varchar("outcome", { length: 50 }), // resolved, ongoing, death
    resolvedDate: date("resolved_date"),
    daysOfInfection: integer("days_of_infection"),

    // Investigation
    investigatedBy: uuid("investigated_by").references(() => users.id, {
      onDelete: "set null",
    }),
    investigationNotes: text("investigation_notes"),
    bundleComplianceChecked: boolean("bundle_compliance_checked").default(false),
    bundleComplianceScore: numeric("bundle_compliance_score", {
      precision: 5,
      scale: 2,
    }),

    // Actions taken
    actionsTaken: jsonb("actions_taken").$type<
      Array<{
        action: string;
        date: string;
        performedBy: string;
      }>
    >(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_infection_org_id").on(table.organizationId),
    index("idx_infection_branch_id").on(table.branchId),
    uniqueIndex("idx_infection_number").on(table.surveillanceNumber),
    index("idx_infection_category").on(table.category),
    index("idx_infection_status").on(table.status),
    index("idx_infection_patient_id").on(table.patientId),
    index("idx_infection_detection_date").on(table.detectionDate),
    index("idx_infection_ward").on(table.ward),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const accreditationStandardsRelations = relations(
  accreditationStandards,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [accreditationStandards.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [accreditationStandards.branchId],
      references: [organizations.id],
      relationName: "accreditationBranch",
    }),
  })
);

export const qualityIndicatorsRelations = relations(
  qualityIndicators,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [qualityIndicators.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [qualityIndicators.branchId],
      references: [organizations.id],
      relationName: "qualityIndicatorBranch",
    }),
    responsibleUser: one(users, {
      fields: [qualityIndicators.responsiblePerson],
      references: [users.id],
    }),
    results: many(qualityIndicatorResults),
  })
);

export const qualityIndicatorResultsRelations = relations(
  qualityIndicatorResults,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [qualityIndicatorResults.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [qualityIndicatorResults.branchId],
      references: [organizations.id],
      relationName: "qiResultBranch",
    }),
    indicator: one(qualityIndicators, {
      fields: [qualityIndicatorResults.indicatorId],
      references: [qualityIndicators.id],
    }),
    measuredByUser: one(users, {
      fields: [qualityIndicatorResults.measuredBy],
      references: [users.id],
    }),
    verifiedByUser: one(users, {
      fields: [qualityIndicatorResults.verifiedBy],
      references: [users.id],
      relationName: "qiResultVerifier",
    }),
  })
);

export const patientSafetyIncidentsRelations = relations(
  patientSafetyIncidents,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [patientSafetyIncidents.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [patientSafetyIncidents.branchId],
      references: [organizations.id],
      relationName: "psiIncidentBranch",
    }),
    patient: one(patients, {
      fields: [patientSafetyIncidents.patientId],
      references: [patients.id],
    }),
    encounter: one(encounters, {
      fields: [patientSafetyIncidents.encounterId],
      references: [encounters.id],
    }),
    reportedByUser: one(users, {
      fields: [patientSafetyIncidents.reportedBy],
      references: [users.id],
    }),
    investigatedByUser: one(users, {
      fields: [patientSafetyIncidents.investigatedBy],
      references: [users.id],
      relationName: "psiInvestigator",
    }),
    resolvedByUser: one(users, {
      fields: [patientSafetyIncidents.resolvedBy],
      references: [users.id],
      relationName: "psiResolver",
    }),
  })
);

export const clinicalAuditsRelations = relations(clinicalAudits, ({ one }) => ({
  organization: one(organizations, {
    fields: [clinicalAudits.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [clinicalAudits.branchId],
    references: [organizations.id],
    relationName: "clinicalAuditBranch",
  }),
  leadAuditorUser: one(users, {
    fields: [clinicalAudits.leadAuditor],
    references: [users.id],
  }),
  approvedByUser: one(users, {
    fields: [clinicalAudits.approvedBy],
    references: [users.id],
    relationName: "auditApprover",
  }),
}));

export const practitionerCredentialsRelations = relations(
  practitionerCredentials,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [practitionerCredentials.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [practitionerCredentials.branchId],
      references: [organizations.id],
      relationName: "credentialBranch",
    }),
    practitioner: one(practitioners, {
      fields: [practitionerCredentials.practitionerId],
      references: [practitioners.id],
    }),
    verifiedByUser: one(users, {
      fields: [practitionerCredentials.verifiedBy],
      references: [users.id],
    }),
  })
);

export const documentControlRelations = relations(
  documentControl,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [documentControl.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [documentControl.branchId],
      references: [organizations.id],
      relationName: "documentBranch",
    }),
    draftedByUser: one(users, {
      fields: [documentControl.draftedBy],
      references: [users.id],
    }),
    reviewedByUser: one(users, {
      fields: [documentControl.reviewedBy],
      references: [users.id],
      relationName: "documentReviewer",
    }),
    approvedByUser: one(users, {
      fields: [documentControl.approvedBy],
      references: [users.id],
      relationName: "documentApprover",
    }),
    publishedByUser: one(users, {
      fields: [documentControl.publishedBy],
      references: [users.id],
      relationName: "documentPublisher",
    }),
  })
);

export const infectionSurveillanceRelations = relations(
  infectionSurveillance,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [infectionSurveillance.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [infectionSurveillance.branchId],
      references: [organizations.id],
      relationName: "infectionBranch",
    }),
    patient: one(patients, {
      fields: [infectionSurveillance.patientId],
      references: [patients.id],
    }),
    encounter: one(encounters, {
      fields: [infectionSurveillance.encounterId],
      references: [encounters.id],
    }),
    reportedByUser: one(users, {
      fields: [infectionSurveillance.reportedBy],
      references: [users.id],
    }),
    investigatedByUser: one(users, {
      fields: [infectionSurveillance.investigatedBy],
      references: [users.id],
      relationName: "infectionInvestigator",
    }),
  })
);

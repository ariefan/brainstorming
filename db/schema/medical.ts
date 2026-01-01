import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  encounterStatusEnum,
  encounterTypeEnum,
  encounterClassEnum,
  diagnosisTypeEnum,
  diagnosisVerificationEnum,
  prescriptionStatusEnum,
  dosageFormEnum,
  frequencyEnum,
  procedureStatusEnum,
  procedureCategoryEnum,
  BsonResource,
  fullFields,
  baseFields,
  bsonFields,
  softDeleteFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { polyclinics } from "./practitioners";
import { practitioners } from "./practitioners";
import { appointments } from "./appointments";

// ============================================================================
// MEDICAL SERVICES TABLES (GENERAL, DENTAL, KIA)
// ============================================================================

/**
 * Encounters table
 * Represents clinical encounters
 */
export const encounters = pgTable(
  "encounters",
  {
    ...fullFields,

    // Encounter fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "set null" }),
    polyclinicId: uuid("polyclinic_id").references(() => polyclinics.id, {
      onDelete: "set null",
    }),
    appointmentId: uuid("appointment_id").references(() => appointments.id, {
      onDelete: "set null",
    }),
    encounterNumber: varchar("encounter_number", { length: 30 })
      .notNull()
      .unique(),
    encounterType: encounterTypeEnum("encounter_type").notNull(),
    encounterClass: encounterClassEnum("encounter_class").notNull(),
    status: encounterStatusEnum("status").default("planned"),
    priority: varchar("priority", { length: 20 }).default("routine"),
    encounterDate: date("encounter_date").notNull(),
    startTime: timestamp("start_time"),
    endTime: timestamp("end_time"),
    reason: text("reason"),
    chiefComplaint: text("chief_complaint"),
    physicalExamination: jsonb("physical_examination").$type<{
      general?: string;
      vitalSigns?: Record<string, any>;
      heent?: string;
      cardiovascular?: string;
      respiratory?: string;
      gastrointestinal?: string;
      neurological?: string;
      musculoskeletal?: string;
      integumentary?: string;
    }>(),
    satusehatEncounterId: varchar("satusehat_encounter_id", { length: 100 }),
    bpjsSepNumber: varchar("bpjs_sep_number", { length: 30 }),
    notes: text("notes"),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),

    // Sync Status - JKN/BPJS
    isJknSynced: boolean("is_jkn_synced").default(false),
    jknSyncedAt: timestamp("jkn_synced_at"),
    jknSyncError: text("jkn_sync_error"),
  },
  (table) => [
    index("idx_encounter_org_id").on(table.organizationId),
    index("idx_encounter_branch_id").on(table.branchId),
    index("idx_encounter_patient_id").on(table.patientId),
    index("idx_encounter_practitioner_id").on(table.practitionerId),
    index("idx_encounter_polyclinic_id").on(table.polyclinicId),
    index("idx_encounter_appointment_id").on(table.appointmentId),
    uniqueIndex("idx_encounter_number").on(table.encounterNumber),
    index("idx_encounter_date").on(table.encounterDate),
    index("idx_encounter_status").on(table.status),
    index("idx_encounter_satusehat_synced").on(table.isSatusehatSynced),
    index("idx_encounter_jkn_synced").on(table.isJknSynced),
  ]
);

/**
 * Vital signs table
 * Represents patient vital signs
 */
export const vitalSigns = pgTable(
  "vital_signs",
  {
    ...fullFields,

    // Vital signs fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    recordedAt: timestamp("recorded_at").notNull(),
    recordedBy: uuid("recorded_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    temperature: varchar("temperature", { length: 10 }), // Celsius
    temperatureUnit: varchar("temperature_unit", { length: 5 }).default("C"),
    heartRate: integer("heart_rate"), // bpm
    bloodPressureSystolic: integer("blood_pressure_systolic"), // mmHg
    bloodPressureDiastolic: integer("blood_pressure_diastolic"), // mmHg
    respiratoryRate: integer("respiratory_rate"), // breaths/min
    oxygenSaturation: integer("oxygen_saturation"), // SpO2 %
    weight: varchar("weight", { length: 10 }), // kg
    height: varchar("height", { length: 10 }), // cm
    bmi: varchar("bmi", { length: 10 }),
    bloodGlucose: varchar("blood_glucose", { length: 10 }), // mg/dL
    bloodGlucoseUnit: varchar("blood_glucose_unit", { length: 10 }).default(
      "mg/dL"
    ),
    loincCodes: jsonb("loinc_codes").$type<
      Array<{
        code: string;
        name: string;
      }>
    >(),
    notes: text("notes"),

    // SatuSehat Integration (maps to FHIR Observation)
    satusehatObservationId: varchar("satusehat_observation_id", { length: 100 }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),
  },
  (table) => [
    index("idx_vital_signs_encounter_id").on(table.encounterId),
    index("idx_vital_signs_recorded_at").on(table.recordedAt),
    index("idx_vital_signs_satusehat_synced").on(table.isSatusehatSynced),
  ]
);

/**
 * Consultations table
 * Represents consultation notes
 */
export const consultations = pgTable(
  "consultations",
  {
    ...fullFields,

    // Consultation fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    consultationType: varchar("consultation_type", { length: 50 }),
    chiefComplaint: text("chief_complaint"),
    historyOfPresentIllness: text("history_of_present_illness"),
    reviewOfSystems: jsonb("review_of_systems").$type<Record<string, any>>(),
    physicalExamination: text("physical_examination"),
    assessment: text("assessment"),
    plan: text("plan"),
    followUpDate: date("follow_up_date"),
    isSignedOff: boolean("is_signed_off").default(false),
    signedOffAt: timestamp("signed_off_at"),
    signedOffBy: uuid("signed_off_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => [index("idx_consultation_encounter_id").on(table.encounterId)]
);

/**
 * Diagnoses table
 * Represents patient diagnoses
 */
export const diagnoses = pgTable(
  "diagnoses",
  {
    ...fullFields,

    // Diagnosis fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    diagnosisType: diagnosisTypeEnum("diagnosis_type").notNull(),
    icd10Code: varchar("icd10_code", { length: 10 }).notNull(),
    icd10Description: varchar("icd10_description", { length: 255 }),
    diagnosisName: varchar("diagnosis_name", { length: 255 }).notNull(),
    diagnosisNameId: varchar("diagnosis_name_id", { length: 255 }),
    verification:
      diagnosisVerificationEnum("verification").default("provisional"),
    onsetDate: date("onset_date"),
    isChronic: boolean("is_chronic").default(false),
    isPrimary: boolean("is_primary").default(false),
    notes: text("notes"),
    satusehatConditionId: varchar("satusehat_condition_id", { length: 100 }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),

    // Sync Status - JKN/BPJS
    isJknSynced: boolean("is_jkn_synced").default(false),
    jknSyncedAt: timestamp("jkn_synced_at"),
    jknSyncError: text("jkn_sync_error"),
  },
  (table) => [
    index("idx_diagnosis_encounter_id").on(table.encounterId),
    index("idx_diagnosis_icd10").on(table.icd10Code),
    index("idx_diagnosis_type").on(table.diagnosisType),
    index("idx_diagnosis_primary").on(table.isPrimary),
    index("idx_diagnosis_satusehat_synced").on(table.isSatusehatSynced),
    index("idx_diagnosis_jkn_synced").on(table.isJknSynced),
  ]
);

/**
 * Prescriptions table
 * Represents prescriptions
 */
export const prescriptions = pgTable(
  "prescriptions",
  {
    ...fullFields,

    // Prescription fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    prescriptionNumber: varchar("prescription_number", { length: 30 })
      .notNull()
      .unique(),
    status: prescriptionStatusEnum("status").default("draft"),
    prescribedAt: timestamp("prescribed_at").notNull(),
    prescribedBy: uuid("prescribed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    notes: text("notes"),
    dispenseStatus: varchar("dispense_status", { length: 20 }).default(
      "pending"
    ),
    dispensedAt: timestamp("dispensed_at"),

    // Signature/Authorization (for accreditation compliance)
    isSignedOff: boolean("is_signed_off").default(false),
    signedOffAt: timestamp("signed_off_at"),
    signedOffBy: uuid("signed_off_by").references(() => users.id, {
      onDelete: "set null",
    }),

    satusehatMedicationRequestId: varchar("satusehat_medication_request_id", {
      length: 100,
    }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),

    // Sync Status - JKN/BPJS
    isJknSynced: boolean("is_jkn_synced").default(false),
    jknSyncedAt: timestamp("jkn_synced_at"),
    jknSyncError: text("jkn_sync_error"),
  },
  (table) => [
    index("idx_prescription_encounter_id").on(table.encounterId),
    uniqueIndex("idx_prescription_number").on(table.prescriptionNumber),
    index("idx_prescription_status").on(table.status),
    index("idx_prescription_signed_off").on(table.isSignedOff),
    index("idx_prescription_satusehat_synced").on(table.isSatusehatSynced),
    index("idx_prescription_jkn_synced").on(table.isJknSynced),
  ]
);

/**
 * Prescription items table
 * Represents prescription items
 */
export const prescriptionItems = pgTable(
  "prescription_items",
  {
    ...fullFields,

    // Prescription item fields
    prescriptionId: uuid("prescription_id")
      .notNull()
      .references(() => prescriptions.id, { onDelete: "cascade" }),
    lineNumber: integer("line_number").notNull(),
    medicationName: varchar("medication_name", { length: 255 }).notNull(),
    medicationNameId: varchar("medication_name_id", { length: 255 }),
    genericName: varchar("generic_name", { length: 255 }),
    dosageForm: dosageFormEnum("dosage_form"),
    strength: varchar("strength", { length: 50 }),
    strengthUnit: varchar("strength_unit", { length: 20 }),
    quantity: varchar("quantity", { length: 20 }),
    frequency: frequencyEnum("frequency"),
    route: varchar("route", { length: 50 }), // oral, iv, im, etc.
    duration: varchar("duration", { length: 50 }),
    instructions: text("instructions"),
    rxNormCode: varchar("rx_norm_code", { length: 20 }),
    isControlled: boolean("is_controlled").default(false),
    controlledSchedule: varchar("controlled_schedule", { length: 20 }),
    repeatCount: integer("repeat_count").default(0),
    dispenseAsWritten: boolean("dispense_as_written").default(true),
    notes: text("notes"),
    drugInteractions: jsonb("drug_interactions").$type<
      Array<{
        severity: string;
        description: string;
        interactingMedication: string;
      }>
    >(),
    allergyConflict: boolean("allergy_conflict").default(false),
    allergyConflictDetails: text("allergy_conflict_details"),
  },
  (table) => [
    index("idx_prescription_item_prescription_id").on(table.prescriptionId),
  ]
);

/**
 * Medical lab orders table (linked to medical encounters)
 * Stores lab orders from medical consultations
 */
export const medicalLabOrders = pgTable(
  "medical_lab_orders",
  {
    ...fullFields,

    // Lab order fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
    orderedAt: timestamp("ordered_at").notNull(),
    orderedBy: uuid("ordered_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    priority: varchar("priority", { length: 20 }).default("routine"),
    isFastingRequired: boolean("is_fasting_required").default(false),
    fastingVerified: boolean("fasting_verified").default(false),
    fastingVerifiedAt: timestamp("fasting_verified_at"),
    fastingVerifiedBy: uuid("fasting_verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    clinicalInfo: text("clinical_info"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_medical_lab_order_encounter_id").on(table.encounterId),
    uniqueIndex("idx_medical_lab_order_number").on(table.orderNumber),
  ]
);

/**
 * Medical lab order items table
 * Stores individual test items in a medical lab order
 */
export const medicalLabOrderItems = pgTable(
  "medical_lab_order_items",
  {
    ...fullFields,

    // Lab order item fields
    labOrderId: uuid("lab_order_id")
      .notNull()
      .references(() => medicalLabOrders.id, { onDelete: "cascade" }),
    labTestId: uuid("lab_test_id").notNull(),
    testCode: varchar("test_code", { length: 20 }).notNull(),
    testName: varchar("test_name", { length: 255 }).notNull(),
    testNameId: varchar("test_name_id", { length: 255 }),
    loincCode: varchar("loinc_code", { length: 20 }),
    specimenType: varchar("specimen_type", { length: 50 }),
    priority: varchar("priority", { length: 20 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_medical_lab_order_item_lab_order_id").on(table.labOrderId),
  ]
);

/**
 * Referrals table
 * Represents referrals
 */
export const referrals = pgTable(
  "referrals",
  {
    ...fullFields,

    // Referral fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    referralNumber: varchar("referral_number", { length: 30 })
      .notNull()
      .unique(),
    referralType: varchar("referral_type", { length: 50 }).notNull(), // internal, external, bpjs
    referredTo: text("referred_to").notNull(),
    referredToSpecialty: varchar("referred_to_specialty", { length: 100 }),
    referredToFacility: varchar("referred_to_facility", { length: 255 }),
    referredToPractitioner: varchar("referred_to_practitioner", {
      length: 255,
    }),
    referralReason: text("referral_reason"),
    diagnosis: text("diagnosis"),
    bpjsRujukanNumber: varchar("bpjs_rujukan_number", { length: 50 }),
    isUrgent: boolean("is_urgent").default(false),
    status: varchar("status", { length: 20 }).default("pending"),
    notes: text("notes"),

    // Signature/Authorization (for accreditation compliance)
    isSignedOff: boolean("is_signed_off").default(false),
    signedOffAt: timestamp("signed_off_at"),
    signedOffBy: uuid("signed_off_by").references(() => users.id, {
      onDelete: "set null",
    }),
  },
  (table) => [
    index("idx_referral_encounter_id").on(table.encounterId),
    uniqueIndex("idx_referral_number").on(table.referralNumber),
    index("idx_referral_status").on(table.status),
    index("idx_referral_signed_off").on(table.isSignedOff),
  ]
);

/**
 * Procedures table
 * Represents clinical procedures (FHIR Procedure resource)
 */
export const procedures = pgTable(
  "procedures",
  {
    ...fullFields,

    // Procedure fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    procedureNumber: varchar("procedure_number", { length: 30 })
      .notNull()
      .unique(),
    status: procedureStatusEnum("status").default("completed"),
    category: procedureCategoryEnum("category").notNull(),
    icd9cmCode: varchar("icd9cm_code", { length: 10 }),
    icd9cmDescription: varchar("icd9cm_description", { length: 255 }),
    procedureName: varchar("procedure_name", { length: 255 }).notNull(),
    procedureNameId: varchar("procedure_name_id", { length: 255 }),
    performedAt: timestamp("performed_at").notNull(),
    performedBy: uuid("performed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    assistedBy: uuid("assisted_by").references(() => users.id, {
      onDelete: "set null",
    }),
    location: varchar("location", { length: 100 }),
    bodySite: varchar("body_site", { length: 100 }),
    outcome: text("outcome"),
    complication: text("complication"),
    followUpRequired: boolean("follow_up_required").default(false),
    notes: text("notes"),

    // Signature/Authorization (for accreditation compliance)
    isSignedOff: boolean("is_signed_off").default(false),
    signedOffAt: timestamp("signed_off_at"),
    signedOffBy: uuid("signed_off_by").references(() => users.id, {
      onDelete: "set null",
    }),

    // SatuSehat Integration
    satusehatProcedureId: varchar("satusehat_procedure_id", { length: 100 }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),

    // Sync Status - JKN/BPJS
    isJknSynced: boolean("is_jkn_synced").default(false),
    jknSyncedAt: timestamp("jkn_synced_at"),
    jknSyncError: text("jkn_sync_error"),
  },
  (table) => [
    index("idx_procedure_encounter_id").on(table.encounterId),
    uniqueIndex("idx_procedure_number").on(table.procedureNumber),
    index("idx_procedure_status").on(table.status),
    index("idx_procedure_category").on(table.category),
    index("idx_procedure_icd9cm").on(table.icd9cmCode),
    index("idx_procedure_performed_at").on(table.performedAt),
    index("idx_procedure_signed_off").on(table.isSignedOff),
    index("idx_procedure_satusehat_synced").on(table.isSatusehatSynced),
    index("idx_procedure_jkn_synced").on(table.isJknSynced),
  ]
);

/**
 * Medical certificates table
 * Represents medical certificates
 */
export const medicalCertificates = pgTable(
  "medical_certificates",
  {
    ...fullFields,

    // Medical certificate fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    certificateNumber: varchar("certificate_number", { length: 30 })
      .notNull()
      .unique(),
    certificateType: varchar("certificate_type", { length: 50 }).notNull(), // sick_leave, medical_fitness, referral, other
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    days: integer("days").notNull(),
    diagnosis: text("diagnosis"),
    restrictions: text("restrictions"),
    isReturnToWork: boolean("is_return_to_work").default(true),
    notes: text("notes"),
    printedAt: timestamp("printed_at"),
    printedBy: uuid("printed_by").references(() => users.id, {
      onDelete: "set null",
    }),

    // Signature/Authorization (for accreditation compliance)
    isSignedOff: boolean("is_signed_off").default(false),
    signedOffAt: timestamp("signed_off_at"),
    signedOffBy: uuid("signed_off_by").references(() => users.id, {
      onDelete: "set null",
    }),
  },
  (table) => [
    index("idx_medical_certificate_encounter_id").on(table.encounterId),
    uniqueIndex("idx_medical_certificate_number").on(table.certificateNumber),
    index("idx_medical_certificate_signed_off").on(table.isSignedOff),
  ]
);

// ============================================================================
// DENTAL TABLES
// ============================================================================

/**
 * Dental encounters table
 * Represents dental encounters
 */
export const dentalEncounters = pgTable(
  "dental_encounters",
  {
    ...fullFields,

    // Dental encounter fields
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    chiefComplaint: text("chief_complaint"),
    dentalHistory: text("dental_history"),
    oralHygiene: varchar("oral_hygiene", { length: 50 }),
    periodontalStatus: text("periodontal_status"),
    notes: text("notes"),
  },
  (table) => [index("idx_dental_encounter_encounter_id").on(table.encounterId)]
);

/**
 * Dental charts table
 * Represents dental charts
 */
export const dentalCharts = pgTable(
  "dental_charts",
  {
    ...fullFields,

    // Dental chart fields
    dentalEncounterId: uuid("dental_encounter_id")
      .notNull()
      .references(() => dentalEncounters.id, { onDelete: "cascade" }),
    chartDate: date("chart_date").notNull(),
    chartedBy: uuid("charted_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_dental_chart_dental_encounter_id").on(table.dentalEncounterId),
  ]
);

/**
 * Dental chart teeth table
 * Represents dental chart teeth
 */
export const dentalChartTeeth = pgTable(
  "dental_chart_teeth",
  {
    ...fullFields,

    // Tooth fields
    dentalChartId: uuid("dental_chart_id")
      .notNull()
      .references(() => dentalCharts.id, { onDelete: "cascade" }),
    toothNumber: varchar("tooth_number", { length: 5 }).notNull(), // FDI notation (11-48)
    toothCondition: varchar("tooth_condition", { length: 50 }).notNull(),
    conditionDetails: text("condition_details"),
    restorations: jsonb("restorations").$type<
      Array<{
        type: string;
        material: string;
        surfaces: string[];
        date: string;
      }>
    >(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_dental_chart_teeth_dental_chart_id").on(table.dentalChartId),
    index("idx_dental_chart_teeth_tooth_number").on(table.toothNumber),
  ]
);

/**
 * Dental procedures table
 * Represents dental procedures
 */
export const dentalProcedures = pgTable(
  "dental_procedures",
  {
    ...fullFields,

    // Dental procedure fields
    dentalEncounterId: uuid("dental_encounter_id")
      .notNull()
      .references(() => dentalEncounters.id, { onDelete: "cascade" }),
    procedureType: varchar("procedure_type", { length: 50 }).notNull(),
    toothNumber: varchar("tooth_number", { length: 5 }),
    icd9cmCode: varchar("icd9cm_code", { length: 10 }),
    procedureName: varchar("procedure_name", { length: 255 }).notNull(),
    procedureNameId: varchar("procedure_name_id", { length: 255 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_dental_procedure_dental_encounter_id").on(
      table.dentalEncounterId
    ),
  ]
);

/**
 * Dental treatment plans table
 * Represents dental treatment plans
 */
export const dentalTreatmentPlans = pgTable(
  "dental_treatment_plans",
  {
    ...fullFields,

    // Treatment plan fields
    dentalEncounterId: uuid("dental_encounter_id")
      .notNull()
      .references(() => dentalEncounters.id, { onDelete: "cascade" }),
    planName: varchar("plan_name", { length: 255 }).notNull(),
    estimatedCost: varchar("estimated_cost", { length: 20 }),
    estimatedSessions: integer("estimated_sessions"),
    isApproved: boolean("is_approved").default(false),
    approvedBy: uuid("approved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    approvedAt: timestamp("approved_at"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_dental_treatment_plan_dental_encounter_id").on(
      table.dentalEncounterId
    ),
  ]
);

// ============================================================================
// KIA TABLES
// ============================================================================

/**
 * Pregnancies table
 * Represents pregnancies
 */
export const pregnancies = pgTable(
  "pregnancies",
  {
    ...fullFields,

    // Pregnancy fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    pregnancyNumber: integer("pregnancy_number").notNull(),
    gravida: integer("gravida"), // Number of pregnancies
    para: integer("para"), // Number of deliveries
    abortion: integer("abortion"), // Number of abortions
    lmp: date("lmp"), // Last menstrual period
    edd: date("edd"), // Estimated due date
    status: varchar("status", { length: 20 }).default("ongoing"),
    risk: varchar("risk", { length: 20 }).default("low"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_pregnancy_patient_id").on(table.patientId),
    index("idx_pregnancy_encounter_id").on(table.encounterId),
  ]
);

/**
 * ANC visits table
 * Represents antenatal care visits
 */
export const ancVisits = pgTable(
  "anc_visits",
  {
    ...fullFields,

    // ANC visit fields
    pregnancyId: uuid("pregnancy_id")
      .notNull()
      .references(() => pregnancies.id, { onDelete: "cascade" }),
    visitNumber: integer("visit_number").notNull(), // K1, K2, K3, K4
    visitDate: date("visit_date").notNull(),
    visitType: varchar("visit_type", { length: 50 }), // K1, K2, K3, K4
    gestationalAge: varchar("gestational_age", { length: 20 }),
    weight: varchar("weight", { length: 10 }),
    height: varchar("height", { length: 10 }),
    bloodPressure: varchar("blood_pressure", { length: 20 }),
    fetalHeartRate: integer("fetal_heart_rate"),
    fundalHeight: varchar("fundal_height", { length: 10 }),
    presentation: varchar("presentation", { length: 50 }),
    tetanusToxoid: integer("tetanus_toxoid"),
    ironTablets: integer("iron_tablets"),
    notes: text("notes"),
    nextVisitDate: date("next_visit_date"),
  },
  (table) => [
    index("idx_anc_visit_pregnancy_id").on(table.pregnancyId),
    index("idx_anc_visit_date").on(table.visitDate),
  ]
);

/**
 * Immunizations table
 * Represents immunizations
 */
export const immunizations = pgTable(
  "immunizations",
  {
    ...fullFields,

    // Immunization fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    immunizationType: varchar("immunization_type", { length: 50 }).notNull(),
    vaccineName: varchar("vaccine_name", { length: 255 }).notNull(),
    vaccineNameId: varchar("vaccine_name_id", { length: 255 }),
    manufacturer: varchar("manufacturer", { length: 100 }),
    batchNumber: varchar("batch_number", { length: 50 }),
    lotNumber: varchar("lot_number", { length: 50 }),
    dose: varchar("dose", { length: 50 }),
    route: varchar("route", { length: 50 }),
    site: varchar("site", { length: 50 }),
    administeredAt: timestamp("administered_at").notNull(),
    administeredBy: uuid("administered_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    adverseEvent: text("adverse_event"),
    nextDoseDate: date("next_dose_date"),
    notes: text("notes"),

    // SatuSehat Integration
    satusehatImmunizationId: varchar("satusehat_immunization_id", {
      length: 100,
    }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),
  },
  (table) => [
    index("idx_immunization_patient_id").on(table.patientId),
    index("idx_immunization_encounter_id").on(table.encounterId),
    index("idx_immunization_type").on(table.immunizationType),
    index("idx_immunization_satusehat_synced").on(table.isSatusehatSynced),
  ]
);

/**
 * Growth measurements table
 * Represents growth measurements
 */
export const growthMeasurements = pgTable(
  "growth_measurements",
  {
    ...fullFields,

    // Growth measurement fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    measurementDate: date("measurement_date").notNull(),
    ageInMonths: integer("age_in_months"),
    weight: varchar("weight", { length: 10 }),
    height: varchar("height", { length: 10 }),
    headCircumference: varchar("head_circumference", { length: 10 }),
    muac: varchar("muac", { length: 10 }), // Mid-upper arm circumference
    weightZScore: varchar("weight_z_score", { length: 10 }),
    heightZScore: varchar("height_z_score", { length: 10 }),
    weightForHeightZScore: varchar("weight_for_height_z_score", { length: 10 }),
    nutritionalStatus: varchar("nutritional_status", { length: 50 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_growth_measurement_patient_id").on(table.patientId),
    index("idx_growth_measurement_encounter_id").on(table.encounterId),
    index("idx_growth_measurement_date").on(table.measurementDate),
  ]
);

// ============================================================================
// TYPE EXPORTS FOR REPOSITORIES
// ============================================================================

export type EncounterRow = typeof encounters.$inferSelect;
export type NewEncounterRow = typeof encounters.$inferInsert;
export type VitalSignsRow = typeof vitalSigns.$inferSelect;
export type NewVitalSignsRow = typeof vitalSigns.$inferInsert;
export type DiagnosisRow = typeof diagnoses.$inferSelect;
export type NewDiagnosisRow = typeof diagnoses.$inferInsert;
export type PrescriptionRow = typeof prescriptions.$inferSelect;
export type NewPrescriptionRow = typeof prescriptions.$inferInsert;
export type ProcedureRow = typeof procedures.$inferSelect;
export type NewProcedureRow = typeof procedures.$inferInsert;
export type ReferralRow = typeof referrals.$inferSelect;
export type NewReferralRow = typeof referrals.$inferInsert;

// ============================================================================
// RELATIONS
// ============================================================================

export const encountersRelations = relations(encounters, ({ many }) => ({
  vitalSigns: many(vitalSigns),
  consultations: many(consultations),
  diagnoses: many(diagnoses),
  prescriptions: many(prescriptions),
  procedures: many(procedures),
  medicalLabOrders: many(medicalLabOrders),
  referrals: many(referrals),
  medicalCertificates: many(medicalCertificates),
  dentalEncounters: many(dentalEncounters),
}));

export const vitalSignsRelations = relations(vitalSigns, ({ one }) => ({
  encounter: one(encounters, {
    fields: [vitalSigns.encounterId],
    references: [encounters.id],
  }),
}));

export const consultationsRelations = relations(consultations, ({ one }) => ({
  encounter: one(encounters, {
    fields: [consultations.encounterId],
    references: [encounters.id],
  }),
}));

export const diagnosesRelations = relations(diagnoses, ({ one }) => ({
  encounter: one(encounters, {
    fields: [diagnoses.encounterId],
    references: [encounters.id],
  }),
}));

export const proceduresRelations = relations(procedures, ({ one }) => ({
  encounter: one(encounters, {
    fields: [procedures.encounterId],
    references: [encounters.id],
  }),
}));

export const prescriptionsRelations = relations(prescriptions, ({ many }) => ({
  items: many(prescriptionItems),
}));

export const prescriptionItemsRelations = relations(
  prescriptionItems,
  ({ one }) => ({
    prescription: one(prescriptions, {
      fields: [prescriptionItems.prescriptionId],
      references: [prescriptions.id],
    }),
  })
);

export const medicalLabOrdersRelations = relations(
  medicalLabOrders,
  ({ many }) => ({
    items: many(medicalLabOrderItems),
  })
);

export const medicalLabOrderItemsRelations = relations(
  medicalLabOrderItems,
  ({ one }) => ({
    labOrder: one(medicalLabOrders, {
      fields: [medicalLabOrderItems.labOrderId],
      references: [medicalLabOrders.id],
    }),
  })
);

export const referralsRelations = relations(referrals, ({ one }) => ({
  encounter: one(encounters, {
    fields: [referrals.encounterId],
    references: [encounters.id],
  }),
}));

export const medicalCertificatesRelations = relations(
  medicalCertificates,
  ({ one }) => ({
    encounter: one(encounters, {
      fields: [medicalCertificates.encounterId],
      references: [encounters.id],
    }),
  })
);

export const dentalEncountersRelations = relations(
  dentalEncounters,
  ({ many }) => ({
    charts: many(dentalCharts),
    procedures: many(dentalProcedures),
    treatmentPlans: many(dentalTreatmentPlans),
  })
);

export const dentalChartsRelations = relations(dentalCharts, ({ many }) => ({
  teeth: many(dentalChartTeeth),
}));

export const dentalChartTeethRelations = relations(
  dentalChartTeeth,
  ({ one }) => ({
    dentalChart: one(dentalCharts, {
      fields: [dentalChartTeeth.dentalChartId],
      references: [dentalCharts.id],
    }),
  })
);

export const dentalProceduresRelations = relations(
  dentalProcedures,
  ({ one }) => ({
    dentalEncounter: one(dentalEncounters, {
      fields: [dentalProcedures.dentalEncounterId],
      references: [dentalEncounters.id],
    }),
  })
);

export const dentalTreatmentPlansRelations = relations(
  dentalTreatmentPlans,
  ({ one }) => ({
    dentalEncounter: one(dentalEncounters, {
      fields: [dentalTreatmentPlans.dentalEncounterId],
      references: [dentalEncounters.id],
    }),
  })
);

export const pregnanciesRelations = relations(pregnancies, ({ many }) => ({
  ancVisits: many(ancVisits),
}));

export const ancVisitsRelations = relations(ancVisits, ({ one }) => ({
  pregnancy: one(pregnancies, {
    fields: [ancVisits.pregnancyId],
    references: [pregnancies.id],
  }),
}));

export const immunizationsRelations = relations(immunizations, ({ one }) => ({
  patient: one(patients, {
    fields: [immunizations.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [immunizations.encounterId],
    references: [encounters.id],
  }),
}));

export const growthMeasurementsRelations = relations(
  growthMeasurements,
  ({ one }) => ({
    patient: one(patients, {
      fields: [growthMeasurements.patientId],
      references: [patients.id],
    }),
    encounter: one(encounters, {
      fields: [growthMeasurements.encounterId],
      references: [encounters.id],
    }),
  })
);

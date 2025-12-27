import {
  pgEnum,
  pgTable,
  uuid,
  timestamp,
  text,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ============================================================================
// ENUMS
// ============================================================================

// Organization Enums
export const orgTypeEnum = pgEnum("org_type", [
  "clinic",
  "hospital",
  "polyclinic",
  "pharmacy",
  "laboratory",
]);
export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "basic",
  "standard",
  "premium",
  "enterprise",
]);

// User Enums
export const roleEnum = pgEnum("role", [
  "owner",
  "admin",
  "doctor",
  "nurse",
  "midwife",
  "pharmacist",
  "lab_tech",
  "front_desk",
  "cashier",
]);
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const userStatusEnum = pgEnum("user_status", [
  "active",
  "inactive",
  "suspended",
  "pending_verification",
]);

// Patient Enums
export const maritalStatusEnum = pgEnum("marital_status", [
  "single",
  "married",
  "divorced",
  "widowed",
]);
export const bloodTypeEnum = pgEnum("blood_type", ["a", "b", "ab", "o"]);
export const rhesusEnum = pgEnum("rhesus", ["positive", "negative"]);
export const patientStatusEnum = pgEnum("patient_status", [
  "active",
  "inactive",
  "deceased",
]);

// Allergy Enums
export const allergySeverityEnum = pgEnum("allergy_severity", [
  "mild",
  "moderate",
  "severe",
  "life_threatening",
]);
export const allergyTypeEnum = pgEnum("allergy_type", [
  "food",
  "medication",
  "environmental",
  "other",
]);

// Polyclinic Enums
export const polyclinicTypeEnum = pgEnum("polyclinic_type", [
  "general",
  "dental",
  "kia",
  "specialist",
  "emergency",
  "lab",
  "pharmacy",
]);
export const dayOfWeekEnum = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

// Practitioner Enums
export const practitionerTypeEnum = pgEnum("practitioner_type", [
  "doctor",
  "nurse",
  "midwife",
  "pharmacist",
  "lab_tech",
  "radiologist",
  "specialist",
]);
export const specialtyEnum = pgEnum("specialty", [
  "general_practice",
  "internal_medicine",
  "pediatrics",
  "obgyn",
  "surgery",
  "dentistry",
  "ophthalmology",
  "dermatology",
  "psychiatry",
  "radiology",
  "pathology",
  "other",
]);

// Appointment Enums
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "booked",
  "confirmed",
  "checked_in",
  "in_queue",
  "completed",
  "cancelled",
  "no_show",
]);
export const appointmentTypeEnum = pgEnum("appointment_type", [
  "consultation",
  "follow_up",
  "procedure",
  "lab",
  "imaging",
  "vaccination",
  "checkup",
]);

// Queue Enums
export const queueStatusEnum = pgEnum("queue_status", [
  "waiting",
  "called",
  "serving",
  "completed",
  "skipped",
  "cancelled",
]);
export const queuePriorityEnum = pgEnum("queue_priority", [
  "routine",
  "urgent",
  "emergency",
]);

// Encounter Enums
export const encounterStatusEnum = pgEnum("encounter_status", [
  "planned",
  "arrived",
  "in_progress",
  "on_leave",
  "finished",
  "cancelled",
]);
export const encounterTypeEnum = pgEnum("encounter_type", [
  "outpatient",
  "inpatient",
  "emergency",
  "home_visit",
  "virtual",
]);
export const encounterClassEnum = pgEnum("encounter_class", [
  "ambulatory",
  "inpatient",
  "emergency",
  "observation",
]);

// Diagnosis Enums
export const diagnosisTypeEnum = pgEnum("diagnosis_type", [
  "primary",
  "secondary",
  "admission",
  "discharge",
]);
export const diagnosisVerificationEnum = pgEnum("diagnosis_verification", [
  "confirmed",
  "provisional",
  "differential",
  "refuted",
]);

// Prescription Enums
export const prescriptionStatusEnum = pgEnum("prescription_status", [
  "draft",
  "active",
  "completed",
  "cancelled",
  "on_hold",
]);
export const dosageFormEnum = pgEnum("dosage_form", [
  "tablet",
  "capsule",
  "syrup",
  "injection",
  "ointment",
  "drops",
  "inhaler",
  "suppository",
  "other",
]);
export const frequencyEnum = pgEnum("frequency", [
  "once_daily",
  "twice_daily",
  "three_times_daily",
  "four_times_daily",
  "every_8_hours",
  "every_12_hours",
  "every_24_hours",
  "as_needed",
  "other",
]);

// Lab Enums
export const labTestCategoryEnum = pgEnum("lab_test_category", [
  "hematology",
  "chemistry",
  "urinalysis",
  "serology",
  "microbiology",
  "histopathology",
  "other",
]);
export const labTestTypeEnum = pgEnum("lab_test_type", [
  "blood",
  "serum",
  "plasma",
  "urine",
  "stool",
  "sputum",
  "swab",
  "csf",
  "other",
]);
export const labResultTypeEnum = pgEnum("lab_result_type", [
  "numeric",
  "text",
  "coded",
]);
export const labResultInterpretationEnum = pgEnum("lab_result_interpretation", [
  "normal",
  "low",
  "high",
  "critical_low",
  "critical_high",
  "abnormal",
]);
export const labQueueStatusEnum = pgEnum("lab_queue_status", [
  "pending",
  "collecting",
  "received",
  "processing",
  "resulted",
  "authorized",
  "completed",
  "cancelled",
]);
export const labQueuePriorityEnum = pgEnum("lab_queue_priority", [
  "routine",
  "urgent",
  "stat",
]);
export const specimenStatusEnum = pgEnum("specimen_status", [
  "collected",
  "in_transit",
  "received",
  "processing",
  "stored",
  "disposed",
]);
export const specimenConditionEnum = pgEnum("specimen_condition", [
  "satisfactory",
  "hemolyzed",
  "lipemic",
  "clotted",
  "insufficient",
  "other",
]);
export const labResultStatusEnum = pgEnum("lab_result_status", [
  "preliminary",
  "final",
  "amended",
  "cancelled",
]);
export const diagnosticReportStatusEnum = pgEnum("diagnostic_report_status", [
  "registered",
  "partial",
  "preliminary",
  "final",
  "amended",
  "corrected",
  "cancelled",
]);
export const criticalNotificationMethodEnum = pgEnum(
  "critical_notification_method",
  ["phone", "in_person", "sms"]
);

// Dental Enums
export const toothConditionEnum = pgEnum("tooth_condition", [
  "healthy",
  "decayed",
  "missing",
  "filled",
  "crown",
  "bridge",
  "implant",
  "root_canal",
  "extraction",
  "other",
]);
export const dentalProcedureTypeEnum = pgEnum("dental_procedure_type", [
  "extraction",
  "filling",
  "root_canal",
  "crown",
  "bridge",
  "implant",
  "scaling",
  "cleaning",
  "whitening",
  "other",
]);

// KIA Enums
export const pregnancyStatusEnum = pgEnum("pregnancy_status", [
  "ongoing",
  "delivered",
  "miscarried",
  "terminated",
  "ectopic",
]);
export const pregnancyRiskEnum = pgEnum("pregnancy_risk", [
  "low",
  "medium",
  "high",
]);
export const deliveryMethodEnum = pgEnum("delivery_method", [
  "spontaneous",
  "vacuum",
  "forceps",
  "cesarean",
]);
export const deliveryOutcomeEnum = pgEnum("delivery_outcome", [
  "live_birth",
  "stillbirth",
  "neonatal_death",
]);
export const immunizationTypeEnum = pgEnum("immunization_type", [
  "bcg",
  "hepatitis_b",
  "polio",
  "dpt",
  "hib",
  "pcv",
  "rotavirus",
  "mmr",
  "je",
  "influenza",
  "other",
]);

// Inpatient Enums
export const roomClassEnum = pgEnum("room_class", [
  "vvip",
  "vip",
  "class_1",
  "class_2",
  "class_3",
  "icu",
  "nicu",
  "isolation",
]);
export const bedStatusEnum = pgEnum("bed_status", [
  "available",
  "occupied",
  "maintenance",
  "reserved",
]);
export const admissionStatusEnum = pgEnum("admission_status", [
  "admitted",
  "transferred",
  "discharged",
  "deceased",
]);
export const admissionTypeEnum = pgEnum("admission_type", [
  "emergency",
  "elective",
  "transfer",
  "maternity",
]);
export const dischargeDispositionEnum = pgEnum("discharge_disposition", [
  "home",
  "transfer",
  "rehab",
  "long_term_care",
  "deceased",
  "ama",
]);

// Pharmacy Enums
export const medicationTypeEnum = pgEnum("medication_type", [
  "prescription",
  "otc",
  "controlled",
  "supplement",
]);
export const controlledSubstanceScheduleEnum = pgEnum(
  "controlled_substance_schedule",
  [
    "schedule_1",
    "schedule_2",
    "schedule_3",
    "schedule_4",
    "schedule_5",
    "non_controlled",
  ]
);
export const stockMovementTypeEnum = pgEnum("stock_movement_type", [
  "purchase",
  "sale",
  "return",
  "adjustment",
  "transfer",
  "expiration",
  "damage",
  "dispense",
]);
export const dispenseStatusEnum = pgEnum("dispense_status", [
  "pending",
  "dispensed",
  "partially_dispensed",
  "cancelled",
]);
export const marStatusEnum = pgEnum("mar_status", [
  "scheduled",
  "given",
  "refused",
  "missed",
  "held",
]);

// Billing Enums
export const serviceTariffCategoryEnum = pgEnum("service_tariff_category", [
  "consultation",
  "procedure",
  "lab",
  "radiology",
  "pharmacy",
  "room",
  "nursing",
  "other",
]);
export const chargeStatusEnum = pgEnum("charge_status", [
  "pending",
  "invoiced",
  "paid",
  "cancelled",
  "adjusted",
]);
export const chargeSourceTypeEnum = pgEnum("charge_source_type", [
  "encounter",
  "procedure",
  "medication",
  "lab",
  "room",
  "nursing",
  "other",
]);
export const chargeAdjustmentTypeEnum = pgEnum("charge_adjustment_type", [
  "discount",
  "correction",
  "write_off",
  "reversal",
]);
export const invoiceTypeEnum = pgEnum("invoice_type", [
  "outpatient",
  "inpatient",
  "pharmacy_only",
  "lab_only",
]);
export const payerTypeEnum = pgEnum("payer_type", [
  "self_pay",
  "bpjs",
  "insurance",
  "corporate",
]);
export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "pending",
  "partial",
  "paid",
  "cancelled",
  "void",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "cash",
  "debit",
  "credit",
  "qris",
  "transfer",
  "deposit",
  "insurance",
  "bpjs",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "completed",
  "partial",
  "cancelled",
  "refunded",
]);
export const depositStatusEnum = pgEnum("deposit_status", [
  "active",
  "applied",
  "refunded",
  "expired",
]);
export const refundStatusEnum = pgEnum("refund_status", [
  "pending",
  "approved",
  "processed",
  "rejected",
]);
export const cashClosingShiftEnum = pgEnum("cash_closing_shift", [
  "morning",
  "afternoon",
  "evening",
  "night",
]);
export const cashClosingStatusEnum = pgEnum("cash_closing_status", [
  "pending",
  "closed",
  "verified",
]);
export const varianceStatusEnum = pgEnum("variance_status", [
  "balanced",
  "short",
  "over",
]);

// Reporting Enums
export const reportCategoryEnum = pgEnum("report_category", [
  "operational",
  "clinical",
  "financial",
  "regulatory",
  "kia",
]);
export const reportFrequencyEnum = pgEnum("report_frequency", [
  "daily",
  "weekly",
  "monthly",
  "on_demand",
]);
export const reportFormatEnum = pgEnum("report_format", [
  "pdf",
  "excel",
  "csv",
]);
export const reportGenerationStatusEnum = pgEnum("report_generation_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

// SatuSehat Enums
export const satusehatEnvironmentEnum = pgEnum("satusehat_environment", [
  "sandbox",
  "production",
]);
export const satusehatResourceTypeEnum = pgEnum("satusehat_resource_type", [
  "Patient",
  "Practitioner",
  "PractitionerRole",
  "Location",
  "Encounter",
  "Condition",
  "Observation",
  "Procedure",
  "MedicationRequest",
  "MedicationDispense",
  "ServiceRequest",
  "DiagnosticReport",
  "Composition",
]);
export const satusehatOperationEnum = pgEnum("satusehat_operation", [
  "create",
  "update",
  "search",
]);
export const satusehatSyncStatusEnum = pgEnum("satusehat_sync_status", [
  "pending",
  "processing",
  "completed",
  "failed",
  "skipped",
]);
export const satusehatErrorCategoryEnum = pgEnum("satusehat_error_category", [
  "transient",
  "client",
  "auth",
  "not_found",
  "server",
  "unknown",
]);
export const satusehatErrorResolutionEnum = pgEnum(
  "satusehat_error_resolution",
  ["pending", "auto_resolved", "manual_resolved", "ignored"]
);
export const satusehatConsentScopeEnum = pgEnum("satusehat_consent_scope", [
  "all",
  "encounter_only",
  "none",
]);
export const satusehatConsentMethodEnum = pgEnum("satusehat_consent_method", [
  "written",
  "verbal",
  "electronic",
]);
export const satusehatLookupStatusEnum = pgEnum("satusehat_lookup_status", [
  "found",
  "not_found",
  "error",
]);
export const satusehatVerificationMethodEnum = pgEnum(
  "satusehat_verification_method",
  ["nik_lookup", "manual"]
);

// BPJS Enums
export const bpjsFacilityTypeEnum = pgEnum("bpjs_facility_type", [
  "fktp",
  "fkrtl",
]);
export const bpjsEnvironmentEnum = pgEnum("bpjs_environment", [
  "development",
  "production",
]);
export const bpjsHealthStatusEnum = pgEnum("bpjs_health_status", [
  "healthy",
  "degraded",
  "unhealthy",
]);
export const bpjsPelayananEnum = pgEnum("bpjs_pelayanan", [
  "rawat_inap",
  "rawat_jalan",
]);
export const bpjsAsalRujukanEnum = pgEnum("bpjs_asal_rujukan", [
  "fktp",
  "fkrtl",
]);
export const bpjsTipeRujukanEnum = pgEnum("bpjs_tipe_rujukan", ["0", "1", "2"]);
export const bpjsPembiayaanEnum = pgEnum("bpjs_pembiayaan", ["1", "2", "3"]);
export const bpjsLakaLantasEnum = pgEnum("bpjs_laka_lantas", [
  "bukan",
  "kll",
  "kk",
  "kll_kk",
]);
export const bpjsTujuanKunjEnum = pgEnum("bpjs_tujuan_kunj", [
  "normal",
  "prosedur",
  "konsul_dokter",
]);
export const bpjsRujukanStatusEnum = pgEnum("bpjs_rujukan_status", [
  "active",
  "used",
  "expired",
  "cancelled",
]);
export const bpjsAntreanStatusEnum = pgEnum("bpjs_antrean_status", [
  "booked",
  "checkin",
  "called",
  "serving",
  "done",
  "cancelled",
]);
export const bpjsJenisKunjunganEnum = pgEnum("bpjs_jenis_kunjungan", [
  "1",
  "2",
  "3",
  "4",
]);
export const bpjsInacbgStatusEnum = pgEnum("bpjs_inacbg_status", [
  "pending",
  "grouped",
  "submitted",
  "purified",
  "verified",
  "paid",
  "rejected",
]);
export const bpjsVerificationStatusEnum = pgEnum("bpjs_verification_status", [
  "pending",
  "approved",
  "partial",
  "rejected",
]);
export const bpjsSepStatusEnum = pgEnum("bpjs_sep_status", [
  "created",
  "used",
  "updated",
  "deleted",
]);
export const bpjsSeverityLevelEnum = pgEnum("bpjs_severity_level", [
  "I",
  "II",
  "III",
]);
export const bpjsJenisRawatEnum = pgEnum("bpjs_jenis_rawat", [
  "rawat_inap",
  "rawat_jalan",
]);

// ============================================================================
// BASE TABLES
// ============================================================================

/**
 * Base table with common fields for all tables
 */
export const baseFields = {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

/**
 * Base table with soft delete support
 */
export const softDeleteFields = {
  ...baseFields,
  deletedAt: timestamp("deleted_at"),
  deletedBy: uuid("deleted_by"),
};

/**
 * Base table with BSON/JSONB resource storage
 */
export const bsonFields = {
  resource: jsonb("resource").$type<{
    version?: number;
    bsonData?: Record<string, any>;
    metadata?: Record<string, any>;
  }>(),
};

/**
 * Base table for audit trail
 */
export const auditFields = {
  createdBy: uuid("created_by"),
  updatedBy: uuid("updated_by"),
  version: timestamp("version").defaultNow(),
};

/**
 * Helper function to create a table with standard fields
 */
export function createTable(name: string) {
  return pgTable(name, {
    ...baseFields,
  });
}

/**
 * Helper function to create a table with soft delete support
 */
export function createSoftDeleteTable(name: string) {
  return pgTable(name, {
    ...softDeleteFields,
  });
}

/**
 * Helper function to create a table with BSON support
 */
export function createBsonTable(name: string) {
  return pgTable(name, {
    ...baseFields,
    ...bsonFields,
  });
}

/**
 * Helper function to create a table with audit trail
 */
export function createAuditTable(name: string) {
  return pgTable(name, {
    ...baseFields,
    ...auditFields,
  });
}

/**
 * Helper function to create a table with all standard features
 */
export function createFullTable(name: string) {
  return pgTable(name, {
    ...baseFields,
    ...bsonFields,
    ...auditFields,
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),
  });
}

// ============================================================================
// COMMON INDEXES
// ============================================================================

/**
 * Common index definitions
 */
export const commonIndexes = {
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
  status: "status",
  active: "is_active",
};

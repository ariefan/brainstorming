import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  maritalStatusEnum,
  bloodTypeEnum,
  rhesusEnum,
  patientStatusEnum,
  allergySeverityEnum,
  allergyTypeEnum,
  BsonResource,
  fullFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";

// ============================================================================
// PATIENT MANAGEMENT TABLES
// ============================================================================

/**
 * Patients table
 * Represents patients
 */
export const patients = pgTable(
  "patients",
  {
    ...fullFields,

    // Patient fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    mrn: varchar("mrn", { length: 30 }).notNull().unique(), // Medical Record Number
    nik: varchar("nik", { length: 16 }).unique(), // Indonesian National ID
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstNameId: varchar("first_name_id", { length: 100 }), // Indonesian name
    lastNameId: varchar("last_name_id", { length: 100 }),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    placeOfBirth: varchar("place_of_birth", { length: 100 }),
    maritalStatus: maritalStatusEnum("marital_status"),
    bloodType: bloodTypeEnum("blood_type"),
    rhesus: rhesusEnum("rhesus"),
    phone: varchar("phone", { length: 20 }),
    mobile: varchar("mobile", { length: 20 }),
    email: varchar("email", { length: 255 }),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 10 }),
    country: varchar("country", { length: 100 }).default("Indonesia"),
    nationality: varchar("nationality", { length: 100 }).default("Indonesia"),
    occupation: varchar("occupation", { length: 100 }),
    education: varchar("education", { length: 100 }),
    religion: varchar("religion", { length: 50 }),
    status: patientStatusEnum("status").default("active"),
    photoUrl: varchar("photo_url", { length: 500 }),
    emergencyContactName: varchar("emergency_contact_name", { length: 255 }),
    emergencyContactPhone: varchar("emergency_contact_phone", { length: 20 }),
    emergencyContactRelation: varchar("emergency_contact_relation", {
      length: 50,
    }),
    bpjsNumber: varchar("bpjs_number", { length: 20 }), // BPJS card number
    satusehatIhsId: varchar("satusehat_ihs_id", { length: 100 }), // SatuSehat patient ID

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),

    // Sync Status - JKN/BPJS (verification status)
    isJknVerified: boolean("is_jkn_verified").default(false),
    jknVerifiedAt: timestamp("jkn_verified_at"),
    jknVerificationError: text("jkn_verification_error"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_patient_org_id").on(table.organizationId),
    index("idx_patient_branch_id").on(table.branchId),
    uniqueIndex("idx_patient_mrn").on(table.mrn),
    uniqueIndex("idx_patient_nik").on(table.nik),
    index("idx_patient_name").on(table.fullName),
    index("idx_patient_dob").on(table.dateOfBirth),
    index("idx_patient_status").on(table.status),
    index("idx_patient_bpjs_number").on(table.bpjsNumber),
    index("idx_patient_satusehat_ihs_id").on(table.satusehatIhsId),
    index("idx_patient_satusehat_synced").on(table.isSatusehatSynced),
    index("idx_patient_jkn_verified").on(table.isJknVerified),
  ]
);

/**
 * Allergies table
 * Represents patient allergies
 */
export const allergies = pgTable(
  "allergies",
  {
    ...fullFields,

    // Allergy fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    allergen: varchar("allergen", { length: 255 }).notNull(),
    allergenId: varchar("allergen_id", { length: 255 }), // Indonesian name
    allergyType: allergyTypeEnum("allergy_type").notNull(),
    severity: allergySeverityEnum("severity").notNull(),
    reaction: text("reaction"),
    onsetDate: date("onset_date"),
    isVerified: boolean("is_verified").default(false),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    verifiedAt: timestamp("verified_at"),
    notes: text("notes"),

    // SatuSehat Integration
    satusehatAllergyIntoleranceId: varchar("satusehat_allergy_intolerance_id", {
      length: 100,
    }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),
  },
  (table) => [
    index("idx_allergy_patient_id").on(table.patientId),
    index("idx_allergy_type").on(table.allergyType),
    index("idx_allergy_severity").on(table.severity),
    index("idx_allergy_satusehat_synced").on(table.isSatusehatSynced),
  ]
);

/**
 * Chronic conditions table
 * Represents patient chronic conditions
 */
export const chronicConditions = pgTable(
  "chronic_conditions",
  {
    ...fullFields,

    // Chronic condition fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    conditionName: varchar("condition_name", { length: 255 }).notNull(),
    conditionNameId: varchar("condition_name_id", { length: 255 }), // Indonesian name
    icd10Code: varchar("icd10_code", { length: 10 }),
    icd10Description: varchar("icd10_description", { length: 255 }),
    diagnosisDate: date("diagnosis_date"),
    isControlled: boolean("is_controlled").default(false),
    notes: text("notes"),
  },
  (table) => [
    index("idx_chronic_condition_patient_id").on(table.patientId),
    index("idx_chronic_condition_icd10").on(table.icd10Code),
  ]
);

/**
 * Family relationships table
 * Represents patient family relationships
 */
export const familyRelationships = pgTable(
  "family_relationships",
  {
    ...fullFields,

    // Family relationship fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    familyMemberId: uuid("family_member_id").references(() => patients.id, {
      onDelete: "cascade",
    }),
    relationshipType: varchar("relationship_type", { length: 50 }).notNull(),
    relationshipTypeId: varchar("relationship_type_id", { length: 50 }), // Indonesian
    isEmergencyContact: boolean("is_emergency_contact").default(false),
    notes: text("notes"),
  },
  (table) => [
    index("idx_family_relationship_patient_id").on(table.patientId),
    index("idx_family_relationship_member_id").on(table.familyMemberId),
    index("idx_family_relationship_type").on(table.relationshipType),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const patientsRelations = relations(patients, ({ many }) => ({
  allergies: many(allergies),
  chronicConditions: many(chronicConditions),
  familyRelationships: many(familyRelationships),
}));

export const allergiesRelations = relations(allergies, ({ one }) => ({
  patient: one(patients, {
    fields: [allergies.patientId],
    references: [patients.id],
  }),
}));

export const chronicConditionsRelations = relations(
  chronicConditions,
  ({ one }) => ({
    patient: one(patients, {
      fields: [chronicConditions.patientId],
      references: [patients.id],
    }),
  })
);

export const familyRelationshipsRelations = relations(
  familyRelationships,
  ({ one }) => ({
    patient: one(patients, {
      fields: [familyRelationships.patientId],
      references: [patients.id],
    }),
    familyMember: one(patients, {
      fields: [familyRelationships.familyMemberId],
      references: [patients.id],
    }),
  })
);

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
  genderEnum,
  maritalStatusEnum,
  bloodTypeEnum,
  rhesusEnum,
  patientStatusEnum,
  allergySeverityEnum,
  allergyTypeEnum,
  BsonResource,
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
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Patient fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    mrn: varchar("mrn", { length: 30 }).notNull().unique(), // Medical Record Number
    nik: varchar("nik", { length: 16 }).notNull().unique(), // Indonesian NIK
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstNameId: varchar("first_name_id", { length: 100 }), // Indonesian name
    lastNameId: varchar("last_name_id", { length: 100 }),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    gender: genderEnum("gender").notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    placeOfBirth: varchar("place_of_birth", { length: 100 }),
    maritalStatus: maritalStatusEnum("marital_status"),
    bloodType: bloodTypeEnum("blood_type"),
    rhesus: rhesusEnum("rhesus"),
    nationality: varchar("nationality", { length: 50 }).default("Indonesia"),
    religion: varchar("religion", { length: 50 }),
    occupation: varchar("occupation", { length: 100 }),
    education: varchar("education", { length: 100 }),
    phone: varchar("phone", { length: 20 }),
    mobile: varchar("mobile", { length: 20 }),
    email: varchar("email", { length: 255 }),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 10 }),
    country: varchar("country", { length: 100 }).default("Indonesia"),
    emergencyContactName: varchar("emergency_contact_name", { length: 255 }),
    emergencyContactPhone: varchar("emergency_contact_phone", { length: 20 }),
    emergencyContactRelation: varchar("emergency_contact_relation", {
      length: 50,
    }),
    bpjsNumber: varchar("bpjs_number", { length: 13 }), // BPJS card number
    bpjsClass: varchar("bpjs_class", { length: 5 }), // BPJS class (1, 2, 3)
    bpjsFaskesCode: varchar("bpjs_faskes_code", { length: 20 }),
    satusehatIhsId: varchar("satusehat_ihs_id", { length: 100 }), // SatuSehat IHS ID
    photoUrl: varchar("photo_url", { length: 500 }),
    status: patientStatusEnum("status").default("active"),
    registrationDate: date("registration_date").notNull(),
    lastVisitDate: date("last_visit_date"),
    notes: text("notes"),
    customFields: jsonb("custom_fields").$type<Record<string, any>>(),
  },
  (table) => [
    index("idx_patient_org_id").on(table.organizationId),
    index("idx_patient_branch_id").on(table.branchId),
    uniqueIndex("idx_patient_mrn").on(table.mrn),
    uniqueIndex("idx_patient_nik").on(table.nik),
    index("idx_patient_bpjs_number").on(table.bpjsNumber),
    index("idx_patient_satusehat_ihs_id").on(table.satusehatIhsId),
    index("idx_patient_status").on(table.status),
    index("idx_patient_dob").on(table.dateOfBirth),
    index("idx_patient_full_name").on(table.fullName),
  ]
);

/**
 * Allergies table
 * Represents patient allergies
 */
export const allergies = pgTable(
  "allergies",
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

    // Allergy fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    allergen: varchar("allergen", { length: 255 }).notNull(),
    allergenType: allergyTypeEnum("allergen_type").notNull(),
    severity: allergySeverityEnum("severity").notNull(),
    reaction: text("reaction"),
    onsetDate: date("onset_date"),
    isVerified: boolean("is_verified").default(false),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    verifiedAt: timestamp("verified_at"),
    notes: text("notes"),
    rxNormCode: varchar("rx_norm_code", { length: 20 }), // RxNorm code for medications
  },
  (table) => [
    index("idx_allergy_patient_id").on(table.patientId),
    index("idx_allergy_type").on(table.allergenType),
    index("idx_allergy_severity").on(table.severity),
    index("idx_allergy_verified").on(table.isVerified),
  ]
);

/**
 * Chronic conditions table
 * Represents patient chronic conditions
 */
export const chronicConditions = pgTable(
  "chronic_conditions",
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

    // Chronic condition fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    conditionName: varchar("condition_name", { length: 255 }).notNull(),
    icd10Code: varchar("icd10_code", { length: 10 }), // ICD-10 code
    onsetDate: date("onset_date"),
    status: varchar("status", { length: 50 }).default("active"), // active, resolved, chronic
    severity: varchar("severity", { length: 50 }), // mild, moderate, severe
    isControlled: boolean("is_controlled").default(false),
    lastExacerbationDate: date("last_exacerbation_date"),
    notes: text("notes"),
    medications: jsonb("medications").$type<
      Array<{
        name: string;
        dosage: string;
        frequency: string;
      }>
    >(),
  },
  (table) => [
    index("idx_chronic_condition_patient_id").on(table.patientId),
    index("idx_chronic_condition_icd10").on(table.icd10Code),
    index("idx_chronic_condition_status").on(table.status),
  ]
);

/**
 * Family relationships table
 * Represents patient family members
 */
export const familyRelationships = pgTable(
  "family_relationships",
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

    // Family relationship fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    familyMemberId: uuid("family_member_id").references(() => patients.id, {
      onDelete: "cascade",
    }),
    relationshipType: varchar("relationship_type", { length: 50 }).notNull(), // spouse, parent, child, sibling, etc.
    isEmergencyContact: boolean("is_emergency_contact").default(false),
    isPrimaryContact: boolean("is_primary_contact").default(false),
    notes: text("notes"),
  },
  (table) => [
    index("idx_family_patient_id").on(table.patientId),
    index("idx_family_member_id").on(table.familyMemberId),
    index("idx_family_relationship_type").on(table.relationshipType),
    uniqueIndex("idx_family_patient_member").on(
      table.patientId,
      table.familyMemberId
    ),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const patientsRelations = relations(patients, ({ many }) => ({
  allergies: many(allergies),
  chronicConditions: many(chronicConditions),
  familyMembers: many(familyRelationships),
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
      relationName: "patient",
    }),
    familyMember: one(patients, {
      fields: [familyRelationships.familyMemberId],
      references: [patients.id],
      relationName: "familyMember",
    }),
  })
);

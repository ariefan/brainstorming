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
  roomClassEnum,
  bedStatusEnum,
  admissionStatusEnum,
  admissionTypeEnum,
  dischargeDispositionEnum,
  marStatusEnum,
  BsonResource,
  fullFields,
  baseFields,
  bsonFields,
  softDeleteFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { practitioners } from "./practitioners";
import { encounters } from "./medical";

// ============================================================================
// INPATIENT TABLES
// ============================================================================

/**
 * Wards table
 * Represents hospital wards
 */
export const wards = pgTable(
  "wards",
  {
    ...fullFields,

    // Ward fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    wardCode: varchar("ward_code", { length: 20 }).notNull(),
    wardName: varchar("ward_name", { length: 255 }).notNull(),
    wardNameId: varchar("ward_name_id", { length: 255 }), // Indonesian name
    wardType: varchar("ward_type", { length: 50 }),
    floor: varchar("floor", { length: 20 }),
    location: varchar("location", { length: 100 }),
    capacity: integer("capacity").notNull(),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_ward_org_id").on(table.organizationId),
    index("idx_ward_branch_id").on(table.branchId),
    index("idx_ward_active").on(table.isActive),
  ]
);

/**
 * Rooms table
 * Represents hospital rooms
 */
export const rooms = pgTable(
  "rooms",
  {
    ...fullFields,

    // Room fields
    wardId: uuid("ward_id")
      .notNull()
      .references(() => wards.id, { onDelete: "cascade" }),
    roomCode: varchar("room_code", { length: 20 }).notNull(),
    roomName: varchar("room_name", { length: 255 }).notNull(),
    roomClass: roomClassEnum("room_class").notNull(),
    capacity: integer("capacity").notNull(),
    hasPrivateBathroom: boolean("has_private_bathroom").default(false),
    hasTv: boolean("has_tv").default(false),
    hasAc: boolean("has_ac").default(false),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_room_ward_id").on(table.wardId),
    index("idx_room_class").on(table.roomClass),
    index("idx_room_active").on(table.isActive),
  ]
);

/**
 * Beds table
 * Represents hospital beds
 */
export const beds = pgTable(
  "beds",
  {
    ...fullFields,

    // Bed fields
    roomId: uuid("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }),
    bedCode: varchar("bed_code", { length: 20 }).notNull(),
    bedNumber: varchar("bed_number", { length: 20 }).notNull(),
    bedType: varchar("bed_type", { length: 50 }),
    status: bedStatusEnum("status").default("available"),
    isIsolation: boolean("is_isolation").default(false),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_bed_room_id").on(table.roomId),
    index("idx_bed_status").on(table.status),
    index("idx_bed_active").on(table.isActive),
  ]
);

/**
 * Admissions table
 * Represents patient admissions
 */
export const admissions = pgTable(
  "admissions",
  {
    ...fullFields,

    // Admission fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    admissionNumber: varchar("admission_number", { length: 30 })
      .notNull()
      .unique(),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    wardId: uuid("ward_id")
      .notNull()
      .references(() => wards.id, { onDelete: "set null" }),
    roomId: uuid("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "set null" }),
    bedId: uuid("bed_id")
      .notNull()
      .references(() => beds.id, { onDelete: "set null" }),
    admissionDate: timestamp("admission_date").notNull(),
    admissionType: admissionTypeEnum("admission_type").notNull(),
    admissionReason: text("admission_reason"),
    dischargeDate: timestamp("discharge_date"),
    dischargeDisposition: dischargeDispositionEnum("discharge_disposition"),
    dischargeReason: text("discharge_reason"),
    referringDoctor: varchar("referring_doctor", { length: 255 }),
    referringDoctorId: varchar("referring_doctor_id", { length: 100 }),
    attendingDoctorId: uuid("attending_doctor_id").references(
      () => practitioners.id,
      {
        onDelete: "set null",
      }
    ),
    status: admissionStatusEnum("status").default("admitted"),
    bpjsSepNumber: varchar("bpjs_sep_number", { length: 30 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_admission_org_id").on(table.organizationId),
    index("idx_admission_branch_id").on(table.branchId),
    index("idx_admission_patient_id").on(table.patientId),
    index("idx_admission_encounter_id").on(table.encounterId),
    index("idx_admission_ward_id").on(table.wardId),
    index("idx_admission_room_id").on(table.roomId),
    index("idx_admission_bed_id").on(table.bedId),
    uniqueIndex("idx_admission_number").on(table.admissionNumber),
    index("idx_admission_status").on(table.status),
  ]
);

/**
 * Inpatient progress notes table
 * Represents inpatient progress notes
 */
export const inpatientProgressNotes = pgTable(
  "inpatient_progress_notes",
  {
    ...fullFields,

    // Progress note fields
    admissionId: uuid("admission_id")
      .notNull()
      .references(() => admissions.id, { onDelete: "cascade" }),
    noteDate: timestamp("note_date").notNull(),
    notedBy: uuid("noted_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    noteType: varchar("note_type", { length: 50 }), // nursing, doctor, vitals, etc.
    chiefComplaint: text("chief_complaint"),
    assessment: text("assessment"),
    plan: text("plan"),
    vitalSigns: jsonb("vital_signs").$type<Record<string, any>>(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_inpatient_progress_note_admission_id").on(table.admissionId),
    index("idx_inpatient_progress_note_date").on(table.noteDate),
  ]
);

/**
 * Medication administrations table
 * Represents medication administrations
 */
export const medicationAdministrations = pgTable(
  "medication_administrations",
  {
    ...fullFields,

    // Medication administration fields
    admissionId: uuid("admission_id")
      .notNull()
      .references(() => admissions.id, { onDelete: "cascade" }),
    medicationName: varchar("medication_name", { length: 255 }).notNull(),
    medicationNameId: varchar("medication_name_id", { length: 255 }),
    dosage: varchar("dosage", { length: 50 }),
    route: varchar("route", { length: 50 }),
    frequency: varchar("frequency", { length: 50 }),
    administeredAt: timestamp("administered_at").notNull(),
    administeredBy: uuid("administered_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    status: marStatusEnum("status").default("scheduled"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_medication_administration_admission_id").on(table.admissionId),
    index("idx_medication_administration_status").on(table.status),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const wardsRelations = relations(wards, ({ many }) => ({
  rooms: many(rooms),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  beds: many(beds),
  admissions: many(admissions),
}));

export const bedsRelations = relations(beds, ({ many }) => ({
  admissions: many(admissions),
}));

export const admissionsRelations = relations(admissions, ({ many }) => ({
  progressNotes: many(inpatientProgressNotes),
  medicationAdministrations: many(medicationAdministrations),
}));

export const inpatientProgressNotesRelations = relations(
  inpatientProgressNotes,
  ({ one }) => ({
    admission: one(admissions, {
      fields: [inpatientProgressNotes.admissionId],
      references: [admissions.id],
    }),
  })
);

export const medicationAdministrationsRelations = relations(
  medicationAdministrations,
  ({ one }) => ({
    admission: one(admissions, {
      fields: [medicationAdministrations.admissionId],
      references: [admissions.id],
    }),
  })
);

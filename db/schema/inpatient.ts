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
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { polyclinics } from "./practitioners";
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
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Ward fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    wardCode: varchar("ward_code", { length: 20 }).notNull(),
    wardName: varchar("ward_name", { length: 255 }).notNull(),
    wardNameId: varchar("ward_name_id", { length: 255 }), // Indonesian name
    wardType: varchar("ward_type", { length: 50 }), // general, icu, nicu, maternity, pediatric
    location: varchar("location", { length: 100 }),
    floor: varchar("floor", { length: 20 }),
    isActive: boolean("is_active").default(true),
    capacity: integer("capacity"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_ward_org_id").on(table.organizationId),
    index("idx_ward_branch_id").on(table.branchId),
    uniqueIndex("idx_ward_code").on(table.organizationId, table.wardCode),
    index("idx_ward_active").on(table.isActive),
  ]
);

/**
 * Rooms table
 * Represents inpatient rooms
 */
export const rooms = pgTable(
  "rooms",
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

    // Room fields
    wardId: uuid("ward_id")
      .notNull()
      .references(() => wards.id, { onDelete: "cascade" }),
    roomCode: varchar("room_code", { length: 20 }).notNull(),
    roomNumber: varchar("room_number", { length: 20 }).notNull(),
    roomName: varchar("room_name", { length: 255 }),
    roomClass: roomClassEnum("room_class").notNull(),
    bedCount: integer("bed_count").notNull(),
    hasBathroom: boolean("has_bathroom").default(false),
    hasAc: boolean("has_ac").default(false),
    hasTv: boolean("has_tv").default(false),
    hasPhone: boolean("has_phone").default(false),
    hasWifi: boolean("has_wifi").default(false),
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => [
    index("idx_room_ward_id").on(table.wardId),
    uniqueIndex("idx_room_code").on(table.wardId, table.roomCode),
    index("idx_room_class").on(table.roomClass),
    index("idx_room_active").on(table.isActive),
  ]
);

/**
 * Beds table
 * Represents inpatient beds
 */
export const beds = pgTable(
  "beds",
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

    // Bed fields
    roomId: uuid("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }),
    bedNumber: varchar("bed_number", { length: 20 }).notNull(),
    bedType: varchar("bed_type", { length: 50 }), // standard, electric, icu, nicu, pediatric
    status: bedStatusEnum("status").default("available"),
    isIsolation: boolean("is_isolation").default(false),
    isVentilator: boolean("is_ventilator").default(false),
    isOxygen: boolean("is_oxygen").default(false),
    isMonitor: boolean("is_monitor").default(false),
    notes: text("notes"),
  },
  (table) => [
    index("idx_bed_room_id").on(table.roomId),
    uniqueIndex("idx_bed_number").on(table.roomId, table.bedNumber),
    index("idx_bed_status").on(table.status),
  ]
);

/**
 * Admissions table
 * Represents patient admissions
 */
export const admissions = pgTable(
  "admissions",
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

    // Admission fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    admissionNumber: varchar("admission_number", { length: 30 })
      .notNull()
      .unique(),
    bedId: uuid("bed_id")
      .notNull()
      .references(() => beds.id, { onDelete: "set null" }),
    admissionType: admissionTypeEnum("admission_type").notNull(),
    admissionDate: date("admission_date").notNull(),
    admissionTime: timestamp("admission_time").notNull(),
    dischargeDate: date("discharge_date"),
    dischargeTime: timestamp("discharge_time"),
    status: admissionStatusEnum("status").default("admitted"),
    lengthOfStay: integer("length_of_stay"), // days
    reason: text("reason"),
    diagnosis: text("diagnosis"),
    dischargeDisposition: dischargeDispositionEnum("discharge_disposition"),
    dischargeReason: text("discharge_reason"),
    bpjsSepNumber: varchar("bpjs_sep_number", { length: 30 }),
    satusehatEncounterId: varchar("satusehat_encounter_id", { length: 100 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_admission_org_id").on(table.organizationId),
    index("idx_admission_branch_id").on(table.branchId),
    index("idx_admission_patient_id").on(table.patientId),
    index("idx_admission_encounter_id").on(table.encounterId),
    index("idx_admission_bed_id").on(table.bedId),
    uniqueIndex("idx_admission_number").on(table.admissionNumber),
    index("idx_admission_date").on(table.admissionDate),
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
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Progress note fields
    admissionId: uuid("admission_id")
      .notNull()
      .references(() => admissions.id, { onDelete: "cascade" }),
    notedAt: timestamp("noted_at").notNull(),
    notedBy: uuid("noted_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    noteType: varchar("note_type", { length: 50 }).notNull(), // nursing, medical, vital, procedure, other
    subject: varchar("subject", { length: 255 }),
    content: text("content").notNull(),
    isCritical: boolean("is_critical").default(false),
    attachments: jsonb("attachments").$type<
      Array<{
        name: string;
        url: string;
        type: string;
      }>
    >(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_inpatient_progress_note_admission_id").on(table.admissionId),
    index("idx_inpatient_progress_note_noted_at").on(table.notedAt),
  ]
);

/**
 * Medication administrations table
 * Represents MAR (Medication Administration Record)
 */
export const medicationAdministrations = pgTable(
  "medication_administrations",
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

    // MAR fields
    admissionId: uuid("admission_id")
      .notNull()
      .references(() => admissions.id, { onDelete: "cascade" }),
    prescriptionItemId: uuid("prescription_item_id").notNull(),
    medicationName: varchar("medication_name", { length: 255 }).notNull(),
    dosage: varchar("dosage", { length: 100 }),
    route: varchar("route", { length: 50 }),
    frequency: varchar("frequency", { length: 50 }),
    scheduledTime: timestamp("scheduled_time").notNull(),
    administeredAt: timestamp("administered_at"),
    administeredBy: uuid("administered_by").references(() => users.id, {
      onDelete: "set null",
    }),
    status: marStatusEnum("status").default("scheduled"),
    refusedReason: text("refused_reason"),
    missedReason: text("missed_reason"),
    heldReason: text("held_reason"),
    witnessBy: uuid("witness_by").references(() => users.id, {
      onDelete: "set null",
    }), // For controlled substances
    notes: text("notes"),
  },
  (table) => [
    index("idx_medication_administration_admission_id").on(table.admissionId),
    index("idx_medication_administration_scheduled_time").on(
      table.scheduledTime
    ),
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

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
  polyclinicTypeEnum,
  dayOfWeekEnum,
  practitionerTypeEnum,
  specialtyEnum,
  genderEnum,
  BsonResource,
  fullFields,
  baseFields,
  bsonFields,
  softDeleteFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";

// ============================================================================
// PRACTITIONER & POLYCLINIC TABLES
// ============================================================================

/**
 * Polyclinics table
 * Represents polyclinics
 */
export const polyclinics = pgTable(
  "polyclinics",
  {
    ...fullFields,

    // Polyclinic fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    polyclinicCode: varchar("polyclinic_code", { length: 20 }).notNull(),
    polyclinicName: varchar("polyclinic_name", { length: 255 }).notNull(),
    polyclinicNameId: varchar("polyclinic_name_id", { length: 255 }), // Indonesian name
    polyclinicType: polyclinicTypeEnum("polyclinic_type").notNull(),
    description: text("description"),
    location: varchar("location", { length: 100 }),
    floor: varchar("floor", { length: 20 }),
    queuePrefix: varchar("queue_prefix", { length: 5 }), // e.g., "A", "B", "C"
    satusehatLocationId: varchar("satusehat_location_id", { length: 100 }), // SatuSehat location ID
    bpjsPoliCode: varchar("bpjs_poli_code", { length: 20 }), // BPJS polyclinic code
    operatingHours: jsonb("operating_hours").$type<{
      monday?: { open: string; close: string; closed?: boolean };
      tuesday?: { open: string; close: string; closed?: boolean };
      wednesday?: { open: string; close: string; closed?: boolean };
      thursday?: { open: string; close: string; closed?: boolean };
      friday?: { open: string; close: string; closed?: boolean };
      saturday?: { open: string; close: string; closed?: boolean };
      sunday?: { open: string; close: string; closed?: boolean };
    }>(),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_polyclinic_org_id").on(table.organizationId),
    index("idx_polyclinic_branch_id").on(table.branchId),
    uniqueIndex("idx_polyclinic_code").on(
      table.organizationId,
      table.polyclinicCode
    ),
    index("idx_polyclinic_type").on(table.polyclinicType),
    index("idx_polyclinic_satusehat_id").on(table.satusehatLocationId),
    index("idx_polyclinic_bpjs_code").on(table.bpjsPoliCode),
    index("idx_polyclinic_active").on(table.isActive),
  ]
);

/**
 * Practitioners table
 * Represents practitioners
 */
export const practitioners = pgTable(
  "practitioners",
  {
    ...fullFields,

    // Practitioner fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    practitionerNumber: varchar("practitioner_number", { length: 30 })
      .notNull()
      .unique(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstNameId: varchar("first_name_id", { length: 100 }), // Indonesian name
    lastNameId: varchar("last_name_id", { length: 100 }),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    gender: genderEnum("gender"),
    dateOfBirth: date("date_of_birth"),
    phone: varchar("phone", { length: 20 }),
    mobile: varchar("mobile", { length: 20 }),
    email: varchar("email", { length: 255 }),
    practitionerType: practitionerTypeEnum("practitioner_type").notNull(),
    specialty: specialtyEnum("specialty"),
    licenseNumber: varchar("license_number", { length: 100 }),
    licenseExpiry: date("license_expiry"),
    satusehatIhsId: varchar("satusehat_ihs_id", { length: 100 }), // SatuSehat practitioner ID
    nip: varchar("nip", { length: 30 }), // Indonesian employee number
    str: varchar("str", { length: 50 }), // Indonesian doctor registration number
    sip: varchar("sip", { length: 50 }), // Indonesian practice permit
    isActive: boolean("is_active").default(true),
    photoUrl: varchar("photo_url", { length: 500 }),
    bio: text("bio"),
    education: jsonb("education").$type<
      Array<{
        institution: string;
        degree: string;
        year: string;
      }>
    >(),
    certifications: jsonb("certifications").$type<
      Array<{
        name: string;
        issuer: string;
        date: string;
        expiry?: string;
      }>
    >(),
  },
  (table) => [
    index("idx_practitioner_org_id").on(table.organizationId),
    index("idx_practitioner_branch_id").on(table.branchId),
    uniqueIndex("idx_practitioner_number").on(table.practitionerNumber),
    index("idx_practitioner_type").on(table.practitionerType),
    index("idx_practitioner_specialty").on(table.specialty),
    index("idx_practitioner_satusehat_ihs_id").on(table.satusehatIhsId),
    index("idx_practitioner_active").on(table.isActive),
  ]
);

/**
 * Practitioner polyclinics table
 * Represents practitioner-polyclinic assignments
 */
export const practitionerPolyclinics = pgTable(
  "practitioner_polyclinics",
  {
    ...fullFields,

    // Practitioner-polyclinic assignment fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    isPrimary: boolean("is_primary").default(false),
    effectiveFrom: date("effective_from").notNull(),
    effectiveTo: date("effective_to"),
  },
  (table) => [
    index("idx_practitioner_poly_practitioner_id").on(table.practitionerId),
    index("idx_practitioner_poly_polyclinic_id").on(table.polyclinicId),
    uniqueIndex("idx_practitioner_poly_unique").on(
      table.practitionerId,
      table.polyclinicId,
      table.effectiveFrom
    ),
    index("idx_practitioner_poly_primary").on(table.isPrimary),
  ]
);

/**
 * Practitioner schedules table
 * Represents practitioner schedules
 */
export const practitionerSchedules = pgTable(
  "practitioner_schedules",
  {
    ...fullFields,

    // Schedule fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
    startTime: varchar("start_time", { length: 10 }).notNull(),
    endTime: varchar("end_time", { length: 10 }).notNull(),
    isAvailable: boolean("is_available").default(true),
    effectiveFrom: date("effective_from").notNull(),
    effectiveTo: date("effective_to"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_practitioner_schedule_practitioner_id").on(table.practitionerId),
    index("idx_practitioner_schedule_polyclinic_id").on(table.polyclinicId),
    index("idx_practitioner_schedule_day").on(table.dayOfWeek),
    uniqueIndex("idx_practitioner_schedule_unique").on(
      table.practitionerId,
      table.polyclinicId,
      table.dayOfWeek,
      table.effectiveFrom
    ),
  ]
);

/**
 * Schedule exceptions table
 * Represents schedule exceptions
 */
export const scheduleExceptions = pgTable(
  "schedule_exceptions",
  {
    ...fullFields,

    // Exception fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    exceptionDate: date("exception_date").notNull(),
    isAvailable: boolean("is_available").default(false),
    reason: text("reason"),
  },
  (table) => [
    index("idx_schedule_exception_practitioner_id").on(table.practitionerId),
    index("idx_schedule_exception_polyclinic_id").on(table.polyclinicId),
    index("idx_schedule_exception_date").on(table.exceptionDate),
    uniqueIndex("idx_schedule_exception_unique").on(
      table.practitionerId,
      table.polyclinicId,
      table.exceptionDate
    ),
  ]
);

/**
 * Appointment slots table
 * Represents appointment slots
 */
export const appointmentSlots = pgTable(
  "appointment_slots",
  {
    ...baseFields,
    ...bsonFields,
    ...softDeleteFields,

    // Slot fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    slotDate: date("slot_date").notNull(),
    startTime: varchar("start_time", { length: 10 }).notNull(),
    endTime: varchar("end_time", { length: 10 }).notNull(),
    duration: varchar("duration", { length: 20 }).notNull(), // minutes
    isAvailable: boolean("is_available").default(true),
    isBooked: boolean("is_booked").default(false),
    bookedBy: uuid("booked_by").references(() => users.id, {
      onDelete: "set null",
    }),
    bookedAt: timestamp("booked_at"),
  },
  (table) => [
    index("idx_appointment_slot_practitioner_id").on(table.practitionerId),
    index("idx_appointment_slot_polyclinic_id").on(table.polyclinicId),
    index("idx_appointment_slot_date").on(table.slotDate),
    index("idx_appointment_slot_available").on(table.isAvailable),
    index("idx_appointment_slot_booked").on(table.isBooked),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const polyclinicsRelations = relations(polyclinics, ({ many }) => ({
  practitioners: many(practitionerPolyclinics),
}));

export const practitionersRelations = relations(practitioners, ({ many }) => ({
  polyclinics: many(practitionerPolyclinics),
  schedules: many(practitionerSchedules),
  exceptions: many(scheduleExceptions),
  slots: many(appointmentSlots),
}));

export const practitionerPolyclinicsRelations = relations(
  practitionerPolyclinics,
  ({ one }) => ({
    practitioner: one(practitioners, {
      fields: [practitionerPolyclinics.practitionerId],
      references: [practitioners.id],
    }),
    polyclinic: one(polyclinics, {
      fields: [practitionerPolyclinics.polyclinicId],
      references: [polyclinics.id],
    }),
  })
);

export const practitionerSchedulesRelations = relations(
  practitionerSchedules,
  ({ one }) => ({
    practitioner: one(practitioners, {
      fields: [practitionerSchedules.practitionerId],
      references: [practitioners.id],
    }),
    polyclinic: one(polyclinics, {
      fields: [practitionerSchedules.polyclinicId],
      references: [polyclinics.id],
    }),
  })
);

export const scheduleExceptionsRelations = relations(
  scheduleExceptions,
  ({ one }) => ({
    practitioner: one(practitioners, {
      fields: [scheduleExceptions.practitionerId],
      references: [practitioners.id],
    }),
    polyclinic: one(polyclinics, {
      fields: [scheduleExceptions.polyclinicId],
      references: [polyclinics.id],
    }),
  })
);

export const appointmentSlotsRelations = relations(
  appointmentSlots,
  ({ one }) => ({
    practitioner: one(practitioners, {
      fields: [appointmentSlots.practitionerId],
      references: [practitioners.id],
    }),
    polyclinic: one(polyclinics, {
      fields: [appointmentSlots.polyclinicId],
      references: [polyclinics.id],
    }),
  })
);

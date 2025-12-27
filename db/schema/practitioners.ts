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
  practitionerTypeEnum,
  specialtyEnum,
  polyclinicTypeEnum,
  dayOfWeekEnum,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";

// ============================================================================
// PRACTITIONER & POLYCLINIC TABLES
// ============================================================================

/**
 * Polyclinics table
 * Represents polyclinics/departments
 */
export const polyclinics = pgTable(
  "polyclinics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

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
    location: varchar("location", { length: 100 }), // floor, wing, building
    queuePrefix: varchar("queue_prefix", { length: 5 }), // A, B, C, etc.
    dailyQuota: integer("daily_quota"),
    isWalkInAllowed: boolean("is_walk_in_allowed").default(true),
    isOnlineBookingAllowed: boolean("is_online_booking_allowed").default(true),
    isActive: boolean("is_active").default(true),
    satusehatLocationId: varchar("satusehat_location_id", { length: 100 }),
    bpjsPoliCode: varchar("bpjs_poli_code", { length: 10 }),
    operatingHours: jsonb("operating_hours").$type<{
      monday?: { open: string; close: string; closed?: boolean };
      tuesday?: { open: string; close: string; closed?: boolean };
      wednesday?: { open: string; close: string; closed?: boolean };
      thursday?: { open: string; close: string; closed?: boolean };
      friday?: { open: string; close: string; closed?: boolean };
      saturday?: { open: string; close: string; closed?: boolean };
      sunday?: { open: string; close: string; closed?: boolean };
    }>(),
  },
  (table) => ({
    orgIdIdx: index("idx_polyclinic_org_id").on(table.organizationId),
    branchIdIdx: index("idx_polyclinic_branch_id").on(table.branchId),
    polyclinicCodeIdx: uniqueIndex("idx_polyclinic_code").on(
      table.organizationId,
      table.polyclinicCode
    ),
    polyclinicTypeIdx: index("idx_polyclinic_type").on(table.polyclinicType),
    isActiveIdx: index("idx_polyclinic_active").on(table.isActive),
  })
);

/**
 * Practitioners table
 * Represents healthcare practitioners
 */
export const practitioners = pgTable(
  "practitioners",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

    // Practitioner fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }), // One-to-one with users
    practitionerCode: varchar("practitioner_code", { length: 20 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstNameId: varchar("first_name_id", { length: 100 }), // Indonesian name
    lastNameId: varchar("last_name_id", { length: 100 }),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    practitionerType: practitionerTypeEnum("practitioner_type").notNull(),
    specialty: specialtyEnum("specialty"),
    subSpecialty: varchar("sub_specialty", { length: 100 }),
    nik: varchar("nik", { length: 16 }), // Indonesian NIK
    strNumber: varchar("str_number", { length: 50 }), // Surat Tanda Registrasi
    strExpiryDate: date("str_expiry_date"),
    sipNumber: varchar("sip_number", { length: 50 }), // Surat Izin Praktik
    sipExpiryDate: date("sip_expiry_date"),
    licenseNumber: varchar("license_number", { length: 100 }),
    licenseExpiryDate: date("licence_expiry_date"),
    gender: varchar("gender", { length: 10 }),
    dateOfBirth: date("date_of_birth"),
    phone: varchar("phone", { length: 20 }),
    mobile: varchar("mobile", { length: 20 }),
    email: varchar("email", { length: 255 }),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    province: varchar("province", { length: 100 }),
    satusehatIhsId: varchar("satusehat_ihs_id", { length: 100 }), // SatuSehat IHS ID
    bpjsKodeDokter: varchar("bpjs_kode_dokter", { length: 20 }),
    photoUrl: varchar("photo_url", { length: 500 }),
    signatureUrl: varchar("signature_url", { length: 500 }),
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_practitioner_org_id").on(table.organizationId),
    branchIdIdx: index("idx_practitioner_branch_id").on(table.branchId),
    userIdIdx: uniqueIndex("idx_practitioner_user_id").on(table.userId),
    practitionerCodeIdx: uniqueIndex("idx_practitioner_code").on(
      table.practitionerCode
    ),
    nikIdx: index("idx_practitioner_nik").on(table.nik),
    satusehatIhsIdIdx: index("idx_practitioner_satusehat_ihs_id").on(
      table.satusehatIhsId
    ),
    isActiveIdx: index("idx_practitioner_active").on(table.isActive),
  })
);

/**
 * Practitioner polyclinics table
 * Represents practitioner-polyclinic assignments
 */
export const practitionerPolyclinics = pgTable(
  "practitioner_polyclinics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

    // Assignment fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    isPrimary: boolean("is_primary").default(false),
    isActive: boolean("is_active").default(true),
    effectiveFrom: date("effective_from"),
    effectiveUntil: date("effective_until"),
  },
  (table) => ({
    practitionerIdIdx: index("idx_pract_poly_practitioner_id").on(
      table.practitionerId
    ),
    polyclinicIdIdx: index("idx_pract_poly_polyclinic_id").on(
      table.polyclinicId
    ),
    practitionerPolyclinicIdx: uniqueIndex("idx_pract_poly_unique").on(
      table.practitionerId,
      table.polyclinicId
    ),
    isActiveIdx: index("idx_pract_poly_active").on(table.isActive),
  })
);

/**
 * Practitioner schedules table
 * Represents practitioner schedules
 */
export const practitionerSchedules = pgTable(
  "practitioner_schedules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

    // Schedule fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
    startTime: varchar("start_time", { length: 10 }).notNull(), // HH:MM format
    endTime: varchar("end_time", { length: 10 }).notNull(),
    slotDuration: integer("slot_duration").default(15), // minutes
    breakStartTime: varchar("break_start_time", { length: 10 }),
    breakEndTime: varchar("break_end_time", { length: 10 }),
    maxPatients: integer("max_patients"),
    isActive: boolean("is_active").default(true),
    effectiveFrom: date("effective_from"),
    effectiveUntil: date("effective_until"),
  },
  (table) => ({
    practitionerIdIdx: index("idx_schedule_practitioner_id").on(
      table.practitionerId
    ),
    polyclinicIdIdx: index("idx_schedule_polyclinic_id").on(table.polyclinicId),
    dayOfWeekIdx: index("idx_schedule_day_of_week").on(table.dayOfWeek),
    isActiveIdx: index("idx_schedule_active").on(table.isActive),
    practitionerDayIdx: uniqueIndex("idx_schedule_practitioner_day").on(
      table.practitionerId,
      table.polyclinicId,
      table.dayOfWeek
    ),
  })
);

/**
 * Schedule exceptions table
 * Represents schedule exceptions (holidays, leave, etc.)
 */
export const scheduleExceptions = pgTable(
  "schedule_exceptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

    // Exception fields
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    exceptionDate: date("exception_date").notNull(),
    exceptionType: varchar("exception_type", { length: 50 }).notNull(), // holiday, leave, training, other
    isFullDay: boolean("is_full_day").default(true),
    startTime: varchar("start_time", { length: 10 }),
    endTime: varchar("end_time", { length: 10 }),
    reason: text("reason"),
    isRecurring: boolean("is_recurring").default(false),
    recurringPattern: varchar("recurring_pattern", { length: 50 }), // weekly, monthly, yearly
    recurringUntil: date("recurring_until"),
  },
  (table) => ({
    practitionerIdIdx: index("idx_exception_practitioner_id").on(
      table.practitionerId
    ),
    polyclinicIdIdx: index("idx_exception_polyclinic_id").on(
      table.polyclinicId
    ),
    exceptionDateIdx: index("idx_exception_date").on(table.exceptionDate),
    exceptionTypeIdx: index("idx_exception_type").on(table.exceptionType),
  })
);

/**
 * Appointment slots table
 * Represents available appointment slots
 */
export const appointmentSlots = pgTable(
  "appointment_slots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

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
    status: varchar("status", { length: 20 }).default("available"), // available, booked, blocked
    appointmentId: uuid("appointment_id"), // Reference to appointment when booked
    isOnline: boolean("is_online").default(false),
    isVideoCall: boolean("is_video_call").default(false),
  },
  (table) => ({
    practitionerIdIdx: index("idx_slot_practitioner_id").on(
      table.practitionerId
    ),
    polyclinicIdIdx: index("idx_slot_polyclinic_id").on(table.polyclinicId),
    slotDateIdx: index("idx_slot_date").on(table.slotDate),
    statusIdx: index("idx_slot_status").on(table.status),
    appointmentIdIdx: index("idx_slot_appointment_id").on(table.appointmentId),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

export const polyclinicsRelations = relations(polyclinics, ({ many }) => ({
  practitioners: many(practitionerPolyclinics),
  schedules: many(practitionerSchedules),
  slots: many(appointmentSlots),
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

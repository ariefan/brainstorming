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
  appointmentStatusEnum,
  appointmentTypeEnum,
  queueStatusEnum,
  queuePriorityEnum,
  BsonResource,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { polyclinics } from "./practitioners";
import { practitioners } from "./practitioners";

// ============================================================================
// APPOINTMENT & QUEUE TABLES
// ============================================================================

/**
 * Appointments table
 * Represents patient appointments
 */
export const appointments = pgTable(
  "appointments",
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

    // Appointment fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    practitionerId: uuid("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "set null" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "set null" }),
    appointmentNumber: varchar("appointment_number", { length: 30 })
      .notNull()
      .unique(),
    appointmentType: appointmentTypeEnum("appointment_type").notNull(),
    appointmentDate: date("appointment_date").notNull(),
    startTime: varchar("start_time", { length: 10 }).notNull(),
    endTime: varchar("end_time", { length: 10 }),
    duration: varchar("duration", { length: 20 }), // minutes or hours
    status: appointmentStatusEnum("status").default("booked"),
    priority: queuePriorityEnum("priority").default("routine"),
    reason: text("reason"),
    symptoms: text("symptoms"),
    isOnline: boolean("is_online").default(false),
    isVideoCall: boolean("is_video_call").default(false),
    isWalkIn: boolean("is_walk_in").default(false),
    isFollowUp: boolean("is_follow_up").default(false),
    previousAppointmentId: uuid("previous_appointment_id"),
    checkedInAt: timestamp("checked_in_at"),
    checkedInBy: uuid("checked_in_by").references(() => users.id, {
      onDelete: "set null",
    }),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    cancelledAt: timestamp("cancelled_at"),
    cancelledBy: uuid("cancelled_by").references(() => users.id, {
      onDelete: "set null",
    }),
    cancellationReason: text("cancellation_reason"),
    noShowAt: timestamp("no_show_at"),
    notes: text("notes"),
    bpjsAntreanKodeBooking: varchar("bpjs_antrean_kode_booking", {
      length: 30,
    }),
  },
  (table) => ({
    orgIdIdx: index("idx_appointment_org_id").on(table.organizationId),
    branchIdIdx: index("idx_appointment_branch_id").on(table.branchId),
    patientIdIdx: index("idx_appointment_patient_id").on(table.patientId),
    practitionerIdIdx: index("idx_appointment_practitioner_id").on(
      table.practitionerId
    ),
    polyclinicIdIdx: index("idx_appointment_polyclinic_id").on(
      table.polyclinicId
    ),
    appointmentNumberIdx: uniqueIndex("idx_appointment_number").on(
      table.appointmentNumber
    ),
    appointmentDateIdx: index("idx_appointment_date").on(table.appointmentDate),
    statusIdx: index("idx_appointment_status").on(table.status),
  })
);

/**
 * Appointment reminders table
 * Represents appointment reminders
 */
export const appointmentReminders = pgTable(
  "appointment_reminders",
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

    // Reminder fields
    appointmentId: uuid("appointment_id")
      .notNull()
      .references(() => appointments.id, { onDelete: "cascade" }),
    reminderType: varchar("reminder_type", { length: 20 }).notNull(), // sms, email, push, whatsapp
    reminderTime: timestamp("reminder_time").notNull(),
    sentAt: timestamp("sent_at"),
    status: varchar("status", { length: 20 }).default("pending"), // pending, sent, failed
    recipient: varchar("recipient", { length: 255 }), // phone number or email
    message: text("message"),
    retryCount: integer("retry_count").default(0),
  },
  (table) => ({
    appointmentIdIdx: index("idx_reminder_appointment_id").on(
      table.appointmentId
    ),
    reminderTimeIdx: index("idx_reminder_time").on(table.reminderTime),
    statusIdx: index("idx_reminder_status").on(table.status),
  })
);

/**
 * Queues table
 * Represents clinic queues
 */
export const queues = pgTable(
  "queues",
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

    // Queue fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    queueDate: date("queue_date").notNull(),
    queueNumber: varchar("queue_number", { length: 10 }).notNull(),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    appointmentId: uuid("appointment_id").references(() => appointments.id, {
      onDelete: "set null",
    }),
    practitionerId: uuid("practitioner_id").references(() => practitioners.id, {
      onDelete: "set null",
    }),
    status: queueStatusEnum("status").default("waiting"),
    priority: queuePriorityEnum("priority").default("routine"),
    isOnline: boolean("is_online").default(false),
    isWalkIn: boolean("is_walk_in").default(true),
    calledAt: timestamp("called_at"),
    calledBy: uuid("called_by").references(() => users.id, {
      onDelete: "set null",
    }),
    servingStartedAt: timestamp("serving_started_at"),
    completedAt: timestamp("completed_at"),
    completedBy: uuid("completed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    skippedAt: timestamp("skipped_at"),
    skippedBy: uuid("skipped_by").references(() => users.id, {
      onDelete: "set null",
    }),
    skipReason: text("skip_reason"),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_queue_org_id").on(table.organizationId),
    branchIdIdx: index("idx_queue_branch_id").on(table.branchId),
    polyclinicIdIdx: index("idx_queue_polyclinic_id").on(table.polyclinicId),
    queueDateIdx: index("idx_queue_date").on(table.queueDate),
    queueNumberIdx: index("idx_queue_number").on(table.queueNumber),
    patientIdIdx: index("idx_queue_patient_id").on(table.patientId),
    appointmentIdIdx: index("idx_queue_appointment_id").on(table.appointmentId),
    practitionerIdIdx: index("idx_queue_practitioner_id").on(
      table.practitionerId
    ),
    statusIdx: index("idx_queue_status").on(table.status),
    priorityIdx: index("idx_queue_priority").on(table.priority),
  })
);

/**
 * Queue call logs table
 * Represents queue call history
 */
export const queueCallLogs = pgTable(
  "queue_call_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Call log fields
    queueId: uuid("queue_id")
      .notNull()
      .references(() => queues.id, { onDelete: "cascade" }),
    calledAt: timestamp("called_at").notNull(),
    calledBy: uuid("called_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    callMethod: varchar("call_method", { length: 20 }), // voice, display, sms, app
    responseTime: integer("response_time"), // seconds until patient responded
    noShow: boolean("no_show").default(false),
    notes: text("notes"),
  },
  (table) => ({
    queueIdIdx: index("idx_queue_call_queue_id").on(table.queueId),
    calledAtIdx: index("idx_queue_call_called_at").on(table.calledAt),
  })
);

/**
 * Queue display configs table
 * Represents queue display settings
 */
export const queueDisplayConfigs = pgTable(
  "queue_display_configs",
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

    // Display config fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    polyclinicId: uuid("polyclinic_id")
      .notNull()
      .references(() => polyclinics.id, { onDelete: "cascade" }),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    displayType: varchar("display_type", { length: 20 }).default("tv"), // tv, led, kiosk, web
    ipAddress: varchar("ip_address", { length: 50 }),
    port: integer("port"),
    refreshInterval: integer("refresh_interval").default(30), // seconds
    showPatientName: boolean("show_patient_name").default(false),
    showQueueNumber: boolean("show_queue_number").default(true),
    showWaitingCount: boolean("show_waiting_count").default(true),
    showEstimatedTime: boolean("show_estimated_time").default(true),
    voiceEnabled: boolean("voice_enabled").default(true),
    voiceLanguage: varchar("voice_language", { length: 10 }).default("id"),
    isActive: boolean("is_active").default(true),
  },
  (table) => ({
    orgIdIdx: index("idx_queue_display_org_id").on(table.organizationId),
    branchIdIdx: index("idx_queue_display_branch_id").on(table.branchId),
    polyclinicIdIdx: index("idx_queue_display_polyclinic_id").on(
      table.polyclinicId
    ),
    isActiveIdx: index("idx_queue_display_active").on(table.isActive),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

export const appointmentsRelations = relations(appointments, ({ many }) => ({
  reminders: many(appointmentReminders),
  queues: many(queues),
}));

export const appointmentRemindersRelations = relations(
  appointmentReminders,
  ({ one }) => ({
    appointment: one(appointments, {
      fields: [appointmentReminders.appointmentId],
      references: [appointments.id],
    }),
  })
);

export const queuesRelations = relations(queues, ({ many }) => ({
  callLogs: many(queueCallLogs),
}));

export const queueCallLogsRelations = relations(queueCallLogs, ({ one }) => ({
  queue: one(queues, {
    fields: [queueCallLogs.queueId],
    references: [queues.id],
  }),
}));

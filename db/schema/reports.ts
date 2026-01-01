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
  reportCategoryEnum,
  reportFrequencyEnum,
  reportFormatEnum,
  reportGenerationStatusEnum,
  BsonResource,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";

// ============================================================================
// REPORTING TABLES
// ============================================================================

/**
 * Report templates table
 * Represents report templates
 */
export const reportTemplates = pgTable(
  "report_templates",
  {
    ...fullFields,

    // Template fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    name: varchar("name", { length: 255 }).notNull(),
    nameId: varchar("name_id", { length: 255 }), // Indonesian name
    category: reportCategoryEnum("category").notNull(),
    description: text("description"),
    query: text("query").notNull(),
    parameters: jsonb("parameters").$type<Record<string, any>>(),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_report_template_org_id").on(table.organizationId),
    index("idx_report_template_branch_id").on(table.branchId),
    index("idx_report_template_category").on(table.category),
    index("idx_report_template_active").on(table.isActive),
  ]
);

/**
 * Report schedules table
 * Represents report schedules
 */
export const reportSchedules = pgTable(
  "report_schedules",
  {
    ...fullFields,

    // Schedule fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    templateId: uuid("template_id")
      .notNull()
      .references(() => reportTemplates.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    frequency: reportFrequencyEnum("frequency").notNull(),
    dayOfWeek: integer("day_of_week"),
    dayOfMonth: integer("day_of_month"),
    time: varchar("time", { length: 10 }),
    format: reportFormatEnum("format").notNull(),
    recipients: jsonb("recipients").$type<string[]>(),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_report_schedule_org_id").on(table.organizationId),
    index("idx_report_schedule_branch_id").on(table.branchId),
    index("idx_report_schedule_template_id").on(table.templateId),
    index("idx_report_schedule_frequency").on(table.frequency),
    index("idx_report_schedule_active").on(table.isActive),
  ]
);

/**
 * Report generations table
 * Represents report generations
 */
export const reportGenerations = pgTable(
  "report_generations",
  {
    ...fullFields,

    // Generation fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    templateId: uuid("template_id")
      .notNull()
      .references(() => reportTemplates.id, { onDelete: "cascade" }),
    scheduleId: uuid("schedule_id").references(() => reportSchedules.id, {
      onDelete: "set null",
    }),
    generatedBy: uuid("generated_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    reportDate: date("report_date").notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    format: reportFormatEnum("format").notNull(),
    filePath: varchar("file_path", { length: 500 }),
    fileSize: integer("file_size"),
    status: reportGenerationStatusEnum("status").default("pending"),
    errorMessage: text("error_message"),
  },
  (table) => [
    index("idx_report_generation_org_id").on(table.organizationId),
    index("idx_report_generation_branch_id").on(table.branchId),
    index("idx_report_generation_template_id").on(table.templateId),
    index("idx_report_generation_schedule_id").on(table.scheduleId),
    index("idx_report_generation_generated_by").on(table.generatedBy),
    index("idx_report_generation_report_date").on(table.reportDate),
    index("idx_report_generation_status").on(table.status),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const reportTemplatesRelations = relations(
  reportTemplates,
  ({ many }) => ({
    schedules: many(reportSchedules),
    generations: many(reportGenerations),
  })
);

export const reportSchedulesRelations = relations(
  reportSchedules,
  ({ one, many }) => ({
    template: one(reportTemplates, {
      fields: [reportSchedules.templateId],
      references: [reportTemplates.id],
    }),
    generations: many(reportGenerations),
  })
);

export const reportGenerationsRelations = relations(
  reportGenerations,
  ({ one }) => ({
    template: one(reportTemplates, {
      fields: [reportGenerations.templateId],
      references: [reportTemplates.id],
    }),
    schedule: one(reportSchedules, {
      fields: [reportGenerations.scheduleId],
      references: [reportSchedules.id],
    }),
    generatedBy: one(users, {
      fields: [reportGenerations.generatedBy],
      references: [users.id],
    }),
  })
);

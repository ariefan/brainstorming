import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  time,
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
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { branches } from "./organization";
import { polyclinics } from "./practitioners";

// ============================================================================
// REPORTING & ANALYTICS TABLES
// ============================================================================

/**
 * Report definitions table
 * Stores report metadata and configuration
 */
export const reportDefinitions = pgTable(
  "report_definitions",
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

    // Report definition fields
    reportCode: varchar("report_code", { length: 50 }).notNull().unique(),
    reportName: varchar("report_name", { length: 255 }).notNull(),
    reportNameId: varchar("report_name_id", { length: 255 }), // Indonesian name
    reportCategory: reportCategoryEnum("report_category").notNull(),
    description: text("description"),
    frequency: reportFrequencyEnum("frequency").notNull(),
    autoGenerate: boolean("auto_generate").default(false),
    generateDay: integer("generate_day"), // 1-7 for weekly, 1-31 for monthly
    parameters: jsonb("parameters").$type<Record<string, any>>(), // Configurable parameters schema
    outputFormats: jsonb("output_formats").$type<string[]>(), // Array of supported formats
    templatePath: varchar("template_path", { length: 500 }),
    isActive: boolean("is_active").default(true),
  },
  (table) => ({
    reportCodeIdx: uniqueIndex("idx_report_def_code").on(table.reportCode),
    reportCategoryIdx: index("idx_report_def_category").on(
      table.reportCategory
    ),
    isActiveIdx: index("idx_report_def_active").on(table.isActive),
  })
);

/**
 * Report generations table
 * Tracks report generation jobs
 */
export const reportGenerations = pgTable(
  "report_generations",
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

    // Report generation fields
    reportDefinitionId: uuid("report_definition_id")
      .notNull()
      .references(() => reportDefinitions.id, { onDelete: "cascade" }),
    parameters: jsonb("parameters").$type<Record<string, any>>(),
    periodStart: date("period_start").notNull(),
    periodEnd: date("period_end").notNull(),
    requestedAt: timestamp("requested_at").notNull(),
    requestedBy: uuid("requested_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    generatedAt: timestamp("generated_at"),
    generationStatus: reportGenerationStatusEnum("generation_status")
      .notNull()
      .default("pending"),
    errorMessage: text("error_message"),
    fileUrl: varchar("file_url", { length: 500 }),
    fileFormat: reportFormatEnum("file_format"),
    fileSizeBytes: integer("file_size_bytes"),
    expiresAt: timestamp("expires_at"),
  },
  (table) => ({
    reportDefinitionIdIdx: index("idx_report_gen_def").on(
      table.reportDefinitionId
    ),
    generationStatusIdx: index("idx_report_gen_status").on(
      table.generationStatus
    ),
    requestedAtIdx: index("idx_report_gen_date").on(table.requestedAt),
    expiresAtIdx: index("idx_report_gen_expires").on(table.expiresAt),
  })
);

/**
 * Report schedules table
 * Stores scheduled report configurations
 */
export const reportSchedules = pgTable(
  "report_schedules",
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

    // Report schedule fields
    reportDefinitionId: uuid("report_definition_id")
      .notNull()
      .references(() => reportDefinitions.id, { onDelete: "cascade" }),
    frequency: reportFrequencyEnum("frequency").notNull(),
    scheduleTime: time("schedule_time").notNull(),
    scheduleDay: integer("schedule_day"), // 1-7 for weekly, 1-31 for monthly
    parameters: jsonb("parameters").$type<Record<string, any>>(),
    outputFormat: reportFormatEnum("output_format").notNull().default("pdf"),
    autoEmail: boolean("auto_email").default(false),
    emailRecipients: jsonb("email_recipients").$type<string[]>(), // Array of email addresses
    isActive: boolean("is_active").default(true),
    lastRunAt: timestamp("last_run_at"),
    nextRunAt: timestamp("next_run_at").notNull(),
    createdByUser: uuid("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
  },
  (table) => ({
    reportDefinitionIdIdx: index("idx_schedule_def").on(
      table.reportDefinitionId
    ),
    nextRunAtIdx: index("idx_schedule_next").on(
      table.nextRunAt,
      table.isActive
    ),
    isActiveIdx: index("idx_schedule_active").on(table.isActive),
  })
);

/**
 * Disease statistics cache table
 * Caches pre-calculated disease statistics
 */
export const diseaseStatisticsCache = pgTable(
  "disease_statistics_cache",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

    // Disease statistics fields
    periodType: varchar("period_type", { length: 20 }).notNull(), // daily, weekly, monthly, yearly
    periodDate: date("period_date").notNull(),
    polyclinicId: uuid("polyclinic_id").references(() => polyclinics.id, {
      onDelete: "set null",
    }),
    icd10Code: varchar("icd10_code", { length: 10 }).notNull(),
    diseaseName: varchar("disease_name", { length: 255 }).notNull(),
    totalCases: integer("total_cases").notNull().default(0),
    newCases: integer("new_cases").notNull().default(0),
    returningCases: integer("returning_cases").notNull().default(0),
    maleCount: integer("male_count").notNull().default(0),
    femaleCount: integer("female_count").notNull().default(0),
    age0_5: integer("age_0_5").notNull().default(0),
    age6_17: integer("age_6_17").notNull().default(0),
    age18_59: integer("age_18_59").notNull().default(0),
    age60Plus: integer("age_60_plus").notNull().default(0),
    calculatedAt: timestamp("calculated_at").notNull(),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
  },
  (table) => ({
    periodTypeIdx: index("idx_disease_stats_period").on(
      table.periodType,
      table.periodDate
    ),
    icd10CodeIdx: index("idx_disease_stats_icd").on(table.icd10Code),
    polyclinicIdIdx: index("idx_disease_stats_poli").on(table.polyclinicId),
    branchIdIdx: index("idx_disease_stats_branch").on(table.branchId),
    calculatedAtIdx: index("idx_disease_stats_calc").on(table.calculatedAt),
  })
);

/**
 * KIA indicators cache table
 * Caches pre-calculated KIA (maternal and child health) indicators
 */
export const kiaIndicatorsCache = pgTable(
  "kia_indicators_cache",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<{
      version?: number;
      bsonData?: Record<string, any>;
      metadata?: Record<string, any>;
    }>(),

    // KIA indicators fields
    periodMonth: integer("period_month").notNull(),
    periodYear: integer("period_year").notNull(),
    indicatorType: varchar("indicator_type", { length: 50 }).notNull(), // anc, pnc, immunization, child_growth
    indicatorName: varchar("indicator_name", { length: 100 }).notNull(),
    targetValue: integer("target_value"),
    achievedValue: integer("achieved_value").notNull(),
    coveragePercent: varchar("coverage_percent", { length: 10 }),
    additionalData: jsonb("additional_data").$type<Record<string, any>>(),
    calculatedAt: timestamp("calculated_at").notNull(),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
  },
  (table) => ({
    periodIdx: index("idx_kia_period").on(table.periodMonth, table.periodYear),
    indicatorTypeIdx: index("idx_kia_type").on(table.indicatorType),
    branchIdIdx: index("idx_kia_branch").on(table.branchId),
    calculatedAtIdx: index("idx_kia_calc").on(table.calculatedAt),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

export const reportDefinitionsRelations = relations(
  reportDefinitions,
  ({ many }) => ({
    generations: many(reportGenerations),
    schedules: many(reportSchedules),
  })
);

export const reportGenerationsRelations = relations(
  reportGenerations,
  ({ one }) => ({
    reportDefinition: one(reportDefinitions, {
      fields: [reportGenerations.reportDefinitionId],
      references: [reportDefinitions.id],
    }),
    requestedByUser: one(users, {
      fields: [reportGenerations.requestedBy],
      references: [users.id],
    }),
  })
);

export const reportSchedulesRelations = relations(
  reportSchedules,
  ({ one }) => ({
    reportDefinition: one(reportDefinitions, {
      fields: [reportSchedules.reportDefinitionId],
      references: [reportDefinitions.id],
    }),
    createdByUser: one(users, {
      fields: [reportSchedules.createdByUser],
      references: [users.id],
    }),
  })
);

export const diseaseStatisticsCacheRelations = relations(
  diseaseStatisticsCache,
  ({ one }) => ({
    polyclinic: one(polyclinics, {
      fields: [diseaseStatisticsCache.polyclinicId],
      references: [polyclinics.id],
    }),
    branch: one(branches, {
      fields: [diseaseStatisticsCache.branchId],
      references: [branches.id],
    }),
  })
);

export const kiaIndicatorsCacheRelations = relations(
  kiaIndicatorsCache,
  ({ one }) => ({
    branch: one(branches, {
      fields: [kiaIndicatorsCache.branchId],
      references: [branches.id],
    }),
  })
);

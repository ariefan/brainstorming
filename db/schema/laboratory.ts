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
  labTestCategoryEnum,
  labTestTypeEnum,
  labResultTypeEnum,
  labResultInterpretationEnum,
  labQueueStatusEnum,
  labQueuePriorityEnum,
  specimenStatusEnum,
  specimenConditionEnum,
  labResultStatusEnum,
  diagnosticReportStatusEnum,
  criticalNotificationMethodEnum,
  BsonResource,
  fullFields,
  baseFields,
  bsonFields,
  softDeleteFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";

// ============================================================================
// LABORATORY TABLES
// ============================================================================

/**
 * Lab tests table
 * Represents lab tests
 */
export const labTests = pgTable(
  "lab_tests",
  {
    ...fullFields,

    // Lab test fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    testCode: varchar("test_code", { length: 20 }).notNull(),
    testName: varchar("test_name", { length: 255 }).notNull(),
    testNameId: varchar("test_name_id", { length: 255 }), // Indonesian name
    testCategory: labTestCategoryEnum("test_category").notNull(),
    testType: labTestTypeEnum("test_type").notNull(),
    description: text("description"),
    specimenType: varchar("specimen_type", { length: 50 }),
    resultType: labResultTypeEnum("result_type").notNull(),
    unit: varchar("unit", { length: 50 }),
    normalRange: text("normal_range"),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_lab_test_org_id").on(table.organizationId),
    uniqueIndex("idx_lab_test_code").on(table.testCode),
    index("idx_lab_test_category").on(table.testCategory),
    index("idx_lab_test_active").on(table.isActive),
  ]
);

/**
 * Lab test reference ranges table
 * Represents lab test reference ranges
 */
export const labTestReferenceRanges = pgTable(
  "lab_test_reference_ranges",
  {
    ...fullFields,

    // Reference range fields
    labTestId: uuid("lab_test_id")
      .notNull()
      .references(() => labTests.id, { onDelete: "cascade" }),
    gender: varchar("gender", { length: 10 }),
    ageMin: integer("age_min"),
    ageMax: integer("age_max"),
    ageUnit: varchar("age_unit", { length: 20 }), // years, months
    minValue: varchar("min_value", { length: 20 }),
    maxValue: varchar("max_value", { length: 20 }),
    minValueCritical: varchar("min_value_critical", { length: 20 }),
    maxValueCritical: varchar("max_value_critical", { length: 20 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_lab_test_reference_lab_test_id").on(table.labTestId),
    index("idx_lab_test_reference_gender").on(table.gender),
  ]
);

/**
 * Lab queue table
 * Represents lab queue
 */
export const labQueue = pgTable(
  "lab_queue",
  {
    ...fullFields,

    // Queue fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    queueNumber: varchar("queue_number", { length: 20 }).notNull(),
    status: labQueueStatusEnum("status").default("pending"),
    priority: labQueuePriorityEnum("priority").default("routine"),
    isFasting: boolean("is_fasting").default(false),
    fastingVerified: boolean("fasting_verified").default(false),
    fastingVerifiedAt: timestamp("fasting_verified_at"),
    fastingVerifiedBy: uuid("fasting_verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    clinicalInfo: text("clinical_info"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_lab_queue_org_id").on(table.organizationId),
    index("idx_lab_queue_branch_id").on(table.branchId),
    index("idx_lab_queue_patient_id").on(table.patientId),
    index("idx_lab_queue_status").on(table.status),
    index("idx_lab_queue_priority").on(table.priority),
  ]
);

/**
 * Lab orders table
 * Represents lab orders
 */
export const labOrders = pgTable(
  "lab_orders",
  {
    ...fullFields,

    // Order fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    queueId: uuid("queue_id").references(() => labQueue.id, {
      onDelete: "set null",
    }),
    orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
    orderedAt: timestamp("ordered_at").notNull(),
    orderedBy: uuid("ordered_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    priority: labQueuePriorityEnum("priority").default("routine"),
    status: labQueueStatusEnum("status").default("pending"),
    clinicalInfo: text("clinical_info"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_lab_order_org_id").on(table.organizationId),
    index("idx_lab_order_branch_id").on(table.branchId),
    index("idx_lab_order_patient_id").on(table.patientId),
    index("idx_lab_order_queue_id").on(table.queueId),
    uniqueIndex("idx_lab_order_number").on(table.orderNumber),
    index("idx_lab_order_status").on(table.status),
    index("idx_lab_order_ordered_at").on(table.orderedAt),
  ]
);

/**
 * Lab order items table
 * Represents lab order items
 */
export const labOrderItems = pgTable(
  "lab_order_items",
  {
    ...fullFields,

    // Order item fields
    orderId: uuid("order_id")
      .notNull()
      .references(() => labOrders.id, { onDelete: "cascade" }),
    labTestId: uuid("lab_test_id")
      .notNull()
      .references(() => labTests.id, { onDelete: "restrict" }),
    testCode: varchar("test_code", { length: 20 }).notNull(),
    testName: varchar("test_name", { length: 255 }).notNull(),
    testNameId: varchar("test_name_id", { length: 255 }),
    priority: labQueuePriorityEnum("priority").default("routine"),
    status: labQueueStatusEnum("status").default("pending"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_lab_order_item_order_id").on(table.orderId),
    index("idx_lab_order_item_lab_test_id").on(table.labTestId),
    index("idx_lab_order_item_status").on(table.status),
  ]
);

/**
 * Specimens table
 * Represents specimens
 */
export const specimens = pgTable(
  "specimens",
  {
    ...fullFields,

    // Specimen fields
    orderItemId: uuid("order_item_id")
      .notNull()
      .references(() => labOrderItems.id, { onDelete: "cascade" }),
    specimenNumber: varchar("specimen_number", { length: 30 })
      .notNull()
      .unique(),
    specimenType: varchar("specimen_type", { length: 50 }).notNull(),
    collectionDate: timestamp("collection_date").notNull(),
    collectedBy: uuid("collected_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    status: specimenStatusEnum("status").default("collected"),
    condition: specimenConditionEnum("condition"),
    receivedAt: timestamp("received_at"),
    receivedBy: uuid("received_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_specimen_order_item_id").on(table.orderItemId),
    uniqueIndex("idx_specimen_number").on(table.specimenNumber),
    index("idx_specimen_status").on(table.status),
    index("idx_specimen_collection_date").on(table.collectionDate),
  ]
);

/**
 * Lab results table
 * Represents lab results
 */
export const labResults = pgTable(
  "lab_results",
  {
    ...fullFields,

    // Result fields
    orderItemId: uuid("order_item_id")
      .notNull()
      .references(() => labOrderItems.id, { onDelete: "cascade" }),
    specimenId: uuid("specimen_id").references(() => specimens.id, {
      onDelete: "set null",
    }),
    resultDate: timestamp("result_date").notNull(),
    resultValue: varchar("result_value", { length: 255 }),
    resultText: text("result_text"),
    interpretation: labResultInterpretationEnum("interpretation"),
    isAbnormal: boolean("is_abnormal").default(false),
    isCritical: boolean("is_critical").default(false),
    status: labResultStatusEnum("status").default("preliminary"),
    verifiedAt: timestamp("verified_at"),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),

    // SatuSehat Integration
    satusehatObservationId: varchar("satusehat_observation_id", { length: 100 }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),

    // Sync Status - JKN/BPJS
    isJknSynced: boolean("is_jkn_synced").default(false),
    jknSyncedAt: timestamp("jkn_synced_at"),
    jknSyncError: text("jkn_sync_error"),
  },
  (table) => [
    index("idx_lab_result_order_item_id").on(table.orderItemId),
    index("idx_lab_result_specimen_id").on(table.specimenId),
    index("idx_lab_result_status").on(table.status),
    index("idx_lab_result_date").on(table.resultDate),
    index("idx_lab_result_satusehat_synced").on(table.isSatusehatSynced),
    index("idx_lab_result_jkn_synced").on(table.isJknSynced),
  ]
);

/**
 * Diagnostic reports table
 * Represents diagnostic reports
 */
export const diagnosticReports = pgTable(
  "diagnostic_reports",
  {
    ...fullFields,

    // Report fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    orderId: uuid("order_id").references(() => labOrders.id, {
      onDelete: "set null",
    }),
    reportNumber: varchar("report_number", { length: 30 }).notNull().unique(),
    reportDate: timestamp("report_date").notNull(),
    status: diagnosticReportStatusEnum("status").default("preliminary"),
    generatedBy: uuid("generated_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    conclusion: text("conclusion"),
    notes: text("notes"),

    // SatuSehat Integration
    satusehatDiagnosticReportId: varchar("satusehat_diagnostic_report_id", {
      length: 100,
    }),

    // Sync Status - SatuSehat
    isSatusehatSynced: boolean("is_satusehat_synced").default(false),
    satusehatSyncedAt: timestamp("satusehat_synced_at"),
    satusehatSyncError: text("satusehat_sync_error"),

    // Sync Status - JKN/BPJS
    isJknSynced: boolean("is_jkn_synced").default(false),
    jknSyncedAt: timestamp("jkn_synced_at"),
    jknSyncError: text("jkn_sync_error"),
  },
  (table) => [
    index("idx_diagnostic_report_org_id").on(table.organizationId),
    index("idx_diagnostic_report_branch_id").on(table.branchId),
    index("idx_diagnostic_report_patient_id").on(table.patientId),
    index("idx_diagnostic_report_order_id").on(table.orderId),
    uniqueIndex("idx_diagnostic_report_number").on(table.reportNumber),
    index("idx_diagnostic_report_status").on(table.status),
    index("idx_diagnostic_report_date").on(table.reportDate),
    index("idx_diagnostic_report_satusehat_synced").on(table.isSatusehatSynced),
    index("idx_diagnostic_report_jkn_synced").on(table.isJknSynced),
  ]
);

/**
 * Critical value notifications table
 * Represents critical value notifications
 */
export const criticalValueNotifications = pgTable(
  "critical_value_notifications",
  {
    ...baseFields,
    ...bsonFields,
    ...softDeleteFields,

    // Notification fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    labResultId: uuid("lab_result_id")
      .notNull()
      .references(() => labResults.id, { onDelete: "cascade" }),
    notificationDate: timestamp("notification_date").notNull(),
    notifiedBy: uuid("notified_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    notifiedTo: uuid("notified_to").references(() => users.id, {
      onDelete: "set null",
    }),
    notificationMethod: criticalNotificationMethodEnum(
      "notification_method"
    ).notNull(),
    acknowledgedAt: timestamp("acknowledged_at"),
    acknowledgedBy: uuid("acknowledged_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_critical_notification_org_id").on(table.organizationId),
    index("idx_critical_notification_branch_id").on(table.branchId),
    index("idx_critical_notification_lab_result_id").on(table.labResultId),
    index("idx_critical_notification_date").on(table.notificationDate),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const labTestsRelations = relations(labTests, ({ many }) => ({
  referenceRanges: many(labTestReferenceRanges),
  orderItems: many(labOrderItems),
}));

export const labTestReferenceRangesRelations = relations(
  labTestReferenceRanges,
  ({ one }) => ({
    labTest: one(labTests, {
      fields: [labTestReferenceRanges.labTestId],
      references: [labTests.id],
    }),
  })
);

export const labQueueRelations = relations(labQueue, ({ many }) => ({
  orders: many(labOrders),
}));

export const labOrdersRelations = relations(labOrders, ({ many }) => ({
  items: many(labOrderItems),
}));

export const labOrderItemsRelations = relations(
  labOrderItems,
  ({ one, many }) => ({
    order: one(labOrders, {
      fields: [labOrderItems.orderId],
      references: [labOrders.id],
    }),
    labTest: one(labTests, {
      fields: [labOrderItems.labTestId],
      references: [labTests.id],
    }),
    specimens: many(specimens),
    results: many(labResults),
  })
);

export const specimensRelations = relations(specimens, ({ one, many }) => ({
  orderItem: one(labOrderItems, {
    fields: [specimens.orderItemId],
    references: [labOrderItems.id],
  }),
  results: many(labResults),
}));

export const labResultsRelations = relations(labResults, ({ one, many }) => ({
  orderItem: one(labOrderItems, {
    fields: [labResults.orderItemId],
    references: [labOrderItems.id],
  }),
  specimen: one(specimens, {
    fields: [labResults.specimenId],
    references: [specimens.id],
  }),
  criticalNotifications: many(criticalValueNotifications),
}));

export const diagnosticReportsRelations = relations(
  diagnosticReports,
  ({ one }) => ({
    order: one(labOrders, {
      fields: [diagnosticReports.orderId],
      references: [labOrders.id],
    }),
  })
);

export const criticalValueNotificationsRelations = relations(
  criticalValueNotifications,
  ({ one }) => ({
    labResult: one(labResults, {
      fields: [criticalValueNotifications.labResultId],
      references: [labResults.id],
    }),
  })
);

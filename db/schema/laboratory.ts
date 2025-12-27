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
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { polyclinics } from "./practitioners";
import { practitioners } from "./practitioners";
import { encounters } from "./medical";

// ============================================================================
// LABORATORY TABLES
// ============================================================================

/**
 * Lab tests table
 * Represents lab test catalog
 */
export const labTests = pgTable(
  "lab_tests",
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

    // Lab test fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    testCode: varchar("test_code", { length: 20 }).notNull().unique(),
    loincCode: varchar("loinc_code", { length: 20 }),
    loincDisplay: varchar("loinc_display", { length: 255 }),
    testName: varchar("test_name", { length: 255 }).notNull(),
    testNameShort: varchar("test_name_short", { length: 50 }),
    testNameId: varchar("test_name_id", { length: 255 }), // Indonesian name
    category: labTestCategoryEnum("category").notNull(),
    department: varchar("department", { length: 100 }),
    section: varchar("section", { length: 100 }),
    specimenType: labTestTypeEnum("specimen_type"),
    specimenVolume: varchar("specimen_volume", { length: 50 }),
    specimenContainer: varchar("specimen_container", { length: 100 }),
    specimenInstructions: text("specimen_instructions"),
    requiresFasting: boolean("requires_fasting").default(false),
    fastingHours: integer("fasting_hours"),
    tatHours: integer("tat_hours"), // Turnaround time
    isStatAvailable: boolean("is_stat_available").default(true),
    method: varchar("method", { length: 100 }),
    equipment: varchar("equipment", { length: 100 }),
    resultType: varchar("result_type", { length: 20 }), // numeric, text, coded, panel
    unit: varchar("unit", { length: 20 }),
    decimalPlaces: integer("decimal_places"),
    resultOptions: jsonb("result_options").$type<
      Array<{
        code: string;
        name: string;
        nameId: string;
      }>
    >(),
    basePrice: varchar("base_price", { length: 20 }),
    bpjsPrice: varchar("bpjs_price", { length: 20 }),
    isPanel: boolean("is_panel").default(false),
    panelTests: jsonb("panel_tests").$type<string[]>(),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_lab_test_org_id").on(table.organizationId),
    index("idx_lab_test_branch_id").on(table.branchId),
    uniqueIndex("idx_lab_test_code").on(table.testCode),
    index("idx_lab_test_loinc").on(table.loincCode),
    index("idx_lab_test_category").on(table.category),
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
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Reference range fields
    labTestId: uuid("lab_test_id")
      .notNull()
      .references(() => labTests.id, { onDelete: "cascade" }),
    gender: varchar("gender", { length: 10 }).notNull(), // male, female, all
    ageMinYears: integer("age_min_years"),
    ageMaxYears: integer("age_max_years"),
    normalLow: varchar("normal_low", { length: 20 }),
    normalHigh: varchar("normal_high", { length: 20 }),
    criticalLow: varchar("critical_low", { length: 20 }),
    criticalHigh: varchar("critical_high", { length: 20 }),
    interpretationGuide: text("interpretation_guide"),
  },
  (table) => [
    index("idx_ref_range_lab_test_id").on(table.labTestId),
    index("idx_ref_range_gender_age").on(
      table.labTestId,
      table.gender,
      table.ageMinYears,
      table.ageMaxYears
    ),
  ]
);

/**
 * Lab queue table
 * Represents lab order queue
 */
export const labQueue = pgTable(
  "lab_queue",
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
    labOrderId: uuid("lab_order_id").references(() => labOrders.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    queueNumber: varchar("queue_number", { length: 20 }).notNull(),
    queueDate: date("queue_date").notNull(),
    priority: labQueuePriorityEnum("priority").default("routine"),
    isFastingVerified: boolean("is_fasting_verified").default(false),
    status: labQueueStatusEnum("status").default("pending"),
    orderedAt: timestamp("ordered_at"),
    collectionStartedAt: timestamp("collection_started_at"),
    collectedAt: timestamp("collected_at"),
    receivedAt: timestamp("received_at"),
    processingStartedAt: timestamp("processing_started_at"),
    resultedAt: timestamp("resulted_at"),
    authorizedAt: timestamp("authorized_at"),
    completedAt: timestamp("completed_at"),
    collectedBy: uuid("collected_by").references(() => users.id, {
      onDelete: "set null",
    }),
    processedBy: uuid("processed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    resultedBy: uuid("resulted_by").references(() => users.id, {
      onDelete: "set null",
    }),
    authorizedBy: uuid("authorized_by").references(() => users.id, {
      onDelete: "set null",
    }),
    collectionPoint: varchar("collection_point", { length: 20 }).default("lab"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_lab_queue_org_id").on(table.organizationId),
    index("idx_lab_queue_branch_id").on(table.branchId),
    index("idx_lab_queue_order_id").on(table.labOrderId),
    index("idx_lab_queue_patient_id").on(table.patientId),
    index("idx_lab_queue_date").on(table.queueDate),
    index("idx_lab_queue_status").on(table.status),
  ]
);

/**
 * Lab orders table
 * Represents lab orders
 */
export const labOrders = pgTable(
  "lab_orders",
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

    // Lab order fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
    orderedAt: timestamp("ordered_at").notNull(),
    orderedBy: uuid("ordered_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    priority: labQueuePriorityEnum("priority").default("routine"),
    clinicalInfo: text("clinical_info"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_lab_order_org_id").on(table.organizationId),
    index("idx_lab_order_branch_id").on(table.branchId),
    index("idx_lab_order_patient_id").on(table.patientId),
    index("idx_lab_order_encounter_id").on(table.encounterId),
    uniqueIndex("idx_lab_order_number").on(table.orderNumber),
  ]
);

/**
 * Lab order items table
 * Represents lab order items
 */
export const labOrderItems = pgTable(
  "lab_order_items",
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

    // Lab order item fields
    labOrderId: uuid("lab_order_id")
      .notNull()
      .references(() => labOrders.id, { onDelete: "cascade" }),
    labTestId: uuid("lab_test_id").notNull(),
    testCode: varchar("test_code", { length: 20 }).notNull(),
    testName: varchar("test_name", { length: 255 }).notNull(),
    testNameId: varchar("test_name_id", { length: 255 }),
    loincCode: varchar("loinc_code", { length: 20 }),
    specimenType: labTestTypeEnum("specimen_type"),
    priority: varchar("priority", { length: 20 }),
    notes: text("notes"),
  },
  (table) => [index("idx_lab_order_item_lab_order_id").on(table.labOrderId)]
);

/**
 * Specimens table
 * Represents lab specimens
 */
export const specimens = pgTable(
  "specimens",
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

    // Specimen fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    labOrderId: uuid("lab_order_id").references(() => labOrders.id, {
      onDelete: "cascade",
    }),
    labOrderItemId: uuid("lab_order_item_id").references(
      () => labOrderItems.id,
      { onDelete: "cascade" }
    ),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    specimenNumber: varchar("specimen_number", { length: 30 })
      .notNull()
      .unique(),
    specimenType: labTestTypeEnum("specimen_type"),
    containerType: varchar("container_type", { length: 100 }),
    volume: varchar("volume", { length: 50 }),
    collectionMethod: varchar("collection_method", { length: 100 }),
    collectionSite: varchar("collection_site", { length: 100 }),
    collectedAt: timestamp("collected_at"),
    collectedBy: uuid("collected_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    receivedAt: timestamp("received_at"),
    receivedBy: uuid("received_by").references(() => users.id, {
      onDelete: "set null",
    }),
    conditionOnReceipt: specimenConditionEnum("condition_on_receipt"),
    isRejected: boolean("is_rejected").default(false),
    rejectionReason: text("rejection_reason"),
    storageLocation: varchar("storage_location", { length: 100 }),
    storageTemperature: varchar("storage_temperature", { length: 50 }),
    status: specimenStatusEnum("status").default("collected"),
    disposedAt: timestamp("disposed_at"),
    disposalMethod: varchar("disposal_method", { length: 100 }),
    satusehatSpecimenId: varchar("satusehat_specimen_id", { length: 100 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_specimen_org_id").on(table.organizationId),
    index("idx_specimen_branch_id").on(table.branchId),
    index("idx_specimen_lab_order_id").on(table.labOrderId),
    uniqueIndex("idx_specimen_number").on(table.specimenNumber),
    index("idx_specimen_patient_id").on(table.patientId),
    index("idx_specimen_status").on(table.status),
  ]
);

/**
 * Lab results table
 * Represents lab results
 */
export const labResults = pgTable(
  "lab_results",
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

    // Lab result fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    labOrderId: uuid("lab_order_id").references(() => labOrders.id, {
      onDelete: "cascade",
    }),
    labOrderItemId: uuid("lab_order_item_id").references(
      () => labOrderItems.id,
      { onDelete: "cascade" }
    ),
    specimenId: uuid("specimen_id").references(() => specimens.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    labTestId: uuid("lab_test_id").references(() => labTests.id, {
      onDelete: "restrict",
    }),
    loincCode: varchar("loinc_code", { length: 20 }),
    testName: varchar("test_name", { length: 255 }).notNull(),
    resultType: varchar("result_type", { length: 20 }), // numeric, text, coded
    resultValue: varchar("result_value", { length: 255 }),
    resultNumeric: varchar("result_numeric", { length: 20 }),
    resultUnit: varchar("result_unit", { length: 20 }),
    referenceRangeLow: varchar("reference_range_low", { length: 20 }),
    referenceRangeHigh: varchar("reference_range_high", { length: 20 }),
    interpretation: labResultInterpretationEnum("interpretation"),
    interpretationText: text("interpretation_text"),
    isCritical: boolean("is_critical").default(false),
    criticalNotified: boolean("critical_notified").default(false),
    criticalNotifiedAt: timestamp("critical_notified_at"),
    criticalNotifiedTo: varchar("critical_notified_to", { length: 255 }),
    criticalNotifiedBy: uuid("critical_notified_by").references(
      () => users.id,
      { onDelete: "set null" }
    ),
    criticalAcknowledged: boolean("critical_acknowledged").default(false),
    criticalAcknowledgedAt: timestamp("critical_acknowledged_at"),
    status: labResultStatusEnum("status").default("preliminary"),
    resultedAt: timestamp("resulted_at"),
    resultedBy: uuid("resulted_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    authorizedAt: timestamp("authorized_at"),
    authorizedBy: uuid("authorized_by").references(() => users.id, {
      onDelete: "set null",
    }),
    amendedFromId: uuid("amended_from_id"),
    amendmentReason: text("amendment_reason"),
    notes: text("notes"),
    satusehatObservationId: varchar("satusehat_observation_id", {
      length: 100,
    }),
  },
  (table) => [
    index("idx_lab_result_org_id").on(table.organizationId),
    index("idx_lab_result_branch_id").on(table.branchId),
    index("idx_lab_result_lab_order_id").on(table.labOrderId),
    index("idx_lab_result_specimen_id").on(table.specimenId),
    index("idx_lab_result_patient_id").on(table.patientId),
    index("idx_lab_result_critical").on(table.isCritical),
    index("idx_lab_result_critical_notified").on(
      table.isCritical,
      table.criticalNotified
    ),
    index("idx_lab_result_status").on(table.status),
  ]
);

/**
 * Diagnostic reports table
 * Represents diagnostic reports
 */
export const diagnosticReports = pgTable(
  "diagnostic_reports",
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

    // Diagnostic report fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    labOrderId: uuid("lab_order_id").references(() => labOrders.id, {
      onDelete: "cascade",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    reportNumber: varchar("report_number", { length: 30 }).notNull().unique(),
    category: labTestCategoryEnum("category").notNull(),
    status: diagnosticReportStatusEnum("status").default("registered"),
    issuedAt: timestamp("issued_at"),
    effectiveDatetime: timestamp("effective_datetime"),
    authorizedBy: uuid("authorized_by")
      .notNull()
      .references(() => practitioners.id, { onDelete: "set null" }),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    results: jsonb("results").$type<
      Array<{
        testName: string;
        result: string;
        unit: string;
        referenceRange: string;
        interpretation: string;
      }>
    >(),
    conclusion: text("conclusion"),
    codedDiagnosis: varchar("coded_diagnosis", { length: 20 }),
    satusehatDiagnosticReportId: varchar("satusehat_diagnostic_report_id", {
      length: 100,
    }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_diagnostic_report_org_id").on(table.organizationId),
    index("idx_diagnostic_report_branch_id").on(table.branchId),
    index("idx_diagnostic_report_lab_order_id").on(table.labOrderId),
    index("idx_diagnostic_report_patient_id").on(table.patientId),
    uniqueIndex("idx_diagnostic_report_number").on(table.reportNumber),
  ]
);

/**
 * Critical value notifications table
 * Represents critical value notifications
 */
export const criticalValueNotifications = pgTable(
  "critical_value_notifications",
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

    // Critical notification fields
    labResultId: uuid("lab_result_id")
      .notNull()
      .references(() => labResults.id, { onDelete: "cascade" }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    testName: varchar("test_name", { length: 255 }),
    resultValue: varchar("result_value", { length: 255 }),
    resultUnit: varchar("result_unit", { length: 20 }),
    notificationTime: timestamp("notification_time").notNull(),
    notifiedBy: uuid("notified_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    notificationMethod: criticalNotificationMethodEnum("notification_method"),
    recipientName: varchar("recipient_name", { length: 255 }),
    recipientRole: varchar("recipient_role", { length: 100 }),
    recipientContact: varchar("recipient_contact", { length: 100 }),
    acknowledged: boolean("acknowledged").default(false),
    acknowledgedAt: timestamp("acknowledged_at"),
    actionTaken: text("action_taken"),
  },
  (table) => [
    index("idx_critical_notif_lab_result_id").on(table.labResultId),
    index("idx_critical_notif_patient_id").on(table.patientId),
    index("idx_critical_notif_time").on(table.notificationTime),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const labTestsRelations = relations(labTests, ({ many }) => ({
  referenceRanges: many(labTestReferenceRanges),
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

export const labQueueRelations = relations(labQueue, ({ one }) => ({
  labOrder: one(labOrders, {
    fields: [labQueue.labOrderId],
    references: [labOrders.id],
  }),
}));

export const labOrdersRelations = relations(labOrders, ({ many }) => ({
  items: many(labOrderItems),
  queue: many(labQueue),
}));

export const labOrderItemsRelations = relations(labOrderItems, ({ many }) => ({
  specimens: many(specimens),
  results: many(labResults),
}));

export const specimensRelations = relations(specimens, ({ many }) => ({
  results: many(labResults),
}));

export const labResultsRelations = relations(labResults, ({ many }) => ({
  criticalNotifications: many(criticalValueNotifications),
}));

export const criticalValueNotificationsRelations = relations(
  criticalValueNotifications,
  ({ one }) => ({
    labResult: one(labResults, {
      fields: [criticalValueNotifications.labResultId],
      references: [labResults.id],
    }),
  })
);

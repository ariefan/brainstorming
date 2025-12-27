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
  medicationTypeEnum,
  controlledSubstanceScheduleEnum,
  stockMovementTypeEnum,
  dispenseStatusEnum,
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

// ============================================================================
// PHARMACY TABLES
// ============================================================================

/**
 * Medications table
 * Represents medications
 */
export const medications = pgTable(
  "medications",
  {
    ...fullFields,

    // Medication fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    medicationCode: varchar("medication_code", { length: 30 }).notNull(),
    genericName: varchar("generic_name", { length: 255 }).notNull(),
    genericNameId: varchar("generic_name_id", { length: 255 }),
    brandName: varchar("brand_name", { length: 255 }),
    brandNameId: varchar("brand_name_id", { length: 255 }),
    dosageForm: varchar("dosage_form", { length: 50 }),
    strength: varchar("strength", { length: 50 }),
    strengthUnit: varchar("strength_unit", { length: 20 }),
    medicationType: medicationTypeEnum("medication_type").notNull(),
    controlledSchedule: controlledSubstanceScheduleEnum(
      "controlled_substance_schedule"
    ),
    manufacturer: varchar("manufacturer", { length: 255 }),
    description: text("description"),
    indications: text("indications"),
    contraindications: text("contraindications"),
    sideEffects: text("side_effects"),
    storageConditions: varchar("storage_conditions", { length: 255 }),
    isActive: boolean("is_active").default(true),
    isDiscontinued: boolean("is_discontinued").default(false),
  },
  (table) => [
    index("idx_medication_org_id").on(table.organizationId),
    uniqueIndex("idx_medication_code").on(table.medicationCode),
    index("idx_medication_generic_name").on(table.genericName),
    index("idx_medication_type").on(table.medicationType),
    index("idx_medication_active").on(table.isActive),
  ]
);

/**
 * Medication stock table
 * Represents medication stock
 */
export const medicationStock = pgTable(
  "medication_stock",
  {
    ...fullFields,

    // Stock fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "cascade" }),
    quantityOnHand: integer("quantity_on_hand").notNull(),
    quantityReserved: integer("quantity_reserved").default(0),
    reorderLevel: integer("reorder_level"),
    maxStockLevel: integer("max_stock_level"),
    lastStockCheck: timestamp("last_stock_check"),
  },
  (table) => [
    index("idx_medication_stock_org_id").on(table.organizationId),
    index("idx_medication_stock_branch_id").on(table.branchId),
    index("idx_medication_stock_medication_id").on(table.medicationId),
    index("idx_medication_stock_reorder").on(table.reorderLevel),
  ]
);

/**
 * Medication batches table
 * Represents medication batches
 */
export const medicationBatches = pgTable(
  "medication_batches",
  {
    ...fullFields,

    // Batch fields
    stockId: uuid("stock_id")
      .notNull()
      .references(() => medicationStock.id, { onDelete: "cascade" }),
    batchNumber: varchar("batch_number", { length: 50 }).notNull(),
    expirationDate: date("expiration_date").notNull(),
    quantity: integer("quantity").notNull(),
    receivedDate: timestamp("received_date").notNull(),
    supplier: varchar("supplier", { length: 255 }),
    invoiceNumber: varchar("invoice_number", { length: 50 }),
    costPerUnit: varchar("cost_per_unit", { length: 20 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_medication_batch_stock_id").on(table.stockId),
    index("idx_medication_batch_number").on(table.batchNumber),
    index("idx_medication_batch_expiration").on(table.expirationDate),
  ]
);

/**
 * Stock movements table
 * Represents stock movements
 */
export const stockMovements = pgTable(
  "stock_movements",
  {
    ...fullFields,

    // Movement fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "cascade" }),
    batchId: uuid("batch_id").references(() => medicationBatches.id, {
      onDelete: "set null",
    }),
    movementType: stockMovementTypeEnum("movement_type").notNull(),
    quantity: integer("quantity").notNull(),
    movementDate: timestamp("movement_date").notNull(),
    referenceNumber: varchar("reference_number", { length: 50 }),
    referenceType: varchar("reference_type", { length: 50 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_stock_movement_org_id").on(table.organizationId),
    index("idx_stock_movement_branch_id").on(table.branchId),
    index("idx_stock_movement_medication_id").on(table.medicationId),
    index("idx_stock_movement_type").on(table.movementType),
    index("idx_stock_movement_date").on(table.movementDate),
  ]
);

/**
 * Dispenses table
 * Represents medication dispenses
 */
export const dispenses = pgTable(
  "dispenses",
  {
    ...fullFields,

    // Dispense fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    dispenseNumber: varchar("dispense_number", { length: 30 })
      .notNull()
      .unique(),
    dispenseDate: timestamp("dispense_date").notNull(),
    dispensedBy: uuid("dispensed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    status: dispenseStatusEnum("status").default("pending"),
    prescriptionNumber: varchar("prescription_number", { length: 30 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_dispense_org_id").on(table.organizationId),
    index("idx_dispense_branch_id").on(table.branchId),
    index("idx_dispense_patient_id").on(table.patientId),
    uniqueIndex("idx_dispense_number").on(table.dispenseNumber),
    index("idx_dispense_status").on(table.status),
    index("idx_dispense_date").on(table.dispenseDate),
  ]
);

/**
 * Dispense items table
 * Represents dispense items
 */
export const dispenseItems = pgTable(
  "dispense_items",
  {
    ...fullFields,

    // Dispense item fields
    dispenseId: uuid("dispense_id")
      .notNull()
      .references(() => dispenses.id, { onDelete: "cascade" }),
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "restrict" }),
    batchId: uuid("batch_id").references(() => medicationBatches.id, {
      onDelete: "set null",
    }),
    lineNumber: integer("line_number").notNull(),
    medicationName: varchar("medication_name", { length: 255 }).notNull(),
    medicationNameId: varchar("medication_name_id", { length: 255 }),
    quantity: varchar("quantity", { length: 20 }).notNull(),
    unit: varchar("unit", { length: 20 }),
    dosage: varchar("dosage", { length: 50 }),
    instructions: text("instructions"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_dispense_item_dispense_id").on(table.dispenseId),
    index("idx_dispense_item_medication_id").on(table.medicationId),
  ]
);

/**
 * Controlled substance logs table
 * Represents controlled substance logs
 */
export const controlledSubstanceLogs = pgTable(
  "controlled_substance_logs",
  {
    ...fullFields,

    // Log fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "cascade" }),
    logDate: timestamp("log_date").notNull(),
    logType: varchar("log_type", { length: 50 }).notNull(), // receipt, dispensing, adjustment, destruction
    quantity: integer("quantity").notNull(),
    balance: integer("balance").notNull(),
    loggedBy: uuid("logged_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    referenceNumber: varchar("reference_number", { length: 50 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_controlled_substance_log_org_id").on(table.organizationId),
    index("idx_controlled_substance_log_branch_id").on(table.branchId),
    index("idx_controlled_substance_log_medication_id").on(table.medicationId),
    index("idx_controlled_substance_log_date").on(table.logDate),
    index("idx_controlled_substance_log_type").on(table.logType),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const medicationsRelations = relations(medications, ({ many }) => ({
  stock: many(medicationStock),
  batches: many(medicationBatches),
  movements: many(stockMovements),
  dispenseItems: many(dispenseItems),
  controlledSubstanceLogs: many(controlledSubstanceLogs),
}));

export const medicationStockRelations = relations(
  medicationStock,
  ({ many }) => ({
    batches: many(medicationBatches),
    movements: many(stockMovements),
  })
);

export const medicationBatchesRelations = relations(
  medicationBatches,
  ({ one }) => ({
    stock: one(medicationStock, {
      fields: [medicationBatches.stockId],
      references: [medicationStock.id],
    }),
  })
);

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  medication: one(medications, {
    fields: [stockMovements.medicationId],
    references: [medications.id],
  }),
}));

export const dispensesRelations = relations(dispenses, ({ many }) => ({
  items: many(dispenseItems),
}));

export const dispenseItemsRelations = relations(dispenseItems, ({ one }) => ({
  dispense: one(dispenses, {
    fields: [dispenseItems.dispenseId],
    references: [dispenses.id],
  }),
  medication: one(medications, {
    fields: [dispenseItems.medicationId],
    references: [medications.id],
  }),
}));

export const controlledSubstanceLogsRelations = relations(
  controlledSubstanceLogs,
  ({ one }) => ({
    medication: one(medications, {
      fields: [controlledSubstanceLogs.medicationId],
      references: [medications.id],
    }),
  })
);

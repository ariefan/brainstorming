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
  BsonResource,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { encounters } from "./medical";

// ============================================================================
// PHARMACY TABLES
// ============================================================================

/**
 * Medications table
 * Represents medications in pharmacy
 */
export const medications = pgTable(
  "medications",
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

    // Medication fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    medicationCode: varchar("medication_code", { length: 20 }).notNull(),
    genericName: varchar("generic_name", { length: 255 }).notNull(),
    genericNameId: varchar("generic_name_id", { length: 255 }),
    brandName: varchar("brand_name", { length: 255 }),
    brandNameId: varchar("brand_name_id", { length: 255 }),
    dosageForm: varchar("dosage_form", { length: 50 }),
    strength: varchar("strength", { length: 50 }),
    strengthUnit: varchar("strength_unit", { length: 20 }),
    manufacturer: varchar("manufacturer", { length: 255 }),
    medicationType: medicationTypeEnum("medication_type").notNull(),
    controlledSchedule: controlledSubstanceScheduleEnum("controlled_schedule"),
    kfaCode: varchar("kfa_code", { length: 20 }), // Katalog Farmasi Alkes
    kfaName: varchar("kfa_name", { length: 255 }),
    rxNormCode: varchar("rx_norm_code", { length: 20 }),
    atcCode: varchar("atc_code", { length: 20 }), // Anatomical Therapeutic Chemical
    description: text("description"),
    descriptionId: text("description_id"),
    indications: text("indications"),
    contraindications: text("contraindications"),
    sideEffects: text("side_effects"),
    interactions: text("interactions"),
    storageConditions: varchar("storage_conditions", { length: 100 }),
    isActive: boolean("is_active").default(true),
    requiresPrescription: boolean("requires_prescription").default(false),
    notes: text("notes"),
  },
  (table) => [
    index("idx_medication_org_id").on(table.organizationId),
    index("idx_medication_branch_id").on(table.branchId),
    uniqueIndex("idx_medication_code").on(table.medicationCode),
    index("idx_medication_kfa_code").on(table.kfaCode),
    index("idx_medication_rx_norm_code").on(table.rxNormCode),
    index("idx_medication_active").on(table.isActive),
  ]
);

/**
 * Medication stock table
 * Represents medication stock levels
 */
export const medicationStock = pgTable(
  "medication_stock",
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

    // Stock fields
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    quantityOnHand: integer("quantity_on_hand").default(0),
    quantityReserved: integer("quantity_reserved").default(0),
    quantityAvailable: integer("quantity_available").default(0),
    minimumStock: integer("minimum_stock").default(0),
    maximumStock: integer("maximum_stock"),
    reorderLevel: integer("reorder_level"),
    lastRestockDate: date("last_restock_date"),
    lastStockCheckDate: date("last_stock_check_date"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_medication_stock_medication_id").on(table.medicationId),
    index("idx_medication_stock_org_id").on(table.organizationId),
    index("idx_medication_stock_branch_id").on(table.branchId),
    uniqueIndex("idx_medication_stock_unique").on(
      table.medicationId,
      table.branchId
    ),
  ]
);

/**
 * Medication batches table
 * Represents medication batches
 */
export const medicationBatches = pgTable(
  "medication_batches",
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

    // Batch fields
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    batchNumber: varchar("batch_number", { length: 50 }).notNull(),
    lotNumber: varchar("lot_number", { length: 50 }),
    expiryDate: date("expiry_date").notNull(),
    manufacturingDate: date("manufacturing_date"),
    supplier: varchar("supplier", { length: 255 }),
    quantityReceived: integer("quantity_received").notNull(),
    quantityRemaining: integer("quantity_remaining").notNull(),
    costPrice: varchar("cost_price", { length: 20 }),
    costCurrency: varchar("cost_currency", { length: 10 }).default("IDR"),
    isControlled: boolean("is_controlled").default(false),
    storageLocation: varchar("storage_location", { length: 100 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_medication_batch_medication_id").on(table.medicationId),
    index("idx_medication_batch_org_id").on(table.organizationId),
    index("idx_medication_batch_branch_id").on(table.branchId),
    index("idx_medication_batch_number").on(table.batchNumber),
    index("idx_medication_batch_expiry_date").on(table.expiryDate),
  ]
);

/**
 * Stock movements table
 * Represents stock movements
 */
export const stockMovements = pgTable(
  "stock_movements",
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

    // Stock movement fields
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "cascade" }),
    batchId: uuid("batch_id").references(() => medicationBatches.id, {
      onDelete: "set null",
    }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    movementType: stockMovementTypeEnum("movement_type").notNull(),
    quantity: integer("quantity").notNull(),
    quantityBefore: integer("quantity_before"),
    quantityAfter: integer("quantity_after"),
    unitCost: varchar("unit_cost", { length: 20 }),
    referenceNumber: varchar("reference_number", { length: 50 }),
    referenceType: varchar("reference_type", { length: 50 }), // purchase, sale, transfer, etc.
    referenceId: uuid("reference_id"),
    reason: text("reason"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_stock_movement_medication_id").on(table.medicationId),
    index("idx_stock_movement_batch_id").on(table.batchId),
    index("idx_stock_movement_org_id").on(table.organizationId),
    index("idx_stock_movement_branch_id").on(table.branchId),
    index("idx_stock_movement_type").on(table.movementType),
    index("idx_stock_movement_created_at").on(table.createdAt),
  ]
);

/**
 * Dispenses table
 * Represents pharmacy dispenses
 */
export const dispenses = pgTable(
  "dispenses",
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
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    dispenseNumber: varchar("dispense_number", { length: 30 })
      .notNull()
      .unique(),
    dispenseDate: date("dispense_date").notNull(),
    dispensedAt: timestamp("dispensed_at").notNull(),
    dispensedBy: uuid("dispensed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    status: dispenseStatusEnum("status").default("pending"),
    paymentStatus: varchar("payment_status", { length: 20 }).default("pending"),
    isPaid: boolean("is_paid").default(false),
    paidAt: timestamp("paid_at"),
    notes: text("notes"),
    satusehatMedicationDispenseId: varchar("satusehat_medication_dispense_id", {
      length: 100,
    }),
  },
  (table) => [
    index("idx_dispense_org_id").on(table.organizationId),
    index("idx_dispense_branch_id").on(table.branchId),
    index("idx_dispense_patient_id").on(table.patientId),
    index("idx_dispense_encounter_id").on(table.encounterId),
    uniqueIndex("idx_dispense_number").on(table.dispenseNumber),
    index("idx_dispense_date").on(table.dispenseDate),
    index("idx_dispense_status").on(table.status),
  ]
);

/**
 * Dispense items table
 * Represents dispense items
 */
export const dispenseItems = pgTable(
  "dispense_items",
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

    // Dispense item fields
    dispenseId: uuid("dispense_id")
      .notNull()
      .references(() => dispenses.id, { onDelete: "cascade" }),
    lineNumber: integer("line_number").notNull(),
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "restrict" }),
    batchId: uuid("batch_id").references(() => medicationBatches.id, {
      onDelete: "set null",
    }),
    prescriptionItemId: uuid("prescription_item_id"),
    medicationName: varchar("medication_name", { length: 255 }).notNull(),
    medicationNameId: varchar("medication_name_id", { length: 255 }),
    genericName: varchar("generic_name", { length: 255 }),
    strength: varchar("strength", { length: 50 }),
    strengthUnit: varchar("strength_unit", { length: 20 }),
    dosageForm: varchar("dosage_form", { length: 50 }),
    quantity: integer("quantity").notNull(),
    unit: varchar("unit", { length: 20 }),
    unitPrice: varchar("unit_price", { length: 20 }),
    totalPrice: varchar("total_price", { length: 20 }),
    discountPercent: varchar("discount_percent", { length: 10 }),
    discountAmount: varchar("discount_amount", { length: 20 }),
    netPrice: varchar("net_price", { length: 20 }),
    instructions: text("instructions"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_dispense_item_dispense_id").on(table.dispenseId),
    index("idx_dispense_item_medication_id").on(table.medicationId),
    index("idx_dispense_item_batch_id").on(table.batchId),
    index("idx_dispense_item_prescription_item_id").on(
      table.prescriptionItemId
    ),
  ]
);

/**
 * Controlled substance logs table
 * Represents controlled substance handling logs
 */
export const controlledSubstanceLogs = pgTable(
  "controlled_substance_logs",
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

    // Controlled substance log fields
    medicationId: uuid("medication_id")
      .notNull()
      .references(() => medications.id, { onDelete: "cascade" }),
    batchId: uuid("batch_id")
      .notNull()
      .references(() => medicationBatches.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    logType: varchar("log_type", { length: 50 }).notNull(), // receipt, dispensing, destruction, transfer
    logDate: timestamp("log_date").notNull(),
    quantity: integer("quantity").notNull(),
    transactionType: varchar("transaction_type", { length: 50 }), // in, out, adjustment
    referenceNumber: varchar("reference_number", { length: 50 }),
    referenceId: uuid("reference_id"),
    performedBy: uuid("performed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    witnessedBy: uuid("witnessed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }), // Required for controlled substances
    reason: text("reason"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_controlled_substance_log_medication_id").on(table.medicationId),
    index("idx_controlled_substance_log_batch_id").on(table.batchId),
    index("idx_controlled_substance_log_org_id").on(table.organizationId),
    index("idx_controlled_substance_log_branch_id").on(table.branchId),
    index("idx_controlled_substance_log_type").on(table.logType),
    index("idx_controlled_substance_log_date").on(table.logDate),
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
  ({ many }) => ({
    movements: many(stockMovements),
    dispenseItems: many(dispenseItems),
    controlledSubstanceLogs: many(controlledSubstanceLogs),
  })
);

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  medication: one(medications, {
    fields: [stockMovements.medicationId],
    references: [medications.id],
  }),
  batch: one(medicationBatches, {
    fields: [stockMovements.batchId],
    references: [medicationBatches.id],
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
  batch: one(medicationBatches, {
    fields: [dispenseItems.batchId],
    references: [medicationBatches.id],
  }),
}));

export const controlledSubstanceLogsRelations = relations(
  controlledSubstanceLogs,
  ({ one }) => ({
    medication: one(medications, {
      fields: [controlledSubstanceLogs.medicationId],
      references: [medications.id],
    }),
    batch: one(medicationBatches, {
      fields: [controlledSubstanceLogs.batchId],
      references: [medicationBatches.id],
    }),
  })
);

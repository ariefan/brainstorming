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
  serviceTariffCategoryEnum,
  chargeStatusEnum,
  chargeSourceTypeEnum,
  chargeAdjustmentTypeEnum,
  invoiceTypeEnum,
  payerTypeEnum,
  invoiceStatusEnum,
  paymentMethodEnum,
  paymentStatusEnum,
  depositStatusEnum,
  refundStatusEnum,
  cashClosingShiftEnum,
  cashClosingStatusEnum,
  varianceStatusEnum,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { polyclinics } from "./practitioners";
import { practitioners } from "./practitioners";
import { encounters } from "./medical";
import { admissions } from "./inpatient";

// ============================================================================
// BILLING & PAYMENT TABLES
// ============================================================================

/**
 * Service tariffs table
 * Represents service tariff master
 */
export const serviceTariffs = pgTable(
  "service_tariffs",
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

    // Tariff fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    serviceCode: varchar("service_code", { length: 50 }).notNull().unique(),
    serviceName: varchar("service_name", { length: 255 }).notNull(),
    serviceNameId: varchar("service_name_id", { length: 255 }), // Indonesian name
    category: serviceTariffCategoryEnum("category").notNull(),
    subcategory: varchar("subcategory", { length: 100 }),
    icd9cmCode: varchar("icd9cm_code", { length: 20 }),
    basePrice: varchar("base_price", { length: 20 }).notNull(),
    isNegotiable: boolean("is_negotiable").default(false),
    isBpjsClaimable: boolean("is_bpjs_claimable").default(true),
    bpjsTariffCode: varchar("bpjs_tariff_code", { length: 50 }),
    bpjsPrice: varchar("bpjs_price", { length: 20 }),
    isComposite: boolean("is_composite").default(false),
    components: jsonb("components").$type<
      Array<{
        serviceCode: string;
        quantity: string;
      }>
    >(),
    polyclinicSpecific: boolean("polyclinic_specific").default(false),
    applicablePolyclinics: jsonb("applicable_polyclinics").$type<string[]>(),
    effectiveFrom: date("effective_from").notNull(),
    effectiveUntil: date("effective_until"),
    isActive: boolean("is_active").default(true),
  },
  (table) => ({
    orgIdIdx: index("idx_service_tariff_org_id").on(table.organizationId),
    branchIdIdx: index("idx_service_tariff_branch_id").on(table.branchId),
    serviceCodeIdx: uniqueIndex("idx_service_tariff_code").on(
      table.serviceCode
    ),
    categoryIdx: index("idx_service_tariff_category").on(table.category),
    effectiveIdx: index("idx_service_tariff_effective").on(
      table.effectiveFrom,
      table.effectiveUntil
    ),
    isActiveIdx: index("idx_service_tariff_active").on(table.isActive),
  })
);

/**
 * Tariff classes table
 * Represents tariff classes
 */
export const tariffClasses = pgTable(
  "tariff_classes",
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

    // Tariff class fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    className: varchar("class_name", { length: 100 }).notNull(),
    classCode: varchar("class_code", { length: 20 }).notNull().unique(),
    multiplier: varchar("multiplier", { length: 10 }).default("1.0"),
    isDefault: boolean("is_default").default(false),
    isActive: boolean("is_active").default(true),
  },
  (table) => ({
    orgIdIdx: index("idx_tariff_class_org_id").on(table.organizationId),
    branchIdIdx: index("idx_tariff_class_branch_id").on(table.branchId),
    classCodeIdx: uniqueIndex("idx_tariff_class_code").on(table.classCode),
  })
);

/**
 * Charges table
 * Represents charges
 */
export const charges = pgTable(
  "charges",
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

    // Charge fields
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
    admissionId: uuid("admission_id").references(() => admissions.id, {
      onDelete: "set null",
    }),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => serviceTariffs.id, { onDelete: "restrict" }),
    serviceCode: varchar("service_code", { length: 50 }).notNull(),
    serviceName: varchar("service_name", { length: 255 }).notNull(),
    sourceType: chargeSourceTypeEnum("source_type").notNull(),
    sourceId: uuid("source_id"),
    quantity: varchar("quantity", { length: 20 }).default("1"),
    unitPrice: varchar("unit_price", { length: 20 }).notNull(),
    discountPercent: varchar("discount_percent", { length: 10 }).default("0"),
    discountAmount: varchar("discount_amount", { length: 20 }).default("0"),
    subtotal: varchar("subtotal", { length: 20 }),
    total: varchar("total", { length: 20 }).notNull(),
    tariffClassId: uuid("tariff_class_id").references(() => tariffClasses.id, {
      onDelete: "set null",
    }),
    isBpjs: boolean("is_bpjs").default(false),
    bpjsTariffCode: varchar("bpjs_tariff_code", { length: 50 }),
    bpjsClaimAmount: varchar("bpjs_claim_amount", { length: 20 }),
    status: chargeStatusEnum("status").default("pending"),
    serviceDate: timestamp("service_date").notNull(),
    chargeDate: timestamp("charge_date").notNull(),
    invoicedDate: timestamp("invoiced_date"),
    paidDate: timestamp("paid_date"),
    chargedBy: uuid("charged_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_charge_org_id").on(table.organizationId),
    branchIdIdx: index("idx_charge_branch_id").on(table.branchId),
    patientIdIdx: index("idx_charge_patient_id").on(table.patientId),
    encounterIdIdx: index("idx_charge_encounter_id").on(table.encounterId),
    serviceIdIdx: index("idx_charge_service_id").on(table.serviceId),
    statusIdx: index("idx_charge_status").on(table.status),
    chargeDateIdx: index("idx_charge_date").on(table.chargeDate),
  })
);

/**
 * Charge adjustments table
 * Represents charge adjustments
 */
export const chargeAdjustments = pgTable(
  "charge_adjustments",
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

    // Adjustment fields
    chargeId: uuid("charge_id")
      .notNull()
      .references(() => charges.id, { onDelete: "cascade" }),
    adjustmentType: chargeAdjustmentTypeEnum("adjustment_type").notNull(),
    originalAmount: varchar("original_amount", { length: 20 }).notNull(),
    adjustmentAmount: varchar("adjustment_amount", { length: 20 }).notNull(),
    newAmount: varchar("new_amount", { length: 20 }).notNull(),
    reason: text("reason").notNull(),
    approvedBy: uuid("approved_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    adjustedAt: timestamp("adjusted_at").notNull(),
  },
  (table) => ({
    chargeIdIdx: index("idx_charge_adjustment_charge_id").on(table.chargeId),
  })
);

/**
 * Invoices table
 * Represents invoices
 */
export const invoices = pgTable(
  "invoices",
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

    // Invoice fields
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
    admissionId: uuid("admission_id").references(() => admissions.id, {
      onDelete: "set null",
    }),
    invoiceNumber: varchar("invoice_number", { length: 30 }).notNull().unique(),
    invoiceType: invoiceTypeEnum("invoice_type").notNull(),
    payerType: payerTypeEnum("payer_type").default("self_pay"),
    payerId: uuid("payer_id"),
    payerName: varchar("payer_name", { length: 255 }),
    isBpjs: boolean("is_bpjs").default(false),
    bpjsSepNumber: varchar("bpjs_sep_number", { length: 30 }),
    bpjsClass: varchar("bpjs_class", { length: 5 }),
    subtotal: varchar("subtotal", { length: 20 }),
    discountTotal: varchar("discount_total", { length: 20 }).default("0"),
    taxTotal: varchar("tax_total", { length: 20 }).default("0"),
    grandTotal: varchar("grand_total", { length: 20 }).notNull(),
    bpjsCovered: varchar("bpjs_covered", { length: 20 }).default("0"),
    insuranceCovered: varchar("insurance_covered", { length: 20 }).default("0"),
    patientResponsibility: varchar("patient_responsibility", { length: 20 }),
    depositApplied: varchar("deposit_applied", { length: 20 }).default("0"),
    depositBalance: varchar("deposit_balance", { length: 20 }).default("0"),
    status: invoiceStatusEnum("status").default("draft"),
    invoiceDate: timestamp("invoice_date").notNull(),
    dueDate: date("due_date"),
    paidDate: timestamp("paid_date"),
    finalizedBy: uuid("finalized_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_invoice_org_id").on(table.organizationId),
    branchIdIdx: index("idx_invoice_branch_id").on(table.branchId),
    patientIdIdx: index("idx_invoice_patient_id").on(table.patientId),
    encounterIdIdx: index("idx_invoice_encounter_id").on(table.encounterId),
    invoiceNumberIdx: uniqueIndex("idx_invoice_number").on(table.invoiceNumber),
    statusIdx: index("idx_invoice_status").on(table.status),
    invoiceDateIdx: index("idx_invoice_date").on(table.invoiceDate),
  })
);

/**
 * Invoice items table
 * Represents invoice items
 */
export const invoiceItems = pgTable(
  "invoice_items",
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

    // Invoice item fields
    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoices.id, { onDelete: "cascade" }),
    chargeId: uuid("charge_id")
      .notNull()
      .references(() => charges.id, { onDelete: "restrict" }),
    lineNumber: integer("line_number").notNull(),
    serviceCode: varchar("service_code", { length: 50 }).notNull(),
    serviceName: varchar("service_name", { length: 255 }).notNull(),
    quantity: varchar("quantity", { length: 20 }).notNull(),
    unitPrice: varchar("unit_price", { length: 20 }).notNull(),
    discount: varchar("discount", { length: 20 }).default("0"),
    total: varchar("total", { length: 20 }).notNull(),
    bpjsClaimAmount: varchar("bpjs_claim_amount", { length: 20 }),
    patientPortion: varchar("patient_portion", { length: 20 }),
  },
  (table) => ({
    invoiceIdIdx: index("idx_invoice_item_invoice_id").on(table.invoiceId),
    chargeIdIdx: index("idx_invoice_item_charge_id").on(table.chargeId),
  })
);

/**
 * Payments table
 * Represents payments
 */
export const payments = pgTable(
  "payments",
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

    // Payment fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoices.id, { onDelete: "cascade" }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    paymentNumber: varchar("payment_number", { length: 30 }).notNull().unique(),
    amountDue: varchar("amount_due", { length: 20 }).notNull(),
    amountPaid: varchar("amount_paid", { length: 20 }).notNull(),
    changeAmount: varchar("change_amount", { length: 20 }).default("0"),
    paymentComplete: boolean("payment_complete").default(false),
    remainingBalance: varchar("remaining_balance", { length: 20 }),
    status: paymentStatusEnum("status").default("completed"),
    paymentDate: timestamp("payment_date").notNull(),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_payment_org_id").on(table.organizationId),
    branchIdIdx: index("idx_payment_branch_id").on(table.branchId),
    invoiceIdIdx: index("idx_payment_invoice_id").on(table.invoiceId),
    patientIdIdx: index("idx_payment_patient_id").on(table.patientId),
    paymentNumberIdx: uniqueIndex("idx_payment_number").on(table.paymentNumber),
    paymentDateIdx: index("idx_payment_date").on(table.paymentDate),
    statusIdx: index("idx_payment_status").on(table.status),
  })
);

/**
 * Payment items table
 * Represents payment items
 */
export const paymentItems = pgTable(
  "payment_items",
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

    // Payment item fields
    paymentId: uuid("payment_id")
      .notNull()
      .references(() => payments.id, { onDelete: "cascade" }),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    amount: varchar("amount", { length: 20 }).notNull(),
    cardType: varchar("card_type", { length: 50 }),
    cardLast4: varchar("card_last_4", { length: 4 }),
    approvalCode: varchar("approval_code", { length: 50 }),
    terminalId: varchar("terminal_id", { length: 50 }),
    bankName: varchar("bank_name", { length: 100 }),
    accountNumber: varchar("account_number", { length: 50 }),
    transferReference: varchar("transfer_reference", { length: 100 }),
    qrisReference: varchar("qris_reference", { length: 100 }),
    qrisMerchantId: varchar("qris_merchant_id", { length: 50 }),
    edcReceiptNumber: varchar("edc_receipt_number", { length: 50 }),
    processedAt: timestamp("processed_at"),
    processedBy: uuid("processed_by").references(() => users.id, {
      onDelete: "set null",
    }),
  },
  (table) => ({
    paymentIdIdx: index("idx_payment_item_payment_id").on(table.paymentId),
  })
);

/**
 * Deposits table
 * Represents patient deposits
 */
export const deposits = pgTable(
  "deposits",
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

    // Deposit fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    admissionId: uuid("admission_id").references(() => admissions.id, {
      onDelete: "set null",
    }),
    depositNumber: varchar("deposit_number", { length: 30 }).notNull().unique(),
    depositAmount: varchar("deposit_amount", { length: 20 }).notNull(),
    usedAmount: varchar("used_amount", { length: 20 }).default("0"),
    balance: varchar("balance", { length: 20 }),
    paymentMethod: varchar("payment_method", { length: 20 }).notNull(),
    paymentReference: varchar("payment_reference", { length: 100 }),
    status: depositStatusEnum("status").default("active"),
    depositDate: timestamp("deposit_date").notNull(),
    receivedBy: uuid("received_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    refundId: uuid("refund_id"),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_deposit_org_id").on(table.organizationId),
    branchIdIdx: index("idx_deposit_branch_id").on(table.branchId),
    patientIdIdx: index("idx_deposit_patient_id").on(table.patientId),
    depositNumberIdx: uniqueIndex("idx_deposit_number").on(table.depositNumber),
    statusIdx: index("idx_deposit_status").on(table.status),
  })
);

/**
 * Refunds table
 * Represents refunds
 */
export const refunds = pgTable(
  "refunds",
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

    // Refund fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    refundNumber: varchar("refund_number", { length: 30 }).notNull().unique(),
    sourceType: varchar("source_type", { length: 20 }).notNull(), // deposit, overpayment, cancellation
    sourceId: uuid("source_id"),
    refundAmount: varchar("refund_amount", { length: 20 }).notNull(),
    refundMethod: varchar("refund_method", { length: 20 }), // cash, transfer
    bankName: varchar("bank_name", { length: 100 }),
    accountNumber: varchar("account_number", { length: 50 }),
    accountName: varchar("account_name", { length: 255 }),
    reason: text("reason").notNull(),
    status: refundStatusEnum("status").default("pending"),
    requestedAt: timestamp("requested_at").notNull(),
    requestedBy: uuid("requested_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    approvedAt: timestamp("approved_at"),
    approvedBy: uuid("approved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    processedAt: timestamp("processed_at"),
    processedBy: uuid("processed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_refund_org_id").on(table.organizationId),
    branchIdIdx: index("idx_refund_branch_id").on(table.branchId),
    patientIdIdx: index("idx_refund_patient_id").on(table.patientId),
    refundNumberIdx: uniqueIndex("idx_refund_number").on(table.refundNumber),
    statusIdx: index("idx_refund_status").on(table.status),
  })
);

/**
 * Cash closings table
 * Represents cash register closings
 */
export const cashClosings = pgTable(
  "cash_closings",
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

    // Cash closing fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    registerId: uuid("register_id").notNull(),
    closingNumber: varchar("closing_number", { length: 30 }).notNull().unique(),
    closingDate: date("closing_date").notNull(),
    shift: cashClosingShiftEnum("shift").notNull(),
    openingBalance: varchar("opening_balance", { length: 20 }).notNull(),
    openingTime: timestamp("opening_time"),
    totalCashIn: varchar("total_cash_in", { length: 20 }).notNull(),
    totalCashOut: varchar("total_cash_out", { length: 20 }).notNull(),
    totalDepositIn: varchar("total_deposit_in", { length: 20 }).notNull(),
    totalDepositRefund: varchar("total_deposit_refund", {
      length: 20,
    }).notNull(),
    totalDebit: varchar("total_debit", { length: 20 }).notNull(),
    totalCredit: varchar("total_credit", { length: 20 }).notNull(),
    totalQris: varchar("total_qris", { length: 20 }).notNull(),
    totalTransfer: varchar("total_transfer", { length: 20 }).notNull(),
    expectedCash: varchar("expected_cash", { length: 20 }).notNull(),
    actualCash: varchar("actual_cash", { length: 20 }).notNull(),
    variance: varchar("variance", { length: 20 }).notNull(),
    varianceStatus: varianceStatusEnum("variance_status").notNull(),
    varianceReason: text("variance_reason"),
    closingTime: timestamp("closing_time").notNull(),
    closedBy: uuid("closed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    verifiedBy: uuid("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    status: cashClosingStatusEnum("status").default("pending"),
    notes: text("notes"),
  },
  (table) => ({
    orgIdIdx: index("idx_cash_closing_org_id").on(table.organizationId),
    branchIdIdx: index("idx_cash_closing_branch_id").on(table.branchId),
    closingNumberIdx: uniqueIndex("idx_cash_closing_number").on(
      table.closingNumber
    ),
    closingDateIdx: index("idx_cash_closing_date").on(table.closingDate),
    statusIdx: index("idx_cash_closing_status").on(table.status),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

export const serviceTariffsRelations = relations(
  serviceTariffs,
  ({ many }) => ({
    charges: many(charges),
  })
);

export const chargesRelations = relations(charges, ({ many }) => ({
  adjustments: many(chargeAdjustments),
  invoiceItems: many(invoiceItems),
}));

export const chargeAdjustmentsRelations = relations(
  chargeAdjustments,
  ({ one }) => ({
    charge: one(charges, {
      fields: [chargeAdjustments.chargeId],
      references: [charges.id],
    }),
  })
);

export const invoicesRelations = relations(invoices, ({ many }) => ({
  items: many(invoiceItems),
  payments: many(payments),
}));

export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId],
    references: [invoices.id],
  }),
  charge: one(charges, {
    fields: [invoiceItems.chargeId],
    references: [charges.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ many }) => ({
  items: many(paymentItems),
}));

export const paymentItemsRelations = relations(paymentItems, ({ one }) => ({
  payment: one(payments, {
    fields: [paymentItems.paymentId],
    references: [payments.id],
  }),
}));

export const depositsRelations = relations(deposits, ({ one }) => ({
  refund: one(refunds, {
    fields: [deposits.refundId],
    references: [refunds.id],
  }),
}));

export const refundsRelations = relations(refunds, ({ many }) => ({
  deposits: many(deposits),
}));

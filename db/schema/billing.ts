import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  integer,
  numeric,
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
// BILLING AND PAYMENT TABLES
// ============================================================================

/**
 * Service tariffs table
 * Represents service tariffs
 */
export const serviceTariffs = pgTable(
  "service_tariffs",
  {
    ...fullFields,

    // Tariff fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    category: serviceTariffCategoryEnum("category").notNull(),
    code: varchar("code", { length: 20 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    nameId: varchar("name_id", { length: 255 }), // Indonesian name
    description: text("description"),
    unit: varchar("unit", { length: 20 }),
    price: numeric("price", { precision: 15, scale: 2 }).notNull(),
    bpjsTariffCode: varchar("bpjs_tariff_code", { length: 20 }),
    isActive: boolean("is_active").default(true),
  },
  (table) => [
    index("idx_service_tariff_org_id").on(table.organizationId),
    index("idx_service_tariff_branch_id").on(table.branchId),
    uniqueIndex("idx_service_tariff_code").on(table.code),
    index("idx_service_tariff_category").on(table.category),
    index("idx_service_tariff_active").on(table.isActive),
  ]
);

/**
 * Charges table
 * Represents charges
 */
export const charges = pgTable(
  "charges",
  {
    ...fullFields,

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
    invoiceId: uuid("invoice_id").references(() => invoices.id, {
      onDelete: "set null",
    }),
    chargeNumber: varchar("charge_number", { length: 30 }).notNull().unique(),
    chargeDate: timestamp("charge_date").notNull(),
    sourceType: chargeSourceTypeEnum("source_type").notNull(),
    sourceId: uuid("source_id").notNull(),
    serviceTariffId: uuid("service_tariff_id").references(
      () => serviceTariffs.id,
      {
        onDelete: "set null",
      }
    ),
    description: text("description").notNull(),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).default("1"),
    unitPrice: numeric("unit_price", { precision: 15, scale: 2 }).notNull(),
    totalPrice: numeric("total_price", { precision: 15, scale: 2 }).notNull(),
    status: chargeStatusEnum("status").default("pending"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_charge_org_id").on(table.organizationId),
    index("idx_charge_branch_id").on(table.branchId),
    index("idx_charge_patient_id").on(table.patientId),
    index("idx_charge_invoice_id").on(table.invoiceId),
    uniqueIndex("idx_charge_number").on(table.chargeNumber),
    index("idx_charge_source").on(table.sourceType, table.sourceId),
    index("idx_charge_date").on(table.chargeDate),
    index("idx_charge_status").on(table.status),
  ]
);

/**
 * Charge adjustments table
 * Represents charge adjustments
 */
export const chargeAdjustments = pgTable(
  "charge_adjustments",
  {
    ...fullFields,

    // Adjustment fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    chargeId: uuid("charge_id")
      .notNull()
      .references(() => charges.id, { onDelete: "cascade" }),
    adjustmentType: chargeAdjustmentTypeEnum("adjustment_type").notNull(),
    originalAmount: numeric("original_amount", {
      precision: 15,
      scale: 2,
    }).notNull(),
    adjustmentAmount: numeric("adjustment_amount", {
      precision: 15,
      scale: 2,
    }).notNull(),
    newAmount: numeric("new_amount", { precision: 15, scale: 2 }).notNull(),
    reason: text("reason").notNull(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_charge_adjustment_org_id").on(table.organizationId),
    index("idx_charge_adjustment_branch_id").on(table.branchId),
    index("idx_charge_adjustment_charge_id").on(table.chargeId),
    index("idx_charge_adjustment_type").on(table.adjustmentType),
  ]
);

/**
 * Invoices table
 * Represents invoices
 */
export const invoices = pgTable(
  "invoices",
  {
    ...fullFields,

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
    invoiceNumber: varchar("invoice_number", { length: 30 }).notNull().unique(),
    invoiceDate: timestamp("invoice_date").notNull(),
    invoiceType: invoiceTypeEnum("invoice_type").notNull(),
    payerType: payerTypeEnum("payer_type").notNull(),
    payerName: varchar("payer_name", { length: 255 }),
    bpjsNumber: varchar("bpjs_number", { length: 20 }),
    sepNumber: varchar("sep_number", { length: 20 }),
    subtotal: numeric("subtotal", { precision: 15, scale: 2 }).notNull(),
    discount: numeric("discount", { precision: 15, scale: 2 }).default("0"),
    tax: numeric("tax", { precision: 15, scale: 2 }).default("0"),
    total: numeric("total", { precision: 15, scale: 2 }).notNull(),
    paidAmount: numeric("paid_amount", { precision: 15, scale: 2 }).default(
      "0"
    ),
    balance: numeric("balance", { precision: 15, scale: 2 }).notNull(),
    status: invoiceStatusEnum("status").default("draft"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_invoice_org_id").on(table.organizationId),
    index("idx_invoice_branch_id").on(table.branchId),
    index("idx_invoice_patient_id").on(table.patientId),
    uniqueIndex("idx_invoice_number").on(table.invoiceNumber),
    index("idx_invoice_type").on(table.invoiceType),
    index("idx_invoice_payer_type").on(table.payerType),
    index("idx_invoice_status").on(table.status),
    index("idx_invoice_date").on(table.invoiceDate),
  ]
);

/**
 * Payments table
 * Represents payments
 */
export const payments = pgTable(
  "payments",
  {
    ...fullFields,

    // Payment fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    invoiceId: uuid("invoice_id").references(() => invoices.id, {
      onDelete: "set null",
    }),
    paymentNumber: varchar("payment_number", { length: 30 }).notNull().unique(),
    paymentDate: timestamp("payment_date").notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    referenceNumber: varchar("reference_number", { length: 50 }),
    bankName: varchar("bank_name", { length: 100 }),
    cardNumber: varchar("card_number", { length: 20 }),
    status: paymentStatusEnum("status").default("completed"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_payment_org_id").on(table.organizationId),
    index("idx_payment_branch_id").on(table.branchId),
    index("idx_payment_patient_id").on(table.patientId),
    index("idx_payment_invoice_id").on(table.invoiceId),
    uniqueIndex("idx_payment_number").on(table.paymentNumber),
    index("idx_payment_method").on(table.paymentMethod),
    index("idx_payment_status").on(table.status),
    index("idx_payment_date").on(table.paymentDate),
  ]
);

/**
 * Deposits table
 * Represents deposits
 */
export const deposits = pgTable(
  "deposits",
  {
    ...fullFields,

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
    depositNumber: varchar("deposit_number", { length: 30 }).notNull().unique(),
    depositDate: timestamp("deposit_date").notNull(),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    paymentMethod: varchar("payment_method", { length: 20 }).notNull(),
    referenceNumber: varchar("reference_number", { length: 50 }),
    status: depositStatusEnum("status").default("active"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_deposit_org_id").on(table.organizationId),
    index("idx_deposit_branch_id").on(table.branchId),
    index("idx_deposit_patient_id").on(table.patientId),
    uniqueIndex("idx_deposit_number").on(table.depositNumber),
    index("idx_deposit_status").on(table.status),
    index("idx_deposit_date").on(table.depositDate),
  ]
);

/**
 * Deposit applications table
 * Represents deposit applications
 */
export const depositApplications = pgTable(
  "deposit_applications",
  {
    ...fullFields,

    // Application fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    depositId: uuid("deposit_id")
      .notNull()
      .references(() => deposits.id, { onDelete: "cascade" }),
    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoices.id, { onDelete: "cascade" }),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_deposit_application_org_id").on(table.organizationId),
    index("idx_deposit_application_branch_id").on(table.branchId),
    index("idx_deposit_application_deposit_id").on(table.depositId),
    index("idx_deposit_application_invoice_id").on(table.invoiceId),
  ]
);

/**
 * Refunds table
 * Represents refunds
 */
export const refunds = pgTable(
  "refunds",
  {
    ...fullFields,

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
    paymentId: uuid("payment_id")
      .notNull()
      .references(() => payments.id, { onDelete: "cascade" }),
    refundNumber: varchar("refund_number", { length: 30 }).notNull().unique(),
    refundDate: timestamp("refund_date").notNull(),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    reason: text("reason").notNull(),
    status: refundStatusEnum("status").default("pending"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_refund_org_id").on(table.organizationId),
    index("idx_refund_branch_id").on(table.branchId),
    index("idx_refund_patient_id").on(table.patientId),
    index("idx_refund_payment_id").on(table.paymentId),
    uniqueIndex("idx_refund_number").on(table.refundNumber),
    index("idx_refund_status").on(table.status),
    index("idx_refund_date").on(table.refundDate),
  ]
);

/**
 * Cash closings table
 * Represents cash closings
 */
export const cashClosings = pgTable(
  "cash_closings",
  {
    ...fullFields,

    // Cash closing fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    cashierId: uuid("cashier_id")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    closingDate: date("closing_date").notNull(),
    shift: cashClosingShiftEnum("shift").notNull(),
    openingBalance: numeric("opening_balance", {
      precision: 15,
      scale: 2,
    }).notNull(),
    totalCashIn: numeric("total_cash_in", {
      precision: 15,
      scale: 2,
    }).notNull(),
    totalCashOut: numeric("total_cash_out", {
      precision: 15,
      scale: 2,
    }).notNull(),
    expectedBalance: numeric("expected_balance", {
      precision: 15,
      scale: 2,
    }).notNull(),
    actualBalance: numeric("actual_balance", {
      precision: 15,
      scale: 2,
    }).notNull(),
    variance: numeric("variance", { precision: 15, scale: 2 }).notNull(),
    varianceStatus: varianceStatusEnum("variance_status").notNull(),
    status: cashClosingStatusEnum("status").default("pending"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_cash_closing_org_id").on(table.organizationId),
    index("idx_cash_closing_branch_id").on(table.branchId),
    index("idx_cash_closing_cashier_id").on(table.cashierId),
    index("idx_cash_closing_date").on(table.closingDate),
    index("idx_cash_closing_status").on(table.status),
  ]
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

export const chargesRelations = relations(charges, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [charges.organizationId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [charges.patientId],
    references: [patients.id],
  }),
  invoice: one(invoices, {
    fields: [charges.invoiceId],
    references: [invoices.id],
  }),
  serviceTariff: one(serviceTariffs, {
    fields: [charges.serviceTariffId],
    references: [serviceTariffs.id],
  }),
  adjustments: many(chargeAdjustments),
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

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [invoices.organizationId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [invoices.patientId],
    references: [patients.id],
  }),
  charges: many(charges),
  payments: many(payments),
  depositApplications: many(depositApplications),
}));

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [payments.organizationId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [payments.patientId],
    references: [patients.id],
  }),
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
  refunds: many(refunds),
}));

export const depositsRelations = relations(deposits, ({ many }) => ({
  applications: many(depositApplications),
}));

export const depositApplicationsRelations = relations(
  depositApplications,
  ({ one }) => ({
    deposit: one(deposits, {
      fields: [depositApplications.depositId],
      references: [deposits.id],
    }),
    invoice: one(invoices, {
      fields: [depositApplications.invoiceId],
      references: [invoices.id],
    }),
  })
);

export const refundsRelations = relations(refunds, ({ one }) => ({
  organization: one(organizations, {
    fields: [refunds.organizationId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [refunds.patientId],
    references: [patients.id],
  }),
  payment: one(payments, {
    fields: [refunds.paymentId],
    references: [payments.id],
  }),
}));

export const cashClosingsRelations = relations(cashClosings, ({ one }) => ({
  organization: one(organizations, {
    fields: [cashClosings.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [cashClosings.branchId],
    references: [organizations.id],
  }),
  cashier: one(users, {
    fields: [cashClosings.cashierId],
    references: [users.id],
  }),
}));

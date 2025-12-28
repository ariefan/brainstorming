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
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  subscriptionPlanEnum,
  billingCycleEnum,
  subscriptionStatusEnum,
  featureFlagStatusEnum,
  baseFields,
  fullFields,
} from "./core";
import { organizations } from "./organization";

// ============================================================================
// SAAS INFRASTRUCTURE TABLES
// ============================================================================
// Tables for managing tenant subscriptions, billing, features, and quotas
// These are for billing CLINICS (tenants), not patients
// ============================================================================

/**
 * Subscriptions table
 * Tracks tenant subscription plans and billing
 */
export const subscriptions = pgTable(
  "subscriptions",
  {
    ...fullFields,

    // Organization (tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" })
      .unique(),

    // Subscription details
    plan: subscriptionPlanEnum("plan").notNull(),
    status: subscriptionStatusEnum("status").default("trial"),
    billingCycle: billingCycleEnum("billing_cycle").default("monthly"),

    // Trial
    trialStartDate: date("trial_start_date"),
    trialEndDate: date("trial_end_date"),

    // Billing dates
    currentPeriodStart: date("current_period_start").notNull(),
    currentPeriodEnd: date("current_period_end").notNull(),
    nextBillingDate: date("next_billing_date"),

    // Pricing (in IDR)
    monthlyPrice: numeric("monthly_price", { precision: 15, scale: 2 }),
    yearlyPrice: numeric("yearly_price", { precision: 15, scale: 2 }),
    discountPercent: numeric("discount_percent", { precision: 5, scale: 2 }),

    // Payment
    paymentMethodId: varchar("payment_method_id", { length: 100 }),
    lastPaymentDate: date("last_payment_date"),
    lastPaymentAmount: numeric("last_payment_amount", {
      precision: 15,
      scale: 2,
    }),

    // Cancellation
    cancelledAt: timestamp("cancelled_at"),
    cancelReason: text("cancel_reason"),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),

    // External references (payment gateway)
    externalSubscriptionId: varchar("external_subscription_id", {
      length: 100,
    }),
    externalCustomerId: varchar("external_customer_id", { length: 100 }),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_subscription_org_id").on(table.organizationId),
    index("idx_subscription_status").on(table.status),
    index("idx_subscription_plan").on(table.plan),
    index("idx_subscription_next_billing").on(table.nextBillingDate),
    index("idx_subscription_external_id").on(table.externalSubscriptionId),
  ]
);

/**
 * Subscription history table
 * Tracks plan changes and billing events
 */
export const subscriptionHistory = pgTable(
  "subscription_history",
  {
    ...baseFields,

    subscriptionId: uuid("subscription_id")
      .notNull()
      .references(() => subscriptions.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    // Event details
    eventType: varchar("event_type", { length: 50 }).notNull(), // plan_change, payment, cancellation, renewal
    previousPlan: subscriptionPlanEnum("previous_plan"),
    newPlan: subscriptionPlanEnum("new_plan"),
    previousStatus: subscriptionStatusEnum("previous_status"),
    newStatus: subscriptionStatusEnum("new_status"),

    // Payment details (if applicable)
    amount: numeric("amount", { precision: 15, scale: 2 }),
    paymentReference: varchar("payment_reference", { length: 100 }),

    // Metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_subscription_history_subscription_id").on(table.subscriptionId),
    index("idx_subscription_history_org_id").on(table.organizationId),
    index("idx_subscription_history_event_type").on(table.eventType),
    index("idx_subscription_history_created_at").on(table.createdAt),
  ]
);

/**
 * Features table
 * Defines available features in the system
 */
export const features = pgTable(
  "features",
  {
    ...baseFields,

    // Feature identification
    featureKey: varchar("feature_key", { length: 100 }).notNull().unique(),
    featureName: varchar("feature_name", { length: 255 }).notNull(),
    featureNameId: varchar("feature_name_id", { length: 255 }),
    description: text("description"),

    // Categorization
    category: varchar("category", { length: 100 }),
    module: varchar("module", { length: 100 }), // e.g., 'medical', 'pharmacy', 'hr', 'billing'

    // Default status
    defaultStatus: featureFlagStatusEnum("default_status").default("disabled"),

    // Plan requirements
    minimumPlan: subscriptionPlanEnum("minimum_plan").default("basic"),

    // Feature settings
    isAddOn: boolean("is_add_on").default(false),
    addOnPrice: numeric("add_on_price", { precision: 15, scale: 2 }),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_feature_key").on(table.featureKey),
    index("idx_feature_category").on(table.category),
    index("idx_feature_module").on(table.module),
    index("idx_feature_minimum_plan").on(table.minimumPlan),
  ]
);

/**
 * Organization features table
 * Tracks which features are enabled for each organization
 */
export const organizationFeatures = pgTable(
  "organization_features",
  {
    ...baseFields,

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    featureId: uuid("feature_id")
      .notNull()
      .references(() => features.id, { onDelete: "cascade" }),

    // Status
    status: featureFlagStatusEnum("status").default("enabled"),

    // Override (for custom deals)
    isOverride: boolean("is_override").default(false),
    overrideReason: text("override_reason"),

    // Validity
    enabledAt: timestamp("enabled_at").defaultNow(),
    expiresAt: timestamp("expires_at"),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_org_feature_unique").on(
      table.organizationId,
      table.featureId
    ),
    index("idx_org_feature_org_id").on(table.organizationId),
    index("idx_org_feature_feature_id").on(table.featureId),
    index("idx_org_feature_status").on(table.status),
  ]
);

/**
 * Usage quotas table
 * Defines usage limits per plan
 */
export const usageQuotas = pgTable(
  "usage_quotas",
  {
    ...baseFields,

    // Plan this applies to
    plan: subscriptionPlanEnum("plan").notNull(),

    // Quota identification
    quotaKey: varchar("quota_key", { length: 100 }).notNull(),
    quotaName: varchar("quota_name", { length: 255 }).notNull(),
    description: text("description"),

    // Limits (-1 = unlimited)
    limitValue: integer("limit_value").notNull(),
    limitPeriod: varchar("limit_period", { length: 20 }), // 'monthly', 'daily', 'total'

    // Soft vs hard limit
    isSoftLimit: boolean("is_soft_limit").default(false),
    overage_price: numeric("overage_price", { precision: 15, scale: 2 }),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_usage_quota_plan_key").on(table.plan, table.quotaKey),
    index("idx_usage_quota_plan").on(table.plan),
    index("idx_usage_quota_key").on(table.quotaKey),
  ]
);

/**
 * Usage tracking table
 * Tracks actual usage per organization
 */
export const usageTracking = pgTable(
  "usage_tracking",
  {
    ...baseFields,

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    // What's being tracked
    quotaKey: varchar("quota_key", { length: 100 }).notNull(),

    // Period
    periodStart: date("period_start").notNull(),
    periodEnd: date("period_end").notNull(),

    // Usage
    usageCount: integer("usage_count").default(0),
    limitValue: integer("limit_value").notNull(),

    // Alerts
    alertSentAt80: timestamp("alert_sent_at_80"),
    alertSentAt100: timestamp("alert_sent_at_100"),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_usage_tracking_unique").on(
      table.organizationId,
      table.quotaKey,
      table.periodStart
    ),
    index("idx_usage_tracking_org_id").on(table.organizationId),
    index("idx_usage_tracking_quota_key").on(table.quotaKey),
    index("idx_usage_tracking_period").on(table.periodStart, table.periodEnd),
  ]
);

/**
 * API keys table
 * Manages API access for integrations
 */
export const apiKeys = pgTable(
  "api_keys",
  {
    ...fullFields,

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    // Key details
    keyName: varchar("key_name", { length: 255 }).notNull(),
    keyPrefix: varchar("key_prefix", { length: 10 }).notNull(), // First 8 chars for identification
    keyHash: varchar("key_hash", { length: 255 }).notNull(), // Hashed key (never store plain)

    // Permissions
    scopes: jsonb("scopes").$type<string[]>().default([]),

    // Status
    isActive: boolean("is_active").default(true),
    lastUsedAt: timestamp("last_used_at"),
    usageCount: integer("usage_count").default(0),

    // Expiry
    expiresAt: timestamp("expires_at"),

    // Rate limiting
    rateLimit: integer("rate_limit").default(1000), // requests per hour
    rateLimitWindow: integer("rate_limit_window").default(3600), // seconds

    notes: text("notes"),
  },
  (table) => [
    index("idx_api_key_org_id").on(table.organizationId),
    index("idx_api_key_prefix").on(table.keyPrefix),
    index("idx_api_key_active").on(table.isActive),
    index("idx_api_key_expires").on(table.expiresAt),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const subscriptionsRelations = relations(
  subscriptions,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [subscriptions.organizationId],
      references: [organizations.id],
    }),
    history: many(subscriptionHistory),
  })
);

export const subscriptionHistoryRelations = relations(
  subscriptionHistory,
  ({ one }) => ({
    subscription: one(subscriptions, {
      fields: [subscriptionHistory.subscriptionId],
      references: [subscriptions.id],
    }),
    organization: one(organizations, {
      fields: [subscriptionHistory.organizationId],
      references: [organizations.id],
    }),
  })
);

export const featuresRelations = relations(features, ({ many }) => ({
  organizationFeatures: many(organizationFeatures),
}));

export const organizationFeaturesRelations = relations(
  organizationFeatures,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationFeatures.organizationId],
      references: [organizations.id],
    }),
    feature: one(features, {
      fields: [organizationFeatures.featureId],
      references: [features.id],
    }),
  })
);

export const usageTrackingRelations = relations(usageTracking, ({ one }) => ({
  organization: one(organizations, {
    fields: [usageTracking.organizationId],
    references: [organizations.id],
  }),
}));

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  organization: one(organizations, {
    fields: [apiKeys.organizationId],
    references: [organizations.id],
  }),
}));

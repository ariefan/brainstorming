import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  notificationChannelEnum,
  notificationStatusEnum,
  notificationPriorityEnum,
  fullFields,
  baseFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";

// ============================================================================
// NOTIFICATION TABLES
// ============================================================================
// Queue-based notification system for alerts, reminders, and communications
// Supports multiple channels: in-app, email, SMS, WhatsApp, push
// ============================================================================

/**
 * Notification templates table
 * Defines reusable notification templates
 */
export const notificationTemplates = pgTable(
  "notification_templates",
  {
    ...fullFields,

    // Organization (null = system-wide template)
    organizationId: uuid("organization_id").references(() => organizations.id, {
      onDelete: "cascade",
    }),

    // Template identification
    templateKey: varchar("template_key", { length: 100 }).notNull(),
    templateName: varchar("template_name", { length: 255 }).notNull(),
    description: text("description"),

    // Channel
    channel: notificationChannelEnum("channel").notNull(),

    // Content
    subject: varchar("subject", { length: 500 }),
    bodyTemplate: text("body_template").notNull(),
    bodyTemplateId: text("body_template_id"), // Indonesian version

    // Variables (for template rendering)
    variables: jsonb("variables").$type<string[]>().default([]),

    // Status
    isActive: boolean("is_active").default(true),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_notification_template_key").on(
      table.organizationId,
      table.templateKey,
      table.channel
    ),
    index("idx_notification_template_org_id").on(table.organizationId),
    index("idx_notification_template_channel").on(table.channel),
    index("idx_notification_template_active").on(table.isActive),
  ]
);

/**
 * Notifications table
 * Main notification queue and history
 */
export const notifications = pgTable(
  "notifications",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Recipient
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    recipientEmail: varchar("recipient_email", { length: 255 }),
    recipientPhone: varchar("recipient_phone", { length: 20 }),
    recipientDeviceToken: text("recipient_device_token"),

    // Notification details
    channel: notificationChannelEnum("channel").notNull(),
    priority: notificationPriorityEnum("priority").default("normal"),
    templateId: uuid("template_id").references(() => notificationTemplates.id, {
      onDelete: "set null",
    }),

    // Content
    title: varchar("title", { length: 500 }).notNull(),
    body: text("body").notNull(),
    data: jsonb("data").$type<Record<string, any>>(),

    // Links
    actionUrl: varchar("action_url", { length: 1000 }),
    imageUrl: varchar("image_url", { length: 1000 }),

    // Status
    status: notificationStatusEnum("status").default("pending"),
    scheduledAt: timestamp("scheduled_at"),
    sentAt: timestamp("sent_at"),
    deliveredAt: timestamp("delivered_at"),
    readAt: timestamp("read_at"),
    failedAt: timestamp("failed_at"),
    failureReason: text("failure_reason"),

    // Retry
    attempts: integer("attempts").default(0),
    maxAttempts: integer("max_attempts").default(3),
    nextRetryAt: timestamp("next_retry_at"),

    // External references
    externalMessageId: varchar("external_message_id", { length: 255 }),

    // Expiry
    expiresAt: timestamp("expires_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_notification_org_id").on(table.organizationId),
    index("idx_notification_branch_id").on(table.branchId),
    index("idx_notification_user_id").on(table.userId),
    index("idx_notification_channel").on(table.channel),
    index("idx_notification_status").on(table.status),
    index("idx_notification_priority").on(table.priority),
    index("idx_notification_scheduled_at").on(table.scheduledAt),
    // Queue polling index
    index("idx_notification_queue_poll").on(
      table.status,
      table.scheduledAt,
      table.priority
    ),
    index("idx_notification_created_at").on(table.createdAt),
  ]
);

/**
 * User notification preferences table
 * Per-user notification settings
 */
export const userNotificationPreferences = pgTable(
  "user_notification_preferences",
  {
    ...baseFields,

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Channel preferences
    enableInApp: boolean("enable_in_app").default(true),
    enableEmail: boolean("enable_email").default(true),
    enableSms: boolean("enable_sms").default(false),
    enableWhatsapp: boolean("enable_whatsapp").default(false),
    enablePush: boolean("enable_push").default(true),

    // Category preferences
    enableAppointmentReminders: boolean("enable_appointment_reminders").default(
      true
    ),
    enableLabResults: boolean("enable_lab_results").default(true),
    enablePaymentReminders: boolean("enable_payment_reminders").default(true),
    enableSystemAlerts: boolean("enable_system_alerts").default(true),
    enableMarketingMessages: boolean("enable_marketing_messages").default(
      false
    ),

    // Quiet hours
    quietHoursStart: varchar("quiet_hours_start", { length: 5 }), // HH:MM
    quietHoursEnd: varchar("quiet_hours_end", { length: 5 }), // HH:MM
    quietHoursTimezone: varchar("quiet_hours_timezone", { length: 50 }),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_user_notification_pref_user_id").on(table.userId),
  ]
);

/**
 * Push device tokens table
 * Stores device tokens for push notifications
 */
export const pushDeviceTokens = pgTable(
  "push_device_tokens",
  {
    ...baseFields,

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Device info
    deviceToken: text("device_token").notNull(),
    deviceType: varchar("device_type", { length: 20 }).notNull(), // 'ios', 'android', 'web'
    deviceName: varchar("device_name", { length: 255 }),
    appVersion: varchar("app_version", { length: 20 }),

    // Status
    isActive: boolean("is_active").default(true),
    lastUsedAt: timestamp("last_used_at"),

    // Metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),
  },
  (table) => [
    index("idx_push_device_token_user_id").on(table.userId),
    uniqueIndex("idx_push_device_token_unique").on(table.deviceToken),
    index("idx_push_device_token_active").on(table.isActive),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const notificationTemplatesRelations = relations(
  notificationTemplates,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [notificationTemplates.organizationId],
      references: [organizations.id],
    }),
    notifications: many(notifications),
  })
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  organization: one(organizations, {
    fields: [notifications.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [notifications.branchId],
    references: [organizations.id],
    relationName: "notificationBranch",
  }),
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  template: one(notificationTemplates, {
    fields: [notifications.templateId],
    references: [notificationTemplates.id],
  }),
}));

export const userNotificationPreferencesRelations = relations(
  userNotificationPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userNotificationPreferences.userId],
      references: [users.id],
    }),
  })
);

export const pushDeviceTokensRelations = relations(
  pushDeviceTokens,
  ({ one }) => ({
    user: one(users, {
      fields: [pushDeviceTokens.userId],
      references: [users.id],
    }),
  })
);

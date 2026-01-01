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
  documentTypeEnum,
  documentStatusEnum,
  virusScanStatusEnum,
  fileAccessEnum,
  fullFields,
  baseFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";

// ============================================================================
// DOCUMENT & FILE MANAGEMENT TABLES
// ============================================================================
// File storage tracking for medical records, images, PDFs, etc.
// Actual files stored in object storage (S3, GCS, etc.)
// These tables track metadata and access
// ============================================================================

/**
 * Documents table
 * Main file/document metadata storage
 */
export const documents = pgTable(
  "documents",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Document identification
    documentNumber: varchar("document_number", { length: 50 }).notNull(),
    documentType: documentTypeEnum("document_type").notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),

    // File details
    fileName: varchar("file_name", { length: 500 }).notNull(),
    fileExtension: varchar("file_extension", { length: 20 }),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    fileSizeBytes: integer("file_size_bytes").notNull(),

    // Storage location
    storageProvider: varchar("storage_provider", { length: 50 }).notNull(), // 's3', 'gcs', 'azure', 'local'
    storageBucket: varchar("storage_bucket", { length: 255 }),
    storagePath: varchar("storage_path", { length: 1000 }).notNull(),
    storageUrl: text("storage_url"),

    // Checksums for integrity
    md5Hash: varchar("md5_hash", { length: 32 }),
    sha256Hash: varchar("sha256_hash", { length: 64 }),

    // Status
    status: documentStatusEnum("status").default("ready"),

    // Associations (optional - for linking to specific entities)
    patientId: uuid("patient_id").references(() => patients.id, {
      onDelete: "set null",
    }),
    encounterId: uuid("encounter_id"),
    appointmentId: uuid("appointment_id"),

    // Upload info
    uploadedBy: uuid("uploaded_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),

    // Processing (for images, PDFs)
    isProcessed: boolean("is_processed").default(false),
    processedAt: timestamp("processed_at"),
    processingMetadata: jsonb("processing_metadata").$type<Record<string, any>>(),

    // Thumbnails
    thumbnailPath: varchar("thumbnail_path", { length: 1000 }),
    thumbnailUrl: text("thumbnail_url"),

    // Security
    isEncrypted: boolean("is_encrypted").default(false),
    encryptionKeyId: varchar("encryption_key_id", { length: 100 }),

    // Virus scan (for compliance)
    virusScanStatus: virusScanStatusEnum("virus_scan_status").default("pending"),
    virusScanCompletedAt: timestamp("virus_scan_completed_at"),

    // Access level
    access: fileAccessEnum("access").default("private"),

    // Retention
    retentionDate: timestamp("retention_date"),
    isArchived: boolean("is_archived").default(false),
    archivedAt: timestamp("archived_at"),

    // OCR/Text extraction
    extractedText: text("extracted_text"),
    ocrProcessedAt: timestamp("ocr_processed_at"),

    // Tags for search
    tags: jsonb("tags").$type<string[]>().default([]),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_document_number").on(
      table.organizationId,
      table.documentNumber
    ),
    index("idx_document_org_id").on(table.organizationId),
    index("idx_document_branch_id").on(table.branchId),
    index("idx_document_type").on(table.documentType),
    index("idx_document_status").on(table.status),
    index("idx_document_patient_id").on(table.patientId),
    index("idx_document_encounter_id").on(table.encounterId),
    index("idx_document_uploaded_by").on(table.uploadedBy),
    index("idx_document_uploaded_at").on(table.uploadedAt),
    index("idx_document_archived").on(table.isArchived),
    index("idx_document_retention").on(table.retentionDate),
    index("idx_document_virus_scan").on(table.virusScanStatus),
    index("idx_document_access").on(table.access),
  ]
);

/**
 * Document versions table
 * Tracks document version history
 */
export const documentVersions = pgTable(
  "document_versions",
  {
    ...fullFields,

    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),

    // Version info
    versionNumber: integer("version_number").notNull(),
    versionLabel: varchar("version_label", { length: 100 }),

    // File details for this version
    fileName: varchar("file_name", { length: 500 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    fileSizeBytes: integer("file_size_bytes").notNull(),
    storagePath: varchar("storage_path", { length: 1000 }).notNull(),
    storageUrl: text("storage_url"),

    // Checksums
    md5Hash: varchar("md5_hash", { length: 32 }),
    sha256Hash: varchar("sha256_hash", { length: 64 }),

    // Who created this version
    createdByUserId: uuid("created_by_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),

    // Change notes
    changeNotes: text("change_notes"),

    notes: text("notes"),
  },
  (table) => [
    uniqueIndex("idx_document_version_unique").on(
      table.documentId,
      table.versionNumber
    ),
    index("idx_document_version_document_id").on(table.documentId),
    index("idx_document_version_created_at").on(table.createdAt),
  ]
);

/**
 * Document access logs table
 * Tracks who accessed what documents (compliance requirement)
 */
export const documentAccessLogs = pgTable(
  "document_access_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),

    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),

    // Who accessed
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    userRole: varchar("user_role", { length: 50 }),

    // Access type
    accessType: varchar("access_type", { length: 50 }).notNull(), // 'view', 'download', 'print', 'share'

    // Context
    ipAddress: varchar("ip_address", { length: 50 }),
    userAgent: text("user_agent"),

    // Access reason (for compliance)
    accessReason: varchar("access_reason", { length: 255 }),
  },
  (table) => [
    index("idx_document_access_log_document_id").on(table.documentId),
    index("idx_document_access_log_user_id").on(table.userId),
    index("idx_document_access_log_created_at").on(table.createdAt),
    index("idx_document_access_log_access_type").on(table.accessType),
  ]
);

/**
 * Document shares table
 * Tracks document sharing (internal and external)
 */
export const documentShares = pgTable(
  "document_shares",
  {
    ...fullFields,

    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),

    // Who shared
    sharedBy: uuid("shared_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),

    // Share target (internal user or external)
    sharedWithUserId: uuid("shared_with_user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    sharedWithEmail: varchar("shared_with_email", { length: 255 }),
    sharedWithPhone: varchar("shared_with_phone", { length: 20 }),

    // Share link (for external)
    shareToken: varchar("share_token", { length: 100 }),
    shareUrl: text("share_url"),

    // Permissions
    canView: boolean("can_view").default(true),
    canDownload: boolean("can_download").default(false),
    canPrint: boolean("can_print").default(false),

    // Expiry
    expiresAt: timestamp("expires_at"),
    maxAccessCount: integer("max_access_count"),
    accessCount: integer("access_count").default(0),

    // Status
    isRevoked: boolean("is_revoked").default(false),
    revokedAt: timestamp("revoked_at"),
    revokedBy: uuid("revoked_by").references(() => users.id, {
      onDelete: "set null",
    }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_document_share_document_id").on(table.documentId),
    index("idx_document_share_shared_by").on(table.sharedBy),
    index("idx_document_share_user_id").on(table.sharedWithUserId),
    uniqueIndex("idx_document_share_token").on(table.shareToken),
    index("idx_document_share_expires").on(table.expiresAt),
    index("idx_document_share_revoked").on(table.isRevoked),
  ]
);

/**
 * Document uploads table
 * Tracks pending presigned URL uploads
 */
export const documentUploads = pgTable(
  "document_uploads",
  {
    ...baseFields,

    // Organization (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    // Upload metadata
    fileName: varchar("file_name", { length: 500 }).notNull(),
    contentType: varchar("content_type", { length: 100 }).notNull(),
    expectedSizeBytes: integer("expected_size_bytes").notNull(),
    storagePath: varchar("storage_path", { length: 1000 }).notNull(),

    // Document type for when confirmed
    documentType: documentTypeEnum("document_type").notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),

    // Optional associations
    patientId: uuid("patient_id").references(() => patients.id, {
      onDelete: "set null",
    }),

    // User-provided metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),

    // Audit
    createdByUserId: uuid("created_by_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    expiresAt: timestamp("expires_at").notNull(),
    confirmedAt: timestamp("confirmed_at"),
  },
  (table) => [
    index("idx_document_upload_org_id").on(table.organizationId),
    index("idx_document_upload_created_by").on(table.createdByUserId),
    index("idx_document_upload_expires").on(table.expiresAt),
    index("idx_document_upload_confirmed").on(table.confirmedAt),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const documentsRelations = relations(documents, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [documents.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [documents.branchId],
    references: [organizations.id],
    relationName: "documentBranch",
  }),
  patient: one(patients, {
    fields: [documents.patientId],
    references: [patients.id],
  }),
  uploadedByUser: one(users, {
    fields: [documents.uploadedBy],
    references: [users.id],
  }),
  versions: many(documentVersions),
  accessLogs: many(documentAccessLogs),
  shares: many(documentShares),
}));

export const documentVersionsRelations = relations(
  documentVersions,
  ({ one }) => ({
    document: one(documents, {
      fields: [documentVersions.documentId],
      references: [documents.id],
    }),
    createdByUser: one(users, {
      fields: [documentVersions.createdByUserId],
      references: [users.id],
    }),
  })
);

export const documentAccessLogsRelations = relations(
  documentAccessLogs,
  ({ one }) => ({
    document: one(documents, {
      fields: [documentAccessLogs.documentId],
      references: [documents.id],
    }),
    user: one(users, {
      fields: [documentAccessLogs.userId],
      references: [users.id],
    }),
  })
);

export const documentSharesRelations = relations(documentShares, ({ one }) => ({
  document: one(documents, {
    fields: [documentShares.documentId],
    references: [documents.id],
  }),
  sharedByUser: one(users, {
    fields: [documentShares.sharedBy],
    references: [users.id],
  }),
  sharedWithUser: one(users, {
    fields: [documentShares.sharedWithUserId],
    references: [users.id],
  }),
}));

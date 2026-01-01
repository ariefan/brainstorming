import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknKelasKamarEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";

// ============================================================================
// JKN APLICARES (BED MANAGEMENT) TABLES
// ============================================================================

/**
 * JKN Aplicares Kamar table
 * Room/bed definitions for hospital capacity management
 *
 * Related API: Aplicares
 * Endpoints: /aplicaresws/rest/bed/create, /aplicaresws/rest/bed/update
 */
export const jknAplicaresKamar = pgTable(
  "jkn_aplicares_kamar",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Room Code & Info
    kodeKamar: varchar("kode_kamar", { length: 20 }).notNull(),
    namaKamar: varchar("nama_kamar", { length: 200 }).notNull(),

    // Room Class
    kelasKamar: jknKelasKamarEnum("kelas_kamar").notNull(),

    // Capacity
    kapasitasTotal: integer("kapasitas_total").notNull(),
    kapasitasPria: integer("kapasitas_pria").default(0),
    kapasitasWanita: integer("kapasitas_wanita").default(0),
    kapasitasPriawanita: integer("kapasitas_priawanita").default(0), // Mixed

    // Description
    keterangan: text("keterangan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_aplicares_kamar_org_id").on(table.organizationId),
    index("idx_jkn_aplicares_kamar_branch_id").on(table.branchId),
    index("idx_jkn_aplicares_kamar_kode").on(table.kodeKamar),
    index("idx_jkn_aplicares_kamar_kelas").on(table.kelasKamar),
    uniqueIndex("uk_jkn_aplicares_kamar_kode_org").on(
      table.kodeKamar,
      table.organizationId
    ),
  ]
);

/**
 * JKN Aplicares Ketersediaan table
 * Real-time bed availability tracking
 *
 * Related API: Aplicares
 */
export const jknAplicaresKetersediaan = pgTable(
  "jkn_aplicares_ketersediaan",
  {
    ...fullFields,

    // Kamar Reference
    kamarId: uuid("kamar_id")
      .notNull()
      .references(() => jknAplicaresKamar.id, { onDelete: "cascade" }),

    // Available Beds
    tersediaPria: integer("tersedia_pria").default(0),
    tersediaWanita: integer("tersedia_wanita").default(0),
    tersediaPriawanita: integer("tersedia_priawanita").default(0),

    // Timestamp
    waktuUpdate: timestamp("waktu_update").defaultNow().notNull(),

    // Status Info
    statusKetersediaan: varchar("status_ketersediaan", { length: 50 }), // available, full, limited
    keterangan: text("keterangan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_aplicares_ketersediaan_kamar_id").on(table.kamarId),
    index("idx_jkn_aplicares_ketersediaan_waktu").on(table.waktuUpdate),
  ]
);

/**
 * JKN Aplicares History table
 * Historical tracking of bed availability changes
 *
 * Related API: Aplicares
 */
export const jknAplicaresHistory = pgTable(
  "jkn_aplicares_history",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Kamar Reference
    kamarId: uuid("kamar_id")
      .notNull()
      .references(() => jknAplicaresKamar.id, { onDelete: "cascade" }),

    // Room Info (denormalized for historical tracking)
    kodeKamar: varchar("kode_kamar", { length: 20 }).notNull(),
    namaKamar: varchar("nama_kamar", { length: 200 }).notNull(),
    kelasKamar: jknKelasKamarEnum("kelas_kamar").notNull(),

    // Availability Snapshot
    tersediaPria: integer("tersedia_pria").default(0),
    tersediaWanita: integer("tersedia_wanita").default(0),
    tersediaPriawanita: integer("tersedia_priawanita").default(0),

    // Timestamp
    waktuSnapshot: timestamp("waktu_snapshot").defaultNow().notNull(),

    // Change Info
    changeType: varchar("change_type", { length: 50 }), // increase, decrease, update
    keterangan: text("keterangan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_aplicares_history_org_id").on(table.organizationId),
    index("idx_jkn_aplicares_history_branch_id").on(table.branchId),
    index("idx_jkn_aplicares_history_kamar_id").on(table.kamarId),
    index("idx_jkn_aplicares_history_waktu").on(table.waktuSnapshot),
    index("idx_jkn_aplicares_history_kode_kamar").on(table.kodeKamar),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknAplicaresKamarRelations = relations(
  jknAplicaresKamar,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknAplicaresKamar.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknAplicaresKamar.branchId],
      references: [organizations.id],
    }),
    ketersediaan: many(jknAplicaresKetersediaan),
    history: many(jknAplicaresHistory),
    createdByUser: one(users, {
      fields: [jknAplicaresKamar.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknAplicaresKamar.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknAplicaresKetersediaanRelations = relations(
  jknAplicaresKetersediaan,
  ({ one }) => ({
    kamar: one(jknAplicaresKamar, {
      fields: [jknAplicaresKetersediaan.kamarId],
      references: [jknAplicaresKamar.id],
    }),
  })
);

export const jknAplicaresHistoryRelations = relations(
  jknAplicaresHistory,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknAplicaresHistory.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknAplicaresHistory.branchId],
      references: [organizations.id],
    }),
    kamar: one(jknAplicaresKamar, {
      fields: [jknAplicaresHistory.kamarId],
      references: [jknAplicaresKamar.id],
    }),
    createdByUser: one(users, {
      fields: [jknAplicaresHistory.createdBy],
      references: [users.id],
    }),
  })
);

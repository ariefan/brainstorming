import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  integer,
  numeric,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknJenisObatEnum,
  jknResepStatusEnum,
  jknTipeObatEnum,
  jknIterasiEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { jknSep } from "./jkn-vclaim";

// ============================================================================
// JKN APOTEK (PHARMACY) TABLES
// ============================================================================

/**
 * JKN Resep (Prescription) table
 * Prescription records for BPJS pharmacy services
 *
 * Related API: Apotek Resep
 * Endpoints: /resep/insert, /resep/delete
 */
export const jknResep = pgTable(
  "jkn_resep",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Patient
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // SEP Reference (if from hospital visit)
    sepId: uuid("sep_id").references(() => jknSep.id, {
      onDelete: "set null",
    }),

    // Prescription Identifiers
    noResep: varchar("no_resep", { length: 30 }).notNull(),
    noApotik: varchar("no_apotik", { length: 30 }), // Pharmacy SEP number
    noSepKunjungan: varchar("no_sep_kunjungan", { length: 30 }), // Visit SEP number

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),

    // Prescription Dates
    tglResep: date("tgl_resep").notNull(),
    tglPelayananResep: date("tgl_pelayanan_resep").notNull(),

    // Doctor & Poly Info
    kdDokter: varchar("kd_dokter", { length: 20 }).notNull(),
    kdPoli: varchar("kd_poli", { length: 10 }).notNull(),

    // Medication Type
    kdJenisObat: jknJenisObatEnum("kd_jenis_obat").notNull(),

    // Refill (Iterasi)
    iterasi: jknIterasiEnum("iterasi").notNull(),

    // Facility Source
    faskesAsal: varchar("faskes_asal", { length: 200 }),

    // Cost Info
    byTagResep: numeric("by_tag_resep", { precision: 15, scale: 2 }), // Tagged cost
    byVerResep: numeric("by_ver_resep", { precision: 15, scale: 2 }), // Verified cost

    // Status & Timeline
    status: jknResepStatusEnum("status").default("created"),
    tglEntry: timestamp("tgl_entry").defaultNow(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_resep_org_id").on(table.organizationId),
    index("idx_jkn_resep_branch_id").on(table.branchId),
    index("idx_jkn_resep_patient_id").on(table.patientId),
    index("idx_jkn_resep_sep_id").on(table.sepId),
    index("idx_jkn_resep_no_resep").on(table.noResep),
    index("idx_jkn_resep_no_apotik").on(table.noApotik),
    index("idx_jkn_resep_tgl_resep").on(table.tglResep),
    index("idx_jkn_resep_status").on(table.status),
    uniqueIndex("uk_jkn_resep_no_resep").on(table.noResep),
  ]
);

/**
 * JKN Resep Obat (Prescription Medication) table
 * Non-compounded medications in prescriptions
 *
 * Related API: Apotek Obat
 * Endpoints: /obat/insert, /obat/update
 */
export const jknResepObat = pgTable(
  "jkn_resep_obat",
  {
    ...fullFields,

    // Resep Reference
    resepId: uuid("resep_id")
      .notNull()
      .references(() => jknResep.id, { onDelete: "cascade" }),

    // Medication Info
    kdObat: varchar("kd_obat", { length: 20 }).notNull(),
    nmObat: varchar("nm_obat", { length: 200 }).notNull(),

    // Dosage Instructions
    signa1: varchar("signa1", { length: 50 }), // Morning dosage
    signa2: varchar("signa2", { length: 50 }), // Afternoon dosage
    jmlObat: integer("jml_obat").notNull(), // Quantity

    // Type
    tipeObat: jknTipeObatEnum("tipe_obat").default("non_racikan"),

    // Cost
    hargaSatuan: numeric("harga_satuan", { precision: 15, scale: 2 }),
    totalHarga: numeric("total_harga", { precision: 15, scale: 2 }),

    // Stock Update Info
    jmlPermintaan: integer("jml_permintaan"), // Requested quantity
    jmlPemberian: integer("jml_pemberian"), // Given quantity

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_resep_obat_resep_id").on(table.resepId),
    index("idx_jkn_resep_obat_kd_obat").on(table.kdObat),
    index("idx_jkn_resep_obat_tipe").on(table.tipeObat),
  ]
);

/**
 * JKN Resep Obat Racikan table
 * Compounded medications in prescriptions
 *
 * Related API: Apotek Obat
 */
export const jknResepObatRacikan = pgTable(
  "jkn_resep_obat_racikan",
  {
    ...fullFields,

    // Resep Reference
    resepId: uuid("resep_id")
      .notNull()
      .references(() => jknResep.id, { onDelete: "cascade" }),

    // Racikan Info
    namaRacikan: varchar("nama_racikan", { length: 200 }).notNull(),
    kdRacikan: varchar("kd_racikan", { length: 20 }),

    // Component Medication
    kdObat: varchar("kd_obat", { length: 20 }).notNull(),
    nmObat: varchar("nm_obat", { length: 200 }).notNull(),

    // Quantity
    jmlObat: integer("jml_obat").notNull(), // Quantity in racikan

    // Dosage for the racikan
    signa1: varchar("signa1", { length: 50 }),
    signa2: varchar("signa2", { length: 50 }),
    jmlRacikan: integer("jml_racikan"), // Number of racikan packages

    // Type
    tipeObat: jknTipeObatEnum("tipe_obat").default("racikan"),

    // Cost
    hargaSatuan: numeric("harga_satuan", { precision: 15, scale: 2 }),
    totalHarga: numeric("total_harga", { precision: 15, scale: 2 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_resep_obat_racikan_resep_id").on(table.resepId),
    index("idx_jkn_resep_obat_racikan_kd_obat").on(table.kdObat),
    index("idx_jkn_resep_obat_racikan_kd_racikan").on(table.kdRacikan),
  ]
);

/**
 * JKN Pelayanan Obat table
 * Medication dispensing service records
 *
 * Related API: Apotek Pelayanan Obat
 * Endpoints: /pelayananobat/insert, /pelayananobat/delete
 */
export const jknPelayananObat = pgTable(
  "jkn_pelayanan_obat",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Resep Reference
    resepId: uuid("resep_id")
      .notNull()
      .references(() => jknResep.id, { onDelete: "cascade" }),

    // Service Info
    noPelayanan: varchar("no_pelayanan", { length: 30 }).notNull(),
    tglPelayanan: date("tgl_pelayanan").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),

    // Pharmacist Info
    kdApoteker: varchar("kd_apoteker", { length: 20 }),
    nmApoteker: varchar("nm_apoteker", { length: 100 }),

    // Cost Info
    totalBiaya: numeric("total_biaya", { precision: 15, scale: 2 }),
    byTagPelayanan: numeric("by_tag_pelayanan", { precision: 15, scale: 2 }),
    byVerPelayanan: numeric("by_ver_pelayanan", { precision: 15, scale: 2 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_pelayanan_obat_org_id").on(table.organizationId),
    index("idx_jkn_pelayanan_obat_branch_id").on(table.branchId),
    index("idx_jkn_pelayanan_obat_resep_id").on(table.resepId),
    index("idx_jkn_pelayanan_obat_no").on(table.noPelayanan),
    index("idx_jkn_pelayanan_obat_tgl").on(table.tglPelayanan),
    uniqueIndex("uk_jkn_pelayanan_obat_no").on(table.noPelayanan),
  ]
);

/**
 * JKN SEP Kunjungan Apotek table
 * SEP numbers from pharmacy visits
 *
 * Related API: Apotek SEP
 */
export const jknSepKunjunganApotek = pgTable(
  "jkn_sep_kunjungan_apotek",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Patient
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // SEP Info
    noSepKunjungan: varchar("no_sep_kunjungan", { length: 30 }).notNull(),
    tglSep: date("tgl_sep").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),

    // Facility
    kdFaskes: varchar("kd_faskes", { length: 20 }).notNull(),
    nmFaskes: varchar("nm_faskes", { length: 200 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_sep_kunjungan_apotek_org_id").on(table.organizationId),
    index("idx_jkn_sep_kunjungan_apotek_branch_id").on(table.branchId),
    index("idx_jkn_sep_kunjungan_apotek_patient_id").on(table.patientId),
    index("idx_jkn_sep_kunjungan_apotek_no_sep").on(table.noSepKunjungan),
    uniqueIndex("uk_jkn_sep_kunjungan_apotek_no_sep").on(
      table.noSepKunjungan
    ),
  ]
);

/**
 * JKN Obat Riwayat table
 * Medication history tracking
 *
 * Related API: Apotek
 */
export const jknObatRiwayat = pgTable(
  "jkn_obat_riwayat",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Patient
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // Resep & Obat References
    resepId: uuid("resep_id").references(() => jknResep.id, {
      onDelete: "set null",
    }),

    // Medication Info
    kdObat: varchar("kd_obat", { length: 20 }).notNull(),
    nmObat: varchar("nm_obat", { length: 200 }).notNull(),

    // Dispensing Info
    tglPemberian: date("tgl_pemberian").notNull(),
    jmlObat: integer("jml_obat").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_obat_riwayat_org_id").on(table.organizationId),
    index("idx_jkn_obat_riwayat_branch_id").on(table.branchId),
    index("idx_jkn_obat_riwayat_patient_id").on(table.patientId),
    index("idx_jkn_obat_riwayat_resep_id").on(table.resepId),
    index("idx_jkn_obat_riwayat_kd_obat").on(table.kdObat),
    index("idx_jkn_obat_riwayat_tgl").on(table.tglPemberian),
  ]
);

/**
 * JKN Apotek Monitoring table
 * Pharmacy claim monitoring and tracking
 *
 * Related API: Apotek Monitoring
 */
export const jknApotekMonitoring = pgTable(
  "jkn_apotek_monitoring",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Resep Reference
    resepId: uuid("resep_id").references(() => jknResep.id, {
      onDelete: "set null",
    }),

    // Monitoring Info
    noResep: varchar("no_resep", { length: 30 }).notNull(),
    tglResep: date("tgl_resep").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),

    // Cost Verification
    byTagResep: numeric("by_tag_resep", { precision: 15, scale: 2 }),
    byVerResep: numeric("by_ver_resep", { precision: 15, scale: 2 }),

    // Status Info
    statusVerifikasi: varchar("status_verifikasi", { length: 50 }),
    keterangan: text("keterangan"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_apotek_monitoring_org_id").on(table.organizationId),
    index("idx_jkn_apotek_monitoring_branch_id").on(table.branchId),
    index("idx_jkn_apotek_monitoring_resep_id").on(table.resepId),
    index("idx_jkn_apotek_monitoring_no_resep").on(table.noResep),
    index("idx_jkn_apotek_monitoring_tgl").on(table.tglResep),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknResepRelations = relations(jknResep, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [jknResep.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknResep.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknResep.patientId],
    references: [patients.id],
  }),
  sep: one(jknSep, {
    fields: [jknResep.sepId],
    references: [jknSep.id],
  }),
  obat: many(jknResepObat),
  obatRacikan: many(jknResepObatRacikan),
  pelayanan: many(jknPelayananObat),
  monitoring: many(jknApotekMonitoring),
  createdByUser: one(users, {
    fields: [jknResep.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknResep.updatedBy],
    references: [users.id],
  }),
}));

export const jknResepObatRelations = relations(jknResepObat, ({ one }) => ({
  resep: one(jknResep, {
    fields: [jknResepObat.resepId],
    references: [jknResep.id],
  }),
}));

export const jknResepObatRacikanRelations = relations(
  jknResepObatRacikan,
  ({ one }) => ({
    resep: one(jknResep, {
      fields: [jknResepObatRacikan.resepId],
      references: [jknResep.id],
    }),
  })
);

export const jknPelayananObatRelations = relations(
  jknPelayananObat,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknPelayananObat.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknPelayananObat.branchId],
      references: [organizations.id],
    }),
    resep: one(jknResep, {
      fields: [jknPelayananObat.resepId],
      references: [jknResep.id],
    }),
    createdByUser: one(users, {
      fields: [jknPelayananObat.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknPelayananObat.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknSepKunjunganApotekRelations = relations(
  jknSepKunjunganApotek,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknSepKunjunganApotek.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknSepKunjunganApotek.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknSepKunjunganApotek.patientId],
      references: [patients.id],
    }),
    createdByUser: one(users, {
      fields: [jknSepKunjunganApotek.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknSepKunjunganApotek.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknObatRiwayatRelations = relations(jknObatRiwayat, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknObatRiwayat.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknObatRiwayat.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknObatRiwayat.patientId],
    references: [patients.id],
  }),
  resep: one(jknResep, {
    fields: [jknObatRiwayat.resepId],
    references: [jknResep.id],
  }),
  createdByUser: one(users, {
    fields: [jknObatRiwayat.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknObatRiwayat.updatedBy],
    references: [users.id],
  }),
}));

export const jknApotekMonitoringRelations = relations(
  jknApotekMonitoring,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknApotekMonitoring.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknApotekMonitoring.branchId],
      references: [organizations.id],
    }),
    resep: one(jknResep, {
      fields: [jknApotekMonitoring.resepId],
      references: [jknResep.id],
    }),
    createdByUser: one(users, {
      fields: [jknApotekMonitoring.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknApotekMonitoring.updatedBy],
      references: [users.id],
    }),
  })
);

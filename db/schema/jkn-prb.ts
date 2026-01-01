import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  integer,
  numeric,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknPrbProgramEnum,
  jknPrbStatusEnum,
  jknIterasiEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { jknSep, jknRujukan } from "./jkn-vclaim";

// ============================================================================
// JKN PRB (PROGRAM RUJUK BALIK) TABLES
// ============================================================================

/**
 * JKN PRB (Program Rujuk Balik) table
 * Chronic disease management program tracking
 *
 * Supports 9 diseases: Diabetes, Hypertension, Asthma, Heart Disease,
 * COPD, Schizophrenia, Stroke, Epilepsy, SLE
 *
 * Related API: VClaim PRB
 * Endpoints: /PRB/Insert, /PRB/Update, /PRB/Delete
 */
export const jknPrb = pgTable(
  "jkn_prb",
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

    // SEP & Rujukan References
    sepId: uuid("sep_id").references(() => jknSep.id, {
      onDelete: "set null",
    }),
    rujukanId: uuid("rujukan_id").references(() => jknRujukan.id, {
      onDelete: "set null",
    }),

    // PRB Program Info
    programPrb: jknPrbProgramEnum("program_prb").notNull(),
    noPrb: varchar("no_prb", { length: 30 }).notNull(),
    tglPrb: date("tgl_prb").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),

    // Clinical Info
    kdDiagnosa: varchar("kd_diagnosa", { length: 20 }).notNull(),
    nmDiagnosa: varchar("nm_diagnosa", { length: 200 }).notNull(),

    // Doctor Info
    kdDokter: varchar("kd_dokter", { length: 20 }).notNull(),
    nmDokter: varchar("nm_dokter", { length: 100 }).notNull(),

    // Validity Period
    tglMulai: date("tgl_mulai").notNull(),
    tglAkhir: date("tgl_akhir").notNull(),

    // Status & Notes
    status: jknPrbStatusEnum("status").default("active"),
    keterangan: text("keterangan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_prb_org_id").on(table.organizationId),
    index("idx_jkn_prb_branch_id").on(table.branchId),
    index("idx_jkn_prb_patient_id").on(table.patientId),
    index("idx_jkn_prb_sep_id").on(table.sepId),
    index("idx_jkn_prb_rujukan_id").on(table.rujukanId),
    index("idx_jkn_prb_no_prb").on(table.noPrb),
    index("idx_jkn_prb_program").on(table.programPrb),
    index("idx_jkn_prb_status").on(table.status),
    index("idx_jkn_prb_tgl_prb").on(table.tglPrb),
    uniqueIndex("uk_jkn_prb_no_prb").on(table.noPrb),
  ]
);

/**
 * JKN PRB Obat table
 * Medications for PRB program participants
 *
 * Related API: VClaim PRB
 * Endpoints: /PRB/Obat/Insert, /PRB/Obat/Delete
 */
export const jknPrbObat = pgTable(
  "jkn_prb_obat",
  {
    ...fullFields,

    // PRB Reference
    prbId: uuid("prb_id")
      .notNull()
      .references(() => jknPrb.id, { onDelete: "cascade" }),

    // Medication Info
    kdObat: varchar("kd_obat", { length: 20 }).notNull(),
    nmObat: varchar("nm_obat", { length: 200 }).notNull(),
    signa1: varchar("signa1", { length: 50 }), // Morning dosage
    signa2: varchar("signa2", { length: 50 }), // Afternoon dosage
    jmlObat: integer("jml_obat").notNull(), // Quantity

    // Refill Info (Iterasi)
    iterasi: jknIterasiEnum("iterasi").notNull(),

    // Prescription Date
    tglResep: date("tgl_resep").notNull(),

    // Tariff Info
    hargaSatuan: numeric("harga_satuan", { precision: 15, scale: 2 }),
    totalHarga: numeric("total_harga", { precision: 15, scale: 2 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_prb_obat_prb_id").on(table.prbId),
    index("idx_jkn_prb_obat_kd_obat").on(table.kdObat),
    index("idx_jkn_prb_obat_iterasi").on(table.iterasi),
    index("idx_jkn_prb_obat_tgl_resep").on(table.tglResep),
  ]
);

/**
 * JKN PRB Riwayat table
 * PRB program history and monitoring
 *
 * Related API: VClaim PRB
 * Endpoints: /PRB/Riwayat
 */
export const jknPrbRiwayat = pgTable(
  "jkn_prb_riwayat",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // PRB Reference
    prbId: uuid("prb_id")
      .notNull()
      .references(() => jknPrb.id, { onDelete: "cascade" }),

    // Patient Info
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),

    // Visit Date
    tglKunjungan: date("tgl_kunjungan").notNull(),

    // Clinical Measurements
    beratBadan: numeric("berat_badan", { precision: 5, scale: 2 }), // Weight in kg
    tinggiBadan: integer("tinggi_badan"), // Height in cm
    tekananDarah: varchar("tekanan_darah", { length: 20 }), // Blood pressure (e.g., "120/80")
    gulaDarah: integer("gula_darah"), // Blood sugar level (mg/dL)

    // Compliance & Outcome
    kepatuhanMinum: varchar("kepatuhan_minum", { length: 50 }), // Medication compliance
    kondisi: varchar("kondisi", { length: 50 }), // Patient condition

    // Doctor & Facility
    kdDokter: varchar("kd_dokter", { length: 20 }),
    nmDokter: varchar("nm_dokter", { length: 100 }),
    kdFaskes: varchar("kd_faskes", { length: 20 }),

    // Notes
    keterangan: text("keterangan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_prb_riwayat_org_id").on(table.organizationId),
    index("idx_jkn_prb_riwayat_branch_id").on(table.branchId),
    index("idx_jkn_prb_riwayat_prb_id").on(table.prbId),
    index("idx_jkn_prb_riwayat_patient_id").on(table.patientId),
    index("idx_jkn_prb_riwayat_no_kartu").on(table.noKartu),
    index("idx_jkn_prb_riwayat_tgl_kunjungan").on(table.tglKunjungan),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknPrbRelations = relations(jknPrb, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [jknPrb.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknPrb.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknPrb.patientId],
    references: [patients.id],
  }),
  sep: one(jknSep, {
    fields: [jknPrb.sepId],
    references: [jknSep.id],
  }),
  rujukan: one(jknRujukan, {
    fields: [jknPrb.rujukanId],
    references: [jknRujukan.id],
  }),
  obat: many(jknPrbObat),
  riwayat: many(jknPrbRiwayat),
  createdByUser: one(users, {
    fields: [jknPrb.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknPrb.updatedBy],
    references: [users.id],
  }),
}));

export const jknPrbObatRelations = relations(jknPrbObat, ({ one }) => ({
  prb: one(jknPrb, {
    fields: [jknPrbObat.prbId],
    references: [jknPrb.id],
  }),
}));

export const jknPrbRiwayatRelations = relations(jknPrbRiwayat, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknPrbRiwayat.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknPrbRiwayat.branchId],
    references: [organizations.id],
  }),
  prb: one(jknPrb, {
    fields: [jknPrbRiwayat.prbId],
    references: [jknPrb.id],
  }),
  patient: one(patients, {
    fields: [jknPrbRiwayat.patientId],
    references: [patients.id],
  }),
  createdByUser: one(users, {
    fields: [jknPrbRiwayat.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknPrbRiwayat.updatedBy],
    references: [users.id],
  }),
}));

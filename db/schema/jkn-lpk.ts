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
  jknLpkTindakLanjutEnum,
  bpjsPelayananEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { encounters } from "./medical";
import { jknSep } from "./jkn-vclaim";

// ============================================================================
// JKN LPK (LEMBAR PENGAJUAN KLAIM) TABLES
// ============================================================================

/**
 * JKN LPK (Lembar Pengajuan Klaim) table
 * Claim submission forms for detailed claim documentation
 *
 * Related API: VClaim LPK
 * Endpoints: /LPK/Insert, /LPK/Update, /LPK/Delete
 */
export const jknLpk = pgTable(
  "jkn_lpk",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Patient & Encounter
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),

    // SEP Reference
    sepId: uuid("sep_id")
      .notNull()
      .references(() => jknSep.id, { onDelete: "cascade" }),

    // LPK Identifier
    noLpk: varchar("no_lpk", { length: 30 }).notNull(),
    tglLpk: date("tgl_lpk").notNull(),

    // SEP Info
    noSep: varchar("no_sep", { length: 30 }).notNull(),
    tglSep: date("tgl_sep").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),

    // Service Type
    jenisPelayanan: bpjsPelayananEnum("jenis_pelayanan").notNull(),

    // Admission/Discharge
    tglMasuk: date("tgl_masuk").notNull(),
    tglPulang: date("tgl_pulang"),

    // Doctor Info
    kdDokter: varchar("kd_dokter", { length: 20 }).notNull(),
    nmDokter: varchar("nm_dokter", { length: 100 }).notNull(),

    // Facility Info
    kdPpk: varchar("kd_ppk", { length: 20 }).notNull(),
    nmPpk: varchar("nm_ppk", { length: 200 }).notNull(),

    // Clinical Summary
    anamnesa: text("anamnesa"), // Patient history
    pemeriksaanFisik: text("pemeriksaan_fisik"), // Physical examination
    pemeriksaanPenunjang: text("pemeriksaan_penunjang"), // Supporting examinations
    terapiPengobatan: text("terapi_pengobatan"), // Treatment given

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_lpk_org_id").on(table.organizationId),
    index("idx_jkn_lpk_branch_id").on(table.branchId),
    index("idx_jkn_lpk_patient_id").on(table.patientId),
    index("idx_jkn_lpk_encounter_id").on(table.encounterId),
    index("idx_jkn_lpk_sep_id").on(table.sepId),
    index("idx_jkn_lpk_no_lpk").on(table.noLpk),
    index("idx_jkn_lpk_no_sep").on(table.noSep),
    index("idx_jkn_lpk_tgl_lpk").on(table.tglLpk),
    uniqueIndex("uk_jkn_lpk_no_lpk").on(table.noLpk),
  ]
);

/**
 * JKN LPK Diagnosa table
 * Diagnoses included in the LPK claim form
 *
 * Related API: VClaim LPK
 */
export const jknLpkDiagnosa = pgTable(
  "jkn_lpk_diagnosa",
  {
    ...fullFields,

    // LPK Reference
    lpkId: uuid("lpk_id")
      .notNull()
      .references(() => jknLpk.id, { onDelete: "cascade" }),

    // Diagnosis Info (ICD-10)
    kodeDiagnosa: varchar("kode_diagnosa", { length: 20 }).notNull(),
    namaDiagnosa: varchar("nama_diagnosa", { length: 200 }).notNull(),

    // Diagnosis Type
    jenisDiagnosa: varchar("jenis_diagnosa", { length: 20 }).notNull(), // Primary/Secondary
    urutan: integer("urutan").default(1), // Order/sequence

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_lpk_diagnosa_lpk_id").on(table.lpkId),
    index("idx_jkn_lpk_diagnosa_kode").on(table.kodeDiagnosa),
    index("idx_jkn_lpk_diagnosa_jenis").on(table.jenisDiagnosa),
  ]
);

/**
 * JKN LPK Procedure table
 * Procedures/actions included in the LPK claim form
 *
 * Related API: VClaim LPK
 */
export const jknLpkProcedure = pgTable(
  "jkn_lpk_procedure",
  {
    ...fullFields,

    // LPK Reference
    lpkId: uuid("lpk_id")
      .notNull()
      .references(() => jknLpk.id, { onDelete: "cascade" }),

    // Procedure Info
    kodeTindakan: varchar("kode_tindakan", { length: 20 }).notNull(),
    namaTindakan: varchar("nama_tindakan", { length: 200 }).notNull(),

    // Execution Info
    tglTindakan: date("tgl_tindakan").notNull(),
    kdDokter: varchar("kd_dokter", { length: 20 }),
    nmDokter: varchar("nm_dokter", { length: 100 }),

    // Tariff Info
    tarif: numeric("tarif", { precision: 15, scale: 2 }),
    qty: integer("qty").default(1),
    total: numeric("total", { precision: 15, scale: 2 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_lpk_procedure_lpk_id").on(table.lpkId),
    index("idx_jkn_lpk_procedure_kode").on(table.kodeTindakan),
    index("idx_jkn_lpk_procedure_tgl").on(table.tglTindakan),
  ]
);

/**
 * JKN LPK Rencana Tindak Lanjut table
 * Follow-up plan tracking for LPK claims
 *
 * Related API: VClaim LPK
 */
export const jknLpkRencanaTindakLanjut = pgTable(
  "jkn_lpk_rencana_tindak_lanjut",
  {
    ...fullFields,

    // LPK Reference
    lpkId: uuid("lpk_id")
      .notNull()
      .references(() => jknLpk.id, { onDelete: "cascade" }),

    // Follow-up Plan Type
    tindakLanjut: jknLpkTindakLanjutEnum("tindak_lanjut").notNull(),

    // Details based on type
    keterangan: text("keterangan"), // Detailed description

    // If referred
    kdFaskesRujuk: varchar("kd_faskes_rujuk", { length: 20 }), // Referral facility code
    nmFaskesRujuk: varchar("nm_faskes_rujuk", { length: 200 }), // Referral facility name

    // If control back
    tglKontrol: date("tgl_kontrol"), // Control date
    kdPoliKontrol: varchar("kd_poli_kontrol", { length: 10 }), // Control poly
    kdDokterKontrol: varchar("kd_dokter_kontrol", { length: 20 }), // Control doctor

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_lpk_tindak_lanjut_lpk_id").on(table.lpkId),
    index("idx_jkn_lpk_tindak_lanjut_type").on(table.tindakLanjut),
    index("idx_jkn_lpk_tindak_lanjut_tgl_kontrol").on(table.tglKontrol),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknLpkRelations = relations(jknLpk, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [jknLpk.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknLpk.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknLpk.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [jknLpk.encounterId],
    references: [encounters.id],
  }),
  sep: one(jknSep, {
    fields: [jknLpk.sepId],
    references: [jknSep.id],
  }),
  diagnosa: many(jknLpkDiagnosa),
  procedure: many(jknLpkProcedure),
  rencanaTindakLanjut: many(jknLpkRencanaTindakLanjut),
  createdByUser: one(users, {
    fields: [jknLpk.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknLpk.updatedBy],
    references: [users.id],
  }),
}));

export const jknLpkDiagnosaRelations = relations(jknLpkDiagnosa, ({ one }) => ({
  lpk: one(jknLpk, {
    fields: [jknLpkDiagnosa.lpkId],
    references: [jknLpk.id],
  }),
}));

export const jknLpkProcedureRelations = relations(
  jknLpkProcedure,
  ({ one }) => ({
    lpk: one(jknLpk, {
      fields: [jknLpkProcedure.lpkId],
      references: [jknLpk.id],
    }),
  })
);

export const jknLpkRencanaTindakLanjutRelations = relations(
  jknLpkRencanaTindakLanjut,
  ({ one }) => ({
    lpk: one(jknLpk, {
      fields: [jknLpkRencanaTindakLanjut.lpkId],
      references: [jknLpk.id],
    }),
  })
);

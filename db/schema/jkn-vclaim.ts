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
  bpjsPelayananEnum,
  bpjsInacbgKelasRawatEnum,
  bpjsAsalRujukanEnum,
  bpjsRujukanTipeRujukanEnum,
  bpjsTujuanKunjEnum,
  bpjsLakaLantasEnum,
  bpjsPembiayaanEnum,
  bpjsSepStatusEnum,
  bpjsSeverityLevelEnum,
  bpjsJenisKunjunganEnum,
  bpjsRujukanAsalRujukanEnum,
  bpjsRujukanPoliRujukanEnum,
  bpjsRujukanStatusEnum,
  bpjsInacbgStatusEnum,
  bpjsInacbgKelTypeEnum,
  bpjsInacbgCaraMasukEnum,
  bpjsInacbgTipeRawatEnum,
  bpjsMonitoringStatusEnum,
  bpjsMonitoringJenisKlaimEnum,
  bpjsPesertaStatusEnum,
  fullFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { encounters } from "./medical";

// ============================================================================
// JKN VCLAIM - SEP (SURAT ELIGIBILITAS PESERTA) TABLES
// ============================================================================

/**
 * JKN SEP (Surat Eligibilitas Peserta) table
 * Authorization letter for BPJS healthcare services
 *
 * Related API: VClaim SEP
 * Endpoints: /SEP/insert, /SEP/update, /SEP/delete
 */
export const jknSep = pgTable(
  "jkn_sep",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Patient & Encounter
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),

    // SEP Identifiers
    noSep: varchar("no_sep", { length: 30 }).notNull(),
    tglSep: date("tgl_sep").notNull(),

    // Rujukan (Referral) Info
    tglRujukan: date("tgl_rujukan"),
    noRujukan: varchar("no_rujukan", { length: 30 }),
    ppkRujukan: varchar("ppk_rujukan", { length: 20 }).notNull(),

    // Service Info
    ppkPelayanan: varchar("ppk_pelayanan", { length: 20 }).notNull(),
    jenisPelayanan: bpjsPelayananEnum("jenis_pelayanan").notNull(),
    kelasRawat: bpjsInacbgKelasRawatEnum("kelas_rawat").notNull(),

    // Patient Demographics
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),
    tglLahir: date("tgl_lahir").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),

    // Clinical Info
    diagnosaAwal: varchar("diagnosa_awal", { length: 20 }).notNull(),
    faskesAsalRujukan: varchar("faskes_asal_rujukan", { length: 100 }),
    asalRujukan: bpjsAsalRujukanEnum("asal_rujukan"),
    tipeRujukan: bpjsRujukanTipeRujukanEnum("tipe_rujukan"),
    poliTujuan: varchar("poli_tujuan", { length: 20 }),
    kdpoli: varchar("kdpoli", { length: 10 }),
    tujuanKunj: bpjsTujuanKunjEnum("tujuan_kunj"),

    // Accident Info
    lakaLantas: bpjsLakaLantasEnum("laka_lantas"),
    pembiayaan: bpjsPembiayaanEnum("pembiayaan"),
    penjamin: varchar("penjamin", { length: 50 }),

    // Notes & Status
    catatan: text("catatan"),
    status: bpjsSepStatusEnum("status").default("created"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_sep_org_id").on(table.organizationId),
    index("idx_jkn_sep_branch_id").on(table.branchId),
    index("idx_jkn_sep_patient_id").on(table.patientId),
    index("idx_jkn_sep_encounter_id").on(table.encounterId),
    index("idx_jkn_sep_no_sep").on(table.noSep),
    index("idx_jkn_sep_no_rujukan").on(table.noRujukan),
    index("idx_jkn_sep_tgl_sep").on(table.tglSep),
    index("idx_jkn_sep_nik").on(table.nik),
    index("idx_jkn_sep_status").on(table.status),
    uniqueIndex("uk_jkn_sep_no_sep").on(table.noSep),
  ]
);

/**
 * JKN SEP Diagnosa table
 * Diagnosis codes associated with SEP
 *
 * Related API: VClaim SEP
 */
export const jknSepDiagnosa = pgTable(
  "jkn_sep_diagnosa",
  {
    ...fullFields,

    // SEP Reference
    sepId: uuid("sep_id")
      .notNull()
      .references(() => jknSep.id, { onDelete: "cascade" }),

    // Diagnosis Info (ICD-10)
    kodeDiagnosa: varchar("kode_diagnosa", { length: 20 }).notNull(),
    namaDiagnosa: varchar("nama_diagnosa", { length: 100 }).notNull(),
    level: bpjsSeverityLevelEnum("level"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_sep_diagnosa_sep_id").on(table.sepId),
    index("idx_jkn_sep_diagnosa_kode").on(table.kodeDiagnosa),
  ]
);

/**
 * JKN SEP Procedure table
 * Medical procedures associated with SEP
 *
 * Related API: VClaim SEP
 */
export const jknSepProcedure = pgTable(
  "jkn_sep_procedure",
  {
    ...fullFields,

    // SEP Reference
    sepId: uuid("sep_id")
      .notNull()
      .references(() => jknSep.id, { onDelete: "cascade" }),

    // Procedure Info
    kodeTindakan: varchar("kode_tindakan", { length: 20 }).notNull(),
    namaTindakan: varchar("nama_tindakan", { length: 100 }).notNull(),
    tarif: numeric("tarif", { precision: 15, scale: 2 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_sep_procedure_sep_id").on(table.sepId),
    index("idx_jkn_sep_procedure_kode").on(table.kodeTindakan),
  ]
);

// ============================================================================
// JKN VCLAIM - RUJUKAN (REFERRAL) TABLES
// ============================================================================

/**
 * JKN Rujukan (Referral) table
 * Referrals from primary care to specialist care
 *
 * Related API: VClaim Rujukan
 * Endpoints: /Rujukan/insert, /Rujukan/update, /Rujukan/delete
 */
export const jknRujukan = pgTable(
  "jkn_rujukan",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Patient
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // Rujukan Identifiers
    noRujukan: varchar("no_rujukan", { length: 30 }).notNull(),
    tglRujukan: date("tgl_rujukan").notNull(),

    // Rujukan Type & Source
    asalRujukan: bpjsRujukanAsalRujukanEnum("asal_rujukan").notNull(),
    tipeRujukan: bpjsRujukanTipeRujukanEnum("tipe_rujukan").notNull(),
    poliRujukan: bpjsRujukanPoliRujukanEnum("poli_rujukan").notNull(),

    // Facilities
    faskesPerujuk: varchar("faskes_perujuk", { length: 100 }).notNull(),
    faskesTujuan: varchar("faskes_tujuan", { length: 100 }).notNull(),
    ppkRujukan: varchar("ppk_rujukan", { length: 20 }).notNull(),

    // Clinical Info
    diagnosa: varchar("diagnosa", { length: 100 }).notNull(),
    keluhan: text("keluhan"),

    // Status & Validity
    status: bpjsRujukanStatusEnum("status").default("active"),
    tglBerlaku: date("tgl_berlaku"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_rujukan_org_id").on(table.organizationId),
    index("idx_jkn_rujukan_branch_id").on(table.branchId),
    index("idx_jkn_rujukan_patient_id").on(table.patientId),
    index("idx_jkn_rujukan_no_rujukan").on(table.noRujukan),
    index("idx_jkn_rujukan_tgl_rujukan").on(table.tglRujukan),
    index("idx_jkn_rujukan_status").on(table.status),
    uniqueIndex("uk_jkn_rujukan_no_rujukan").on(table.noRujukan),
  ]
);

/**
 * JKN Rujukan Peserta (Referral Participant) table
 * Family members included in referral
 *
 * Related API: VClaim Rujukan
 */
export const jknRujukanPeserta = pgTable(
  "jkn_rujukan_peserta",
  {
    ...fullFields,

    // Rujukan Reference
    rujukanId: uuid("rujukan_id")
      .notNull()
      .references(() => jknRujukan.id, { onDelete: "cascade" }),

    // Participant Demographics
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),
    tglLahir: date("tgl_lahir").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),
    noKartu: varchar("no_kartu", { length: 20 }),
    hubungan: varchar("hubungan", { length: 50 }),
    alamat: text("alamat"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_rujukan_peserta_rujukan_id").on(table.rujukanId),
    index("idx_jkn_rujukan_peserta_nik").on(table.nik),
  ]
);

// ============================================================================
// JKN VCLAIM - PESERTA (PARTICIPANT) TABLE
// ============================================================================

/**
 * JKN Peserta (BPJS Participant) table
 * Patient BPJS membership and insurance data
 *
 * Related API: VClaim Peserta
 * Endpoints: /Peserta/NoKartu, /Peserta/NIK
 */
export const jknPeserta = pgTable(
  "jkn_peserta",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Patient Reference
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // Participant Identifiers
    nik: varchar("nik", { length: 16 }).notNull(),
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),

    // Demographics
    nama: varchar("nama", { length: 100 }).notNull(),
    tglLahir: date("tgl_lahir").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),
    mr: varchar("mr", { length: 20 }),

    // Age Calculations
    umur: integer("umur"),
    umurTahun: integer("umur_tahun"),
    umurBulan: integer("umur_bulan"),
    umurHari: integer("umur_hari"),

    // Insurance Status
    status: bpjsPesertaStatusEnum("status").default("active"),
    faskes: varchar("faskes", { length: 100 }),

    // Card Info
    tglCetakKartu: date("tgl_cetak_kartu"),
    tglTAT: date("tgl_tat"), // Tanggal Akhir Tidak Berlaku
    tglTMT: date("tgl_tmt"), // Tanggal Mulai Berlaku

    // Insurance Class & Type
    hakKelas: varchar("hak_kelas", { length: 20 }),
    jenisPeserta: varchar("jenis_peserta", { length: 50 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_peserta_org_id").on(table.organizationId),
    index("idx_jkn_peserta_branch_id").on(table.branchId),
    index("idx_jkn_peserta_patient_id").on(table.patientId),
    index("idx_jkn_peserta_nik").on(table.nik),
    index("idx_jkn_peserta_no_kartu").on(table.noKartu),
    index("idx_jkn_peserta_status").on(table.status),
    uniqueIndex("uk_jkn_peserta_nik").on(table.nik),
  ]
);

// ============================================================================
// JKN VCLAIM - KUNJUNGAN (VISIT) TABLE
// ============================================================================

/**
 * JKN Kunjungan (Visit) table
 * Patient visit outcome data
 *
 * Related API: VClaim Monitoring
 */
export const jknKunjungan = pgTable(
  "jkn_kunjungan",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Patient
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // Patient Identifiers
    nomorkartu: varchar("nomorkartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    notelp: varchar("notelp", { length: 20 }).notNull(),
    norm: varchar("norm", { length: 20 }).notNull(),

    // Visit Info
    tanggalperiksa: date("tanggalperiksa").notNull(),
    jeniskunjungan: bpjsJenisKunjunganEnum("jeniskunjungan").notNull(),

    // Service Class
    kelasrawat: varchar("kelasrawat", { length: 20 }),
    statuskunjungan: varchar("statuskunjungan", { length: 20 }).default("Baru"),

    // Discharge Info
    statuspulang: varchar("statuspulang", { length: 20 }),
    statuspulangsebab: varchar("statuspulangsebab", { length: 50 }),
    carakeluar: varchar("carakeluar", { length: 20 }),
    penyebabkematian: varchar("penyebabkematian", { length: 50 }),
    kondisipulang: varchar("kondisipulang", { length: 20 }),
    tglpulang: date("tglpulang"),

    // Class Changes
    klsrawat: varchar("klsrawat", { length: 20 }),
    klsrawatnaik: varchar("klsrawatnaik", { length: 20 }),
    klsrawatturun: varchar("klsrawatturun", { length: 20 }),

    // Additional Info
    emas: varchar("emas", { length: 20 }),
    losminggu: integer("losminggu"), // Length of Stay in weeks
  },
  (table) => [
    index("idx_jkn_kunjungan_org_id").on(table.organizationId),
    index("idx_jkn_kunjungan_branch_id").on(table.branchId),
    index("idx_jkn_kunjungan_patient_id").on(table.patientId),
    index("idx_jkn_kunjungan_nomorkartu").on(table.nomorkartu),
    index("idx_jkn_kunjungan_nik").on(table.nik),
    index("idx_jkn_kunjungan_tanggal").on(table.tanggalperiksa),
    index("idx_jkn_kunjungan_status").on(table.statuskunjungan),
  ]
);

// ============================================================================
// JKN VCLAIM - INACBG (CLAIM) TABLES
// ============================================================================

/**
 * JKN INACBG (Claim) table
 * Claims data using INA-CBG grouping system
 *
 * Related API: VClaim Monitoring
 */
export const jknInacbg = pgTable(
  "jkn_inacbg",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
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
    sepId: uuid("sep_id").references(() => jknSep.id, {
      onDelete: "set null",
    }),

    // Claim Identifier
    noKlaim: varchar("no_klaim", { length: 30 }).notNull(),

    // Admission/Discharge Dates
    tglMasuk: date("tgl_masuk").notNull(),
    tglPulang: date("tgl_pulang"),

    // Service Type & Class
    jenisRawat: bpjsInacbgTipeRawatEnum("jenis_rawat").notNull(),
    kelasRawat: bpjsInacbgKelasRawatEnum("kelas_rawat").notNull(),
    caraMasuk: bpjsInacbgCaraMasukEnum("cara_masuk").notNull(),

    // Clinical Measurements
    los: integer("los"), // Length of Stay (days)
    bb: integer("bb"), // Berat Badan (weight) in kg
    tb: integer("tb"), // Tinggi Badan (height) in cm

    // Doctor & Tariff
    dpjp: varchar("dpjp", { length: 20 }),
    kelType: bpjsInacbgKelTypeEnum("kel_type"),
    spri: varchar("spri", { length: 20 }),
    kdTarif: varchar("kd_tarif", { length: 20 }),

    // Costs
    tarifPoliEks: numeric("tarif_poli_eks", { precision: 15, scale: 2 }),
    biayaTambahan: numeric("biaya_tambahan", { precision: 15, scale: 2 }),
    totalBiaya: numeric("total_biaya", { precision: 15, scale: 2 }),

    // Status & Notes
    status: bpjsInacbgStatusEnum("status").default("pending"),
    catatan: text("catatan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_inacbg_org_id").on(table.organizationId),
    index("idx_jkn_inacbg_branch_id").on(table.branchId),
    index("idx_jkn_inacbg_patient_id").on(table.patientId),
    index("idx_jkn_inacbg_encounter_id").on(table.encounterId),
    index("idx_jkn_inacbg_sep_id").on(table.sepId),
    index("idx_jkn_inacbg_no_klaim").on(table.noKlaim),
    index("idx_jkn_inacbg_tgl_masuk").on(table.tglMasuk),
    index("idx_jkn_inacbg_status").on(table.status),
    uniqueIndex("uk_jkn_inacbg_no_klaim").on(table.noKlaim),
  ]
);

/**
 * JKN INACBG Procedure table
 * Procedures included in the claim
 *
 * Related API: VClaim Monitoring
 */
export const jknInacbgProcedure = pgTable(
  "jkn_inacbg_procedure",
  {
    ...fullFields,

    // INACBG Reference
    inacbgId: uuid("inacbg_id")
      .notNull()
      .references(() => jknInacbg.id, { onDelete: "cascade" }),

    // Procedure Info
    kodeTindakan: varchar("kode_tindakan", { length: 20 }).notNull(),
    namaTindakan: varchar("nama_tindakan", { length: 100 }).notNull(),
    tarif: numeric("tarif", { precision: 15, scale: 2 }),
    qty: integer("qty").default(1),
    total: numeric("total", { precision: 15, scale: 2 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_inacbg_procedure_inacbg_id").on(table.inacbgId),
    index("idx_jkn_inacbg_procedure_kode").on(table.kodeTindakan),
  ]
);

/**
 * JKN INACBG Obat (Medication) table
 * Medications included in the claim
 *
 * Related API: VClaim Monitoring
 */
export const jknInacbgObat = pgTable(
  "jkn_inacbg_obat",
  {
    ...fullFields,

    // INACBG Reference
    inacbgId: uuid("inacbg_id")
      .notNull()
      .references(() => jknInacbg.id, { onDelete: "cascade" }),

    // Medication Info
    kodeObat: varchar("kode_obat", { length: 20 }).notNull(),
    namaObat: varchar("nama_obat", { length: 100 }).notNull(),
    signa: varchar("signa", { length: 50 }), // Dosage instructions
    tarif: numeric("tarif", { precision: 15, scale: 2 }),
    qty: integer("qty").default(1),
    total: numeric("total", { precision: 15, scale: 2 }),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_inacbg_obat_inacbg_id").on(table.inacbgId),
    index("idx_jkn_inacbg_obat_kode").on(table.kodeObat),
  ]
);

// ============================================================================
// JKN VCLAIM - MONITORING KLAIM TABLE
// ============================================================================

/**
 * JKN Monitoring Klaim table
 * Claim monitoring and status tracking
 *
 * Related API: VClaim Monitoring
 * Endpoints: /Monitoring/Klaim/Tanggal
 */
export const jknMonitoringKlaim = pgTable(
  "jkn_monitoring_klaim",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Patient
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // References
    inacbgId: uuid("inacbg_id").references(() => jknInacbg.id, {
      onDelete: "set null",
    }),
    sepId: uuid("sep_id").references(() => jknSep.id, {
      onDelete: "set null",
    }),

    // SEP Info
    noSep: varchar("no_sep", { length: 30 }).notNull(),
    tglSep: date("tgl_sep").notNull(),

    // Claim Type & Status
    jenisKlaim: bpjsMonitoringJenisKlaimEnum("jenis_klaim").notNull(),
    status: bpjsMonitoringStatusEnum("status").default("pending"),

    // Notes
    catatan: text("catatan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_monitoring_klaim_org_id").on(table.organizationId),
    index("idx_jkn_monitoring_klaim_branch_id").on(table.branchId),
    index("idx_jkn_monitoring_klaim_patient_id").on(table.patientId),
    index("idx_jkn_monitoring_klaim_inacbg_id").on(table.inacbgId),
    index("idx_jkn_monitoring_klaim_sep_id").on(table.sepId),
    index("idx_jkn_monitoring_klaim_no_sep").on(table.noSep),
    index("idx_jkn_monitoring_klaim_tgl_sep").on(table.tglSep),
    index("idx_jkn_monitoring_klaim_status").on(table.status),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknSepRelations = relations(jknSep, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [jknSep.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknSep.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknSep.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [jknSep.encounterId],
    references: [encounters.id],
  }),
  diagnosa: many(jknSepDiagnosa),
  procedure: many(jknSepProcedure),
  inacbg: many(jknInacbg),
  createdByUser: one(users, {
    fields: [jknSep.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknSep.updatedBy],
    references: [users.id],
  }),
}));

export const jknSepDiagnosaRelations = relations(
  jknSepDiagnosa,
  ({ one }) => ({
    sep: one(jknSep, {
      fields: [jknSepDiagnosa.sepId],
      references: [jknSep.id],
    }),
  })
);

export const jknSepProcedureRelations = relations(
  jknSepProcedure,
  ({ one }) => ({
    sep: one(jknSep, {
      fields: [jknSepProcedure.sepId],
      references: [jknSep.id],
    }),
  })
);

export const jknRujukanRelations = relations(jknRujukan, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [jknRujukan.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknRujukan.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknRujukan.patientId],
    references: [patients.id],
  }),
  peserta: many(jknRujukanPeserta),
  createdByUser: one(users, {
    fields: [jknRujukan.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknRujukan.updatedBy],
    references: [users.id],
  }),
}));

export const jknRujukanPesertaRelations = relations(
  jknRujukanPeserta,
  ({ one }) => ({
    rujukan: one(jknRujukan, {
      fields: [jknRujukanPeserta.rujukanId],
      references: [jknRujukan.id],
    }),
  })
);

export const jknPesertaRelations = relations(jknPeserta, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknPeserta.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknPeserta.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknPeserta.patientId],
    references: [patients.id],
  }),
  createdByUser: one(users, {
    fields: [jknPeserta.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknPeserta.updatedBy],
    references: [users.id],
  }),
}));

export const jknKunjunganRelations = relations(jknKunjungan, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknKunjungan.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknKunjungan.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknKunjungan.patientId],
    references: [patients.id],
  }),
  createdByUser: one(users, {
    fields: [jknKunjungan.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknKunjungan.updatedBy],
    references: [users.id],
  }),
}));

export const jknInacbgRelations = relations(jknInacbg, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [jknInacbg.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknInacbg.branchId],
    references: [organizations.id],
  }),
  patient: one(patients, {
    fields: [jknInacbg.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [jknInacbg.encounterId],
    references: [encounters.id],
  }),
  sep: one(jknSep, {
    fields: [jknInacbg.sepId],
    references: [jknSep.id],
  }),
  procedure: many(jknInacbgProcedure),
  obat: many(jknInacbgObat),
  monitoring: many(jknMonitoringKlaim),
  createdByUser: one(users, {
    fields: [jknInacbg.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknInacbg.updatedBy],
    references: [users.id],
  }),
}));

export const jknInacbgProcedureRelations = relations(
  jknInacbgProcedure,
  ({ one }) => ({
    inacbg: one(jknInacbg, {
      fields: [jknInacbgProcedure.inacbgId],
      references: [jknInacbg.id],
    }),
  })
);

export const jknInacbgObatRelations = relations(jknInacbgObat, ({ one }) => ({
  inacbg: one(jknInacbg, {
    fields: [jknInacbgObat.inacbgId],
    references: [jknInacbg.id],
  }),
}));

export const jknMonitoringKlaimRelations = relations(
  jknMonitoringKlaim,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknMonitoringKlaim.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknMonitoringKlaim.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknMonitoringKlaim.patientId],
      references: [patients.id],
    }),
    inacbg: one(jknInacbg, {
      fields: [jknMonitoringKlaim.inacbgId],
      references: [jknInacbg.id],
    }),
    sep: one(jknSep, {
      fields: [jknMonitoringKlaim.sepId],
      references: [jknSep.id],
    }),
    createdByUser: one(users, {
      fields: [jknMonitoringKlaim.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknMonitoringKlaim.updatedBy],
      references: [users.id],
    }),
  })
);

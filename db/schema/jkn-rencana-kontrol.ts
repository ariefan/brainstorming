import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknJenisKontrolEnum,
  jknSuratKontrolStatusEnum,
  jknPrbProgramEnum,
  fullFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { jknSep } from "./jkn-vclaim";
import { jknPrb } from "./jkn-prb";

// ============================================================================
// JKN RENCANA KONTROL (CONTROL PLAN) TABLES
// ============================================================================

/**
 * JKN Surat Kontrol (Control Plan Letter) table
 * Follow-up control plan letters for outpatient and inpatient referrals
 *
 * Types:
 * - Type 1: SPRI (Surat Pengantar Rawat Inap) - Inpatient referral letter
 * - Type 2: Surat Kontrol - Outpatient follow-up control letter
 *
 * Related API: VClaim Rencana Kontrol
 * Endpoints: /RencanaKontrol/insert, /RencanaKontrol/update
 */
export const jknSuratKontrol = pgTable(
  "jkn_surat_kontrol",
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

    // SEP Reference (source SEP that generated this control plan)
    sepId: uuid("sep_id").references(() => jknSep.id, {
      onDelete: "set null",
    }),

    // PRB Reference (if this is a PRB control plan)
    prbId: uuid("prb_id").references(() => jknPrb.id, {
      onDelete: "set null",
    }),

    // Control Letter Info
    noSuratKontrol: varchar("no_surat_kontrol", { length: 30 }).notNull(),
    jenisKontrol: jknJenisKontrolEnum("jenis_kontrol").notNull(),
    tglRencanaKontrol: date("tgl_rencana_kontrol").notNull(),
    tglSuratKontrol: date("tgl_surat_kontrol").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),

    // Source SEP Info
    noSepAsal: varchar("no_sep_asal", { length: 30 }),
    tglSep: date("tgl_sep"),

    // Clinic/Poly & Doctor Info
    kdPoli: varchar("kd_poli", { length: 10 }).notNull(),
    nmPoli: varchar("nm_poli", { length: 100 }).notNull(),
    kdDokter: varchar("kd_dokter", { length: 20 }).notNull(),
    nmDokter: varchar("nm_dokter", { length: 100 }).notNull(),

    // Facility Info
    kdFaskes: varchar("kd_faskes", { length: 20 }).notNull(),
    nmFaskes: varchar("nm_faskes", { length: 200 }).notNull(),

    // Status & Usage Tracking
    status: jknSuratKontrolStatusEnum("status").default("created"),
    noSepBaru: varchar("no_sep_baru", { length: 30 }), // SEP created from this control plan
    tglSepBaru: date("tgl_sep_baru"), // Date when SEP was created from this

    // Notes
    keterangan: text("keterangan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_surat_kontrol_org_id").on(table.organizationId),
    index("idx_jkn_surat_kontrol_branch_id").on(table.branchId),
    index("idx_jkn_surat_kontrol_patient_id").on(table.patientId),
    index("idx_jkn_surat_kontrol_sep_id").on(table.sepId),
    index("idx_jkn_surat_kontrol_prb_id").on(table.prbId),
    index("idx_jkn_surat_kontrol_no").on(table.noSuratKontrol),
    index("idx_jkn_surat_kontrol_jenis").on(table.jenisKontrol),
    index("idx_jkn_surat_kontrol_tgl_rencana").on(table.tglRencanaKontrol),
    index("idx_jkn_surat_kontrol_status").on(table.status),
    uniqueIndex("uk_jkn_surat_kontrol_no").on(table.noSuratKontrol),
  ]
);

/**
 * JKN Surat Kontrol Form PRB table
 * PRB-specific form data for control plans
 *
 * Contains 42 dynamic fields specific to each PRB disease program
 * Stored as JSONB for flexibility as field requirements vary by disease
 *
 * Related API: VClaim Rencana Kontrol
 */
export const jknSuratKontrolFormPrb = pgTable(
  "jkn_surat_kontrol_form_prb",
  {
    ...fullFields,

    // Control Letter Reference
    suratKontrolId: uuid("surat_kontrol_id")
      .notNull()
      .references(() => jknSuratKontrol.id, { onDelete: "cascade" }),

    // PRB Program
    programPrb: jknPrbProgramEnum("program_prb").notNull(),

    // Dynamic Form Fields (42 fields vary by disease)
    // Stored as JSONB for flexibility
    formData: jsonb("form_data").$type<{
      // Common fields across all diseases
      beratBadan?: number; // Weight (kg)
      tinggiBadan?: number; // Height (cm)
      imt?: number; // BMI
      tekananDarahSistolik?: number; // Systolic BP
      tekananDarahDiastolik?: number; // Diastolic BP
      detakNadi?: number; // Pulse rate
      frekuensiNafas?: number; // Respiratory rate
      suhu?: number; // Temperature (Celsius)

      // Disease-specific fields (examples, actual fields vary)
      // Diabetes:
      gulaDarahPuasa?: number; // Fasting blood sugar
      gulaDarahSewaktu?: number; // Random blood sugar
      hba1c?: number; // HbA1c level
      kolesterolTotal?: number; // Total cholesterol
      kolesterolLDL?: number; // LDL cholesterol
      kolesterolHDL?: number; // HDL cholesterol
      trigliserida?: number; // Triglycerides

      // Hypertension:
      proteinUrin?: string; // Protein in urine
      kreatininSerum?: number; // Serum creatinine
      asam_urat?: number; // Uric acid

      // Asthma/COPD:
      peakFlow?: number; // Peak expiratory flow
      saturasi_oksigen?: number; // Oxygen saturation

      // Mental Health (Schizophrenia):
      psikotropika?: string; // Psychotropic medications
      terapi_electroconvulsive?: boolean; // ECT therapy

      // Additional disease-specific fields
      [key: string]: any;
    }>(),

    // Clinical Notes
    keluhan: text("keluhan"), // Patient complaints
    pemeriksaanFisik: text("pemeriksaan_fisik"), // Physical examination
    diagnosis: text("diagnosis"), // Diagnosis
    tatalaksana: text("tatalaksana"), // Treatment plan
    edukasi: text("edukasi"), // Patient education

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_surat_kontrol_form_prb_surat_id").on(
      table.suratKontrolId
    ),
    index("idx_jkn_surat_kontrol_form_prb_program").on(table.programPrb),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknSuratKontrolRelations = relations(
  jknSuratKontrol,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknSuratKontrol.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknSuratKontrol.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknSuratKontrol.patientId],
      references: [patients.id],
    }),
    sep: one(jknSep, {
      fields: [jknSuratKontrol.sepId],
      references: [jknSep.id],
    }),
    prb: one(jknPrb, {
      fields: [jknSuratKontrol.prbId],
      references: [jknPrb.id],
    }),
    formPrb: many(jknSuratKontrolFormPrb),
    createdByUser: one(users, {
      fields: [jknSuratKontrol.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknSuratKontrol.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknSuratKontrolFormPrbRelations = relations(
  jknSuratKontrolFormPrb,
  ({ one }) => ({
    suratKontrol: one(jknSuratKontrol, {
      fields: [jknSuratKontrolFormPrb.suratKontrolId],
      references: [jknSuratKontrol.id],
    }),
  })
);

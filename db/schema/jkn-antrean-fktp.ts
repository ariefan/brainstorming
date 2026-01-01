import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  jknAntreanFktpStatusEnum,
  fullFields,
} from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";
import { patients } from "./patients";

// ============================================================================
// JKN ANTREAN FKTP (PRIMARY CARE QUEUE) TABLES
// ============================================================================

/**
 * JKN Antrean FKTP table
 * Queue bookings for primary healthcare facilities
 *
 * FKTP = Fasilitas Kesehatan Tingkat Pertama
 * (Primary Healthcare Facilities - Puskesmas/Clinics)
 *
 * Related API: Antrean FKTP
 * Endpoints: /antrean/add, /antrean/update, /antrean/cancel, /antrean/batal
 */
export const jknAntreanFktp = pgTable(
  "jkn_antrean_fktp",
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

    // Queue Identifier
    kodeBooking: varchar("kode_booking", { length: 20 }).notNull(),
    nomorAntrean: varchar("nomor_antrean", { length: 10 }),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),
    noTelp: varchar("no_telp", { length: 20 }).notNull(),

    // Appointment Info
    tanggalPeriksa: date("tanggal_periksa").notNull(),
    jamPeriksa: varchar("jam_periksa", { length: 10 }), // HH:mm format

    // Clinic & Doctor
    kdPoli: varchar("kd_poli", { length: 10 }).notNull(),
    nmPoli: varchar("nm_poli", { length: 100 }).notNull(),
    kdDokter: varchar("kd_dokter", { length: 20 }),
    nmDokter: varchar("nm_dokter", { length: 100 }),

    // Status & Timeline
    status: jknAntreanFktpStatusEnum("status").default("created"),
    waktuCheckIn: timestamp("waktu_check_in"),
    waktuDilayani: timestamp("waktu_dilayani"),
    waktuSelesai: timestamp("waktu_selesai"),

    // Facility Info
    kdFaskes: varchar("kd_faskes", { length: 20 }).notNull(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_antrean_fktp_org_id").on(table.organizationId),
    index("idx_jkn_antrean_fktp_branch_id").on(table.branchId),
    index("idx_jkn_antrean_fktp_patient_id").on(table.patientId),
    index("idx_jkn_antrean_fktp_kode_booking").on(table.kodeBooking),
    index("idx_jkn_antrean_fktp_no_kartu").on(table.noKartu),
    index("idx_jkn_antrean_fktp_tanggal").on(table.tanggalPeriksa),
    index("idx_jkn_antrean_fktp_status").on(table.status),
  ]
);

/**
 * JKN Antrean FKTP Status Log table
 * Status update tracking for FKTP queue
 *
 * Related API: Antrean FKTP
 */
export const jknAntreanFktpStatusLog = pgTable(
  "jkn_antrean_fktp_status_log",
  {
    ...fullFields,

    // Antrean Reference
    antreanId: uuid("antrean_id")
      .notNull()
      .references(() => jknAntreanFktp.id, { onDelete: "cascade" }),

    // Status Change
    statusLama: jknAntreanFktpStatusEnum("status_lama").notNull(),
    statusBaru: jknAntreanFktpStatusEnum("status_baru").notNull(),

    // Timestamp
    waktuUpdate: timestamp("waktu_update").defaultNow().notNull(),

    // Additional Info
    keterangan: text("keterangan"),
    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_antrean_fktp_status_log_antrean_id").on(table.antreanId),
    index("idx_jkn_antrean_fktp_status_log_waktu").on(table.waktuUpdate),
  ]
);

/**
 * JKN PCare Bridging table
 * Mapping between PCare codes and local facility codes
 *
 * Related API: PCare
 */
export const jknPcareBridging = pgTable(
  "jkn_pcare_bridging",
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

    // PCare Facility Codes
    kdPpkPcare: varchar("kd_ppk_pcare", { length: 20 }).notNull(),
    kdPpkBpjs: varchar("kd_ppk_bpjs", { length: 20 }).notNull(),

    // Registration Date
    tglDaftar: date("tgl_daftar").notNull(),

    // Patient Info
    noKartu: varchar("no_kartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 100 }).notNull(),
    tglLahir: date("tgl_lahir").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),

    // Visit Info
    poli: varchar("poli", { length: 20 }).notNull(),
    kdDokter: varchar("kd_dokter", { length: 20 }).notNull(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_pcare_bridging_org_id").on(table.organizationId),
    index("idx_jkn_pcare_bridging_branch_id").on(table.branchId),
    index("idx_jkn_pcare_bridging_patient_id").on(table.patientId),
    index("idx_jkn_pcare_bridging_nik").on(table.nik),
    index("idx_jkn_pcare_bridging_tgl_daftar").on(table.tglDaftar),
  ]
);

/**
 * JKN PCare Reference table
 * Cached reference data from PCare API
 *
 * Related API: PCare
 */
export const jknPcareReference = pgTable(
  "jkn_pcare_reference",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Reference Type
    refType: varchar("ref_type", { length: 50 }).notNull(), // poli, dokter, obat, etc.

    // Reference Code & Name
    refCode: varchar("ref_code", { length: 20 }).notNull(),
    refName: varchar("ref_name", { length: 200 }).notNull(),

    // Additional Data (stored as text for flexibility)
    refData: text("ref_data"),

    // Last Sync
    lastSync: timestamp("last_sync").defaultNow(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_pcare_reference_org_id").on(table.organizationId),
    index("idx_jkn_pcare_reference_branch_id").on(table.branchId),
    index("idx_jkn_pcare_reference_type").on(table.refType),
    index("idx_jkn_pcare_reference_code").on(table.refCode),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknAntreanFktpRelations = relations(
  jknAntreanFktp,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknAntreanFktp.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknAntreanFktp.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknAntreanFktp.patientId],
      references: [patients.id],
    }),
    statusHistory: many(jknAntreanFktpStatusLog),
    createdByUser: one(users, {
      fields: [jknAntreanFktp.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknAntreanFktp.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknAntreanFktpStatusLogRelations = relations(
  jknAntreanFktpStatusLog,
  ({ one }) => ({
    antrean: one(jknAntreanFktp, {
      fields: [jknAntreanFktpStatusLog.antreanId],
      references: [jknAntreanFktp.id],
    }),
  })
);

export const jknPcareBridgingRelations = relations(
  jknPcareBridging,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknPcareBridging.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknPcareBridging.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknPcareBridging.patientId],
      references: [patients.id],
    }),
    createdByUser: one(users, {
      fields: [jknPcareBridging.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknPcareBridging.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknPcareReferenceRelations = relations(
  jknPcareReference,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknPcareReference.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknPcareReference.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknPcareReference.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknPcareReference.updatedBy],
      references: [users.id],
    }),
  })
);

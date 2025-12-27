import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  bpjsAntreanStatusEnum,
  fullFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";

// ============================================================================
// JKN ANTREAN (QUEUE) TABLES - SECONDARY CARE (FKRTL)
// ============================================================================

/**
 * JKN Antrean FKRTL table
 * Queue bookings for secondary/tertiary healthcare facilities
 *
 * FKRTL = Fasilitas Kesehatan Rujukan Tingkat Lanjut
 * (Secondary/Tertiary Healthcare Facilities - Hospitals/Specialists)
 *
 * Related API: Antrean
 * Endpoints: /antrean/add, /antrean/update, /antrean/cancel
 */
export const jknAntreanFkrtl = pgTable(
  "jkn_antrean_fkrtl",
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

    // Queue Identifier
    kodeBooking: varchar("kode_booking", { length: 20 }).notNull(),

    // Patient Type & Info
    jenispasien: varchar("jenispasien", { length: 20 }).notNull(), // New/Old patient
    nomorkartu: varchar("nomorkartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nohp: varchar("nohp", { length: 20 }).notNull(),

    // Clinic/Poly Info
    kodepoli: varchar("kodepoli", { length: 10 }).notNull(),
    namapoli: varchar("namapoli", { length: 100 }).notNull(),

    // Patient Status
    pasienbaru: integer("pasienbaru").notNull(), // 0=Old, 1=New
    norm: varchar("norm", { length: 20 }).notNull(), // Medical record number

    // Appointment Date
    tanggalperiksa: date("tanggalperiksa").notNull(),

    // Doctor Info
    kodeDokter: varchar("kode_dokter", { length: 20 }).notNull(),
    namadokter: varchar("namadokter", { length: 100 }).notNull(),
    jampraktek: varchar("jampraktek", { length: 20 }).notNull(),

    // Visit Type
    jeniskunjungan: integer("jeniskunjungan").notNull(), // 1=Rujukan FKTP, 2=Rujukan Internal, 3=Kontrol, 4=Rujukan Antar RS

    // Queue Status
    status: bpjsAntreanStatusEnum("status").default("booked"),
    estimasiDilayani: varchar("estimasi_dilayani", { length: 20 }),

    // Payment Method
    caraBayar: varchar("cara_bayar", { length: 50 }).notNull(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_antrean_fkrtl_org_id").on(table.organizationId),
    index("idx_jkn_antrean_fkrtl_branch_id").on(table.branchId),
    index("idx_jkn_antrean_fkrtl_patient_id").on(table.patientId),
    index("idx_jkn_antrean_fkrtl_kode_booking").on(table.kodeBooking),
    index("idx_jkn_antrean_fkrtl_nomorkartu").on(table.nomorkartu),
    index("idx_jkn_antrean_fkrtl_nik").on(table.nik),
    index("idx_jkn_antrean_fkrtl_tanggal").on(table.tanggalperiksa),
    index("idx_jkn_antrean_fkrtl_status").on(table.status),
  ]
);

/**
 * JKN Antrean Faskes table
 * Healthcare facility master data for queue management
 *
 * Related API: Antrean
 */
export const jknAntreanFaskes = pgTable(
  "jkn_antrean_faskes",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Facility Info
    kdPpk: varchar("kd_ppk", { length: 20 }).notNull(),
    nmPpk: varchar("nm_ppk", { length: 100 }).notNull(),

    // Location
    alamat: text("alamat"),
    kota: varchar("kota", { length: 50 }),
    provinsi: varchar("provinsi", { length: 50 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_antrean_faskes_org_id").on(table.organizationId),
    index("idx_jkn_antrean_faskes_branch_id").on(table.branchId),
    index("idx_jkn_antrean_faskes_kd_ppk").on(table.kdPpk),
  ]
);

/**
 * JKN Antrean Poli table
 * Polyclinic/clinic data within facilities
 *
 * Related API: Antrean
 */
export const jknAntreanPoli = pgTable(
  "jkn_antrean_poli",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Facility Reference
    faskesId: uuid("faskes_id")
      .notNull()
      .references(() => jknAntreanFaskes.id, { onDelete: "cascade" }),

    // Poly Info
    kdPoli: varchar("kd_poli", { length: 10 }).notNull(),
    nmPoli: varchar("nm_poli", { length: 100 }).notNull(),

    // Capacity
    kapasitas: integer("kapasitas"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_antrean_poli_org_id").on(table.organizationId),
    index("idx_jkn_antrean_poli_branch_id").on(table.branchId),
    index("idx_jkn_antrean_poli_faskes_id").on(table.faskesId),
    index("idx_jkn_antrean_poli_kd_poli").on(table.kdPoli),
  ]
);

/**
 * JKN Antrean Dokter table
 * Doctor schedule data within polyclinics
 *
 * Related API: Antrean
 */
export const jknAntreanDokter = pgTable(
  "jkn_antrean_dokter",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Poly Reference
    poliId: uuid("poli_id")
      .notNull()
      .references(() => jknAntreanPoli.id, { onDelete: "cascade" }),

    // Doctor Info
    kdDokter: varchar("kd_dokter", { length: 20 }).notNull(),
    nmDokter: varchar("nm_dokter", { length: 100 }).notNull(),

    // Schedule
    jamPraktek: varchar("jam_praktek", { length: 20 }),
    kapasitas: integer("kapasitas"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_antrean_dokter_org_id").on(table.organizationId),
    index("idx_jkn_antrean_dokter_branch_id").on(table.branchId),
    index("idx_jkn_antrean_dokter_poli_id").on(table.poliId),
    index("idx_jkn_antrean_dokter_kd_dokter").on(table.kdDokter),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknAntreanFkrtlRelations = relations(
  jknAntreanFkrtl,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknAntreanFkrtl.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknAntreanFkrtl.branchId],
      references: [organizations.id],
    }),
    patient: one(patients, {
      fields: [jknAntreanFkrtl.patientId],
      references: [patients.id],
    }),
    createdByUser: one(users, {
      fields: [jknAntreanFkrtl.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknAntreanFkrtl.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknAntreanFaskesRelations = relations(
  jknAntreanFaskes,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknAntreanFaskes.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknAntreanFaskes.branchId],
      references: [organizations.id],
    }),
    poli: many(jknAntreanPoli),
    createdByUser: one(users, {
      fields: [jknAntreanFaskes.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknAntreanFaskes.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknAntreanPoliRelations = relations(
  jknAntreanPoli,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [jknAntreanPoli.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknAntreanPoli.branchId],
      references: [organizations.id],
    }),
    faskes: one(jknAntreanFaskes, {
      fields: [jknAntreanPoli.faskesId],
      references: [jknAntreanFaskes.id],
    }),
    dokter: many(jknAntreanDokter),
    createdByUser: one(users, {
      fields: [jknAntreanPoli.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknAntreanPoli.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknAntreanDokterRelations = relations(
  jknAntreanDokter,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknAntreanDokter.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknAntreanDokter.branchId],
      references: [organizations.id],
    }),
    poli: one(jknAntreanPoli, {
      fields: [jknAntreanDokter.poliId],
      references: [jknAntreanPoli.id],
    }),
    createdByUser: one(users, {
      fields: [jknAntreanDokter.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknAntreanDokter.updatedBy],
      references: [users.id],
    }),
  })
);

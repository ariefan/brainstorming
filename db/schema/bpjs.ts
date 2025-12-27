import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  bpjsEnvironmentEnum,
  bpjsAntreanStatusEnum,
  bpjsJenisKunjunganEnum,
  bpjsJenisRawatEnum,
  BsonResource,
  fullFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";

// ============================================================================
// BPJS KESEHATAN INTEGRATION TABLES
// ============================================================================

/**
 * BPJS configs table
 * Represents BPJS Kesehatan configuration
 */
export const bpjsConfigs = pgTable(
  "bpjs_configs",
  {
    ...fullFields,

    // Config fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    environment: bpjsEnvironmentEnum("environment").notNull(),
    consId: varchar("cons_id", { length: 50 }).notNull(),
    secretKey: varchar("secret_key", { length: 255 }).notNull(),
    userKey: varchar("user_key", { length: 255 }),
    ppkPelayanan: varchar("ppk_pelayanan", { length: 20 }).notNull(),
    ppkBpjs: varchar("ppk_bpjs", { length: 20 }).notNull(),
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
  },
  (table) => [
    index("idx_bpjs_config_org_id").on(table.organizationId),
    index("idx_bpjs_config_branch_id").on(table.branchId),
    index("idx_bpjs_config_active").on(table.isActive),
  ]
);

/**
 * BPJS antrean (queue) table
 * Represents BPJS antrean (queue) data
 */
export const bpjsAntrean = pgTable(
  "bpjs_antrean",
  {
    ...fullFields,

    // Antrean fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    kodeBooking: varchar("kode_booking", { length: 20 }).notNull(),
    jenispasien: varchar("jenispasien", { length: 20 }).notNull(),
    nomorkartu: varchar("nomorkartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nohp: varchar("nohp", { length: 20 }).notNull(),
    kodepoli: varchar("kodepoli", { length: 10 }).notNull(),
    namapoli: varchar("namapoli", { length: 100 }).notNull(),
    pasienbaru: integer("pasienbaru").notNull(),
    norm: varchar("norm", { length: 20 }).notNull(),
    tanggalperiksa: date("tanggalperiksa").notNull(),
    kodeDokter: varchar("kode_dokter", { length: 20 }).notNull(),
    namadokter: varchar("namadokter", { length: 100 }).notNull(),
    jampraktek: varchar("jampraktek", { length: 20 }).notNull(),
    jeniskunjungan: integer("jeniskunjungan").notNull(),
    status: bpjsAntreanStatusEnum("status").default("booked"),
    estimasiDilayani: varchar("estimasi_dilayani", { length: 20 }),
    caraBayar: varchar("cara_bayar", { length: 50 }).notNull(),
    notes: text("notes"),
  },
  (table) => [
    index("idx_bpjs_antrean_org_id").on(table.organizationId),
    index("idx_bpjs_antrean_branch_id").on(table.branchId),
    index("idx_bpjs_antrean_patient_id").on(table.patientId),
    index("idx_bpjs_antrean_kode_booking").on(table.kodeBooking),
    index("idx_bpjs_antrean_nomorkartu").on(table.nomorkartu),
    index("idx_bpjs_antrean_nik").on(table.nik),
    index("idx_bpjs_antrean_tanggal").on(table.tanggalperiksa),
    index("idx_bpjs_antrean_status").on(table.status),
  ]
);

/**
 * BPJS kunjungan (visit) table
 * Represents BPJS kunjungan (visit) data
 */
export const bpjsKunjungan = pgTable(
  "bpjs_kunjungan",
  {
    ...fullFields,

    // Kunjungan fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    nomorkartu: varchar("nomorkartu", { length: 20 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    notelp: varchar("notelp", { length: 20 }).notNull(),
    norm: varchar("norm", { length: 20 }).notNull(),
    tanggalperiksa: date("tanggalperiksa").notNull(),
    jeniskunjungan: bpjsJenisKunjunganEnum("jeniskunjungan").notNull(),
    kelasrawat: varchar("kelasrawat", { length: 20 }),
    statuskunjungan: varchar("statuskunjungan", { length: 20 }).default("Baru"),
    statuspulang: varchar("statuspulang", { length: 20 }),
    statuspulangsebab: varchar("statuspulangsebab", { length: 50 }),
    carakeluar: varchar("carakeluar", { length: 20 }),
    penyebabkematian: varchar("penyebabkematian", { length: 50 }),
    kondisipulang: varchar("kondisipulang", { length: 20 }),
    tglpulang: date("tglpulang"),
    klsrawat: varchar("klsrawat", { length: 20 }),
    klsrawatnaik: varchar("klsrawatnaik", { length: 20 }),
    klsrawatturun: varchar("klsrawatturun", { length: 20 }),
    emas: varchar("emas", { length: 20 }),
    losminggu: integer("losminggu"),
  },
  (table) => [
    index("idx_bpjs_kunjungan_org_id").on(table.organizationId),
    index("idx_bpjs_kunjungan_branch_id").on(table.branchId),
    index("idx_bpjs_kunjungan_patient_id").on(table.patientId),
    index("idx_bpjs_kunjungan_nomorkartu").on(table.nomorkartu),
    index("idx_bpjs_kunjungan_nik").on(table.nik),
    index("idx_bpjs_kunjungan_tanggal").on(table.tanggalperiksa),
    index("idx_bpjs_kunjungan_status").on(table.statuskunjungan),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const bpjsConfigsRelations = relations(bpjsConfigs, ({ many }) => ({
  antrean: many(bpjsAntrean),
  kunjungan: many(bpjsKunjungan),
}));

export const bpjsAntreanRelations = relations(bpjsAntrean, ({ one }) => ({
  config: one(bpjsConfigs, {
    fields: [bpjsAntrean.organizationId, bpjsAntrean.branchId],
    references: [bpjsConfigs.organizationId, bpjsConfigs.branchId],
  }),
  patient: one(patients, {
    fields: [bpjsAntrean.patientId],
    references: [patients.id],
  }),
}));

export const bpjsKunjunganRelations = relations(bpjsKunjungan, ({ one }) => ({
  config: one(bpjsConfigs, {
    fields: [bpjsKunjungan.organizationId, bpjsKunjungan.branchId],
    references: [bpjsConfigs.organizationId, bpjsConfigs.branchId],
  }),
  patient: one(patients, {
    fields: [bpjsKunjungan.patientId],
    references: [patients.id],
  }),
}));

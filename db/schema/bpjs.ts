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
  bpjsFacilityTypeEnum,
  bpjsEnvironmentEnum,
  bpjsHealthStatusEnum,
  bpjsPelayananEnum,
  bpjsAsalRujukanEnum,
  bpjsTipeRujukanEnum,
  bpjsPembiayaanEnum,
  bpjsLakaLantasEnum,
  bpjsTujuanKunjEnum,
  bpjsRujukanStatusEnum,
  bpjsAntreanStatusEnum,
  bpjsJenisKunjunganEnum,
  bpjsInacbgStatusEnum,
  bpjsVerificationStatusEnum,
  bpjsSepStatusEnum,
  bpjsSeverityLevelEnum,
  bpjsJenisRawatEnum,
  BsonResource,
} from "./core";
import { organizations } from "./organization";
import { patients } from "./patients";
import { users } from "./users";
import { encounters } from "./medical";
import { admissions } from "./inpatient";

// ============================================================================
// BPJS KESEHATAN INTEGRATION TABLES
// ============================================================================

/**
 * BPJS configurations table
 * Stores BPJS API credentials and configuration
 */
export const bpjsConfigs = pgTable(
  "bpjs_configs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Configuration fields
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    consId: varchar("cons_id", { length: 50 }).notNull(), // Encrypted at application level
    secretKey: varchar("secret_key", { length: 255 }).notNull(), // Encrypted at application level
    vclaimUserKey: varchar("vclaim_user_key", { length: 100 }).notNull(), // Encrypted at application level
    pcareUserKey: varchar("pcare_user_key", { length: 100 }), // Encrypted at application level
    antreanUserKey: varchar("antrean_user_key", { length: 100 }), // Encrypted at application level
    pcareUsername: varchar("pcare_username", { length: 100 }), // Encrypted at application level
    pcarePassword: varchar("pcare_password", { length: 255 }), // Encrypted at application level
    pcareAppCode: varchar("pcare_app_code", { length: 20 }),
    ppkCode: varchar("ppk_code", { length: 20 }).notNull(),
    ppkName: varchar("ppk_name", { length: 255 }).notNull(),
    facilityType: bpjsFacilityTypeEnum("facility_type").notNull(),
    environment: bpjsEnvironmentEnum("environment")
      .notNull()
      .default("development"),
    isActive: boolean("is_active").default(true),
    lastHealthCheck: timestamp("last_health_check"),
    healthStatus: bpjsHealthStatusEnum("health_status")
      .notNull()
      .default("healthy"),
  },
  (table) => [
    index("idx_bpjs_config_org").on(table.organizationId),
    uniqueIndex("idx_bpjs_config_org_unique").on(table.organizationId),
  ]
);

/**
 * BPJS Peserta (participant) table
 * Stores BPJS participant/eligibility data
 */
export const bpjsPeserta = pgTable(
  "bpjs_peserta",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Peserta fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    noKartu: varchar("no_kartu", { length: 13 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    nama: varchar("nama", { length: 255 }).notNull(),
    statusPesertaCode: varchar("status_peserta_code", { length: 5 }).notNull(),
    statusPesertaKeterangan: varchar("status_peserta_keterangan", {
      length: 100,
    }),
    jenisPesertaCode: varchar("jenis_peserta_code", { length: 5 }).notNull(),
    jenisPesertaKeterangan: varchar("jenis_peserta_keterangan", {
      length: 100,
    }),
    hakKelas: varchar("hak_kelas", { length: 5 }).notNull(), // 1, 2, 3
    tglLahir: date("tgl_lahir").notNull(),
    tglTmt: date("tgl_tmt"),
    tglTat: date("tgl_tat"),
    provUmumCode: varchar("prov_umum_code", { length: 20 }),
    provUmumName: varchar("prov_umum_name", { length: 255 }),
    cobNamaAsuransi: varchar("cob_nama_asuransi", { length: 255 }),
    cobNoAsuransi: varchar("cob_no_asuransi", { length: 50 }),
    lastCheckedAt: timestamp("last_checked_at").notNull(),
    lastCheckResponse: jsonb("last_check_response").$type<
      Record<string, any>
    >(),
  },
  (table) => [
    index("idx_peserta_patient").on(table.patientId),
    index("idx_peserta_kartu").on(table.noKartu),
    index("idx_peserta_nik").on(table.nik),
  ]
);

/**
 * BPJS SEP (Surat Eligibilitas Peserta) table
 * Stores SEP records
 */
export const bpjsSep = pgTable(
  "bpjs_sep",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // SEP fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    admissionId: uuid("admission_id").references(() => admissions.id, {
      onDelete: "set null",
    }),
    noSep: varchar("no_sep", { length: 30 }).notNull().unique(),
    tglSep: date("tgl_sep").notNull(),
    noKartu: varchar("no_kartu", { length: 13 }).notNull(),
    jnsPelayanan: bpjsPelayananEnum("jns_pelayanan").notNull(),
    ppkPelayanan: varchar("ppk_pelayanan", { length: 20 }).notNull(),
    ppkPelayananNama: varchar("ppk_pelayanan_nama", { length: 255 }),
    klsRawatHak: varchar("kls_rawat_hak", { length: 5 }).notNull(), // 1, 2, 3
    klsRawatNaik: varchar("kls_rawat_naik", { length: 5 }), // 1, 2, 3
    pembiayaan: bpjsPembiayaanEnum("pembiayaan").notNull(), // 1, 2, 3
    penanggungJawab: varchar("penanggung_jawab", { length: 255 }),
    noMr: varchar("no_mr", { length: 30 }),
    asalRujukan: bpjsAsalRujukanEnum("asal_rujukan"), // fktp, fkrtl
    noRujukan: varchar("no_rujukan", { length: 50 }),
    tglRujukan: date("tgl_rujukan"),
    ppkRujukan: varchar("ppk_rujukan", { length: 20 }),
    diagAwal: varchar("diag_awal", { length: 10 }).notNull(),
    poliTujuan: varchar("poli_tujuan", { length: 10 }).notNull(),
    poliEksekutif: boolean("poli_eksekutif").default(false),
    tujuanKunj: bpjsTujuanKunjEnum("tujuan_kunj").notNull().default("normal"), // 0=normal, 1=prosedur, 2=konsul_dokter
    lakaLantas: bpjsLakaLantasEnum("laka_lantas").notNull().default("bukan"), // 0=bukan, 1=kll, 2=kk, 3=kll_kk
    dpjpLayan: varchar("dpjp_layan", { length: 20 }).notNull(),
    dpjpNama: varchar("dpjp_nama", { length: 255 }),
    penjamin: varchar("penjamin", { length: 50 }),
    hasCob: boolean("has_cob").default(false),
    isKatarak: boolean("is_katarak").default(false),
    status: bpjsSepStatusEnum("status").notNull().default("created"),
    createdByUser: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    apiResponse: jsonb("api_response").$type<Record<string, any>>(),
  },
  (table) => [
    uniqueIndex("idx_sep_no").on(table.noSep),
    index("idx_sep_patient").on(table.patientId),
    index("idx_sep_encounter").on(table.encounterId),
    index("idx_sep_admission").on(table.admissionId),
    index("idx_sep_date").on(table.tglSep),
    index("idx_sep_status").on(table.status),
  ]
);

/**
 * BPJS Rujukan table
 * Stores referral records
 */
export const bpjsRujukan = pgTable(
  "bpjs_rujukan",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Rujukan fields
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    noRujukan: varchar("no_rujukan", { length: 50 }).notNull(),
    tglRujukan: date("tgl_rujukan").notNull(),
    tglRencanaKunjungan: date("tgl_rencana_kunjungan"),
    tipeRujukan: bpjsTipeRujukanEnum("tipe_rujukan").notNull(), // 0, 1, 2
    jnsPelayanan: bpjsPelayananEnum("jns_pelayanan").notNull(),
    ppkAsal: varchar("ppk_asal", { length: 20 }).notNull(),
    ppkAsalNama: varchar("ppk_asal_nama", { length: 255 }).notNull(),
    ppkDirujuk: varchar("ppk_dirujuk", { length: 20 }).notNull(),
    ppkDirujukNama: varchar("ppk_dirujuk_nama", { length: 255 }).notNull(),
    poliRujukan: varchar("poli_rujukan", { length: 10 }),
    diagRujukan: varchar("diag_rujukan", { length: 10 }).notNull(),
    catatan: text("catatan"),
    masaBerlaku: date("masa_berlaku").notNull(),
    jumlahKunj: integer("jumlah_kunj").default(0),
    sisaKunj: integer("sisa_kunj").default(3),
    status: bpjsRujukanStatusEnum("status").notNull().default("active"),
    createdByUser: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    apiResponse: jsonb("api_response").$type<Record<string, any>>(),
  },
  (table) => [
    index("idx_rujukan_no").on(table.noRujukan),
    index("idx_rujukan_patient").on(table.patientId),
    index("idx_rujukan_encounter").on(table.encounterId),
    index("idx_rujukan_status").on(table.status),
    index("idx_rujukan_valid").on(table.masaBerlaku),
  ]
);

/**
 * BPJS Antrean (queue) table
 * Stores Mobile JKN queue bookings
 */
export const bpjsAntrean = pgTable(
  "bpjs_antrean",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // Antrean fields
    patientId: uuid("patient_id").references(() => patients.id, {
      onDelete: "set null",
    }),
    encounterId: uuid("encounter_id").references(() => encounters.id, {
      onDelete: "set null",
    }),
    kodeBooking: varchar("kode_booking", { length: 30 }).notNull().unique(),
    tanggalPeriksa: date("tanggal_periksa").notNull(),
    nomorAntrean: varchar("nomor_antrean", { length: 10 }).notNull(),
    angkaAntrean: integer("angka_antrean").notNull(),
    noKartu: varchar("no_kartu", { length: 13 }).notNull(),
    nik: varchar("nik", { length: 16 }).notNull(),
    noHp: varchar("no_hp", { length: 20 }),
    norm: varchar("norm", { length: 30 }),
    kodePoli: varchar("kode_poli", { length: 10 }).notNull(),
    namaPoli: varchar("nama_poli", { length: 100 }).notNull(),
    kodeDokter: varchar("kode_dokter", { length: 20 }),
    namaDokter: varchar("nama_dokter", { length: 255 }),
    jamPraktek: varchar("jam_praktek", { length: 20 }),
    jenisKunjungan: bpjsJenisKunjunganEnum("jenis_kunjungan").notNull(), // 1, 2, 3, 4
    nomorReferensi: varchar("nomor_referensi", { length: 50 }),
    estimasiDilayani: varchar("estimasi_dilayani", { length: 20 }),
    kuotaJkn: integer("kuota_jkn").notNull(),
    sisaKuotaJkn: integer("sisa_kuota_jkn").notNull(),
    kuotaNonJkn: integer("kuota_non_jkn").notNull(),
    sisaKuotaNonJkn: integer("sisa_kuota_non_jkn").notNull(),
    status: bpjsAntreanStatusEnum("status").notNull().default("booked"),
    // Task timestamps
    waktuTask1: timestamp("waktu_task_1"), // Check-in
    waktuTask2: timestamp("waktu_task_2"), // Admisi done
    waktuTask3: timestamp("waktu_task_3"), // Poli waiting
    waktuTask4: timestamp("waktu_task_4"), // Doctor start
    waktuTask5: timestamp("waktu_task_5"), // Doctor done
    waktuTask6: timestamp("waktu_task_6"), // Pharmacy start
    waktuTask7: timestamp("waktu_task_7"), // Complete
  },
  (table) => [
    uniqueIndex("idx_antrean_booking").on(table.kodeBooking),
    index("idx_antrean_patient").on(table.patientId),
    index("idx_antrean_encounter").on(table.encounterId),
    index("idx_antrean_date").on(table.tanggalPeriksa),
    index("idx_antrean_status").on(table.status),
  ]
);

/**
 * BPJS INA-CBG claims table
 * Stores inpatient claim records
 */
export const bpjsInacbgClaims = pgTable(
  "bpjs_inacbg_claims",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedAt: timestamp("deleted_at"),
    deletedBy: uuid("deleted_by"),

    // BSON resource storage
    resource: jsonb("resource").$type<BsonResource>(),

    // INA-CBG claim fields
    admissionId: uuid("admission_id")
      .notNull()
      .references(() => admissions.id, { onDelete: "cascade" }),
    sepId: uuid("sep_id").references(() => bpjsSep.id, {
      onDelete: "set null",
    }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    noSep: varchar("no_sep", { length: 30 }).notNull(),
    noKartu: varchar("no_kartu", { length: 13 }).notNull(),
    tglMasuk: date("tgl_masuk").notNull(),
    tglPulang: date("tgl_pulang"),
    jenisRawat: bpjsJenisRawatEnum("jenis_rawat").notNull(),
    kelasRawat: varchar("kelas_rawat", { length: 5 }).notNull(), // 1, 2, 3
    icuIndicator: boolean("icu_indicator").default(false),
    icuLos: integer("icu_los").default(0),
    ventilatorHour: integer("ventilator_hour").default(0),
    diagnosaPrimer: varchar("diagnosa_primer", { length: 10 }).notNull(),
    diagnosaSekunder: jsonb("diagnosa_sekunder").$type<
      Array<{
        code: string;
        name: string;
      }>
    >(),
    procedurePrimer: varchar("procedure_primer", { length: 10 }),
    procedureSekunder: jsonb("procedure_sekunder").$type<
      Array<{
        code: string;
        name: string;
      }>
    >(),
    inacbgCode: varchar("inacbg_code", { length: 20 }),
    inacbgDescription: varchar("inacbg_description", { length: 255 }),
    severityLevel: bpjsSeverityLevelEnum("severity_level"), // I, II, III
    tarifInacbg: varchar("tarif_inacbg", { length: 20 }),
    tarifRs: varchar("tarif_rs", { length: 20 }),
    tarifFinal: varchar("tarif_final", { length: 20 }),
    satusehatEncounterId: varchar("satusehat_encounter_id", { length: 100 }),
    satusehatClaimId: varchar("satusehat_claim_id", { length: 100 }),
    grouperStatus: bpjsInacbgStatusEnum("grouper_status")
      .notNull()
      .default("pending"),
    groupedAt: timestamp("grouped_at"),
    submittedAt: timestamp("submitted_at"),
    verificationStatus: bpjsVerificationStatusEnum("verification_status"),
    verifiedAmount: varchar("verified_amount", { length: 20 }),
    rejectionReason: text("rejection_reason"),
    apiResponse: jsonb("api_response").$type<Record<string, any>>(),
  },
  (table) => [
    index("idx_claim_admission").on(table.admissionId),
    index("idx_claim_sep").on(table.sepId),
    index("idx_claim_no_sep").on(table.noSep),
    index("idx_claim_status").on(table.grouperStatus),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const bpjsConfigsRelations = relations(bpjsConfigs, ({ one }) => ({
  organization: one(organizations, {
    fields: [bpjsConfigs.organizationId],
    references: [organizations.id],
  }),
}));

export const bpjsPesertaRelations = relations(bpjsPeserta, ({ one }) => ({
  patient: one(patients, {
    fields: [bpjsPeserta.patientId],
    references: [patients.id],
  }),
}));

export const bpjsSepRelations = relations(bpjsSep, ({ one }) => ({
  patient: one(patients, {
    fields: [bpjsSep.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [bpjsSep.encounterId],
    references: [encounters.id],
  }),
  admission: one(admissions, {
    fields: [bpjsSep.admissionId],
    references: [admissions.id],
  }),
  createdByUser: one(users, {
    fields: [bpjsSep.createdByUser],
    references: [users.id],
  }),
}));

export const bpjsRujukanRelations = relations(bpjsRujukan, ({ one }) => ({
  patient: one(patients, {
    fields: [bpjsRujukan.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [bpjsRujukan.encounterId],
    references: [encounters.id],
  }),
  createdByUser: one(users, {
    fields: [bpjsRujukan.createdByUser],
    references: [users.id],
  }),
}));

export const bpjsAntreanRelations = relations(bpjsAntrean, ({ one }) => ({
  patient: one(patients, {
    fields: [bpjsAntrean.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [bpjsAntrean.encounterId],
    references: [encounters.id],
  }),
}));

export const bpjsInacbgClaimsRelations = relations(
  bpjsInacbgClaims,
  ({ one }) => ({
    admission: one(admissions, {
      fields: [bpjsInacbgClaims.admissionId],
      references: [admissions.id],
    }),
    sep: one(bpjsSep, {
      fields: [bpjsInacbgClaims.sepId],
      references: [bpjsSep.id],
    }),
    patient: one(patients, {
      fields: [bpjsInacbgClaims.patientId],
      references: [patients.id],
    }),
  })
);

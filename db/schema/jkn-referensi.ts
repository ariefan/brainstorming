import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { fullFields } from "./core";
import { organizations, branches } from "./organization";
import { users } from "./users";

// ============================================================================
// JKN REFERENCE DATA TABLES
// ============================================================================

/**
 * JKN Reference: Polyclinic/Clinic
 * Cached polyclinic reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/poli
 */
export const jknRefPoli = pgTable(
  "jkn_ref_poli",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Polyclinic Info
    kdPoli: varchar("kd_poli", { length: 10 }).notNull(),
    nmPoli: varchar("nm_poli", { length: 100 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_poli_org_id").on(table.organizationId),
    index("idx_jkn_ref_poli_branch_id").on(table.branchId),
    index("idx_jkn_ref_poli_kd").on(table.kdPoli),
    index("idx_jkn_ref_poli_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_poli_org_kd").on(table.organizationId, table.kdPoli),
  ]
);

/**
 * JKN Reference: Doctor
 * Cached doctor reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/dokter
 */
export const jknRefDokter = pgTable(
  "jkn_ref_dokter",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Doctor Info
    kdDokter: varchar("kd_dokter", { length: 20 }).notNull(),
    nmDokter: varchar("nm_dokter", { length: 100 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_dokter_org_id").on(table.organizationId),
    index("idx_jkn_ref_dokter_branch_id").on(table.branchId),
    index("idx_jkn_ref_dokter_kd").on(table.kdDokter),
    index("idx_jkn_ref_dokter_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_dokter_org_kd").on(
      table.organizationId,
      table.kdDokter
    ),
  ]
);

/**
 * JKN Reference: Healthcare Facility
 * Cached healthcare facility reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/faskes
 */
export const jknRefFaskes = pgTable(
  "jkn_ref_faskes",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Facility Info
    kdFaskes: varchar("kd_faskes", { length: 20 }).notNull(),
    nmFaskes: varchar("nm_faskes", { length: 200 }).notNull(),
    kdJenisFaskes: varchar("kd_jenis_faskes", { length: 10 }),
    nmJenisFaskes: varchar("nm_jenis_faskes", { length: 100 }),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_faskes_org_id").on(table.organizationId),
    index("idx_jkn_ref_faskes_branch_id").on(table.branchId),
    index("idx_jkn_ref_faskes_kd").on(table.kdFaskes),
    index("idx_jkn_ref_faskes_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_faskes_org_kd").on(
      table.organizationId,
      table.kdFaskes
    ),
  ]
);

/**
 * JKN Reference: Specialist
 * Cached specialist reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/spesialistik
 */
export const jknRefSpesialistik = pgTable(
  "jkn_ref_spesialistik",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Specialist Info
    kdSpesialistik: varchar("kd_spesialistik", { length: 10 }).notNull(),
    nmSpesialistik: varchar("nm_spesialistik", { length: 100 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_spesialistik_org_id").on(table.organizationId),
    index("idx_jkn_ref_spesialistik_branch_id").on(table.branchId),
    index("idx_jkn_ref_spesialistik_kd").on(table.kdSpesialistik),
    index("idx_jkn_ref_spesialistik_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_spesialistik_org_kd").on(
      table.organizationId,
      table.kdSpesialistik
    ),
  ]
);

/**
 * JKN Reference: Room Type
 * Cached room type reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/ruangrawat
 */
export const jknRefRuangRawat = pgTable(
  "jkn_ref_ruang_rawat",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Room Type Info
    kdRuangRawat: varchar("kd_ruang_rawat", { length: 10 }).notNull(),
    nmRuangRawat: varchar("nm_ruang_rawat", { length: 100 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_ruang_rawat_org_id").on(table.organizationId),
    index("idx_jkn_ref_ruang_rawat_branch_id").on(table.branchId),
    index("idx_jkn_ref_ruang_rawat_kd").on(table.kdRuangRawat),
    index("idx_jkn_ref_ruang_rawat_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_ruang_rawat_org_kd").on(
      table.organizationId,
      table.kdRuangRawat
    ),
  ]
);

/**
 * JKN Reference: Class of Care
 * Cached class of care reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/kelasrawat
 */
export const jknRefKelasRawat = pgTable(
  "jkn_ref_kelas_rawat",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Class Info
    kdKelasRawat: varchar("kd_kelas_rawat", { length: 5 }).notNull(),
    nmKelasRawat: varchar("nm_kelas_rawat", { length: 50 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_kelas_rawat_org_id").on(table.organizationId),
    index("idx_jkn_ref_kelas_rawat_branch_id").on(table.branchId),
    index("idx_jkn_ref_kelas_rawat_kd").on(table.kdKelasRawat),
    index("idx_jkn_ref_kelas_rawat_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_kelas_rawat_org_kd").on(
      table.organizationId,
      table.kdKelasRawat
    ),
  ]
);

/**
 * JKN Reference: Discharge Method
 * Cached discharge method reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/carakeluar
 */
export const jknRefCaraKeluar = pgTable(
  "jkn_ref_cara_keluar",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Discharge Method Info
    kdCaraKeluar: varchar("kd_cara_keluar", { length: 5 }).notNull(),
    nmCaraKeluar: varchar("nm_cara_keluar", { length: 100 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_cara_keluar_org_id").on(table.organizationId),
    index("idx_jkn_ref_cara_keluar_branch_id").on(table.branchId),
    index("idx_jkn_ref_cara_keluar_kd").on(table.kdCaraKeluar),
    index("idx_jkn_ref_cara_keluar_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_cara_keluar_org_kd").on(
      table.organizationId,
      table.kdCaraKeluar
    ),
  ]
);

/**
 * JKN Reference: Discharge Condition
 * Cached discharge condition reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/kondisipulang
 */
export const jknRefKondisiPulang = pgTable(
  "jkn_ref_kondisi_pulang",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Discharge Condition Info
    kdKondisiPulang: varchar("kd_kondisi_pulang", { length: 5 }).notNull(),
    nmKondisiPulang: varchar("nm_kondisi_pulang", { length: 100 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_kondisi_pulang_org_id").on(table.organizationId),
    index("idx_jkn_ref_kondisi_pulang_branch_id").on(table.branchId),
    index("idx_jkn_ref_kondisi_pulang_kd").on(table.kdKondisiPulang),
    index("idx_jkn_ref_kondisi_pulang_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_kondisi_pulang_org_kd").on(
      table.organizationId,
      table.kdKondisiPulang
    ),
  ]
);

/**
 * JKN Reference: PRB Program
 * Cached PRB program reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/prb
 */
export const jknRefProgramPrb = pgTable(
  "jkn_ref_program_prb",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // PRB Program Info
    kdProgramPrb: varchar("kd_program_prb", { length: 5 }).notNull(),
    nmProgramPrb: varchar("nm_program_prb", { length: 100 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_program_prb_org_id").on(table.organizationId),
    index("idx_jkn_ref_program_prb_branch_id").on(table.branchId),
    index("idx_jkn_ref_program_prb_kd").on(table.kdProgramPrb),
    index("idx_jkn_ref_program_prb_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_program_prb_org_kd").on(
      table.organizationId,
      table.kdProgramPrb
    ),
  ]
);

/**
 * JKN Reference: DPHO Medication
 * Cached DPHO medication reference data from BPJS APIs
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/obatdpho
 */
export const jknRefObatDpho = pgTable(
  "jkn_ref_obat_dpho",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // DPHO Medication Info
    kdObat: varchar("kd_obat", { length: 20 }).notNull(),
    nmObat: varchar("nm_obat", { length: 200 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_obat_dpho_org_id").on(table.organizationId),
    index("idx_jkn_ref_obat_dpho_branch_id").on(table.branchId),
    index("idx_jkn_ref_obat_dpho_kd").on(table.kdObat),
    index("idx_jkn_ref_obat_dpho_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_obat_dpho_org_kd").on(
      table.organizationId,
      table.kdObat
    ),
  ]
);

/**
 * JKN Reference: Diagnosis (ICD-10)
 * Cached diagnosis reference data from BPJS APIs
 * Migrated from bpjsDiagnosa
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/diagnosa
 */
export const jknRefDiagnosa = pgTable(
  "jkn_ref_diagnosa",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Diagnosis Info
    kdDiagnosa: varchar("kd_diagnosa", { length: 20 }).notNull(),
    nmDiagnosa: varchar("nm_diagnosa", { length: 255 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_diagnosa_org_id").on(table.organizationId),
    index("idx_jkn_ref_diagnosa_branch_id").on(table.branchId),
    index("idx_jkn_ref_diagnosa_kd").on(table.kdDiagnosa),
    index("idx_jkn_ref_diagnosa_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_diagnosa_org_kd").on(
      table.organizationId,
      table.kdDiagnosa
    ),
  ]
);

/**
 * JKN Reference: Procedure (ICD-9)
 * Cached procedure reference data from BPJS APIs
 * Migrated from bpjsTindakan
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/prosedur
 */
export const jknRefTindakan = pgTable(
  "jkn_ref_tindakan",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Procedure Info
    kdTindakan: varchar("kd_tindakan", { length: 20 }).notNull(),
    nmTindakan: varchar("nm_tindakan", { length: 255 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_tindakan_org_id").on(table.organizationId),
    index("idx_jkn_ref_tindakan_branch_id").on(table.branchId),
    index("idx_jkn_ref_tindakan_kd").on(table.kdTindakan),
    index("idx_jkn_ref_tindakan_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_tindakan_org_kd").on(
      table.organizationId,
      table.kdTindakan
    ),
  ]
);

/**
 * JKN Reference: Medication
 * Cached medication reference data from BPJS APIs
 * Migrated from bpjsObat
 *
 * Related API: VClaim Referensi
 * Endpoints: /referensi/obat
 */
export const jknRefObat = pgTable(
  "jkn_ref_obat",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),

    // Medication Info
    kdObat: varchar("kd_obat", { length: 20 }).notNull(),
    nmObat: varchar("nm_obat", { length: 255 }).notNull(),

    // Status & Sync
    isActive: boolean("is_active").default(true),
    lastSyncAt: timestamp("last_sync_at"),

    notes: text("notes"),
  },
  (table) => [
    index("idx_jkn_ref_obat_org_id").on(table.organizationId),
    index("idx_jkn_ref_obat_branch_id").on(table.branchId),
    index("idx_jkn_ref_obat_kd").on(table.kdObat),
    index("idx_jkn_ref_obat_active").on(table.isActive),
    uniqueIndex("uk_jkn_ref_obat_org_kd").on(
      table.organizationId,
      table.kdObat
    ),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const jknRefPoliRelations = relations(jknRefPoli, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknRefPoli.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknRefPoli.branchId],
    references: [organizations.id],
  }),
  createdByUser: one(users, {
    fields: [jknRefPoli.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknRefPoli.updatedBy],
    references: [users.id],
  }),
}));

export const jknRefDokterRelations = relations(jknRefDokter, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknRefDokter.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknRefDokter.branchId],
    references: [organizations.id],
  }),
  createdByUser: one(users, {
    fields: [jknRefDokter.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknRefDokter.updatedBy],
    references: [users.id],
  }),
}));

export const jknRefFaskesRelations = relations(jknRefFaskes, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknRefFaskes.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknRefFaskes.branchId],
    references: [organizations.id],
  }),
  createdByUser: one(users, {
    fields: [jknRefFaskes.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknRefFaskes.updatedBy],
    references: [users.id],
  }),
}));

export const jknRefSpesialistikRelations = relations(
  jknRefSpesialistik,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefSpesialistik.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefSpesialistik.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefSpesialistik.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefSpesialistik.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefRuangRawatRelations = relations(
  jknRefRuangRawat,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefRuangRawat.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefRuangRawat.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefRuangRawat.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefRuangRawat.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefKelasRawatRelations = relations(
  jknRefKelasRawat,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefKelasRawat.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefKelasRawat.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefKelasRawat.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefKelasRawat.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefCaraKeluarRelations = relations(
  jknRefCaraKeluar,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefCaraKeluar.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefCaraKeluar.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefCaraKeluar.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefCaraKeluar.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefKondisiPulangRelations = relations(
  jknRefKondisiPulang,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefKondisiPulang.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefKondisiPulang.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefKondisiPulang.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefKondisiPulang.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefProgramPrbRelations = relations(
  jknRefProgramPrb,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefProgramPrb.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefProgramPrb.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefProgramPrb.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefProgramPrb.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefObatDphoRelations = relations(
  jknRefObatDpho,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefObatDpho.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefObatDpho.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefObatDpho.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefObatDpho.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefDiagnosaRelations = relations(
  jknRefDiagnosa,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefDiagnosa.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefDiagnosa.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefDiagnosa.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefDiagnosa.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefTindakanRelations = relations(
  jknRefTindakan,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [jknRefTindakan.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [jknRefTindakan.branchId],
      references: [organizations.id],
    }),
    createdByUser: one(users, {
      fields: [jknRefTindakan.createdBy],
      references: [users.id],
    }),
    updatedByUser: one(users, {
      fields: [jknRefTindakan.updatedBy],
      references: [users.id],
    }),
  })
);

export const jknRefObatRelations = relations(jknRefObat, ({ one }) => ({
  organization: one(organizations, {
    fields: [jknRefObat.organizationId],
    references: [organizations.id],
  }),
  branch: one(organizations, {
    fields: [jknRefObat.branchId],
    references: [organizations.id],
  }),
  createdByUser: one(users, {
    fields: [jknRefObat.createdBy],
    references: [users.id],
  }),
  updatedByUser: one(users, {
    fields: [jknRefObat.updatedBy],
    references: [users.id],
  }),
}));

import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  integer,
  numeric,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  triageLevelEnum,
  assessmentTypeEnum,
  painScaleTypeEnum,
  psychologyStatusEnum,
  birthMethodEnum,
  gestationalStatusEnum,
  fullFields,
  baseFields,
} from "./core";
import { organizations } from "./organization";
import { users } from "./users";
import { patients } from "./patients";
import { encounters } from "./medical";

// ============================================================================
// INITIAL ASSESSMENT TABLES (KAJIAN AWAL)
// ============================================================================
// Comprehensive patient assessment for Indonesian clinic accreditation (SNARS/KARS)
// Includes triage, pain assessment, fall risk, and specialized assessments
// ============================================================================

/**
 * Initial Assessments table (Main Record)
 * Core assessment data with triage, pain, and fall risk scores
 */
export const initialAssessments = pgTable(
  "initial_assessments",
  {
    ...fullFields,

    // Organization/Branch (multi-tenant)
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => organizations.id, {
      onDelete: "set null",
    }),

    // Links
    encounterId: uuid("encounter_id")
      .notNull()
      .references(() => encounters.id, { onDelete: "cascade" }),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),

    // Assessment info
    assessedBy: uuid("assessed_by")
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    assessmentType: assessmentTypeEnum("assessment_type")
      .notNull()
      .default("initial"),
    assessedAt: timestamp("assessed_at").defaultNow().notNull(),

    // Triage (Skrining Visual)
    triageLevel: triageLevelEnum("triage_level"),
    triageDetails: jsonb("triage_details").$type<{
      // Red indicators
      unconscious?: boolean;
      difficultyBreathing?: boolean;
      noPalpablePulse?: boolean;
      recurrentSeizures?: boolean;
      // Orange indicators
      severePain?: boolean;
      chestPain?: boolean;
      // Yellow indicators
      paleAppearance?: boolean;
      weakness?: boolean;
      unsteady?: boolean;
      // Green
      stableCondition?: boolean;
      notes?: string;
    }>(),

    // Pain Assessment
    painScaleType: painScaleTypeEnum("pain_scale_type"),
    painScore: integer("pain_score"), // 0-10
    painLocation: varchar("pain_location", { length: 255 }),
    painDetails: jsonb("pain_details").$type<{
      // VAS details
      vasScore?: number;
      // FLACC details (for children)
      flaccFace?: number;
      flaccLegs?: number;
      flaccActivity?: number;
      flaccCry?: number;
      flaccConsolability?: number;
      // Wong-Baker details
      wongBakerScore?: number;
      // Pain characteristics
      painType?: string; // sharp, dull, burning, etc.
      painDuration?: string;
      painFrequency?: string;
      aggravatingFactors?: string;
      relievingFactors?: string;
    }>(),

    // Fall Risk Assessment (Simple outpatient screening)
    fallRiskScore: integer("fall_risk_score"),
    fallRiskLevel: varchar("fall_risk_level", { length: 20 }), // low, medium, high
    fallRiskDetails: jsonb("fall_risk_details").$type<{
      // Simple 2-question screening (outpatient)
      unsteadyWhenSitting?: boolean;
      needsSupportWhenSitting?: boolean;
      // Additional risk factors
      historyOfFalls?: boolean;
      usesWalkingAid?: boolean;
      hasVisionProblems?: boolean;
      takesSedatives?: boolean;
      notes?: string;
    }>(),

    // Completion tracking
    isComplete: boolean("is_complete").default(false),
    completedAt: timestamp("completed_at"),
    completedBy: uuid("completed_by").references(() => users.id, {
      onDelete: "set null",
    }),

    // Notes
    notes: text("notes"),

    // SatuSehat sync (pain scores sync as Observations)
    satusehatObservationIds: jsonb("satusehat_observation_ids").$type<
      string[]
    >(),
  },
  (table) => [
    index("idx_assessment_org_id").on(table.organizationId),
    index("idx_assessment_branch_id").on(table.branchId),
    index("idx_assessment_encounter_id").on(table.encounterId),
    index("idx_assessment_patient_id").on(table.patientId),
    index("idx_assessment_type").on(table.assessmentType),
    index("idx_assessment_triage").on(table.triageLevel),
    index("idx_assessment_assessed_at").on(table.assessedAt),
    index("idx_assessment_complete").on(table.isComplete),
  ]
);

/**
 * Nursing Assessments table
 * History, psychology, socioeconomic, and care planning
 */
export const nursingAssessments = pgTable(
  "nursing_assessments",
  {
    ...fullFields,

    // Link to initial assessment
    initialAssessmentId: uuid("initial_assessment_id")
      .notNull()
      .references(() => initialAssessments.id, { onDelete: "cascade" }),

    // Medical History
    chiefComplaint: text("chief_complaint"), // Keluhan utama
    historyOfPresentIllness: text("history_of_present_illness"), // Riwayat kesehatan sekarang
    pastMedicalHistory: text("past_medical_history"), // Riwayat kesehatan dahulu
    allergyHistory: text("allergy_history"), // Riwayat alergi
    medicationHistory: text("medication_history"), // Riwayat penggunaan obat
    contraceptionHistory: text("contraception_history"), // Riwayat KB

    // Disease History with Year
    diseaseHistory: jsonb("disease_history").$type<{
      heartDisorders?: number; // year
      tuberculosis?: number;
      kidneyDisorders?: number;
      diabetesMellitus?: number;
      bloodDisorders?: number;
      surgeries?: number;
      asthma?: number;
      twinPregnancy?: number;
      allergies?: number;
      thyroidDisorders?: number;
      bruisesBleedingGums?: number;
      hypertension?: number;
      other?: Record<string, number>;
    }>(),

    // Psychology
    psychologyStatus: psychologyStatusEnum("psychology_status"),
    psychologyStatusOther: varchar("psychology_status_other", { length: 255 }),
    understandsTreatment: boolean("understands_treatment"), // Mengerti perawatan
    beliefsRestrictions: text("beliefs_restrictions"), // Nilai keyakinan/pantangan
    communicationBarriers: text("communication_barriers"), // Kendala komunikasi
    caretaker: varchar("caretaker", { length: 255 }), // Yang merawat di rumah

    // Socioeconomic
    hasInsurance: boolean("has_insurance"),
    occupation: varchar("occupation", { length: 100 }),
    education: varchar("education", { length: 100 }),
    habits: jsonb("habits").$type<{
      smoking?: boolean;
      alcohol?: boolean;
      sleepingPills?: boolean;
      exercise?: boolean;
      other?: string;
    }>(),

    // Education & Care Plan
    educationProvided: text("education_provided"), // Edukasi yang diberikan
    careProblem: text("care_problem"), // Masalah keperawatan
    carePlan: text("care_plan"), // Rencana tindakan

    notes: text("notes"),
  },
  (table) => [
    index("idx_nursing_assessment_id").on(table.initialAssessmentId),
  ]
);

/**
 * Pediatric Assessments table (Children)
 * Birth history, vaccines, FLACC pain scale, growth
 */
export const pediatricAssessments = pgTable(
  "pediatric_assessments",
  {
    ...fullFields,

    // Link to initial assessment
    initialAssessmentId: uuid("initial_assessment_id")
      .notNull()
      .references(() => initialAssessments.id, { onDelete: "cascade" }),

    // Birth History
    birthMethod: birthMethodEnum("birth_method"),
    gestationalStatus: gestationalStatusEnum("gestational_status"),
    birthWeightGrams: integer("birth_weight_grams"), // BB lahir (gram)
    birthLengthCm: integer("birth_length_cm"), // PB lahir (cm)

    // Vaccine History
    vaccineHistory: jsonb("vaccine_history").$type<{
      bcg?: boolean;
      hb0?: boolean;
      ipv?: boolean;
      boosterIpvMr?: boolean;
      penta?: boolean;
      pcv?: boolean;
      mr?: boolean;
      other?: string[];
    }>(),

    // FLACC Pain Scale (Face-Legs-Activity-Cry-Consolability)
    flaccFace: integer("flacc_face"), // 0-2
    flaccLegs: integer("flacc_legs"), // 0-2
    flaccActivity: integer("flacc_activity"), // 0-2
    flaccCry: integer("flacc_cry"), // 0-2
    flaccConsolability: integer("flacc_consolability"), // 0-2
    flaccTotalScore: integer("flacc_total_score"), // 0-10 calculated

    // Current Growth
    currentWeightKg: numeric("current_weight_kg", { precision: 5, scale: 2 }),
    currentHeightCm: numeric("current_height_cm", { precision: 5, scale: 2 }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_pediatric_assessment_id").on(table.initialAssessmentId),
  ]
);

/**
 * Obstetric Assessments table (Pregnant/Postpartum)
 * G/P/A/Ah, delivery history, current pregnancy
 */
export const obstetricAssessments = pgTable(
  "obstetric_assessments",
  {
    ...fullFields,

    // Link to initial assessment
    initialAssessmentId: uuid("initial_assessment_id")
      .notNull()
      .references(() => initialAssessments.id, { onDelete: "cascade" }),

    // G/P/A/Ah (Gravida/Para/Abortus/Anak hidup)
    gravida: integer("gravida"), // G - total pregnancies
    para: integer("para"), // P - births after 20 weeks
    abortus: integer("abortus"), // A - losses before 20 weeks
    livingChildren: integer("living_children"), // Ah - living children
    stillbirths: integer("stillbirths"), // Lahir mati

    // Last Delivery
    lastDeliveryInterval: integer("last_delivery_interval"), // Years since last delivery
    lastDeliveryMethod: varchar("last_delivery_method", { length: 100 }),
    lastDeliveryAssistant: varchar("last_delivery_assistant", { length: 100 }),

    // Current Pregnancy
    lmp: date("lmp"), // Last menstrual period (HPHT)
    edd: date("edd"), // Estimated due date (HPL)
    gestationalWeeks: integer("gestational_weeks"),
    contraceptionBeforePregnancy: varchar("contraception_before_pregnancy", {
      length: 100,
    }),

    notes: text("notes"),
  },
  (table) => [
    index("idx_obstetric_assessment_id").on(table.initialAssessmentId),
  ]
);

/**
 * Geriatric Assessments table (Elderly ≥60)
 * Morse Fall Scale, ADL (Katz Index), Nutritional screening
 */
export const geriatricAssessments = pgTable(
  "geriatric_assessments",
  {
    ...fullFields,

    // Link to initial assessment
    initialAssessmentId: uuid("initial_assessment_id")
      .notNull()
      .references(() => initialAssessments.id, { onDelete: "cascade" }),

    // Morse Fall Scale
    morseHistoryOfFalling: integer("morse_history_of_falling"), // 0 or 25
    morseSecondaryDiagnosis: integer("morse_secondary_diagnosis"), // 0 or 15
    morseAmbulatoryAid: integer("morse_ambulatory_aid"), // 0, 15, or 30
    morseIvTherapy: integer("morse_iv_therapy"), // 0 or 20
    morseGait: integer("morse_gait"), // 0, 10, or 20
    morseMentalStatus: integer("morse_mental_status"), // 0 or 15
    morseTotalScore: integer("morse_total_score"), // 0-125 calculated
    morseFallRisk: varchar("morse_fall_risk", { length: 20 }), // low (<25), medium (25-45), high (>45)

    // ADL - Katz Index (Activities of Daily Living)
    adlBathing: integer("adl_bathing"), // 0 or 1
    adlDressing: integer("adl_dressing"), // 0 or 1
    adlToileting: integer("adl_toileting"), // 0 or 1
    adlTransferring: integer("adl_transferring"), // 0, 1, or 2
    adlContinence: integer("adl_continence"), // 0, 1, or 2
    adlFeeding: integer("adl_feeding"), // 0, 1, or 2
    adlTotalScore: integer("adl_total_score"), // 0-6 (Katz Index)
    adlIndependenceLevel: varchar("adl_independence_level", { length: 50 }), // independent, partially dependent, dependent

    // Nutritional Screening (MUST or MNA)
    nutritionalScreeningScore: integer("nutritional_screening_score"),
    nutritionalRisk: varchar("nutritional_risk", { length: 20 }), // low, medium, high
    nutritionalDetails: jsonb("nutritional_details").$type<{
      bmiScore?: number;
      weightLossScore?: number;
      acuteIllnessScore?: number;
      notes?: string;
    }>(),

    notes: text("notes"),
  },
  (table) => [
    index("idx_geriatric_assessment_id").on(table.initialAssessmentId),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

export const initialAssessmentsRelations = relations(
  initialAssessments,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [initialAssessments.organizationId],
      references: [organizations.id],
    }),
    branch: one(organizations, {
      fields: [initialAssessments.branchId],
      references: [organizations.id],
      relationName: "assessmentBranch",
    }),
    encounter: one(encounters, {
      fields: [initialAssessments.encounterId],
      references: [encounters.id],
    }),
    patient: one(patients, {
      fields: [initialAssessments.patientId],
      references: [patients.id],
    }),
    assessedByUser: one(users, {
      fields: [initialAssessments.assessedBy],
      references: [users.id],
    }),
    completedByUser: one(users, {
      fields: [initialAssessments.completedBy],
      references: [users.id],
      relationName: "assessmentCompletedBy",
    }),
    nursingAssessment: one(nursingAssessments),
    pediatricAssessment: one(pediatricAssessments),
    obstetricAssessment: one(obstetricAssessments),
    geriatricAssessment: one(geriatricAssessments),
  })
);

export const nursingAssessmentsRelations = relations(
  nursingAssessments,
  ({ one }) => ({
    initialAssessment: one(initialAssessments, {
      fields: [nursingAssessments.initialAssessmentId],
      references: [initialAssessments.id],
    }),
  })
);

export const pediatricAssessmentsRelations = relations(
  pediatricAssessments,
  ({ one }) => ({
    initialAssessment: one(initialAssessments, {
      fields: [pediatricAssessments.initialAssessmentId],
      references: [initialAssessments.id],
    }),
  })
);

export const obstetricAssessmentsRelations = relations(
  obstetricAssessments,
  ({ one }) => ({
    initialAssessment: one(initialAssessments, {
      fields: [obstetricAssessments.initialAssessmentId],
      references: [initialAssessments.id],
    }),
  })
);

export const geriatricAssessmentsRelations = relations(
  geriatricAssessments,
  ({ one }) => ({
    initialAssessment: one(initialAssessments, {
      fields: [geriatricAssessments.initialAssessmentId],
      references: [initialAssessments.id],
    }),
  })
);

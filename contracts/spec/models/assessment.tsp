import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// ASSESSMENT MODELS
// ============================================================================
// Clinical assessments: triage, nursing, pain, fall risk, etc.
// ============================================================================

// --- Triage Assessment ---

/**
 * Triage Assessment - Emergency department triage
 */
model TriageAssessment {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Triage level */
  triageLevel: TriageLevel;

  /** Chief complaint */
  chiefComplaint: string;

  /** Vital signs */
  vitalSigns?: AssessmentVitalSigns;

  /** Pain assessment */
  painAssessment?: PainAssessment;

  /** Consciousness level (GCS) */
  glasgowComaScale?: int32;

  /** Allergies noted */
  allergies?: string[];

  /** Current medications */
  currentMedications?: string[];

  /** Notes */
  notes?: string;

  /** Assessed by user ID */
  assessedBy: string;

  /** Assessed at */
  assessedAt: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Nursing Assessment ---

/**
 * Nursing Assessment - Initial/periodic nursing assessment
 */
model NursingAssessment {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Assessment type */
  assessmentType: AssessmentType;

  /** Chief complaint */
  chiefComplaint?: string;

  /** History of present illness */
  historyOfPresentIllness?: string;

  /** Vital signs */
  vitalSigns?: AssessmentVitalSigns;

  /** Physical assessment */
  physicalAssessment?: PhysicalAssessment;

  /** Pain assessment */
  painAssessment?: PainAssessment;

  /** Fall risk assessment */
  fallRiskAssessment?: FallRiskAssessment;

  /** Nutrition screening */
  nutritionScreening?: NutritionScreening;

  /** Psychology status */
  psychologyStatus?: PsychologyStatus;

  /** Functional status */
  functionalStatus?: FunctionalStatus;

  /** Discharge planning */
  dischargePlanning?: string;

  /** Nursing diagnoses */
  nursingDiagnoses?: string[];

  /** Care plan */
  carePlan?: string;

  /** Assessed by user ID */
  assessedBy: string;

  /** Assessed at */
  assessedAt: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Pain Assessment ---

/**
 * Pain Assessment - Pain evaluation
 */
model PainAssessment {
  /** Pain scale type */
  scaleType: PainScaleType;

  /** Pain score (0-10 for VAS/numeric) */
  score: int32;

  /** Pain location */
  location?: string;

  /** Pain character (sharp, dull, etc.) */
  character?: string;

  /** Duration */
  duration?: string;

  /** Aggravating factors */
  aggravatingFactors?: string[];

  /** Relieving factors */
  relievingFactors?: string[];
}

// --- Fall Risk Assessment ---

/**
 * Fall Risk Assessment - Fall risk evaluation (Morse scale)
 */
model FallRiskAssessment {
  /** History of falling */
  historyOfFalling: boolean;

  /** Secondary diagnosis */
  secondaryDiagnosis: boolean;

  /** Ambulatory aid required */
  ambulatoryAid: string;

  /** IV/Heparin lock */
  ivTherapy: boolean;

  /** Gait assessment */
  gait: string;

  /** Mental status */
  mentalStatus: string;

  /** Total score */
  totalScore: int32;

  /** Risk level */
  riskLevel: string;
}

// --- Nutrition Screening ---

/**
 * Nutrition Screening
 */
model NutritionScreening {
  /** Unintentional weight loss */
  weightLoss: boolean;

  /** Weight loss amount (kg) */
  weightLossAmount?: float64;

  /** Reduced food intake */
  reducedIntake: boolean;

  /** BMI */
  bmi?: float64;

  /** Severely ill */
  severelyIll: boolean;

  /** Total score */
  totalScore: int32;

  /** Risk level */
  riskLevel: string;

  /** Requires dietitian referral */
  requiresDietitian: boolean;
}

// --- Physical Assessment ---

/**
 * Physical Assessment - Body systems review
 */
model PhysicalAssessment {
  /** General appearance */
  generalAppearance?: string;

  /** Head/HEENT */
  headHeent?: string;

  /** Cardiovascular */
  cardiovascular?: string;

  /** Respiratory */
  respiratory?: string;

  /** Gastrointestinal */
  gastrointestinal?: string;

  /** Genitourinary */
  genitourinary?: string;

  /** Musculoskeletal */
  musculoskeletal?: string;

  /** Neurological */
  neurological?: string;

  /** Skin/Integumentary */
  skin?: string;
}

// --- Functional Status ---

/**
 * Functional Status - ADL assessment
 */
model FunctionalStatus {
  /** Bathing */
  bathing: string;

  /** Dressing */
  dressing: string;

  /** Toileting */
  toileting: string;

  /** Transferring */
  transferring: string;

  /** Continence */
  continence: string;

  /** Feeding */
  feeding: string;

  /** Mobility */
  mobility: string;

  /** Independence score */
  independenceScore: int32;
}

// --- Vital Signs ---

/**
 * Assessment Vital Signs
 */
model AssessmentVitalSigns {
  /** Temperature (Celsius) */
  temperature?: float64;

  /** Blood pressure systolic */
  bpSystolic?: int32;

  /** Blood pressure diastolic */
  bpDiastolic?: int32;

  /** Heart rate */
  heartRate?: int32;

  /** Respiratory rate */
  respiratoryRate?: int32;

  /** Oxygen saturation */
  oxygenSaturation?: int32;

  /** Height (cm) */
  height?: float64;

  /** Weight (kg) */
  weight?: float64;

  /** BMI */
  bmi?: float64;
}

// ============================================================================
// REQUEST MODELS
// ============================================================================

/** Create triage assessment request */
model CreateTriageAssessmentRequest {
  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Triage level */
  triageLevel: TriageLevel;

  /** Chief complaint */
  @minLength(1)
  chiefComplaint: string;

  /** Vital signs */
  vitalSigns?: AssessmentVitalSigns;

  /** Pain assessment */
  painAssessment?: PainAssessment;

  /** Glasgow Coma Scale */
  glasgowComaScale?: int32;

  /** Allergies */
  allergies?: string[];

  /** Current medications */
  currentMedications?: string[];

  /** Notes */
  notes?: string;
}

/** Create nursing assessment request */
model CreateNursingAssessmentRequest {
  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Assessment type */
  assessmentType: AssessmentType;

  /** Chief complaint */
  chiefComplaint?: string;

  /** History of present illness */
  historyOfPresentIllness?: string;

  /** Vital signs */
  vitalSigns?: AssessmentVitalSigns;

  /** Physical assessment */
  physicalAssessment?: PhysicalAssessment;

  /** Pain assessment */
  painAssessment?: PainAssessment;

  /** Fall risk assessment */
  fallRiskAssessment?: FallRiskAssessment;

  /** Nutrition screening */
  nutritionScreening?: NutritionScreening;

  /** Psychology status */
  psychologyStatus?: PsychologyStatus;

  /** Functional status */
  functionalStatus?: FunctionalStatus;

  /** Nursing diagnoses */
  nursingDiagnoses?: string[];

  /** Care plan */
  carePlan?: string;
}

// ============================================================================
// RESPONSE MODELS
// ============================================================================

/** Triage assessment response */
model TriageAssessmentResponse is SingleResourceResponse<TriageAssessment>;

/** Triage assessment list response */
model TriageAssessmentListResponse is CollectionResponse<TriageAssessment>;

/** Nursing assessment response */
model NursingAssessmentResponse is SingleResourceResponse<NursingAssessment>;

/** Nursing assessment list response */
model NursingAssessmentListResponse is CollectionResponse<NursingAssessment>;

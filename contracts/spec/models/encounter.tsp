import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// MEDICAL ENCOUNTER MODELS
// ============================================================================

/**
 * Encounter (Clinical Visit) resource
 *
 * Represents a clinical encounter between patient and practitioner.
 * Aligned with FHIR Encounter resource for SatuSehat integration.
 */
model Encounter {
  /** Unique encounter identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Encounter number */
  @example("ENC-2024-001234")
  encounterNumber: string;

  /** Patient ID */
  patientId: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Polyclinic ID */
  polyclinicId: string;

  /** Appointment ID (if from appointment) */
  appointmentId?: string;

  /** Encounter type */
  encounterType: EncounterType;

  /** Encounter class (FHIR) */
  encounterClass: EncounterClass;

  /** Encounter status */
  status: EncounterStatus;

  /** Start time */
  startTime: utcDateTime;

  /** End time */
  endTime?: utcDateTime;

  /** Chief complaint */
  chiefComplaint?: string;

  /** Reason for visit */
  reasonForVisit?: string;

  /** Physical examination notes (JSON) */
  physicalExamination?: Record<unknown>;

  /** Assessment notes */
  assessment?: string;

  /** Plan notes */
  plan?: string;

  /** BPJS SEP number */
  bpjsSepNumber?: string;

  /** SatuSehat encounter ID */
  satusehatEncounterId?: string;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** When synced to SatuSehat */
  satusehatSyncedAt?: utcDateTime;

  /** SatuSehat sync error */
  satusehatSyncError?: string;

  /** JKN sync status */
  isJknSynced: boolean;

  /** Soft delete status */
  isDeleted: boolean;

  /** When deleted */
  deletedAt?: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Vital Signs record
 */
model VitalSigns {
  /** Unique identifier */
  id: string;

  /** Encounter ID */
  encounterId: string;

  /** Patient ID */
  patientId: string;

  /** Temperature (Celsius) */
  temperature?: float32;

  /** Heart rate (bpm) */
  heartRate?: int32;

  /** Systolic blood pressure (mmHg) */
  systolicBp?: int32;

  /** Diastolic blood pressure (mmHg) */
  diastolicBp?: int32;

  /** Respiratory rate (per minute) */
  respiratoryRate?: int32;

  /** Oxygen saturation (%) */
  oxygenSaturation?: float32;

  /** Weight (kg) */
  weight?: float32;

  /** Height (cm) */
  height?: float32;

  /** BMI (calculated) */
  bmi?: float32;

  /** Blood glucose (mg/dL) */
  bloodGlucose?: float32;

  /** Notes */
  notes?: string;

  /** SatuSehat observation ID */
  satusehatObservationId?: string;

  /** When recorded */
  recordedAt: utcDateTime;

  /** Recorded by user ID */
  recordedBy: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Diagnosis record
 */
model Diagnosis {
  /** Unique identifier */
  id: string;

  /** Encounter ID */
  encounterId: string;

  /** Patient ID */
  patientId: string;

  /** ICD-10 code */
  @example("J06.9")
  icd10Code: string;

  /** ICD-10 description */
  icd10Description?: string;

  /** Diagnosis name */
  diagnosisName: string;

  /** Diagnosis name in Indonesian */
  diagnosisNameId?: string;

  /** Diagnosis type */
  diagnosisType: DiagnosisType;

  /** Verification status */
  verificationStatus: DiagnosisVerification;

  /** Whether this is a chronic condition */
  isChronic: boolean;

  /** Onset date */
  onsetDate?: plainDate;

  /** Notes */
  notes?: string;

  /** SatuSehat condition ID */
  satusehatConditionId?: string;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** When diagnosed */
  diagnosedAt: utcDateTime;

  /** Diagnosed by user ID */
  diagnosedBy: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Prescription record
 */
model Prescription {
  /** Unique identifier */
  id: string;

  /** Encounter ID */
  encounterId: string;

  /** Patient ID */
  patientId: string;

  /** Prescription number */
  @example("RX-2024-001234")
  prescriptionNumber: string;

  /** Prescription status */
  status: PrescriptionStatus;

  /** When prescribed */
  prescribedAt: utcDateTime;

  /** Prescribed by user ID */
  prescribedBy: string;

  /** Notes */
  notes?: string;

  /** Dispense status */
  dispenseStatus: DispenseStatus;

  /** When dispensed */
  dispensedAt?: utcDateTime;

  /** Sign-off status (for accreditation) */
  isSignedOff: boolean;

  /** When signed off */
  signedOffAt?: utcDateTime;

  /** Signed off by user ID */
  signedOffBy?: string;

  /** SatuSehat medication request ID */
  satusehatMedicationRequestId?: string;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** JKN sync status */
  isJknSynced: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Prescription item (single medication in prescription)
 */
model PrescriptionItem {
  /** Unique identifier */
  id: string;

  /** Prescription ID */
  prescriptionId: string;

  /** Medication ID (from pharmacy stock) */
  medicationId?: string;

  /** Generic name */
  genericName: string;

  /** Generic name in Indonesian */
  genericNameId?: string;

  /** Brand name */
  brandName?: string;

  /** Brand name in Indonesian */
  brandNameId?: string;

  /** Dosage form */
  dosageForm: DosageForm;

  /** Strength (e.g., "500mg") */
  strength?: string;

  /** Unit (e.g., "tablet", "ml") */
  unit?: string;

  /** Frequency */
  frequency: Frequency;

  /** Frequency description (if other) */
  frequencyDescription?: string;

  /** Route (e.g., "oral", "IV") */
  route?: string;

  /** Duration in days */
  durationDays?: int32;

  /** Quantity */
  quantity: int32;

  /** Repeat count (refills) */
  repeatCount?: int32;

  /** Instructions */
  instructions?: string;

  /** Dispense as written flag */
  dispenseAsWritten: boolean;

  /** Whether this is a controlled substance */
  isControlled: boolean;

  /** RxNorm code */
  rxNormCode?: string;

  /** Notes */
  notes?: string;

  /** Quantity dispensed */
  quantityDispensed?: int32;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Referral record
 */
model Referral {
  /** Unique identifier */
  id: string;

  /** Encounter ID */
  encounterId: string;

  /** Patient ID */
  patientId: string;

  /** Referral number */
  @example("REF-2024-001234")
  referralNumber: string;

  /** Referral type */
  referralType: "internal" | "external" | "bpjs";

  /** Referred to facility name */
  referredToFacility?: string;

  /** Referred to specialty */
  referredToSpecialty?: Specialty;

  /** Referred to practitioner name */
  referredToPractitioner?: string;

  /** Referral reason */
  referralReason?: string;

  /** Diagnosis */
  diagnosis?: string;

  /** BPJS rujukan number */
  bpjsRujukanNumber?: string;

  /** Is urgent */
  isUrgent: boolean;

  /** Status */
  status: "pending" | "accepted" | "rejected" | "completed";

  /** Notes */
  notes?: string;

  /** Sign-off status */
  isSignedOff: boolean;

  /** When signed off */
  signedOffAt?: utcDateTime;

  /** Signed off by user ID */
  signedOffBy?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Procedure record
 */
model Procedure {
  /** Unique identifier */
  id: string;

  /** Encounter ID */
  encounterId: string;

  /** Patient ID */
  patientId: string;

  /** Procedure number */
  procedureNumber: string;

  /** ICD-9-CM code */
  icd9cmCode?: string;

  /** ICD-9-CM description */
  icd9cmDescription?: string;

  /** Procedure name */
  procedureName: string;

  /** Procedure name in Indonesian */
  procedureNameId?: string;

  /** Procedure status */
  status: "preparation" | "inProgress" | "completed" | "notDone" | "stopped";

  /** Procedure category */
  category: "surgical" | "diagnostic" | "therapeutic" | "preventive" | "palliative" | "other";

  /** When performed */
  performedAt: utcDateTime;

  /** Performed by user ID */
  performedBy: string;

  /** Assisted by user IDs */
  assistedBy?: string[];

  /** Location/room */
  location?: string;

  /** Body site */
  bodySite?: string;

  /** Outcome */
  outcome?: string;

  /** Complication */
  complication?: string;

  /** Follow-up required */
  followUpRequired: boolean;

  /** Notes */
  notes?: string;

  /** Sign-off status */
  isSignedOff: boolean;

  /** When signed off */
  signedOffAt?: utcDateTime;

  /** Signed off by */
  signedOffBy?: string;

  /** SatuSehat procedure ID */
  satusehatProcedureId?: string;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** JKN sync status */
  isJknSynced: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Request Models ---

/** Request body for creating an encounter */
model CreateEncounterRequest {
  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Polyclinic ID */
  polyclinicId: string;

  /** Appointment ID */
  appointmentId?: string;

  /** Encounter type */
  encounterType: EncounterType;

  /** Encounter class */
  encounterClass: EncounterClass;

  /** Chief complaint */
  chiefComplaint?: string;

  /** Reason for visit */
  reasonForVisit?: string;

  /** BPJS SEP number */
  bpjsSepNumber?: string;
}

/** Request body for updating an encounter */
model UpdateEncounterRequest {
  /** Status */
  status?: EncounterStatus;

  /** Chief complaint */
  chiefComplaint?: string;

  /** Reason for visit */
  reasonForVisit?: string;

  /** Physical examination */
  physicalExamination?: Record<unknown>;

  /** Assessment */
  assessment?: string;

  /** Plan */
  plan?: string;

  /** End time */
  endTime?: utcDateTime;
}

/** Request body for recording vital signs */
model RecordVitalSignsRequest {
  /** Temperature (Celsius) */
  @minValue(30)
  @maxValue(45)
  temperature?: float32;

  /** Heart rate (bpm) */
  @minValue(20)
  @maxValue(300)
  heartRate?: int32;

  /** Systolic BP (mmHg) */
  @minValue(50)
  @maxValue(300)
  systolicBp?: int32;

  /** Diastolic BP (mmHg) */
  @minValue(30)
  @maxValue(200)
  diastolicBp?: int32;

  /** Respiratory rate */
  @minValue(5)
  @maxValue(60)
  respiratoryRate?: int32;

  /** Oxygen saturation (%) */
  @minValue(0)
  @maxValue(100)
  oxygenSaturation?: float32;

  /** Weight (kg) */
  @minValue(0.5)
  @maxValue(500)
  weight?: float32;

  /** Height (cm) */
  @minValue(20)
  @maxValue(300)
  height?: float32;

  /** Blood glucose (mg/dL) */
  bloodGlucose?: float32;

  /** Notes */
  notes?: string;
}

/** Request body for creating a diagnosis */
model CreateDiagnosisRequest {
  /** ICD-10 code */
  @minLength(3)
  icd10Code: string;

  /** ICD-10 description */
  icd10Description?: string;

  /** Diagnosis name */
  diagnosisName: string;

  /** Diagnosis name in Indonesian */
  diagnosisNameId?: string;

  /** Diagnosis type */
  diagnosisType: DiagnosisType;

  /** Verification status */
  verificationStatus?: DiagnosisVerification;

  /** Is chronic */
  isChronic?: boolean;

  /** Onset date */
  onsetDate?: plainDate;

  /** Notes */
  notes?: string;
}

/** Request body for updating a diagnosis */
model UpdateDiagnosisRequest {
  /** ICD-10 code */
  icd10Code?: string;

  /** ICD-10 description */
  icd10Description?: string;

  /** Diagnosis name */
  diagnosisName?: string;

  /** Diagnosis name in Indonesian */
  diagnosisNameId?: string;

  /** Diagnosis type */
  diagnosisType?: DiagnosisType;

  /** Verification status */
  verificationStatus?: DiagnosisVerification;

  /** Is chronic */
  isChronic?: boolean;

  /** Onset date */
  onsetDate?: plainDate;

  /** Notes */
  notes?: string;
}

/** Request body for creating a prescription */
model CreatePrescriptionRequest {
  /** Notes */
  notes?: string;

  /** Items */
  items: CreatePrescriptionItemRequest[];
}

/** Request body for creating a prescription item */
model CreatePrescriptionItemRequest {
  /** Medication ID */
  medicationId?: string;

  /** Generic name */
  @minLength(1)
  genericName: string;

  /** Generic name in Indonesian */
  genericNameId?: string;

  /** Brand name */
  brandName?: string;

  /** Dosage form */
  dosageForm: DosageForm;

  /** Strength */
  strength?: string;

  /** Unit */
  unit?: string;

  /** Frequency */
  frequency: Frequency;

  /** Frequency description */
  frequencyDescription?: string;

  /** Route */
  route?: string;

  /** Duration in days */
  durationDays?: int32;

  /** Quantity */
  @minValue(1)
  quantity: int32;

  /** Instructions */
  instructions?: string;

  /** Dispense as written */
  dispenseAsWritten?: boolean;
}

/** Request body for creating a procedure */
model CreateProcedureRequest {
  /** ICD-9-CM code */
  icd9cmCode?: string;

  /** ICD-9-CM description */
  icd9cmDescription?: string;

  /** Procedure name */
  @minLength(1)
  procedureName: string;

  /** Procedure name in Indonesian */
  procedureNameId?: string;

  /** Category */
  category: "surgical" | "diagnostic" | "therapeutic" | "preventive" | "palliative" | "other";

  /** When performed */
  performedAt?: utcDateTime;

  /** Location */
  location?: string;

  /** Body site */
  bodySite?: string;

  /** Outcome */
  outcome?: string;

  /** Complication */
  complication?: string;

  /** Follow-up required */
  followUpRequired?: boolean;

  /** Notes */
  notes?: string;
}

/** Request body for updating a procedure */
model UpdateProcedureRequest {
  /** Status */
  status?: "preparation" | "inProgress" | "completed" | "notDone" | "stopped";

  /** Outcome */
  outcome?: string;

  /** Complication */
  complication?: string;

  /** Follow-up required */
  followUpRequired?: boolean;

  /** Notes */
  notes?: string;
}

/** Request body for creating a referral */
model CreateReferralRequest {
  /** Referral type */
  referralType: "internal" | "external";

  /** Reason for referral */
  @minLength(1)
  reason: string;

  /** Referred to facility */
  referredToFacility?: string;

  /** Referred to specialty */
  referredToSpecialty?: Specialty;

  /** Is urgent */
  isUrgent?: boolean;

  /** Notes */
  notes?: string;
}

// --- Response Models ---

/** Single encounter response */
model EncounterResponse is SingleResourceResponse<Encounter>;

/** Encounter list response */
model EncounterListResponse is CollectionResponse<Encounter>;

/** Vital signs response */
model VitalSignsResponse is SingleResourceResponse<VitalSigns>;

/** Diagnosis response */
model DiagnosisResponse is SingleResourceResponse<Diagnosis>;

/** Diagnosis list response */
model DiagnosisListResponse is CollectionResponse<Diagnosis>;

/** Prescription response */
model PrescriptionResponse is SingleResourceResponse<Prescription>;

/** Prescription list response */
model PrescriptionListResponse is CollectionResponse<Prescription>;

/** Referral response */
model ReferralResponse is SingleResourceResponse<Referral>;

/** Referral list response */
model ReferralListResponse is CollectionResponse<Referral>;

/** Procedure response */
model ProcedureResponse is SingleResourceResponse<Procedure>;

/** Procedure list response */
model ProcedureListResponse is CollectionResponse<Procedure>;

/** Complete encounter with all related data */
model EncounterWithRelationsResponse {
  data: {
    ...Encounter;
    patient?: {
      id: string;
      fullName: string;
      medicalRecordNumber: string;
      dateOfBirth: plainDate;
      gender: Gender;
    };
    practitioner?: {
      id: string;
      fullName: string;
      specialty?: Specialty;
    };
    polyclinic?: {
      id: string;
      polyclinicName: string;
    };
    vitalSigns?: VitalSigns;
    diagnoses?: Diagnosis[];
    prescriptions?: Prescription[];
    procedures?: Procedure[];
    referrals?: Referral[];
  };
  meta: ResponseMeta;
}

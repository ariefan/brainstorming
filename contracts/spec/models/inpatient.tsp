import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// INPATIENT MODELS
// ============================================================================
// Hospital ward, bed, and admission management
// ============================================================================

// --- Ward ---

/**
 * Ward - Hospital ward/unit
 */
model Ward {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId: string;

  /** Ward code */
  wardCode: string;

  /** Ward name */
  wardName: string;

  /** Ward name (Indonesian) */
  wardNameId?: string;

  /** Room class */
  roomClass: RoomClass;

  /** Floor */
  floor?: string;

  /** Building */
  building?: string;

  /** Total beds */
  totalBeds: int32;

  /** Available beds */
  availableBeds: int32;

  /** Nurse station phone */
  nurseStationPhone?: string;

  /** Is active */
  isActive: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Bed ---

/**
 * Bed - Individual hospital bed
 */
model Bed {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId: string;

  /** Ward ID */
  wardId: string;

  /** Ward reference */
  ward?: Ward;

  /** Bed number */
  bedNumber: string;

  /** Room number */
  roomNumber?: string;

  /** Bed status */
  status: BedStatus;

  /** Current patient ID (if occupied) */
  currentPatientId?: string;

  /** Current admission ID (if occupied) */
  currentAdmissionId?: string;

  /** Features (e.g., oxygen, monitor) */
  features?: string[];

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Admission ---

/**
 * Admission - Inpatient admission record
 */
model Admission {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId: string;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Admission number */
  admissionNumber: string;

  /** Admission type */
  admissionType: AdmissionType;

  /** Admission date/time */
  admittedAt: utcDateTime;

  /** Expected discharge date */
  expectedDischargeDate?: plainDate;

  /** Actual discharge date/time */
  dischargedAt?: utcDateTime;

  /** Status */
  status: AdmissionStatus;

  /** Current ward ID */
  currentWardId?: string;

  /** Current bed ID */
  currentBedId?: string;

  /** Admitting diagnosis */
  admittingDiagnosis?: string;

  /** Admitting physician ID */
  admittingPhysicianId?: string;

  /** Attending physician ID */
  attendingPhysicianId?: string;

  /** Diet order */
  dietOrder?: string;

  /** Activity order */
  activityOrder?: string;

  /** Discharge disposition */
  dischargeDisposition?: DischargeDisposition;

  /** Discharge summary */
  dischargeSummary?: string;

  /** Transfer history */
  transfers?: AdmissionTransfer[];

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/** Admission transfer record */
model AdmissionTransfer {
  /** From ward ID */
  fromWardId: string;

  /** From bed ID */
  fromBedId: string;

  /** To ward ID */
  toWardId: string;

  /** To bed ID */
  toBedId: string;

  /** Transfer time */
  transferredAt: utcDateTime;

  /** Reason */
  reason?: string;

  /** Authorized by user ID */
  authorizedBy: string;
}

// --- Nursing Note ---

/**
 * Nursing Note - Inpatient care notes
 */
model NursingNote {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Admission ID */
  admissionId: string;

  /** Note type */
  noteType: string;

  /** Shift */
  shift?: string;

  /** Note content */
  content: string;

  /** Vital signs */
  vitalSigns?: InpatientVitalSigns;

  /** Intake/Output */
  intakeOutput?: IntakeOutput;

  /** Created by user ID */
  createdBy: string;

  /** When created */
  createdAt: utcDateTime;
}

/** Vital signs for inpatient monitoring */
model InpatientVitalSigns {
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

  /** Pain level (0-10) */
  painLevel?: int32;
}

/** Intake/Output */
model IntakeOutput {
  /** Oral intake (ml) */
  oralIntake?: int32;

  /** IV intake (ml) */
  ivIntake?: int32;

  /** Urine output (ml) */
  urineOutput?: int32;

  /** Other output (ml) */
  otherOutput?: int32;
}

// ============================================================================
// REQUEST MODELS
// ============================================================================

/** Create ward request */
model CreateWardRequest {
  /** Branch ID */
  branchId: string;

  /** Ward code */
  @minLength(1)
  wardCode: string;

  /** Ward name */
  @minLength(1)
  wardName: string;

  /** Ward name (Indonesian) */
  wardNameId?: string;

  /** Room class */
  roomClass: RoomClass;

  /** Floor */
  floor?: string;

  /** Building */
  building?: string;

  /** Total beds */
  totalBeds: int32;

  /** Nurse station phone */
  nurseStationPhone?: string;
}

/** Update ward request */
model UpdateWardRequest {
  /** Ward name */
  wardName?: string;

  /** Ward name (Indonesian) */
  wardNameId?: string;

  /** Room class */
  roomClass?: RoomClass;

  /** Total beds */
  totalBeds?: int32;

  /** Nurse station phone */
  nurseStationPhone?: string;

  /** Is active */
  isActive?: boolean;
}

/** Create bed request */
model CreateBedRequest {
  /** Ward ID */
  wardId: string;

  /** Bed number */
  @minLength(1)
  bedNumber: string;

  /** Room number */
  roomNumber?: string;

  /** Features */
  features?: string[];

  /** Notes */
  notes?: string;
}

/** Update bed status request */
model UpdateBedStatusRequest {
  /** Bed status */
  status: BedStatus;

  /** Notes */
  notes?: string;
}

/** Create admission request */
model CreateAdmissionRequest {
  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Admission type */
  admissionType: AdmissionType;

  /** Ward ID */
  wardId: string;

  /** Bed ID */
  bedId: string;

  /** Expected discharge date */
  expectedDischargeDate?: plainDate;

  /** Admitting diagnosis */
  admittingDiagnosis?: string;

  /** Admitting physician ID */
  admittingPhysicianId?: string;

  /** Attending physician ID */
  attendingPhysicianId?: string;

  /** Diet order */
  dietOrder?: string;

  /** Activity order */
  activityOrder?: string;
}

/** Transfer admission request */
model TransferAdmissionRequest {
  /** To ward ID */
  toWardId: string;

  /** To bed ID */
  toBedId: string;

  /** Reason */
  reason?: string;
}

/** Discharge admission request */
model DischargeAdmissionRequest {
  /** Discharge disposition */
  dischargeDisposition: DischargeDisposition;

  /** Discharge summary */
  dischargeSummary?: string;

  /** Follow-up instructions */
  followUpInstructions?: string;
}

/** Create nursing note request */
model CreateNursingNoteRequest {
  /** Admission ID */
  admissionId: string;

  /** Note type */
  noteType: string;

  /** Shift */
  shift?: string;

  /** Note content */
  @minLength(1)
  content: string;

  /** Vital signs */
  vitalSigns?: InpatientVitalSigns;

  /** Intake/Output */
  intakeOutput?: IntakeOutput;
}

// ============================================================================
// RESPONSE MODELS
// ============================================================================

/** Ward response */
model WardResponse is SingleResourceResponse<Ward>;

/** Ward list response */
model WardListResponse is CollectionResponse<Ward>;

/** Bed response */
model BedResponse is SingleResourceResponse<Bed>;

/** Bed list response */
model BedListResponse is CollectionResponse<Bed>;

/** Admission response */
model AdmissionResponse is SingleResourceResponse<Admission>;

/** Admission list response */
model AdmissionListResponse is CollectionResponse<Admission>;

/** Nursing note response */
model NursingNoteResponse is SingleResourceResponse<NursingNote>;

/** Nursing note list response */
model NursingNoteListResponse is CollectionResponse<NursingNote>;

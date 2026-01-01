import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// ACCREDITATION MODELS
// ============================================================================
// Indonesian clinic accreditation standards (SNARS, KARS, Kemenkes)
// Quality indicators, patient safety, clinical audits, credentials, PPI
// ============================================================================

/**
 * Accreditation Standard
 *
 * Tracks accreditation status for organization/branch
 */
model AccreditationStandard {
  /** Unique identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Accreditation body */
  accreditationBody: AccreditationBody;

  /** Current level */
  currentLevel: AccreditationLevel;

  /** Target level */
  targetLevel?: AccreditationLevel;

  /** Status */
  status: AccreditationStatus;

  /** Last accredited date */
  lastAccreditedAt?: utcDateTime;

  /** Expiry date */
  expiresAt?: utcDateTime;

  /** Next survey date */
  nextSurveyDate?: plainDate;

  /** Self-assessment score */
  selfAssessmentScore?: float64;

  /** Survey score */
  surveyScore?: float64;

  /** Surveyor organization */
  surveyorOrganization?: string;

  /** Surveyor team */
  surveyorTeam?: {
    name: string;
    role: string;
    specialty?: string;
  }[];

  /** Certificate number */
  certificateNumber?: string;

  /** Certificate URL */
  certificateUrl?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Quality Indicator
 *
 * Definition of a quality metric for monitoring
 */
model QualityIndicator {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Indicator code */
  indicatorCode: string;

  /** Indicator name */
  indicatorName: string;

  /** Indicator name in Indonesian */
  indicatorNameId?: string;

  /** Category */
  category: QualityIndicatorCategory;

  /** Description */
  description?: string;

  /** Numerator definition */
  numeratorDefinition: string;

  /** Denominator definition */
  denominatorDefinition: string;

  /** Formula */
  formula?: string;

  /** Unit */
  unit: string;

  /** Target value */
  targetValue?: float64;

  /** Green threshold (good) */
  thresholdGreen?: float64;

  /** Yellow threshold (warning) */
  thresholdYellow?: float64;

  /** Red threshold (critical) */
  thresholdRed?: float64;

  /** Measurement frequency */
  measurementFrequency: string;

  /** Whether active */
  isActive: boolean;

  /** Effective from date */
  effectiveFrom?: plainDate;

  /** Effective to date */
  effectiveTo?: plainDate;

  /** Responsible department */
  responsibleDepartment?: string;

  /** Responsible person ID */
  responsiblePerson?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Quality Indicator Result
 *
 * Measurement result for a quality indicator
 */
model QualityIndicatorResult {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Indicator ID */
  indicatorId: string;

  /** Period start date */
  periodStart: plainDate;

  /** Period end date */
  periodEnd: plainDate;

  /** Period type */
  periodType: string;

  /** Numerator value */
  numeratorValue: float64;

  /** Denominator value */
  denominatorValue: float64;

  /** Result value */
  resultValue: float64;

  /** Target value */
  targetValue?: float64;

  /** Whether target met */
  isTargetMet?: boolean;

  /** Performance level (green, yellow, red) */
  performanceLevel?: string;

  /** Analysis */
  analysis?: string;

  /** Root cause */
  rootCause?: string;

  /** Improvement plan */
  improvementPlan?: string;

  /** Measured by user ID */
  measuredBy: string;

  /** Measured at */
  measuredAt: utcDateTime;

  /** Verified by user ID */
  verifiedBy?: string;

  /** Verified at */
  verifiedAt?: utcDateTime;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Patient Safety Incident
 *
 * Insiden Keselamatan Pasien (IKP) tracking
 */
model PatientSafetyIncident {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Incident number */
  incidentNumber: string;

  /** Incident date/time */
  incidentDate: utcDateTime;

  /** Reported date/time */
  reportedDate: utcDateTime;

  /** Severity */
  severity: IncidentSeverity;

  /** Status */
  status: IncidentStatus;

  /** Location description */
  locationDescription?: string;

  /** Department */
  department?: string;

  /** Patient ID (optional) */
  patientId?: string;

  /** Encounter ID (optional) */
  encounterId?: string;

  /** Incident type */
  incidentType: string;

  /** Incident description */
  incidentDescription: string;

  /** Immediate action taken */
  immediateAction?: string;

  /** Patient outcome */
  patientOutcome?: string;

  /** Reported by user ID */
  reportedBy: string;

  /** Involved staff */
  involvedStaff?: {
    userId?: string;
    name: string;
    role: string;
    involvement: string;
  }[];

  /** Witness information */
  witnessInfo?: {
    name: string;
    role?: string;
    statement?: string;
  }[];

  /** Investigation started at */
  investigationStartedAt?: utcDateTime;

  /** Investigation completed at */
  investigationCompletedAt?: utcDateTime;

  /** Investigated by user ID */
  investigatedBy?: string;

  /** Root cause analysis */
  rootCauseAnalysis?: string;

  /** Contributing factors */
  contributingFactors?: string[];

  /** Corrective actions */
  correctiveActions?: {
    action: string;
    responsible: string;
    dueDate: string;
    status: string;
    completedDate?: string;
  }[];

  /** Resolved at */
  resolvedAt?: utcDateTime;

  /** Resolved by user ID */
  resolvedBy?: string;

  /** Lesson learned */
  lessonLearned?: string;

  /** Preventive measures */
  preventiveMeasures?: string;

  /** Whether reported to KNKP */
  isReportedToKnkp: boolean;

  /** KNKP reported at */
  knkpReportedAt?: utcDateTime;

  /** KNKP report number */
  knkpReportNumber?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Clinical Audit
 *
 * Clinical audit tracking
 */
model ClinicalAudit {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Audit number */
  auditNumber: string;

  /** Audit type */
  auditType: ClinicalAuditType;

  /** Audit title */
  auditTitle: string;

  /** Audit title in Indonesian */
  auditTitleId?: string;

  /** Department */
  department?: string;

  /** Audit period start */
  auditPeriodStart: plainDate;

  /** Audit period end */
  auditPeriodEnd: plainDate;

  /** Sample size */
  sampleSize?: int32;

  /** Population */
  population?: int32;

  /** Audit criteria */
  auditCriteria?: {
    criterion: string;
    standard: string;
    weight?: float64;
  }[];

  /** Status */
  status: ClinicalAuditStatus;

  /** Planned start date */
  plannedStartDate?: plainDate;

  /** Actual start date */
  actualStartDate?: plainDate;

  /** Completed date */
  completedDate?: plainDate;

  /** Lead auditor user ID */
  leadAuditor: string;

  /** Audit team */
  auditTeam?: {
    userId?: string;
    name: string;
    role: string;
  }[];

  /** Findings */
  findings?: {
    criterion: string;
    finding: string;
    complianceRate?: float64;
    severity?: string;
    recommendation?: string;
  }[];

  /** Overall compliance rate */
  overallComplianceRate?: float64;

  /** Summary */
  summary?: string;

  /** Conclusions */
  conclusions?: string;

  /** Recommendations */
  recommendations?: string;

  /** Follow-up actions */
  followUpActions?: {
    action: string;
    responsible: string;
    dueDate: string;
    status: string;
    completedDate?: string;
  }[];

  /** Follow-up date */
  followUpDate?: plainDate;

  /** Follow-up completed at */
  followUpCompletedAt?: utcDateTime;

  /** Approved by user ID */
  approvedBy?: string;

  /** Approved at */
  approvedAt?: utcDateTime;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Practitioner Credential
 *
 * STR, SIP, and other credentials verification
 */
model PractitionerCredential {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Credential type */
  credentialType: CredentialType;

  /** Credential number */
  credentialNumber: string;

  /** Credential name */
  credentialName: string;

  /** Issuing authority */
  issuingAuthority: string;

  /** Issued date */
  issuedDate: plainDate;

  /** Expiry date */
  expiryDate?: plainDate;

  /** Status */
  status: CredentialStatus;

  /** Verified at */
  verifiedAt?: utcDateTime;

  /** Verified by user ID */
  verifiedBy?: string;

  /** Verification method */
  verificationMethod?: string;

  /** Document URL */
  documentUrl?: string;

  /** Document hash (SHA-256) */
  documentHash?: string;

  /** Renewal reminder sent */
  renewalReminderSent: boolean;

  /** Renewal reminder sent at */
  renewalReminderSentAt?: utcDateTime;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Document Control
 *
 * Controlled documents for accreditation (SPO, policies)
 */
model DocumentControl {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Document number */
  documentNumber: string;

  /** Document type */
  documentType: DocumentControlType;

  /** Document title */
  documentTitle: string;

  /** Document title in Indonesian */
  documentTitleId?: string;

  /** Department */
  department?: string;

  /** Category */
  category?: string;

  /** Version */
  version: string;

  /** Previous version */
  previousVersion?: string;

  /** Status */
  status: DocumentControlStatus;

  /** Purpose */
  purpose?: string;

  /** Scope */
  scope?: string;

  /** Content */
  content?: string;

  /** Attachment URL */
  attachmentUrl?: string;

  /** Drafted at */
  draftedAt?: utcDateTime;

  /** Drafted by user ID */
  draftedBy?: string;

  /** Reviewed at */
  reviewedAt?: utcDateTime;

  /** Reviewed by user ID */
  reviewedBy?: string;

  /** Approved at */
  approvedAt?: utcDateTime;

  /** Approved by user ID */
  approvedBy?: string;

  /** Published at */
  publishedAt?: utcDateTime;

  /** Published by user ID */
  publishedBy?: string;

  /** Effective date */
  effectiveDate?: plainDate;

  /** Review date */
  reviewDate?: plainDate;

  /** Retirement date */
  retirementDate?: plainDate;

  /** Distribution list */
  distributionList?: string[];

  /** Whether acknowledgement required */
  acknowledgementRequired: boolean;

  /** Revision history */
  revisionHistory?: {
    version: string;
    date: string;
    changedBy: string;
    changes: string;
  }[];

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Infection Surveillance
 *
 * Healthcare-associated infection (HAI) tracking for PPI
 */
model InfectionSurveillance {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Surveillance number */
  surveillanceNumber: string;

  /** Category */
  category: InfectionControlCategory;

  /** Status */
  status: InfectionSurveillanceStatus;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Detection date */
  detectionDate: plainDate;

  /** Reported date */
  reportedDate: plainDate;

  /** Reported by user ID */
  reportedBy: string;

  /** Ward */
  ward?: string;

  /** Room number */
  roomNumber?: string;

  /** Infection site */
  infectionSite?: string;

  /** Organism (pathogen) */
  organism?: string;

  /** Culture result */
  cultureResult?: string;

  /** Antibiotic sensitivity */
  antibioticSensitivity?: {
    antibiotic: string;
    result: "sensitive" | "intermediate" | "resistant";
  }[];

  /** Whether device-related */
  deviceRelated: boolean;

  /** Device type */
  deviceType?: string;

  /** Device insertion date */
  deviceInsertionDate?: plainDate;

  /** Device removal date */
  deviceRemovalDate?: plainDate;

  /** Whether surgery-related */
  surgeryRelated: boolean;

  /** Surgery date */
  surgeryDate?: plainDate;

  /** Surgery type */
  surgeryType?: string;

  /** Outcome */
  outcome?: string;

  /** Resolved date */
  resolvedDate?: plainDate;

  /** Days of infection */
  daysOfInfection?: int32;

  /** Investigated by user ID */
  investigatedBy?: string;

  /** Investigation notes */
  investigationNotes?: string;

  /** Bundle compliance checked */
  bundleComplianceChecked: boolean;

  /** Bundle compliance score */
  bundleComplianceScore?: float64;

  /** Actions taken */
  actionsTaken?: {
    action: string;
    date: string;
    performedBy: string;
  }[];

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Request Models ---

/** Request body for creating accreditation standard */
model CreateAccreditationStandardRequest {
  /** Branch ID */
  branchId?: string;

  /** Accreditation body */
  accreditationBody: AccreditationBody;

  /** Target level */
  targetLevel?: AccreditationLevel;

  /** Next survey date */
  nextSurveyDate?: plainDate;

  /** Notes */
  notes?: string;
}

/** Request body for updating accreditation standard */
model UpdateAccreditationStandardRequest {
  /** Current level */
  currentLevel?: AccreditationLevel;

  /** Target level */
  targetLevel?: AccreditationLevel;

  /** Status */
  status?: AccreditationStatus;

  /** Next survey date */
  nextSurveyDate?: plainDate;

  /** Self-assessment score */
  selfAssessmentScore?: float64;

  /** Survey score */
  surveyScore?: float64;

  /** Surveyor organization */
  surveyorOrganization?: string;

  /** Certificate number */
  certificateNumber?: string;

  /** Certificate URL */
  certificateUrl?: string;

  /** Notes */
  notes?: string;
}

/** Request body for creating quality indicator */
model CreateQualityIndicatorRequest {
  /** Branch ID */
  branchId?: string;

  /** Indicator code */
  @minLength(1)
  indicatorCode: string;

  /** Indicator name */
  @minLength(1)
  indicatorName: string;

  /** Indicator name in Indonesian */
  indicatorNameId?: string;

  /** Category */
  category: QualityIndicatorCategory;

  /** Description */
  description?: string;

  /** Numerator definition */
  @minLength(1)
  numeratorDefinition: string;

  /** Denominator definition */
  @minLength(1)
  denominatorDefinition: string;

  /** Formula */
  formula?: string;

  /** Unit */
  unit?: string;

  /** Target value */
  targetValue?: float64;

  /** Thresholds */
  thresholdGreen?: float64;
  thresholdYellow?: float64;
  thresholdRed?: float64;

  /** Measurement frequency */
  measurementFrequency?: string;

  /** Responsible department */
  responsibleDepartment?: string;

  /** Responsible person ID */
  responsiblePerson?: string;
}

/** Request body for recording quality indicator result */
model RecordQualityIndicatorResultRequest {
  /** Branch ID */
  branchId?: string;

  /** Indicator ID */
  @minLength(1)
  indicatorId: string;

  /** Period start */
  periodStart: plainDate;

  /** Period end */
  periodEnd: plainDate;

  /** Period type */
  @minLength(1)
  periodType: string;

  /** Numerator value */
  numeratorValue: float64;

  /** Denominator value */
  denominatorValue: float64;

  /** Analysis */
  analysis?: string;

  /** Root cause */
  rootCause?: string;

  /** Improvement plan */
  improvementPlan?: string;
}

/** Request body for reporting patient safety incident */
model ReportPatientSafetyIncidentRequest {
  /** Branch ID */
  branchId?: string;

  /** Incident date */
  incidentDate: utcDateTime;

  /** Severity */
  severity: IncidentSeverity;

  /** Location description */
  locationDescription?: string;

  /** Department */
  department?: string;

  /** Patient ID */
  patientId?: string;

  /** Encounter ID */
  encounterId?: string;

  /** Incident type */
  @minLength(1)
  incidentType: string;

  /** Incident description */
  @minLength(1)
  incidentDescription: string;

  /** Immediate action */
  immediateAction?: string;

  /** Patient outcome */
  patientOutcome?: string;
}

/** Request body for creating practitioner credential */
model CreatePractitionerCredentialRequest {
  /** Branch ID */
  branchId?: string;

  /** Practitioner ID */
  @minLength(1)
  practitionerId: string;

  /** Credential type */
  credentialType: CredentialType;

  /** Credential number */
  @minLength(1)
  credentialNumber: string;

  /** Credential name */
  @minLength(1)
  credentialName: string;

  /** Issuing authority */
  @minLength(1)
  issuingAuthority: string;

  /** Issued date */
  issuedDate: plainDate;

  /** Expiry date */
  expiryDate?: plainDate;

  /** Document URL */
  documentUrl?: string;
}

/** Request body for creating document control */
model CreateDocumentControlRequest {
  /** Branch ID */
  branchId?: string;

  /** Document number */
  @minLength(1)
  documentNumber: string;

  /** Document type */
  documentType: DocumentControlType;

  /** Document title */
  @minLength(1)
  documentTitle: string;

  /** Document title in Indonesian */
  documentTitleId?: string;

  /** Department */
  department?: string;

  /** Category */
  category?: string;

  /** Purpose */
  purpose?: string;

  /** Scope */
  scope?: string;

  /** Content */
  content?: string;
}

/** Request body for reporting infection surveillance */
model ReportInfectionSurveillanceRequest {
  /** Branch ID */
  branchId?: string;

  /** Category */
  category: InfectionControlCategory;

  /** Patient ID */
  @minLength(1)
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Detection date */
  detectionDate: plainDate;

  /** Ward */
  ward?: string;

  /** Room number */
  roomNumber?: string;

  /** Infection site */
  infectionSite?: string;

  /** Whether device-related */
  deviceRelated?: boolean;

  /** Device type */
  deviceType?: string;

  /** Whether surgery-related */
  surgeryRelated?: boolean;

  /** Surgery type */
  surgeryType?: string;
}

// --- Response Models ---

/** Single accreditation standard response */
model AccreditationStandardResponse is SingleResourceResponse<AccreditationStandard>;

/** Accreditation standard list response */
model AccreditationStandardListResponse is CollectionResponse<AccreditationStandard>;

/** Single quality indicator response */
model QualityIndicatorResponse is SingleResourceResponse<QualityIndicator>;

/** Quality indicator list response */
model QualityIndicatorListResponse is CollectionResponse<QualityIndicator>;

/** Single quality indicator result response */
model QualityIndicatorResultResponse is SingleResourceResponse<QualityIndicatorResult>;

/** Quality indicator result list response */
model QualityIndicatorResultListResponse is CollectionResponse<QualityIndicatorResult>;

/** Single patient safety incident response */
model PatientSafetyIncidentResponse is SingleResourceResponse<PatientSafetyIncident>;

/** Patient safety incident list response */
model PatientSafetyIncidentListResponse is CollectionResponse<PatientSafetyIncident>;

/** Single clinical audit response */
model ClinicalAuditResponse is SingleResourceResponse<ClinicalAudit>;

/** Clinical audit list response */
model ClinicalAuditListResponse is CollectionResponse<ClinicalAudit>;

/** Single practitioner credential response */
model PractitionerCredentialResponse is SingleResourceResponse<PractitionerCredential>;

/** Practitioner credential list response */
model PractitionerCredentialListResponse is CollectionResponse<PractitionerCredential>;

/** Single document control response */
model DocumentControlResponse is SingleResourceResponse<DocumentControl>;

/** Document control list response */
model DocumentControlListResponse is CollectionResponse<DocumentControl>;

/** Single infection surveillance response */
model InfectionSurveillanceResponse is SingleResourceResponse<InfectionSurveillance>;

/** Infection surveillance list response */
model InfectionSurveillanceListResponse is CollectionResponse<InfectionSurveillance>;

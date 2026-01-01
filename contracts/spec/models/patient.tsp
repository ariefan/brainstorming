import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// PATIENT MODEL
// ============================================================================

/**
 * Patient resource
 *
 * Represents a patient in the healthcare system.
 * Aligned with FHIR Patient resource for SatuSehat integration.
 */
model Patient {
  /** Unique patient identifier */
  @example("pat_abc123")
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID (optional location scope) */
  branchId?: string;

  /** Medical record number */
  @example("MRN-2024-001234")
  medicalRecordNumber: string;

  /** NIK (Indonesian National ID - 16 digits) */
  @example("3201234567890001")
  nik?: string;

  /** BPJS number */
  @example("0001234567890")
  bpjsNumber?: string;

  /** SatuSehat IHS ID */
  satusehatIhsId?: string;

  /** First name */
  @example("Ahmad")
  firstName: string;

  /** Last name */
  @example("Wijaya")
  lastName: string;

  /** First name in Indonesian (if different) */
  firstNameId?: string;

  /** Last name in Indonesian */
  lastNameId?: string;

  /** Full name (computed) */
  fullName: string;

  /** Full name in Indonesian */
  fullNameId?: string;

  /** Gender */
  gender: Gender;

  /** Date of birth */
  dateOfBirth: plainDate;

  /** Place of birth */
  placeOfBirth?: string;

  /** Marital status */
  maritalStatus?: MaritalStatus;

  /** Blood type */
  bloodType?: BloodType;

  /** Rhesus factor */
  rhesus?: Rhesus;

  /** Religion */
  religion?: string;

  /** Nationality (default: Indonesia) */
  nationality: string;

  /** Country (default: Indonesia) */
  country?: string;

  /** Education level */
  education?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Phone number */
  phone?: string;

  /** Mobile number */
  mobile?: string;

  /** Email address */
  @format("email")
  email?: string;

  /** Occupation */
  occupation?: string;

  /** Emergency contact name */
  emergencyContactName?: string;

  /** Emergency contact phone */
  emergencyContactPhone?: string;

  /** Emergency contact relationship */
  emergencyContactRelationship?: string;

  /** Photo URL */
  photoUrl?: string;

  /** Patient status */
  status: PatientStatus;

  /** JKN verification status */
  isJknVerified: boolean;

  /** When JKN was verified */
  jknVerifiedAt?: utcDateTime;

  /** JKN verification error message */
  jknVerificationError?: string;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** When synced to SatuSehat */
  satusehatSyncedAt?: utcDateTime;

  /** SatuSehat sync error message */
  satusehatSyncError?: string;

  /** Soft delete status */
  isDeleted: boolean;

  /** When soft deleted */
  deletedAt?: utcDateTime;

  /** Who deleted */
  deletedBy?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When last updated */
  updatedAt: utcDateTime;
}

/**
 * Patient allergy record
 */
model PatientAllergy {
  /** Unique identifier */
  id: string;

  /** Patient ID */
  patientId: string;

  /** Allergy type */
  allergyType: AllergyType;

  /** Allergen name */
  allergen: string;

  /** Allergen in Indonesian */
  allergenId?: string;

  /** Severity */
  severity: AllergySeverity;

  /** Reaction description */
  reaction?: string;

  /** Onset date */
  onsetDate?: plainDate;

  /** Whether allergy is still active */
  isActive: boolean;

  /** Notes */
  notes?: string;

  /** SatuSehat AllergyIntolerance ID */
  satusehatAllergyIntoleranceId?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Chronic condition record
 */
model ChronicCondition {
  /** Unique identifier */
  id: string;

  /** Patient ID */
  patientId: string;

  /** ICD-10 code */
  icd10Code: string;

  /** Condition name */
  conditionName: string;

  /** Condition name in Indonesian */
  conditionNameId?: string;

  /** Diagnosis date */
  diagnosisDate?: plainDate;

  /** Whether condition is currently active */
  isActive: boolean;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Request Models ---

/** Request body for creating a patient */
model CreatePatientRequest {
  /** Branch ID */
  branchId?: string;

  /** NIK (16 digits) */
  @minLength(16)
  @maxLength(16)
  nik?: string;

  /** BPJS number */
  bpjsNumber?: string;

  /** First name */
  @minLength(1)
  @maxLength(100)
  firstName: string;

  /** Last name */
  @minLength(1)
  @maxLength(100)
  lastName: string;

  /** First name in Indonesian */
  firstNameId?: string;

  /** Last name in Indonesian */
  lastNameId?: string;

  /** Gender */
  gender: Gender;

  /** Date of birth */
  dateOfBirth: plainDate;

  /** Place of birth */
  placeOfBirth?: string;

  /** Marital status */
  maritalStatus?: MaritalStatus;

  /** Blood type */
  bloodType?: BloodType;

  /** Rhesus */
  rhesus?: Rhesus;

  /** Religion */
  religion?: string;

  /** Nationality */
  nationality?: string;

  /** Country */
  country?: string;

  /** Education level */
  education?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Phone */
  phone?: string;

  /** Mobile */
  mobile?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Occupation */
  occupation?: string;

  /** Emergency contact name */
  emergencyContactName?: string;

  /** Emergency contact phone */
  emergencyContactPhone?: string;

  /** Emergency contact relationship */
  emergencyContactRelationship?: string;
}

/** Request body for updating a patient */
model UpdatePatientRequest {
  /** First name */
  firstName?: string;

  /** Last name */
  lastName?: string;

  /** First name in Indonesian */
  firstNameId?: string;

  /** Last name in Indonesian */
  lastNameId?: string;

  /** BPJS number */
  bpjsNumber?: string;

  /** Address */
  address?: string;

  /** City */
  city?: string;

  /** Province */
  province?: string;

  /** Postal code */
  postalCode?: string;

  /** Phone */
  phone?: string;

  /** Mobile */
  mobile?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Occupation */
  occupation?: string;

  /** Education level */
  education?: string;

  /** Country */
  country?: string;

  /** Emergency contact name */
  emergencyContactName?: string;

  /** Emergency contact phone */
  emergencyContactPhone?: string;

  /** Emergency contact relationship */
  emergencyContactRelationship?: string;

  /** Status */
  status?: PatientStatus;
}

/** Request body for creating a patient allergy */
model CreatePatientAllergyRequest {
  /** Allergy type */
  allergyType: AllergyType;

  /** Allergen name */
  @minLength(1)
  allergen: string;

  /** Allergen in Indonesian */
  allergenId?: string;

  /** Severity */
  severity: AllergySeverity;

  /** Reaction description */
  reaction?: string;

  /** Onset date */
  onsetDate?: plainDate;

  /** Notes */
  notes?: string;
}

/** Request body for updating a patient allergy */
model UpdatePatientAllergyRequest {
  /** Allergy type */
  allergyType?: AllergyType;

  /** Allergen name */
  allergen?: string;

  /** Allergen in Indonesian */
  allergenId?: string;

  /** Severity */
  severity?: AllergySeverity;

  /** Reaction description */
  reaction?: string;

  /** Onset date */
  onsetDate?: plainDate;

  /** Is active */
  isActive?: boolean;

  /** Notes */
  notes?: string;
}

/** Request body for creating a chronic condition */
model CreateChronicConditionRequest {
  /** ICD-10 code */
  @minLength(1)
  icd10Code: string;

  /** Condition name */
  @minLength(1)
  conditionName: string;

  /** Condition name in Indonesian */
  conditionNameId?: string;

  /** Diagnosis date */
  diagnosisDate?: plainDate;

  /** Notes */
  notes?: string;
}

/** Request body for updating a chronic condition */
model UpdateChronicConditionRequest {
  /** ICD-10 code */
  icd10Code?: string;

  /** Condition name */
  conditionName?: string;

  /** Condition name in Indonesian */
  conditionNameId?: string;

  /** Diagnosis date */
  diagnosisDate?: plainDate;

  /** Is active */
  isActive?: boolean;

  /** Notes */
  notes?: string;
}

// --- Response Models ---

/** Single patient response */
model PatientResponse is SingleResourceResponse<Patient>;

/** Patient list response with pagination */
model PatientListResponse is CollectionResponse<Patient>;

/** Patient with related data (allergies, chronic conditions) */
model PatientWithRelationsResponse {
  data: {
    ...Patient;
    allergies?: PatientAllergy[];
    chronicConditions?: ChronicCondition[];
  };
  meta: ResponseMeta;
}

/** Single allergy response */
model PatientAllergyResponse is SingleResourceResponse<PatientAllergy>;

/** Allergy list response */
model PatientAllergyListResponse is CollectionResponse<PatientAllergy>;

/** Single chronic condition response */
model ChronicConditionResponse is SingleResourceResponse<ChronicCondition>;

/** Chronic condition list response */
model ChronicConditionListResponse is CollectionResponse<ChronicCondition>;

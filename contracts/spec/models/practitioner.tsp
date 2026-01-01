import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// PRACTITIONER & POLYCLINIC MODELS
// ============================================================================

/**
 * Practitioner resource
 *
 * Represents healthcare providers such as doctors, nurses, etc.
 * Aligned with FHIR Practitioner resource for SatuSehat integration.
 */
model Practitioner {
  /** Unique practitioner identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Practitioner number (unique) */
  @example("DOC-2024-001")
  practitionerNumber: string;

  /** First name */
  firstName: string;

  /** Last name */
  lastName: string;

  /** First name in Indonesian */
  firstNameId?: string;

  /** Last name in Indonesian */
  lastNameId?: string;

  /** Full name (computed) */
  fullName: string;

  /** Gender */
  gender?: Gender;

  /** Date of birth */
  dateOfBirth?: plainDate;

  /** Phone */
  phone?: string;

  /** Mobile */
  mobile?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Practitioner type */
  practitionerType: PractitionerType;

  /** Medical specialty */
  specialty?: Specialty;

  /** License number */
  licenseNumber?: string;

  /** License expiry date */
  licenseExpiry?: plainDate;

  /** SatuSehat IHS ID */
  satusehatIhsId?: string;

  /** NIP (Indonesian employee number) */
  nip?: string;

  /** STR (Surat Tanda Registrasi) */
  str?: string;

  /** SIP (Surat Izin Praktik) */
  sip?: string;

  /** Photo URL */
  photoUrl?: string;

  /** Bio */
  bio?: string;

  /** Education history (JSON array) */
  education?: Record<unknown>[];

  /** Certifications (JSON array) */
  certifications?: Record<unknown>[];

  /** Whether practitioner is active */
  isActive: boolean;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** When synced to SatuSehat */
  satusehatSyncedAt?: utcDateTime;

  /** SatuSehat sync error message */
  satusehatSyncError?: string;

  /** JKN sync status */
  isJknSynced: boolean;

  /** When synced to JKN */
  jknSyncedAt?: utcDateTime;

  /** JKN sync error message */
  jknSyncError?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Polyclinic resource
 *
 * Represents a department/unit within the organization
 */
model Polyclinic {
  /** Unique identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Polyclinic code */
  polyclinicCode: string;

  /** Polyclinic name */
  polyclinicName: string;

  /** Polyclinic name in Indonesian */
  polyclinicNameId?: string;

  /** Polyclinic type */
  polyclinicType: PolyclinicType;

  /** Description */
  description?: string;

  /** Physical location */
  location?: string;

  /** Floor */
  floor?: string;

  /** Queue prefix (e.g., "A", "B") */
  queuePrefix?: string;

  /** SatuSehat location ID */
  satusehatLocationId?: string;

  /** BPJS polyclinic code */
  bpjsPoliCode?: string;

  /** Operating hours (JSON) */
  operatingHours?: Record<unknown>;

  /** Whether polyclinic is active */
  isActive: boolean;

  /** SatuSehat sync status */
  isSatusehatSynced: boolean;

  /** When synced to SatuSehat */
  satusehatSyncedAt?: utcDateTime;

  /** SatuSehat sync error message */
  satusehatSyncError?: string;

  /** JKN sync status */
  isJknSynced: boolean;

  /** When synced to JKN */
  jknSyncedAt?: utcDateTime;

  /** JKN sync error message */
  jknSyncError?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Practitioner schedule
 */
model PractitionerSchedule {
  /** Unique identifier */
  id: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Polyclinic ID */
  polyclinicId: string;

  /** Day of week */
  dayOfWeek: DayOfWeek;

  /** Start time (HH:mm) */
  @example("08:00")
  startTime: string;

  /** End time (HH:mm) */
  @example("12:00")
  endTime: string;

  /** Whether schedule is available */
  isAvailable: boolean;

  /** Effective from date */
  effectiveFrom: plainDate;

  /** Effective to date (null = ongoing) */
  effectiveTo?: plainDate;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Appointment slot (time slot for booking)
 */
model AppointmentSlot {
  /** Unique identifier */
  id: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Polyclinic ID */
  polyclinicId: string;

  /** Slot date */
  slotDate: plainDate;

  /** Start time (HH:mm) */
  startTime: string;

  /** End time (HH:mm) */
  endTime: string;

  /** Duration in minutes */
  duration: string;

  /** Whether slot is available */
  isAvailable: boolean;

  /** Whether slot is booked */
  isBooked: boolean;

  /** Who booked (user ID) */
  bookedBy?: string;

  /** When booked */
  bookedAt?: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Request Models ---

/** Request body for creating a practitioner */
model CreatePractitionerRequest {
  /** Branch ID */
  branchId?: string;

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
  gender?: Gender;

  /** Date of birth */
  dateOfBirth?: plainDate;

  /** Phone */
  phone?: string;

  /** Mobile */
  mobile?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Practitioner type */
  practitionerType: PractitionerType;

  /** Specialty */
  specialty?: Specialty;

  /** License number */
  licenseNumber?: string;

  /** License expiry */
  licenseExpiry?: plainDate;

  /** NIP */
  nip?: string;

  /** STR */
  str?: string;

  /** SIP */
  sip?: string;

  /** Bio */
  bio?: string;
}

/** Request body for updating a practitioner */
model UpdatePractitionerRequest {
  /** First name */
  firstName?: string;

  /** Last name */
  lastName?: string;

  /** Phone */
  phone?: string;

  /** Mobile */
  mobile?: string;

  /** Email */
  @format("email")
  email?: string;

  /** Specialty */
  specialty?: Specialty;

  /** License number */
  licenseNumber?: string;

  /** License expiry */
  licenseExpiry?: plainDate;

  /** NIP */
  nip?: string;

  /** STR */
  str?: string;

  /** SIP */
  sip?: string;

  /** Bio */
  bio?: string;

  /** Active status */
  isActive?: boolean;
}

/** Request body for creating a polyclinic */
model CreatePolyclinicRequest {
  /** Branch ID */
  branchId?: string;

  /** Polyclinic code */
  @minLength(1)
  @maxLength(20)
  polyclinicCode: string;

  /** Polyclinic name */
  @minLength(1)
  @maxLength(255)
  polyclinicName: string;

  /** Indonesian name */
  polyclinicNameId?: string;

  /** Polyclinic type */
  polyclinicType: PolyclinicType;

  /** Description */
  description?: string;

  /** Location */
  location?: string;

  /** Floor */
  floor?: string;

  /** Queue prefix */
  queuePrefix?: string;

  /** BPJS poli code */
  bpjsPoliCode?: string;

  /** Operating hours */
  operatingHours?: Record<unknown>;
}

/** Request body for creating a schedule */
model CreatePractitionerScheduleRequest {
  /** Polyclinic ID */
  polyclinicId: string;

  /** Day of week */
  dayOfWeek: DayOfWeek;

  /** Start time (HH:mm) */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  startTime: string;

  /** End time (HH:mm) */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  endTime: string;

  /** Effective from */
  effectiveFrom: plainDate;

  /** Effective to */
  effectiveTo?: plainDate;

  /** Notes */
  notes?: string;
}

/** Request body for updating a polyclinic */
model UpdatePolyclinicRequest {
  /** Polyclinic name */
  polyclinicName?: string;

  /** Indonesian name */
  polyclinicNameId?: string;

  /** Description */
  description?: string;

  /** Location */
  location?: string;

  /** Floor */
  floor?: string;

  /** Queue prefix */
  queuePrefix?: string;

  /** BPJS poli code */
  bpjsPoliCode?: string;

  /** Operating hours */
  operatingHours?: Record<unknown>;

  /** Is active */
  isActive?: boolean;
}

/** Request body for updating a schedule */
model UpdatePractitionerScheduleRequest {
  /** Start time (HH:mm) */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  startTime?: string;

  /** End time (HH:mm) */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  endTime?: string;

  /** Is available */
  isAvailable?: boolean;

  /** Effective to */
  effectiveTo?: plainDate;

  /** Notes */
  notes?: string;
}

/** Request body for generating slots */
model GenerateSlotsRequest {
  /** Schedule ID */
  @minLength(1)
  scheduleId: string;

  /** Date from */
  dateFrom: plainDate;

  /** Date to */
  dateTo: plainDate;

  /** Slot duration in minutes */
  @minValue(5)
  slotDurationMinutes?: int32;
}

/** Request body for blocking a slot */
model BlockSlotRequest {
  /** Reason for blocking */
  reason?: string;
}

// --- Response Models ---

/** Single practitioner response */
model PractitionerResponse is SingleResourceResponse<Practitioner>;

/** Practitioner list response */
model PractitionerListResponse is CollectionResponse<Practitioner>;

/** Single polyclinic response */
model PolyclinicResponse is SingleResourceResponse<Polyclinic>;

/** Polyclinic list response */
model PolyclinicListResponse is CollectionResponse<Polyclinic>;

/** Single schedule response */
model PractitionerScheduleResponse is SingleResourceResponse<PractitionerSchedule>;

/** Schedule list response */
model PractitionerScheduleListResponse is CollectionResponse<PractitionerSchedule>;

/** Single slot response */
model AppointmentSlotResponse is SingleResourceResponse<AppointmentSlot>;

/** Slot list response */
model AppointmentSlotListResponse is CollectionResponse<AppointmentSlot>;

/** Practitioner with schedules */
model PractitionerWithSchedulesResponse {
  data: {
    ...Practitioner;
    schedules?: PractitionerSchedule[];
    polyclinics?: Polyclinic[];
  };
  meta: ResponseMeta;
}

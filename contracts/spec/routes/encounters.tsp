/**
 * ============================================================================
 * ENCOUNTERS API - Medical Encounter Management
 * ============================================================================
 *
 * Clinical encounter management with:
 * - Encounters/visits
 * - Vital signs
 * - Diagnoses (ICD-10)
 * - Prescriptions
 * - Procedures
 * - Referrals
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/encounter.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// ENCOUNTERS
// ============================================================================

/**
 * Encounters API
 *
 * Medical visit/encounter management
 */
@route("/v1/orgs/{orgId}/encounters")
@tag("Encounters")
interface Encounters {
  /**
   * List encounters
   */
  @get
  @summary("List encounters")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by practitioner */
    @query practitionerId?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate,

    /** Filter by status */
    @query status?: string,

    /** Filter by encounter class */
    @query encounterClass?: string
  ): EncounterListResponse | ErrorResponse;

  /**
   * Create encounter
   */
  @post
  @summary("Create encounter")
  create(
    @path orgId: string,
    @body body: CreateEncounterRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: EncounterResponse;
      }
    | ErrorResponse;

  /**
   * Get encounter by ID
   */
  @route("/{encounterId}")
  @get
  @summary("Get encounter")
  get(
    @path orgId: string,
    @path encounterId: string
  ): EncounterResponse | ErrorResponse;

  /**
   * Update encounter
   */
  @route("/{encounterId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update encounter")
  update(
    @path orgId: string,
    @path encounterId: string,
    @body body: UpdateEncounterRequest
  ): EncounterResponse | ErrorResponse;

  /**
   * Complete encounter
   */
  @route("/{encounterId}/complete")
  @post
  @summary("Complete encounter")
  complete(
    @path orgId: string,
    @path encounterId: string
  ): EncounterResponse | ErrorResponse;

  /**
   * Cancel encounter
   */
  @route("/{encounterId}/cancel")
  @post
  @summary("Cancel encounter")
  cancel(
    @path orgId: string,
    @path encounterId: string
  ): EncounterResponse | ErrorResponse;
}

// ============================================================================
// VITAL SIGNS
// ============================================================================

/**
 * Vital Signs API
 */
@route("/v1/orgs/{orgId}/encounters/{encounterId}/vital-signs")
@tag("Encounters")
interface VitalSignsApi {
  /**
   * Get vital signs for encounter
   */
  @get
  @summary("Get vital signs")
  get(
    @path orgId: string,
    @path encounterId: string
  ): VitalSignsResponse | ErrorResponse;

  /**
   * Record vital signs
   */
  @post
  @summary("Record vital signs")
  create(
    @path orgId: string,
    @path encounterId: string,
    @body body: RecordVitalSignsRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: VitalSignsResponse;
      }
    | ErrorResponse;

  /**
   * Update vital signs
   */
  @patch(#{ implicitOptionality: true })
  @summary("Update vital signs")
  update(
    @path orgId: string,
    @path encounterId: string,
    @body body: RecordVitalSignsRequest
  ): VitalSignsResponse | ErrorResponse;
}

// ============================================================================
// DIAGNOSES
// ============================================================================

/**
 * Diagnoses API
 */
@route("/v1/orgs/{orgId}/encounters/{encounterId}/diagnoses")
@tag("Encounters")
interface Diagnoses {
  /**
   * List diagnoses for encounter
   */
  @get
  @summary("List diagnoses")
  list(
    @path orgId: string,
    @path encounterId: string
  ): DiagnosisListResponse | ErrorResponse;

  /**
   * Add diagnosis
   */
  @post
  @summary("Add diagnosis")
  create(
    @path orgId: string,
    @path encounterId: string,
    @body body: CreateDiagnosisRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: DiagnosisResponse;
      }
    | ErrorResponse;

  /**
   * Update diagnosis
   */
  @route("/{diagnosisId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update diagnosis")
  update(
    @path orgId: string,
    @path encounterId: string,
    @path diagnosisId: string,
    @body body: UpdateDiagnosisRequest
  ): DiagnosisResponse | ErrorResponse;

  /**
   * Delete diagnosis
   */
  @route("/{diagnosisId}")
  @delete
  @summary("Delete diagnosis")
  delete(
    @path orgId: string,
    @path encounterId: string,
    @path diagnosisId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// PRESCRIPTIONS
// ============================================================================

/**
 * Prescriptions API
 */
@route("/v1/orgs/{orgId}/encounters/{encounterId}/prescriptions")
@tag("Encounters")
interface Prescriptions {
  /**
   * List prescriptions for encounter
   */
  @get
  @summary("List prescriptions")
  list(
    @path orgId: string,
    @path encounterId: string
  ): PrescriptionListResponse | ErrorResponse;

  /**
   * Create prescription
   */
  @post
  @summary("Create prescription")
  create(
    @path orgId: string,
    @path encounterId: string,
    @body body: CreatePrescriptionRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PrescriptionResponse;
      }
    | ErrorResponse;

  /**
   * Get prescription
   */
  @route("/{prescriptionId}")
  @get
  @summary("Get prescription")
  get(
    @path orgId: string,
    @path encounterId: string,
    @path prescriptionId: string
  ): PrescriptionResponse | ErrorResponse;

  /**
   * Sign off prescription
   */
  @route("/{prescriptionId}/sign-off")
  @post
  @summary("Sign off prescription")
  signOff(
    @path orgId: string,
    @path encounterId: string,
    @path prescriptionId: string
  ): PrescriptionResponse | ErrorResponse;

  /**
   * Cancel prescription
   */
  @route("/{prescriptionId}/cancel")
  @post
  @summary("Cancel prescription")
  cancel(
    @path orgId: string,
    @path encounterId: string,
    @path prescriptionId: string
  ): PrescriptionResponse | ErrorResponse;
}

// ============================================================================
// PROCEDURES
// ============================================================================

/**
 * Procedures API
 */
@route("/v1/orgs/{orgId}/encounters/{encounterId}/procedures")
@tag("Encounters")
interface Procedures {
  /**
   * List procedures for encounter
   */
  @get
  @summary("List procedures")
  list(
    @path orgId: string,
    @path encounterId: string
  ): ProcedureListResponse | ErrorResponse;

  /**
   * Add procedure
   */
  @post
  @summary("Add procedure")
  create(
    @path orgId: string,
    @path encounterId: string,
    @body body: CreateProcedureRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: ProcedureResponse;
      }
    | ErrorResponse;

  /**
   * Update procedure
   */
  @route("/{procedureId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update procedure")
  update(
    @path orgId: string,
    @path encounterId: string,
    @path procedureId: string,
    @body body: UpdateProcedureRequest
  ): ProcedureResponse | ErrorResponse;

  /**
   * Complete procedure
   */
  @route("/{procedureId}/complete")
  @post
  @summary("Complete procedure")
  complete(
    @path orgId: string,
    @path encounterId: string,
    @path procedureId: string
  ): ProcedureResponse | ErrorResponse;
}

// ============================================================================
// REFERRALS
// ============================================================================

/**
 * Referrals API
 */
@route("/v1/orgs/{orgId}/encounters/{encounterId}/referrals")
@tag("Encounters")
interface Referrals {
  /**
   * List referrals for encounter
   */
  @get
  @summary("List referrals")
  list(
    @path orgId: string,
    @path encounterId: string
  ): ReferralListResponse | ErrorResponse;

  /**
   * Create referral
   */
  @post
  @summary("Create referral")
  create(
    @path orgId: string,
    @path encounterId: string,
    @body body: CreateReferralRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: ReferralResponse;
      }
    | ErrorResponse;

  /**
   * Get referral
   */
  @route("/{referralId}")
  @get
  @summary("Get referral")
  get(
    @path orgId: string,
    @path encounterId: string,
    @path referralId: string
  ): ReferralResponse | ErrorResponse;
}

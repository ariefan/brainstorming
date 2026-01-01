/**
 * ============================================================================
 * INPATIENT API ROUTES
 * ============================================================================
 *
 * Hospital inpatient management:
 * - Wards
 * - Beds
 * - Admissions
 * - Nursing Notes
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/inpatient.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// WARDS
// ============================================================================

/**
 * Ward API
 *
 * Hospital ward management
 */
@route("/v1/orgs/{orgId}/inpatient/wards")
@tag("Inpatient")
interface Wards {
  /**
   * List wards
   */
  @get
  @summary("List wards")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by room class */
    @query roomClass?: string,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Include availability stats */
    @query includeAvailability?: boolean
  ): WardListResponse | ErrorResponse;

  /**
   * Create ward
   */
  @post
  @summary("Create ward")
  create(
    @path orgId: string,
    @body body: CreateWardRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: WardResponse;
      }
    | ErrorResponse;

  /**
   * Get ward
   */
  @route("/{wardId}")
  @get
  @summary("Get ward")
  get(
    @path orgId: string,
    @path wardId: string
  ): WardResponse | ErrorResponse;

  /**
   * Update ward
   */
  @route("/{wardId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update ward")
  update(
    @path orgId: string,
    @path wardId: string,
    @body body: UpdateWardRequest
  ): WardResponse | ErrorResponse;

  /**
   * Delete ward
   */
  @route("/{wardId}")
  @delete
  @summary("Delete ward")
  delete(
    @path orgId: string,
    @path wardId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// BEDS
// ============================================================================

/**
 * Bed API
 *
 * Hospital bed management
 */
@route("/v1/orgs/{orgId}/inpatient/beds")
@tag("Inpatient")
interface Beds {
  /**
   * List beds
   */
  @get
  @summary("List beds")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by ward */
    @query wardId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by room number */
    @query roomNumber?: string
  ): BedListResponse | ErrorResponse;

  /**
   * Create bed
   */
  @post
  @summary("Create bed")
  create(
    @path orgId: string,
    @body body: CreateBedRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: BedResponse;
      }
    | ErrorResponse;

  /**
   * Get bed
   */
  @route("/{bedId}")
  @get
  @summary("Get bed")
  get(
    @path orgId: string,
    @path bedId: string
  ): BedResponse | ErrorResponse;

  /**
   * Update bed status
   */
  @route("/{bedId}/status")
  @patch(#{ implicitOptionality: true })
  @summary("Update bed status")
  updateStatus(
    @path orgId: string,
    @path bedId: string,
    @body body: UpdateBedStatusRequest
  ): BedResponse | ErrorResponse;

  /**
   * Delete bed
   */
  @route("/{bedId}")
  @delete
  @summary("Delete bed")
  delete(
    @path orgId: string,
    @path bedId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// ADMISSIONS
// ============================================================================

/**
 * Admission API
 *
 * Inpatient admission management
 */
@route("/v1/orgs/{orgId}/inpatient/admissions")
@tag("Inpatient")
interface Admissions {
  /**
   * List admissions
   */
  @get
  @summary("List admissions")
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

    /** Filter by ward */
    @query wardId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by admission type */
    @query admissionType?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): AdmissionListResponse | ErrorResponse;

  /**
   * Create admission (admit patient)
   */
  @post
  @summary("Admit patient")
  create(
    @path orgId: string,
    @body body: CreateAdmissionRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: AdmissionResponse;
      }
    | ErrorResponse;

  /**
   * Get admission
   */
  @route("/{admissionId}")
  @get
  @summary("Get admission")
  get(
    @path orgId: string,
    @path admissionId: string
  ): AdmissionResponse | ErrorResponse;

  /**
   * Transfer patient
   */
  @route("/{admissionId}/transfer")
  @post
  @summary("Transfer patient to different ward/bed")
  transfer(
    @path orgId: string,
    @path admissionId: string,
    @body body: TransferAdmissionRequest
  ): AdmissionResponse | ErrorResponse;

  /**
   * Discharge patient
   */
  @route("/{admissionId}/discharge")
  @post
  @summary("Discharge patient")
  discharge(
    @path orgId: string,
    @path admissionId: string,
    @body body: DischargeAdmissionRequest
  ): AdmissionResponse | ErrorResponse;
}

// ============================================================================
// NURSING NOTES
// ============================================================================

/**
 * Nursing Note API
 *
 * Inpatient care documentation
 */
@route("/v1/orgs/{orgId}/inpatient/nursing-notes")
@tag("Inpatient")
interface NursingNotes {
  /**
   * List nursing notes
   */
  @get
  @summary("List nursing notes")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by admission */
    @query admissionId?: string,

    /** Filter by note type */
    @query noteType?: string,

    /** Filter by shift */
    @query shift?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): NursingNoteListResponse | ErrorResponse;

  /**
   * Create nursing note
   */
  @post
  @summary("Create nursing note")
  create(
    @path orgId: string,
    @body body: CreateNursingNoteRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: NursingNoteResponse;
      }
    | ErrorResponse;

  /**
   * Get nursing note
   */
  @route("/{noteId}")
  @get
  @summary("Get nursing note")
  get(
    @path orgId: string,
    @path noteId: string
  ): NursingNoteResponse | ErrorResponse;
}

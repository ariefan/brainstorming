/**
 * ============================================================================
 * ASSESSMENT API ROUTES
 * ============================================================================
 *
 * Clinical assessments:
 * - Triage
 * - Nursing assessments
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/assessment.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// TRIAGE
// ============================================================================

/**
 * Triage Assessment API
 */
@route("/v1/orgs/{orgId}/assessments/triage")
@tag("Assessments")
interface TriageAssessments {
  /**
   * List triage assessments
   */
  @get
  @summary("List triage assessments")
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

    /** Filter by encounter */
    @query encounterId?: string,

    /** Filter by triage level */
    @query triageLevel?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): TriageAssessmentListResponse | ErrorResponse;

  /**
   * Create triage assessment
   */
  @post
  @summary("Create triage assessment")
  create(
    @path orgId: string,
    @body body: CreateTriageAssessmentRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: TriageAssessmentResponse;
      }
    | ErrorResponse;

  /**
   * Get triage assessment
   */
  @route("/{assessmentId}")
  @get
  @summary("Get triage assessment")
  get(
    @path orgId: string,
    @path assessmentId: string
  ): TriageAssessmentResponse | ErrorResponse;
}

// ============================================================================
// NURSING ASSESSMENTS
// ============================================================================

/**
 * Nursing Assessment API
 */
@route("/v1/orgs/{orgId}/assessments/nursing")
@tag("Assessments")
interface NursingAssessments {
  /**
   * List nursing assessments
   */
  @get
  @summary("List nursing assessments")
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

    /** Filter by encounter */
    @query encounterId?: string,

    /** Filter by assessment type */
    @query assessmentType?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): NursingAssessmentListResponse | ErrorResponse;

  /**
   * Create nursing assessment
   */
  @post
  @summary("Create nursing assessment")
  create(
    @path orgId: string,
    @body body: CreateNursingAssessmentRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: NursingAssessmentResponse;
      }
    | ErrorResponse;

  /**
   * Get nursing assessment
   */
  @route("/{assessmentId}")
  @get
  @summary("Get nursing assessment")
  get(
    @path orgId: string,
    @path assessmentId: string
  ): NursingAssessmentResponse | ErrorResponse;
}

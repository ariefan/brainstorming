/**
 * ============================================================================
 * LABORATORY API - Lab Order and Result Management
 * ============================================================================
 *
 * Laboratory management with:
 * - Lab test definitions
 * - Lab orders and queue
 * - Specimen collection
 * - Results and verification
 * - Diagnostic reports
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/laboratory.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// LAB TESTS
// ============================================================================

/**
 * Lab Tests API
 *
 * Lab test definitions and reference ranges
 */
@route("/v1/orgs/{orgId}/lab-tests")
@tag("Laboratory")
interface LabTests {
  /**
   * List lab tests
   */
  @get
  @summary("List lab tests")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by category */
    @query category?: string,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Search by name or code */
    @query search?: string
  ): LabTestListResponse | ErrorResponse;

  /**
   * Create lab test
   */
  @post
  @summary("Create lab test")
  create(
    @path orgId: string,
    @body body: CreateLabTestRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: LabTestResponse;
      }
    | ErrorResponse;

  /**
   * Get lab test
   */
  @route("/{testId}")
  @get
  @summary("Get lab test")
  get(
    @path orgId: string,
    @path testId: string
  ): LabTestResponse | ErrorResponse;

  /**
   * Update lab test
   */
  @route("/{testId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update lab test")
  update(
    @path orgId: string,
    @path testId: string,
    @body body: UpdateLabTestRequest
  ): LabTestResponse | ErrorResponse;

  /**
   * Delete lab test
   */
  @route("/{testId}")
  @delete
  @summary("Delete lab test")
  delete(
    @path orgId: string,
    @path testId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// LAB ORDERS
// ============================================================================

/**
 * Lab Orders API
 *
 * Lab order management
 */
@route("/v1/orgs/{orgId}/lab-orders")
@tag("Laboratory")
interface LabOrders {
  /**
   * List lab orders
   */
  @get
  @summary("List lab orders")
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

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate,

    /** Filter by status */
    @query status?: string,

    /** Filter by priority */
    @query priority?: string
  ): LabOrderListResponse | ErrorResponse;

  /**
   * Create lab order
   */
  @post
  @summary("Create lab order")
  create(
    @path orgId: string,
    @body body: CreateLabOrderRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: LabOrderResponse;
      }
    | ErrorResponse;

  /**
   * Get lab order
   */
  @route("/{orderId}")
  @get
  @summary("Get lab order")
  get(
    @path orgId: string,
    @path orderId: string
  ): LabOrderResponse | ErrorResponse;

  /**
   * Update lab order status
   */
  @route("/{orderId}/status")
  @patch(#{ implicitOptionality: true })
  @summary("Update lab order status")
  updateStatus(
    @path orgId: string,
    @path orderId: string,
    @body body: UpdateLabOrderStatusRequest
  ): LabOrderResponse | ErrorResponse;

  /**
   * Cancel lab order
   */
  @route("/{orderId}/cancel")
  @post
  @summary("Cancel lab order")
  cancel(
    @path orgId: string,
    @path orderId: string
  ): LabOrderResponse | ErrorResponse;
}

// ============================================================================
// SPECIMENS
// ============================================================================

/**
 * Specimens API
 *
 * Specimen collection and tracking
 */
@route("/v1/orgs/{orgId}/specimens")
@tag("Laboratory")
interface Specimens {
  /**
   * List specimens
   */
  @get
  @summary("List specimens")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by status */
    @query status?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): SpecimenListResponse | ErrorResponse;

  /**
   * Collect specimen
   */
  @post
  @summary("Collect specimen")
  collect(
    @path orgId: string,
    @body body: CollectSpecimenRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: SpecimenResponse;
      }
    | ErrorResponse;

  /**
   * Get specimen
   */
  @route("/{specimenId}")
  @get
  @summary("Get specimen")
  get(
    @path orgId: string,
    @path specimenId: string
  ): SpecimenResponse | ErrorResponse;

  /**
   * Receive specimen at lab
   */
  @route("/{specimenId}/receive")
  @post
  @summary("Receive specimen")
  receive(
    @path orgId: string,
    @path specimenId: string,
    @body body: ReceiveSpecimenRequest
  ): SpecimenResponse | ErrorResponse;

  /**
   * Reject specimen
   */
  @route("/{specimenId}/reject")
  @post
  @summary("Reject specimen")
  reject(
    @path orgId: string,
    @path specimenId: string,
    @body body: ReceiveSpecimenRequest
  ): SpecimenResponse | ErrorResponse;
}

// ============================================================================
// LAB RESULTS
// ============================================================================

/**
 * Lab Results API
 *
 * Lab result entry and verification
 */
@route("/v1/orgs/{orgId}/lab-results")
@tag("Laboratory")
interface LabResults {
  /**
   * List lab results
   */
  @get
  @summary("List lab results")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by order */
    @query orderId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by abnormal */
    @query isAbnormal?: boolean,

    /** Filter by critical */
    @query isCritical?: boolean,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): LabResultListResponse | ErrorResponse;

  /**
   * Enter lab result
   */
  @route("/order-items/{orderItemId}")
  @post
  @summary("Enter lab result")
  enter(
    @path orgId: string,
    @path orderItemId: string,
    @body body: EnterLabResultRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: LabResultResponse;
      }
    | ErrorResponse;

  /**
   * Get lab result
   */
  @route("/{resultId}")
  @get
  @summary("Get lab result")
  get(
    @path orgId: string,
    @path resultId: string
  ): LabResultResponse | ErrorResponse;

  /**
   * Verify lab result
   */
  @route("/{resultId}/verify")
  @post
  @summary("Verify lab result")
  verify(
    @path orgId: string,
    @path resultId: string,
    @body body: VerifyLabResultRequest
  ): LabResultResponse | ErrorResponse;

  /**
   * Unverify lab result
   */
  @route("/{resultId}/unverify")
  @post
  @summary("Unverify lab result")
  unverify(
    @path orgId: string,
    @path resultId: string
  ): LabResultResponse | ErrorResponse;
}

// ============================================================================
// DIAGNOSTIC REPORTS
// ============================================================================

/**
 * Diagnostic Reports API
 *
 * Lab diagnostic report generation
 */
@route("/v1/orgs/{orgId}/diagnostic-reports")
@tag("Laboratory")
interface DiagnosticReports {
  /**
   * List diagnostic reports
   */
  @get
  @summary("List diagnostic reports")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by status */
    @query status?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): DiagnosticReportListResponse | ErrorResponse;

  /**
   * Create diagnostic report
   */
  @post
  @summary("Create diagnostic report")
  create(
    @path orgId: string,
    @body body: CreateDiagnosticReportRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: DiagnosticReportResponse;
      }
    | ErrorResponse;

  /**
   * Get diagnostic report
   */
  @route("/{reportId}")
  @get
  @summary("Get diagnostic report")
  get(
    @path orgId: string,
    @path reportId: string
  ): DiagnosticReportResponse | ErrorResponse;

  /**
   * Finalize diagnostic report
   */
  @route("/{reportId}/finalize")
  @post
  @summary("Finalize diagnostic report")
  finalize(
    @path orgId: string,
    @path reportId: string
  ): DiagnosticReportResponse | ErrorResponse;
}

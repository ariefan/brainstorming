/**
 * ============================================================================
 * REPORTS API ROUTES
 * ============================================================================
 *
 * Report management:
 * - Templates
 * - Schedules
 * - Generation
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/reports.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// REPORT TEMPLATES
// ============================================================================

/**
 * Report Template API
 */
@route("/v1/orgs/{orgId}/reports/templates")
@tag("Reports")
interface ReportTemplates {
  /**
   * List report templates
   */
  @get
  @summary("List report templates")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by category */
    @query category?: string,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Search by name */
    @query search?: string
  ): ReportTemplateListResponse | ErrorResponse;

  /**
   * Create report template
   */
  @post
  @summary("Create report template")
  create(
    @path orgId: string,
    @body body: CreateReportTemplateRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: ReportTemplateResponse;
      }
    | ErrorResponse;

  /**
   * Get report template
   */
  @route("/{templateId}")
  @get
  @summary("Get report template")
  get(
    @path orgId: string,
    @path templateId: string
  ): ReportTemplateResponse | ErrorResponse;

  /**
   * Update report template
   */
  @route("/{templateId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update report template")
  update(
    @path orgId: string,
    @path templateId: string,
    @body body: UpdateReportTemplateRequest
  ): ReportTemplateResponse | ErrorResponse;

  /**
   * Delete report template
   */
  @route("/{templateId}")
  @delete
  @summary("Delete report template")
  delete(
    @path orgId: string,
    @path templateId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// REPORT SCHEDULES
// ============================================================================

/**
 * Report Schedule API
 */
@route("/v1/orgs/{orgId}/reports/schedules")
@tag("Reports")
interface ReportSchedules {
  /**
   * List report schedules
   */
  @get
  @summary("List report schedules")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by template */
    @query templateId?: string,

    /** Filter by frequency */
    @query frequency?: string,

    /** Filter by active status */
    @query isActive?: boolean
  ): ReportScheduleListResponse | ErrorResponse;

  /**
   * Create report schedule
   */
  @post
  @summary("Create report schedule")
  create(
    @path orgId: string,
    @body body: CreateReportScheduleRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: ReportScheduleResponse;
      }
    | ErrorResponse;

  /**
   * Get report schedule
   */
  @route("/{scheduleId}")
  @get
  @summary("Get report schedule")
  get(
    @path orgId: string,
    @path scheduleId: string
  ): ReportScheduleResponse | ErrorResponse;

  /**
   * Update report schedule
   */
  @route("/{scheduleId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update report schedule")
  update(
    @path orgId: string,
    @path scheduleId: string,
    @body body: UpdateReportScheduleRequest
  ): ReportScheduleResponse | ErrorResponse;

  /**
   * Delete report schedule
   */
  @route("/{scheduleId}")
  @delete
  @summary("Delete report schedule")
  delete(
    @path orgId: string,
    @path scheduleId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;

  /**
   * Run report schedule now
   */
  @route("/{scheduleId}/run")
  @post
  @summary("Run scheduled report now")
  run(
    @path orgId: string,
    @path scheduleId: string
  ): ReportGenerationResponse | ErrorResponse;
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

/**
 * Report Generation API
 */
@route("/v1/orgs/{orgId}/reports/generations")
@tag("Reports")
interface ReportGenerations {
  /**
   * List generated reports
   */
  @get
  @summary("List generated reports")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by template */
    @query templateId?: string,

    /** Filter by schedule */
    @query scheduleId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): ReportGenerationListResponse | ErrorResponse;

  /**
   * Generate report
   */
  @post
  @summary("Generate report")
  create(
    @path orgId: string,
    @body body: GenerateReportRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: ReportGenerationResponse;
      }
    | ErrorResponse;

  /**
   * Get generated report
   */
  @route("/{generationId}")
  @get
  @summary("Get generated report")
  get(
    @path orgId: string,
    @path generationId: string
  ): ReportGenerationResponse | ErrorResponse;

  /**
   * Download generated report
   */
  @route("/{generationId}/download")
  @get
  @summary("Download generated report file")
  download(
    @path orgId: string,
    @path generationId: string
  ):
    | {
        @statusCode statusCode: 302;
        @header("Location") location: string;
      }
    | ErrorResponse;

  /**
   * Cancel report generation
   */
  @route("/{generationId}/cancel")
  @post
  @summary("Cancel pending report generation")
  cancel(
    @path orgId: string,
    @path generationId: string
  ): ReportGenerationResponse | ErrorResponse;
}

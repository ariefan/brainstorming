/**
 * ============================================================================
 * INTEGRATIONS API - SatuSehat and JKN/BPJS Integration
 * ============================================================================
 *
 * Healthcare integration management with:
 * - SatuSehat FHIR R4 configuration per tenant
 * - JKN/BPJS API configuration per tenant
 * - Sync queue management
 * - Error logs
 * - Dashboard
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/integration.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// SATUSEHAT CONFIG
// ============================================================================

/**
 * SatuSehat Config API
 *
 * SatuSehat FHIR R4 integration configuration per tenant
 */
@route("/v1/orgs/{orgId}/integrations/satusehat")
@tag("Integrations")
interface SatusehatConfigs {
  /**
   * List SatuSehat configurations
   */
  @get
  @summary("List SatuSehat configs")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by environment */
    @query environment?: string,

    /** Filter by active status */
    @query isActive?: boolean
  ): SatusehatConfigListResponse | ErrorResponse;

  /**
   * Create SatuSehat configuration
   */
  @post
  @summary("Create SatuSehat config")
  create(
    @path orgId: string,
    @body body: CreateSatusehatConfigRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: SatusehatConfigResponse;
      }
    | ErrorResponse;

  /**
   * Get SatuSehat configuration
   */
  @route("/{configId}")
  @get
  @summary("Get SatuSehat config")
  get(
    @path orgId: string,
    @path configId: string
  ): SatusehatConfigResponse | ErrorResponse;

  /**
   * Update SatuSehat configuration
   */
  @route("/{configId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update SatuSehat config")
  update(
    @path orgId: string,
    @path configId: string,
    @body body: UpdateSatusehatConfigRequest
  ): SatusehatConfigResponse | ErrorResponse;

  /**
   * Delete SatuSehat configuration
   */
  @route("/{configId}")
  @delete
  @summary("Delete SatuSehat config")
  delete(
    @path orgId: string,
    @path configId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;

  /**
   * Test SatuSehat connection
   */
  @route("/{configId}/test")
  @post
  @summary("Test SatuSehat connection")
  test(
    @path orgId: string,
    @path configId: string,
    @body body: TestIntegrationRequest
  ): IntegrationTestResponse | ErrorResponse;

  /**
   * Refresh SatuSehat access token
   */
  @route("/{configId}/refresh-token")
  @post
  @summary("Refresh SatuSehat token")
  refreshToken(
    @path orgId: string,
    @path configId: string
  ): SatusehatConfigResponse | ErrorResponse;
}

// ============================================================================
// JKN CONFIG
// ============================================================================

/**
 * JKN Config API
 *
 * JKN/BPJS Kesehatan API configuration per tenant
 */
@route("/v1/orgs/{orgId}/integrations/jkn")
@tag("Integrations")
interface JknConfigs {
  /**
   * List JKN configurations
   */
  @get
  @summary("List JKN configs")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by API type */
    @query apiType?: string,

    /** Filter by environment */
    @query environment?: string,

    /** Filter by active status */
    @query isActive?: boolean
  ): JknConfigListResponse | ErrorResponse;

  /**
   * Create JKN configuration
   */
  @post
  @summary("Create JKN config")
  create(
    @path orgId: string,
    @body body: CreateJknConfigRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: JknConfigResponse;
      }
    | ErrorResponse;

  /**
   * Get JKN configuration
   */
  @route("/{configId}")
  @get
  @summary("Get JKN config")
  get(
    @path orgId: string,
    @path configId: string
  ): JknConfigResponse | ErrorResponse;

  /**
   * Update JKN configuration
   */
  @route("/{configId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update JKN config")
  update(
    @path orgId: string,
    @path configId: string,
    @body body: UpdateJknConfigRequest
  ): JknConfigResponse | ErrorResponse;

  /**
   * Delete JKN configuration
   */
  @route("/{configId}")
  @delete
  @summary("Delete JKN config")
  delete(
    @path orgId: string,
    @path configId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;

  /**
   * Test JKN connection
   */
  @route("/{configId}/test")
  @post
  @summary("Test JKN connection")
  test(
    @path orgId: string,
    @path configId: string,
    @body body: TestIntegrationRequest
  ): IntegrationTestResponse | ErrorResponse;
}

// ============================================================================
// SYNC QUEUE
// ============================================================================

/**
 * Integration Sync Queue API
 *
 * Manage sync queue for SatuSehat and JKN
 */
@route("/v1/orgs/{orgId}/integrations/sync-queue")
@tag("Integrations")
interface IntegrationSyncQueues {
  /**
   * List sync queue entries
   */
  @get
  @summary("List sync queue")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by integration type */
    @query integrationType?: string,

    /** Filter by resource type */
    @query resourceType?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by operation */
    @query operation?: string
  ): IntegrationSyncQueueListResponse | ErrorResponse;

  /**
   * Get sync queue entry
   */
  @route("/{queueId}")
  @get
  @summary("Get sync queue entry")
  get(
    @path orgId: string,
    @path queueId: string
  ): IntegrationSyncQueueResponse | ErrorResponse;

  /**
   * Retry failed sync
   */
  @route("/retry")
  @post
  @summary("Retry failed syncs")
  retry(
    @path orgId: string,
    @body body: RetrySyncRequest
  ): IntegrationSyncQueueListResponse | ErrorResponse;

  /**
   * Cancel pending sync
   */
  @route("/{queueId}/cancel")
  @post
  @summary("Cancel pending sync")
  cancel(
    @path orgId: string,
    @path queueId: string
  ): IntegrationSyncQueueResponse | ErrorResponse;
}

// ============================================================================
// ERROR LOGS
// ============================================================================

/**
 * Integration Error Logs API
 */
@route("/v1/orgs/{orgId}/integrations/error-logs")
@tag("Integrations")
interface IntegrationErrorLogs {
  /**
   * List error logs
   */
  @get
  @summary("List integration error logs")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by integration type */
    @query integrationType?: string,

    /** Filter by error category */
    @query errorCategory?: string,

    /** Filter by resolution status */
    @query resolution?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): IntegrationErrorLogListResponse | ErrorResponse;

  /**
   * Get error log
   */
  @route("/{logId}")
  @get
  @summary("Get integration error log")
  get(
    @path orgId: string,
    @path logId: string
  ): IntegrationErrorLogResponse | ErrorResponse;

  /**
   * Resolve error
   */
  @route("/{logId}/resolve")
  @post
  @summary("Resolve integration error")
  resolve(
    @path orgId: string,
    @path logId: string
  ): IntegrationErrorLogResponse | ErrorResponse;

  /**
   * Ignore error
   */
  @route("/{logId}/ignore")
  @post
  @summary("Ignore integration error")
  ignore(
    @path orgId: string,
    @path logId: string
  ): IntegrationErrorLogResponse | ErrorResponse;
}

// ============================================================================
// DASHBOARD
// ============================================================================

/**
 * Integration Dashboard API
 */
@route("/v1/orgs/{orgId}/integrations/dashboard")
@tag("Integrations")
interface IntegrationDashboard {
  /**
   * Get integration dashboard
   */
  @get
  @summary("Get integration dashboard")
  get(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string
  ): IntegrationDashboardResponse | ErrorResponse;
}

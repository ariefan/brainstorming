import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// INTEGRATION CONFIG MODELS
// ============================================================================
// Configuration for Indonesian healthcare integrations per tenant/clinic
// - SatuSehat (FHIR R4 National Health Platform)
// - JKN/BPJS Kesehatan (National Health Insurance)
// ============================================================================

/**
 * SatuSehat configuration per tenant
 *
 * Stores OAuth2 credentials and settings for SatuSehat FHIR integration.
 * Each organization can have its own SatuSehat credentials.
 */
model SatusehatConfig {
  /** Unique identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID (optional - config can be org-wide or branch-specific) */
  branchId?: string;

  /** Environment (sandbox or production) */
  environment: "sandbox" | "production";

  /** OAuth2 client ID */
  clientId: string;

  /** OAuth2 client secret (masked in responses) */
  clientSecretMasked: string;

  /** SatuSehat organization ID */
  satusehatOrgId?: string;

  /** Auth URL */
  authUrl: string;

  /** API base URL */
  apiUrl: string;

  /** Whether config is active */
  isActive: boolean;

  /** Last health check status */
  healthStatus: "healthy" | "degraded" | "unhealthy" | "unknown";

  /** Last health check time */
  lastHealthCheckAt?: utcDateTime;

  /** Last successful sync time */
  lastSyncAt?: utcDateTime;

  /** Total resources synced */
  totalResourcesSynced?: int32;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * JKN/BPJS Kesehatan configuration per tenant
 *
 * Stores API credentials for all JKN APIs:
 * - VClaim (SEP, Rujukan, Peserta)
 * - Antrean (Queue management)
 * - Apotek (Pharmacy)
 * - Aplicares (Bed availability)
 * - ICare (Mobile integration)
 * - PCare (Primary care)
 * - Rekam Medis (Medical records)
 */
model JknConfig {
  /** Unique identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID (optional) */
  branchId?: string;

  /** JKN API type */
  apiType: "vclaim" | "antrean" | "antreanFktp" | "apotek" | "aplicares" | "icare" | "pcare" | "rekamMedis";

  /** Environment */
  environment: "development" | "production";

  /** Consumer ID (cons_id) */
  consId: string;

  /** Secret key (masked in responses) */
  secretKeyMasked: string;

  /** User key (masked in responses) */
  userKeyMasked: string;

  /** PPK Pelayanan (facility code) */
  ppkPelayanan?: string;

  /** PPK BPJS code */
  ppkBpjs?: string;

  /** Facility type */
  facilityType?: BpjsFacilityType;

  /** API base URL */
  baseUrl: string;

  /** Whether config is active */
  isActive: boolean;

  /** Last health check status */
  healthStatus: "healthy" | "degraded" | "unhealthy" | "unknown";

  /** Last health check time */
  lastHealthCheckAt?: utcDateTime;

  /** Last successful sync time */
  lastSyncAt?: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Integration sync queue entry
 *
 * Tracks pending synchronization operations
 */
model IntegrationSyncQueue {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Integration type */
  integrationType: "satusehat" | "jkn";

  /** Resource type */
  resourceType: string;

  /** Resource ID */
  resourceId: string;

  /** Operation type */
  operation: "create" | "update" | "delete" | "search" | "validate";

  /** Sync status */
  status: "pending" | "processing" | "completed" | "failed" | "skipped";

  /** Priority (lower = higher priority) */
  priority: int32;

  /** Request payload (JSON) */
  requestPayload?: Record<unknown>;

  /** Response payload (JSON) */
  responsePayload?: Record<unknown>;

  /** External ID (from SatuSehat/JKN) */
  externalId?: string;

  /** Error message */
  errorMessage?: string;

  /** Error category */
  errorCategory?: "transient" | "client" | "auth" | "notFound" | "server" | "validation" | "unknown";

  /** Retry count */
  retryCount: int32;

  /** Max retries */
  maxRetries: int32;

  /** Next retry time */
  nextRetryAt?: utcDateTime;

  /** Correlation ID for tracking */
  correlationId?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;

  /** When completed */
  completedAt?: utcDateTime;
}

/**
 * Integration error log
 */
model IntegrationErrorLog {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Integration type */
  integrationType: "satusehat" | "jkn";

  /** Sync queue ID */
  syncQueueId?: string;

  /** Resource type */
  resourceType: string;

  /** Resource ID */
  resourceId?: string;

  /** Error category */
  errorCategory: "transient" | "client" | "auth" | "notFound" | "server" | "validation" | "unknown";

  /** Error code */
  errorCode?: string;

  /** Error message */
  errorMessage: string;

  /** Request payload */
  requestPayload?: Record<unknown>;

  /** Response payload */
  responsePayload?: Record<unknown>;

  /** Stack trace */
  stackTrace?: string;

  /** Resolution status */
  resolution: "pending" | "resolved" | "autoResolved" | "ignored";

  /** Resolved by user ID */
  resolvedBy?: string;

  /** When resolved */
  resolvedAt?: utcDateTime;

  /** Resolution notes */
  resolutionNotes?: string;

  /** When created */
  createdAt: utcDateTime;
}

/**
 * Integration webhook (incoming events from SatuSehat/JKN)
 */
model IntegrationWebhook {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Source */
  source: "satusehat" | "jkn";

  /** Event type */
  eventType: string;

  /** Webhook payload */
  payload: Record<unknown>;

  /** Processing status */
  status: "received" | "processing" | "processed" | "failed" | "ignored";

  /** Error message */
  errorMessage?: string;

  /** Sync queue ID (if created) */
  syncQueueId?: string;

  /** When received */
  receivedAt: utcDateTime;

  /** When processed */
  processedAt?: utcDateTime;
}

// --- Request Models ---

/** Request body for creating SatuSehat config */
model CreateSatusehatConfigRequest {
  /** Branch ID (optional) */
  branchId?: string;

  /** Environment */
  environment: "sandbox" | "production";

  /** OAuth2 client ID */
  @minLength(1)
  clientId: string;

  /** OAuth2 client secret */
  @minLength(1)
  clientSecret: string;

  /** SatuSehat organization ID */
  satusehatOrgId?: string;

  /** Auth URL (optional - defaults based on environment) */
  authUrl?: string;

  /** API URL (optional - defaults based on environment) */
  apiUrl?: string;
}

/** Request body for updating SatuSehat config */
model UpdateSatusehatConfigRequest {
  /** Environment */
  environment?: "sandbox" | "production";

  /** OAuth2 client ID */
  clientId?: string;

  /** OAuth2 client secret (only set if changing) */
  clientSecret?: string;

  /** SatuSehat organization ID */
  satusehatOrgId?: string;

  /** Auth URL */
  authUrl?: string;

  /** API URL */
  apiUrl?: string;

  /** Is active */
  isActive?: boolean;
}

/** Request body for creating JKN config */
model CreateJknConfigRequest {
  /** Branch ID (optional) */
  branchId?: string;

  /** API type */
  apiType: "vclaim" | "antrean" | "antreanFktp" | "apotek" | "aplicares" | "icare" | "pcare" | "rekamMedis";

  /** Environment */
  environment: "development" | "production";

  /** Consumer ID */
  @minLength(1)
  consId: string;

  /** Secret key */
  @minLength(1)
  secretKey: string;

  /** User key */
  @minLength(1)
  userKey: string;

  /** PPK Pelayanan */
  ppkPelayanan?: string;

  /** PPK BPJS */
  ppkBpjs?: string;

  /** Facility type */
  facilityType?: BpjsFacilityType;

  /** Base URL (optional - defaults based on environment) */
  baseUrl?: string;
}

/** Request body for updating JKN config */
model UpdateJknConfigRequest {
  /** Environment */
  environment?: "development" | "production";

  /** Consumer ID */
  consId?: string;

  /** Secret key (only set if changing) */
  secretKey?: string;

  /** User key (only set if changing) */
  userKey?: string;

  /** PPK Pelayanan */
  ppkPelayanan?: string;

  /** PPK BPJS */
  ppkBpjs?: string;

  /** Facility type */
  facilityType?: BpjsFacilityType;

  /** Base URL */
  baseUrl?: string;

  /** Is active */
  isActive?: boolean;
}

/** Request body for testing integration connection */
model TestIntegrationRequest {
  /** Optional specific test to run */
  testType?: "auth" | "search" | "full";
}

/** Request body for retrying sync */
model RetrySyncRequest {
  /** Sync queue IDs to retry */
  syncQueueIds: string[];

  /** Force retry even if max retries reached */
  force?: boolean;
}

// --- Response Models ---

/** Single SatuSehat config response */
model SatusehatConfigResponse is SingleResourceResponse<SatusehatConfig>;

/** SatuSehat config list response */
model SatusehatConfigListResponse is CollectionResponse<SatusehatConfig>;

/** Single JKN config response */
model JknConfigResponse is SingleResourceResponse<JknConfig>;

/** JKN config list response */
model JknConfigListResponse is CollectionResponse<JknConfig>;

/** Integration test result */
model IntegrationTestResponse {
  data: {
    /** Test status */
    status: "success" | "partial" | "failed";

    /** Test results */
    results: {
      /** Test name */
      test: string;

      /** Test passed */
      passed: boolean;

      /** Error message if failed */
      error?: string;

      /** Response time in ms */
      responseTimeMs?: int32;
    }[];

    /** Overall health status */
    healthStatus: "healthy" | "degraded" | "unhealthy";

    /** Timestamp */
    testedAt: utcDateTime;
  };
  meta: ResponseMeta;
}

/** Sync queue response */
model IntegrationSyncQueueResponse is SingleResourceResponse<IntegrationSyncQueue>;

/** Sync queue list response */
model IntegrationSyncQueueListResponse is CollectionResponse<IntegrationSyncQueue>;

/** Error log response */
model IntegrationErrorLogResponse is SingleResourceResponse<IntegrationErrorLog>;

/** Error log list response */
model IntegrationErrorLogListResponse is CollectionResponse<IntegrationErrorLog>;

/** Integration dashboard/summary */
model IntegrationDashboardResponse {
  data: {
    /** SatuSehat stats */
    satusehat: {
      /** Whether configured */
      isConfigured: boolean;

      /** Health status */
      healthStatus: "healthy" | "degraded" | "unhealthy" | "unknown";

      /** Last sync time */
      lastSyncAt?: utcDateTime;

      /** Pending syncs count */
      pendingSyncs: int32;

      /** Failed syncs count */
      failedSyncs: int32;

      /** Total synced today */
      syncedToday: int32;
    };

    /** JKN stats */
    jkn: {
      /** Configured APIs */
      configuredApis: string[];

      /** Health status */
      healthStatus: "healthy" | "degraded" | "unhealthy" | "unknown";

      /** Last sync time */
      lastSyncAt?: utcDateTime;

      /** Pending syncs count */
      pendingSyncs: int32;

      /** Failed syncs count */
      failedSyncs: int32;

      /** Total synced today */
      syncedToday: int32;
    };

    /** Recent errors */
    recentErrors: IntegrationErrorLog[];
  };
  meta: ResponseMeta;
}

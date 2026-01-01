import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// REPORTS MODELS
// ============================================================================
// Report templates, scheduling, and generation
// ============================================================================

// --- Report Template ---

/**
 * Report Template - Reusable report definition
 */
model ReportTemplate {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Template name */
  name: string;

  /** Template name (Indonesian) */
  nameId?: string;

  /** Report category */
  category: ReportCategory;

  /** Description */
  description?: string;

  /** Query/logic definition (JSON) */
  query: Record<unknown>;

  /** Available parameters */
  parameters?: ReportParameter[];

  /** Output columns */
  columns?: ReportColumn[];

  /** Is active */
  isActive: boolean;

  /** Is system template (cannot be deleted) */
  isSystem: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/** Report parameter definition */
model ReportParameter {
  /** Parameter name */
  name: string;

  /** Parameter label */
  label: string;

  /** Parameter type */
  type: "string" | "number" | "date" | "dateRange" | "select" | "multiSelect";

  /** Is required */
  required: boolean;

  /** Default value */
  defaultValue?: string;

  /** Options for select/multiSelect */
  options?: ReportParameterOption[];
}

/** Report parameter option */
model ReportParameterOption {
  /** Value */
  value: string;

  /** Label */
  label: string;
}

/** Report column definition */
model ReportColumn {
  /** Column key */
  key: string;

  /** Column label */
  label: string;

  /** Data type */
  type: "string" | "number" | "date" | "currency" | "boolean";

  /** Column width */
  width?: int32;

  /** Format pattern */
  format?: string;
}

// --- Report Schedule ---

/**
 * Report Schedule - Automated report generation
 */
model ReportSchedule {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Report template ID */
  templateId: string;

  /** Schedule name */
  name: string;

  /** Frequency */
  frequency: ReportFrequency;

  /** Output format */
  format: ReportFormat;

  /** Fixed parameters (JSON) */
  parameters?: Record<unknown>;

  /** Recipients (email addresses) */
  recipients: string[];

  /** Is active */
  isActive: boolean;

  /** Last run time */
  lastRunAt?: utcDateTime;

  /** Next run time */
  nextRunAt?: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Report Generation ---

/**
 * Report Generation - Generated report instance
 */
model ReportGeneration {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Report template ID */
  templateId: string;

  /** Report schedule ID (if scheduled) */
  scheduleId?: string;

  /** Report name */
  name: string;

  /** Output format */
  format: ReportFormat;

  /** Parameters used (JSON) */
  parameters?: Record<unknown>;

  /** Status */
  status: ReportGenerationStatus;

  /** File URL (when completed) */
  fileUrl?: string;

  /** File size (bytes) */
  fileSize?: int64;

  /** Row count */
  rowCount?: int32;

  /** Error message (if failed) */
  errorMessage?: string;

  /** Requested by user ID */
  requestedBy: string;

  /** When started */
  startedAt?: utcDateTime;

  /** When completed */
  completedAt?: utcDateTime;

  /** When created */
  createdAt: utcDateTime;
}

// ============================================================================
// REQUEST MODELS
// ============================================================================

/** Create report template request */
model CreateReportTemplateRequest {
  /** Branch ID */
  branchId?: string;

  /** Template name */
  @minLength(1)
  name: string;

  /** Template name (Indonesian) */
  nameId?: string;

  /** Report category */
  category: ReportCategory;

  /** Description */
  description?: string;

  /** Query/logic definition */
  query: Record<unknown>;

  /** Parameters */
  parameters?: ReportParameter[];

  /** Columns */
  columns?: ReportColumn[];
}

/** Update report template request */
model UpdateReportTemplateRequest {
  /** Template name */
  name?: string;

  /** Template name (Indonesian) */
  nameId?: string;

  /** Description */
  description?: string;

  /** Query/logic definition */
  query?: Record<unknown>;

  /** Parameters */
  parameters?: ReportParameter[];

  /** Columns */
  columns?: ReportColumn[];

  /** Is active */
  isActive?: boolean;
}

/** Create report schedule request */
model CreateReportScheduleRequest {
  /** Branch ID */
  branchId?: string;

  /** Template ID */
  templateId: string;

  /** Schedule name */
  @minLength(1)
  name: string;

  /** Frequency */
  frequency: ReportFrequency;

  /** Format */
  format: ReportFormat;

  /** Fixed parameters */
  parameters?: Record<unknown>;

  /** Recipients */
  recipients: string[];
}

/** Update report schedule request */
model UpdateReportScheduleRequest {
  /** Schedule name */
  name?: string;

  /** Frequency */
  frequency?: ReportFrequency;

  /** Format */
  format?: ReportFormat;

  /** Parameters */
  parameters?: Record<unknown>;

  /** Recipients */
  recipients?: string[];

  /** Is active */
  isActive?: boolean;
}

/** Generate report request */
model GenerateReportRequest {
  /** Template ID */
  templateId: string;

  /** Output format */
  format: ReportFormat;

  /** Parameters */
  parameters?: Record<unknown>;

  /** Custom report name */
  name?: string;
}

// ============================================================================
// RESPONSE MODELS
// ============================================================================

/** Report template response */
model ReportTemplateResponse is SingleResourceResponse<ReportTemplate>;

/** Report template list response */
model ReportTemplateListResponse is CollectionResponse<ReportTemplate>;

/** Report schedule response */
model ReportScheduleResponse is SingleResourceResponse<ReportSchedule>;

/** Report schedule list response */
model ReportScheduleListResponse is CollectionResponse<ReportSchedule>;

/** Report generation response */
model ReportGenerationResponse is SingleResourceResponse<ReportGeneration>;

/** Report generation list response */
model ReportGenerationListResponse is CollectionResponse<ReportGeneration>;

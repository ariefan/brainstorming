/**
 * ============================================================================
 * ACCREDITATION API - Indonesian Healthcare Accreditation
 * ============================================================================
 *
 * Accreditation management with:
 * - Accreditation standards (SNARS, KARS, Kemenkes)
 * - Quality indicators (Indikator Mutu)
 * - Patient safety incidents (IKP)
 * - Clinical audits
 * - Practitioner credentials (STR, SIP)
 * - Document control (SPO, policies)
 * - Infection surveillance (PPI)
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/accreditation.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// ACCREDITATION STANDARDS
// ============================================================================

/**
 * Accreditation Standards API
 */
@route("/v1/orgs/{orgId}/accreditation")
@tag("Accreditation")
interface AccreditationStandards {
  /**
   * List accreditation standards
   */
  @get
  @summary("List accreditation standards")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by accreditation body */
    @query accreditationBody?: string,

    /** Filter by status */
    @query status?: string
  ): AccreditationStandardListResponse | ErrorResponse;

  /**
   * Create accreditation record
   */
  @post
  @summary("Create accreditation record")
  create(
    @path orgId: string,
    @body body: CreateAccreditationStandardRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: AccreditationStandardResponse;
      }
    | ErrorResponse;

  /**
   * Get accreditation record
   */
  @route("/{accreditationId}")
  @get
  @summary("Get accreditation record")
  get(
    @path orgId: string,
    @path accreditationId: string
  ): AccreditationStandardResponse | ErrorResponse;

  /**
   * Update accreditation record
   */
  @route("/{accreditationId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update accreditation record")
  update(
    @path orgId: string,
    @path accreditationId: string,
    @body body: UpdateAccreditationStandardRequest
  ): AccreditationStandardResponse | ErrorResponse;
}

// ============================================================================
// QUALITY INDICATORS
// ============================================================================

/**
 * Quality Indicators API
 */
@route("/v1/orgs/{orgId}/quality-indicators")
@tag("Accreditation")
interface QualityIndicators {
  /**
   * List quality indicators
   */
  @get
  @summary("List quality indicators")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by category */
    @query category?: string,

    /** Filter by active status */
    @query isActive?: boolean
  ): QualityIndicatorListResponse | ErrorResponse;

  /**
   * Create quality indicator
   */
  @post
  @summary("Create quality indicator")
  create(
    @path orgId: string,
    @body body: CreateQualityIndicatorRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: QualityIndicatorResponse;
      }
    | ErrorResponse;

  /**
   * Get quality indicator
   */
  @route("/{indicatorId}")
  @get
  @summary("Get quality indicator")
  get(
    @path orgId: string,
    @path indicatorId: string
  ): QualityIndicatorResponse | ErrorResponse;

  /**
   * Record quality indicator result
   */
  @route("/{indicatorId}/results")
  @post
  @summary("Record quality indicator result")
  recordResult(
    @path orgId: string,
    @path indicatorId: string,
    @body body: RecordQualityIndicatorResultRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: QualityIndicatorResultResponse;
      }
    | ErrorResponse;

  /**
   * List quality indicator results
   */
  @route("/{indicatorId}/results")
  @get
  @summary("List quality indicator results")
  listResults(
    @path orgId: string,
    @path indicatorId: string,

    /** Period start */
    @query periodFrom?: plainDate,

    /** Period end */
    @query periodTo?: plainDate
  ): QualityIndicatorResultListResponse | ErrorResponse;
}

// ============================================================================
// PATIENT SAFETY INCIDENTS
// ============================================================================

/**
 * Patient Safety Incidents API
 */
@route("/v1/orgs/{orgId}/patient-safety-incidents")
@tag("Accreditation")
interface PatientSafetyIncidents {
  /**
   * List patient safety incidents
   */
  @get
  @summary("List patient safety incidents")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by severity */
    @query severity?: string,

    /** Filter by status */
    @query status?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): PatientSafetyIncidentListResponse | ErrorResponse;

  /**
   * Report patient safety incident
   */
  @post
  @summary("Report patient safety incident")
  report(
    @path orgId: string,
    @body body: ReportPatientSafetyIncidentRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PatientSafetyIncidentResponse;
      }
    | ErrorResponse;

  /**
   * Get patient safety incident
   */
  @route("/{incidentId}")
  @get
  @summary("Get patient safety incident")
  get(
    @path orgId: string,
    @path incidentId: string
  ): PatientSafetyIncidentResponse | ErrorResponse;

  /**
   * Start investigation
   */
  @route("/{incidentId}/investigate")
  @post
  @summary("Start investigation")
  investigate(
    @path orgId: string,
    @path incidentId: string
  ): PatientSafetyIncidentResponse | ErrorResponse;

  /**
   * Resolve incident
   */
  @route("/{incidentId}/resolve")
  @post
  @summary("Resolve incident")
  resolve(
    @path orgId: string,
    @path incidentId: string
  ): PatientSafetyIncidentResponse | ErrorResponse;
}

// ============================================================================
// CLINICAL AUDITS
// ============================================================================

/**
 * Clinical Audits API
 */
@route("/v1/orgs/{orgId}/clinical-audits")
@tag("Accreditation")
interface ClinicalAudits {
  /**
   * List clinical audits
   */
  @get
  @summary("List clinical audits")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by audit type */
    @query auditType?: string,

    /** Filter by status */
    @query status?: string
  ): ClinicalAuditListResponse | ErrorResponse;

  /**
   * Create clinical audit
   */
  @post
  @summary("Create clinical audit")
  create(
    @path orgId: string
  ):
    | {
        @statusCode statusCode: 201;
        @body body: ClinicalAuditResponse;
      }
    | ErrorResponse;

  /**
   * Get clinical audit
   */
  @route("/{auditId}")
  @get
  @summary("Get clinical audit")
  get(
    @path orgId: string,
    @path auditId: string
  ): ClinicalAuditResponse | ErrorResponse;

  /**
   * Complete clinical audit
   */
  @route("/{auditId}/complete")
  @post
  @summary("Complete clinical audit")
  complete(
    @path orgId: string,
    @path auditId: string
  ): ClinicalAuditResponse | ErrorResponse;

  /**
   * Approve clinical audit
   */
  @route("/{auditId}/approve")
  @post
  @summary("Approve clinical audit")
  approve(
    @path orgId: string,
    @path auditId: string
  ): ClinicalAuditResponse | ErrorResponse;
}

// ============================================================================
// PRACTITIONER CREDENTIALS
// ============================================================================

/**
 * Practitioner Credentials API
 */
@route("/v1/orgs/{orgId}/practitioner-credentials")
@tag("Accreditation")
interface PractitionerCredentials {
  /**
   * List practitioner credentials
   */
  @get
  @summary("List practitioner credentials")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by practitioner */
    @query practitionerId?: string,

    /** Filter by credential type */
    @query credentialType?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter expiring soon */
    @query expiringSoon?: boolean
  ): PractitionerCredentialListResponse | ErrorResponse;

  /**
   * Add credential
   */
  @post
  @summary("Add practitioner credential")
  create(
    @path orgId: string,
    @body body: CreatePractitionerCredentialRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PractitionerCredentialResponse;
      }
    | ErrorResponse;

  /**
   * Get credential
   */
  @route("/{credentialId}")
  @get
  @summary("Get practitioner credential")
  get(
    @path orgId: string,
    @path credentialId: string
  ): PractitionerCredentialResponse | ErrorResponse;

  /**
   * Verify credential
   */
  @route("/{credentialId}/verify")
  @post
  @summary("Verify practitioner credential")
  verify(
    @path orgId: string,
    @path credentialId: string
  ): PractitionerCredentialResponse | ErrorResponse;
}

// ============================================================================
// DOCUMENT CONTROL
// ============================================================================

/**
 * Document Control API
 */
@route("/v1/orgs/{orgId}/documents")
@tag("Accreditation")
interface DocumentControls {
  /**
   * List controlled documents
   */
  @get
  @summary("List controlled documents")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by document type */
    @query documentType?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by department */
    @query department?: string
  ): DocumentControlListResponse | ErrorResponse;

  /**
   * Create document
   */
  @post
  @summary("Create controlled document")
  create(
    @path orgId: string,
    @body body: CreateDocumentControlRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: DocumentControlResponse;
      }
    | ErrorResponse;

  /**
   * Get document
   */
  @route("/{documentId}")
  @get
  @summary("Get controlled document")
  get(
    @path orgId: string,
    @path documentId: string
  ): DocumentControlResponse | ErrorResponse;

  /**
   * Submit for review
   */
  @route("/{documentId}/submit-for-review")
  @post
  @summary("Submit document for review")
  submitForReview(
    @path orgId: string,
    @path documentId: string
  ): DocumentControlResponse | ErrorResponse;

  /**
   * Approve document
   */
  @route("/{documentId}/approve")
  @post
  @summary("Approve document")
  approve(
    @path orgId: string,
    @path documentId: string
  ): DocumentControlResponse | ErrorResponse;

  /**
   * Publish document
   */
  @route("/{documentId}/publish")
  @post
  @summary("Publish document")
  publish(
    @path orgId: string,
    @path documentId: string
  ): DocumentControlResponse | ErrorResponse;

  /**
   * Retire document
   */
  @route("/{documentId}/retire")
  @post
  @summary("Retire document")
  retire(
    @path orgId: string,
    @path documentId: string
  ): DocumentControlResponse | ErrorResponse;
}

// ============================================================================
// INFECTION SURVEILLANCE
// ============================================================================

/**
 * Infection Surveillance API
 */
@route("/v1/orgs/{orgId}/infection-surveillance")
@tag("Accreditation")
interface InfectionSurveillances {
  /**
   * List infection surveillance cases
   */
  @get
  @summary("List infection surveillance cases")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by category */
    @query category?: string,

    /** Filter by status */
    @query status?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): InfectionSurveillanceListResponse | ErrorResponse;

  /**
   * Report infection case
   */
  @post
  @summary("Report infection case")
  report(
    @path orgId: string,
    @body body: ReportInfectionSurveillanceRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: InfectionSurveillanceResponse;
      }
    | ErrorResponse;

  /**
   * Get infection case
   */
  @route("/{caseId}")
  @get
  @summary("Get infection case")
  get(
    @path orgId: string,
    @path caseId: string
  ): InfectionSurveillanceResponse | ErrorResponse;

  /**
   * Confirm infection
   */
  @route("/{caseId}/confirm")
  @post
  @summary("Confirm infection")
  confirm(
    @path orgId: string,
    @path caseId: string
  ): InfectionSurveillanceResponse | ErrorResponse;

  /**
   * Resolve infection case
   */
  @route("/{caseId}/resolve")
  @post
  @summary("Resolve infection case")
  resolve(
    @path orgId: string,
    @path caseId: string
  ): InfectionSurveillanceResponse | ErrorResponse;
}

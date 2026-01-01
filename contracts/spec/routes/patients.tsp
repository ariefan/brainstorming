/**
 * ============================================================================
 * PATIENTS API - Patient Management Endpoints
 * ============================================================================
 *
 * Patient management with:
 * - Patient registration
 * - Patient search
 * - Allergies and chronic conditions
 * - Integration with SatuSehat and JKN/BPJS
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/patient.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// PATIENTS
// ============================================================================

/**
 * Patients API
 *
 * Patient registration and management
 */
@route("/v1/orgs/{orgId}/patients")
@tag("Patients")
interface Patients {
  /**
   * List patients
   */
  @get
  @summary("List patients")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Search by name, NIK, or MRN */
    @query search?: string,

    /** Filter by BPJS member status */
    @query hasBpjs?: boolean
  ): PatientListResponse | ErrorResponse;

  /**
   * Register a new patient
   */
  @post
  @summary("Register patient")
  create(
    @path orgId: string,
    @body body: CreatePatientRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PatientResponse;
      }
    | ErrorResponse;

  /**
   * Get patient by ID
   */
  @route("/{patientId}")
  @get
  @summary("Get patient")
  get(
    @path orgId: string,
    @path patientId: string
  ): PatientResponse | ErrorResponse;

  /**
   * Update patient
   */
  @route("/{patientId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update patient")
  update(
    @path orgId: string,
    @path patientId: string,
    @body body: UpdatePatientRequest
  ): PatientResponse | ErrorResponse;

  /**
   * Delete patient (soft delete)
   */
  @route("/{patientId}")
  @delete
  @summary("Delete patient")
  delete(
    @path orgId: string,
    @path patientId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;

  /**
   * Search patient by NIK
   */
  @route("/search-by-nik")
  @get
  @summary("Search patient by NIK")
  searchByNik(
    @path orgId: string,
    @query nik: string
  ): PatientResponse | ErrorResponse;

  /**
   * Search patient by BPJS number
   */
  @route("/search-by-bpjs")
  @get
  @summary("Search patient by BPJS number")
  searchByBpjs(
    @path orgId: string,
    @query bpjsNumber: string
  ): PatientResponse | ErrorResponse;
}

// ============================================================================
// PATIENT ALLERGIES
// ============================================================================

/**
 * Patient Allergies API
 */
@route("/v1/orgs/{orgId}/patients/{patientId}/allergies")
@tag("Patients")
interface PatientAllergies {
  /**
   * List patient allergies
   */
  @get
  @summary("List patient allergies")
  list(
    @path orgId: string,
    @path patientId: string
  ): PatientAllergyListResponse | ErrorResponse;

  /**
   * Add allergy
   */
  @post
  @summary("Add patient allergy")
  create(
    @path orgId: string,
    @path patientId: string,
    @body body: CreatePatientAllergyRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PatientAllergyResponse;
      }
    | ErrorResponse;

  /**
   * Update allergy
   */
  @route("/{allergyId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update patient allergy")
  update(
    @path orgId: string,
    @path patientId: string,
    @path allergyId: string,
    @body body: UpdatePatientAllergyRequest
  ): PatientAllergyResponse | ErrorResponse;

  /**
   * Delete allergy
   */
  @route("/{allergyId}")
  @delete
  @summary("Delete patient allergy")
  delete(
    @path orgId: string,
    @path patientId: string,
    @path allergyId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// CHRONIC CONDITIONS
// ============================================================================

/**
 * Chronic Conditions API
 */
@route("/v1/orgs/{orgId}/patients/{patientId}/chronic-conditions")
@tag("Patients")
interface ChronicConditions {
  /**
   * List chronic conditions
   */
  @get
  @summary("List chronic conditions")
  list(
    @path orgId: string,
    @path patientId: string
  ): ChronicConditionListResponse | ErrorResponse;

  /**
   * Add chronic condition
   */
  @post
  @summary("Add chronic condition")
  create(
    @path orgId: string,
    @path patientId: string,
    @body body: CreateChronicConditionRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: ChronicConditionResponse;
      }
    | ErrorResponse;

  /**
   * Update chronic condition
   */
  @route("/{conditionId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update chronic condition")
  update(
    @path orgId: string,
    @path patientId: string,
    @path conditionId: string,
    @body body: UpdateChronicConditionRequest
  ): ChronicConditionResponse | ErrorResponse;

  /**
   * Delete chronic condition
   */
  @route("/{conditionId}")
  @delete
  @summary("Delete chronic condition")
  delete(
    @path orgId: string,
    @path patientId: string,
    @path conditionId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

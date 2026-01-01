/**
 * ============================================================================
 * PRACTITIONERS API - Practitioner and Scheduling Endpoints
 * ============================================================================
 *
 * Healthcare practitioner management with:
 * - Practitioner registration
 * - Polyclinics
 * - Schedules and appointment slots
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/practitioner.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// PRACTITIONERS
// ============================================================================

/**
 * Practitioners API
 *
 * Healthcare provider management
 */
@route("/v1/orgs/{orgId}/practitioners")
@tag("Practitioners")
interface Practitioners {
  /**
   * List practitioners
   */
  @get
  @summary("List practitioners")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by specialty */
    @query specialty?: string,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Search by name */
    @query search?: string
  ): PractitionerListResponse | ErrorResponse;

  /**
   * Register a new practitioner
   */
  @post
  @summary("Register practitioner")
  create(
    @path orgId: string,
    @body body: CreatePractitionerRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PractitionerResponse;
      }
    | ErrorResponse;

  /**
   * Get practitioner by ID
   */
  @route("/{practitionerId}")
  @get
  @summary("Get practitioner")
  get(
    @path orgId: string,
    @path practitionerId: string
  ): PractitionerResponse | ErrorResponse;

  /**
   * Update practitioner
   */
  @route("/{practitionerId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update practitioner")
  update(
    @path orgId: string,
    @path practitionerId: string,
    @body body: UpdatePractitionerRequest
  ): PractitionerResponse | ErrorResponse;

  /**
   * Delete practitioner
   */
  @route("/{practitionerId}")
  @delete
  @summary("Delete practitioner")
  delete(
    @path orgId: string,
    @path practitionerId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// POLYCLINICS
// ============================================================================

/**
 * Polyclinics API
 *
 * Manage polyclinics/departments
 */
@route("/v1/orgs/{orgId}/polyclinics")
@tag("Practitioners")
interface Polyclinics {
  /**
   * List polyclinics
   */
  @get
  @summary("List polyclinics")
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

    /** Search by name */
    @query search?: string
  ): PolyclinicListResponse | ErrorResponse;

  /**
   * Create polyclinic
   */
  @post
  @summary("Create polyclinic")
  create(
    @path orgId: string,
    @body body: CreatePolyclinicRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PolyclinicResponse;
      }
    | ErrorResponse;

  /**
   * Get polyclinic
   */
  @route("/{polyclinicId}")
  @get
  @summary("Get polyclinic")
  get(
    @path orgId: string,
    @path polyclinicId: string
  ): PolyclinicResponse | ErrorResponse;

  /**
   * Update polyclinic
   */
  @route("/{polyclinicId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update polyclinic")
  update(
    @path orgId: string,
    @path polyclinicId: string,
    @body body: UpdatePolyclinicRequest
  ): PolyclinicResponse | ErrorResponse;

  /**
   * Delete polyclinic
   */
  @route("/{polyclinicId}")
  @delete
  @summary("Delete polyclinic")
  delete(
    @path orgId: string,
    @path polyclinicId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// PRACTITIONER SCHEDULES
// ============================================================================

/**
 * Practitioner Schedules API
 */
@route("/v1/orgs/{orgId}/practitioners/{practitionerId}/schedules")
@tag("Practitioners")
interface PractitionerSchedules {
  /**
   * List practitioner schedules
   */
  @get
  @summary("List practitioner schedules")
  list(
    @path orgId: string,
    @path practitionerId: string,

    /** Filter by polyclinic */
    @query polyclinicId?: string,

    /** Filter by active status */
    @query isActive?: boolean
  ): PractitionerScheduleListResponse | ErrorResponse;

  /**
   * Create schedule
   */
  @post
  @summary("Create schedule")
  create(
    @path orgId: string,
    @path practitionerId: string,
    @body body: CreatePractitionerScheduleRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PractitionerScheduleResponse;
      }
    | ErrorResponse;

  /**
   * Update schedule
   */
  @route("/{scheduleId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update schedule")
  update(
    @path orgId: string,
    @path practitionerId: string,
    @path scheduleId: string,
    @body body: UpdatePractitionerScheduleRequest
  ): PractitionerScheduleResponse | ErrorResponse;

  /**
   * Delete schedule
   */
  @route("/{scheduleId}")
  @delete
  @summary("Delete schedule")
  delete(
    @path orgId: string,
    @path practitionerId: string,
    @path scheduleId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// APPOINTMENT SLOTS
// ============================================================================

/**
 * Appointment Slots API
 */
@route("/v1/orgs/{orgId}/slots")
@tag("Practitioners")
interface AppointmentSlots {
  /**
   * List available slots
   */
  @get
  @summary("List available slots")
  list(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by practitioner */
    @query practitionerId?: string,

    /** Filter by polyclinic */
    @query polyclinicId?: string,

    /** Filter by date */
    @query date?: plainDate,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate,

    /** Filter by availability */
    @query isAvailable?: boolean
  ): AppointmentSlotListResponse | ErrorResponse;

  /**
   * Generate slots for a schedule
   */
  @route("/generate")
  @post
  @summary("Generate slots")
  generate(
    @path orgId: string,
    @body body: GenerateSlotsRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: AppointmentSlotListResponse;
      }
    | ErrorResponse;

  /**
   * Block a slot
   */
  @route("/{slotId}/block")
  @post
  @summary("Block slot")
  block(
    @path orgId: string,
    @path slotId: string,
    @body body: BlockSlotRequest
  ): AppointmentSlotResponse | ErrorResponse;

  /**
   * Unblock a slot
   */
  @route("/{slotId}/unblock")
  @post
  @summary("Unblock slot")
  unblock(
    @path orgId: string,
    @path slotId: string
  ): AppointmentSlotResponse | ErrorResponse;
}

/**
 * ============================================================================
 * APPOINTMENTS API - Appointment and Queue Management
 * ============================================================================
 *
 * Appointment and queue management with:
 * - Appointment booking
 * - Queue management
 * - Check-in/check-out
 * - Queue calling
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/appointment.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// APPOINTMENTS
// ============================================================================

/**
 * Appointments API
 *
 * Appointment booking and management
 */
@route("/v1/orgs/{orgId}/appointments")
@tag("Appointments")
interface Appointments {
  /**
   * List appointments
   */
  @get
  @summary("List appointments")
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

    /** Filter by status */
    @query status?: string
  ): AppointmentListResponse | ErrorResponse;

  /**
   * Book an appointment
   */
  @post
  @summary("Book appointment")
  create(
    @path orgId: string,
    @body body: CreateAppointmentRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: AppointmentResponse;
      }
    | ErrorResponse;

  /**
   * Get appointment by ID
   */
  @route("/{appointmentId}")
  @get
  @summary("Get appointment")
  get(
    @path orgId: string,
    @path appointmentId: string
  ): AppointmentResponse | ErrorResponse;

  /**
   * Update appointment
   */
  @route("/{appointmentId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update appointment")
  update(
    @path orgId: string,
    @path appointmentId: string,
    @body body: UpdateAppointmentRequest
  ): AppointmentResponse | ErrorResponse;

  /**
   * Cancel appointment
   */
  @route("/{appointmentId}/cancel")
  @post
  @summary("Cancel appointment")
  cancel(
    @path orgId: string,
    @path appointmentId: string,
    @body body: CancelAppointmentRequest
  ): AppointmentResponse | ErrorResponse;

  /**
   * Check-in patient
   */
  @route("/{appointmentId}/check-in")
  @post
  @summary("Check-in patient")
  checkIn(
    @path orgId: string,
    @path appointmentId: string,
    @body body: CheckInRequest
  ): AppointmentResponse | ErrorResponse;

  /**
   * No-show appointment
   */
  @route("/{appointmentId}/no-show")
  @post
  @summary("Mark as no-show")
  noShow(
    @path orgId: string,
    @path appointmentId: string
  ): AppointmentResponse | ErrorResponse;

  /**
   * Reschedule appointment
   */
  @route("/{appointmentId}/reschedule")
  @post
  @summary("Reschedule appointment")
  reschedule(
    @path orgId: string,
    @path appointmentId: string,
    @body body: RescheduleAppointmentRequest
  ): AppointmentResponse | ErrorResponse;
}

// ============================================================================
// QUEUES
// ============================================================================

/**
 * Queues API
 *
 * Queue management for walk-in patients
 */
@route("/v1/orgs/{orgId}/queues")
@tag("Appointments")
interface Queues {
  /**
   * List queues
   */
  @get
  @summary("List queues")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by polyclinic */
    @query polyclinicId?: string,

    /** Filter by date */
    @query date?: plainDate,

    /** Filter by status */
    @query status?: string
  ): QueueListResponse | ErrorResponse;

  /**
   * Add to queue
   */
  @post
  @summary("Add to queue")
  create(
    @path orgId: string,
    @body body: CreateQueueRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: QueueResponse;
      }
    | ErrorResponse;

  /**
   * Get queue by ID
   */
  @route("/{queueId}")
  @get
  @summary("Get queue")
  get(
    @path orgId: string,
    @path queueId: string
  ): QueueResponse | ErrorResponse;

  /**
   * Call next in queue
   */
  @route("/call-next")
  @post
  @summary("Call next in queue")
  callNext(
    @path orgId: string,
    @body body: CallNextQueueRequest
  ): QueueResponse | ErrorResponse;

  /**
   * Call specific queue
   */
  @route("/{queueId}/call")
  @post
  @summary("Call queue")
  call(
    @path orgId: string,
    @path queueId: string,
    @body body: CallQueueRequest
  ): QueueResponse | ErrorResponse;

  /**
   * Skip queue
   */
  @route("/{queueId}/skip")
  @post
  @summary("Skip queue")
  skip(
    @path orgId: string,
    @path queueId: string
  ): QueueResponse | ErrorResponse;

  /**
   * Complete queue (patient served)
   */
  @route("/{queueId}/complete")
  @post
  @summary("Complete queue")
  complete(
    @path orgId: string,
    @path queueId: string
  ): QueueResponse | ErrorResponse;

  /**
   * Get current queue display
   */
  @route("/display")
  @get
  @summary("Get queue display")
  getDisplay(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by polyclinic */
    @query polyclinicId?: string
  ): QueueDisplayResponse | ErrorResponse;
}

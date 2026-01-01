import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// APPOINTMENT & QUEUE MODELS
// ============================================================================

/**
 * Appointment resource
 *
 * Represents a scheduled patient visit
 */
model Appointment {
  /** Unique appointment identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Appointment number */
  @example("APT-2024-001234")
  appointmentNumber: string;

  /** Patient ID */
  patientId: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Polyclinic ID */
  polyclinicId: string;

  /** Appointment slot ID (if booked via slot) */
  appointmentSlotId?: string;

  /** Appointment type */
  appointmentType: AppointmentType;

  /** Appointment status */
  status: AppointmentStatus;

  /** Appointment date */
  appointmentDate: plainDate;

  /** Start time (HH:mm) */
  startTime: string;

  /** End time (HH:mm) */
  endTime?: string;

  /** Duration (in minutes) */
  duration?: string;

  /** Priority */
  priority: QueuePriority;

  /** Reason for visit */
  reasonForVisit?: string;

  /** Symptoms description */
  symptoms?: string;

  /** Notes */
  notes?: string;

  /** Whether this is a walk-in */
  isWalkIn: boolean;

  /** Whether this is an online booking */
  isOnline: boolean;

  /** Whether this is a video call */
  isVideoCall: boolean;

  /** Whether this is a follow-up appointment */
  isFollowUp: boolean;

  /** Previous appointment ID (for follow-ups) */
  previousAppointmentId?: string;

  /** BPJS booking code */
  bpjsAntreanKodeBooking?: string;

  /** JKN sync status */
  isJknSynced: boolean;

  /** When synced to JKN */
  jknSyncedAt?: utcDateTime;

  /** JKN sync error message */
  jknSyncError?: string;

  /** Check-in time */
  checkedInAt?: utcDateTime;

  /** Who performed check-in */
  checkedInBy?: string;

  /** When appointment started */
  startedAt?: utcDateTime;

  /** Completion time */
  completedAt?: utcDateTime;

  /** When marked as no-show */
  noShowAt?: utcDateTime;

  /** Cancellation reason */
  cancellationReason?: string;

  /** Who cancelled */
  cancelledBy?: string;

  /** When cancelled */
  cancelledAt?: utcDateTime;

  /** Soft delete status */
  isDeleted: boolean;

  /** When deleted */
  deletedAt?: utcDateTime;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Queue entry
 *
 * Represents a patient's position in the queue
 */
model Queue {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Appointment ID */
  appointmentId: string;

  /** Polyclinic ID */
  polyclinicId: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Queue date */
  queueDate: plainDate;

  /** Queue number */
  @example("A001")
  queueNumber: string;

  /** Queue status */
  status: QueueStatus;

  /** Priority */
  priority: QueuePriority;

  /** Whether this is a walk-in queue */
  isWalkIn: boolean;

  /** Whether this is an online queue */
  isOnline: boolean;

  /** Estimated service time */
  estimatedServiceTime?: utcDateTime;

  /** Actual service start time */
  serviceStartedAt?: utcDateTime;

  /** Actual service end time */
  serviceEndedAt?: utcDateTime;

  /** Who called the queue */
  calledBy?: string;

  /** When called */
  calledAt?: utcDateTime;

  /** Counter/room number */
  counterNumber?: string;

  /** Wait time in minutes */
  waitTimeMinutes?: int32;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Queue call log
 */
model QueueCallLog {
  /** Unique identifier */
  id: string;

  /** Queue ID */
  queueId: string;

  /** Called by user ID */
  calledBy: string;

  /** When called */
  calledAt: utcDateTime;

  /** Counter number */
  counterNumber?: string;

  /** Whether patient responded */
  responded: boolean;

  /** Response time (when patient arrived at counter) */
  respondedAt?: utcDateTime;

  /** Notes */
  notes?: string;
}

/**
 * Appointment reminder
 */
model AppointmentReminder {
  /** Unique identifier */
  id: string;

  /** Appointment ID */
  appointmentId: string;

  /** Reminder type */
  reminderType: "sms" | "email" | "push" | "whatsapp";

  /** Scheduled send time */
  scheduledAt: utcDateTime;

  /** Actual send time */
  sentAt?: utcDateTime;

  /** Whether reminder was sent successfully */
  isSent: boolean;

  /** Error message if failed */
  errorMessage?: string;

  /** When created */
  createdAt: utcDateTime;
}

// --- Request Models ---

/** Request body for creating an appointment */
model CreateAppointmentRequest {
  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Practitioner ID */
  practitionerId: string;

  /** Polyclinic ID */
  polyclinicId: string;

  /** Appointment slot ID */
  appointmentSlotId?: string;

  /** Appointment type */
  appointmentType: AppointmentType;

  /** Appointment date */
  appointmentDate: plainDate;

  /** Start time (HH:mm) */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  startTime: string;

  /** End time (HH:mm) */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  endTime?: string;

  /** Reason for visit */
  reasonForVisit?: string;

  /** Notes */
  notes?: string;

  /** Is walk-in */
  isWalkIn?: boolean;

  /** Previous appointment ID (for follow-ups) */
  previousAppointmentId?: string;
}

/** Request body for updating an appointment */
model UpdateAppointmentRequest {
  /** Practitioner ID */
  practitionerId?: string;

  /** Polyclinic ID */
  polyclinicId?: string;

  /** Appointment date */
  appointmentDate?: plainDate;

  /** Start time */
  startTime?: string;

  /** End time */
  endTime?: string;

  /** Reason for visit */
  reasonForVisit?: string;

  /** Notes */
  notes?: string;
}

/** Request body for checking in */
model CheckInAppointmentRequest {
  /** Notes */
  notes?: string;
}

/** Request body for checking in (alias) */
model CheckInRequest {
  /** Notes */
  notes?: string;
}

/** Request body for cancelling */
model CancelAppointmentRequest {
  /** Cancellation reason */
  @minLength(1)
  cancellationReason: string;
}

/** Request body for rescheduling */
model RescheduleAppointmentRequest {
  /** New appointment date */
  appointmentDate: plainDate;

  /** New start time */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  startTime: string;

  /** New end time */
  @pattern("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  endTime?: string;

  /** New practitioner ID */
  practitionerId?: string;

  /** Reschedule reason */
  reason?: string;
}

/** Request body for creating a queue entry */
model CreateQueueRequest {
  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  @minLength(1)
  patientId: string;

  /** Polyclinic ID */
  @minLength(1)
  polyclinicId: string;

  /** Practitioner ID (optional) */
  practitionerId?: string;

  /** Appointment ID (if from appointment) */
  appointmentId?: string;

  /** Priority */
  priority?: QueuePriority;

  /** Notes */
  notes?: string;
}

/** Request body for calling next queue */
model CallNextQueueRequest {
  /** Polyclinic ID */
  @minLength(1)
  polyclinicId: string;

  /** Counter number */
  counterNumber?: string;
}

/** Request body for calling queue */
model CallQueueRequest {
  /** Counter number */
  counterNumber?: string;
}

// --- Response Models ---

/** Single appointment response */
model AppointmentResponse is SingleResourceResponse<Appointment>;

/** Appointment list response */
model AppointmentListResponse is CollectionResponse<Appointment>;

/** Single queue response */
model QueueResponse is SingleResourceResponse<Queue>;

/** Queue list response */
model QueueListResponse is CollectionResponse<Queue>;

/** Queue display info (for display boards) */
model QueueDisplayResponse {
  data: {
    /** Current serving queue numbers by polyclinic */
    currentServing: {
      polyclinicId: string;
      polyclinicName: string;
      queueNumber: string;
      counterNumber?: string;
    }[];

    /** Waiting queues */
    waiting: {
      queueNumber: string;
      polyclinicName: string;
      priority: QueuePriority;
      estimatedWaitMinutes?: int32;
    }[];

    /** Statistics */
    stats: {
      totalWaiting: int32;
      totalServing: int32;
      totalCompleted: int32;
      averageWaitMinutes: int32;
    };
  };
  meta: ResponseMeta;
}

/** Appointment with related data */
model AppointmentWithRelationsResponse {
  data: {
    ...Appointment;
    patient?: {
      id: string;
      fullName: string;
      medicalRecordNumber: string;
    };
    practitioner?: {
      id: string;
      fullName: string;
      specialty?: Specialty;
    };
    polyclinic?: {
      id: string;
      polyclinicName: string;
    };
    queue?: Queue;
  };
  meta: ResponseMeta;
}

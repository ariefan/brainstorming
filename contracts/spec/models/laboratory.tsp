import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// LABORATORY MODELS
// ============================================================================
// Lab tests, orders, specimens, results, and diagnostic reports
// Supports SatuSehat FHIR R4 and JKN/BPJS integration
// ============================================================================

/**
 * Lab Test definition
 *
 * Defines available laboratory tests with reference ranges
 */
model LabTest {
  /** Unique identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Test code */
  testCode: string;

  /** Test name */
  testName: string;

  /** Test name in Indonesian */
  testNameId?: string;

  /** Test category */
  testCategory: LabTestCategory;

  /** Test type */
  testType: LabTestType;

  /** Description */
  description?: string;

  /** Specimen type required */
  specimenType?: string;

  /** Result type */
  resultType: LabResultType;

  /** Unit of measurement */
  unit?: string;

  /** Normal range description */
  normalRange?: string;

  /** Whether test is active */
  isActive: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Lab Test Reference Range
 *
 * Reference ranges by age and gender
 */
model LabTestReferenceRange {
  /** Unique identifier */
  id: string;

  /** Lab test ID */
  labTestId: string;

  /** Gender filter */
  gender?: string;

  /** Minimum age */
  ageMin?: int32;

  /** Maximum age */
  ageMax?: int32;

  /** Age unit */
  ageUnit?: string;

  /** Minimum normal value */
  minValue?: string;

  /** Maximum normal value */
  maxValue?: string;

  /** Critical low value */
  minValueCritical?: string;

  /** Critical high value */
  maxValueCritical?: string;

  /** Notes */
  notes?: string;
}

/**
 * Lab Queue entry
 *
 * Patient queue for lab specimen collection
 */
model LabQueue {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Queue number */
  queueNumber: string;

  /** Queue status */
  status: LabQueueStatus;

  /** Priority */
  priority: LabQueuePriority;

  /** Whether fasting required */
  isFasting: boolean;

  /** Whether fasting verified */
  fastingVerified: boolean;

  /** When fasting verified */
  fastingVerifiedAt?: utcDateTime;

  /** Fasting verified by user ID */
  fastingVerifiedBy?: string;

  /** Clinical information */
  clinicalInfo?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Lab Order
 *
 * Order for laboratory tests
 */
model LabOrder {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Queue ID */
  queueId?: string;

  /** Order number */
  orderNumber: string;

  /** When ordered */
  orderedAt: utcDateTime;

  /** Ordered by user ID */
  orderedBy: string;

  /** Priority */
  priority: LabQueuePriority;

  /** Status */
  status: LabQueueStatus;

  /** Clinical information */
  clinicalInfo?: string;

  /** Notes */
  notes?: string;

  /** Order items */
  items?: LabOrderItem[];

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Lab Order Item
 *
 * Individual test within a lab order
 */
model LabOrderItem {
  /** Unique identifier */
  id: string;

  /** Order ID */
  orderId: string;

  /** Lab test ID */
  labTestId: string;

  /** Test code */
  testCode: string;

  /** Test name */
  testName: string;

  /** Test name in Indonesian */
  testNameId?: string;

  /** Priority */
  priority: LabQueuePriority;

  /** Status */
  status: LabQueueStatus;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Specimen
 *
 * Collected specimen for laboratory analysis
 */
model Specimen {
  /** Unique identifier */
  id: string;

  /** Order item ID */
  orderItemId: string;

  /** Specimen number */
  specimenNumber: string;

  /** Specimen type */
  specimenType: string;

  /** Collection date/time */
  collectionDate: utcDateTime;

  /** Collected by user ID */
  collectedBy: string;

  /** Status */
  status: SpecimenStatus;

  /** Specimen condition */
  condition?: SpecimenCondition;

  /** When received at lab */
  receivedAt?: utcDateTime;

  /** Received by user ID */
  receivedBy?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Lab Result
 *
 * Result from laboratory analysis
 */
model LabResult {
  /** Unique identifier */
  id: string;

  /** Order item ID */
  orderItemId: string;

  /** Specimen ID */
  specimenId?: string;

  /** Result date/time */
  resultDate: utcDateTime;

  /** Result value */
  resultValue?: string;

  /** Result text (for narrative results) */
  resultText?: string;

  /** Interpretation */
  interpretation?: LabResultInterpretation;

  /** Whether result is abnormal */
  isAbnormal: boolean;

  /** Whether result is critical */
  isCritical: boolean;

  /** Status */
  status: LabResultStatus;

  /** When verified */
  verifiedAt?: utcDateTime;

  /** Verified by user ID */
  verifiedBy?: string;

  /** Notes */
  notes?: string;

  /** SatuSehat Observation ID */
  satusehatObservationId?: string;

  /** Whether synced to SatuSehat */
  isSatusehatSynced: boolean;

  /** When synced to SatuSehat */
  satusehatSyncedAt?: utcDateTime;

  /** SatuSehat sync error */
  satusehatSyncError?: string;

  /** Whether synced to JKN */
  isJknSynced: boolean;

  /** When synced to JKN */
  jknSyncedAt?: utcDateTime;

  /** JKN sync error */
  jknSyncError?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Diagnostic Report
 *
 * Summary report of laboratory results
 */
model DiagnosticReport {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Order ID */
  orderId?: string;

  /** Report number */
  reportNumber: string;

  /** Report date/time */
  reportDate: utcDateTime;

  /** Status */
  status: DiagnosticReportStatus;

  /** Generated by user ID */
  generatedBy: string;

  /** Conclusion */
  conclusion?: string;

  /** Notes */
  notes?: string;

  /** SatuSehat DiagnosticReport ID */
  satusehatDiagnosticReportId?: string;

  /** Whether synced to SatuSehat */
  isSatusehatSynced: boolean;

  /** When synced to SatuSehat */
  satusehatSyncedAt?: utcDateTime;

  /** SatuSehat sync error */
  satusehatSyncError?: string;

  /** Whether synced to JKN */
  isJknSynced: boolean;

  /** When synced to JKN */
  jknSyncedAt?: utcDateTime;

  /** JKN sync error */
  jknSyncError?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Critical Value Notification
 *
 * Notification for critical lab values
 */
model CriticalValueNotification {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Lab result ID */
  labResultId: string;

  /** Notification date/time */
  notificationDate: utcDateTime;

  /** Notified by user ID */
  notifiedBy: string;

  /** Notified to user ID */
  notifiedTo?: string;

  /** Notification method */
  notificationMethod: CriticalNotificationMethod;

  /** When acknowledged */
  acknowledgedAt?: utcDateTime;

  /** Acknowledged by user ID */
  acknowledgedBy?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Request Models ---

/** Request body for creating a lab test */
model CreateLabTestRequest {
  /** Test code */
  @minLength(1)
  @maxLength(20)
  testCode: string;

  /** Test name */
  @minLength(1)
  testName: string;

  /** Test name in Indonesian */
  testNameId?: string;

  /** Test category */
  testCategory: LabTestCategory;

  /** Test type */
  testType: LabTestType;

  /** Description */
  description?: string;

  /** Specimen type */
  specimenType?: string;

  /** Result type */
  resultType: LabResultType;

  /** Unit */
  unit?: string;

  /** Normal range */
  normalRange?: string;
}

/** Request body for updating a lab test */
model UpdateLabTestRequest {
  /** Test name */
  testName?: string;

  /** Test name in Indonesian */
  testNameId?: string;

  /** Test category */
  testCategory?: LabTestCategory;

  /** Test type */
  testType?: LabTestType;

  /** Description */
  description?: string;

  /** Specimen type */
  specimenType?: string;

  /** Result type */
  resultType?: LabResultType;

  /** Unit */
  unit?: string;

  /** Normal range */
  normalRange?: string;

  /** Is active */
  isActive?: boolean;
}

/** Request body for creating a lab order */
model CreateLabOrderRequest {
  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  @minLength(1)
  patientId: string;

  /** Queue ID */
  queueId?: string;

  /** Priority */
  priority?: LabQueuePriority;

  /** Clinical information */
  clinicalInfo?: string;

  /** Notes */
  notes?: string;

  /** Test IDs to order */
  testIds: string[];
}

/** Request body for updating lab order status */
model UpdateLabOrderStatusRequest {
  /** Status */
  status: LabQueueStatus;

  /** Notes */
  notes?: string;
}

/** Request body for collecting specimen */
model CollectSpecimenRequest {
  /** Order item ID */
  @minLength(1)
  orderItemId: string;

  /** Specimen type */
  @minLength(1)
  specimenType: string;

  /** Specimen condition */
  condition?: SpecimenCondition;

  /** Notes */
  notes?: string;
}

/** Request body for receiving specimen */
model ReceiveSpecimenRequest {
  /** Specimen condition on receipt */
  condition?: SpecimenCondition;

  /** Notes */
  notes?: string;
}

/** Request body for entering lab result */
model EnterLabResultRequest {
  /** Specimen ID */
  specimenId?: string;

  /** Result value */
  resultValue?: string;

  /** Result text */
  resultText?: string;

  /** Interpretation */
  interpretation?: LabResultInterpretation;

  /** Whether abnormal */
  isAbnormal?: boolean;

  /** Whether critical */
  isCritical?: boolean;

  /** Notes */
  notes?: string;
}

/** Request body for verifying lab result */
model VerifyLabResultRequest {
  /** Notes */
  notes?: string;
}

/** Request body for creating diagnostic report */
model CreateDiagnosticReportRequest {
  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  @minLength(1)
  patientId: string;

  /** Order ID */
  orderId?: string;

  /** Conclusion */
  conclusion?: string;

  /** Notes */
  notes?: string;
}

// --- Response Models ---

/** Single lab test response */
model LabTestResponse is SingleResourceResponse<LabTest>;

/** Lab test list response */
model LabTestListResponse is CollectionResponse<LabTest>;

/** Single lab order response */
model LabOrderResponse is SingleResourceResponse<LabOrder>;

/** Lab order list response */
model LabOrderListResponse is CollectionResponse<LabOrder>;

/** Single specimen response */
model SpecimenResponse is SingleResourceResponse<Specimen>;

/** Specimen list response */
model SpecimenListResponse is CollectionResponse<Specimen>;

/** Single lab result response */
model LabResultResponse is SingleResourceResponse<LabResult>;

/** Lab result list response */
model LabResultListResponse is CollectionResponse<LabResult>;

/** Single diagnostic report response */
model DiagnosticReportResponse is SingleResourceResponse<DiagnosticReport>;

/** Diagnostic report list response */
model DiagnosticReportListResponse is CollectionResponse<DiagnosticReport>;

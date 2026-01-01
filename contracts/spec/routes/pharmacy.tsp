/**
 * ============================================================================
 * PHARMACY API ROUTES
 * ============================================================================
 *
 * Medication and inventory management:
 * - Medication master data
 * - Stock management
 * - Dispensing
 * - Controlled substance tracking
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/pharmacy.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// MEDICATIONS
// ============================================================================

/**
 * Medication API
 *
 * Drug/medicine master data management
 */
@route("/v1/orgs/{orgId}/pharmacy/medications")
@tag("Pharmacy")
interface Medications {
  /**
   * List medications
   */
  @get
  @summary("List medications")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by type */
    @query medicationType?: string,

    /** Filter by dosage form */
    @query dosageForm?: string,

    /** Filter by controlled schedule */
    @query controlledSchedule?: string,

    /** Filter by active status */
    @query isActive?: boolean,

    /** Search by name or code */
    @query search?: string
  ): MedicationListResponse | ErrorResponse;

  /**
   * Create medication
   */
  @post
  @summary("Create medication")
  create(
    @path orgId: string,
    @body body: CreateMedicationRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: MedicationResponse;
      }
    | ErrorResponse;

  /**
   * Get medication
   */
  @route("/{medicationId}")
  @get
  @summary("Get medication")
  get(
    @path orgId: string,
    @path medicationId: string
  ): MedicationResponse | ErrorResponse;

  /**
   * Update medication
   */
  @route("/{medicationId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update medication")
  update(
    @path orgId: string,
    @path medicationId: string,
    @body body: UpdateMedicationRequest
  ): MedicationResponse | ErrorResponse;

  /**
   * Delete medication
   */
  @route("/{medicationId}")
  @delete
  @summary("Delete medication")
  delete(
    @path orgId: string,
    @path medicationId: string
  ):
    | {
        @statusCode statusCode: 204;
      }
    | ErrorResponse;
}

// ============================================================================
// MEDICATION STOCK
// ============================================================================

/**
 * Medication Stock API
 *
 * Inventory management per branch
 */
@route("/v1/orgs/{orgId}/pharmacy/stock")
@tag("Pharmacy")
interface MedicationStocks {
  /**
   * List stock
   */
  @get
  @summary("List medication stock")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by medication */
    @query medicationId?: string,

    /** Filter by expiry date before */
    @query expiryBefore?: plainDate,

    /** Filter by low stock (quantity < threshold) */
    @query lowStock?: boolean,

    /** Low stock threshold */
    @query lowStockThreshold?: int32
  ): MedicationStockListResponse | ErrorResponse;

  /**
   * Create stock entry
   */
  @post
  @summary("Create stock entry")
  create(
    @path orgId: string,
    @body body: CreateMedicationStockRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: MedicationStockResponse;
      }
    | ErrorResponse;

  /**
   * Get stock entry
   */
  @route("/{stockId}")
  @get
  @summary("Get stock entry")
  get(
    @path orgId: string,
    @path stockId: string
  ): MedicationStockResponse | ErrorResponse;

  /**
   * Adjust stock
   */
  @route("/{stockId}/adjust")
  @post
  @summary("Adjust stock quantity")
  adjust(
    @path orgId: string,
    @path stockId: string,
    @body body: StockAdjustmentRequest
  ): MedicationStockResponse | ErrorResponse;
}

// ============================================================================
// STOCK MOVEMENTS
// ============================================================================

/**
 * Stock Movement API
 *
 * Inventory transaction history
 */
@route("/v1/orgs/{orgId}/pharmacy/stock-movements")
@tag("Pharmacy")
interface StockMovements {
  /**
   * List stock movements
   */
  @get
  @summary("List stock movements")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by medication stock */
    @query medicationStockId?: string,

    /** Filter by movement type */
    @query movementType?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): StockMovementListResponse | ErrorResponse;

  /**
   * Get stock movement
   */
  @route("/{movementId}")
  @get
  @summary("Get stock movement")
  get(
    @path orgId: string,
    @path movementId: string
  ): StockMovementResponse | ErrorResponse;
}

// ============================================================================
// DISPENSING
// ============================================================================

/**
 * Medication Dispense API
 *
 * Prescription fulfillment
 */
@route("/v1/orgs/{orgId}/pharmacy/dispenses")
@tag("Pharmacy")
interface MedicationDispenses {
  /**
   * List dispenses
   */
  @get
  @summary("List dispenses")
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

    /** Filter by encounter */
    @query encounterId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): MedicationDispenseListResponse | ErrorResponse;

  /**
   * Create dispense
   */
  @post
  @summary("Create dispense")
  create(
    @path orgId: string,
    @body body: CreateMedicationDispenseRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: MedicationDispenseResponse;
      }
    | ErrorResponse;

  /**
   * Get dispense
   */
  @route("/{dispenseId}")
  @get
  @summary("Get dispense")
  get(
    @path orgId: string,
    @path dispenseId: string
  ): MedicationDispenseResponse | ErrorResponse;

  /**
   * Cancel dispense
   */
  @route("/{dispenseId}/cancel")
  @post
  @summary("Cancel dispense")
  cancel(
    @path orgId: string,
    @path dispenseId: string
  ): MedicationDispenseResponse | ErrorResponse;
}

// ============================================================================
// CONTROLLED SUBSTANCES
// ============================================================================

/**
 * Controlled Substance Log API
 *
 * Audit trail for scheduled medications
 */
@route("/v1/orgs/{orgId}/pharmacy/controlled-substances")
@tag("Pharmacy")
interface ControlledSubstanceLogs {
  /**
   * List controlled substance logs
   */
  @get
  @summary("List controlled substance logs")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by medication */
    @query medicationId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Filter by action */
    @query action?: string,

    /** Filter by date range start */
    @query dateFrom?: plainDate,

    /** Filter by date range end */
    @query dateTo?: plainDate
  ): ControlledSubstanceLogListResponse | ErrorResponse;

  /**
   * Get controlled substance log
   */
  @route("/{logId}")
  @get
  @summary("Get controlled substance log")
  get(
    @path orgId: string,
    @path logId: string
  ): ControlledSubstanceLogResponse | ErrorResponse;
}

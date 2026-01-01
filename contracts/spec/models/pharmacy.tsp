import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// PHARMACY MODELS
// ============================================================================
// Medication management, stock control, and dispensing
// ============================================================================

// --- Medication ---

/**
 * Medication - Drug/medicine master data
 */
model Medication {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Medication code */
  medicationCode: string;

  /** Generic name */
  genericName: string;

  /** Generic name (Indonesian) */
  genericNameId?: string;

  /** Brand name */
  brandName?: string;

  /** Medication type */
  medicationType: MedicationType;

  /** Dosage form */
  dosageForm: DosageForm;

  /** Strength */
  strength?: string;

  /** Unit */
  unit?: string;

  /** Controlled substance schedule */
  controlledSchedule?: ControlledSubstanceSchedule;

  /** Manufacturer */
  manufacturer?: string;

  /** ATC code */
  atcCode?: string;

  /** Default price */
  defaultPrice?: float64;

  /** Requires prescription */
  requiresPrescription: boolean;

  /** Is active */
  isActive: boolean;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Medication Stock ---

/**
 * Medication Stock - Inventory per branch/location
 */
model MedicationStock {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId: string;

  /** Medication ID */
  medicationId: string;

  /** Medication reference */
  medication?: Medication;

  /** Batch number */
  batchNumber: string;

  /** Expiry date */
  expiryDate: plainDate;

  /** Quantity on hand */
  quantityOnHand: int32;

  /** Quantity reserved */
  quantityReserved: int32;

  /** Available quantity */
  quantityAvailable: int32;

  /** Unit cost */
  unitCost?: float64;

  /** Storage location */
  storageLocation?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

// --- Stock Movement ---

/**
 * Stock Movement - Inventory transactions
 */
model StockMovement {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId: string;

  /** Medication stock ID */
  medicationStockId: string;

  /** Movement type */
  movementType: StockMovementType;

  /** Quantity (positive for in, negative for out) */
  quantity: int32;

  /** Reference type (dispense, purchase, etc.) */
  referenceType?: string;

  /** Reference ID */
  referenceId?: string;

  /** Notes */
  notes?: string;

  /** Performed by user ID */
  performedBy: string;

  /** When performed */
  performedAt: utcDateTime;

  /** When created */
  createdAt: utcDateTime;
}

// --- Dispense ---

/**
 * Medication Dispense - Prescription fulfillment
 */
model MedicationDispense {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId: string;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Prescription ID (from medical record) */
  prescriptionId?: string;

  /** Dispense number */
  dispenseNumber: string;

  /** Dispense date */
  dispenseDate: utcDateTime;

  /** Status */
  status: DispenseStatus;

  /** Items */
  items: MedicationDispenseItem[];

  /** Total amount */
  totalAmount?: float64;

  /** Dispensed by user ID */
  dispensedBy?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/** Dispense item */
model MedicationDispenseItem {
  /** Medication ID */
  medicationId: string;

  /** Medication stock ID */
  medicationStockId?: string;

  /** Medication name */
  medicationName?: string;

  /** Quantity dispensed */
  quantityDispensed: int32;

  /** Unit price */
  unitPrice?: float64;

  /** Total price */
  totalPrice?: float64;

  /** Dosage instructions */
  dosageInstructions?: string;
}

// --- Controlled Substance Log ---

/**
 * Controlled Substance Log - Required for scheduled medications
 */
model ControlledSubstanceLog {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId: string;

  /** Medication ID */
  medicationId: string;

  /** Dispense ID */
  dispenseId?: string;

  /** Patient ID */
  patientId: string;

  /** Action (dispense, return, destroy) */
  action: string;

  /** Quantity */
  quantity: int32;

  /** Balance after action */
  balanceAfter: int32;

  /** Prescriber name */
  prescriberName: string;

  /** Prescriber license */
  prescriberLicense?: string;

  /** Witness name */
  witnessName?: string;

  /** Notes */
  notes?: string;

  /** Performed by user ID */
  performedBy: string;

  /** When performed */
  performedAt: utcDateTime;

  /** When created */
  createdAt: utcDateTime;
}

// ============================================================================
// REQUEST MODELS
// ============================================================================

/** Create medication request */
model CreateMedicationRequest {
  /** Medication code */
  @minLength(1)
  medicationCode: string;

  /** Generic name */
  @minLength(1)
  genericName: string;

  /** Generic name (Indonesian) */
  genericNameId?: string;

  /** Brand name */
  brandName?: string;

  /** Medication type */
  medicationType: MedicationType;

  /** Dosage form */
  dosageForm: DosageForm;

  /** Strength */
  strength?: string;

  /** Unit */
  unit?: string;

  /** Controlled substance schedule */
  controlledSchedule?: ControlledSubstanceSchedule;

  /** Manufacturer */
  manufacturer?: string;

  /** ATC code */
  atcCode?: string;

  /** Default price */
  defaultPrice?: float64;

  /** Requires prescription */
  requiresPrescription?: boolean;
}

/** Update medication request */
model UpdateMedicationRequest {
  /** Generic name */
  genericName?: string;

  /** Generic name (Indonesian) */
  genericNameId?: string;

  /** Brand name */
  brandName?: string;

  /** Dosage form */
  dosageForm?: DosageForm;

  /** Strength */
  strength?: string;

  /** Unit */
  unit?: string;

  /** Manufacturer */
  manufacturer?: string;

  /** Default price */
  defaultPrice?: float64;

  /** Is active */
  isActive?: boolean;
}

/** Create stock request */
model CreateMedicationStockRequest {
  /** Branch ID */
  branchId: string;

  /** Medication ID */
  medicationId: string;

  /** Batch number */
  @minLength(1)
  batchNumber: string;

  /** Expiry date */
  expiryDate: plainDate;

  /** Initial quantity */
  quantity: int32;

  /** Unit cost */
  unitCost?: float64;

  /** Storage location */
  storageLocation?: string;
}

/** Stock adjustment request */
model StockAdjustmentRequest {
  /** Adjustment type */
  adjustmentType: "increase" | "decrease" | "correction";

  /** Quantity */
  quantity: int32;

  /** Reason */
  @minLength(1)
  reason: string;
}

/** Create dispense request */
model CreateMedicationDispenseRequest {
  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Prescription ID */
  prescriptionId?: string;

  /** Items to dispense */
  items: CreateDispenseItemRequest[];

  /** Notes */
  notes?: string;
}

/** Dispense item request */
model CreateDispenseItemRequest {
  /** Medication ID */
  medicationId: string;

  /** Medication stock ID (optional - auto-select if not provided) */
  medicationStockId?: string;

  /** Quantity */
  quantity: int32;

  /** Unit price (optional - use default if not provided) */
  unitPrice?: float64;

  /** Dosage instructions */
  dosageInstructions?: string;
}

// ============================================================================
// RESPONSE MODELS
// ============================================================================

/** Medication response */
model MedicationResponse is SingleResourceResponse<Medication>;

/** Medication list response */
model MedicationListResponse is CollectionResponse<Medication>;

/** Medication stock response */
model MedicationStockResponse is SingleResourceResponse<MedicationStock>;

/** Medication stock list response */
model MedicationStockListResponse is CollectionResponse<MedicationStock>;

/** Stock movement response */
model StockMovementResponse is SingleResourceResponse<StockMovement>;

/** Stock movement list response */
model StockMovementListResponse is CollectionResponse<StockMovement>;

/** Medication dispense response */
model MedicationDispenseResponse is SingleResourceResponse<MedicationDispense>;

/** Medication dispense list response */
model MedicationDispenseListResponse is CollectionResponse<MedicationDispense>;

/** Controlled substance log response */
model ControlledSubstanceLogResponse is SingleResourceResponse<ControlledSubstanceLog>;

/** Controlled substance log list response */
model ControlledSubstanceLogListResponse is CollectionResponse<ControlledSubstanceLog>;

import "@typespec/http";
import "../common/responses.tsp";
import "../common/clinic-enums.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// BILLING MODELS
// ============================================================================
// Invoices, payments, refunds, and billing items
// Supports BPJS/JKN claims and private payments
// ============================================================================

/**
 * Invoice
 *
 * Bill for services rendered to a patient
 */
model Invoice {
  /** Unique identifier */
  id: string;

  /** Organization ID (tenant scope) */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Invoice number */
  invoiceNumber: string;

  /** Invoice date */
  invoiceDate: utcDateTime;

  /** Due date */
  dueDate?: utcDateTime;

  /** Status */
  status: InvoiceStatus;

  /** Payment type */
  paymentType: PaymentType;

  /** Payer type */
  payerType: PayerType;

  /** BPJS number (if JKN) */
  bpjsNumber?: string;

  /** Insurance company (if private insurance) */
  insuranceCompany?: string;

  /** Insurance policy number */
  insurancePolicyNumber?: string;

  /** Subtotal (before discount/tax) */
  subtotal: float64;

  /** Discount amount */
  discountAmount: float64;

  /** Discount percentage */
  discountPercent?: float64;

  /** Discount reason */
  discountReason?: string;

  /** Tax amount */
  taxAmount: float64;

  /** Total amount */
  totalAmount: float64;

  /** Amount paid */
  amountPaid: float64;

  /** Balance due */
  balanceDue: float64;

  /** Currency */
  currency: string;

  /** Notes */
  notes?: string;

  /** Invoice items */
  items?: InvoiceItem[];

  /** When approved */
  approvedAt?: utcDateTime;

  /** Approved by user ID */
  approvedBy?: string;

  /** When voided */
  voidedAt?: utcDateTime;

  /** Voided by user ID */
  voidedBy?: string;

  /** Void reason */
  voidReason?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Invoice Item
 *
 * Individual billable item on an invoice
 */
model InvoiceItem {
  /** Unique identifier */
  id: string;

  /** Invoice ID */
  invoiceId: string;

  /** Item type */
  itemType: BillableItemType;

  /** Item code */
  itemCode: string;

  /** Item name */
  itemName: string;

  /** Quantity */
  quantity: float64;

  /** Unit */
  unit: string;

  /** Unit price */
  unitPrice: float64;

  /** Discount amount */
  discountAmount: float64;

  /** Total amount */
  totalAmount: float64;

  /** Reference ID (e.g., prescription ID, procedure ID) */
  referenceId?: string;

  /** Notes */
  notes?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Payment
 *
 * Payment received for an invoice
 */
model Payment {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Invoice ID */
  invoiceId: string;

  /** Payment number */
  paymentNumber: string;

  /** Payment date */
  paymentDate: utcDateTime;

  /** Payment method */
  paymentMethod: PaymentMethod;

  /** Amount */
  amount: float64;

  /** Currency */
  currency: string;

  /** Status */
  status: PaymentStatus;

  /** Reference number (e.g., bank transfer ref) */
  referenceNumber?: string;

  /** Card type (if card payment) */
  cardType?: string;

  /** Last 4 digits (if card payment) */
  cardLast4?: string;

  /** Bank name (if bank transfer) */
  bankName?: string;

  /** Notes */
  notes?: string;

  /** When verified */
  verifiedAt?: utcDateTime;

  /** Verified by user ID */
  verifiedBy?: string;

  /** Received by user ID */
  receivedBy?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Refund
 *
 * Refund for a payment
 */
model Refund {
  /** Unique identifier */
  id: string;

  /** Organization ID */
  organizationId: string;

  /** Branch ID */
  branchId?: string;

  /** Payment ID */
  paymentId: string;

  /** Invoice ID */
  invoiceId: string;

  /** Refund number */
  refundNumber: string;

  /** Refund date */
  refundDate: utcDateTime;

  /** Amount */
  amount: float64;

  /** Currency */
  currency: string;

  /** Reason */
  reason: string;

  /** Status */
  status: RefundStatus;

  /** Refund method */
  refundMethod?: PaymentMethod;

  /** Reference number */
  referenceNumber?: string;

  /** Notes */
  notes?: string;

  /** When approved */
  approvedAt?: utcDateTime;

  /** Approved by user ID */
  approvedBy?: string;

  /** When processed */
  processedAt?: utcDateTime;

  /** Processed by user ID */
  processedBy?: string;

  /** When rejected */
  rejectedAt?: utcDateTime;

  /** Rejected by user ID */
  rejectedBy?: string;

  /** Rejection reason */
  rejectionReason?: string;

  /** When created */
  createdAt: utcDateTime;

  /** When updated */
  updatedAt: utcDateTime;
}

/**
 * Billing Summary
 *
 * Summary of billing for a patient or period
 */
model BillingSummary {
  /** Total invoices */
  totalInvoices: int32;

  /** Total invoiced amount */
  totalInvoicedAmount: float64;

  /** Total paid amount */
  totalPaidAmount: float64;

  /** Total outstanding */
  totalOutstanding: float64;

  /** Total overdue */
  totalOverdue: float64;

  /** By payment type */
  byPaymentType: {
    /** Payment type */
    paymentType: PaymentType;
    /** Count */
    count: int32;
    /** Amount */
    amount: float64;
  }[];

  /** By status */
  byStatus: {
    /** Status */
    status: InvoiceStatus;
    /** Count */
    count: int32;
    /** Amount */
    amount: float64;
  }[];
}

// --- Request Models ---

/** Request body for creating invoice */
model CreateInvoiceRequest {
  /** Branch ID */
  branchId?: string;

  /** Patient ID */
  @minLength(1)
  patientId: string;

  /** Encounter ID */
  encounterId?: string;

  /** Payment type */
  paymentType: PaymentType;

  /** Payer type */
  payerType: PayerType;

  /** BPJS number (if JKN) */
  bpjsNumber?: string;

  /** Insurance company */
  insuranceCompany?: string;

  /** Insurance policy number */
  insurancePolicyNumber?: string;

  /** Due date */
  dueDate?: utcDateTime;

  /** Discount percent */
  discountPercent?: float64;

  /** Discount reason */
  discountReason?: string;

  /** Notes */
  notes?: string;

  /** Invoice items */
  items: CreateInvoiceItemRequest[];
}

/** Request body for creating invoice item */
model CreateInvoiceItemRequest {
  /** Item type */
  itemType: BillableItemType;

  /** Item code */
  @minLength(1)
  itemCode: string;

  /** Item name */
  @minLength(1)
  itemName: string;

  /** Quantity */
  @minValue(0)
  quantity: float64;

  /** Unit */
  unit: string;

  /** Unit price */
  @minValue(0)
  unitPrice: float64;

  /** Discount amount */
  discountAmount?: float64;

  /** Reference ID */
  referenceId?: string;

  /** Notes */
  notes?: string;
}

/** Request body for updating invoice */
model UpdateInvoiceRequest {
  /** Due date */
  dueDate?: utcDateTime;

  /** Discount percent */
  discountPercent?: float64;

  /** Discount reason */
  discountReason?: string;

  /** Notes */
  notes?: string;
}

/** Request body for voiding invoice */
model VoidInvoiceRequest {
  /** Void reason */
  @minLength(1)
  reason: string;
}

/** Request body for creating payment */
model CreatePaymentRequest {
  /** Invoice ID */
  @minLength(1)
  invoiceId: string;

  /** Payment method */
  paymentMethod: PaymentMethod;

  /** Amount */
  @minValue(0)
  amount: float64;

  /** Reference number */
  referenceNumber?: string;

  /** Card type */
  cardType?: string;

  /** Card last 4 digits */
  cardLast4?: string;

  /** Bank name */
  bankName?: string;

  /** Notes */
  notes?: string;
}

/** Request body for verifying payment */
model VerifyPaymentRequest {
  /** Notes */
  notes?: string;
}

/** Request body for creating refund */
model CreateRefundRequest {
  /** Payment ID */
  @minLength(1)
  paymentId: string;

  /** Amount */
  @minValue(0)
  amount: float64;

  /** Reason */
  @minLength(1)
  reason: string;

  /** Refund method */
  refundMethod?: PaymentMethod;

  /** Notes */
  notes?: string;
}

/** Request body for approving refund */
model ApproveRefundRequest {
  /** Notes */
  notes?: string;
}

/** Request body for rejecting refund */
model RejectRefundRequest {
  /** Rejection reason */
  @minLength(1)
  reason: string;
}

/** Request body for processing refund */
model ProcessRefundRequest {
  /** Reference number */
  referenceNumber?: string;

  /** Notes */
  notes?: string;
}

// --- Response Models ---

/** Single invoice response */
model InvoiceResponse is SingleResourceResponse<Invoice>;

/** Invoice list response */
model InvoiceListResponse is CollectionResponse<Invoice>;

/** Single payment response */
model PaymentResponse is SingleResourceResponse<Payment>;

/** Payment list response */
model PaymentListResponse is CollectionResponse<Payment>;

/** Single refund response */
model RefundResponse is SingleResourceResponse<Refund>;

/** Refund list response */
model RefundListResponse is CollectionResponse<Refund>;

/** Billing summary response */
model BillingSummaryResponse is SingleResourceResponse<BillingSummary>;

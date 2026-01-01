/**
 * ============================================================================
 * BILLING API - Invoice and Payment Management
 * ============================================================================
 *
 * Billing management with:
 * - Invoices
 * - Payments
 * - Refunds
 * - BPJS/JKN claims support
 *
 * ============================================================================
 */

import "@typespec/http";
import "../common/responses.tsp";
import "../common/errors.tsp";
import "../models/billing.tsp";

using TypeSpec.Http;

namespace ProjectAPI;

// ============================================================================
// INVOICES
// ============================================================================

/**
 * Invoices API
 *
 * Invoice management
 */
@route("/v1/orgs/{orgId}/invoices")
@tag("Billing")
interface Invoices {
  /**
   * List invoices
   */
  @get
  @summary("List invoices")
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

    /** Filter by status */
    @query status?: string,

    /** Filter by payment type */
    @query paymentType?: string,

    /** Filter by payer type */
    @query payerType?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate,

    /** Filter overdue only */
    @query overdueOnly?: boolean
  ): InvoiceListResponse | ErrorResponse;

  /**
   * Create invoice
   */
  @post
  @summary("Create invoice")
  create(
    @path orgId: string,
    @body body: CreateInvoiceRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: InvoiceResponse;
      }
    | ErrorResponse;

  /**
   * Get invoice
   */
  @route("/{invoiceId}")
  @get
  @summary("Get invoice")
  get(
    @path orgId: string,
    @path invoiceId: string
  ): InvoiceResponse | ErrorResponse;

  /**
   * Update invoice
   */
  @route("/{invoiceId}")
  @patch(#{ implicitOptionality: true })
  @summary("Update invoice")
  update(
    @path orgId: string,
    @path invoiceId: string,
    @body body: UpdateInvoiceRequest
  ): InvoiceResponse | ErrorResponse;

  /**
   * Approve invoice
   */
  @route("/{invoiceId}/approve")
  @post
  @summary("Approve invoice")
  approve(
    @path orgId: string,
    @path invoiceId: string
  ): InvoiceResponse | ErrorResponse;

  /**
   * Void invoice
   */
  @route("/{invoiceId}/void")
  @post
  @summary("Void invoice")
  voidInvoice(
    @path orgId: string,
    @path invoiceId: string,
    @body body: VoidInvoiceRequest
  ): InvoiceResponse | ErrorResponse;

  /**
   * Get billing summary
   */
  @route("/summary")
  @get
  @summary("Get billing summary")
  getSummary(
    @path orgId: string,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by patient */
    @query patientId?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): BillingSummaryResponse | ErrorResponse;
}

// ============================================================================
// PAYMENTS
// ============================================================================

/**
 * Payments API
 *
 * Payment collection and verification
 */
@route("/v1/orgs/{orgId}/payments")
@tag("Billing")
interface Payments {
  /**
   * List payments
   */
  @get
  @summary("List payments")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by invoice */
    @query invoiceId?: string,

    /** Filter by status */
    @query status?: string,

    /** Filter by payment method */
    @query paymentMethod?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): PaymentListResponse | ErrorResponse;

  /**
   * Create payment
   */
  @post
  @summary("Create payment")
  create(
    @path orgId: string,
    @body body: CreatePaymentRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: PaymentResponse;
      }
    | ErrorResponse;

  /**
   * Get payment
   */
  @route("/{paymentId}")
  @get
  @summary("Get payment")
  get(
    @path orgId: string,
    @path paymentId: string
  ): PaymentResponse | ErrorResponse;

  /**
   * Verify payment
   */
  @route("/{paymentId}/verify")
  @post
  @summary("Verify payment")
  verify(
    @path orgId: string,
    @path paymentId: string,
    @body body: VerifyPaymentRequest
  ): PaymentResponse | ErrorResponse;

  /**
   * Cancel payment
   */
  @route("/{paymentId}/cancel")
  @post
  @summary("Cancel payment")
  cancel(
    @path orgId: string,
    @path paymentId: string
  ): PaymentResponse | ErrorResponse;
}

// ============================================================================
// REFUNDS
// ============================================================================

/**
 * Refunds API
 *
 * Refund processing
 */
@route("/v1/orgs/{orgId}/refunds")
@tag("Billing")
interface Refunds {
  /**
   * List refunds
   */
  @get
  @summary("List refunds")
  list(
    @path orgId: string,

    /** Page number */
    @query page?: int32 = 1,

    /** Page size */
    @query pageSize?: int32 = 50,

    /** Filter by branch */
    @query branchId?: string,

    /** Filter by status */
    @query status?: string,

    /** Date range start */
    @query dateFrom?: plainDate,

    /** Date range end */
    @query dateTo?: plainDate
  ): RefundListResponse | ErrorResponse;

  /**
   * Create refund request
   */
  @post
  @summary("Create refund request")
  create(
    @path orgId: string,
    @body body: CreateRefundRequest
  ):
    | {
        @statusCode statusCode: 201;
        @body body: RefundResponse;
      }
    | ErrorResponse;

  /**
   * Get refund
   */
  @route("/{refundId}")
  @get
  @summary("Get refund")
  get(
    @path orgId: string,
    @path refundId: string
  ): RefundResponse | ErrorResponse;

  /**
   * Approve refund
   */
  @route("/{refundId}/approve")
  @post
  @summary("Approve refund")
  approve(
    @path orgId: string,
    @path refundId: string,
    @body body: ApproveRefundRequest
  ): RefundResponse | ErrorResponse;

  /**
   * Reject refund
   */
  @route("/{refundId}/reject")
  @post
  @summary("Reject refund")
  reject(
    @path orgId: string,
    @path refundId: string,
    @body body: RejectRefundRequest
  ): RefundResponse | ErrorResponse;

  /**
   * Process refund
   */
  @route("/{refundId}/process")
  @post
  @summary("Process refund")
  process(
    @path orgId: string,
    @path refundId: string,
    @body body: ProcessRefundRequest
  ): RefundResponse | ErrorResponse;
}

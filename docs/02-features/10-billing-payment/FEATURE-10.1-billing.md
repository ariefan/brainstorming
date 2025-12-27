# FEATURE-10.1: Billing & Payment Management

> **Module**: Billing & Payment
> **Related User Stories**: US-10.1, US-10.2, US-10.3, US-10.4, US-10.5, US-10.6
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive billing and payment management including service tariff master, automatic charge capture from clinical activities, invoice generation, multi-payment method processing, deposit and refund handling, and daily cash closing reconciliation.

### Business Value
Ensures no billable services are missed through automatic charge capture, supports multiple payment methods for patient convenience, maintains accurate financial records through daily reconciliation, and supports BPJS claims integration.

### User Impact
Billing staff can automatically capture charges from clinical services, cashiers can process payments efficiently with multiple methods, and finance can reconcile daily transactions accurately.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-10.1 | Service Tariff Master | [View](../../01-user-stories/10-billing-payment/US-10.1-10.6-billing-payment.md#us-101-service-tariff-master) |
| US-10.2 | Auto Charge Capture | [View](../../01-user-stories/10-billing-payment/US-10.1-10.6-billing-payment.md#us-102-auto-charge-capture) |
| US-10.3 | Invoice Generation | [View](../../01-user-stories/10-billing-payment/US-10.1-10.6-billing-payment.md#us-103-invoice-generation) |
| US-10.4 | Payment Processing | [View](../../01-user-stories/10-billing-payment/US-10.1-10.6-billing-payment.md#us-104-payment-processing) |
| US-10.5 | Deposit & Refund Handling | [View](../../01-user-stories/10-billing-payment/US-10.1-10.6-billing-payment.md#us-105-deposit--refund-handling) |
| US-10.6 | Daily Cash Closing | [View](../../01-user-stories/10-billing-payment/US-10.1-10.6-billing-payment.md#us-106-daily-cash-closing) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/service-tariffs` | List service tariffs | Yes | All |
| POST | `/api/v1/service-tariffs` | Create service tariff | Yes | Admin |
| GET | `/api/v1/service-tariffs/{id}` | Get tariff details | Yes | All |
| PUT | `/api/v1/service-tariffs/{id}` | Update tariff | Yes | Admin |
| GET | `/api/v1/tariff-classes` | List tariff classes | Yes | All |
| POST | `/api/v1/tariff-classes` | Create tariff class | Yes | Admin |
| GET | `/api/v1/charges` | List charges | Yes | Cashier, Admin |
| POST | `/api/v1/charges` | Create charge | Yes | All (from clinical) |
| PUT | `/api/v1/charges/{id}` | Update charge | Yes | Cashier, Admin |
| POST | `/api/v1/charges/{id}/adjust` | Adjust charge | Yes | Admin |
| GET | `/api/v1/charges/patient/{patient_id}` | Get patient charges | Yes | All |
| GET | `/api/v1/charges/encounter/{encounter_id}` | Get encounter charges | Yes | All |
| POST | `/api/v1/invoices` | Create invoice | Yes | Cashier |
| GET | `/api/v1/invoices` | List invoices | Yes | Cashier, Admin |
| GET | `/api/v1/invoices/{id}` | Get invoice details | Yes | All |
| PUT | `/api/v1/invoices/{id}` | Update invoice | Yes | Cashier |
| POST | `/api/v1/invoices/{id}/finalize` | Finalize invoice | Yes | Cashier |
| POST | `/api/v1/invoices/{id}/void` | Void invoice | Yes | Admin |
| GET | `/api/v1/invoices/{id}/print` | Get printable invoice | Yes | All |
| POST | `/api/v1/payments` | Create payment | Yes | Cashier |
| GET | `/api/v1/payments` | List payments | Yes | Cashier, Admin |
| GET | `/api/v1/payments/{id}` | Get payment details | Yes | Cashier |
| POST | `/api/v1/payments/{id}/cancel` | Cancel payment | Yes | Admin |
| GET | `/api/v1/payments/{id}/receipt` | Get payment receipt | Yes | All |
| POST | `/api/v1/deposits` | Create deposit | Yes | Cashier |
| GET | `/api/v1/deposits` | List deposits | Yes | Cashier, Admin |
| GET | `/api/v1/deposits/patient/{patient_id}` | Get patient deposits | Yes | Cashier |
| POST | `/api/v1/deposits/{id}/apply` | Apply deposit to invoice | Yes | Cashier |
| POST | `/api/v1/refunds` | Create refund request | Yes | Cashier |
| GET | `/api/v1/refunds` | List refunds | Yes | Cashier, Admin |
| POST | `/api/v1/refunds/{id}/approve` | Approve refund | Yes | Admin |
| POST | `/api/v1/refunds/{id}/process` | Process refund | Yes | Cashier |
| GET | `/api/v1/cash-registers` | List cash registers | Yes | Cashier, Admin |
| POST | `/api/v1/cash-registers/{id}/open` | Open register | Yes | Cashier |
| POST | `/api/v1/cash-closings` | Create cash closing | Yes | Cashier |
| GET | `/api/v1/cash-closings` | List cash closings | Yes | Cashier, Admin |
| GET | `/api/v1/cash-closings/{id}` | Get closing details | Yes | Cashier, Admin |
| POST | `/api/v1/cash-closings/{id}/verify` | Verify closing | Yes | Admin |
| GET | `/api/v1/reports/daily-revenue` | Daily revenue report | Yes | Admin |

---

## Detailed Endpoint Specifications

### POST /api/v1/service-tariffs

```yaml
method: POST
path: /api/v1/service-tariffs
description: Create service tariff

authentication:
  required: true
  roles: [admin]

request:
  body:
    type: object
    required: [service_code, service_name, category, base_price]
    properties:
      service_code:
        type: string
        unique: true
      service_name:
        type: string
      service_name_id:
        type: string
        description: Indonesian name
      category:
        type: enum
        values: [consultation, procedure, lab, radiology, pharmacy, room, nursing, other]
      subcategory:
        type: string
        nullable: true
      icd9cm_code:
        type: string
        nullable: true
        description: Procedure coding
      base_price:
        type: decimal
      is_negotiable:
        type: boolean
        default: false
      is_bpjs_claimable:
        type: boolean
        default: true
      bpjs_tariff_code:
        type: string
        nullable: true
      bpjs_price:
        type: decimal
        nullable: true
      is_composite:
        type: boolean
        default: false
      components:
        type: array
        nullable: true
        items:
          type: object
          properties:
            service_code: string
            quantity: decimal
      polyclinic_specific:
        type: boolean
        default: false
      applicable_polyclinics:
        type: array
        items:
          type: uuid
        nullable: true
      effective_from:
        type: date
      effective_until:
        type: date
        nullable: true

response:
  success:
    status: 201
    body:
      id: uuid
      service_code: string
      service_name: string
      category: enum
      base_price: decimal
      is_active: boolean
      effective_from: date

  errors:
    - status: 409
      code: CODE_EXISTS
      message: "Service code already exists"
```

### POST /api/v1/charges

```yaml
method: POST
path: /api/v1/charges
description: Create charge (usually auto-generated from clinical activity)

authentication:
  required: true
  roles: [All]

request:
  body:
    type: object
    required: [patient_id, encounter_id, service_id, source_type, source_id]
    properties:
      patient_id:
        type: uuid
      encounter_id:
        type: uuid
      admission_id:
        type: uuid
        nullable: true
      service_id:
        type: uuid
      source_type:
        type: enum
        values: [encounter, procedure, medication, lab, room, nursing, other]
      source_id:
        type: uuid
        description: Reference to source record
      quantity:
        type: decimal
        default: 1
      tariff_class_id:
        type: uuid
        nullable: true
      is_bpjs:
        type: boolean
        default: false
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      charge_number: string
      service_code: string
      service_name: string
      quantity: decimal
      unit_price: decimal
      discount_amount: decimal
      total: decimal
      is_bpjs: boolean
      bpjs_claim_amount: decimal (nullable)
      status: "pending"

  errors:
    - status: 400
      code: ENCOUNTER_CLOSED
      message: "Cannot add charges to closed encounter"
```

### POST /api/v1/charges/{id}/adjust

```yaml
method: POST
path: /api/v1/charges/{id}/adjust
description: Adjust charge amount

authentication:
  required: true
  roles: [admin]

request:
  path_params:
    id:
      type: uuid
  body:
    type: object
    required: [adjustment_type, adjustment_amount, reason]
    properties:
      adjustment_type:
        type: enum
        values: [discount, correction, write_off, reversal]
      adjustment_amount:
        type: decimal
      reason:
        type: string

response:
  success:
    status: 200
    body:
      id: uuid
      charge_id: uuid
      adjustment_type: enum
      original_amount: decimal
      adjustment_amount: decimal
      new_amount: decimal
      adjusted_by: string
      adjusted_at: datetime
```

### POST /api/v1/invoices

```yaml
method: POST
path: /api/v1/invoices
description: Create invoice from charges

authentication:
  required: true
  roles: [cashier]

request:
  body:
    type: object
    required: [patient_id, charge_ids]
    properties:
      patient_id:
        type: uuid
      encounter_id:
        type: uuid
        nullable: true
      admission_id:
        type: uuid
        nullable: true
      invoice_type:
        type: enum
        values: [outpatient, inpatient, pharmacy_only, lab_only]
      charge_ids:
        type: array
        items:
          type: uuid
      payer_type:
        type: enum
        values: [self_pay, bpjs, insurance, corporate]
        default: self_pay
      payer_id:
        type: uuid
        nullable: true
      payer_name:
        type: string
        nullable: true
      is_bpjs:
        type: boolean
        default: false
      bpjs_sep_number:
        type: string
        nullable: true
      bpjs_class:
        type: enum
        values: [1, 2, 3]
        nullable: true
      discount_percent:
        type: decimal
        default: 0
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      invoice_number: string
      patient:
        id: uuid
        name: string
        mrn: string
      items:
        - service_code: string
          service_name: string
          quantity: decimal
          unit_price: decimal
          discount: decimal
          total: decimal
          bpjs_claim_amount: decimal (nullable)
      subtotal: decimal
      discount_total: decimal
      tax_total: decimal
      grand_total: decimal
      bpjs_covered: decimal
      insurance_covered: decimal
      patient_responsibility: decimal
      status: "draft"

  errors:
    - status: 400
      code: CHARGES_ALREADY_INVOICED
      message: "Some charges are already invoiced"
```

### POST /api/v1/payments

```yaml
method: POST
path: /api/v1/payments
description: Process payment

authentication:
  required: true
  roles: [cashier]

request:
  body:
    type: object
    required: [invoice_id, payment_items]
    properties:
      invoice_id:
        type: uuid
      payment_items:
        type: array
        items:
          type: object
          required: [payment_method, amount]
          properties:
            payment_method:
              type: enum
              values: [cash, debit, credit, qris, transfer, deposit, insurance, bpjs]
            amount:
              type: decimal
            card_type:
              type: string
              nullable: true
            card_last_4:
              type: string
              nullable: true
            approval_code:
              type: string
              nullable: true
            terminal_id:
              type: string
              nullable: true
            bank_name:
              type: string
              nullable: true
            account_number:
              type: string
              nullable: true
            transfer_reference:
              type: string
              nullable: true
            qris_reference:
              type: string
              nullable: true
            qris_merchant_id:
              type: string
              nullable: true
            edc_receipt_number:
              type: string
              nullable: true
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      payment_number: string
      invoice_number: string
      amount_due: decimal
      amount_paid: decimal
      change_amount: decimal
      payment_complete: boolean
      remaining_balance: decimal
      status: enum
      payment_items:
        - payment_method: enum
          amount: decimal
          reference: string (nullable)
      receipt:
        id: uuid
        receipt_number: string
      payment_date: datetime

  errors:
    - status: 400
      code: INVOICE_NOT_FINALIZED
      message: "Invoice must be finalized before payment"
    - status: 400
      code: AMOUNT_MISMATCH
      message: "Payment amount does not match invoice"
```

### POST /api/v1/deposits

```yaml
method: POST
path: /api/v1/deposits
description: Create patient deposit

authentication:
  required: true
  roles: [cashier]

request:
  body:
    type: object
    required: [patient_id, deposit_amount, payment_method]
    properties:
      patient_id:
        type: uuid
      admission_id:
        type: uuid
        nullable: true
      deposit_amount:
        type: decimal
      payment_method:
        type: enum
        values: [cash, debit, credit, transfer]
      payment_reference:
        type: string
        nullable: true
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      deposit_number: string
      patient:
        id: uuid
        name: string
      deposit_amount: decimal
      balance: decimal
      payment_method: enum
      status: "active"
      receipt:
        id: uuid
        receipt_number: string
      deposit_date: datetime
```

### POST /api/v1/deposits/{id}/apply

```yaml
method: POST
path: /api/v1/deposits/{id}/apply
description: Apply deposit to invoice

authentication:
  required: true
  roles: [cashier]

request:
  path_params:
    id:
      type: uuid
  body:
    type: object
    required: [invoice_id, amount]
    properties:
      invoice_id:
        type: uuid
      amount:
        type: decimal
        description: Amount to apply from deposit

response:
  success:
    status: 200
    body:
      deposit_id: uuid
      invoice_id: uuid
      amount_applied: decimal
      deposit_balance_remaining: decimal
      invoice_balance_remaining: decimal

  errors:
    - status: 400
      code: INSUFFICIENT_DEPOSIT
      message: "Deposit balance insufficient"
    - status: 400
      code: AMOUNT_EXCEEDS_INVOICE
      message: "Amount exceeds invoice balance"
```

### POST /api/v1/refunds

```yaml
method: POST
path: /api/v1/refunds
description: Create refund request

authentication:
  required: true
  roles: [cashier]

request:
  body:
    type: object
    required: [patient_id, source_type, source_id, refund_amount, reason]
    properties:
      patient_id:
        type: uuid
      source_type:
        type: enum
        values: [deposit, overpayment, cancellation]
      source_id:
        type: uuid
        description: Deposit or payment ID
      refund_amount:
        type: decimal
      refund_method:
        type: enum
        values: [cash, transfer]
      bank_name:
        type: string
        nullable: true
      account_number:
        type: string
        nullable: true
      account_name:
        type: string
        nullable: true
      reason:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      refund_number: string
      patient:
        id: uuid
        name: string
      refund_amount: decimal
      refund_method: enum
      status: "pending"
      requested_at: datetime
      requested_by: string
```

### POST /api/v1/cash-closings

```yaml
method: POST
path: /api/v1/cash-closings
description: Create daily cash closing

authentication:
  required: true
  roles: [cashier]

request:
  body:
    type: object
    required: [register_id, shift, actual_cash, denomination_counts]
    properties:
      register_id:
        type: uuid
      closing_date:
        type: date
        default: today
      shift:
        type: enum
        values: [morning, afternoon, evening, night]
      actual_cash:
        type: decimal
        description: Physical cash count
      denomination_counts:
        type: array
        items:
          type: object
          properties:
            denomination: integer
            quantity: integer
        description: Cash denomination breakdown
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      closing_number: string
      register_name: string
      closing_date: date
      shift: enum
      summary:
        opening_balance: decimal
        total_cash_in: decimal
        total_cash_out: decimal
        total_deposit_in: decimal
        total_deposit_refund: decimal
        expected_cash: decimal
        actual_cash: decimal
        variance: decimal
        variance_status: enum (balanced/short/over)
      non_cash:
        total_debit: decimal
        total_credit: decimal
        total_qris: decimal
        total_transfer: decimal
      status: "pending"
      closed_by: string
      closing_time: datetime

  errors:
    - status: 400
      code: UNCLOSED_TRANSACTIONS
      message: "There are pending transactions for this shift"
```

### GET /api/v1/reports/daily-revenue

```yaml
method: GET
path: /api/v1/reports/daily-revenue
description: Get daily revenue summary report

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    date:
      type: date
      default: today
    branch_id:
      type: uuid
      nullable: true

response:
  success:
    status: 200
    body:
      report_date: date
      revenue_by_category:
        - category: string
          transaction_count: integer
          gross_amount: decimal
          discount: decimal
          net_amount: decimal
      revenue_by_payment:
        - method: string
          transaction_count: integer
          amount: decimal
      revenue_by_payer:
        - payer_type: string
          transaction_count: integer
          amount: decimal
      outstanding:
        receivables: decimal
        count: integer
      totals:
        gross: decimal
        discount: decimal
        net: decimal
        bpjs_pending: decimal
```

---

## Data Models

### Service Tariff

```yaml
table_name: service_tariffs

fields:
  id:
    type: uuid
    primary_key: true
  service_code:
    type: string(50)
    unique: true
  service_name:
    type: string(255)
  service_name_id:
    type: string(255)
    description: Indonesian name
  category:
    type: enum
    values: [consultation, procedure, lab, radiology, pharmacy, room, nursing, other]
  subcategory:
    type: string(100)
    nullable: true
  icd9cm_code:
    type: string(20)
    nullable: true
  base_price:
    type: decimal(15,2)
  is_negotiable:
    type: boolean
    default: false
  is_bpjs_claimable:
    type: boolean
    default: true
  bpjs_tariff_code:
    type: string(50)
    nullable: true
  bpjs_price:
    type: decimal(15,2)
    nullable: true
  is_composite:
    type: boolean
    default: false
  components:
    type: jsonb
    nullable: true
    description: Array of {service_code, quantity}
  polyclinic_specific:
    type: boolean
    default: false
  applicable_polyclinics:
    type: jsonb
    nullable: true
  effective_from:
    type: date
  effective_until:
    type: date
    nullable: true
  branch_id:
    type: uuid
    foreign_key: branches.id
  is_active:
    type: boolean
    default: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_tariff_code
    fields: [service_code]
    unique: true
  - name: idx_tariff_category
    fields: [category]
  - name: idx_tariff_effective
    fields: [effective_from, effective_until]
```

### Tariff Class

```yaml
table_name: tariff_classes

fields:
  id:
    type: uuid
    primary_key: true
  class_name:
    type: string(100)
  class_code:
    type: string(20)
    unique: true
  multiplier:
    type: decimal(5,2)
    default: 1.0
    description: Price adjustment factor
  is_default:
    type: boolean
    default: false
  branch_id:
    type: uuid
    foreign_key: branches.id
  is_active:
    type: boolean
    default: true

indexes:
  - name: idx_tariff_class_code
    fields: [class_code]
    unique: true
```

### Charge

```yaml
table_name: charges

fields:
  id:
    type: uuid
    primary_key: true
  charge_number:
    type: string(30)
    unique: true
    description: Auto-generated
  patient_id:
    type: uuid
    foreign_key: patients.id
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  admission_id:
    type: uuid
    foreign_key: admissions.id
    nullable: true
  service_id:
    type: uuid
    foreign_key: service_tariffs.id
  service_code:
    type: string(50)
  service_name:
    type: string(255)
  source_type:
    type: enum
    values: [encounter, procedure, medication, lab, room, nursing, other]
  source_id:
    type: uuid
  quantity:
    type: decimal(10,3)
    default: 1
  unit_price:
    type: decimal(15,2)
  discount_percent:
    type: decimal(5,2)
    default: 0
  discount_amount:
    type: decimal(15,2)
    default: 0
  subtotal:
    type: decimal(15,2)
  total:
    type: decimal(15,2)
  tariff_class_id:
    type: uuid
    nullable: true
  is_bpjs:
    type: boolean
    default: false
  bpjs_tariff_code:
    type: string(50)
    nullable: true
  bpjs_claim_amount:
    type: decimal(15,2)
    nullable: true
  status:
    type: enum
    values: [pending, invoiced, paid, cancelled, adjusted]
    default: pending
  service_date:
    type: datetime
  charge_date:
    type: datetime
  invoiced_date:
    type: datetime
    nullable: true
  paid_date:
    type: datetime
    nullable: true
  charged_by:
    type: uuid
    foreign_key: users.id
  charged_at:
    type: datetime
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_charge_patient
    fields: [patient_id]
  - name: idx_charge_encounter
    fields: [encounter_id]
  - name: idx_charge_status
    fields: [status]
  - name: idx_charge_date
    fields: [charge_date]
```

### Charge Adjustment

```yaml
table_name: charge_adjustments

fields:
  id:
    type: uuid
    primary_key: true
  charge_id:
    type: uuid
    foreign_key: charges.id
  adjustment_type:
    type: enum
    values: [discount, correction, write_off, reversal]
  original_amount:
    type: decimal(15,2)
  adjustment_amount:
    type: decimal(15,2)
  new_amount:
    type: decimal(15,2)
  reason:
    type: text
  approved_by:
    type: uuid
    foreign_key: users.id
  adjusted_at:
    type: datetime

indexes:
  - name: idx_adjustment_charge
    fields: [charge_id]
```

### Invoice

```yaml
table_name: invoices

fields:
  id:
    type: uuid
    primary_key: true
  invoice_number:
    type: string(30)
    unique: true
    description: Format INV-YYYYMMDD-XXXX
  patient_id:
    type: uuid
    foreign_key: patients.id
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    nullable: true
  admission_id:
    type: uuid
    foreign_key: admissions.id
    nullable: true
  invoice_type:
    type: enum
    values: [outpatient, inpatient, pharmacy_only, lab_only]
  payer_type:
    type: enum
    values: [self_pay, bpjs, insurance, corporate]
    default: self_pay
  payer_id:
    type: uuid
    nullable: true
  payer_name:
    type: string(255)
    nullable: true
  is_bpjs:
    type: boolean
    default: false
  bpjs_sep_number:
    type: string(30)
    nullable: true
  bpjs_class:
    type: enum
    values: [1, 2, 3]
    nullable: true
  subtotal:
    type: decimal(15,2)
  discount_total:
    type: decimal(15,2)
    default: 0
  tax_total:
    type: decimal(15,2)
    default: 0
  grand_total:
    type: decimal(15,2)
  bpjs_covered:
    type: decimal(15,2)
    default: 0
  insurance_covered:
    type: decimal(15,2)
    default: 0
  patient_responsibility:
    type: decimal(15,2)
  deposit_applied:
    type: decimal(15,2)
    default: 0
  deposit_balance:
    type: decimal(15,2)
    default: 0
  status:
    type: enum
    values: [draft, pending, partial, paid, cancelled, void]
    default: draft
  invoice_date:
    type: datetime
  due_date:
    type: date
  paid_date:
    type: datetime
    nullable: true
  created_by:
    type: uuid
    foreign_key: users.id
  finalized_by:
    type: uuid
    nullable: true
  notes:
    type: text
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_invoice_number
    fields: [invoice_number]
    unique: true
  - name: idx_invoice_patient
    fields: [patient_id]
  - name: idx_invoice_status
    fields: [status]
  - name: idx_invoice_date
    fields: [invoice_date]
```

### Invoice Item

```yaml
table_name: invoice_items

fields:
  id:
    type: uuid
    primary_key: true
  invoice_id:
    type: uuid
    foreign_key: invoices.id
  charge_id:
    type: uuid
    foreign_key: charges.id
  line_number:
    type: integer
  service_code:
    type: string(50)
  service_name:
    type: string(255)
  quantity:
    type: decimal(10,3)
  unit_price:
    type: decimal(15,2)
  discount:
    type: decimal(15,2)
    default: 0
  total:
    type: decimal(15,2)
  bpjs_claim_amount:
    type: decimal(15,2)
    nullable: true
  patient_portion:
    type: decimal(15,2)

indexes:
  - name: idx_invoice_item_invoice
    fields: [invoice_id]
  - name: idx_invoice_item_charge
    fields: [charge_id]
```

### Payment

```yaml
table_name: payments

fields:
  id:
    type: uuid
    primary_key: true
  payment_number:
    type: string(30)
    unique: true
    description: Format PAY-YYYYMMDD-XXXX
  invoice_id:
    type: uuid
    foreign_key: invoices.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  amount_due:
    type: decimal(15,2)
  amount_paid:
    type: decimal(15,2)
  change_amount:
    type: decimal(15,2)
    default: 0
  payment_complete:
    type: boolean
  remaining_balance:
    type: decimal(15,2)
  status:
    type: enum
    values: [completed, partial, cancelled, refunded]
  payment_date:
    type: datetime
  created_by:
    type: uuid
    foreign_key: users.id
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_payment_number
    fields: [payment_number]
    unique: true
  - name: idx_payment_invoice
    fields: [invoice_id]
  - name: idx_payment_patient
    fields: [patient_id]
  - name: idx_payment_date
    fields: [payment_date]
```

### Payment Item

```yaml
table_name: payment_items

fields:
  id:
    type: uuid
    primary_key: true
  payment_id:
    type: uuid
    foreign_key: payments.id
  payment_method:
    type: enum
    values: [cash, debit, credit, qris, transfer, deposit, insurance, bpjs]
  amount:
    type: decimal(15,2)
  card_type:
    type: string(50)
    nullable: true
  card_last_4:
    type: string(4)
    nullable: true
  approval_code:
    type: string(50)
    nullable: true
  terminal_id:
    type: string(50)
    nullable: true
  bank_name:
    type: string(100)
    nullable: true
  account_number:
    type: string(50)
    nullable: true
  transfer_reference:
    type: string(100)
    nullable: true
  qris_reference:
    type: string(100)
    nullable: true
  qris_merchant_id:
    type: string(50)
    nullable: true
  edc_receipt_number:
    type: string(50)
    nullable: true
  processed_at:
    type: datetime
  processed_by:
    type: uuid
    foreign_key: users.id

indexes:
  - name: idx_payment_item_payment
    fields: [payment_id]
```

### Deposit

```yaml
table_name: deposits

fields:
  id:
    type: uuid
    primary_key: true
  deposit_number:
    type: string(30)
    unique: true
    description: Format DEP-YYYYMMDD-XXXX
  patient_id:
    type: uuid
    foreign_key: patients.id
  admission_id:
    type: uuid
    foreign_key: admissions.id
    nullable: true
  deposit_amount:
    type: decimal(15,2)
  used_amount:
    type: decimal(15,2)
    default: 0
  balance:
    type: decimal(15,2)
    description: Calculated field
  payment_method:
    type: enum
    values: [cash, debit, credit, transfer]
  payment_reference:
    type: string(100)
    nullable: true
  status:
    type: enum
    values: [active, applied, refunded, expired]
    default: active
  deposit_date:
    type: datetime
  received_by:
    type: uuid
    foreign_key: users.id
  refund_id:
    type: uuid
    nullable: true
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_deposit_number
    fields: [deposit_number]
    unique: true
  - name: idx_deposit_patient
    fields: [patient_id]
  - name: idx_deposit_status
    fields: [status]
```

### Cash Closing

```yaml
table_name: cash_closings

fields:
  id:
    type: uuid
    primary_key: true
  closing_number:
    type: string(30)
    unique: true
    description: Format CLO-YYYYMMDD-XXXX
  register_id:
    type: uuid
    foreign_key: cash_registers.id
  closing_date:
    type: date
  shift:
    type: enum
    values: [morning, afternoon, evening, night]
  opening_balance:
    type: decimal(15,2)
  opening_time:
    type: datetime
  total_cash_in:
    type: decimal(15,2)
  total_cash_out:
    type: decimal(15,2)
  total_deposit_in:
    type: decimal(15,2)
  total_deposit_refund:
    type: decimal(15,2)
  total_debit:
    type: decimal(15,2)
  total_credit:
    type: decimal(15,2)
  total_qris:
    type: decimal(15,2)
  total_transfer:
    type: decimal(15,2)
  expected_cash:
    type: decimal(15,2)
  actual_cash:
    type: decimal(15,2)
  variance:
    type: decimal(15,2)
  variance_status:
    type: enum
    values: [balanced, short, over]
  variance_reason:
    type: text
    nullable: true
  closing_time:
    type: datetime
  closed_by:
    type: uuid
    foreign_key: users.id
  verified_by:
    type: uuid
    nullable: true
  status:
    type: enum
    values: [pending, closed, verified]
    default: pending
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_closing_number
    fields: [closing_number]
    unique: true
  - name: idx_closing_date
    fields: [closing_date]
  - name: idx_closing_register
    fields: [register_id]
```

---

## Business Rules

### Service Tariff
- Service code must be unique
- Effective dates control tariff validity
- BPJS-claimable services must have BPJS tariff code
- Composite services aggregate component prices

### Charge Capture
- Auto-capture from clinical activities (encounter, procedure, medication, lab)
- Cannot add charges to closed encounters
- Room charges auto-generated daily for inpatients
- Quantity and unit price from tariff at time of service

### Invoice Generation
- Invoice created from pending charges
- Cannot invoice already-invoiced charges
- BPJS invoices include SEP number
- Due date configurable by payer type

### Payment Processing
- Split payments supported (multiple methods)
- Cash payments track change amount
- Card payments require approval code
- Deposit can be applied as payment method

### Deposit Handling
- Deposits tracked per patient
- Can be applied to multiple invoices
- Balance tracked in real-time
- Refund requires approval workflow

### Refund Processing
- Refund request requires reason
- Admin approval required
- Cash refunds processed immediately
- Transfer refunds tracked with reference

### Cash Closing
- Required at end of each shift
- Physical cash count required
- Variance documented and explained
- Supervisor verification for variances

### BPJS Integration
- Claims tracked separately
- INA-CBG tariffs applied
- Patient portion calculated
- Pending claims tracked for follow-up

---

## Payment Methods

| Method | Requirements | Auto-Reconcile |
|--------|--------------|----------------|
| Cash | Physical count | Yes (at closing) |
| Debit Card | EDC terminal, approval code | Yes |
| Credit Card | EDC terminal, approval code | Yes |
| QRIS | QR reference, merchant ID | Yes |
| Bank Transfer | Reference number, account | Manual |
| Deposit | Patient deposit balance | Yes |
| Insurance | Claim approval | Manual |
| BPJS | SEP number, INA-CBG | Manual |

---

## Charge Sources

| Source | Trigger | Auto/Manual |
|--------|---------|-------------|
| Consultation | Encounter completed | Auto |
| Procedure | Procedure documented | Auto |
| Medication | Prescription dispensed | Auto |
| Laboratory | Lab result authorized | Auto |
| Room | Daily (inpatient) | Auto |
| Nursing | Nursing services recorded | Auto |
| Other | Manual entry | Manual |

---

## Dependencies

- All clinical modules (charge sources)
- FEATURE-1.1: Patient Registration (patient data)
- FEATURE-7.1: Inpatient (room charges)
- FEATURE-8.1: Pharmacy (medication charges)
- FEATURE-9.1: Laboratory (lab charges)
- BPJS Integration (claims)

## Enables

- Financial Reporting
- BPJS Claims submission
- Revenue analytics

# FEATURE-8.1: Pharmacy Management

> **Module**: Pharmacy
> **Related User Stories**: US-8.1, US-8.2, US-8.3, US-8.4, US-8.5, US-8.6
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive pharmacy management including medication master with KFA (Katalog Farmasi Alkes) integration, inventory management with batch tracking, prescription queue processing, drug interaction checking, controlled substance handling, and medication label printing.

### Business Value
Ensures patient safety through drug interaction checking and proper medication dispensing, maintains regulatory compliance for controlled substances, optimizes inventory through batch tracking and expiry alerts, and supports Satusehat integration via KFA coding.

### User Impact
Pharmacists can efficiently process prescriptions with safety checks, manage inventory with automated alerts, and ensure regulatory compliance for controlled substances. Patients receive properly labeled medications with clear instructions.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-8.1 | Medication Master (KFA Integration) | [View](../../01-user-stories/08-pharmacy/US-8.1-8.6-pharmacy.md#us-81-medication-master-kfa-integration) |
| US-8.2 | Inventory Management | [View](../../01-user-stories/08-pharmacy/US-8.1-8.6-pharmacy.md#us-82-inventory-management) |
| US-8.3 | Prescription Queue & Dispensing | [View](../../01-user-stories/08-pharmacy/US-8.1-8.6-pharmacy.md#us-83-prescription-queue--dispensing) |
| US-8.4 | Drug Interaction Checking | [View](../../01-user-stories/08-pharmacy/US-8.1-8.6-pharmacy.md#us-84-drug-interaction-checking) |
| US-8.5 | Narcotic & Psychotropic Handling | [View](../../01-user-stories/08-pharmacy/US-8.1-8.6-pharmacy.md#us-85-narcotic--psychotropic-handling) |
| US-8.6 | Label Printing & Patient Instructions | [View](../../01-user-stories/08-pharmacy/US-8.1-8.6-pharmacy.md#us-86-label-printing--patient-instructions) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/medications` | List medications | Yes | All |
| POST | `/api/v1/medications` | Create medication | Yes | Pharmacist, Admin |
| GET | `/api/v1/medications/{id}` | Get medication details | Yes | All |
| PUT | `/api/v1/medications/{id}` | Update medication | Yes | Pharmacist, Admin |
| GET | `/api/v1/medications/search-kfa` | Search KFA catalog | Yes | Pharmacist |
| POST | `/api/v1/medications/check-interactions` | Check drug interactions | Yes | Doctor, Pharmacist |
| GET | `/api/v1/medication-stock` | List stock levels | Yes | Pharmacist |
| GET | `/api/v1/medication-stock/{id}` | Get stock details | Yes | Pharmacist |
| PUT | `/api/v1/medication-stock/{id}` | Update stock settings | Yes | Pharmacist |
| GET | `/api/v1/medication-batches` | List batches | Yes | Pharmacist |
| POST | `/api/v1/medication-batches` | Receive new batch | Yes | Pharmacist |
| POST | `/api/v1/stock-movements` | Record stock movement | Yes | Pharmacist |
| GET | `/api/v1/stock-alerts` | List stock alerts | Yes | Pharmacist |
| PUT | `/api/v1/stock-alerts/{id}/acknowledge` | Acknowledge alert | Yes | Pharmacist |
| GET | `/api/v1/pharmacy-queue` | List pharmacy queue | Yes | Pharmacist |
| PUT | `/api/v1/pharmacy-queue/{id}/status` | Update queue status | Yes | Pharmacist |
| POST | `/api/v1/dispenses` | Create dispense | Yes | Pharmacist |
| GET | `/api/v1/dispenses/{id}` | Get dispense details | Yes | Pharmacist |
| POST | `/api/v1/dispenses/{id}/verify` | Verify dispense | Yes | Pharmacist |
| POST | `/api/v1/dispenses/{id}/complete` | Complete dispense | Yes | Pharmacist |
| GET | `/api/v1/controlled-substance-log` | List controlled log | Yes | Pharmacist, Admin |
| POST | `/api/v1/controlled-substance-log` | Record controlled transaction | Yes | Pharmacist |
| GET | `/api/v1/controlled-substance-balance` | Get monthly balance | Yes | Pharmacist, Admin |
| POST | `/api/v1/medication-labels` | Generate label | Yes | Pharmacist |
| POST | `/api/v1/stock-takes` | Create stock take | Yes | Pharmacist |
| GET | `/api/v1/stock-takes/{id}` | Get stock take | Yes | Pharmacist |
| PUT | `/api/v1/stock-takes/{id}/items` | Update stock take items | Yes | Pharmacist |

---

## Detailed Endpoint Specifications

### GET /api/v1/medications/search-kfa

```yaml
method: GET
path: /api/v1/medications/search-kfa
description: Search KFA (Katalog Farmasi Alkes) catalog

authentication:
  required: true
  roles: [pharmacist, admin]

request:
  query_params:
    q:
      type: string
      required: true
      description: Search term (generic name, brand name, or KFA code)
    category:
      type: enum
      values: [obat_keras, obat_bebas, obat_bebas_terbatas, narkotika, psikotropika, fitofarmaka]
    form:
      type: enum
      values: [tablet, capsule, syrup, injection, cream, drops, inhaler, other]
    limit:
      type: integer
      default: 20

response:
  success:
    status: 200
    body:
      data:
        - kfa_code: string
          kfa_display: string
          generic_name: string
          brand_name: string
          manufacturer: string
          form: enum
          strength: string
          category: enum
          het: decimal
          is_registered: boolean
```

### POST /api/v1/medications/check-interactions

```yaml
method: POST
path: /api/v1/medications/check-interactions
description: Check drug-drug and drug-allergy interactions

authentication:
  required: true
  roles: [doctor, pharmacist]

request:
  body:
    type: object
    required: [patient_id, medications]
    properties:
      patient_id:
        type: uuid
        description: Patient ID for allergy checking
      medications:
        type: array
        items:
          type: object
          properties:
            medication_id: uuid
            kfa_code: string
      include_current_medications:
        type: boolean
        default: true
        description: Include patient's current active medications

response:
  success:
    status: 200
    body:
      status: enum (clear/warning/blocked)
      interactions:
        - drug_a:
            kfa_code: string
            name: string
          drug_b:
            kfa_code: string
            name: string
          severity: enum (contraindicated/severe/moderate/mild)
          interaction_type: enum
          clinical_effect: string
          management: string
      allergy_alerts:
        - medication:
            kfa_code: string
            name: string
          allergy:
            allergen: string
            reaction: string
            severity: enum
          recommendation: string
      override_required: boolean
```

### POST /api/v1/medication-batches

```yaml
method: POST
path: /api/v1/medication-batches
description: Receive new medication batch

authentication:
  required: true
  roles: [pharmacist]

request:
  body:
    type: object
    required: [medication_id, batch_number, quantity, expiry_date, purchase_price]
    properties:
      medication_id:
        type: uuid
      batch_number:
        type: string
      lot_number:
        type: string
        nullable: true
      quantity:
        type: decimal
      unit:
        type: string
      manufacture_date:
        type: date
        nullable: true
      expiry_date:
        type: date
      supplier_id:
        type: uuid
        nullable: true
      supplier_name:
        type: string
      purchase_order_number:
        type: string
        nullable: true
      purchase_price:
        type: decimal
      storage_location:
        type: string
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      batch_number: string
      medication:
        id: uuid
        name: string
        kfa_code: string
      quantity: decimal
      expiry_date: date
      stock_movement_id: uuid

  errors:
    - status: 400
      code: EXPIRED_BATCH
      message: "Cannot receive already expired batch"
    - status: 400
      code: DUPLICATE_BATCH
      message: "Batch number already exists for this medication"
```

### GET /api/v1/pharmacy-queue

```yaml
method: GET
path: /api/v1/pharmacy-queue
description: List pharmacy prescription queue

authentication:
  required: true
  roles: [pharmacist]

request:
  query_params:
    status:
      type: enum
      values: [pending, verifying, preparing, checking, ready, completed, cancelled]
    priority:
      type: enum
      values: [normal, urgent, stat]
    date:
      type: date
      default: today

response:
  success:
    status: 200
    body:
      queue_stats:
        pending: integer
        in_progress: integer
        ready: integer
      data:
        - id: uuid
          queue_number: string
          patient:
            id: uuid
            name: string
            allergies: array[string]
          prescription:
            id: uuid
            prescription_number: string
            prescriber: string
            items_count: integer
          status: enum
          priority: enum
          has_issue: boolean
          issue_type: enum
          received_at: datetime
          wait_time_minutes: integer
```

### POST /api/v1/dispenses

```yaml
method: POST
path: /api/v1/dispenses
description: Create medication dispense

authentication:
  required: true
  roles: [pharmacist]

request:
  body:
    type: object
    required: [prescription_id, pharmacy_queue_id, items]
    properties:
      prescription_id:
        type: uuid
      pharmacy_queue_id:
        type: uuid
      items:
        type: array
        items:
          type: object
          required: [prescription_item_id, medication_id, batch_id, quantity_dispensed]
          properties:
            prescription_item_id:
              type: uuid
            medication_id:
              type: uuid
            batch_id:
              type: uuid
            quantity_dispensed:
              type: decimal
            is_substituted:
              type: boolean
              default: false
            original_medication_id:
              type: uuid
              nullable: true
            substitution_reason:
              type: string
              nullable: true
            signa:
              type: string
              description: Patient instructions
            notes:
              type: string

response:
  success:
    status: 201
    body:
      id: uuid
      dispense_number: string
      prescription_id: uuid
      status: "in_progress"
      items:
        - id: uuid
          medication_name: string
          quantity_dispensed: decimal
          batch_number: string
          unit_price: decimal
          total_price: decimal
      total_amount: decimal

  errors:
    - status: 400
      code: INSUFFICIENT_STOCK
      message: "Insufficient stock for {medication_name}"
    - status: 400
      code: BATCH_EXPIRED
      message: "Selected batch has expired"
    - status: 400
      code: INTERACTION_OVERRIDE_REQUIRED
      message: "Drug interaction requires pharmacist override"
```

### POST /api/v1/controlled-substance-log

```yaml
method: POST
path: /api/v1/controlled-substance-log
description: Record controlled substance transaction

authentication:
  required: true
  roles: [pharmacist]

request:
  body:
    type: object
    required: [medication_id, batch_id, transaction_type, quantity, witnessed_by]
    properties:
      medication_id:
        type: uuid
      batch_id:
        type: uuid
      dispense_item_id:
        type: uuid
        nullable: true
      transaction_type:
        type: enum
        values: [received, dispensed, returned, destroyed, adjustment]
      quantity:
        type: decimal
      unit:
        type: string
      prescription_number:
        type: string
        nullable: true
      patient_id:
        type: uuid
        nullable: true
      patient_nik:
        type: string
        nullable: true
      prescriber_id:
        type: uuid
        nullable: true
      prescriber_sip:
        type: string
        nullable: true
      witnessed_by:
        type: uuid
        description: Second pharmacist as witness
      destruction_method:
        type: string
        nullable: true
      destruction_certificate:
        type: string
        nullable: true
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      medication_name: string
      transaction_type: enum
      quantity: decimal
      balance_before: decimal
      balance_after: decimal
      performed_by: string
      witnessed_by: string
      timestamp: datetime

  errors:
    - status: 400
      code: WITNESS_REQUIRED
      message: "Controlled substance transaction requires witness"
    - status: 400
      code: SAME_PERSON_WITNESS
      message: "Witness must be different from performer"
    - status: 400
      code: NEGATIVE_BALANCE
      message: "Transaction would result in negative balance"
```

### POST /api/v1/medication-labels

```yaml
method: POST
path: /api/v1/medication-labels
description: Generate medication label for printing

authentication:
  required: true
  roles: [pharmacist]

request:
  body:
    type: object
    required: [dispense_item_id]
    properties:
      dispense_item_id:
        type: uuid
      template_type:
        type: enum
        values: [standard, controlled, external]
        default: standard
      custom_warnings:
        type: array
        items:
          type: string

response:
  success:
    status: 201
    body:
      id: uuid
      label_content:
        clinic_name: string
        clinic_address: string
        patient_name: string
        prescription_number: string
        prescription_date: date
        medication_name: string
        strength: string
        quantity: string
        signa: string
        warnings: array[string]
        storage: string
        expiry_date: date
        pharmacist_name: string
      print_ready: boolean
```

---

## Data Models

### Medication

```yaml
table_name: medications

fields:
  id:
    type: uuid
    primary_key: true
  kfa_code:
    type: string(50)
    unique: true
    description: From KFA catalog
  kfa_display:
    type: string(255)
  generic_name:
    type: string(255)
  brand_name:
    type: string(255)
    nullable: true
  manufacturer:
    type: string(255)
  category:
    type: enum
    values: [obat_keras, obat_bebas, obat_bebas_terbatas, narkotika, psikotropika, fitofarmaka]
  therapeutic_class:
    type: string(100)
  pharmacological_class:
    type: string(100)
  form:
    type: enum
    values: [tablet, capsule, syrup, suspension, injection, cream, ointment, drops, inhaler, suppository, patch, other]
  strength:
    type: string(100)
  strength_value:
    type: decimal(10,3)
  strength_unit:
    type: string(20)
  package_unit:
    type: string(50)
  smallest_unit:
    type: string(50)
  contents_per_package:
    type: integer
  hna:
    type: decimal(15,2)
    description: Harga Netto Apotek
  het:
    type: decimal(15,2)
    description: Harga Eceran Tertinggi
  selling_price:
    type: decimal(15,2)
  is_bpjs:
    type: boolean
    default: false
  bpjs_price:
    type: decimal(15,2)
    nullable: true
  storage_condition:
    type: enum
    values: [room_temp, refrigerated, frozen]
    default: room_temp
  storage_instructions:
    type: text
  is_controlled:
    type: boolean
    default: false
  controlled_category:
    type: enum
    values: [narkotika_golongan_2, narkotika_golongan_3, psikotropika_golongan_4]
    nullable: true
  is_active:
    type: boolean
    default: true
  is_formulary:
    type: boolean
    default: true
  max_daily_dose:
    type: string
    nullable: true
  contraindications:
    type: text
    nullable: true
  drug_interactions:
    type: jsonb
    description: Array of interaction definitions
  branch_id:
    type: uuid
    foreign_key: branches.id
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_medication_kfa
    fields: [kfa_code]
    unique: true
  - name: idx_medication_generic
    fields: [generic_name]
  - name: idx_medication_category
    fields: [category]
  - name: idx_medication_controlled
    fields: [is_controlled]
```

### Medication Stock

```yaml
table_name: medication_stock

fields:
  id:
    type: uuid
    primary_key: true
  medication_id:
    type: uuid
    foreign_key: medications.id
    unique: true
  current_quantity:
    type: decimal(15,3)
  reserved_quantity:
    type: decimal(15,3)
    default: 0
  minimum_stock:
    type: decimal(15,3)
  maximum_stock:
    type: decimal(15,3)
  reorder_point:
    type: decimal(15,3)
  reorder_quantity:
    type: decimal(15,3)
  storage_location:
    type: string(100)
  shelf_number:
    type: string(50)
  last_stock_take:
    type: datetime
    nullable: true
  updated_at:
    type: datetime

indexes:
  - name: idx_stock_medication
    fields: [medication_id]
    unique: true
```

### Medication Batch

```yaml
table_name: medication_batches

fields:
  id:
    type: uuid
    primary_key: true
  medication_id:
    type: uuid
    foreign_key: medications.id
  batch_number:
    type: string(50)
  lot_number:
    type: string(50)
    nullable: true
  received_quantity:
    type: decimal(15,3)
  current_quantity:
    type: decimal(15,3)
  unit:
    type: string(20)
  manufacture_date:
    type: date
    nullable: true
  expiry_date:
    type: date
  received_date:
    type: date
  supplier_id:
    type: uuid
    nullable: true
  supplier_name:
    type: string(255)
  purchase_order_number:
    type: string(50)
    nullable: true
  purchase_price:
    type: decimal(15,2)
  total_cost:
    type: decimal(15,2)
  status:
    type: enum
    values: [active, quarantine, expired, depleted, recalled]
    default: active
  quarantine_reason:
    type: text
    nullable: true
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_batch_medication
    fields: [medication_id]
  - name: idx_batch_expiry
    fields: [expiry_date]
  - name: idx_batch_status
    fields: [status]
  - name: idx_batch_number
    fields: [medication_id, batch_number]
    unique: true
```

### Stock Movement

```yaml
table_name: stock_movements

fields:
  id:
    type: uuid
    primary_key: true
  medication_id:
    type: uuid
    foreign_key: medications.id
  batch_id:
    type: uuid
    foreign_key: medication_batches.id
  movement_type:
    type: enum
    values: [received, dispensed, adjustment, transfer, return, expired, damaged]
  quantity:
    type: decimal(15,3)
  direction:
    type: enum
    values: [in, out]
  balance_before:
    type: decimal(15,3)
  balance_after:
    type: decimal(15,3)
  reference_type:
    type: enum
    values: [purchase_order, prescription, adjustment, transfer, return]
  reference_id:
    type: uuid
    nullable: true
  reason:
    type: text
    nullable: true
  performed_by:
    type: uuid
    foreign_key: users.id
  performed_at:
    type: datetime
  verified_by:
    type: uuid
    nullable: true
  notes:
    type: text

indexes:
  - name: idx_movement_medication
    fields: [medication_id]
  - name: idx_movement_batch
    fields: [batch_id]
  - name: idx_movement_date
    fields: [performed_at]
```

### Dispense

```yaml
table_name: dispenses

fields:
  id:
    type: uuid
    primary_key: true
  dispense_number:
    type: string(30)
    unique: true
    description: Format DSP-YYYYMMDD-XXXX
  prescription_id:
    type: uuid
    foreign_key: prescriptions.id
  pharmacy_queue_id:
    type: uuid
    foreign_key: pharmacy_queue.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  status:
    type: enum
    values: [in_progress, completed, cancelled, returned]
    default: in_progress
  dispensed_at:
    type: datetime
  dispensed_by:
    type: uuid
    foreign_key: users.id
  verified_by:
    type: uuid
    foreign_key: users.id
    nullable: true
  total_items:
    type: integer
  total_amount:
    type: decimal(15,2)
  is_bpjs:
    type: boolean
    default: false
  satusehat_dispense_ids:
    type: jsonb
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_dispense_prescription
    fields: [prescription_id]
  - name: idx_dispense_patient
    fields: [patient_id]
  - name: idx_dispense_date
    fields: [dispensed_at]
```

### Dispense Item

```yaml
table_name: dispense_items

fields:
  id:
    type: uuid
    primary_key: true
  dispense_id:
    type: uuid
    foreign_key: dispenses.id
  prescription_item_id:
    type: uuid
    foreign_key: prescription_items.id
  medication_id:
    type: uuid
    foreign_key: medications.id
  batch_id:
    type: uuid
    foreign_key: medication_batches.id
  quantity_prescribed:
    type: decimal(10,3)
  quantity_dispensed:
    type: decimal(10,3)
  quantity_unit:
    type: string(20)
  is_substituted:
    type: boolean
    default: false
  original_medication_id:
    type: uuid
    nullable: true
  substitution_reason:
    type: text
    nullable: true
  unit_price:
    type: decimal(15,2)
  total_price:
    type: decimal(15,2)
  discount:
    type: decimal(15,2)
    default: 0
  final_price:
    type: decimal(15,2)
  signa:
    type: text
  label_printed:
    type: boolean
    default: false
  notes:
    type: text

indexes:
  - name: idx_dispense_item_dispense
    fields: [dispense_id]
  - name: idx_dispense_item_batch
    fields: [batch_id]
```

### Controlled Substance Log

```yaml
table_name: controlled_substance_logs

fields:
  id:
    type: uuid
    primary_key: true
  medication_id:
    type: uuid
    foreign_key: medications.id
  batch_id:
    type: uuid
    foreign_key: medication_batches.id
  dispense_item_id:
    type: uuid
    foreign_key: dispense_items.id
    nullable: true
  transaction_type:
    type: enum
    values: [received, dispensed, returned, destroyed, adjustment]
  transaction_date:
    type: datetime
  quantity:
    type: decimal(10,3)
  unit:
    type: string(20)
  balance_before:
    type: decimal(10,3)
  balance_after:
    type: decimal(10,3)
  prescription_number:
    type: string
    nullable: true
  patient_id:
    type: uuid
    nullable: true
  patient_nik:
    type: string(16)
    nullable: true
  prescriber_id:
    type: uuid
    nullable: true
  prescriber_sip:
    type: string
    nullable: true
  performed_by:
    type: uuid
    foreign_key: users.id
  witnessed_by:
    type: uuid
    foreign_key: users.id
  witness_signature:
    type: string
    nullable: true
  destruction_method:
    type: text
    nullable: true
  destruction_witness:
    type: string
    nullable: true
  destruction_certificate:
    type: string
    nullable: true
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_controlled_log_medication
    fields: [medication_id]
  - name: idx_controlled_log_date
    fields: [transaction_date]
  - name: idx_controlled_log_type
    fields: [transaction_type]
```

---

## FHIR Resource Mapping

### Medication

```yaml
fhir_medication:
  resourceType: Medication
  identifier:
    - system: "http://sys-ids.kemkes.go.id/kfa"
      value: medication.kfa_code
  code:
    coding:
      - system: "http://sys-ids.kemkes.go.id/kfa"
        code: medication.kfa_code
        display: medication.generic_name
  status: active
  manufacturer:
    display: medication.manufacturer
  form:
    coding:
      - system: "http://terminology.kemkes.go.id/CodeSystem/medication-form"
        code: form_code
        display: medication.form
  ingredient:
    - itemCodeableConcept:
        coding:
          - display: medication.generic_name
      strength:
        numerator:
          value: medication.strength_value
          unit: medication.strength_unit
          system: "http://unitsofmeasure.org"
```

### MedicationDispense

```yaml
fhir_medication_dispense:
  resourceType: MedicationDispense
  identifier:
    - system: "http://sys-ids.kemkes.go.id/prescription-item/{org_id}"
      value: dispense_item.id
  status: completed
  category:
    coding:
      - system: "http://terminology.hl7.org/fhir/CodeSystem/medicationdispense-category"
        code: outpatient
        display: "Outpatient"
  medicationReference:
    reference: "Medication/{kfa_id}"
    display: medication.generic_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  context:
    reference: "Encounter/{satusehat_encounter_id}"
  performer:
    - actor:
        reference: "Practitioner/{ihs_practitioner_id}"
  authorizingPrescription:
    - reference: "MedicationRequest/{satusehat_medication_request_id}"
  quantity:
    value: dispense_item.quantity_dispensed
    unit: dispense_item.quantity_unit
    system: "http://unitsofmeasure.org"
  whenHandedOver: dispense.dispensed_at
  dosageInstruction:
    - text: dispense_item.signa
```

---

## Business Rules

### Medication Registration
- KFA code is mandatory for Satusehat integration
- Controlled substances require additional classification
- BPJS medications must have BPJS price configured
- Formulary status determines availability in clinic

### Inventory Management
- FEFO (First Expired, First Out) for dispensing
- Stock alerts trigger at reorder point
- Expiry alerts at 90/60/30 days before expiry
- Expired batches automatically marked and excluded from dispensing

### Dispensing Rules
- Drug interaction check required before dispensing
- Patient allergy check mandatory
- Severe interactions require pharmacist override with documentation
- Controlled substances require witness signature
- Substitution requires documentation and patient consent

### Controlled Substance Rules
- Two pharmacists required for all transactions
- Witness signature mandatory
- Patient NIK recorded for dispensing
- Prescriber SIP recorded
- Monthly balance reconciliation required
- Physical count must match system balance

### Label Requirements
- Patient name and MRN
- Medication name and strength
- Dosage instructions (Signa) in Indonesian
- Storage instructions
- Expiry date
- Pharmacist name
- Warnings for high-alert medications

### Stock Take
- Full stock take required monthly for controlled substances
- Spot checks for regular medications
- Variance must be documented and approved
- Adjustments create audit trail

---

## Medication Categories Reference

| Category | Description | Requirements |
|----------|-------------|--------------|
| Obat Bebas | Over-the-counter | No prescription needed |
| Obat Bebas Terbatas | Limited OTC | May require pharmacist guidance |
| Obat Keras | Prescription only | Requires doctor prescription |
| Narkotika Golongan 2 | Narcotic Class 2 | Special prescription, witness required |
| Narkotika Golongan 3 | Narcotic Class 3 | Special prescription, witness required |
| Psikotropika Golongan 4 | Psychotropic Class 4 | Prescription, witness required |
| Fitofarmaka | Herbal medicine | May be available without prescription |

---

## Dispensing Workflow

```
Prescription Created → Pharmacy Queue (pending)
                            ↓
                    Pharmacist Review (verifying)
                      - Check interactions
                      - Check allergies
                      - Check stock availability
                            ↓
                    Dispensing (preparing)
                      - Select batches (FEFO)
                      - Deduct stock
                      - Generate labels
                            ↓
                    Verification (checking)
                      - Second pharmacist check
                      - For controlled: witness signature
                            ↓
                    Handover to Patient (completed)
                      - Patient counseling
                      - Satusehat sync
```

---

## Dependencies

- FEATURE-4.2: Prescription Orders (prescription data)
- FEATURE-1.1: Patient Registration (patient allergies)
- FEATURE-2.2: Practitioner Management (prescriber validation)
- KFA Catalog (medication master data)

## Enables

- FEATURE-10.1: Billing (medication charges)
- FEATURE-7.1: Inpatient (medication administration)
- Satusehat (MedicationDispense)
- BPJS Integration (medication claims)

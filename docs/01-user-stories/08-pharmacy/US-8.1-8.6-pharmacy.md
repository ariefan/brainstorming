# Pharmacy

> **Module**: 08 - Pharmacy
> **Stories**: US-8.1 to US-8.6
> **Priority**: P0 (Critical)
> **FHIR Resources**: Medication, MedicationDispense
> **Integration**: KFA (Katalog Farmasi Alkes)

---

## US-8.1: Medication Master (KFA Integration)

### User Story
**As a** pharmacy manager
**I want to** manage medication master data with KFA codes
**So that** medications are standardized and Satusehat-compliant

### Acceptance Criteria

- [ ] **GIVEN** pharmacy needs to add medication
      **WHEN** searching KFA catalog
      **THEN** system provides standardized medication data

- [ ] **GIVEN** medication is registered
      **WHEN** syncing to Satusehat
      **THEN** Medication resource uses KFA coding

### Data Model

```yaml
medication:
  id: uuid
  kfa_code: string (unique, from KFA)
  kfa_display: string

  # Names
  generic_name: string
  brand_name: string (nullable)
  manufacturer: string

  # Classification
  category: enum (obat_keras/obat_bebas/obat_bebas_terbatas/narkotika/psikotropika/fitofarmaka)
  therapeutic_class: string
  pharmacological_class: string

  # Form & Strength
  form: enum (tablet/capsule/syrup/suspension/injection/cream/ointment/drops/inhaler/suppository/patch/other)
  strength: string # e.g., "500mg", "100mg/5ml"
  strength_value: decimal
  strength_unit: string

  # Packaging
  package_unit: string # e.g., "box", "bottle", "strip"
  smallest_unit: string # e.g., "tablet", "ml", "vial"
  contents_per_package: integer

  # Pricing
  hna: decimal # Harga Netto Apotek
  het: decimal # Harga Eceran Tertinggi
  selling_price: decimal
  is_bpjs: boolean (default: false)
  bpjs_price: decimal (nullable)

  # Storage
  storage_condition: enum (room_temp/refrigerated/frozen)
  storage_instructions: text

  # Controlled substance
  is_controlled: boolean (default: false)
  controlled_category: enum (narkotika_golongan_2/narkotika_golongan_3/psikotropika_golongan_4, nullable)

  # Status
  is_active: boolean (default: true)
  is_formulary: boolean (default: true) # clinic formulary

  # Alerts
  max_daily_dose: string (nullable)
  contraindications: text (nullable)
  drug_interactions: jsonb # array of {drug_code, interaction_type, severity}

  created_at: datetime
  updated_at: datetime

# FHIR Medication mapping
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
```

---

## US-8.2: Inventory Management

### User Story
**As a** pharmacist
**I want to** manage medication inventory with batch tracking
**So that** stock levels are accurate and expiry is monitored

### Acceptance Criteria

- [ ] **GIVEN** medications are received
      **WHEN** pharmacist records incoming stock
      **THEN** system creates batch with expiry date

- [ ] **GIVEN** medication batch nears expiry
      **WHEN** within 90/60/30 days
      **THEN** system generates alerts

### Data Model

```yaml
medication_stock:
  id: uuid
  medication_id: uuid (FK)

  # Current stock (summary)
  current_quantity: decimal
  reserved_quantity: decimal # for pending prescriptions
  available_quantity: decimal (calculated: current - reserved)

  # Thresholds
  minimum_stock: decimal
  maximum_stock: decimal
  reorder_point: decimal
  reorder_quantity: decimal

  # Location
  storage_location: string
  shelf_number: string

  last_stock_take: datetime

medication_batch:
  id: uuid
  medication_id: uuid (FK)
  batch_number: string
  lot_number: string (nullable)

  # Quantity
  received_quantity: decimal
  current_quantity: decimal
  unit: string

  # Dates
  manufacture_date: date (nullable)
  expiry_date: date
  received_date: date

  # Supplier
  supplier_id: uuid (FK, nullable)
  supplier_name: string
  purchase_order_number: string (nullable)

  # Costing
  purchase_price: decimal
  total_cost: decimal

  # Status
  status: enum (active/quarantine/expired/depleted/recalled)
  quarantine_reason: text (nullable)

  notes: text

stock_movement:
  id: uuid
  medication_id: uuid (FK)
  batch_id: uuid (FK)

  # Movement type
  movement_type: enum (received/dispensed/adjustment/transfer/return/expired/damaged)

  # Quantity
  quantity: decimal
  direction: enum (in/out)
  balance_before: decimal
  balance_after: decimal

  # Reference
  reference_type: enum (purchase_order/prescription/adjustment/transfer/return)
  reference_id: uuid (nullable)

  # Details
  reason: text (nullable)
  performed_by: uuid (FK)
  performed_at: datetime
  verified_by: uuid (FK, nullable)

  notes: text

stock_alert:
  id: uuid
  medication_id: uuid (FK)
  batch_id: uuid (FK, nullable)

  alert_type: enum (low_stock/expiring_90d/expiring_60d/expiring_30d/expired/reorder)
  alert_date: datetime
  is_acknowledged: boolean (default: false)
  acknowledged_by: uuid (FK, nullable)
  acknowledged_at: datetime (nullable)
  action_taken: text (nullable)
```

---

## US-8.3: Prescription Queue & Dispensing

### User Story
**As a** pharmacist
**I want to** receive and process prescriptions
**So that** patients receive their medications accurately

### Acceptance Criteria

- [ ] **GIVEN** prescription is created
      **WHEN** arriving at pharmacy queue
      **THEN** pharmacist sees prescription details with patient allergies

- [ ] **GIVEN** pharmacist dispenses medication
      **WHEN** stock is deducted
      **THEN** system creates MedicationDispense and syncs to Satusehat

### Dispensing Workflow
```
Prescription Created → Pharmacy Queue (pending)
                            ↓
                    Pharmacist Review (verifying)
                            ↓
                    Dispensing (preparing)
                            ↓
                    Verification (checking)
                            ↓
                    Handover to Patient (completed)
```

### Data Model

```yaml
pharmacy_queue:
  id: uuid
  queue_number: string (format: RX-001)
  queue_date: date

  # Prescription
  prescription_id: uuid (FK)
  patient_id: uuid (FK)
  encounter_id: uuid (FK)

  # Status
  status: enum (pending/verifying/preparing/checking/ready/completed/cancelled)
  priority: enum (normal/urgent/stat)

  # Timestamps
  received_at: datetime
  started_at: datetime (nullable)
  ready_at: datetime (nullable)
  completed_at: datetime (nullable)

  # Staff
  processed_by: uuid (FK, nullable)
  verified_by: uuid (FK, nullable)
  handed_over_by: uuid (FK, nullable)

  # Issues
  has_issue: boolean (default: false)
  issue_type: enum (stock_out/interaction/clarification_needed, nullable)
  issue_notes: text (nullable)
  issue_resolved: boolean (default: false)

  notes: text

dispense:
  id: uuid
  dispense_number: string (format: DSP-YYYYMMDD-XXXX)
  prescription_id: uuid (FK)
  pharmacy_queue_id: uuid (FK)
  patient_id: uuid (FK)

  # Status
  status: enum (in_progress/completed/cancelled/returned)
  dispensed_at: datetime
  dispensed_by: uuid (FK)
  verified_by: uuid (FK)

  # Totals
  total_items: integer
  total_amount: decimal

  # BPJS
  is_bpjs: boolean (default: false)

  # Satusehat
  satusehat_dispense_ids: jsonb # array of IDs

  notes: text

dispense_item:
  id: uuid
  dispense_id: uuid (FK)
  prescription_item_id: uuid (FK)
  medication_id: uuid (FK)
  batch_id: uuid (FK)

  # Dispensed info
  quantity_prescribed: decimal
  quantity_dispensed: decimal
  quantity_unit: string

  # Substitution
  is_substituted: boolean (default: false)
  original_medication_id: uuid (FK, nullable)
  substitution_reason: text (nullable)

  # Pricing
  unit_price: decimal
  total_price: decimal
  discount: decimal (default: 0)
  final_price: decimal

  # Label
  signa: text # patient instructions
  label_printed: boolean (default: false)

  notes: text

# FHIR MedicationDispense mapping
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
    display: medication_name
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
    value: quantity_dispensed
    unit: quantity_unit
  whenHandedOver: dispensed_at
  dosageInstruction:
    - text: signa
```

---

## US-8.4: Drug Interaction Checking

### User Story
**As a** pharmacist
**I want to** check for drug interactions
**So that** patient safety is ensured

### Acceptance Criteria

- [ ] **GIVEN** prescription is reviewed
      **WHEN** drug interaction exists
      **THEN** system alerts pharmacist with severity level

- [ ] **GIVEN** severe interaction is detected
      **WHEN** pharmacist attempts to dispense
      **THEN** system requires override with documentation

### Data Model

```yaml
drug_interaction:
  id: uuid
  drug_a_code: string (KFA code)
  drug_b_code: string (KFA code)

  # Interaction details
  interaction_type: enum (contraindicated/major/moderate/minor)
  severity: enum (contraindicated/severe/moderate/mild)
  mechanism: text
  clinical_effect: text
  management: text

  # Evidence
  evidence_level: enum (established/theoretical/case_report)
  references: array[string]

  is_active: boolean (default: true)

interaction_check_log:
  id: uuid
  prescription_id: uuid (FK)
  patient_id: uuid (FK)

  # Check results
  checked_at: datetime
  checked_by: uuid (FK)
  interactions_found: jsonb # array of interaction details
  allergies_flagged: jsonb # array of allergy alerts

  # Override (if applicable)
  override_required: boolean
  override_approved: boolean (nullable)
  override_by: uuid (FK, nullable)
  override_reason: text (nullable)

  # Status
  status: enum (clear/warning/blocked)
```

---

## US-8.5: Narcotic & Psychotropic Handling

### User Story
**As a** pharmacist
**I want to** handle controlled substances with proper documentation
**So that** regulatory requirements are met

### Acceptance Criteria

- [ ] **GIVEN** controlled substance is dispensed
      **WHEN** recording transaction
      **THEN** system captures patient ID, prescriber, and witness

- [ ] **GIVEN** controlled substance report is due
      **WHEN** generating monthly report
      **THEN** system produces regulatory-compliant report

### Data Model

```yaml
controlled_substance_log:
  id: uuid
  medication_id: uuid (FK)
  batch_id: uuid (FK)
  dispense_item_id: uuid (FK, nullable)

  # Transaction
  transaction_type: enum (received/dispensed/returned/destroyed/adjustment)
  transaction_date: datetime

  # Quantity
  quantity: decimal
  unit: string
  balance_before: decimal
  balance_after: decimal

  # Prescription reference
  prescription_number: string (nullable)
  patient_id: uuid (FK, nullable)
  patient_nik: string (nullable)
  prescriber_id: uuid (FK, nullable)
  prescriber_sip: string (nullable)

  # Witnesses
  performed_by: uuid (FK)
  witnessed_by: uuid (FK)
  witness_signature: string (nullable) # digital signature

  # For destruction
  destruction_method: text (nullable)
  destruction_witness: string (nullable)
  destruction_certificate: string (nullable)

  notes: text

controlled_substance_balance:
  id: uuid
  medication_id: uuid (FK)
  month: integer
  year: integer

  opening_balance: decimal
  received: decimal
  dispensed: decimal
  returned: decimal
  destroyed: decimal
  adjustment: decimal
  closing_balance: decimal

  physical_count: decimal (nullable)
  variance: decimal (nullable)
  variance_reason: text (nullable)

  verified_by: uuid (FK, nullable)
  verified_at: datetime (nullable)
```

---

## US-8.6: Label Printing & Patient Instructions

### User Story
**As a** pharmacist
**I want to** print medication labels with clear instructions
**So that** patients understand how to take their medications

### Acceptance Criteria

- [ ] **GIVEN** medication is dispensed
      **WHEN** pharmacist prints label
      **THEN** label includes patient name, medication, signa, and warnings

### Label Format

```
┌─────────────────────────────────────────┐
│ [CLINIC NAME]                           │
│ [CLINIC ADDRESS]                        │
├─────────────────────────────────────────┤
│ Nama: [PATIENT NAME]                    │
│ No. Resep: [RX NUMBER]                  │
│ Tanggal: [DATE]                         │
├─────────────────────────────────────────┤
│ [MEDICATION NAME]                       │
│ [STRENGTH]                              │
│                                         │
│ ATURAN PAKAI:                           │
│ [SIGNA - e.g., 3 x 1 tablet sesudah makan]│
├─────────────────────────────────────────┤
│ ⚠ [WARNINGS IF ANY]                     │
│ Simpan: [STORAGE INSTRUCTIONS]          │
│ Exp: [EXPIRY DATE]                      │
├─────────────────────────────────────────┤
│ Apoteker: [PHARMACIST NAME]             │
└─────────────────────────────────────────┘
```

### Data Model

```yaml
medication_label:
  id: uuid
  dispense_item_id: uuid (FK)

  # Content
  patient_name: string
  prescription_number: string
  prescription_date: date
  medication_name: string
  strength: string
  quantity: string
  signa: text
  warnings: array[string]
  storage: string
  expiry_date: date

  # Printing
  template_type: enum (standard/controlled/external)
  printed_at: datetime (nullable)
  printed_by: uuid (FK, nullable)
  print_count: integer (default: 0)

  # Label content (rendered)
  label_content: text # formatted for printer
```

---

## Stock Take & Adjustment

### Data Model

```yaml
stock_take:
  id: uuid
  stock_take_number: string
  stock_take_date: date

  # Scope
  scope: enum (full/partial/spot_check)
  category_filter: string (nullable) # filter by medication category
  location_filter: string (nullable)

  # Status
  status: enum (draft/in_progress/completed/approved)
  started_at: datetime
  completed_at: datetime (nullable)
  approved_by: uuid (FK, nullable)
  approved_at: datetime (nullable)

  # Summary
  total_items: integer
  matched_items: integer
  variance_items: integer
  total_variance_value: decimal

  notes: text

stock_take_item:
  id: uuid
  stock_take_id: uuid (FK)
  medication_id: uuid (FK)
  batch_id: uuid (FK)

  # Counts
  system_quantity: decimal
  counted_quantity: decimal
  variance: decimal (calculated)

  # Status
  status: enum (pending/counted/verified/adjusted)
  counted_by: uuid (FK, nullable)
  counted_at: datetime (nullable)

  # Adjustment
  adjustment_reason: text (nullable)
  adjustment_approved: boolean (default: false)
  adjustment_movement_id: uuid (FK, nullable)

  notes: text
```

---

## Dependencies
- Medical Services (prescriptions)
- Patient Management (patient data)
- Practitioners (prescriber and pharmacist)

## Blocks
- Billing (medication charges)
- BPJS Integration (medication claims)


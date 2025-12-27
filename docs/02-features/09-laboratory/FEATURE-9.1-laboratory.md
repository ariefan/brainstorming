# FEATURE-9.1: Laboratory Management

> **Module**: Laboratory
> **Related User Stories**: US-9.1, US-9.2, US-9.3, US-9.4, US-9.5
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive laboratory management including test catalog with LOINC coding, lab order queue, specimen collection with barcoding, result entry with automated flagging for abnormal and critical values, and diagnostic report generation with Satusehat integration.

### Business Value
Ensures standardized lab test identification through LOINC codes for regulatory compliance, improves patient safety through critical value alerts, and enables efficient specimen tracking from collection to result authorization.

### User Impact
Lab technicians can efficiently manage specimen collection and result entry, pathologists can authorize results with confidence, and clinicians receive timely alerts for critical values requiring immediate action.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-9.1 | Test Catalog (LOINC) | [View](../../01-user-stories/09-laboratory/US-9.1-9.5-laboratory.md#us-91-test-catalog-loinc) |
| US-9.2 | Lab Order Queue | [View](../../01-user-stories/09-laboratory/US-9.1-9.5-laboratory.md#us-92-lab-order-queue) |
| US-9.3 | Specimen Collection & Barcoding | [View](../../01-user-stories/09-laboratory/US-9.1-9.5-laboratory.md#us-93-specimen-collection--barcoding) |
| US-9.4 | Result Entry & Critical Values | [View](../../01-user-stories/09-laboratory/US-9.1-9.5-laboratory.md#us-94-result-entry--critical-values) |
| US-9.5 | Diagnostic Report & Result Printing | [View](../../01-user-stories/09-laboratory/US-9.1-9.5-laboratory.md#us-95-diagnostic-report--result-printing) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/lab-tests` | List lab tests | Yes | All |
| POST | `/api/v1/lab-tests` | Create lab test | Yes | Lab Manager, Admin |
| GET | `/api/v1/lab-tests/{id}` | Get lab test details | Yes | All |
| PUT | `/api/v1/lab-tests/{id}` | Update lab test | Yes | Lab Manager, Admin |
| GET | `/api/v1/lab-tests/search-loinc` | Search LOINC codes | Yes | Lab Manager |
| GET | `/api/v1/lab-queue` | List lab order queue | Yes | Lab Tech |
| PUT | `/api/v1/lab-queue/{id}/status` | Update queue status | Yes | Lab Tech |
| GET | `/api/v1/lab-orders/{id}` | Get lab order details | Yes | All |
| POST | `/api/v1/specimens` | Create specimen record | Yes | Lab Tech |
| GET | `/api/v1/specimens/{id}` | Get specimen details | Yes | Lab Tech |
| PUT | `/api/v1/specimens/{id}` | Update specimen | Yes | Lab Tech |
| POST | `/api/v1/specimens/{id}/receive` | Mark specimen received | Yes | Lab Tech |
| POST | `/api/v1/specimens/{id}/reject` | Reject specimen | Yes | Lab Tech |
| POST | `/api/v1/specimens/barcode` | Generate specimen barcode | Yes | Lab Tech |
| GET | `/api/v1/specimens/scan/{barcode}` | Lookup specimen by barcode | Yes | Lab Tech |
| POST | `/api/v1/lab-results` | Enter lab result | Yes | Lab Tech |
| PUT | `/api/v1/lab-results/{id}` | Update lab result | Yes | Lab Tech |
| POST | `/api/v1/lab-results/{id}/authorize` | Authorize result | Yes | Pathologist |
| GET | `/api/v1/lab-results/critical` | List critical values pending notification | Yes | Lab Tech |
| POST | `/api/v1/lab-results/{id}/critical-notify` | Record critical value notification | Yes | Lab Tech |
| POST | `/api/v1/diagnostic-reports` | Create diagnostic report | Yes | Pathologist |
| GET | `/api/v1/diagnostic-reports/{id}` | Get diagnostic report | Yes | All |
| POST | `/api/v1/diagnostic-reports/{id}/authorize` | Authorize diagnostic report | Yes | Pathologist |
| GET | `/api/v1/diagnostic-reports/{id}/print` | Get printable report | Yes | All |
| POST | `/api/v1/diagnostic-reports/{id}/sync-satusehat` | Sync to Satusehat | Yes | Lab Tech |

---

## Detailed Endpoint Specifications

### GET /api/v1/lab-tests/search-loinc

```yaml
method: GET
path: /api/v1/lab-tests/search-loinc
description: Search LOINC codes for lab test mapping

authentication:
  required: true
  roles: [lab_manager, admin]

request:
  query_params:
    q:
      type: string
      required: true
      description: Search term (LOINC code or test name)
    category:
      type: enum
      values: [hematology, chemistry, urinalysis, serology, microbiology, histopathology]
    specimen_type:
      type: enum
      values: [blood, serum, plasma, urine, stool, sputum, swab, csf]
    limit:
      type: integer
      default: 20

response:
  success:
    status: 200
    body:
      data:
        - loinc_code: string
          loinc_display: string
          component: string
          property: string
          time_aspect: string
          system: string
          scale_type: string
          method: string
```

### GET /api/v1/lab-queue

```yaml
method: GET
path: /api/v1/lab-queue
description: List lab order queue

authentication:
  required: true
  roles: [lab_tech]

request:
  query_params:
    status:
      type: enum
      values: [pending, collecting, received, processing, resulted, authorized, completed, cancelled]
    priority:
      type: enum
      values: [routine, urgent, stat]
    date:
      type: date
      default: today
    collection_point:
      type: enum
      values: [lab, ward, poli, home]

response:
  success:
    status: 200
    body:
      queue_stats:
        pending: integer
        collecting: integer
        processing: integer
        resulted: integer
      data:
        - id: uuid
          queue_number: string
          patient:
            id: uuid
            name: string
            mrn: string
            dob: date
            gender: enum
          lab_order:
            id: uuid
            order_number: string
            ordering_physician: string
            tests:
              - test_name: string
                requires_fasting: boolean
          priority: enum
          status: enum
          is_fasting_verified: boolean
          ordered_at: datetime
          wait_time_minutes: integer
```

### POST /api/v1/specimens

```yaml
method: POST
path: /api/v1/specimens
description: Create specimen record and generate barcode

authentication:
  required: true
  roles: [lab_tech]

request:
  body:
    type: object
    required: [lab_order_id, lab_order_item_id, specimen_type, container_type]
    properties:
      lab_order_id:
        type: uuid
      lab_order_item_id:
        type: uuid
      specimen_type:
        type: enum
        values: [blood, serum, plasma, urine, stool, sputum, swab, csf, tissue, other]
      container_type:
        type: string
        example: "EDTA tube"
      volume:
        type: string
        example: "3 ml"
      collection_method:
        type: string
        nullable: true
      collection_site:
        type: string
        nullable: true
        example: "left antecubital"
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      specimen_number: string
      barcode: string
      barcode_image: string (base64)
      patient:
        id: uuid
        name: string
        mrn: string
      specimen_type: enum
      container_type: string
      status: "collected"
      collected_at: datetime
      collected_by: string

  errors:
    - status: 400
      code: ORDER_ALREADY_COLLECTED
      message: "Specimen already collected for this order item"
```

### POST /api/v1/specimens/{id}/receive

```yaml
method: POST
path: /api/v1/specimens/{id}/receive
description: Mark specimen received in lab

authentication:
  required: true
  roles: [lab_tech]

request:
  path_params:
    id:
      type: uuid
  body:
    type: object
    properties:
      condition_on_receipt:
        type: enum
        values: [satisfactory, hemolyzed, lipemic, clotted, insufficient, other]
        default: satisfactory
      storage_location:
        type: string
      storage_temperature:
        type: string
      notes:
        type: string

response:
  success:
    status: 200
    body:
      id: uuid
      specimen_number: string
      status: "received"
      condition_on_receipt: enum
      received_at: datetime
      received_by: string
```

### POST /api/v1/specimens/{id}/reject

```yaml
method: POST
path: /api/v1/specimens/{id}/reject
description: Reject specimen with reason

authentication:
  required: true
  roles: [lab_tech]

request:
  path_params:
    id:
      type: uuid
  body:
    type: object
    required: [rejection_reason]
    properties:
      rejection_reason:
        type: string
        description: Detailed reason for rejection
      recommend_recollection:
        type: boolean
        default: true

response:
  success:
    status: 200
    body:
      id: uuid
      specimen_number: string
      status: "rejected"
      is_rejected: true
      rejection_reason: string
      rejected_at: datetime
      rejected_by: string
      recollection_required: boolean
```

### POST /api/v1/lab-results

```yaml
method: POST
path: /api/v1/lab-results
description: Enter lab result

authentication:
  required: true
  roles: [lab_tech]

request:
  body:
    type: object
    required: [lab_order_item_id, specimen_id, result_value]
    properties:
      lab_order_item_id:
        type: uuid
      specimen_id:
        type: uuid
      result_type:
        type: enum
        values: [numeric, text, coded]
        default: numeric
      result_value:
        type: string
      result_numeric:
        type: decimal
        nullable: true
      result_unit:
        type: string
        nullable: true
      interpretation_text:
        type: string
        nullable: true
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      test_name: string
      loinc_code: string
      result_value: string
      result_unit: string
      reference_range:
        low: decimal
        high: decimal
      interpretation: enum (normal/low/high/critical_low/critical_high/abnormal)
      is_critical: boolean
      status: "preliminary"
      resulted_at: datetime
      resulted_by: string

  errors:
    - status: 400
      code: SPECIMEN_NOT_RECEIVED
      message: "Specimen must be received before entering results"
```

### POST /api/v1/lab-results/{id}/critical-notify

```yaml
method: POST
path: /api/v1/lab-results/{id}/critical-notify
description: Record critical value notification

authentication:
  required: true
  roles: [lab_tech]

request:
  path_params:
    id:
      type: uuid
  body:
    type: object
    required: [notification_method, recipient_name, recipient_role]
    properties:
      notification_method:
        type: enum
        values: [phone, in_person, sms]
      recipient_name:
        type: string
      recipient_role:
        type: string
        example: "Attending physician"
      recipient_contact:
        type: string
        example: "ext. 1234"
      acknowledged:
        type: boolean
        default: false
      action_taken:
        type: string
        nullable: true

response:
  success:
    status: 200
    body:
      id: uuid
      lab_result_id: uuid
      test_name: string
      critical_value: string
      notification:
        method: enum
        recipient_name: string
        recipient_role: string
        notified_at: datetime
        notified_by: string
        acknowledged: boolean
```

### POST /api/v1/lab-results/{id}/authorize

```yaml
method: POST
path: /api/v1/lab-results/{id}/authorize
description: Authorize lab result

authentication:
  required: true
  roles: [pathologist]

request:
  path_params:
    id:
      type: uuid
  body:
    type: object
    properties:
      comments:
        type: string
        nullable: true

response:
  success:
    status: 200
    body:
      id: uuid
      test_name: string
      result_value: string
      status: "final"
      authorized_at: datetime
      authorized_by: string
      satusehat_observation_id: string (null if not synced)

  errors:
    - status: 400
      code: CRITICAL_NOT_NOTIFIED
      message: "Critical value must be notified before authorization"
```

### POST /api/v1/diagnostic-reports

```yaml
method: POST
path: /api/v1/diagnostic-reports
description: Create diagnostic report from authorized results

authentication:
  required: true
  roles: [pathologist]

request:
  body:
    type: object
    required: [lab_order_id]
    properties:
      lab_order_id:
        type: uuid
      category:
        type: enum
        values: [hematology, chemistry, urinalysis, serology, microbiology, histopathology]
      conclusion:
        type: string
        nullable: true
      coded_diagnosis:
        type: string
        nullable: true
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      report_number: string
      category: enum
      patient:
        id: uuid
        name: string
        mrn: string
      results:
        - test_name: string
          result: string
          unit: string
          reference_range: string
          interpretation: enum
      status: "preliminary"
      effective_datetime: datetime

  errors:
    - status: 400
      code: RESULTS_NOT_AUTHORIZED
      message: "All results must be authorized before creating report"
```

### GET /api/v1/diagnostic-reports/{id}/print

```yaml
method: GET
path: /api/v1/diagnostic-reports/{id}/print
description: Get printable lab report

authentication:
  required: true
  roles: [All]

request:
  path_params:
    id:
      type: uuid
  query_params:
    format:
      type: enum
      values: [pdf, html]
      default: pdf

response:
  success:
    status: 200
    content_type: application/pdf | text/html
    body: binary | html
```

---

## Data Models

### Lab Test

```yaml
table_name: lab_tests

fields:
  id:
    type: uuid
    primary_key: true
  test_code:
    type: string(20)
    unique: true
    description: Internal test code
  loinc_code:
    type: string(20)
  loinc_display:
    type: string(255)
  test_name:
    type: string(255)
  test_name_short:
    type: string(50)
  test_name_id:
    type: string(255)
    description: Indonesian name
  category:
    type: enum
    values: [hematology, chemistry, urinalysis, serology, microbiology, histopathology, other]
  department:
    type: string(100)
  section:
    type: string(100)
    nullable: true
  specimen_type:
    type: enum
    values: [blood, serum, plasma, urine, stool, sputum, swab, csf, other]
  specimen_volume:
    type: string(50)
  specimen_container:
    type: string(100)
  specimen_instructions:
    type: text
  requires_fasting:
    type: boolean
    default: false
  fasting_hours:
    type: integer
    nullable: true
  tat_hours:
    type: integer
    description: Turnaround time in hours
  is_stat_available:
    type: boolean
    default: true
  method:
    type: string(100)
  equipment:
    type: string(100)
    nullable: true
  result_type:
    type: enum
    values: [numeric, text, coded, panel]
  unit:
    type: string(20)
    nullable: true
  decimal_places:
    type: integer
    nullable: true
  result_options:
    type: jsonb
    nullable: true
    description: For coded results
  base_price:
    type: decimal(15,2)
  bpjs_price:
    type: decimal(15,2)
    nullable: true
  is_panel:
    type: boolean
    default: false
  panel_tests:
    type: jsonb
    nullable: true
    description: Array of test IDs in panel
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
  - name: idx_lab_test_code
    fields: [test_code]
    unique: true
  - name: idx_lab_test_loinc
    fields: [loinc_code]
  - name: idx_lab_test_category
    fields: [category]
```

### Lab Test Reference Range

```yaml
table_name: lab_test_reference_ranges

fields:
  id:
    type: uuid
    primary_key: true
  lab_test_id:
    type: uuid
    foreign_key: lab_tests.id
  gender:
    type: enum
    values: [male, female, all]
  age_min_years:
    type: integer
    nullable: true
  age_max_years:
    type: integer
    nullable: true
  normal_low:
    type: decimal(15,5)
    nullable: true
  normal_high:
    type: decimal(15,5)
    nullable: true
  critical_low:
    type: decimal(15,5)
    nullable: true
  critical_high:
    type: decimal(15,5)
    nullable: true
  interpretation_guide:
    type: text
    nullable: true

indexes:
  - name: idx_ref_range_test
    fields: [lab_test_id]
  - name: idx_ref_range_gender_age
    fields: [lab_test_id, gender, age_min_years, age_max_years]
```

### Lab Queue

```yaml
table_name: lab_queue

fields:
  id:
    type: uuid
    primary_key: true
  queue_number:
    type: string(20)
    description: Format LAB-001
  queue_date:
    type: date
  lab_order_id:
    type: uuid
    foreign_key: lab_orders.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  priority:
    type: enum
    values: [routine, urgent, stat]
    default: routine
  is_fasting_verified:
    type: boolean
    default: false
  status:
    type: enum
    values: [pending, collecting, received, processing, resulted, authorized, completed, cancelled]
    default: pending
  ordered_at:
    type: datetime
  collection_started_at:
    type: datetime
    nullable: true
  collected_at:
    type: datetime
    nullable: true
  received_at:
    type: datetime
    nullable: true
  processing_started_at:
    type: datetime
    nullable: true
  resulted_at:
    type: datetime
    nullable: true
  authorized_at:
    type: datetime
    nullable: true
  completed_at:
    type: datetime
    nullable: true
  collected_by:
    type: uuid
    nullable: true
  processed_by:
    type: uuid
    nullable: true
  resulted_by:
    type: uuid
    nullable: true
  authorized_by:
    type: uuid
    nullable: true
  collection_point:
    type: enum
    values: [lab, ward, poli, home]
    default: lab
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_lab_queue_order
    fields: [lab_order_id]
  - name: idx_lab_queue_date
    fields: [queue_date]
  - name: idx_lab_queue_status
    fields: [status]
```

### Specimen

```yaml
table_name: specimens

fields:
  id:
    type: uuid
    primary_key: true
  specimen_number:
    type: string(30)
    unique: true
    description: Barcode number
  lab_order_id:
    type: uuid
    foreign_key: lab_orders.id
  lab_order_item_id:
    type: uuid
    foreign_key: lab_order_items.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  specimen_type:
    type: enum
    values: [blood, serum, plasma, urine, stool, sputum, swab, csf, tissue, other]
  container_type:
    type: string(100)
  volume:
    type: string(50)
  collection_method:
    type: string(100)
    nullable: true
  collection_site:
    type: string(100)
    nullable: true
  collected_at:
    type: datetime
  collected_by:
    type: uuid
    foreign_key: users.id
  received_at:
    type: datetime
    nullable: true
  received_by:
    type: uuid
    nullable: true
  condition_on_receipt:
    type: enum
    values: [satisfactory, hemolyzed, lipemic, clotted, insufficient, other]
    nullable: true
  is_rejected:
    type: boolean
    default: false
  rejection_reason:
    type: text
    nullable: true
  storage_location:
    type: string(100)
    nullable: true
  storage_temperature:
    type: string(50)
    nullable: true
  status:
    type: enum
    values: [collected, in_transit, received, processing, stored, disposed]
    default: collected
  disposed_at:
    type: datetime
    nullable: true
  disposal_method:
    type: string(100)
    nullable: true
  satusehat_specimen_id:
    type: string
    nullable: true
  notes:
    type: text
  created_at:
    type: datetime

indexes:
  - name: idx_specimen_number
    fields: [specimen_number]
    unique: true
  - name: idx_specimen_order
    fields: [lab_order_id]
  - name: idx_specimen_patient
    fields: [patient_id]
```

### Lab Result

```yaml
table_name: lab_results

fields:
  id:
    type: uuid
    primary_key: true
  lab_order_id:
    type: uuid
    foreign_key: lab_orders.id
  lab_order_item_id:
    type: uuid
    foreign_key: lab_order_items.id
  specimen_id:
    type: uuid
    foreign_key: specimens.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  lab_test_id:
    type: uuid
    foreign_key: lab_tests.id
  loinc_code:
    type: string(20)
  test_name:
    type: string(255)
  result_type:
    type: enum
    values: [numeric, text, coded]
  result_value:
    type: string(255)
  result_numeric:
    type: decimal(15,5)
    nullable: true
  result_unit:
    type: string(20)
    nullable: true
  reference_range_low:
    type: decimal(15,5)
    nullable: true
  reference_range_high:
    type: decimal(15,5)
    nullable: true
  interpretation:
    type: enum
    values: [normal, low, high, critical_low, critical_high, abnormal]
    nullable: true
  interpretation_text:
    type: text
    nullable: true
  is_critical:
    type: boolean
    default: false
  critical_notified:
    type: boolean
    default: false
  critical_notified_at:
    type: datetime
    nullable: true
  critical_notified_to:
    type: string
    nullable: true
  critical_notified_by:
    type: uuid
    nullable: true
  critical_acknowledged:
    type: boolean
    default: false
  critical_acknowledged_at:
    type: datetime
    nullable: true
  status:
    type: enum
    values: [preliminary, final, amended, cancelled]
    default: preliminary
  resulted_at:
    type: datetime
  resulted_by:
    type: uuid
    foreign_key: users.id
  authorized_at:
    type: datetime
    nullable: true
  authorized_by:
    type: uuid
    nullable: true
  amended_from_id:
    type: uuid
    nullable: true
  amendment_reason:
    type: text
    nullable: true
  notes:
    type: text
  satusehat_observation_id:
    type: string
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_lab_result_order
    fields: [lab_order_id]
  - name: idx_lab_result_specimen
    fields: [specimen_id]
  - name: idx_lab_result_patient
    fields: [patient_id]
  - name: idx_lab_result_critical
    fields: [is_critical, critical_notified]
```

### Diagnostic Report

```yaml
table_name: diagnostic_reports

fields:
  id:
    type: uuid
    primary_key: true
  report_number:
    type: string(30)
    unique: true
    description: Format DR-YYYYMMDD-XXXX
  lab_order_id:
    type: uuid
    foreign_key: lab_orders.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  category:
    type: enum
    values: [hematology, chemistry, urinalysis, serology, microbiology, histopathology]
  status:
    type: enum
    values: [registered, partial, preliminary, final, amended, corrected, cancelled]
    default: registered
  issued_at:
    type: datetime
  effective_datetime:
    type: datetime
    description: When specimen was collected
  authorized_by:
    type: uuid
    foreign_key: practitioners.id
  verified_by:
    type: uuid
    nullable: true
  results:
    type: jsonb
    description: Denormalized results for quick access
  conclusion:
    type: text
    nullable: true
  coded_diagnosis:
    type: string
    nullable: true
  satusehat_diagnostic_report_id:
    type: string
    nullable: true
  notes:
    type: text
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_diag_report_number
    fields: [report_number]
    unique: true
  - name: idx_diag_report_order
    fields: [lab_order_id]
  - name: idx_diag_report_patient
    fields: [patient_id]
```

### Critical Value Notification

```yaml
table_name: critical_value_notifications

fields:
  id:
    type: uuid
    primary_key: true
  lab_result_id:
    type: uuid
    foreign_key: lab_results.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  test_name:
    type: string(255)
  result_value:
    type: string(255)
  result_unit:
    type: string(20)
  notification_time:
    type: datetime
  notified_by:
    type: uuid
    foreign_key: users.id
  notification_method:
    type: enum
    values: [phone, in_person, sms]
  recipient_name:
    type: string(255)
  recipient_role:
    type: string(100)
  recipient_contact:
    type: string(100)
  acknowledged:
    type: boolean
    default: false
  acknowledged_at:
    type: datetime
    nullable: true
  action_taken:
    type: text
    nullable: true

indexes:
  - name: idx_critical_notif_result
    fields: [lab_result_id]
  - name: idx_critical_notif_patient
    fields: [patient_id]
```

---

## FHIR Resource Mapping

### Specimen

```yaml
fhir_specimen:
  resourceType: Specimen
  identifier:
    - system: "http://sys-ids.kemkes.go.id/specimen/{org_id}"
      value: specimen.specimen_number
  status: available | unavailable
  type:
    coding:
      - system: "http://snomed.info/sct"
        code: specimen_snomed_code
        display: specimen.specimen_type
  subject:
    reference: "Patient/{ihs_patient_id}"
  receivedTime: specimen.received_at
  collection:
    collectedDateTime: specimen.collected_at
    collector:
      reference: "Practitioner/{ihs_practitioner_id}"
    bodySite:
      coding:
        - display: specimen.collection_site
  container:
    - type:
        coding:
          - display: specimen.container_type
```

### Observation (Lab Result)

```yaml
fhir_lab_observation:
  resourceType: Observation
  identifier:
    - system: "http://sys-ids.kemkes.go.id/observation/{org_id}"
      value: lab_result.id
  status: final | preliminary
  category:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/observation-category"
          code: laboratory
          display: "Laboratory"
  code:
    coding:
      - system: "http://loinc.org"
        code: lab_result.loinc_code
        display: lab_result.test_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  effectiveDateTime: lab_result.resulted_at
  issued: lab_result.authorized_at
  performer:
    - reference: "Practitioner/{ihs_practitioner_id}"
  valueQuantity:
    value: lab_result.result_numeric
    unit: lab_result.result_unit
    system: "http://unitsofmeasure.org"
  interpretation:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation"
          code: interpretation_code
          display: lab_result.interpretation
  referenceRange:
    - low:
        value: lab_result.reference_range_low
      high:
        value: lab_result.reference_range_high
  specimen:
    reference: "Specimen/{satusehat_specimen_id}"
```

### DiagnosticReport

```yaml
fhir_diagnostic_report:
  resourceType: DiagnosticReport
  identifier:
    - system: "http://sys-ids.kemkes.go.id/diagnostic/{org_id}"
      value: diagnostic_report.report_number
  basedOn:
    - reference: "ServiceRequest/{satusehat_service_request_id}"
  status: final | preliminary
  category:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/v2-0074"
          code: "LAB"
          display: "Laboratory"
  code:
    coding:
      - system: "http://loinc.org"
        code: panel_loinc_code
        display: panel_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  effectiveDateTime: diagnostic_report.effective_datetime
  issued: diagnostic_report.issued_at
  performer:
    - reference: "Practitioner/{ihs_practitioner_id}"
  result:
    - reference: "Observation/{satusehat_observation_id_1}"
    - reference: "Observation/{satusehat_observation_id_2}"
  specimen:
    - reference: "Specimen/{satusehat_specimen_id}"
  conclusion: diagnostic_report.conclusion
```

---

## Business Rules

### Test Catalog
- LOINC code required for Satusehat integration
- Reference ranges must be defined for numeric results
- Gender and age-specific ranges supported
- Panel tests contain multiple individual tests

### Specimen Collection
- Unique barcode generated for each specimen
- Fasting verification required for fasting tests
- Specimen rejection requires reason documentation
- Rejected specimens trigger recollection notification

### Result Entry
- Results automatically flagged against reference ranges
- Critical values require immediate notification
- Notification must be documented before authorization
- Amendment requires reason and creates audit trail

### Critical Value Handling
- Critical values must be notified within 30 minutes
- Notification method and recipient documented
- Acknowledgment from clinician recorded
- Cannot authorize until critical value notified

### Authorization Rules
- Only pathologist or lab supervisor can authorize
- All results in order must be authorized for final report
- Amendment possible after authorization with reason

### Satusehat Sync
- Specimen synced on collection
- Observation synced on authorization
- DiagnosticReport synced when all results authorized

---

## Common Lab Tests Reference (LOINC)

| Test | LOINC | Specimen | Unit | Normal Range |
|------|-------|----------|------|--------------|
| Hemoglobin | 718-7 | Blood | g/dL | M: 13-17, F: 12-16 |
| Hematocrit | 4544-3 | Blood | % | M: 40-54, F: 36-48 |
| WBC | 6690-2 | Blood | 10³/µL | 4.5-11.0 |
| Platelet | 777-3 | Blood | 10³/µL | 150-400 |
| Fasting Glucose | 1558-6 | Blood | mg/dL | 70-100 |
| Random Glucose | 2345-7 | Blood | mg/dL | 70-140 |
| HbA1c | 4548-4 | Blood | % | < 5.7 |
| Creatinine | 2160-0 | Blood | mg/dL | 0.7-1.3 |
| Urea | 3094-0 | Blood | mg/dL | 7-20 |
| SGOT/AST | 1920-8 | Blood | U/L | < 40 |
| SGPT/ALT | 1742-6 | Blood | U/L | < 41 |
| Total Cholesterol | 2093-3 | Blood | mg/dL | < 200 |
| Uric Acid | 3084-1 | Blood | mg/dL | M: 3.4-7, F: 2.4-6 |

---

## Lab Workflow

```
Order Created → Lab Queue (pending)
                    ↓
            Specimen Collection (collecting)
              - Verify patient identity
              - Verify fasting if required
              - Collect specimen
              - Generate barcode label
                    ↓
            Specimen Received in Lab (received)
              - Scan barcode
              - Verify condition
              - Accept or reject
                    ↓
            Processing (processing)
              - Run tests on equipment
                    ↓
            Result Entry (resulted)
              - Enter results
              - Auto-flag abnormal/critical
              - Notify critical values
                    ↓
            Authorization (authorized)
              - Pathologist review
              - Authorize results
                    ↓
            Diagnostic Report (completed)
              - Generate report
              - Sync to Satusehat
              - Available for printing
```

---

## Dependencies

- FEATURE-4.2: Prescription Orders (lab orders)
- FEATURE-1.1: Patient Registration (patient data)
- FEATURE-2.2: Practitioner Management (ordering physicians, lab staff)
- LOINC Catalog (test standardization)

## Enables

- FEATURE-4.1: Clinical Encounter (lab results display)
- FEATURE-10.1: Billing (lab charges)
- Satusehat (DiagnosticReport, Observation, Specimen)

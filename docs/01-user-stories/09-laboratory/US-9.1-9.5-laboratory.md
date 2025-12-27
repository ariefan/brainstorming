# Laboratory

> **Module**: 09 - Laboratory
> **Stories**: US-9.1 to US-9.5
> **Priority**: P0 (Critical)
> **FHIR Resources**: ServiceRequest, Specimen, DiagnosticReport, Observation
> **Integration**: LOINC codes

---

## US-9.1: Test Catalog (LOINC)

### User Story
**As a** lab manager
**I want to** manage test catalog with LOINC codes
**So that** tests are standardized for Satusehat integration

### Acceptance Criteria

- [ ] **GIVEN** new test is added to catalog
      **WHEN** configuring test
      **THEN** system maps to LOINC code with normal ranges

### Common Laboratory Tests

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
| Urinalysis | 24356-8 | Urine | - | - |

### Data Model

```yaml
lab_test:
  id: uuid
  test_code: string (internal code, unique)
  loinc_code: string
  loinc_display: string

  # Names
  test_name: string
  test_name_short: string
  test_name_id: string # Indonesian name

  # Classification
  category: enum (hematology/chemistry/urinalysis/serology/microbiology/histopathology/other)
  department: string
  section: string (nullable)

  # Specimen
  specimen_type: enum (blood/serum/plasma/urine/stool/sputum/swab/csf/other)
  specimen_volume: string # e.g., "3 ml"
  specimen_container: string # e.g., "EDTA tube"
  specimen_instructions: text

  # Processing
  requires_fasting: boolean (default: false)
  fasting_hours: integer (nullable)
  tat_hours: integer # turnaround time
  is_stat_available: boolean (default: true)

  # Method
  method: string
  equipment: string (nullable)

  # Result type
  result_type: enum (numeric/text/coded/panel)
  unit: string (nullable)
  decimal_places: integer (nullable)

  # Reference ranges (for numeric)
  reference_ranges: jsonb
  # Array of {gender, age_min, age_max, low, high, critical_low, critical_high}

  # For coded results
  result_options: array[string] (nullable)

  # Pricing
  base_price: decimal
  bpjs_price: decimal (nullable)

  # Panel (if this is a panel)
  is_panel: boolean (default: false)
  panel_tests: array[uuid] (FK to lab_test, nullable)

  is_active: boolean (default: true)

lab_test_reference_range:
  id: uuid
  lab_test_id: uuid (FK)
  gender: enum (male/female/all)
  age_min_years: integer (nullable)
  age_max_years: integer (nullable)
  normal_low: decimal (nullable)
  normal_high: decimal (nullable)
  critical_low: decimal (nullable)
  critical_high: decimal (nullable)
  interpretation_guide: text (nullable)
```

---

## US-9.2: Lab Order Queue

### User Story
**As a** lab technician
**I want to** manage incoming lab orders
**So that** specimens are collected and processed efficiently

### Acceptance Criteria

- [ ] **GIVEN** lab order is placed
      **WHEN** arriving at lab queue
      **THEN** technician sees order with patient details and tests requested

### Lab Workflow
```
Order Created → Lab Queue (pending)
                    ↓
            Specimen Collection (collecting)
                    ↓
            Specimen Received in Lab (received)
                    ↓
            Processing (processing)
                    ↓
            Result Entry (resulted)
                    ↓
            Authorization (authorized)
                    ↓
            Complete (completed)
```

### Data Model

```yaml
lab_queue:
  id: uuid
  queue_number: string (format: LAB-001)
  queue_date: date

  # Order
  lab_order_id: uuid (FK)
  patient_id: uuid (FK)
  encounter_id: uuid (FK)

  # Priority
  priority: enum (routine/urgent/stat)
  is_fasting_verified: boolean (default: false)

  # Status
  status: enum (pending/collecting/received/processing/resulted/authorized/completed/cancelled)

  # Timestamps
  ordered_at: datetime
  collection_started_at: datetime (nullable)
  collected_at: datetime (nullable)
  received_at: datetime (nullable)
  processing_started_at: datetime (nullable)
  resulted_at: datetime (nullable)
  authorized_at: datetime (nullable)
  completed_at: datetime (nullable)

  # Staff
  collected_by: uuid (FK, nullable)
  processed_by: uuid (FK, nullable)
  resulted_by: uuid (FK, nullable)
  authorized_by: uuid (FK, nullable)

  # Collection location
  collection_point: enum (lab/ward/poli/home)

  notes: text
```

---

## US-9.3: Specimen Collection & Barcoding

### User Story
**As a** phlebotomist
**I want to** collect specimens with barcode tracking
**So that** specimens are correctly identified

### Acceptance Criteria

- [ ] **GIVEN** specimen is to be collected
      **WHEN** phlebotomist generates labels
      **THEN** system prints barcode labels for each container

- [ ] **GIVEN** specimen is collected
      **WHEN** barcode is scanned
      **THEN** system updates collection status

### Data Model

```yaml
specimen:
  id: uuid
  specimen_number: string (unique, barcode)
  lab_order_id: uuid (FK)
  lab_order_item_id: uuid (FK)
  patient_id: uuid (FK)

  # Specimen details
  specimen_type: enum (blood/serum/plasma/urine/stool/sputum/swab/csf/tissue/other)
  container_type: string
  volume: string
  collection_method: string (nullable)

  # Collection
  collection_site: string (nullable) # e.g., "left antecubital"
  collected_at: datetime
  collected_by: uuid (FK)

  # Transport
  received_at: datetime (nullable)
  received_by: uuid (FK, nullable)
  condition_on_receipt: enum (satisfactory/hemolyzed/lipemic/clotted/insufficient/other)
  is_rejected: boolean (default: false)
  rejection_reason: text (nullable)

  # Storage
  storage_location: string (nullable)
  storage_temperature: string (nullable)

  # Status
  status: enum (collected/in_transit/received/processing/stored/disposed)
  disposed_at: datetime (nullable)
  disposal_method: string (nullable)

  # Satusehat
  satusehat_specimen_id: string (nullable)

  notes: text

# FHIR Specimen mapping
fhir_specimen:
  resourceType: Specimen
  identifier:
    - system: "http://sys-ids.kemkes.go.id/specimen/{org_id}"
      value: specimen.specimen_number
  status: available
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

---

## US-9.4: Result Entry & Critical Values

### User Story
**As a** lab technician
**I want to** enter test results with automated flagging
**So that** abnormal and critical values are highlighted

### Acceptance Criteria

- [ ] **GIVEN** result is entered
      **WHEN** value is outside normal range
      **THEN** system flags as low/high

- [ ] **GIVEN** result is critical value
      **WHEN** entered
      **THEN** system requires immediate notification to ordering physician

### Data Model

```yaml
lab_result:
  id: uuid
  lab_order_id: uuid (FK)
  lab_order_item_id: uuid (FK)
  specimen_id: uuid (FK)
  patient_id: uuid (FK)

  # Test
  lab_test_id: uuid (FK)
  loinc_code: string
  test_name: string

  # Result
  result_type: enum (numeric/text/coded)
  result_value: string
  result_numeric: decimal (nullable)
  result_unit: string (nullable)

  # Interpretation
  reference_range_low: decimal (nullable)
  reference_range_high: decimal (nullable)
  interpretation: enum (normal/low/high/critical_low/critical_high/abnormal)
  interpretation_text: text (nullable)

  # Critical value handling
  is_critical: boolean (default: false)
  critical_notified: boolean (default: false)
  critical_notified_at: datetime (nullable)
  critical_notified_to: string (nullable)
  critical_notified_by: uuid (FK, nullable)
  critical_acknowledged: boolean (default: false)
  critical_acknowledged_at: datetime (nullable)

  # Status
  status: enum (preliminary/final/amended/cancelled)

  # Entry
  resulted_at: datetime
  resulted_by: uuid (FK)

  # Authorization
  authorized_at: datetime (nullable)
  authorized_by: uuid (FK, nullable)

  # Amendment
  amended_from_id: uuid (FK, nullable)
  amendment_reason: text (nullable)

  notes: text

  # Satusehat
  satusehat_observation_id: string (nullable)

critical_value_notification:
  id: uuid
  lab_result_id: uuid (FK)
  patient_id: uuid (FK)

  # Critical value
  test_name: string
  result_value: string
  result_unit: string

  # Notification
  notification_time: datetime
  notified_by: uuid (FK)
  notification_method: enum (phone/in_person/sms)

  # Recipient
  recipient_name: string
  recipient_role: string
  recipient_contact: string

  # Acknowledgment
  acknowledged: boolean (default: false)
  acknowledged_at: datetime (nullable)
  action_taken: text (nullable)

# FHIR Observation for lab results
fhir_lab_observation:
  resourceType: Observation
  identifier:
    - system: "http://sys-ids.kemkes.go.id/observation/{org_id}"
      value: lab_result.id
  status: final
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

---

## US-9.5: Diagnostic Report & Result Printing

### User Story
**As a** pathologist/lab supervisor
**I want to** authorize results and generate diagnostic reports
**So that** official lab reports are available for clinicians

### Acceptance Criteria

- [ ] **GIVEN** all results are entered
      **WHEN** supervisor authorizes
      **THEN** DiagnosticReport is created and synced to Satusehat

- [ ] **GIVEN** report is authorized
      **WHEN** printing result
      **THEN** system generates formatted lab report

### Data Model

```yaml
diagnostic_report:
  id: uuid
  report_number: string (format: DR-YYYYMMDD-XXXX)
  lab_order_id: uuid (FK)
  patient_id: uuid (FK)
  encounter_id: uuid (FK)

  # Classification
  category: enum (hematology/chemistry/urinalysis/serology/microbiology/histopathology)

  # Status
  status: enum (registered/partial/preliminary/final/amended/corrected/cancelled)

  # Timestamps
  issued_at: datetime
  effective_datetime: datetime # when specimen was collected

  # Authorizing personnel
  authorized_by: uuid (FK to practitioner)
  verified_by: uuid (FK, nullable) # second verification

  # Results summary
  results: jsonb # denormalized results for quick access

  # Conclusion
  conclusion: text (nullable)
  coded_diagnosis: string (nullable) # if applicable

  # Satusehat
  satusehat_diagnostic_report_id: string (nullable)

  notes: text

# FHIR DiagnosticReport mapping
fhir_diagnostic_report:
  resourceType: DiagnosticReport
  identifier:
    - system: "http://sys-ids.kemkes.go.id/diagnostic/{org_id}"
      value: diagnostic_report.report_number
  basedOn:
    - reference: "ServiceRequest/{satusehat_service_request_id}"
  status: final
  category:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/v2-0074"
          code: LAB
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
  effectiveDateTime: effective_datetime
  issued: issued_at
  performer:
    - reference: "Practitioner/{ihs_practitioner_id}"
  result:
    - reference: "Observation/{satusehat_observation_id_1}"
    - reference: "Observation/{satusehat_observation_id_2}"
  specimen:
    - reference: "Specimen/{satusehat_specimen_id}"
  conclusion: diagnostic_report.conclusion
```

### Lab Report Template

```
┌────────────────────────────────────────────────────────┐
│                    [CLINIC LOGO]                        │
│                    [CLINIC NAME]                        │
│                    LABORATORIUM                         │
├────────────────────────────────────────────────────────┤
│ HASIL PEMERIKSAAN LABORATORIUM                         │
│                                                        │
│ No. Lab     : [REPORT NUMBER]                          │
│ Tanggal     : [DATE]                                   │
├────────────────────────────────────────────────────────┤
│ Nama Pasien : [PATIENT NAME]                           │
│ No. RM      : [MRN]                                    │
│ Umur/JK     : [AGE] tahun / [GENDER]                   │
│ Dokter      : [ORDERING DOCTOR]                        │
├────────────────────────────────────────────────────────┤
│ PEMERIKSAAN          HASIL    SATUAN    NILAI NORMAL   │
├────────────────────────────────────────────────────────┤
│ HEMATOLOGI                                             │
│ Hemoglobin          14.5     g/dL      13.0-17.0      │
│ Hematokrit          42       %         40-54          │
│ Leukosit            8.5      10³/µL    4.5-11.0       │
│ Trombosit           250      10³/µL    150-400        │
├────────────────────────────────────────────────────────┤
│ KIMIA DARAH                                            │
│ Gula Darah Puasa    95       mg/dL     70-100         │
│ Kolesterol Total    185      mg/dL     <200           │
├────────────────────────────────────────────────────────┤
│ Catatan: [NOTES IF ANY]                                │
│                                                        │
│ [CITY], [DATE]                                         │
│ Penanggung Jawab Laboratorium                          │
│                                                        │
│ [SIGNATURE]                                            │
│ [PATHOLOGIST NAME]                                     │
│ SIP: [SIP NUMBER]                                      │
└────────────────────────────────────────────────────────┘
```

---

## Dependencies
- Medical Services (lab orders)
- Patient Management (patient data)
- Practitioners (ordering doctor, lab staff)

## Blocks
- Medical Services (lab results display)
- Billing (lab charges)
- Satusehat (DiagnosticReport)


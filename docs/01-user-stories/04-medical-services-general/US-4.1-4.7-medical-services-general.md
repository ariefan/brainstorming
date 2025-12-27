# Medical Services - Poli Umum (General)

> **Module**: 04 - Medical Services General
> **Stories**: US-4.1 to US-4.7
> **Priority**: P0 (Critical)
> **FHIR Resources**: Encounter, Condition, Observation, MedicationRequest, ServiceRequest, Procedure

---

## US-4.1: Encounter Creation & Workflow

### User Story
**As a** clinical staff
**I want to** manage patient encounters throughout the visit
**So that** all clinical activities are tracked and synced to Satusehat

### Acceptance Criteria

- [ ] **GIVEN** patient is called from queue
      **WHEN** consultation starts
      **THEN** system creates Encounter with status "arrived"
      **AND** syncs to Satusehat

- [ ] **GIVEN** encounter is in progress
      **WHEN** status changes (arrived → in-progress → finished)
      **THEN** system updates Encounter in Satusehat

### Encounter Workflow
```
Queue Called → Encounter Created (arrived)
                    ↓
            Vital Signs (in-progress)
                    ↓
            Consultation (in-progress)
                    ↓
            Diagnosis + Prescription
                    ↓
            Encounter Finished
                    ↓
            Pharmacy Dispensing
                    ↓
            Billing & Payment
```

### Data Model

```yaml
encounter:
  id: uuid
  encounter_number: string (format: ENC-YYYYMMDD-XXXX)
  satusehat_id: string (nullable, from Satusehat)

  # Patient & Visit
  patient_id: uuid (FK)
  queue_id: uuid (FK)
  appointment_id: uuid (FK, nullable)

  # Location & Staff
  polyclinic_id: uuid (FK)
  practitioner_id: uuid (FK)
  room: string (nullable)

  # Classification
  encounter_class: enum (outpatient/inpatient/emergency)
  service_type: enum (general/dental/kia/specialist)
  visit_type: enum (new/follow_up/control)

  # BPJS
  is_bpjs: boolean (default: false)
  sep_number: string (nullable)
  bpjs_referral_id: uuid (FK, nullable)

  # Status & Timestamps
  status: enum (planned/arrived/in_progress/on_leave/finished/cancelled)
  period_start: datetime
  period_end: datetime (nullable)

  # Clinical summary (denormalized for quick access)
  chief_complaint: text
  primary_diagnosis_code: string (ICD-10)
  primary_diagnosis_name: string

  notes: text
  created_at: datetime
  updated_at: datetime

# FHIR Encounter mapping
fhir_encounter:
  resourceType: Encounter
  identifier:
    - system: "http://sys-ids.kemkes.go.id/encounter/{org_id}"
      value: encounter.encounter_number
  status: encounter.status
  class:
    system: "http://terminology.hl7.org/CodeSystem/v3-ActCode"
    code: AMB  # ambulatory for outpatient
    display: "ambulatory"
  subject:
    reference: "Patient/{ihs_patient_id}"
    display: patient.full_name
  participant:
    - type:
        - coding:
            - system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType"
              code: ATND
              display: "attender"
      individual:
        reference: "Practitioner/{ihs_practitioner_id}"
        display: practitioner.full_name
  period:
    start: encounter.period_start
    end: encounter.period_end
  location:
    - location:
        reference: "Location/{satusehat_location_id}"
        display: polyclinic.name
  serviceProvider:
    reference: "Organization/{org_satusehat_id}"
  statusHistory:
    - status: arrived
      period:
        start: timestamp
    - status: in-progress
      period:
        start: timestamp
    - status: finished
      period:
        start: timestamp
```

---

## US-4.2: Vital Signs Recording

### User Story
**As a** nurse
**I want to** record patient vital signs before consultation
**So that** doctors have baseline measurements for assessment

### Acceptance Criteria

- [ ] **GIVEN** patient arrives for consultation
      **WHEN** nurse records vital signs
      **THEN** system saves with timestamp and recorder

- [ ] **GIVEN** vital signs are recorded
      **WHEN** syncing to Satusehat
      **THEN** Observation resources are created for each measurement

### Vital Signs Captured
| Measurement | LOINC Code | Unit | Normal Range |
|------------|------------|------|--------------|
| Blood Pressure (Systolic) | 8480-6 | mmHg | 90-140 |
| Blood Pressure (Diastolic) | 8462-4 | mmHg | 60-90 |
| Heart Rate | 8867-4 | /min | 60-100 |
| Respiratory Rate | 9279-1 | /min | 12-20 |
| Body Temperature | 8310-5 | °C | 36.1-37.2 |
| Body Weight | 29463-7 | kg | - |
| Body Height | 8302-2 | cm | - |
| BMI | 39156-5 | kg/m² | 18.5-25 |
| Oxygen Saturation | 2708-6 | % | 95-100 |

### Data Model

```yaml
vital_sign:
  id: uuid
  encounter_id: uuid (FK)
  patient_id: uuid (FK)

  # Measurements
  bp_systolic: integer (mmHg, nullable)
  bp_diastolic: integer (mmHg, nullable)
  heart_rate: integer (/min, nullable)
  respiratory_rate: integer (/min, nullable)
  temperature: decimal (°C, nullable)
  weight: decimal (kg, nullable)
  height: decimal (cm, nullable)
  bmi: decimal (calculated, nullable)
  oxygen_saturation: integer (%, nullable)

  # Additional
  pain_scale: integer (0-10, nullable)
  consciousness: enum (alert/verbal/pain/unresponsive, nullable)

  # Metadata
  recorded_at: datetime
  recorded_by: uuid (FK to user)
  notes: text

  satusehat_observation_ids: jsonb # stores array of observation IDs

# FHIR Observation mapping (per vital sign)
fhir_observation:
  resourceType: Observation
  status: final
  category:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/observation-category"
          code: vital-signs
          display: "Vital Signs"
  code:
    coding:
      - system: "http://loinc.org"
        code: loinc_code
        display: measurement_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  effectiveDateTime: recorded_at
  performer:
    - reference: "Practitioner/{ihs_practitioner_id}"
  valueQuantity:
    value: measurement_value
    unit: unit
    system: "http://unitsofmeasure.org"
    code: ucum_code
```

---

## US-4.3: Doctor Consultation (SOAP Notes)

### User Story
**As a** doctor
**I want to** document consultation using SOAP format
**So that** clinical reasoning is clearly recorded

### Acceptance Criteria

- [ ] **GIVEN** patient is in consultation
      **WHEN** doctor documents findings
      **THEN** system saves SOAP components

- [ ] **GIVEN** consultation is completed
      **WHEN** doctor finalizes notes
      **THEN** encounter status updates to finished

### SOAP Format
- **S**ubjective: Chief complaint, history of present illness, review of systems
- **O**bjective: Physical examination findings, vital signs, lab results
- **A**ssessment: Diagnosis with ICD-10 codes
- **P**lan: Treatment plan, prescriptions, referrals, follow-up

### Data Model

```yaml
consultation:
  id: uuid
  encounter_id: uuid (FK)
  practitioner_id: uuid (FK)

  # Subjective
  chief_complaint: text (required)
  history_of_present_illness: text
  past_medical_history: text
  family_history: text
  social_history: text
  review_of_systems: jsonb # structured ROS

  # Objective
  general_appearance: text
  physical_examination: jsonb # structured by system
  # Example: {"head": "normocephalic", "eyes": "pupils equal", ...}

  # Assessment (linked to diagnoses)
  clinical_impression: text

  # Plan
  treatment_plan: text
  patient_education: text
  follow_up_instructions: text
  follow_up_date: date (nullable)

  # Timestamps
  started_at: datetime
  completed_at: datetime

  # Status
  status: enum (in_progress/completed/amended)
  amended_from_id: uuid (FK, nullable)
  amendment_reason: text (nullable)

physical_exam_template:
  id: uuid
  system: enum (general/heent/cardiovascular/respiratory/abdomen/extremities/neurological/skin)
  finding_name: string
  finding_options: array[string] # predefined options
  is_normal_default: string # what counts as "normal"
```

---

## US-4.4: Diagnosis with ICD-10

### User Story
**As a** doctor
**I want to** record diagnoses with ICD-10 codes
**So that** conditions are standardized and sync to Satusehat

### Acceptance Criteria

- [ ] **GIVEN** doctor assesses patient condition
      **WHEN** entering diagnosis
      **THEN** system provides ICD-10 search with Indonesian terms

- [ ] **GIVEN** diagnosis is recorded
      **WHEN** syncing to Satusehat
      **THEN** Condition resource is created

### Data Model

```yaml
diagnosis:
  id: uuid
  encounter_id: uuid (FK)
  patient_id: uuid (FK)

  # Coding
  icd10_code: string (required)
  icd10_display: string
  diagnosis_name_id: string # Indonesian name

  # Classification
  diagnosis_type: enum (primary/secondary/complication)
  diagnosis_category: enum (admission/discharge/working)
  certainty: enum (confirmed/provisional/differential)

  # Clinical
  onset_date: date (nullable)
  severity: enum (mild/moderate/severe, nullable)
  notes: text

  # Chronicity
  is_chronic: boolean (default: false)
  linked_chronic_condition_id: uuid (FK, nullable)

  # Satusehat
  satusehat_condition_id: string (nullable)

  # Metadata
  recorded_by: uuid (FK)
  recorded_at: datetime

# ICD-10 Master (preloaded)
icd10_code:
  code: string (primary key)
  display_en: string
  display_id: string # Indonesian
  chapter: string
  block: string
  is_billable: boolean
  parent_code: string (nullable)

  # Search optimization
  search_terms: array[string] # synonyms, abbreviations

# FHIR Condition mapping
fhir_condition:
  resourceType: Condition
  clinicalStatus:
    coding:
      - system: "http://terminology.hl7.org/CodeSystem/condition-clinical"
        code: active
        display: "Active"
  verificationStatus:
    coding:
      - system: "http://terminology.hl7.org/CodeSystem/condition-ver-status"
        code: confirmed
        display: "Confirmed"
  category:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/condition-category"
          code: encounter-diagnosis
          display: "Encounter Diagnosis"
  code:
    coding:
      - system: "http://hl7.org/fhir/sid/icd-10"
        code: diagnosis.icd10_code
        display: diagnosis.icd10_display
  subject:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  recordedDate: diagnosis.recorded_at
```

---

## US-4.5: Prescription (e-Resep)

### User Story
**As a** doctor
**I want to** create electronic prescriptions with drug interaction checking
**So that** medications are safely prescribed and tracked

### Acceptance Criteria

- [ ] **GIVEN** doctor prescribes medication
      **WHEN** entering drug
      **THEN** system searches KFA catalog and shows available stock

- [ ] **GIVEN** prescription is created
      **WHEN** patient has known drug allergy
      **THEN** system shows blocking alert before save

- [ ] **GIVEN** prescription is finalized
      **WHEN** syncing to Satusehat
      **THEN** MedicationRequest resource is created

### Data Model

```yaml
prescription:
  id: uuid
  prescription_number: string (format: RX-YYYYMMDD-XXXX)
  encounter_id: uuid (FK)
  patient_id: uuid (FK)
  prescriber_id: uuid (FK)

  # Status
  status: enum (draft/active/completed/cancelled)
  is_bpjs: boolean (default: false)

  # Timestamps
  prescribed_at: datetime
  valid_until: date

  # Pharmacy
  pharmacy_notes: text
  dispensed_at: datetime (nullable)
  dispensed_by: uuid (FK, nullable)

  satusehat_medication_request_ids: jsonb # array of IDs

prescription_item:
  id: uuid
  prescription_id: uuid (FK)

  # Medication
  medication_id: uuid (FK to medication master)
  kfa_code: string
  medication_name: string
  strength: string
  form: enum (tablet/capsule/syrup/injection/cream/drop/other)

  # Dosage
  quantity: decimal
  quantity_unit: string

  # Signa (instructions)
  frequency: string # e.g., "3x1", "2x1"
  route: enum (oral/topical/injection/inhalation/sublingual/rectal)
  timing: enum (before_meal/after_meal/with_meal/bedtime/as_needed)
  duration_days: integer
  instructions: text # detailed instructions

  # Substitution
  allow_substitution: boolean (default: true)
  substitution_reason: text (nullable)

  # Status
  status: enum (pending/dispensed/cancelled/substituted)
  substituted_medication_id: uuid (FK, nullable)

  # PRN (as needed)
  is_prn: boolean (default: false)
  prn_reason: text (nullable)
  max_dose_per_day: string (nullable)

# FHIR MedicationRequest mapping
fhir_medication_request:
  resourceType: MedicationRequest
  identifier:
    - system: "http://sys-ids.kemkes.go.id/prescription/{org_id}"
      value: prescription.prescription_number
  status: active
  intent: order
  category:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/medicationrequest-category"
          code: outpatient
          display: "Outpatient"
  medicationReference:
    reference: "Medication/{kfa_id}"
    display: medication_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  authoredOn: prescribed_at
  requester:
    reference: "Practitioner/{ihs_practitioner_id}"
  dosageInstruction:
    - sequence: 1
      text: instructions
      timing:
        repeat:
          frequency: frequency_number
          period: 1
          periodUnit: d
      route:
        coding:
          - system: "http://www.whocc.no/atc"
            code: route_code
      doseAndRate:
        - doseQuantity:
            value: dose_value
            unit: dose_unit
  dispenseRequest:
    quantity:
      value: quantity
      unit: quantity_unit
    numberOfRepeatsAllowed: 0
    validityPeriod:
      start: prescribed_at
      end: valid_until
  substitution:
    allowedBoolean: allow_substitution
```

---

## US-4.6: Laboratory Order

### User Story
**As a** doctor
**I want to** order laboratory tests
**So that** diagnostic workup supports clinical decisions

### Acceptance Criteria

- [ ] **GIVEN** doctor needs lab investigation
      **WHEN** ordering tests
      **THEN** system shows test catalog with LOINC codes

- [ ] **GIVEN** lab order is placed
      **WHEN** syncing to Satusehat
      **THEN** ServiceRequest resource is created

### Data Model

```yaml
lab_order:
  id: uuid
  order_number: string (format: LAB-YYYYMMDD-XXXX)
  encounter_id: uuid (FK)
  patient_id: uuid (FK)
  ordered_by: uuid (FK to practitioner)

  # Priority
  priority: enum (routine/urgent/stat)

  # Clinical context
  clinical_indication: text
  relevant_diagnosis: string # ICD-10 code

  # Status
  status: enum (pending/specimen_collected/processing/completed/cancelled)
  ordered_at: datetime

  # Fasting
  requires_fasting: boolean (default: false)
  fasting_hours: integer (nullable)

  notes: text
  satusehat_service_request_id: string (nullable)

lab_order_item:
  id: uuid
  lab_order_id: uuid (FK)

  # Test
  lab_test_id: uuid (FK to lab_test master)
  loinc_code: string
  test_name: string
  panel_name: string (nullable, if part of panel)

  # Specimen
  specimen_type: enum (blood/urine/stool/sputum/swab/other)
  specimen_collected: boolean (default: false)
  specimen_barcode: string (nullable)
  collected_at: datetime (nullable)
  collected_by: uuid (FK, nullable)

  # Status
  status: enum (ordered/collected/received/processing/resulted/cancelled)

# FHIR ServiceRequest mapping
fhir_service_request:
  resourceType: ServiceRequest
  identifier:
    - system: "http://sys-ids.kemkes.go.id/servicerequest/{org_id}"
      value: lab_order.order_number
  status: active
  intent: order
  category:
    - coding:
        - system: "http://snomed.info/sct"
          code: 108252007
          display: "Laboratory procedure"
  priority: lab_order.priority
  code:
    coding:
      - system: "http://loinc.org"
        code: loinc_code
        display: test_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  authoredOn: ordered_at
  requester:
    reference: "Practitioner/{ihs_practitioner_id}"
  reasonCode:
    - text: clinical_indication
```

---

## US-4.7: Referral & Medical Certificates

### User Story
**As a** doctor
**I want to** issue referrals and medical certificates
**So that** patients can continue care elsewhere or document their health status

### Acceptance Criteria

- [ ] **GIVEN** patient needs specialist care
      **WHEN** doctor creates referral
      **THEN** system generates referral letter with diagnosis

- [ ] **GIVEN** BPJS patient needs referral
      **WHEN** creating BPJS rujukan
      **THEN** system integrates with BPJS for rujukan number

### Data Model

```yaml
referral:
  id: uuid
  referral_number: string (format: REF-YYYYMMDD-XXXX)
  encounter_id: uuid (FK)
  patient_id: uuid (FK)
  referring_practitioner_id: uuid (FK)

  # Referral type
  referral_type: enum (internal/external)
  referral_reason: enum (specialist_consultation/hospitalization/diagnostic/therapy)

  # Destination
  destination_facility_name: string
  destination_facility_code: string (nullable, Satusehat org ID)
  destination_specialty: string
  destination_practitioner_name: string (nullable)

  # Clinical
  primary_diagnosis_code: string (ICD-10)
  primary_diagnosis_name: string
  secondary_diagnoses: jsonb # array of {code, name}
  clinical_summary: text
  reason_for_referral: text

  # BPJS
  is_bpjs: boolean (default: false)
  bpjs_rujukan_number: string (nullable)
  bpjs_rujukan_date: date (nullable)
  bpjs_ppk_tujuan: string (nullable) # destination PPK code

  # Status
  status: enum (draft/issued/accepted/completed/cancelled)
  issued_at: datetime
  expires_at: date

  notes: text

medical_certificate:
  id: uuid
  certificate_number: string (format: SKS-YYYYMMDD-XXXX or SKD-YYYYMMDD-XXXX)
  encounter_id: uuid (FK)
  patient_id: uuid (FK)
  issued_by: uuid (FK to practitioner)

  # Type
  certificate_type: enum (sks/skd/skbs/other)
  # SKS = Surat Keterangan Sakit
  # SKD = Surat Keterangan Dokter
  # SKBS = Surat Keterangan Berbadan Sehat

  # Content
  purpose: text
  diagnosis_code: string (nullable)
  diagnosis_name: string (nullable)

  # For SKS (sick leave)
  sick_leave_start: date (nullable)
  sick_leave_end: date (nullable)
  sick_leave_days: integer (nullable)

  # For SKBS (health certificate)
  examination_findings: text (nullable)
  conclusion: text

  # Metadata
  issued_at: datetime
  valid_until: date (nullable)
  notes: text
```

---

## Satusehat Sync Order (Encounter Complete)

```yaml
sync_sequence:
  1_encounter_start:
    - Create Encounter (status: arrived)
    - Response: satusehat_encounter_id

  2_vital_signs:
    - Create Observation for each vital sign
    - Link to Encounter

  3_diagnosis:
    - Create Condition for each diagnosis
    - Link to Encounter

  4_prescription:
    - Create MedicationRequest for each medication
    - Link to Encounter

  5_lab_order:
    - Create ServiceRequest for lab order
    - Link to Encounter

  6_encounter_end:
    - Update Encounter (status: finished)
    - Set period.end
```

---

## Dependencies
- Patient Management (patient data)
- Practitioners & Polyclinics (practitioner assignment)
- Appointment & Queue (queue integration)

## Blocks
- Pharmacy (receives prescriptions)
- Laboratory (receives orders)
- Billing (captures charges)


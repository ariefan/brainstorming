# Inpatient (Rawat Inap)

> **Module**: 07 - Inpatient
> **Stories**: US-7.1 to US-7.6
> **Priority**: P1 (High)
> **FHIR Resources**: Encounter (hospitalization), Observation, MedicationAdministration
> **Integration**: BPJS (LOS tracking, INA-CBG)

---

## US-7.1: Room & Bed Management

### User Story
**As a** ward staff
**I want to** manage room and bed availability
**So that** patients can be admitted to appropriate rooms

### Acceptance Criteria

- [ ] **GIVEN** rooms are configured
      **WHEN** viewing availability
      **THEN** system shows real-time bed status per ward

- [ ] **GIVEN** patient needs admission
      **WHEN** searching available beds
      **THEN** system filters by room class and special requirements

### Room Classes (BPJS)
- **Class 1** - 2 beds per room
- **Class 2** - 4 beds per room
- **Class 3** - 6+ beds per room
- **VIP** - 1 bed per room
- **VVIP** - 1 bed per room with extra amenities
- **ICU** - Intensive care with monitoring
- **NICU** - Neonatal intensive care
- **Isolation** - Infectious disease isolation

### Data Model

```yaml
ward:
  id: uuid
  code: string (unique)
  name: string
  floor: string
  building: string

  # Classification
  ward_type: enum (general/surgical/pediatric/obstetric/icu/nicu/isolation/psychiatric)
  specialty: string (nullable)

  # Capacity
  total_beds: integer
  available_beds: integer (calculated)

  # Staff
  nurse_station_phone: string

  is_active: boolean (default: true)

room:
  id: uuid
  room_number: string
  ward_id: uuid (FK)

  # Classification
  room_class: enum (vvip/vip/class_1/class_2/class_3/icu/nicu/isolation)
  room_type: enum (standard/private/semi_private/shared)

  # Capacity
  total_beds: integer
  available_beds: integer (calculated)

  # Facilities
  has_bathroom: boolean (default: true)
  has_ac: boolean (default: true)
  has_tv: boolean (default: false)
  amenities: array[string]

  # Pricing
  daily_rate: decimal
  bpjs_eligible: boolean (default: true)
  bpjs_rate: decimal (nullable)

  # Special requirements
  isolation_capable: boolean (default: false)
  negative_pressure: boolean (default: false)
  oxygen_outlet: boolean (default: true)
  monitoring_capable: boolean (default: false)

  is_active: boolean (default: true)

bed:
  id: uuid
  bed_number: string
  room_id: uuid (FK)

  # Status
  status: enum (available/occupied/reserved/maintenance/cleaning)
  current_admission_id: uuid (FK, nullable)

  # Equipment
  bed_type: enum (standard/electric/pediatric/bariatric/icu)
  has_siderails: boolean (default: true)

  # Position
  position_in_room: string # e.g., "A", "B", "window side"

  is_active: boolean (default: true)

bed_status_log:
  id: uuid
  bed_id: uuid (FK)
  status_from: enum
  status_to: enum
  changed_at: datetime
  changed_by: uuid (FK)
  reason: string (nullable)
  admission_id: uuid (FK, nullable)
```

---

## US-7.2: Admission Workflow

### User Story
**As a** admission staff
**I want to** admit patients from ER or polyclinic
**So that** patients receive inpatient care

### Acceptance Criteria

- [ ] **GIVEN** patient requires hospitalization
      **WHEN** doctor orders admission
      **THEN** system creates admission request with room class

- [ ] **GIVEN** bed is assigned
      **WHEN** patient is admitted
      **THEN** encounter is created with hospitalization class

### Admission Workflow
```
Admission Order (from Poli/IGD)
         ↓
Bed Search & Assignment
         ↓
Admission Registration (deposit, consent)
         ↓
Patient Transfer to Ward
         ↓
Inpatient Encounter Created
         ↓
BPJS SEP Created (if BPJS patient)
```

### Data Model

```yaml
admission:
  id: uuid
  admission_number: string (format: ADM-YYYYMMDD-XXXX)

  # Patient
  patient_id: uuid (FK)
  outpatient_encounter_id: uuid (FK, nullable) # originating encounter

  # Bed assignment
  bed_id: uuid (FK)
  room_id: uuid (FK)
  ward_id: uuid (FK)
  room_class: enum

  # Admission details
  admission_type: enum (elective/emergency/transfer)
  admission_source: enum (poli/igd/transfer_in/birth)
  admission_datetime: datetime

  # Clinical
  admitting_diagnosis_code: string (ICD-10)
  admitting_diagnosis_name: string
  admitting_practitioner_id: uuid (FK)
  attending_practitioner_id: uuid (FK)

  # BPJS
  is_bpjs: boolean (default: false)
  bpjs_class_entitlement: enum (1/2/3, nullable)
  bpjs_class_upgrade: boolean (default: false) # if patient upgrades room
  sep_number: string (nullable)

  # Consent & Deposit
  consent_signed: boolean (default: false)
  consent_datetime: datetime (nullable)
  deposit_amount: decimal (default: 0)
  deposit_receipt_number: string (nullable)

  # Status
  status: enum (pending/admitted/discharged/cancelled/transferred)

  # Discharge (when applicable)
  discharge_datetime: datetime (nullable)
  discharge_type: enum (recovered/improved/ama/died/transferred, nullable)
  discharge_disposition: enum (home/other_facility/expired, nullable)
  length_of_stay_days: integer (calculated)

  # Satusehat
  satusehat_encounter_id: string (nullable)

  notes: text
  created_at: datetime
  updated_at: datetime

admission_transfer:
  id: uuid
  admission_id: uuid (FK)
  transfer_datetime: datetime

  # From
  from_bed_id: uuid (FK)
  from_room_id: uuid (FK)
  from_ward_id: uuid (FK)

  # To
  to_bed_id: uuid (FK)
  to_room_id: uuid (FK)
  to_ward_id: uuid (FK)

  # Reason
  transfer_reason: enum (clinical/patient_request/administrative/isolation/deescalation)
  clinical_reason: text (nullable)

  ordered_by: uuid (FK)
  performed_by: uuid (FK)

# FHIR Encounter (Inpatient)
fhir_inpatient_encounter:
  resourceType: Encounter
  identifier:
    - system: "http://sys-ids.kemkes.go.id/encounter/{org_id}"
      value: admission.admission_number
  status: in-progress
  class:
    system: "http://terminology.hl7.org/CodeSystem/v3-ActCode"
    code: IMP
    display: "inpatient encounter"
  subject:
    reference: "Patient/{ihs_patient_id}"
  participant:
    - type:
        - coding:
            - code: ATND
      individual:
        reference: "Practitioner/{ihs_practitioner_id}"
  period:
    start: admission.admission_datetime
    end: admission.discharge_datetime
  hospitalization:
    admitSource:
      coding:
        - code: admission_source_code
    dischargeDisposition:
      coding:
        - code: discharge_disposition_code
  location:
    - location:
        reference: "Location/{satusehat_location_id}"
        display: ward.name
      physicalType:
        coding:
          - code: bd
            display: "Bed"
```

---

## US-7.3: Daily SOAP Notes

### User Story
**As a** attending physician
**I want to** document daily progress notes
**So that** patient condition is monitored throughout stay

### Acceptance Criteria

- [ ] **GIVEN** patient is admitted
      **WHEN** doctor does daily rounds
      **THEN** system captures SOAP note with vitals and orders

### Data Model

```yaml
inpatient_progress_note:
  id: uuid
  admission_id: uuid (FK)
  patient_id: uuid (FK)
  note_date: date
  note_sequence: integer # multiple notes per day

  # Author
  practitioner_id: uuid (FK)
  practitioner_role: enum (attending/consultant/resident)

  # SOAP
  subjective: text
  objective: text
  assessment: text
  plan: text

  # Vitals at time of note
  vital_sign_id: uuid (FK, nullable)

  # Key observations
  pain_score: integer (0-10, nullable)
  mental_status: enum (alert/confused/somnolent/unresponsive, nullable)
  mobility: enum (ambulatory/wheelchair/bedbound, nullable)
  diet: enum (regular/soft/liquid/npo/tube, nullable)
  iv_access: enum (none/peripheral/central, nullable)
  catheter: enum (none/foley/condom, nullable)

  # Fall & pressure risk
  fall_risk_score: integer (nullable)
  pressure_ulcer_risk: integer (nullable) # Braden scale

  # Orders
  new_orders: text
  discontinued_orders: text

  # Review
  reviewed_by: uuid (FK, nullable)
  reviewed_at: datetime (nullable)

  created_at: datetime
  updated_at: datetime

nursing_assessment:
  id: uuid
  admission_id: uuid (FK)
  patient_id: uuid (FK)
  assessment_date: date
  shift: enum (morning/afternoon/night)

  # Assessor
  nurse_id: uuid (FK)

  # Systems assessment
  neurological: jsonb
  cardiovascular: jsonb
  respiratory: jsonb
  gastrointestinal: jsonb
  genitourinary: jsonb
  musculoskeletal: jsonb
  integumentary: jsonb
  psychosocial: jsonb

  # Pain assessment
  pain_present: boolean
  pain_location: string (nullable)
  pain_score: integer (0-10, nullable)
  pain_character: string (nullable)
  pain_intervention: string (nullable)

  # ADL
  self_care_level: enum (independent/assisted/dependent)
  ambulation_status: string
  sleep_quality: enum (good/fair/poor)

  # Intake/Output
  intake_oral_ml: integer (default: 0)
  intake_iv_ml: integer (default: 0)
  intake_tube_ml: integer (default: 0)
  output_urine_ml: integer (default: 0)
  output_drain_ml: integer (default: 0)
  output_vomit_ml: integer (default: 0)
  output_stool: string (nullable)
  fluid_balance: integer (calculated)

  # Wounds/Lines
  wound_assessment: jsonb # array of wound details
  lines_assessment: jsonb # IV, catheter, drain details

  # Plan
  nursing_interventions: text
  patient_education: text

  notes: text
```

---

## US-7.4: Medication Administration Record (MAR)

### User Story
**As a** ward nurse
**I want to** administer and record medications
**So that** medication orders are executed safely

### Acceptance Criteria

- [ ] **GIVEN** medication is ordered
      **WHEN** administration time arrives
      **THEN** nurse sees medication with patient verification

- [ ] **GIVEN** medication is administered
      **WHEN** nurse documents
      **THEN** MedicationAdministration is recorded

### Data Model

```yaml
inpatient_medication_order:
  id: uuid
  admission_id: uuid (FK)
  patient_id: uuid (FK)

  # Medication
  medication_id: uuid (FK)
  kfa_code: string
  medication_name: string
  dose: string
  dose_value: decimal
  dose_unit: string
  route: enum (oral/iv/im/sc/topical/inhalation/other)
  frequency: string # e.g., "q8h", "bid", "prn"

  # Timing
  start_datetime: datetime
  end_datetime: datetime (nullable) # for limited duration orders
  is_prn: boolean (default: false)
  prn_indication: string (nullable)

  # Instructions
  instructions: text
  special_instructions: text (nullable)

  # Status
  status: enum (active/completed/discontinued/on_hold)
  discontinued_at: datetime (nullable)
  discontinued_by: uuid (FK, nullable)
  discontinue_reason: string (nullable)

  # Prescriber
  ordered_by: uuid (FK)
  ordered_at: datetime
  verified_by: uuid (FK, nullable) # pharmacist verification

  notes: text

medication_administration:
  id: uuid
  order_id: uuid (FK)
  admission_id: uuid (FK)
  patient_id: uuid (FK)

  # Scheduled
  scheduled_datetime: datetime
  is_prn: boolean

  # Administration
  status: enum (given/held/refused/not_given/given_partial)
  administered_datetime: datetime (nullable)
  administered_by: uuid (FK, nullable)

  # Dose
  dose_given: string
  dose_value: decimal
  dose_unit: string
  route: enum

  # If not given
  not_given_reason: enum (held_per_order/patient_refused/npo/patient_asleep/other, nullable)
  not_given_details: text (nullable)

  # Verification
  patient_verified: boolean # right patient
  medication_verified: boolean # right medication
  dose_verified: boolean # right dose
  time_verified: boolean # right time
  route_verified: boolean # right route

  # Batch tracking
  batch_id: uuid (FK, nullable)
  lot_number: string (nullable)

  # Vitals before/after (for certain meds)
  pre_vitals: jsonb (nullable)
  post_vitals: jsonb (nullable)

  notes: text

  # Satusehat
  satusehat_medication_administration_id: string (nullable)

# FHIR MedicationAdministration
fhir_medication_administration:
  resourceType: MedicationAdministration
  status: completed
  medicationReference:
    reference: "Medication/{kfa_id}"
    display: medication_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  context:
    reference: "Encounter/{satusehat_encounter_id}"
  effectiveDateTime: administered_datetime
  performer:
    - actor:
        reference: "Practitioner/{ihs_practitioner_id}"
  request:
    reference: "MedicationRequest/{satusehat_medication_request_id}"
  dosage:
    dose:
      value: dose_value
      unit: dose_unit
    route:
      coding:
        - code: route_code
```

---

## US-7.5: Discharge Planning

### User Story
**As a** case manager
**I want to** plan patient discharge
**So that** transition of care is smooth

### Acceptance Criteria

- [ ] **GIVEN** patient is ready for discharge
      **WHEN** completing discharge
      **THEN** system generates discharge summary

- [ ] **GIVEN** BPJS patient is discharged
      **WHEN** LOS exceeds limit
      **THEN** system flags for clinical justification

### Data Model

```yaml
discharge_planning:
  id: uuid
  admission_id: uuid (FK)
  patient_id: uuid (FK)

  # Target
  target_discharge_date: date
  actual_discharge_date: date (nullable)

  # Criteria
  clinical_criteria_met: boolean (default: false)
  functional_criteria_met: boolean (default: false)
  social_criteria_met: boolean (default: false)

  # Clinical readiness
  diagnosis_stable: boolean
  afebrile_24h: boolean
  tolerating_oral: boolean
  pain_controlled: boolean
  wound_healing: boolean
  mental_status_baseline: boolean

  # Discharge needs
  needs_home_care: boolean (default: false)
  needs_equipment: boolean (default: false)
  needs_follow_up: boolean (default: true)

  equipment_list: array[string]
  home_care_instructions: text

  # Follow-up
  follow_up_appointment_id: uuid (FK, nullable)
  follow_up_date: date (nullable)
  follow_up_polyclinic_id: uuid (FK, nullable)

  # Medications
  discharge_medications: jsonb # array of medications to take home

  # Education
  education_completed: array[string]
  education_materials_given: array[string]

  # Barriers
  barriers_identified: array[string]
  barrier_resolution: text

  case_manager_id: uuid (FK, nullable)
  notes: text

discharge_summary:
  id: uuid
  admission_id: uuid (FK)
  patient_id: uuid (FK)

  # Dates
  admission_date: date
  discharge_date: date
  length_of_stay: integer

  # Discharge
  discharge_type: enum (recovered/improved/ama/died/transferred)
  discharge_condition: enum (stable/critical/deceased)

  # Clinical summary
  admission_diagnosis: text
  discharge_diagnoses: jsonb # array of {code, name, type}
  procedures_performed: jsonb # array of {code, name, date}

  # Course
  hospital_course: text
  significant_findings: text
  treatment_summary: text

  # Results
  key_lab_results: jsonb
  key_imaging_results: text

  # Condition at discharge
  vital_signs_at_discharge: jsonb
  functional_status: text

  # Follow-up
  follow_up_instructions: text
  warning_signs: text
  activity_restrictions: text
  dietary_instructions: text

  # Medications
  discharge_medications: text
  medication_changes: text

  # Prepared by
  prepared_by: uuid (FK)
  prepared_at: datetime

  # Approved by
  attending_physician_id: uuid (FK)
  approved_at: datetime (nullable)
```

---

## US-7.6: Length of Stay (LOS) Monitoring

### User Story
**As a** case manager
**I want to** monitor length of stay
**So that** BPJS LOS limits are managed proactively

### Acceptance Criteria

- [ ] **GIVEN** BPJS patient is admitted
      **WHEN** approaching LOS limit for diagnosis
      **THEN** system alerts for review

### Data Model

```yaml
los_monitoring:
  id: uuid
  admission_id: uuid (FK)
  patient_id: uuid (FK)

  # INA-CBG
  inacbg_code: string
  inacbg_description: string
  severity_level: enum (1/2/3)

  # Expected LOS
  expected_los_days: integer
  los_threshold_warning: integer # days before alert
  los_threshold_critical: integer

  # Actual
  current_los_days: integer (calculated)
  los_status: enum (within_limit/warning/exceeded)

  # Reviews
  reviews: jsonb # array of review records

  last_reviewed_at: datetime (nullable)
  last_reviewed_by: uuid (FK, nullable)

  notes: text

los_review:
  id: uuid
  los_monitoring_id: uuid (FK)
  review_date: date
  reviewed_by: uuid (FK)

  # Assessment
  clinical_status: text
  justification: text
  expected_remaining_days: integer

  # Action
  action_taken: enum (continue/expedite_discharge/request_extension)
  action_notes: text
```

---

## Dependencies
- Medical Services (admission orders)
- Patient Management (patient data)
- Practitioners (attending physicians, nurses)
- BPJS Integration (SEP, LOS)

## Blocks
- Billing (room charges, nursing charges)
- BPJS Claims (inpatient claims)


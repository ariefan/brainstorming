# FEATURE-4.1: Clinical Encounter & Documentation

> **Module**: Medical Services General
> **Related User Stories**: US-4.1, US-4.2, US-4.3, US-4.4
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Core clinical encounter workflow from queue to completion, including vital signs recording, SOAP documentation, ICD-10 diagnosis coding, and Satusehat FHIR resource sync (Encounter, Observation, Condition).

### Business Value
Provides complete clinical documentation trail, ensures regulatory compliance through Satusehat integration, and enables data-driven clinical decision support.

### User Impact
Clinicians have structured workflows for patient encounters. Nurses record vital signs efficiently. Doctors document using familiar SOAP format with integrated ICD-10 search.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-4.1 | Encounter Creation & Workflow | [View](../../01-user-stories/04-medical-services-general/US-4.1-4.7-medical-services-general.md#us-41-encounter-creation--workflow) |
| US-4.2 | Vital Signs Recording | [View](../../01-user-stories/04-medical-services-general/US-4.1-4.7-medical-services-general.md#us-42-vital-signs-recording) |
| US-4.3 | Doctor Consultation (SOAP Notes) | [View](../../01-user-stories/04-medical-services-general/US-4.1-4.7-medical-services-general.md#us-43-doctor-consultation-soap-notes) |
| US-4.4 | Diagnosis with ICD-10 | [View](../../01-user-stories/04-medical-services-general/US-4.1-4.7-medical-services-general.md#us-44-diagnosis-with-icd-10) |

---

## API Endpoints Overview

### Encounters
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters` | Create encounter | Yes | Clinical |
| GET | `/api/v1/encounters` | List encounters | Yes | Clinical |
| GET | `/api/v1/encounters/{id}` | Get encounter details | Yes | Clinical |
| PUT | `/api/v1/encounters/{id}` | Update encounter | Yes | Clinical |
| POST | `/api/v1/encounters/{id}/start` | Start consultation | Yes | Doctor |
| POST | `/api/v1/encounters/{id}/finish` | Complete encounter | Yes | Doctor |

### Vital Signs
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/vitals` | Record vital signs | Yes | Nurse |
| GET | `/api/v1/encounters/{id}/vitals` | Get vital signs | Yes | Clinical |
| GET | `/api/v1/patients/{id}/vitals/history` | Get patient vital history | Yes | Clinical |

### Consultations
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/consultation` | Create/update SOAP | Yes | Doctor |
| GET | `/api/v1/encounters/{id}/consultation` | Get consultation notes | Yes | Clinical |

### Diagnoses
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/diagnoses` | Add diagnosis | Yes | Doctor |
| GET | `/api/v1/encounters/{id}/diagnoses` | List diagnoses | Yes | Clinical |
| PUT | `/api/v1/diagnoses/{id}` | Update diagnosis | Yes | Doctor |
| DELETE | `/api/v1/diagnoses/{id}` | Remove diagnosis | Yes | Doctor |
| GET | `/api/v1/icd10/search` | Search ICD-10 codes | Yes | Clinical |

---

## Detailed Endpoint Specifications

### POST /api/v1/encounters

```yaml
method: POST
path: /api/v1/encounters
description: Create a new clinical encounter

authentication:
  required: true
  roles: [doctor, nurse]

request:
  body:
    type: object
    required: [patient_id, queue_id, polyclinic_id, practitioner_id]
    properties:
      patient_id:
        type: uuid
      queue_id:
        type: uuid
      appointment_id:
        type: uuid
        nullable: true
      polyclinic_id:
        type: uuid
      practitioner_id:
        type: uuid
      encounter_class:
        type: enum
        values: [outpatient, inpatient, emergency]
        default: outpatient
      service_type:
        type: enum
        values: [general, dental, kia, specialist]
      visit_type:
        type: enum
        values: [new, follow_up, control]
        default: new
      is_bpjs:
        type: boolean
        default: false
      sep_number:
        type: string
        description: Required for BPJS encounters
      chief_complaint:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      encounter_number: string
      status: "arrived"
      patient:
        id: uuid
        mrn: string
        name: string
        age: integer
        gender: string
      practitioner:
        id: uuid
        name: string
      polyclinic:
        id: uuid
        name: string
      period_start: datetime
      satusehat_sync_status: "pending" | "synced"
      satusehat_encounter_id: string
```

### POST /api/v1/encounters/{id}/vitals

```yaml
method: POST
path: /api/v1/encounters/{id}/vitals
description: Record vital signs for encounter

authentication:
  required: true
  roles: [nurse, doctor, midwife]

request:
  body:
    type: object
    properties:
      bp_systolic:
        type: integer
        min: 50
        max: 300
        description: Blood pressure systolic (mmHg)
      bp_diastolic:
        type: integer
        min: 30
        max: 200
        description: Blood pressure diastolic (mmHg)
      heart_rate:
        type: integer
        min: 20
        max: 300
        description: Heart rate (bpm)
      respiratory_rate:
        type: integer
        min: 5
        max: 60
        description: Respiratory rate (/min)
      temperature:
        type: decimal
        min: 32
        max: 45
        description: Body temperature (Celsius)
      weight:
        type: decimal
        min: 0.5
        max: 500
        description: Body weight (kg)
      height:
        type: decimal
        min: 20
        max: 300
        description: Body height (cm)
      oxygen_saturation:
        type: integer
        min: 50
        max: 100
        description: SpO2 (%)
      pain_scale:
        type: integer
        min: 0
        max: 10
      consciousness:
        type: enum
        values: [alert, verbal, pain, unresponsive]
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      encounter_id: uuid
      bp_systolic: integer
      bp_diastolic: integer
      heart_rate: integer
      respiratory_rate: integer
      temperature: decimal
      weight: decimal
      height: decimal
      bmi: decimal (calculated)
      oxygen_saturation: integer
      recorded_at: datetime
      recorded_by: object
      alerts:
        - type: "high_bp" | "low_bp" | "fever" | "low_spo2"
          message: string
          severity: "warning" | "critical"
      satusehat_observation_ids: array[string]
```

### POST /api/v1/encounters/{id}/consultation

```yaml
method: POST
path: /api/v1/encounters/{id}/consultation
description: Create or update SOAP consultation notes

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    properties:
      # Subjective
      chief_complaint:
        type: string
        required: true
      history_of_present_illness:
        type: string
      past_medical_history:
        type: string
      family_history:
        type: string
      social_history:
        type: string
      review_of_systems:
        type: object
        description: Structured ROS by system

      # Objective
      general_appearance:
        type: string
      physical_examination:
        type: object
        description: Structured exam by system

      # Assessment
      clinical_impression:
        type: string

      # Plan
      treatment_plan:
        type: string
      patient_education:
        type: string
      follow_up_instructions:
        type: string
      follow_up_date:
        type: date

response:
  success:
    status: 200
    body:
      id: uuid
      encounter_id: uuid
      status: "in_progress" | "completed"
      started_at: datetime
      completed_at: datetime
      soap_summary:
        subjective: string
        objective: string
        assessment: string
        plan: string
```

### POST /api/v1/encounters/{id}/diagnoses

```yaml
method: POST
path: /api/v1/encounters/{id}/diagnoses
description: Add diagnosis to encounter

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    required: [icd10_code]
    properties:
      icd10_code:
        type: string
        example: "J06.9"
      diagnosis_type:
        type: enum
        values: [primary, secondary, complication]
        default: primary
      certainty:
        type: enum
        values: [confirmed, provisional, differential]
        default: confirmed
      onset_date:
        type: date
      severity:
        type: enum
        values: [mild, moderate, severe]
      is_chronic:
        type: boolean
        default: false
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      encounter_id: uuid
      icd10_code: string
      icd10_display: string
      diagnosis_name_id: string
      diagnosis_type: enum
      certainty: enum
      satusehat_condition_id: string
```

### GET /api/v1/icd10/search

```yaml
method: GET
path: /api/v1/icd10/search
description: Search ICD-10 codes with Indonesian terms

authentication:
  required: true
  roles: [doctor, nurse]

request:
  query_params:
    q:
      type: string
      min_length: 2
      description: Search term (code or name)
    chapter:
      type: string
      description: Filter by ICD-10 chapter
    limit:
      type: integer
      default: 20

response:
  success:
    status: 200
    body:
      results:
        - code: string
          display_en: string
          display_id: string
          chapter: string
          is_billable: boolean
          common_use: boolean
```

### POST /api/v1/encounters/{id}/finish

```yaml
method: POST
path: /api/v1/encounters/{id}/finish
description: Complete the encounter

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    properties:
      notes:
        type: string

response:
  success:
    status: 200
    body:
      id: uuid
      encounter_number: string
      status: "finished"
      period_end: datetime
      summary:
        chief_complaint: string
        diagnoses: array[string]
        prescriptions_count: integer
        lab_orders_count: integer
      satusehat_sync_status: "synced" | "pending" | "failed"
      next_steps:
        - type: "pharmacy" | "lab" | "billing" | "follow_up"
          status: "pending" | "completed"

  errors:
    - status: 400
      code: NO_DIAGNOSIS
      message: "At least one diagnosis is required"
    - status: 400
      code: CONSULTATION_INCOMPLETE
      message: "Consultation notes must be completed"
```

---

## Data Models

### Encounter

```yaml
table_name: encounters

fields:
  id:
    type: uuid
    primary_key: true
  encounter_number:
    type: string
    format: "ENC-YYYYMMDD-XXXX"
    unique: true
    index: true
  satusehat_id:
    type: string
    nullable: true
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  queue_id:
    type: uuid
    foreign_key: queues.id
    nullable: true
  appointment_id:
    type: uuid
    foreign_key: appointments.id
    nullable: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    index: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
    index: true
  branch_id:
    type: uuid
    foreign_key: branches.id
  room:
    type: string
    nullable: true
  encounter_class:
    type: enum
    values: [outpatient, inpatient, emergency]
    default: outpatient
  service_type:
    type: enum
    values: [general, dental, kia, specialist]
  visit_type:
    type: enum
    values: [new, follow_up, control]
  is_bpjs:
    type: boolean
    default: false
  sep_number:
    type: string
    nullable: true
  bpjs_referral_id:
    type: uuid
    nullable: true
  status:
    type: enum
    values: [planned, arrived, in_progress, on_leave, finished, cancelled]
    default: arrived
    index: true
  period_start:
    type: datetime
  period_end:
    type: datetime
    nullable: true
  chief_complaint:
    type: text
    nullable: true
  primary_diagnosis_code:
    type: string
    nullable: true
  primary_diagnosis_name:
    type: string
    nullable: true
  notes:
    type: text
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_encounter_patient_date
    fields: [patient_id, period_start]
  - name: idx_encounter_practitioner_date
    fields: [practitioner_id, period_start, status]
```

### Vital Sign

```yaml
table_name: vital_signs

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  bp_systolic:
    type: integer
    nullable: true
  bp_diastolic:
    type: integer
    nullable: true
  heart_rate:
    type: integer
    nullable: true
  respiratory_rate:
    type: integer
    nullable: true
  temperature:
    type: decimal(4,2)
    nullable: true
  weight:
    type: decimal(5,2)
    nullable: true
  height:
    type: decimal(5,2)
    nullable: true
  bmi:
    type: decimal(4,2)
    nullable: true
  oxygen_saturation:
    type: integer
    nullable: true
  pain_scale:
    type: integer
    nullable: true
  consciousness:
    type: enum
    values: [alert, verbal, pain, unresponsive]
    nullable: true
  recorded_at:
    type: datetime
  recorded_by:
    type: uuid
    foreign_key: users.id
  notes:
    type: text
    nullable: true
  satusehat_observation_ids:
    type: jsonb
    nullable: true
```

### Consultation

```yaml
table_name: consultations

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    unique: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
  chief_complaint:
    type: text
  history_of_present_illness:
    type: text
    nullable: true
  past_medical_history:
    type: text
    nullable: true
  family_history:
    type: text
    nullable: true
  social_history:
    type: text
    nullable: true
  review_of_systems:
    type: jsonb
    nullable: true
  general_appearance:
    type: text
    nullable: true
  physical_examination:
    type: jsonb
    nullable: true
  clinical_impression:
    type: text
    nullable: true
  treatment_plan:
    type: text
    nullable: true
  patient_education:
    type: text
    nullable: true
  follow_up_instructions:
    type: text
    nullable: true
  follow_up_date:
    type: date
    nullable: true
  started_at:
    type: datetime
  completed_at:
    type: datetime
    nullable: true
  status:
    type: enum
    values: [in_progress, completed, amended]
    default: in_progress
  amended_from_id:
    type: uuid
    foreign_key: consultations.id
    nullable: true
  amendment_reason:
    type: text
    nullable: true
```

### Diagnosis

```yaml
table_name: diagnoses

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  icd10_code:
    type: string
    index: true
  icd10_display:
    type: string
  diagnosis_name_id:
    type: string
  diagnosis_type:
    type: enum
    values: [primary, secondary, complication]
    default: primary
  diagnosis_category:
    type: enum
    values: [admission, discharge, working]
    default: working
  certainty:
    type: enum
    values: [confirmed, provisional, differential]
    default: confirmed
  onset_date:
    type: date
    nullable: true
  severity:
    type: enum
    values: [mild, moderate, severe]
    nullable: true
  is_chronic:
    type: boolean
    default: false
  linked_chronic_condition_id:
    type: uuid
    foreign_key: chronic_conditions.id
    nullable: true
  satusehat_condition_id:
    type: string
    nullable: true
  notes:
    type: text
    nullable: true
  recorded_by:
    type: uuid
    foreign_key: practitioners.id
  recorded_at:
    type: datetime
```

---

## Encounter Workflow State Machine

```
     ┌──────────┐
     │ planned  │ (appointment-based)
     └────┬─────┘
          │ patient arrives
          ▼
     ┌──────────┐     ┌──────────┐
     │ arrived  │────▶│cancelled │
     └────┬─────┘     └──────────┘
          │ nurse starts vitals
          ▼
     ┌────────────┐
     │in_progress │◀─────┐
     └────┬───────┘      │ resume
          │              │
          ├──────────────┤
          │ on_leave     │
          │ (temp break) │
          ▼              │
     ┌──────────┐        │
     │ on_leave │────────┘
     └──────────┘
          │ doctor completes
          ▼
     ┌──────────┐
     │ finished │
     └──────────┘
```

---

## FHIR Resource Sync

### Encounter Sync Order
1. Create Encounter (status: arrived)
2. Create Observation for each vital sign
3. Create Condition for each diagnosis
4. Update Encounter (status: finished)

### LOINC Codes for Vital Signs
| Measurement | LOINC | Unit |
|-------------|-------|------|
| BP Systolic | 8480-6 | mmHg |
| BP Diastolic | 8462-4 | mmHg |
| Heart Rate | 8867-4 | /min |
| Respiratory Rate | 9279-1 | /min |
| Temperature | 8310-5 | Cel |
| Weight | 29463-7 | kg |
| Height | 8302-2 | cm |
| BMI | 39156-5 | kg/m2 |
| SpO2 | 2708-6 | % |

---

## Business Rules

### Encounter Completion Requirements
- At least one diagnosis (primary) required
- Consultation notes must have: chief complaint, assessment
- Vital signs recommended but not required

### Diagnosis Rules
- Only one primary diagnosis per encounter
- Secondary diagnoses unlimited
- ICD-10 code must be valid and billable

### Amendment Policy
- Completed consultations can be amended
- Original preserved with amendment link
- Amendment reason required

---

## Dependencies

- FEATURE-1.1: Patient Registration
- FEATURE-3.2: Queue Management
- FEATURE-2.2: Practitioner Management
- ICD-10 master data

## Enables

- FEATURE-4.2: Prescription & Orders
- Pharmacy dispensing
- Laboratory processing
- Billing capture

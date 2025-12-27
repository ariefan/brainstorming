# FEATURE-7.1: Inpatient Management

> **Module**: Inpatient (Rawat Inap)
> **Related User Stories**: US-7.1, US-7.2, US-7.3, US-7.4, US-7.5, US-7.6
> **Implementation Priority**: P1 (High)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive inpatient management including room/bed management, admission workflow, daily SOAP documentation, medication administration records (MAR), discharge planning, and length of stay monitoring for BPJS compliance.

### Business Value
Enables complete inpatient care management with proper documentation, medication tracking, and regulatory compliance for Indonesian health insurance (BPJS INA-CBG) requirements.

### User Impact
Ward staff can manage bed availability, nurses can document assessments and administer medications safely, physicians can write daily progress notes, and case managers can monitor LOS for timely discharge.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-7.1 | Room & Bed Management | [View](../../01-user-stories/07-inpatient/US-7.1-7.6-inpatient.md#us-71-room--bed-management) |
| US-7.2 | Admission Workflow | [View](../../01-user-stories/07-inpatient/US-7.1-7.6-inpatient.md#us-72-admission-workflow) |
| US-7.3 | Daily SOAP Notes | [View](../../01-user-stories/07-inpatient/US-7.1-7.6-inpatient.md#us-73-daily-soap-notes) |
| US-7.4 | Medication Administration Record | [View](../../01-user-stories/07-inpatient/US-7.1-7.6-inpatient.md#us-74-medication-administration-record-mar) |
| US-7.5 | Discharge Planning | [View](../../01-user-stories/07-inpatient/US-7.1-7.6-inpatient.md#us-75-discharge-planning) |
| US-7.6 | Length of Stay Monitoring | [View](../../01-user-stories/07-inpatient/US-7.1-7.6-inpatient.md#us-76-length-of-stay-los-monitoring) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/wards` | List wards | Yes | All |
| POST | `/api/v1/wards` | Create ward | Yes | Owner, Admin |
| GET | `/api/v1/rooms` | List rooms with availability | Yes | All |
| POST | `/api/v1/rooms` | Create room | Yes | Owner, Admin |
| GET | `/api/v1/beds` | List beds with status | Yes | All |
| POST | `/api/v1/beds` | Create bed | Yes | Owner, Admin |
| PUT | `/api/v1/beds/{id}/status` | Update bed status | Yes | Nurse, Admin |
| GET | `/api/v1/beds/available` | Search available beds | Yes | All |
| POST | `/api/v1/admissions` | Create admission | Yes | Doctor, Admin |
| GET | `/api/v1/admissions` | List admissions | Yes | All |
| GET | `/api/v1/admissions/{id}` | Get admission details | Yes | All |
| PUT | `/api/v1/admissions/{id}` | Update admission | Yes | Doctor, Nurse |
| POST | `/api/v1/admissions/{id}/transfer` | Transfer bed | Yes | Doctor, Nurse |
| POST | `/api/v1/admissions/{id}/discharge` | Discharge patient | Yes | Doctor |
| POST | `/api/v1/admissions/{id}/progress-notes` | Add progress note | Yes | Doctor |
| GET | `/api/v1/admissions/{id}/progress-notes` | List progress notes | Yes | All |
| POST | `/api/v1/admissions/{id}/nursing-assessments` | Add nursing assessment | Yes | Nurse |
| GET | `/api/v1/admissions/{id}/nursing-assessments` | List nursing assessments | Yes | All |
| GET | `/api/v1/admissions/{id}/medication-orders` | List medication orders | Yes | All |
| POST | `/api/v1/admissions/{id}/medication-orders` | Create medication order | Yes | Doctor |
| POST | `/api/v1/medication-administrations` | Record administration | Yes | Nurse |
| GET | `/api/v1/admissions/{id}/mar` | Get MAR view | Yes | All |
| GET | `/api/v1/admissions/{id}/discharge-summary` | Get discharge summary | Yes | All |
| POST | `/api/v1/admissions/{id}/discharge-summary` | Create discharge summary | Yes | Doctor |
| GET | `/api/v1/los-monitoring` | LOS monitoring dashboard | Yes | Admin, Doctor |
| POST | `/api/v1/los-monitoring/{id}/review` | Add LOS review | Yes | Doctor, Admin |

---

## Detailed Endpoint Specifications

### GET /api/v1/beds/available

```yaml
method: GET
path: /api/v1/beds/available
description: Search available beds with filters

authentication:
  required: true
  roles: [All]

request:
  query_params:
    ward_id:
      type: uuid
      description: Filter by ward
    room_class:
      type: enum
      values: [vvip, vip, class_1, class_2, class_3, icu, nicu, isolation]
    bpjs_eligible:
      type: boolean
      description: Filter BPJS-eligible rooms
    isolation_capable:
      type: boolean
    monitoring_capable:
      type: boolean

response:
  success:
    status: 200
    body:
      data:
        - bed_id: uuid
          bed_number: string
          room:
            id: uuid
            room_number: string
            room_class: enum
            daily_rate: decimal
            bpjs_rate: decimal
          ward:
            id: uuid
            name: string
            floor: string
          amenities:
            - string
          available_since: datetime
```

### POST /api/v1/admissions

```yaml
method: POST
path: /api/v1/admissions
description: Create new patient admission

authentication:
  required: true
  roles: [doctor, admin]

request:
  body:
    type: object
    required: [patient_id, bed_id, admission_type, admitting_diagnosis_code]
    properties:
      patient_id:
        type: uuid
      outpatient_encounter_id:
        type: uuid
        nullable: true
        description: Originating outpatient encounter
      bed_id:
        type: uuid
      admission_type:
        type: enum
        values: [elective, emergency, transfer]
      admission_source:
        type: enum
        values: [poli, igd, transfer_in, birth]
      admitting_diagnosis_code:
        type: string
        description: ICD-10 code
      admitting_diagnosis_name:
        type: string
      attending_practitioner_id:
        type: uuid
      is_bpjs:
        type: boolean
        default: false
      bpjs_class_entitlement:
        type: enum
        values: [1, 2, 3]
        nullable: true
      sep_number:
        type: string
        nullable: true
      deposit_amount:
        type: decimal
        default: 0
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      admission_number: string
      patient:
        id: uuid
        name: string
        mrn: string
      bed:
        id: uuid
        bed_number: string
        room_number: string
        ward_name: string
      admission_datetime: datetime
      status: enum
      satusehat_encounter_id: string (null if not synced)

  errors:
    - status: 400
      code: BED_NOT_AVAILABLE
      message: "Selected bed is not available"
    - status: 400
      code: BPJS_SEP_REQUIRED
      message: "SEP number required for BPJS patients"
    - status: 409
      code: PATIENT_ALREADY_ADMITTED
      message: "Patient has an active admission"
```

### POST /api/v1/admissions/{id}/progress-notes

```yaml
method: POST
path: /api/v1/admissions/{id}/progress-notes
description: Add daily progress note (SOAP)

authentication:
  required: true
  roles: [doctor]

request:
  path_params:
    id:
      type: uuid
      description: Admission ID
  body:
    type: object
    required: [subjective, objective, assessment, plan]
    properties:
      subjective:
        type: string
        description: Patient complaints, symptoms
      objective:
        type: string
        description: Physical examination findings
      vital_signs:
        type: object
        properties:
          temperature: decimal
          blood_pressure_systolic: integer
          blood_pressure_diastolic: integer
          heart_rate: integer
          respiratory_rate: integer
          spo2: decimal
      assessment:
        type: string
        description: Clinical assessment/diagnosis
      plan:
        type: string
        description: Treatment plan
      pain_score:
        type: integer
        min: 0
        max: 10
      mental_status:
        type: enum
        values: [alert, confused, somnolent, unresponsive]
      mobility:
        type: enum
        values: [ambulatory, wheelchair, bedbound]
      diet:
        type: enum
        values: [regular, soft, liquid, npo, tube]
      new_orders:
        type: string
      discontinued_orders:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      note_date: date
      note_sequence: integer
      practitioner:
        id: uuid
        name: string
      soap:
        subjective: string
        objective: string
        assessment: string
        plan: string
      created_at: datetime
```

### POST /api/v1/medication-administrations

```yaml
method: POST
path: /api/v1/medication-administrations
description: Record medication administration

authentication:
  required: true
  roles: [nurse]

request:
  body:
    type: object
    required: [order_id, status]
    properties:
      order_id:
        type: uuid
        description: Medication order ID
      scheduled_datetime:
        type: datetime
      status:
        type: enum
        values: [given, held, refused, not_given, given_partial]
      administered_datetime:
        type: datetime
        description: Required if status is given
      dose_given:
        type: string
      dose_value:
        type: decimal
      dose_unit:
        type: string
      route:
        type: enum
        values: [oral, iv, im, sc, topical, inhalation, other]
      not_given_reason:
        type: enum
        values: [held_per_order, patient_refused, npo, patient_asleep, other]
        nullable: true
      not_given_details:
        type: string
        nullable: true
      verification:
        type: object
        properties:
          patient_verified: boolean
          medication_verified: boolean
          dose_verified: boolean
          time_verified: boolean
          route_verified: boolean
      batch_id:
        type: uuid
        nullable: true
      lot_number:
        type: string
        nullable: true
      pre_vitals:
        type: object
        nullable: true
      post_vitals:
        type: object
        nullable: true
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      order_id: uuid
      medication_name: string
      status: enum
      administered_datetime: datetime
      administered_by:
        id: uuid
        name: string
      satusehat_medication_administration_id: string (null if not synced)
```

### GET /api/v1/admissions/{id}/mar

```yaml
method: GET
path: /api/v1/admissions/{id}/mar
description: Get Medication Administration Record view

authentication:
  required: true
  roles: [All]

request:
  path_params:
    id:
      type: uuid
      description: Admission ID
  query_params:
    date:
      type: date
      description: View MAR for specific date (default today)
    shift:
      type: enum
      values: [all, morning, afternoon, night]
      default: all

response:
  success:
    status: 200
    body:
      admission:
        id: uuid
        patient_name: string
        room: string
        allergies: array[string]
      date: date
      medications:
        - order_id: uuid
          medication_name: string
          dose: string
          route: enum
          frequency: string
          is_prn: boolean
          scheduled_times:
            - time: time
              status: enum
              administered_by: string (nullable)
              notes: string (nullable)
```

### POST /api/v1/admissions/{id}/discharge

```yaml
method: POST
path: /api/v1/admissions/{id}/discharge
description: Discharge patient

authentication:
  required: true
  roles: [doctor]

request:
  path_params:
    id:
      type: uuid
  body:
    type: object
    required: [discharge_type, discharge_disposition]
    properties:
      discharge_type:
        type: enum
        values: [recovered, improved, ama, died, transferred]
      discharge_disposition:
        type: enum
        values: [home, other_facility, expired]
      discharge_condition:
        type: enum
        values: [stable, critical, deceased]
      discharge_diagnoses:
        type: array
        items:
          type: object
          properties:
            code: string
            name: string
            type: enum (primary/secondary)
      procedures_performed:
        type: array
        items:
          type: object
          properties:
            code: string
            name: string
            date: date
      hospital_course:
        type: string
      discharge_medications:
        type: array
        items:
          type: object
          properties:
            medication_id: uuid
            dose: string
            frequency: string
            duration: string
            instructions: string
      follow_up_instructions:
        type: string
      warning_signs:
        type: string
      follow_up_date:
        type: date
        nullable: true
      follow_up_polyclinic_id:
        type: uuid
        nullable: true

response:
  success:
    status: 200
    body:
      id: uuid
      admission_number: string
      discharge_datetime: datetime
      length_of_stay_days: integer
      discharge_summary_id: uuid
      status: "discharged"

  errors:
    - status: 400
      code: PENDING_ORDERS
      message: "Patient has pending medication or lab orders"
    - status: 400
      code: BILLING_NOT_SETTLED
      message: "Patient billing must be settled before discharge"
```

### GET /api/v1/los-monitoring

```yaml
method: GET
path: /api/v1/los-monitoring
description: LOS monitoring dashboard for BPJS patients

authentication:
  required: true
  roles: [admin, doctor]

request:
  query_params:
    status:
      type: enum
      values: [all, within_limit, warning, exceeded]
    ward_id:
      type: uuid

response:
  success:
    status: 200
    body:
      summary:
        total_bpjs_admissions: integer
        within_limit: integer
        warning: integer
        exceeded: integer
      data:
        - admission_id: uuid
          admission_number: string
          patient_name: string
          ward: string
          room: string
          inacbg_code: string
          inacbg_description: string
          admission_date: date
          current_los_days: integer
          expected_los_days: integer
          los_status: enum
          last_reviewed: datetime (nullable)
```

---

## Data Models

### Ward

```yaml
table_name: wards

fields:
  id:
    type: uuid
    primary_key: true
  code:
    type: string(20)
    unique: true
  name:
    type: string(100)
  floor:
    type: string
  building:
    type: string
    nullable: true
  ward_type:
    type: enum
    values: [general, surgical, pediatric, obstetric, icu, nicu, isolation, psychiatric]
  specialty:
    type: string
    nullable: true
  nurse_station_phone:
    type: string
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
```

### Room

```yaml
table_name: rooms

fields:
  id:
    type: uuid
    primary_key: true
  room_number:
    type: string(20)
  ward_id:
    type: uuid
    foreign_key: wards.id
  room_class:
    type: enum
    values: [vvip, vip, class_1, class_2, class_3, icu, nicu, isolation]
  room_type:
    type: enum
    values: [standard, private, semi_private, shared]
  total_beds:
    type: integer
  has_bathroom:
    type: boolean
    default: true
  has_ac:
    type: boolean
    default: true
  has_tv:
    type: boolean
    default: false
  amenities:
    type: jsonb
    description: Array of amenity strings
  daily_rate:
    type: decimal(12,2)
  bpjs_eligible:
    type: boolean
    default: true
  bpjs_rate:
    type: decimal(12,2)
    nullable: true
  isolation_capable:
    type: boolean
    default: false
  negative_pressure:
    type: boolean
    default: false
  oxygen_outlet:
    type: boolean
    default: true
  monitoring_capable:
    type: boolean
    default: false
  is_active:
    type: boolean
    default: true

indexes:
  - name: idx_room_ward
    fields: [ward_id]
  - name: idx_room_class
    fields: [room_class]
```

### Bed

```yaml
table_name: beds

fields:
  id:
    type: uuid
    primary_key: true
  bed_number:
    type: string(20)
  room_id:
    type: uuid
    foreign_key: rooms.id
  status:
    type: enum
    values: [available, occupied, reserved, maintenance, cleaning]
    default: available
  current_admission_id:
    type: uuid
    foreign_key: admissions.id
    nullable: true
  bed_type:
    type: enum
    values: [standard, electric, pediatric, bariatric, icu]
    default: standard
  has_siderails:
    type: boolean
    default: true
  position_in_room:
    type: string
  is_active:
    type: boolean
    default: true

indexes:
  - name: idx_bed_room
    fields: [room_id]
  - name: idx_bed_status
    fields: [status]
  - name: idx_bed_admission
    fields: [current_admission_id]
```

### Admission

```yaml
table_name: admissions

fields:
  id:
    type: uuid
    primary_key: true
  admission_number:
    type: string(30)
    unique: true
    description: Format ADM-YYYYMMDD-XXXX
  patient_id:
    type: uuid
    foreign_key: patients.id
  outpatient_encounter_id:
    type: uuid
    foreign_key: encounters.id
    nullable: true
  bed_id:
    type: uuid
    foreign_key: beds.id
  room_id:
    type: uuid
    foreign_key: rooms.id
  ward_id:
    type: uuid
    foreign_key: wards.id
  room_class:
    type: enum
    values: [vvip, vip, class_1, class_2, class_3, icu, nicu, isolation]
  admission_type:
    type: enum
    values: [elective, emergency, transfer]
  admission_source:
    type: enum
    values: [poli, igd, transfer_in, birth]
  admission_datetime:
    type: datetime
  admitting_diagnosis_code:
    type: string(10)
  admitting_diagnosis_name:
    type: string(255)
  admitting_practitioner_id:
    type: uuid
    foreign_key: practitioners.id
  attending_practitioner_id:
    type: uuid
    foreign_key: practitioners.id
  is_bpjs:
    type: boolean
    default: false
  bpjs_class_entitlement:
    type: enum
    values: [1, 2, 3]
    nullable: true
  bpjs_class_upgrade:
    type: boolean
    default: false
  sep_number:
    type: string(30)
    nullable: true
  consent_signed:
    type: boolean
    default: false
  consent_datetime:
    type: datetime
    nullable: true
  deposit_amount:
    type: decimal(15,2)
    default: 0
  deposit_receipt_number:
    type: string
    nullable: true
  status:
    type: enum
    values: [pending, admitted, discharged, cancelled, transferred]
    default: pending
  discharge_datetime:
    type: datetime
    nullable: true
  discharge_type:
    type: enum
    values: [recovered, improved, ama, died, transferred]
    nullable: true
  discharge_disposition:
    type: enum
    values: [home, other_facility, expired]
    nullable: true
  length_of_stay_days:
    type: integer
    nullable: true
  satusehat_encounter_id:
    type: string
    nullable: true
  notes:
    type: text
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_admission_patient
    fields: [patient_id]
  - name: idx_admission_status
    fields: [status]
  - name: idx_admission_bed
    fields: [bed_id]
  - name: idx_admission_date
    fields: [admission_datetime]
```

### Inpatient Progress Note

```yaml
table_name: inpatient_progress_notes

fields:
  id:
    type: uuid
    primary_key: true
  admission_id:
    type: uuid
    foreign_key: admissions.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  note_date:
    type: date
  note_sequence:
    type: integer
    description: Multiple notes per day
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
  practitioner_role:
    type: enum
    values: [attending, consultant, resident]
  subjective:
    type: text
  objective:
    type: text
  assessment:
    type: text
  plan:
    type: text
  vital_sign_id:
    type: uuid
    nullable: true
  pain_score:
    type: integer
    nullable: true
  mental_status:
    type: enum
    values: [alert, confused, somnolent, unresponsive]
    nullable: true
  mobility:
    type: enum
    values: [ambulatory, wheelchair, bedbound]
    nullable: true
  diet:
    type: enum
    values: [regular, soft, liquid, npo, tube]
    nullable: true
  iv_access:
    type: enum
    values: [none, peripheral, central]
    nullable: true
  catheter:
    type: enum
    values: [none, foley, condom]
    nullable: true
  fall_risk_score:
    type: integer
    nullable: true
  pressure_ulcer_risk:
    type: integer
    nullable: true
  new_orders:
    type: text
  discontinued_orders:
    type: text
  reviewed_by:
    type: uuid
    nullable: true
  reviewed_at:
    type: datetime
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_progress_note_admission
    fields: [admission_id]
  - name: idx_progress_note_date
    fields: [note_date]
```

### Medication Administration

```yaml
table_name: medication_administrations

fields:
  id:
    type: uuid
    primary_key: true
  order_id:
    type: uuid
    foreign_key: inpatient_medication_orders.id
  admission_id:
    type: uuid
    foreign_key: admissions.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  scheduled_datetime:
    type: datetime
  is_prn:
    type: boolean
  status:
    type: enum
    values: [given, held, refused, not_given, given_partial]
  administered_datetime:
    type: datetime
    nullable: true
  administered_by:
    type: uuid
    foreign_key: users.id
    nullable: true
  dose_given:
    type: string
  dose_value:
    type: decimal(10,3)
  dose_unit:
    type: string
  route:
    type: enum
    values: [oral, iv, im, sc, topical, inhalation, other]
  not_given_reason:
    type: enum
    values: [held_per_order, patient_refused, npo, patient_asleep, other]
    nullable: true
  not_given_details:
    type: text
    nullable: true
  patient_verified:
    type: boolean
    default: false
  medication_verified:
    type: boolean
    default: false
  dose_verified:
    type: boolean
    default: false
  time_verified:
    type: boolean
    default: false
  route_verified:
    type: boolean
    default: false
  batch_id:
    type: uuid
    nullable: true
  lot_number:
    type: string
    nullable: true
  pre_vitals:
    type: jsonb
    nullable: true
  post_vitals:
    type: jsonb
    nullable: true
  notes:
    type: text
  satusehat_medication_administration_id:
    type: string
    nullable: true
  created_at:
    type: datetime

indexes:
  - name: idx_med_admin_order
    fields: [order_id]
  - name: idx_med_admin_admission
    fields: [admission_id]
  - name: idx_med_admin_scheduled
    fields: [scheduled_datetime]
```

---

## FHIR Resource Mapping

### Inpatient Encounter

```yaml
fhir_inpatient_encounter:
  resourceType: Encounter
  identifier:
    - system: "http://sys-ids.kemkes.go.id/encounter/{org_id}"
      value: admission.admission_number
  status: in-progress | finished
  class:
    system: "http://terminology.hl7.org/CodeSystem/v3-ActCode"
    code: "IMP"
    display: "inpatient encounter"
  subject:
    reference: "Patient/{ihs_patient_id}"
  participant:
    - type:
        - coding:
            - system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType"
              code: "ATND"
              display: "attender"
      individual:
        reference: "Practitioner/{ihs_practitioner_id}"
  period:
    start: admission.admission_datetime
    end: admission.discharge_datetime
  reasonCode:
    - coding:
        - system: "http://hl7.org/fhir/sid/icd-10"
          code: admission.admitting_diagnosis_code
          display: admission.admitting_diagnosis_name
  hospitalization:
    admitSource:
      coding:
        - system: "http://terminology.hl7.org/CodeSystem/admit-source"
          code: admission_source_code
    dischargeDisposition:
      coding:
        - system: "http://terminology.hl7.org/CodeSystem/discharge-disposition"
          code: discharge_disposition_code
  location:
    - location:
        reference: "Location/{satusehat_location_id}"
        display: ward.name
      physicalType:
        coding:
          - system: "http://terminology.hl7.org/CodeSystem/location-physical-type"
            code: "bd"
            display: "Bed"
  serviceProvider:
    reference: "Organization/{satusehat_org_id}"
```

### MedicationAdministration

```yaml
fhir_medication_administration:
  resourceType: MedicationAdministration
  identifier:
    - system: "http://sys-ids.kemkes.go.id/medication-administration/{org_id}"
      value: medication_administration.id
  status: completed | not-done
  medicationReference:
    reference: "Medication/{kfa_id}"
    display: medication_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  context:
    reference: "Encounter/{satusehat_encounter_id}"
  effectiveDateTime: medication_administration.administered_datetime
  performer:
    - actor:
        reference: "Practitioner/{ihs_practitioner_id}"
  request:
    reference: "MedicationRequest/{satusehat_medication_request_id}"
  dosage:
    dose:
      value: medication_administration.dose_value
      unit: medication_administration.dose_unit
      system: "http://unitsofmeasure.org"
    route:
      coding:
        - system: "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration"
          code: route_code
  statusReason:
    - coding:
        - display: medication_administration.not_given_reason
```

---

## Business Rules

### Bed Assignment Rules
- Only one patient can occupy a bed at a time
- Bed status automatically updates to "occupied" on admission
- Bed status updates to "cleaning" on discharge
- Reserved beds cannot be assigned without releasing reservation

### Room Class and BPJS
- BPJS patients entitled to specific room class based on coverage
- Room upgrade (naik kelas) requires additional payment
- System tracks original entitlement vs actual room for billing

### Admission Prerequisites
- Patient must exist in system
- For BPJS: Valid SEP number required
- Deposit may be required for non-BPJS patients
- Informed consent must be signed

### MAR Documentation Rules
- Five rights verification required: patient, medication, dose, time, route
- PRN medications require indication documentation
- Held/refused medications require reason documentation
- Critical medications require pre/post vital signs

### Discharge Prerequisites
- All medication orders must be completed or discontinued
- Discharge summary must be completed by attending physician
- Billing must be settled or payment arrangement made
- Follow-up appointment recommended

### LOS Monitoring (BPJS)
- System calculates expected LOS based on INA-CBG code
- Warning alerts at 80% of expected LOS
- Critical alerts when LOS exceeds limit
- Clinical justification required for extended stays

---

## Room Classes Reference (BPJS)

| Class | Beds/Room | Description | BPJS Entitlement |
|-------|-----------|-------------|------------------|
| Class 3 | 6+ beds | Basic ward | BPJS Class 3 |
| Class 2 | 4 beds | Semi-private | BPJS Class 2 |
| Class 1 | 2 beds | Private ward | BPJS Class 1 |
| VIP | 1 bed | Private room | Upgrade only |
| VVIP | 1 bed | Premium amenities | Upgrade only |
| ICU | Varies | Intensive monitoring | All classes (clinical) |
| NICU | Varies | Neonatal intensive | All classes (clinical) |
| Isolation | 1 bed | Infectious disease | All classes (clinical) |

---

## Dependencies

- FEATURE-1.1: Patient Registration (patient data)
- FEATURE-2.2: Practitioner Management (attending physicians, nurses)
- FEATURE-4.1: Clinical Encounter (outpatient referral)
- FEATURE-8.1: Pharmacy (medication orders)
- BPJS Integration (SEP, INA-CBG)

## Enables

- FEATURE-10.1: Billing (room charges, nursing charges)
- BPJS Claims (inpatient claims)
- Satusehat (Encounter, MedicationAdministration)

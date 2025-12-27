# FEATURE-4.2: Prescription & Orders

> **Module**: Medical Services General
> **Related User Stories**: US-4.5, US-4.6, US-4.7
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Electronic prescription (e-Resep) with drug interaction alerts, laboratory order management with LOINC coding, and referral/medical certificate generation with BPJS integration.

### Business Value
Enables safe prescribing with allergy checks, streamlines lab ordering workflow, and automates referral documentation for BPJS and non-BPJS patients.

### User Impact
Doctors can prescribe with confidence using interaction alerts, order labs with integrated test catalogs, and generate compliant referral letters and medical certificates.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-4.5 | Prescription (e-Resep) | [View](../../01-user-stories/04-medical-services-general/US-4.1-4.7-medical-services-general.md#us-45-prescription-e-resep) |
| US-4.6 | Laboratory Order | [View](../../01-user-stories/04-medical-services-general/US-4.1-4.7-medical-services-general.md#us-46-laboratory-order) |
| US-4.7 | Referral & Medical Certificates | [View](../../01-user-stories/04-medical-services-general/US-4.1-4.7-medical-services-general.md#us-47-referral--medical-certificates) |

---

## API Endpoints Overview

### Prescriptions
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/prescriptions` | Create prescription | Yes | Doctor |
| GET | `/api/v1/encounters/{id}/prescriptions` | Get prescriptions | Yes | Clinical |
| PUT | `/api/v1/prescriptions/{id}` | Update prescription | Yes | Doctor |
| POST | `/api/v1/prescriptions/{id}/items` | Add prescription item | Yes | Doctor |
| DELETE | `/api/v1/prescription-items/{id}` | Remove item | Yes | Doctor |
| POST | `/api/v1/prescriptions/check-interactions` | Check drug interactions | Yes | Clinical |
| GET | `/api/v1/medications/search` | Search medications (KFA) | Yes | Clinical |

### Laboratory Orders
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/lab-orders` | Create lab order | Yes | Doctor |
| GET | `/api/v1/encounters/{id}/lab-orders` | Get lab orders | Yes | Clinical |
| PUT | `/api/v1/lab-orders/{id}` | Update lab order | Yes | Doctor |
| POST | `/api/v1/lab-orders/{id}/items` | Add test item | Yes | Doctor |
| GET | `/api/v1/lab-tests/search` | Search lab tests | Yes | Clinical |

### Referrals & Certificates
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/referrals` | Create referral | Yes | Doctor |
| GET | `/api/v1/encounters/{id}/referrals` | Get referrals | Yes | Clinical |
| POST | `/api/v1/encounters/{id}/certificates` | Create certificate | Yes | Doctor |
| GET | `/api/v1/encounters/{id}/certificates` | Get certificates | Yes | Clinical |
| GET | `/api/v1/referrals/{id}/print` | Print referral letter | Yes | Clinical |
| GET | `/api/v1/certificates/{id}/print` | Print certificate | Yes | Clinical |

---

## Detailed Endpoint Specifications

### POST /api/v1/encounters/{id}/prescriptions

```yaml
method: POST
path: /api/v1/encounters/{id}/prescriptions
description: Create a new prescription for encounter

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    properties:
      is_bpjs:
        type: boolean
        default: false
      pharmacy_notes:
        type: string
      valid_until:
        type: date
        default: today + 3 days
      items:
        type: array
        items:
          type: object
          required: [medication_id, quantity, frequency]
          properties:
            medication_id:
              type: uuid
            kfa_code:
              type: string
            medication_name:
              type: string
            strength:
              type: string
            form:
              type: enum
              values: [tablet, capsule, syrup, injection, cream, drop, other]
            quantity:
              type: decimal
            quantity_unit:
              type: string
            frequency:
              type: string
              example: "3x1"
            route:
              type: enum
              values: [oral, topical, injection, inhalation, sublingual, rectal]
            timing:
              type: enum
              values: [before_meal, after_meal, with_meal, bedtime, as_needed]
            duration_days:
              type: integer
            instructions:
              type: string
            allow_substitution:
              type: boolean
              default: true
            is_prn:
              type: boolean
              default: false
            prn_reason:
              type: string

response:
  success:
    status: 201
    body:
      id: uuid
      prescription_number: string
      encounter_id: uuid
      patient:
        id: uuid
        name: string
        allergies: array[string]
      prescriber:
        id: uuid
        name: string
      status: "draft" | "active"
      is_bpjs: boolean
      items:
        - id: uuid
          medication_name: string
          quantity: decimal
          frequency: string
          instructions: string
      interaction_warnings:
        - severity: "high" | "moderate" | "low"
          drug1: string
          drug2: string
          message: string
      allergy_warnings:
        - allergen: string
          medication: string
          severity: string
      satusehat_sync_status: "pending" | "synced"

  errors:
    - status: 400
      code: CRITICAL_INTERACTION
      message: "Critical drug interaction detected. Cannot proceed."
    - status: 400
      code: ALLERGY_CONFLICT
      message: "Patient has allergy to prescribed medication"
```

### POST /api/v1/prescriptions/check-interactions

```yaml
method: POST
path: /api/v1/prescriptions/check-interactions
description: Check drug interactions before prescribing

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
      medications:
        type: array[uuid]
        description: Medication IDs to check

response:
  success:
    status: 200
    body:
      safe_to_prescribe: boolean
      interactions:
        - type: "drug_drug" | "drug_allergy" | "drug_condition"
          severity: "critical" | "high" | "moderate" | "low"
          drug1: string
          drug2: string
          description: string
          recommendation: string
      current_medications:
        - name: string
          prescribed_date: date
          status: string
```

### POST /api/v1/encounters/{id}/lab-orders

```yaml
method: POST
path: /api/v1/encounters/{id}/lab-orders
description: Create laboratory order

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    required: [items]
    properties:
      priority:
        type: enum
        values: [routine, urgent, stat]
        default: routine
      clinical_indication:
        type: string
        description: Reason for ordering
      relevant_diagnosis:
        type: string
        description: ICD-10 code
      requires_fasting:
        type: boolean
        default: false
      fasting_hours:
        type: integer
        description: Required if fasting
      notes:
        type: string
      items:
        type: array
        items:
          type: object
          required: [lab_test_id]
          properties:
            lab_test_id:
              type: uuid
            loinc_code:
              type: string
            test_name:
              type: string
            specimen_type:
              type: enum
              values: [blood, urine, stool, sputum, swab, other]
            notes:
              type: string

response:
  success:
    status: 201
    body:
      id: uuid
      order_number: string
      encounter_id: uuid
      patient:
        id: uuid
        name: string
      ordered_by:
        id: uuid
        name: string
      priority: enum
      status: "pending"
      requires_fasting: boolean
      items:
        - id: uuid
          test_name: string
          specimen_type: string
          status: "ordered"
      total_estimated_cost: decimal
      satusehat_service_request_id: string
```

### POST /api/v1/encounters/{id}/referrals

```yaml
method: POST
path: /api/v1/encounters/{id}/referrals
description: Create referral letter

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    required: [referral_type, destination_facility_name, reason_for_referral]
    properties:
      referral_type:
        type: enum
        values: [internal, external]
      referral_reason:
        type: enum
        values: [specialist_consultation, hospitalization, diagnostic, therapy]
      destination_facility_name:
        type: string
      destination_facility_code:
        type: string
        description: Satusehat organization ID
      destination_specialty:
        type: string
      destination_practitioner_name:
        type: string
      primary_diagnosis_code:
        type: string
      secondary_diagnoses:
        type: array
        items:
          type: object
          properties:
            code: string
            name: string
      clinical_summary:
        type: string
      reason_for_referral:
        type: string
      is_bpjs:
        type: boolean
        default: false
      bpjs_ppk_tujuan:
        type: string
        description: BPJS destination PPK code
      expires_at:
        type: date
        default: today + 30 days

response:
  success:
    status: 201
    body:
      id: uuid
      referral_number: string
      referral_type: enum
      destination_facility: string
      primary_diagnosis: string
      status: "issued"
      issued_at: datetime
      expires_at: date
      is_bpjs: boolean
      bpjs_rujukan_number: string
      print_url: string
```

### POST /api/v1/encounters/{id}/certificates

```yaml
method: POST
path: /api/v1/encounters/{id}/certificates
description: Create medical certificate

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    required: [certificate_type, purpose]
    properties:
      certificate_type:
        type: enum
        values: [sks, skd, skbs, other]
        description: |
          sks = Surat Keterangan Sakit
          skd = Surat Keterangan Dokter
          skbs = Surat Keterangan Berbadan Sehat
      purpose:
        type: string
        description: Purpose of certificate
      diagnosis_code:
        type: string
        description: ICD-10 code for SKS
      diagnosis_name:
        type: string
      sick_leave_start:
        type: date
        description: For SKS
      sick_leave_end:
        type: date
        description: For SKS
      examination_findings:
        type: string
        description: For SKBS
      conclusion:
        type: string
      valid_until:
        type: date
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      certificate_number: string
      certificate_type: enum
      patient:
        id: uuid
        name: string
        nik: string
      issued_by:
        id: uuid
        name: string
        sip_number: string
      purpose: string
      sick_leave_days: integer
      issued_at: datetime
      valid_until: date
      print_url: string
```

---

## Data Models

### Prescription

```yaml
table_name: prescriptions

fields:
  id:
    type: uuid
    primary_key: true
  prescription_number:
    type: string
    format: "RX-YYYYMMDD-XXXX"
    unique: true
    index: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  prescriber_id:
    type: uuid
    foreign_key: practitioners.id
  status:
    type: enum
    values: [draft, active, completed, cancelled]
    default: active
  is_bpjs:
    type: boolean
    default: false
  prescribed_at:
    type: datetime
  valid_until:
    type: date
  pharmacy_notes:
    type: text
    nullable: true
  dispensed_at:
    type: datetime
    nullable: true
  dispensed_by:
    type: uuid
    foreign_key: users.id
    nullable: true
  satusehat_medication_request_ids:
    type: jsonb
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime
```

### Prescription Item

```yaml
table_name: prescription_items

fields:
  id:
    type: uuid
    primary_key: true
  prescription_id:
    type: uuid
    foreign_key: prescriptions.id
    index: true
  medication_id:
    type: uuid
    foreign_key: medications.id
  kfa_code:
    type: string
  medication_name:
    type: string
  strength:
    type: string
    nullable: true
  form:
    type: enum
    values: [tablet, capsule, syrup, injection, cream, drop, other]
  quantity:
    type: decimal
  quantity_unit:
    type: string
  frequency:
    type: string
  route:
    type: enum
    values: [oral, topical, injection, inhalation, sublingual, rectal]
  timing:
    type: enum
    values: [before_meal, after_meal, with_meal, bedtime, as_needed]
    nullable: true
  duration_days:
    type: integer
    nullable: true
  instructions:
    type: text
    nullable: true
  allow_substitution:
    type: boolean
    default: true
  substitution_reason:
    type: text
    nullable: true
  status:
    type: enum
    values: [pending, dispensed, cancelled, substituted]
    default: pending
  substituted_medication_id:
    type: uuid
    nullable: true
  is_prn:
    type: boolean
    default: false
  prn_reason:
    type: text
    nullable: true
  max_dose_per_day:
    type: string
    nullable: true
```

### Lab Order

```yaml
table_name: lab_orders

fields:
  id:
    type: uuid
    primary_key: true
  order_number:
    type: string
    format: "LAB-YYYYMMDD-XXXX"
    unique: true
    index: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  ordered_by:
    type: uuid
    foreign_key: practitioners.id
  priority:
    type: enum
    values: [routine, urgent, stat]
    default: routine
  clinical_indication:
    type: text
    nullable: true
  relevant_diagnosis:
    type: string
    nullable: true
  status:
    type: enum
    values: [pending, specimen_collected, processing, completed, cancelled]
    default: pending
    index: true
  ordered_at:
    type: datetime
  requires_fasting:
    type: boolean
    default: false
  fasting_hours:
    type: integer
    nullable: true
  notes:
    type: text
    nullable: true
  satusehat_service_request_id:
    type: string
    nullable: true
```

### Referral

```yaml
table_name: referrals

fields:
  id:
    type: uuid
    primary_key: true
  referral_number:
    type: string
    format: "REF-YYYYMMDD-XXXX"
    unique: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  referring_practitioner_id:
    type: uuid
    foreign_key: practitioners.id
  referral_type:
    type: enum
    values: [internal, external]
  referral_reason:
    type: enum
    values: [specialist_consultation, hospitalization, diagnostic, therapy]
  destination_facility_name:
    type: string
  destination_facility_code:
    type: string
    nullable: true
  destination_specialty:
    type: string
    nullable: true
  destination_practitioner_name:
    type: string
    nullable: true
  primary_diagnosis_code:
    type: string
  primary_diagnosis_name:
    type: string
  secondary_diagnoses:
    type: jsonb
    nullable: true
  clinical_summary:
    type: text
    nullable: true
  reason_for_referral:
    type: text
  is_bpjs:
    type: boolean
    default: false
  bpjs_rujukan_number:
    type: string
    nullable: true
  bpjs_rujukan_date:
    type: date
    nullable: true
  bpjs_ppk_tujuan:
    type: string
    nullable: true
  status:
    type: enum
    values: [draft, issued, accepted, completed, cancelled]
    default: issued
  issued_at:
    type: datetime
  expires_at:
    type: date
  notes:
    type: text
    nullable: true
```

### Medical Certificate

```yaml
table_name: medical_certificates

fields:
  id:
    type: uuid
    primary_key: true
  certificate_number:
    type: string
    unique: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  issued_by:
    type: uuid
    foreign_key: practitioners.id
  certificate_type:
    type: enum
    values: [sks, skd, skbs, other]
  purpose:
    type: text
  diagnosis_code:
    type: string
    nullable: true
  diagnosis_name:
    type: string
    nullable: true
  sick_leave_start:
    type: date
    nullable: true
  sick_leave_end:
    type: date
    nullable: true
  sick_leave_days:
    type: integer
    nullable: true
  examination_findings:
    type: text
    nullable: true
  conclusion:
    type: text
    nullable: true
  issued_at:
    type: datetime
  valid_until:
    type: date
    nullable: true
  notes:
    type: text
    nullable: true
```

---

## Business Rules

### Prescription Rules
- Drug interactions must be checked before save
- Critical interactions block prescription
- Allergy conflicts show blocking alert
- BPJS prescriptions limited to formulary
- Valid for 3 days by default

### Lab Order Rules
- Priority affects processing sequence
- Fasting requirements must be communicated
- STAT orders trigger immediate notification
- Results linked back to order

### Referral Rules
- BPJS referrals require PPK code
- External referrals need facility code
- Valid for 30 days
- Can be cancelled before acceptance

### Certificate Rules
- SKS requires diagnosis
- SKBS requires examination findings
- Certificate numbers are sequential
- Doctor's SIP number included

---

## Dependencies

- FEATURE-4.1: Clinical Encounter
- FEATURE-1.2: Medical Records (allergies)
- Medication master data (KFA)
- Lab test master data (LOINC)

## Enables

- FEATURE-8: Pharmacy (prescription dispensing)
- FEATURE-9: Laboratory (order processing)
- FEATURE-12: BPJS Integration (rujukan)

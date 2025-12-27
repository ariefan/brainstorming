# FEATURE-1.2: Medical Records & Clinical Data

> **Module**: Patient Management
> **Related User Stories**: US-1.3, US-1.4, US-1.5
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive medical record management including clinical history dashboard, allergy and chronic condition tracking with drug interaction alerts, and family member linking for health history and billing consolidation.

### Business Value
Provides clinicians with complete patient health overview for informed treatment decisions, enables safety alerts for drug allergies, and supports family-based care coordination.

### User Impact
Doctors access complete medical history at a glance, receive automatic alerts for allergies and drug interactions, and can view family health patterns for comprehensive care.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-1.3 | Medical Record (Rekam Medis) | [View](../../01-user-stories/01-patient-management/US-1.1-1.5-patient-management.md#us-13-medical-record-rekam-medis) |
| US-1.4 | Allergies and Chronic Conditions | [View](../../01-user-stories/01-patient-management/US-1.1-1.5-patient-management.md#us-14-allergies-and-chronic-conditions) |
| US-1.5 | Family Member Linking | [View](../../01-user-stories/01-patient-management/US-1.1-1.5-patient-management.md#us-15-family-member-linking) |

---

## API Endpoints Overview

### Medical Records
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/patients/{id}/medical-record` | Get medical record summary | Yes | Clinical |
| GET | `/api/v1/patients/{id}/encounters` | List patient encounters | Yes | Clinical |
| GET | `/api/v1/patients/{id}/vitals` | Get vital signs history | Yes | Clinical |

### Allergies
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/patients/{id}/allergies` | List patient allergies | Yes | Clinical |
| POST | `/api/v1/patients/{id}/allergies` | Record new allergy | Yes | Doctor, Nurse |
| PUT | `/api/v1/allergies/{id}` | Update allergy | Yes | Doctor |
| DELETE | `/api/v1/allergies/{id}` | Remove allergy | Yes | Doctor |
| POST | `/api/v1/patients/{id}/check-drug-allergy` | Check drug interactions | Yes | Doctor, Pharmacist |

### Chronic Conditions
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/patients/{id}/conditions` | List chronic conditions | Yes | Clinical |
| POST | `/api/v1/patients/{id}/conditions` | Record chronic condition | Yes | Doctor |
| PUT | `/api/v1/conditions/{id}` | Update condition status | Yes | Doctor |

### Family Relationships
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/patients/{id}/family` | Get family members | Yes | Clinical |
| POST | `/api/v1/patients/{id}/family` | Link family member | Yes | Front Desk, Admin |
| DELETE | `/api/v1/family-relationships/{id}` | Remove relationship | Yes | Front Desk, Admin |

---

## Detailed Endpoint Specifications

### GET /api/v1/patients/{id}/medical-record

```yaml
method: GET
path: /api/v1/patients/{id}/medical-record
description: Get comprehensive medical record summary dashboard

authentication:
  required: true
  roles: [doctor, nurse, midwife, pharmacist, lab_tech]

response:
  success:
    status: 200
    body:
      patient_info:
        id: uuid
        mrn: string
        full_name: string
        age: integer
        age_months: integer (for children)
        gender: string
        blood_type: string
        rhesus: string
        photo_url: string

      alerts:
        allergies:
          - id: uuid
            allergen_name: string
            allergen_type: enum
            severity: enum
            reaction: string
        chronic_conditions:
          - id: uuid
            condition_name: string
            icd10_code: string
            status: enum
        current_medications:
          - medication_name: string
            dosage: string
            frequency: string
            start_date: date

      recent_visits:
        - encounter_id: uuid
          date: datetime
          polyclinic: string
          practitioner: string
          diagnoses: array[string]
          chief_complaint: string

      vital_signs_latest:
        recorded_at: datetime
        bp_systolic: integer
        bp_diastolic: integer
        heart_rate: integer
        respiratory_rate: integer
        temperature: decimal
        weight: decimal
        height: decimal
        bmi: decimal

      vital_signs_trend:
        - date: date
          bp_systolic: integer
          bp_diastolic: integer
          heart_rate: integer
          weight: decimal

      lab_results_recent:
        - order_id: uuid
          test_name: string
          result_date: date
          status: string
          critical_flag: boolean

  errors:
    - status: 404
      code: PATIENT_NOT_FOUND
      message: "Patient not found"
```

### POST /api/v1/patients/{id}/allergies

```yaml
method: POST
path: /api/v1/patients/{id}/allergies
description: Record a new allergy for patient

authentication:
  required: true
  roles: [doctor, nurse]

request:
  body:
    type: object
    required: [allergen_type, allergen_name, severity]
    properties:
      allergen_type:
        type: enum
        values: [drug, food, environment, other]
      allergen_name:
        type: string
        description: Name of allergen
        example: "Penicillin"
      allergen_code:
        type: string
        description: RxNorm code for drugs
      reaction:
        type: string
        description: Description of allergic reaction
        example: "Skin rash, difficulty breathing"
      severity:
        type: enum
        values: [mild, moderate, severe, life_threatening]
      certainty:
        type: enum
        values: [confirmed, suspected]
        default: suspected
      onset_date:
        type: date
        description: When allergy was first observed
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      patient_id: uuid
      allergen_type: enum
      allergen_name: string
      severity: enum
      status: "active"
      recorded_date: date
      recorded_by: object
      satusehat_sync_status: "pending" | "synced"

  errors:
    - status: 400
      code: INVALID_ALLERGEN_TYPE
      message: "Invalid allergen type"
    - status: 409
      code: ALLERGY_ALREADY_RECORDED
      message: "This allergy is already recorded for patient"
```

### POST /api/v1/patients/{id}/check-drug-allergy

```yaml
method: POST
path: /api/v1/patients/{id}/check-drug-allergy
description: Check if a drug conflicts with patient allergies

authentication:
  required: true
  roles: [doctor, nurse, pharmacist]

request:
  body:
    type: object
    required: [drug_code]
    properties:
      drug_code:
        type: string
        description: Drug code to check
      drug_name:
        type: string
        description: Drug name for display
      drug_class:
        type: string
        description: Drug classification

response:
  success:
    status: 200
    body:
      has_conflict: boolean
      risk_level: "none" | "low" | "moderate" | "high" | "critical"
      conflicts:
        - allergy_id: uuid
          allergen_name: string
          match_type: "exact" | "class" | "cross_reactive"
          severity: enum
          recommendation: string
      safe_to_prescribe: boolean
      warnings: array[string]
```

### POST /api/v1/patients/{id}/conditions

```yaml
method: POST
path: /api/v1/patients/{id}/conditions
description: Record a chronic condition for patient

authentication:
  required: true
  roles: [doctor]

request:
  body:
    type: object
    required: [condition_name, icd10_code]
    properties:
      condition_name:
        type: string
        example: "Type 2 Diabetes Mellitus"
      icd10_code:
        type: string
        example: "E11"
      onset_date:
        type: date
      severity:
        type: enum
        values: [mild, moderate, severe]
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      patient_id: uuid
      condition_name: string
      icd10_code: string
      status: "active"
      onset_date: date
      recorded_by: object
```

### POST /api/v1/patients/{id}/family

```yaml
method: POST
path: /api/v1/patients/{id}/family
description: Link a family member to patient

authentication:
  required: true
  roles: [admin, front_desk]

request:
  body:
    type: object
    required: [related_patient_id, relationship]
    properties:
      related_patient_id:
        type: uuid
        description: ID of related patient
      relationship:
        type: enum
        values: [spouse, father, mother, child, sibling]
      is_emergency_contact:
        type: boolean
        default: false
      is_guarantor:
        type: boolean
        default: false
        description: Responsible for billing

response:
  success:
    status: 201
    body:
      id: uuid
      patient_id: uuid
      related_patient:
        id: uuid
        mrn: string
        full_name: string
      relationship: enum
      inverse_relationship: enum
      is_emergency_contact: boolean
      is_guarantor: boolean

  errors:
    - status: 400
      code: CANNOT_LINK_SELF
      message: "Cannot link patient to themselves"
    - status: 409
      code: RELATIONSHIP_EXISTS
      message: "Relationship already exists"
```

### GET /api/v1/patients/{id}/family

```yaml
method: GET
path: /api/v1/patients/{id}/family
description: Get patient's family tree with health indicators

authentication:
  required: true
  roles: [All clinical roles]

response:
  success:
    status: 200
    body:
      patient_id: uuid
      family_members:
        - relationship_id: uuid
          patient:
            id: uuid
            mrn: string
            full_name: string
            gender: enum
            age: integer
            photo_url: string
          relationship: enum
          is_emergency_contact: boolean
          is_guarantor: boolean
          health_indicators:
            has_chronic_conditions: boolean
            chronic_conditions: array[string]
            has_allergies: boolean
            last_visit_date: date
```

---

## Data Models

### Allergy

```yaml
table_name: allergies

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  allergen_type:
    type: enum
    values: [drug, food, environment, other]
  allergen_name:
    type: string
  allergen_code:
    type: string
    nullable: true
    description: RxNorm code for drugs
  reaction:
    type: text
    nullable: true
  severity:
    type: enum
    values: [mild, moderate, severe, life_threatening]
  certainty:
    type: enum
    values: [confirmed, suspected]
    default: suspected
  onset_date:
    type: date
    nullable: true
  recorded_date:
    type: date
  recorded_by:
    type: uuid
    foreign_key: practitioners.id
  status:
    type: enum
    values: [active, inactive, resolved]
    default: active
  notes:
    type: text
    nullable: true
  satusehat_id:
    type: string
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_allergy_patient_active
    fields: [patient_id, status]
  - name: idx_allergy_drug
    fields: [allergen_type, allergen_code]
    where: allergen_type = 'drug'
```

### Chronic Condition

```yaml
table_name: chronic_conditions

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  condition_name:
    type: string
  icd10_code:
    type: string
    index: true
  onset_date:
    type: date
    nullable: true
  status:
    type: enum
    values: [active, remission, resolved]
    default: active
  severity:
    type: enum
    values: [mild, moderate, severe]
    nullable: true
  notes:
    type: text
    nullable: true
  recorded_by:
    type: uuid
    foreign_key: practitioners.id
  recorded_date:
    type: date
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_condition_patient_active
    fields: [patient_id, status]
```

### Family Relationship

```yaml
table_name: family_relationships

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  related_patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  relationship:
    type: enum
    values: [spouse, father, mother, child, sibling]
  is_emergency_contact:
    type: boolean
    default: false
  is_guarantor:
    type: boolean
    default: false
  created_by:
    type: uuid
    foreign_key: users.id
  created_at:
    type: datetime

constraints:
  - type: unique
    fields: [patient_id, related_patient_id]
  - type: check
    condition: patient_id != related_patient_id
```

---

## FHIR Resource Mappings

### AllergyIntolerance

```yaml
fhir_allergy_intolerance:
  resourceType: AllergyIntolerance
  identifier:
    - system: "http://sys-ids.kemkes.go.id/allergy/{org_id}"
      value: allergy.id
  clinicalStatus:
    coding:
      - system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical"
        code: allergy.status
  verificationStatus:
    coding:
      - system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification"
        code: allergy.certainty
  type: allergy
  category:
    - allergy.allergen_type
  criticality: severity_to_criticality(allergy.severity)
  code:
    coding:
      - system: appropriate_code_system
        code: allergy.allergen_code
        display: allergy.allergen_name
  patient:
    reference: "Patient/{ihs_patient_id}"
  recordedDate: allergy.recorded_date
  recorder:
    reference: "Practitioner/{ihs_practitioner_id}"
  reaction:
    - manifestation:
        - text: allergy.reaction
      severity: allergy.severity
```

### RelatedPerson

```yaml
fhir_related_person:
  resourceType: RelatedPerson
  identifier:
    - system: "http://sys-ids.kemkes.go.id/related-person/{org_id}"
      value: family_relationship.id
  patient:
    reference: "Patient/{ihs_patient_id}"
  relationship:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode"
          code: relationship_to_fhir_code(relationship)
          display: relationship
  name:
    - text: related_patient.full_name
  telecom:
    - system: phone
      value: related_patient.phone
```

---

## Business Rules

### Allergy Severity Mapping
```yaml
severity_to_criticality:
  mild: low
  moderate: low
  severe: high
  life_threatening: high
```

### Drug Allergy Checking
1. Check exact drug code match
2. Check drug class match (e.g., all penicillins)
3. Check cross-reactive medications
4. Return highest risk level found

### Relationship Inverse Mapping
```yaml
relationship_inverses:
  spouse: spouse
  father: child
  mother: child
  child: father/mother (based on gender)
  sibling: sibling
```

### Family Relationship Rules
- Creating relationship auto-creates inverse relationship
- Deleting relationship removes both directions
- One patient can only have one spouse
- Guarantor status used for billing consolidation

### Clinical Alerts Display Priority
1. Life-threatening allergies (critical)
2. Severe allergies (high)
3. Active chronic conditions
4. Current medications with interactions
5. Moderate allergies (medium)

---

## Dependencies

- FEATURE-1.1: Patient Registration
- FEATURE-0.2: Authentication
- ICD-10 code master data
- RxNorm drug database (for allergy checking)

## Enables

- Medical Services (encounter documentation)
- Pharmacy (drug interaction alerts)
- Laboratory (result history)
- Billing (guarantor relationships)

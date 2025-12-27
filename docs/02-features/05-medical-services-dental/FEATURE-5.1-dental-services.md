# FEATURE-5.1: Dental Services

> **Module**: Medical Services Dental
> **Related User Stories**: US-5.1, US-5.2, US-5.3, US-5.4, US-5.5
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive dental clinical services including odontogram (tooth chart) documentation, dental procedures with ICD-9-CM coding, multi-visit treatment planning, dental materials tracking, and dental-specific ICD-10 diagnoses.

### Business Value
Provides specialized dental workflow that captures tooth-level detail, enables treatment planning for complex cases, tracks material usage for cost control, and ensures proper coding for billing.

### User Impact
Dentists can document findings on interactive odontogram, plan multi-visit treatments, record procedures with proper coding, and track material usage automatically.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-5.1 | Dental Encounter & Examination | [View](../../01-user-stories/05-medical-services-dental/US-5.1-5.5-medical-services-dental.md#us-51-dental-encounter--examination) |
| US-5.2 | Dental Procedures with ICD-9-CM | [View](../../01-user-stories/05-medical-services-dental/US-5.1-5.5-medical-services-dental.md#us-52-dental-procedures-with-icd-9-cm) |
| US-5.3 | Dental Treatment Plan | [View](../../01-user-stories/05-medical-services-dental/US-5.1-5.5-medical-services-dental.md#us-53-dental-treatment-plan) |
| US-5.4 | Dental Materials Tracking | [View](../../01-user-stories/05-medical-services-dental/US-5.1-5.5-medical-services-dental.md#us-54-dental-materials-tracking) |
| US-5.5 | Dental Diagnosis Codes | [View](../../01-user-stories/05-medical-services-dental/US-5.1-5.5-medical-services-dental.md#us-55-dental-diagnosis-codes) |

---

## API Endpoints Overview

### Dental Examination
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/dental` | Create dental encounter | Yes | Dentist |
| GET | `/api/v1/encounters/{id}/dental` | Get dental details | Yes | Dentist |
| PUT | `/api/v1/dental-encounters/{id}` | Update dental exam | Yes | Dentist |

### Odontogram (Tooth Chart)
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/patients/{id}/dental-chart` | Create/update chart | Yes | Dentist |
| GET | `/api/v1/patients/{id}/dental-chart` | Get latest chart | Yes | Dentist |
| GET | `/api/v1/patients/{id}/dental-chart/history` | Get chart history | Yes | Dentist |
| PUT | `/api/v1/dental-chart-tooth/{id}` | Update tooth status | Yes | Dentist |

### Dental Procedures
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/encounters/{id}/dental-procedures` | Record procedure | Yes | Dentist |
| GET | `/api/v1/encounters/{id}/dental-procedures` | List procedures | Yes | Dentist |
| PUT | `/api/v1/dental-procedures/{id}` | Update procedure | Yes | Dentist |
| POST | `/api/v1/dental-procedures/{id}/materials` | Add materials used | Yes | Dentist |

### Treatment Plans
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/patients/{id}/dental-treatment-plans` | Create plan | Yes | Dentist |
| GET | `/api/v1/patients/{id}/dental-treatment-plans` | List plans | Yes | Dentist |
| PUT | `/api/v1/dental-treatment-plans/{id}` | Update plan | Yes | Dentist |
| POST | `/api/v1/dental-treatment-plans/{id}/items` | Add plan item | Yes | Dentist |
| POST | `/api/v1/dental-treatment-plans/{id}/consent` | Record consent | Yes | Dentist |

---

## Detailed Endpoint Specifications

### POST /api/v1/encounters/{id}/dental

```yaml
method: POST
path: /api/v1/encounters/{id}/dental
description: Create dental-specific encounter extension

authentication:
  required: true
  roles: [dentist]

request:
  body:
    type: object
    properties:
      oral_hygiene_status:
        type: enum
        values: [good, fair, poor]
      gingival_status:
        type: enum
        values: [healthy, mild_inflammation, moderate_inflammation, severe_inflammation]
      plaque_index:
        type: decimal
        min: 0
        max: 3
      bleeding_index:
        type: decimal
        min: 0
        max: 3
      tmj_assessment:
        type: object
        properties:
          left: string
          right: string
          pain: boolean
          clicking: boolean
      occlusion_class:
        type: enum
        values: [class_i, class_ii_div_1, class_ii_div_2, class_iii]
      bite_issues:
        type: array
        items:
          type: enum
          values: [open_bite, deep_bite, cross_bite, edge_to_edge]
      soft_tissue_findings:
        type: string
      lesions:
        type: array
        items:
          type: object
          properties:
            location: string
            type: string
            size: string
            description: string
      intraoral_photos:
        type: array[string]
      extraoral_photos:
        type: array[string]
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      encounter_id: uuid
      oral_hygiene_status: enum
      gingival_status: enum
      findings_summary: string
```

### POST /api/v1/patients/{id}/dental-chart

```yaml
method: POST
path: /api/v1/patients/{id}/dental-chart
description: Create or update odontogram

authentication:
  required: true
  roles: [dentist]

request:
  body:
    type: object
    required: [encounter_id]
    properties:
      encounter_id:
        type: uuid
      teeth:
        type: array
        items:
          type: object
          required: [tooth_number]
          properties:
            tooth_number:
              type: string
              description: FDI notation (11-48)
            presence_status:
              type: enum
              values: [present, missing, impacted, unerupted, root_only]
            missing_reason:
              type: enum
              values: [extracted, congenital, trauma]
            conditions:
              type: array
              items:
                type: object
                properties:
                  surface:
                    type: string
                    description: M, D, O, B, L, I
                  condition_code:
                    type: string
                  condition_name:
                    type: string
                  severity:
                    type: string
            restorations:
              type: array
              items:
                type: object
                properties:
                  surface: string
                  material: string
                  date: date
                  status: string
            mobility_grade:
              type: enum
              values: [0, 1, 2, 3]
            probing_depths:
              type: object
              description: "{M, D, B, L} in mm"
            notes:
              type: string

response:
  success:
    status: 201
    body:
      id: uuid
      patient_id: uuid
      encounter_id: uuid
      teeth_recorded: integer
      conditions_found: integer
      recorded_at: datetime
```

### POST /api/v1/encounters/{id}/dental-procedures

```yaml
method: POST
path: /api/v1/encounters/{id}/dental-procedures
description: Record dental procedure performed

authentication:
  required: true
  roles: [dentist]

request:
  body:
    type: object
    required: [icd9cm_code, tooth_numbers]
    properties:
      icd9cm_code:
        type: string
        description: ICD-9-CM procedure code
      procedure_name:
        type: string
      procedure_category:
        type: enum
        values: [preventive, restorative, endodontic, surgical, prosthodontic, orthodontic, periodontal]
      tooth_numbers:
        type: array[string]
        description: Affected teeth (FDI)
      surfaces:
        type: array[string]
        description: Surfaces treated (MOD, OB, etc.)
      quadrants:
        type: array
        items:
          type: enum
          values: [upper_right, upper_left, lower_left, lower_right]
      anesthesia_type:
        type: enum
        values: [none, local, block, topical, sedation]
      anesthesia_amount:
        type: string
      materials:
        type: array
        items:
          type: object
          properties:
            material_id: uuid
            quantity: decimal
            lot_number: string
      before_photo_url:
        type: string
      after_photo_url:
        type: string
      complications:
        type: string
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      encounter_id: uuid
      icd9cm_code: string
      procedure_name: string
      tooth_numbers: array
      status: "completed"
      performed_by: object
      materials_used: array
      billable_amount: decimal
      satusehat_procedure_id: string
```

### POST /api/v1/patients/{id}/dental-treatment-plans

```yaml
method: POST
path: /api/v1/patients/{id}/dental-treatment-plans
description: Create multi-visit treatment plan

authentication:
  required: true
  roles: [dentist]

request:
  body:
    type: object
    required: [plan_name, chief_complaint]
    properties:
      encounter_id:
        type: uuid
        description: Initial consultation encounter
      plan_name:
        type: string
      chief_complaint:
        type: string
      treatment_goals:
        type: string
      estimated_visits:
        type: integer
      start_date:
        type: date
      expected_end_date:
        type: date
      items:
        type: array
        items:
          type: object
          properties:
            sequence: integer
            procedure_code: string
            procedure_name: string
            tooth_numbers: array[string]
            surfaces: array[string]
            planned_visit_number: integer
            priority:
              type: enum
              values: [urgent, high, medium, low]
            estimated_cost: decimal
            notes: string

response:
  success:
    status: 200
    body:
      id: uuid
      plan_name: string
      status: "draft"
      estimated_visits: integer
      total_estimated_cost: decimal
      items: array
      consent_required: boolean
```

---

## Data Models

### Dental Encounter

```yaml
table_name: dental_encounters

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    unique: true
  oral_hygiene_status:
    type: enum
    values: [good, fair, poor]
    nullable: true
  gingival_status:
    type: enum
    values: [healthy, mild_inflammation, moderate_inflammation, severe_inflammation]
    nullable: true
  plaque_index:
    type: decimal
    nullable: true
  bleeding_index:
    type: decimal
    nullable: true
  tmj_assessment:
    type: jsonb
    nullable: true
  occlusion_class:
    type: enum
    values: [class_i, class_ii_div_1, class_ii_div_2, class_iii]
    nullable: true
  bite_issues:
    type: array
    nullable: true
  soft_tissue_findings:
    type: text
    nullable: true
  lesions:
    type: jsonb
    nullable: true
  intraoral_photos:
    type: array[string]
    nullable: true
  extraoral_photos:
    type: array[string]
    nullable: true
  notes:
    type: text
    nullable: true
```

### Dental Chart & Tooth

```yaml
table_name: dental_charts

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
  recorded_at:
    type: datetime
  recorded_by:
    type: uuid
    foreign_key: practitioners.id

---

table_name: dental_chart_teeth

fields:
  id:
    type: uuid
    primary_key: true
  dental_chart_id:
    type: uuid
    foreign_key: dental_charts.id
    index: true
  tooth_number:
    type: string
    description: FDI notation 11-48
  tooth_region:
    type: enum
    values: [upper_right, upper_left, lower_left, lower_right]
  tooth_type:
    type: enum
    values: [incisor, canine, premolar, molar]
  is_deciduous:
    type: boolean
    default: false
  presence_status:
    type: enum
    values: [present, missing, impacted, unerupted, root_only]
    default: present
  missing_reason:
    type: enum
    values: [extracted, congenital, trauma]
    nullable: true
  conditions:
    type: jsonb
    nullable: true
  restorations:
    type: jsonb
    nullable: true
  mobility_grade:
    type: enum
    values: [0, 1, 2, 3]
    nullable: true
  probing_depths:
    type: jsonb
    nullable: true
  recession:
    type: jsonb
    nullable: true
  notes:
    type: text
    nullable: true
```

### Dental Procedure

```yaml
table_name: dental_procedures

fields:
  id:
    type: uuid
    primary_key: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    index: true
  dental_chart_id:
    type: uuid
    nullable: true
  icd9cm_code:
    type: string
    index: true
  procedure_name:
    type: string
  procedure_category:
    type: enum
    values: [preventive, restorative, endodontic, surgical, prosthodontic, orthodontic, periodontal]
  tooth_numbers:
    type: array[string]
  surfaces:
    type: array[string]
    nullable: true
  quadrants:
    type: array
    nullable: true
  anesthesia_type:
    type: enum
    values: [none, local, block, topical, sedation]
    nullable: true
  anesthesia_amount:
    type: string
    nullable: true
  materials:
    type: jsonb
    nullable: true
  status:
    type: enum
    values: [planned, in_progress, completed, cancelled]
    default: completed
  started_at:
    type: datetime
  completed_at:
    type: datetime
    nullable: true
  performed_by:
    type: uuid
    foreign_key: practitioners.id
  assisted_by:
    type: uuid
    nullable: true
  complications:
    type: text
    nullable: true
  before_photo_url:
    type: string
    nullable: true
  after_photo_url:
    type: string
    nullable: true
  is_billable:
    type: boolean
    default: true
  tariff_code:
    type: string
    nullable: true
  notes:
    type: text
    nullable: true
  satusehat_procedure_id:
    type: string
    nullable: true
```

### Dental Treatment Plan

```yaml
table_name: dental_treatment_plans

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  created_encounter_id:
    type: uuid
    foreign_key: encounters.id
  created_by:
    type: uuid
    foreign_key: practitioners.id
  plan_name:
    type: string
  chief_complaint:
    type: text
  treatment_goals:
    type: text
    nullable: true
  status:
    type: enum
    values: [draft, active, completed, cancelled, on_hold]
    default: draft
  estimated_visits:
    type: integer
  estimated_cost:
    type: decimal
  actual_cost:
    type: decimal
    default: 0
  patient_consent:
    type: boolean
    default: false
  consent_date:
    type: datetime
    nullable: true
  consent_notes:
    type: text
    nullable: true
  start_date:
    type: date
  expected_end_date:
    type: date
    nullable: true
  actual_end_date:
    type: date
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime
```

---

## Tooth Numbering (FDI Notation)

```
         UPPER
   ┌─────────────────────────────────┐
   │ 18 17 16 15 14 13 12 11 │ 21 22 23 24 25 26 27 28 │
   │         RIGHT           │          LEFT            │
   ├─────────────────────────────────┤
   │ 48 47 46 45 44 43 42 41 │ 31 32 33 34 35 36 37 38 │
   │         RIGHT           │          LEFT            │
   └─────────────────────────────────┘
         LOWER
```

---

## Common Dental Procedures (ICD-9-CM)

| Code | Procedure |
|------|-----------|
| 23.09 | Extraction, simple |
| 23.19 | Extraction, surgical |
| 23.2 | Restoration, amalgam |
| 23.42 | Restoration, composite |
| 23.7 | Root canal therapy |
| 96.54 | Scaling |
| 23.41 | Crown |
| 23.5 | Denture |

---

## Business Rules

### Odontogram Rules
- New chart created for each encounter
- Historical charts preserved for comparison
- Tooth status changes tracked over time

### Treatment Plan Rules
- Patient consent required before active
- Items can be reordered by priority
- Completed items linked to procedures

### Material Tracking
- Stock deducted on procedure completion
- Low stock alerts generated
- Expiry tracking for all materials

---

## Dependencies

- FEATURE-4.1: Clinical Encounter (base encounter)
- FEATURE-1.1: Patient Registration
- Dental material inventory
- ICD-9-CM and ICD-10 dental codes

## Enables

- FEATURE-10: Billing (dental procedure charges)
- Dental reporting

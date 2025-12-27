# Medical Services - Poli Gigi (Dental)

> **Module**: 05 - Medical Services Dental
> **Stories**: US-5.1 to US-5.5
> **Priority**: P0 (Critical)
> **FHIR Resources**: Encounter, Condition, Procedure, Observation

---

## US-5.1: Dental Encounter & Examination

### User Story
**As a** dentist
**I want to** conduct dental examinations with structured findings
**So that** oral health status is comprehensively documented

### Acceptance Criteria

- [ ] **GIVEN** patient arrives at Poli Gigi
      **WHEN** dentist starts examination
      **THEN** system creates dental encounter with odontogram interface

- [ ] **GIVEN** examination is completed
      **WHEN** dentist records findings
      **THEN** system saves tooth-by-tooth conditions

### Data Model

```yaml
dental_encounter:
  id: uuid
  encounter_id: uuid (FK to base encounter)

  # Dental-specific assessment
  oral_hygiene_status: enum (good/fair/poor)
  gingival_status: enum (healthy/mild_inflammation/moderate_inflammation/severe_inflammation)
  plaque_index: decimal (nullable)
  bleeding_index: decimal (nullable)

  # TMJ Assessment
  tmj_assessment: jsonb
  # Example: {"left": "normal", "right": "clicking", "pain": false}

  # Occlusion
  occlusion_class: enum (class_i/class_ii_div_1/class_ii_div_2/class_iii)
  bite_issues: array[enum] # open_bite, deep_bite, cross_bite, etc.

  # Soft Tissue
  soft_tissue_findings: text
  lesions: jsonb # array of {location, type, size, description}

  # Photos
  intraoral_photos: array[string] # URLs
  extraoral_photos: array[string] # URLs

  notes: text

dental_chart:
  id: uuid
  patient_id: uuid (FK)
  encounter_id: uuid (FK)
  recorded_at: datetime
  recorded_by: uuid (FK to practitioner)

dental_chart_tooth:
  id: uuid
  dental_chart_id: uuid (FK)

  # Tooth identification
  tooth_number: string # FDI notation: 11-18, 21-28, 31-38, 41-48
  tooth_region: enum (upper_right/upper_left/lower_left/lower_right)
  tooth_type: enum (incisor/canine/premolar/molar)
  is_deciduous: boolean (default: false)

  # Status
  presence_status: enum (present/missing/impacted/unerupted/root_only)
  missing_reason: enum (extracted/congenital/trauma, nullable)

  # Conditions (multiple per tooth)
  conditions: jsonb
  # Array of {surface, condition_code, condition_name, severity}
  # Surfaces: M (mesial), D (distal), O (occlusal), B (buccal), L (lingual), I (incisal)

  # Restorations
  restorations: jsonb
  # Array of {surface, material, date, status}

  # Mobility & Pockets
  mobility_grade: enum (0/1/2/3, nullable)
  probing_depths: jsonb # {M, D, B, L} pocket depths in mm
  recession: jsonb # gingival recession measurements

  notes: text

# Dental condition codes
dental_condition:
  code: string
  name_id: string # Indonesian
  name_en: string
  category: enum (caries/restoration/endodontic/periodontal/prosthetic/other)
  color_code: string # for chart visualization
  symbol: string # for chart display
```

### Tooth Chart (Odontogram) Visual

```
         UPPER
   ┌─────────────────────────────────┐
   │ 18 17 16 15 14 13 12 11 │ 21 22 23 24 25 26 27 28 │
   │  8  7  6  5  4  3  2  1 │  1  2  3  4  5  6  7  8  │
   │         RIGHT           │          LEFT            │
   ├─────────────────────────────────┤
   │  8  7  6  5  4  3  2  1 │  1  2  3  4  5  6  7  8  │
   │ 48 47 46 45 44 43 42 41 │ 31 32 33 34 35 36 37 38 │
   └─────────────────────────────────┘
         LOWER
```

---

## US-5.2: Dental Procedures with ICD-9-CM

### User Story
**As a** dentist
**I want to** record dental procedures with proper coding
**So that** treatments are documented and billable

### Acceptance Criteria

- [ ] **GIVEN** dental treatment is performed
      **WHEN** dentist records procedure
      **THEN** system captures ICD-9-CM code with tooth numbers

- [ ] **GIVEN** procedure is completed
      **WHEN** syncing to Satusehat
      **THEN** Procedure resource is created

### Common Dental Procedures

| Procedure | ICD-9-CM | Description |
|-----------|----------|-------------|
| Extraction | 23.09 | Tooth extraction, simple |
| Extraction (surgical) | 23.19 | Surgical extraction |
| Filling (Amalgam) | 23.2 | Restoration with amalgam |
| Filling (Composite) | 23.42 | Restoration with composite |
| Root Canal | 23.7 | Root canal therapy |
| Scaling | 96.54 | Dental scaling |
| Crown | 23.41 | Dental crown |
| Bridge | 23.42 | Fixed dental prosthesis |
| Denture | 23.5 | Removable prosthesis |

### Data Model

```yaml
dental_procedure:
  id: uuid
  encounter_id: uuid (FK)
  dental_chart_id: uuid (FK, nullable)

  # Procedure coding
  icd9cm_code: string
  procedure_name: string
  procedure_category: enum (preventive/restorative/endodontic/surgical/prosthodontic/orthodontic/periodontal)

  # Affected teeth
  tooth_numbers: array[string] # e.g., ["16", "17"]
  surfaces: array[string] # e.g., ["MOD", "OB"]
  quadrants: array[enum] # upper_right, upper_left, lower_left, lower_right

  # Procedure details
  anesthesia_type: enum (none/local/block/topical/sedation)
  anesthesia_amount: string (nullable)

  # Materials used
  materials: jsonb
  # Array of {material_id, name, quantity, lot_number}

  # Status
  status: enum (planned/in_progress/completed/cancelled)
  started_at: datetime
  completed_at: datetime (nullable)
  performed_by: uuid (FK)
  assisted_by: uuid (FK, nullable)

  # Complications
  complications: text (nullable)

  # Before/After
  before_photo_url: string (nullable)
  after_photo_url: string (nullable)

  # Billing
  is_billable: boolean (default: true)
  tariff_code: string (nullable)

  notes: text

  satusehat_procedure_id: string (nullable)

# FHIR Procedure mapping
fhir_procedure:
  resourceType: Procedure
  status: completed
  category:
    coding:
      - system: "http://snomed.info/sct"
        code: 34596002
        display: "Dental procedure"
  code:
    coding:
      - system: "http://hl7.org/fhir/sid/icd-9-cm"
        code: dental_procedure.icd9cm_code
        display: dental_procedure.procedure_name
  subject:
    reference: "Patient/{ihs_patient_id}"
  encounter:
    reference: "Encounter/{satusehat_encounter_id}"
  performedDateTime: dental_procedure.completed_at
  performer:
    - actor:
        reference: "Practitioner/{ihs_practitioner_id}"
  bodySite:
    - coding:
        - system: "http://snomed.info/sct"
          code: tooth_snomed_code
          display: tooth_description
  note:
    - text: dental_procedure.notes
```

---

## US-5.3: Dental Treatment Plan

### User Story
**As a** dentist
**I want to** create multi-visit treatment plans
**So that** complex treatments are properly scheduled and tracked

### Acceptance Criteria

- [ ] **GIVEN** patient needs multiple treatments
      **WHEN** dentist creates treatment plan
      **THEN** system schedules procedures across visits

- [ ] **GIVEN** treatment plan exists
      **WHEN** patient returns for next visit
      **THEN** system shows pending procedures

### Data Model

```yaml
dental_treatment_plan:
  id: uuid
  patient_id: uuid (FK)
  created_encounter_id: uuid (FK)
  created_by: uuid (FK to practitioner)

  # Plan info
  plan_name: string
  chief_complaint: text
  treatment_goals: text

  # Status
  status: enum (draft/active/completed/cancelled/on_hold)
  estimated_visits: integer
  estimated_cost: decimal
  actual_cost: decimal (calculated)

  # Approval
  patient_consent: boolean (default: false)
  consent_date: datetime (nullable)
  consent_notes: text (nullable)

  # Timestamps
  start_date: date
  expected_end_date: date (nullable)
  actual_end_date: date (nullable)

  created_at: datetime
  updated_at: datetime

dental_treatment_plan_item:
  id: uuid
  treatment_plan_id: uuid (FK)
  sequence: integer # order of treatment

  # Procedure
  procedure_code: string (ICD-9-CM)
  procedure_name: string
  tooth_numbers: array[string]
  surfaces: array[string]

  # Scheduling
  planned_visit_number: integer
  planned_date: date (nullable)
  appointment_id: uuid (FK, nullable)

  # Priority
  priority: enum (urgent/high/medium/low)
  is_prerequisite_for: array[uuid] # other item IDs

  # Costing
  estimated_cost: decimal

  # Status
  status: enum (pending/scheduled/in_progress/completed/cancelled/deferred)
  completed_procedure_id: uuid (FK, nullable)
  completed_at: datetime (nullable)

  notes: text
```

---

## US-5.4: Dental Materials Tracking

### User Story
**As a** dental clinic manager
**I want to** track dental material usage
**So that** inventory is managed and costs are accurate

### Acceptance Criteria

- [ ] **GIVEN** procedure uses materials
      **WHEN** dentist records material usage
      **THEN** system deducts from inventory

- [ ] **GIVEN** material stock is low
      **WHEN** threshold is reached
      **THEN** system generates reorder alert

### Data Model

```yaml
dental_material:
  id: uuid
  material_code: string (unique)
  name: string
  category: enum (restorative/endodontic/prosthodontic/surgical/preventive/impression/anesthetic/other)

  # Specifications
  brand: string
  manufacturer: string
  specifications: jsonb # size, shade, etc.

  # Inventory
  unit: string # e.g., "capsule", "tube", "box"
  unit_contents: integer (nullable) # items per unit

  # Stock management
  current_stock: decimal
  minimum_stock: decimal
  reorder_quantity: decimal

  # Pricing
  cost_per_unit: decimal
  is_chargeable: boolean (default: true)
  charge_amount: decimal (nullable)

  is_active: boolean (default: true)

dental_material_usage:
  id: uuid
  procedure_id: uuid (FK)
  material_id: uuid (FK)
  quantity: decimal
  lot_number: string (nullable)
  expiry_date: date (nullable)
  used_at: datetime
  used_by: uuid (FK)
  notes: text

dental_material_batch:
  id: uuid
  material_id: uuid (FK)
  batch_number: string
  lot_number: string
  quantity_received: decimal
  quantity_remaining: decimal
  expiry_date: date
  received_date: date
  supplier: string
  cost: decimal
```

---

## US-5.5: Dental Diagnosis Codes

### User Story
**As a** dentist
**I want to** use dental-specific diagnosis codes
**So that** conditions are accurately classified

### Dental-Specific ICD-10 Codes

| Code | Description |
|------|-------------|
| K00.0 | Anodontia |
| K00.1 | Supernumerary teeth |
| K01.0 | Embedded teeth |
| K01.1 | Impacted teeth |
| K02.0 | Caries limited to enamel |
| K02.1 | Caries of dentine |
| K02.2 | Caries of cementum |
| K02.3 | Arrested dental caries |
| K03.0 | Excessive attrition of teeth |
| K04.0 | Pulpitis |
| K04.1 | Necrosis of pulp |
| K04.4 | Acute apical periodontitis of pulpal origin |
| K04.5 | Chronic apical periodontitis |
| K04.6 | Periapical abscess with sinus |
| K04.7 | Periapical abscess without sinus |
| K05.0 | Acute gingivitis |
| K05.1 | Chronic gingivitis |
| K05.2 | Acute periodontitis |
| K05.3 | Chronic periodontitis |
| K06.0 | Gingival recession |
| K07.0 | Major anomalies of jaw size |
| K07.1 | Anomalies of jaw-cranial base relationship |
| K08.0 | Exfoliation of teeth due to systemic causes |
| K08.1 | Loss of teeth due to accident, extraction or local periodontal disease |

### Data Model

```yaml
dental_diagnosis:
  id: uuid
  encounter_id: uuid (FK)
  patient_id: uuid (FK)

  # Coding
  icd10_code: string
  diagnosis_name: string

  # Location
  tooth_numbers: array[string]
  region: enum (upper_right/upper_left/lower_left/lower_right/generalized, nullable)

  # Classification
  diagnosis_type: enum (primary/secondary)
  severity: enum (mild/moderate/severe, nullable)
  chronicity: enum (acute/chronic, nullable)

  # Notes
  clinical_findings: text
  notes: text

  # Satusehat
  satusehat_condition_id: string (nullable)

  recorded_by: uuid (FK)
  recorded_at: datetime
```

---

## Dependencies
- Medical Services General (base encounter)
- Patient Management (patient data)
- Practitioners & Polyclinics (dentist assignment)

## Blocks
- Billing (dental procedure charges)


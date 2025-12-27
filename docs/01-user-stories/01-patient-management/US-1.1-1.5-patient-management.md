# Patient Management

> **Module**: 01 - Patient Management
> **Stories**: US-1.1 to US-1.5
> **Priority**: P0 (Critical)
> **FHIR Resources**: Patient, RelatedPerson, AllergyIntolerance

---

## US-1.1: Patient Registration

### User Story
**As a** front desk staff
**I want to** register new patients and retrieve existing patient data
**So that** patients have complete records before receiving services

### Acceptance Criteria

#### New Patient Registration
- [ ] **GIVEN** new patient arrives
      **WHEN** staff enters NIK
      **THEN** system checks Satusehat for existing IHS ID
      **AND** pre-fills data if found in Satusehat

- [ ] **GIVEN** patient data is entered
      **WHEN** staff saves registration
      **THEN** system generates unique MRN (Medical Record Number)
      **AND** syncs Patient resource to Satusehat

#### Returning Patient
- [ ] **GIVEN** returning patient arrives
      **WHEN** staff searches by NIK, MRN, name, or BPJS number
      **THEN** system displays matching patients with photo
      **AND** shows last visit date and active conditions

### Validation Rules
- NIK: 16 digits, unique, validated against Dukcapil format
- Phone: Indonesian format (+62 or 08xx)
- BPJS number: 13 digits (if applicable)
- Photo: Captured or uploaded, max 2MB

### Data Model

```yaml
patient:
  id: uuid (primary key)
  mrn: string (format: MR-YYYYMMDD-XXXX, unique)
  nik: string (16 digits, unique)
  satusehat_ihs_id: string (from Satusehat, nullable)
  bpjs_number: string (13 digits, nullable)

  # Demographics
  full_name: string (max 100, required)
  birth_date: date (required)
  birth_place: string
  gender: enum (male/female)
  blood_type: enum (A/B/AB/O, nullable)
  rhesus: enum (positive/negative, nullable)
  religion: enum (islam/kristen/katolik/hindu/buddha/konghucu/other)
  marital_status: enum (single/married/divorced/widowed)
  education: enum (sd/smp/sma/d3/s1/s2/s3/other)
  occupation: string

  # Contact
  phone: string (required)
  phone_alt: string
  email: string

  # Address
  address: text (required)
  rt: string
  rw: string
  kelurahan: string
  kecamatan: string
  city: string
  province: string
  postal_code: string

  # Emergency contact
  emergency_contact_name: string
  emergency_contact_phone: string
  emergency_contact_relation: string

  # Photo
  photo_url: string

  # Metadata
  registration_date: datetime
  registered_by: uuid (FK to user)
  is_active: boolean (default: true)
  created_at: datetime
  updated_at: datetime

# FHIR Patient resource mapping
fhir_patient:
  resourceType: Patient
  identifier:
    - system: "urn:oid:2.16.840.1.113883.3.1000.66.1" # NIK
      value: patient.nik
    - system: "http://sys-ids.kemkes.go.id/mrn/{org_id}"
      value: patient.mrn
  name:
    - use: official
      text: patient.full_name
  telecom:
    - system: phone
      value: patient.phone
      use: mobile
  gender: patient.gender (male/female)
  birthDate: patient.birth_date
  address:
    - use: home
      line: [patient.address]
      city: patient.city
      postalCode: patient.postal_code
      country: "ID"
      extension:
        - url: "province"
          valueCode: patient.province
```

---

## US-1.2: Patient Search

### User Story
**As a** clinical staff
**I want to** quickly search for patients
**So that** I can access patient records efficiently

### Acceptance Criteria

- [ ] **GIVEN** staff enters search term
      **WHEN** searching with partial name (min 3 chars)
      **THEN** system shows matching patients with relevance ranking

- [ ] **GIVEN** exact NIK is entered
      **WHEN** searching
      **THEN** system returns exact match immediately

- [ ] **GIVEN** BPJS number is entered
      **WHEN** searching
      **THEN** system matches and shows BPJS status

### Search Fields
- NIK (exact match)
- BPJS number (exact match)
- MRN (exact match)
- Full name (partial, case-insensitive)
- Phone number (partial)
- Birth date (exact)

### Data Model

```yaml
search_result:
  patient_id: uuid
  mrn: string
  full_name: string
  nik: string (masked: ****-****-****-XXXX for non-exact)
  birth_date: date
  gender: enum
  photo_url: string
  phone: string (masked)
  last_visit_date: date
  active_conditions: array[string] # chronic conditions
  bpjs_status: enum (active/inactive/null)
```

---

## US-1.3: Medical Record (Rekam Medis)

### User Story
**As a** medical staff
**I want to** access complete patient medical records
**So that** I have full clinical history for treatment decisions

### Acceptance Criteria

- [ ] **GIVEN** patient is selected
      **WHEN** opening medical record
      **THEN** system shows summary dashboard with key information

- [ ] **GIVEN** medical record is viewed
      **WHEN** reviewing history
      **THEN** system shows encounters grouped by date with expandable details

### Medical Record Dashboard

```yaml
medical_record_summary:
  patient_info:
    mrn: string
    name: string
    age: integer (calculated)
    gender: string
    blood_type: string
    photo_url: string

  alerts:
    allergies: array[allergy_summary]
    chronic_conditions: array[condition_summary]
    current_medications: array[medication_summary]

  recent_visits:
    - encounter_id: uuid
      date: datetime
      polyclinic: string
      practitioner: string
      diagnoses: array[string]

  vital_signs_trend:
    - date: date
      bp_systolic: integer
      bp_diastolic: integer
      heart_rate: integer
      temperature: decimal
      weight: decimal
```

---

## US-1.4: Allergies and Chronic Conditions

### User Story
**As a** doctor
**I want to** view and manage patient allergies and chronic conditions
**So that** I can make safe treatment decisions

### Acceptance Criteria

#### Allergies
- [ ] **GIVEN** patient has known allergy
      **WHEN** doctor views patient record
      **THEN** allergy is prominently displayed with severity

- [ ] **GIVEN** new allergy is discovered
      **WHEN** doctor records allergy
      **THEN** system saves with reaction details
      **AND** syncs AllergyIntolerance to Satusehat

- [ ] **GIVEN** patient has drug allergy
      **WHEN** prescribing conflicting medication
      **THEN** system shows blocking alert

#### Chronic Conditions
- [ ] **GIVEN** patient has chronic condition
      **WHEN** viewing record
      **THEN** condition is listed with status and duration

### Data Model

```yaml
allergy:
  id: uuid
  patient_id: uuid (FK)
  allergen_type: enum (drug/food/environment/other)
  allergen_name: string
  allergen_code: string (RxNorm for drugs, nullable)
  reaction: text
  severity: enum (mild/moderate/severe/life_threatening)
  certainty: enum (confirmed/suspected)
  onset_date: date
  recorded_date: date
  recorded_by: uuid (FK to practitioner)
  status: enum (active/inactive/resolved)
  notes: text
  satusehat_id: string (nullable)

chronic_condition:
  id: uuid
  patient_id: uuid (FK)
  condition_name: string
  icd10_code: string
  onset_date: date
  status: enum (active/remission/resolved)
  severity: enum (mild/moderate/severe)
  notes: text
  recorded_by: uuid (FK)
  recorded_date: date

# FHIR AllergyIntolerance mapping
fhir_allergy:
  resourceType: AllergyIntolerance
  clinicalStatus:
    coding:
      - code: allergy.status
  verificationStatus:
    coding:
      - code: confirmed/unconfirmed
  type: allergy (or intolerance)
  category: [drug/food/environment]
  criticality: high/low/unable-to-assess
  code:
    coding:
      - system: appropriate_system
        code: allergen_code
        display: allergen_name
  patient:
    reference: "Patient/{ihs_id}"
  reaction:
    - manifestation:
        - text: allergy.reaction
      severity: allergy.severity
```

---

## US-1.5: Family Member Linking

### User Story
**As a** front desk staff
**I want to** link family members
**So that** family history is accessible and billing can be consolidated

### Acceptance Criteria

- [ ] **GIVEN** patient has family in system
      **WHEN** staff links family member
      **THEN** bidirectional relationship is created

- [ ] **GIVEN** family members are linked
      **WHEN** viewing patient profile
      **THEN** family tree shows with health indicators

### Data Model

```yaml
family_relationship:
  id: uuid
  patient_id: uuid (FK)
  related_patient_id: uuid (FK)
  relationship: enum (spouse/father/mother/child/sibling)
  is_emergency_contact: boolean
  is_guarantor: boolean # for billing purposes
  created_at: datetime

# FHIR RelatedPerson mapping
fhir_related_person:
  resourceType: RelatedPerson
  patient:
    reference: "Patient/{ihs_id}"
  relationship:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode"
          code: relationship_code
  name:
    - text: related_patient.full_name
```

---

## Satusehat Sync Requirements

### Patient Sync Flow
1. On registration, search Satusehat by NIK
2. If found, use existing IHS ID and merge data
3. If not found, POST new Patient resource
4. Store returned IHS ID in `satusehat_ihs_id`
5. On update, PUT Patient resource to Satusehat

### Required for Sync
- Valid NIK (16 digits)
- Name, birth date, gender (minimum required)
- Clinic must have valid Organization ID in Satusehat

---

## Dependencies
- Satusehat credentials configured
- Master data: provinces, cities loaded

## Blocks
- All other modules require patient

Sources:
- [Satusehat Platform Documentation](https://satusehat.kemkes.go.id/platform/docs/)
- [FHIR Patient Resource](https://simplifier.net/id-fhir)

# FEATURE-1.1: Patient Registration & Search

> **Module**: Patient Management
> **Related User Stories**: US-1.1, US-1.2
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Complete patient registration and search functionality including NIK-based registration, Satusehat IHS ID lookup, MRN generation, and multi-field patient search capabilities.

### Business Value
Enables efficient patient onboarding with automatic national health ID lookup, ensures unique patient identification via MRN, and provides fast access to patient records through flexible search options.

### User Impact
Front desk staff can register new patients with auto-populated data from Satusehat, quickly find returning patients using multiple search criteria, and maintain accurate patient demographics.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-1.1 | Patient Registration | [View](../../01-user-stories/01-patient-management/US-1.1-1.5-patient-management.md#us-11-patient-registration) |
| US-1.2 | Patient Search | [View](../../01-user-stories/01-patient-management/US-1.1-1.5-patient-management.md#us-12-patient-search) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/patients` | Register new patient | Yes | Admin, Front Desk |
| GET | `/api/v1/patients` | Search patients | Yes | All Clinical |
| GET | `/api/v1/patients/{id}` | Get patient details | Yes | All Clinical |
| PUT | `/api/v1/patients/{id}` | Update patient | Yes | Admin, Front Desk |
| DELETE | `/api/v1/patients/{id}` | Soft delete patient | Yes | Admin |
| GET | `/api/v1/patients/lookup/nik/{nik}` | Lookup by NIK (Satusehat) | Yes | Front Desk |
| GET | `/api/v1/patients/lookup/bpjs/{number}` | Lookup BPJS status | Yes | Front Desk |
| POST | `/api/v1/patients/{id}/photo` | Upload patient photo | Yes | Front Desk |

---

## Detailed Endpoint Specifications

### POST /api/v1/patients

```yaml
method: POST
path: /api/v1/patients
description: Register a new patient in the system

authentication:
  required: true
  roles: [owner, admin, front_desk]

request:
  body:
    type: object
    required: [nik, full_name, birth_date, gender, phone, address]
    properties:
      nik:
        type: string
        pattern: "^[0-9]{16}$"
        description: Indonesian National ID (16 digits)
        example: "3201010101850001"
      satusehat_ihs_id:
        type: string
        description: Pre-fetched IHS ID from Satusehat lookup
      bpjs_number:
        type: string
        pattern: "^[0-9]{13}$"
        description: BPJS Kesehatan number
        example: "0001234567890"
      full_name:
        type: string
        max_length: 100
        description: Patient full name
        example: "John Doe"
      birth_date:
        type: date
        description: Date of birth
        example: "1985-01-01"
      birth_place:
        type: string
        example: "Jakarta"
      gender:
        type: enum
        values: [male, female]
      blood_type:
        type: enum
        values: [A, B, AB, O]
      rhesus:
        type: enum
        values: [positive, negative]
      religion:
        type: enum
        values: [islam, kristen, katolik, hindu, buddha, konghucu, other]
      marital_status:
        type: enum
        values: [single, married, divorced, widowed]
      education:
        type: enum
        values: [sd, smp, sma, d3, s1, s2, s3, other]
      occupation:
        type: string
      phone:
        type: string
        pattern: "^(\\+62|08)[0-9]{8,12}$"
        description: Indonesian phone format
        example: "081234567890"
      phone_alt:
        type: string
      email:
        type: string
        format: email
      address:
        type: string
        description: Full street address
      rt:
        type: string
      rw:
        type: string
      kelurahan:
        type: string
      kecamatan:
        type: string
      city:
        type: string
      province:
        type: string
      postal_code:
        type: string
      emergency_contact_name:
        type: string
      emergency_contact_phone:
        type: string
      emergency_contact_relation:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      mrn: string
      nik: string
      satusehat_ihs_id: string
      full_name: string
      birth_date: date
      gender: enum
      phone: string
      registration_date: datetime
      satusehat_sync_status: "synced" | "pending" | "failed"

  errors:
    - status: 400
      code: INVALID_NIK_FORMAT
      message: "NIK must be 16 digits"
    - status: 400
      code: INVALID_PHONE_FORMAT
      message: "Phone must be Indonesian format"
    - status: 409
      code: NIK_ALREADY_EXISTS
      message: "Patient with this NIK already registered"
    - status: 409
      code: BPJS_ALREADY_LINKED
      message: "BPJS number linked to another patient"
```

### GET /api/v1/patients

```yaml
method: GET
path: /api/v1/patients
description: Search patients with multiple criteria

authentication:
  required: true
  roles: [All clinical roles]

request:
  query_params:
    q:
      type: string
      min_length: 3
      description: General search (name, NIK, MRN, phone)
    nik:
      type: string
      description: Exact NIK match
    mrn:
      type: string
      description: Exact MRN match
    bpjs_number:
      type: string
      description: Exact BPJS number match
    name:
      type: string
      description: Partial name search (min 3 chars)
    phone:
      type: string
      description: Partial phone match
    birth_date:
      type: date
      description: Exact birth date match
    page:
      type: integer
      default: 1
    limit:
      type: integer
      default: 20
      max: 100

response:
  success:
    status: 200
    body:
      data:
        - id: uuid
          mrn: string
          full_name: string
          nik: string (masked for non-exact searches)
          birth_date: date
          gender: enum
          phone: string (masked)
          photo_url: string
          last_visit_date: date
          active_conditions: array[string]
          bpjs_status: "active" | "inactive" | null
      pagination:
        page: integer
        limit: integer
        total: integer
        total_pages: integer
```

### GET /api/v1/patients/lookup/nik/{nik}

```yaml
method: GET
path: /api/v1/patients/lookup/nik/{nik}
description: Lookup patient in Satusehat by NIK, returns IHS ID if found

authentication:
  required: true
  roles: [admin, front_desk]

request:
  params:
    nik:
      type: string
      pattern: "^[0-9]{16}$"

response:
  success:
    status: 200
    body:
      found_in_local: boolean
      found_in_satusehat: boolean
      local_patient:
        id: uuid
        mrn: string
        full_name: string
      satusehat_data:
        ihs_id: string
        name: string
        gender: string
        birth_date: date
      recommendation: "use_existing" | "create_new" | "link_satusehat"

  errors:
    - status: 400
      code: INVALID_NIK_FORMAT
      message: "NIK must be 16 digits"
    - status: 503
      code: SATUSEHAT_UNAVAILABLE
      message: "Unable to connect to Satusehat"
```

### GET /api/v1/patients/{id}

```yaml
method: GET
path: /api/v1/patients/{id}
description: Get complete patient details

authentication:
  required: true
  roles: [All clinical roles]

response:
  success:
    status: 200
    body:
      id: uuid
      mrn: string
      nik: string
      satusehat_ihs_id: string
      bpjs_number: string
      full_name: string
      birth_date: date
      birth_place: string
      gender: enum
      blood_type: enum
      rhesus: enum
      religion: enum
      marital_status: enum
      education: enum
      occupation: string
      phone: string
      phone_alt: string
      email: string
      address: string
      rt: string
      rw: string
      kelurahan: string
      kecamatan: string
      city: string
      province: string
      postal_code: string
      emergency_contact:
        name: string
        phone: string
        relation: string
      photo_url: string
      registration_date: datetime
      is_active: boolean

  errors:
    - status: 404
      code: PATIENT_NOT_FOUND
      message: "Patient not found"
```

### PUT /api/v1/patients/{id}

```yaml
method: PUT
path: /api/v1/patients/{id}
description: Update patient demographics

authentication:
  required: true
  roles: [owner, admin, front_desk]

request:
  body:
    type: object
    description: Any patient fields (except NIK, MRN)
    properties:
      full_name: string
      phone: string
      address: string
      # ... other demographic fields

response:
  success:
    status: 200
    body:
      id: uuid
      mrn: string
      updated_fields: array[string]
      satusehat_sync_status: "synced" | "pending" | "failed"

  errors:
    - status: 400
      code: CANNOT_CHANGE_NIK
      message: "NIK cannot be modified"
    - status: 404
      code: PATIENT_NOT_FOUND
      message: "Patient not found"
```

### POST /api/v1/patients/{id}/photo

```yaml
method: POST
path: /api/v1/patients/{id}/photo
description: Upload or update patient photo

authentication:
  required: true
  roles: [admin, front_desk]

request:
  content_type: multipart/form-data
  body:
    photo:
      type: file
      formats: [jpg, jpeg, png]
      max_size: 2MB

response:
  success:
    status: 200
    body:
      photo_url: string
      uploaded_at: datetime

  errors:
    - status: 400
      code: INVALID_FILE_FORMAT
      message: "Photo must be JPG or PNG"
    - status: 400
      code: FILE_TOO_LARGE
      message: "Photo must be under 2MB"
```

---

## Data Models

### Patient

```yaml
table_name: patients

fields:
  id:
    type: uuid
    primary_key: true
  mrn:
    type: string
    format: "MR-YYYYMMDD-XXXX"
    unique: true
    index: true
  nik:
    type: string(16)
    unique: true
    index: true
  satusehat_ihs_id:
    type: string
    nullable: true
    index: true
  bpjs_number:
    type: string(13)
    nullable: true
    unique: true
    index: true
  full_name:
    type: string(100)
  birth_date:
    type: date
  birth_place:
    type: string
    nullable: true
  gender:
    type: enum
    values: [male, female]
  blood_type:
    type: enum
    values: [A, B, AB, O]
    nullable: true
  rhesus:
    type: enum
    values: [positive, negative]
    nullable: true
  religion:
    type: enum
    values: [islam, kristen, katolik, hindu, buddha, konghucu, other]
    nullable: true
  marital_status:
    type: enum
    values: [single, married, divorced, widowed]
    nullable: true
  education:
    type: enum
    values: [sd, smp, sma, d3, s1, s2, s3, other]
    nullable: true
  occupation:
    type: string
    nullable: true
  phone:
    type: string
  phone_alt:
    type: string
    nullable: true
  email:
    type: string
    nullable: true
  address:
    type: text
  rt:
    type: string
    nullable: true
  rw:
    type: string
    nullable: true
  kelurahan:
    type: string
    nullable: true
  kecamatan:
    type: string
    nullable: true
  city:
    type: string
    nullable: true
  province:
    type: string
    nullable: true
  postal_code:
    type: string
    nullable: true
  emergency_contact_name:
    type: string
    nullable: true
  emergency_contact_phone:
    type: string
    nullable: true
  emergency_contact_relation:
    type: string
    nullable: true
  photo_url:
    type: string
    nullable: true
  branch_id:
    type: uuid
    foreign_key: branches.id
  registration_date:
    type: datetime
  registered_by:
    type: uuid
    foreign_key: users.id
  is_active:
    type: boolean
    default: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_patient_name_search
    fields: [full_name]
    type: gin_trgm
  - name: idx_patient_phone
    fields: [phone]
  - name: idx_patient_branch
    fields: [branch_id]
```

---

## FHIR Resource Mapping

### Patient Resource

```yaml
fhir_patient:
  resourceType: Patient
  identifier:
    - system: "https://fhir.kemkes.go.id/id/nik"
      value: patient.nik
    - system: "http://sys-ids.kemkes.go.id/mrn/{org_id}"
      value: patient.mrn
    - system: "https://fhir.kemkes.go.id/id/bpjs"
      value: patient.bpjs_number
  name:
    - use: official
      text: patient.full_name
  telecom:
    - system: phone
      value: patient.phone
      use: mobile
    - system: email
      value: patient.email
      use: home
  gender: patient.gender
  birthDate: patient.birth_date
  address:
    - use: home
      line: [patient.address]
      city: patient.city
      postalCode: patient.postal_code
      country: "ID"
      extension:
        - url: "https://fhir.kemkes.go.id/StructureDefinition/administrativeCode"
          extension:
            - url: province
              valueCode: patient.province
            - url: city
              valueCode: patient.city
            - url: district
              valueCode: patient.kecamatan
            - url: village
              valueCode: patient.kelurahan
            - url: rt
              valueCode: patient.rt
            - url: rw
              valueCode: patient.rw
```

---

## Business Rules

### MRN Generation
- Format: `MR-YYYYMMDD-XXXX`
- YYYY: Registration year
- MM: Registration month
- DD: Registration day
- XXXX: Sequential counter per day (0001-9999)

### NIK Validation
- Exactly 16 digits
- First 6 digits: Region code
- Digits 7-12: Birth date (DD/MM/YY, +40 to DD for females)
- Last 4 digits: Sequential number

### Satusehat Sync Flow
1. On registration, lookup NIK in Satusehat
2. If IHS ID found, store and use for references
3. If not found, POST new Patient resource
4. Store returned IHS ID
5. On demographics update, PUT Patient resource

### Data Privacy
- NIK masked in search results (show last 4 digits only)
- Phone masked in search results (show last 4 digits)
- Full data visible only when accessing specific patient
- Audit all patient data access

---

## Dependencies

- FEATURE-0.1: Organization Setup (branch context)
- FEATURE-0.2: Authentication (user context)
- Satusehat Integration configured

## Enables

- All clinical encounters
- Appointment booking
- Billing and payments
- Laboratory orders
- Pharmacy dispensing

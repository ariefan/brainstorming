# FEATURE-2.2: Practitioner Management

> **Module**: Practitioners & Polyclinics
> **Related User Stories**: US-2.2, US-2.3, US-2.4, US-2.5
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive practitioner lifecycle management including registration with credential validation (SIP/STR), Satusehat IHS ID verification, polyclinic assignment (PractitionerRole), schedule management, and user account linking.

### Business Value
Ensures only credentialed practitioners can provide clinical services, enables proper attribution of clinical activities for compliance, and supports efficient scheduling across multiple polyclinics.

### User Impact
Administrators can manage practitioner credentials with expiry tracking, assign practitioners to polyclinics with role definitions, and link practitioners to system user accounts for authentication.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-2.2 | Practitioner Management | [View](../../01-user-stories/02-practitioners-polyclinics/US-2.1-2.5-practitioners-polyclinics.md#us-22-practitioner-management) |
| US-2.3 | Practitioner-Polyclinic Assignment | [View](../../01-user-stories/02-practitioners-polyclinics/US-2.1-2.5-practitioners-polyclinics.md#us-23-practitioner-polyclinic-assignment) |
| US-2.4 | Practitioner Schedule | [View](../../01-user-stories/02-practitioners-polyclinics/US-2.1-2.5-practitioners-polyclinics.md#us-24-practitioner-schedule) |
| US-2.5 | Practitioner-User Account Linking | [View](../../01-user-stories/02-practitioners-polyclinics/US-2.1-2.5-practitioners-polyclinics.md#us-25-practitioner-user-account-linking) |

---

## API Endpoints Overview

### Practitioner Management
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/practitioners` | Create practitioner | Yes | Owner, Admin |
| GET | `/api/v1/practitioners` | List practitioners | Yes | All |
| GET | `/api/v1/practitioners/{id}` | Get practitioner details | Yes | All |
| PUT | `/api/v1/practitioners/{id}` | Update practitioner | Yes | Owner, Admin |
| DELETE | `/api/v1/practitioners/{id}` | Deactivate practitioner | Yes | Owner, Admin |
| POST | `/api/v1/practitioners/lookup-ihs/{nik}` | Lookup IHS ID by NIK | Yes | Admin |

### Polyclinic Assignments
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/practitioners/{id}/assignments` | Assign to polyclinic | Yes | Owner, Admin |
| GET | `/api/v1/practitioners/{id}/assignments` | List assignments | Yes | All |
| PUT | `/api/v1/practitioner-assignments/{id}` | Update assignment | Yes | Owner, Admin |
| DELETE | `/api/v1/practitioner-assignments/{id}` | Remove assignment | Yes | Owner, Admin |

### Schedule Management
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/practitioners/{id}/schedules` | Create schedule | Yes | Owner, Admin |
| GET | `/api/v1/practitioners/{id}/schedules` | List schedules | Yes | All |
| PUT | `/api/v1/practitioner-schedules/{id}` | Update schedule | Yes | Owner, Admin |
| DELETE | `/api/v1/practitioner-schedules/{id}` | Remove schedule | Yes | Owner, Admin |
| POST | `/api/v1/practitioners/{id}/schedule-exceptions` | Add exception | Yes | Owner, Admin |
| GET | `/api/v1/practitioners/{id}/availability` | Get available slots | Yes | All |

### User Account Linking
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/practitioners/{id}/link-user` | Link to user account | Yes | Owner, Admin |
| DELETE | `/api/v1/practitioners/{id}/unlink-user` | Unlink user account | Yes | Owner, Admin |
| GET | `/api/v1/practitioners/unlinked` | List practitioners without users | Yes | Admin |
| POST | `/api/v1/practitioners/{id}/create-user` | Create user for practitioner | Yes | Owner, Admin |

---

## Detailed Endpoint Specifications

### POST /api/v1/practitioners

```yaml
method: POST
path: /api/v1/practitioners
description: Register a new practitioner

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [nik, full_name, gender, birth_date, practitioner_type, str_number, sip_number]
    properties:
      nik:
        type: string
        pattern: "^[0-9]{16}$"
        description: Indonesian National ID
      full_name:
        type: string
        max_length: 100
      gender:
        type: enum
        values: [male, female]
      birth_date:
        type: date
      photo_url:
        type: string
      phone:
        type: string
      email:
        type: string
        format: email
      practitioner_type:
        type: enum
        values: [doctor, dentist, midwife, nurse, pharmacist, lab_tech]
      specialty:
        type: string
        nullable: true
        description: For specialist doctors
        example: "Cardiology"
      str_number:
        type: string
        description: Surat Tanda Registrasi number
      str_expiry_date:
        type: date
      sip_number:
        type: string
        description: Surat Izin Praktik number
      sip_expiry_date:
        type: date
      sip_issuing_authority:
        type: string
        example: "Dinas Kesehatan Kota Jakarta Selatan"
      employee_id:
        type: string
      join_date:
        type: date
      employment_status:
        type: enum
        values: [full_time, part_time, contract]
        default: full_time

response:
  success:
    status: 201
    body:
      id: uuid
      nik: string
      satusehat_ihs_id: string (null if not found)
      full_name: string
      practitioner_type: enum
      str_number: string
      str_expiry_date: date
      sip_number: string
      sip_expiry_date: date
      credential_status: "valid" | "expiring_soon" | "expired"
      is_active: boolean

  errors:
    - status: 400
      code: INVALID_NIK_FORMAT
      message: "NIK must be 16 digits"
    - status: 400
      code: STR_EXPIRED
      message: "STR has expired. Please renew before registration"
    - status: 400
      code: SIP_EXPIRED
      message: "SIP has expired. Please renew before registration"
    - status: 409
      code: NIK_ALREADY_EXISTS
      message: "Practitioner with this NIK already registered"
    - status: 409
      code: STR_ALREADY_REGISTERED
      message: "STR number already registered to another practitioner"
```

### POST /api/v1/practitioners/lookup-ihs/{nik}

```yaml
method: POST
path: /api/v1/practitioners/lookup-ihs/{nik}
description: Lookup practitioner's IHS ID from Satusehat Master Nakes Index

authentication:
  required: true
  roles: [owner, admin]

request:
  params:
    nik:
      type: string
      pattern: "^[0-9]{16}$"

response:
  success:
    status: 200
    body:
      found: boolean
      ihs_practitioner_id: string (null if not found)
      practitioner_data:
        name: string
        gender: string
        birth_date: date
        qualification: array
      message: string

  errors:
    - status: 404
      code: NOT_IN_MASTER_INDEX
      message: "Practitioner not found in Satusehat Master Nakes Index. Ensure STR is valid and registered."
    - status: 503
      code: SATUSEHAT_UNAVAILABLE
      message: "Unable to connect to Satusehat"
```

### POST /api/v1/practitioners/{id}/assignments

```yaml
method: POST
path: /api/v1/practitioners/{id}/assignments
description: Assign practitioner to a polyclinic

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [polyclinic_id]
    properties:
      polyclinic_id:
        type: uuid
      role:
        type: enum
        values: [primary, secondary, on_call]
        default: primary
      start_date:
        type: date
        default: today
      end_date:
        type: date
        nullable: true

response:
  success:
    status: 201
    body:
      id: uuid
      practitioner_id: uuid
      polyclinic:
        id: uuid
        name: string
        type: enum
      role: enum
      start_date: date
      is_active: boolean
      satusehat_practitioner_role_id: string

  errors:
    - status: 400
      code: TYPE_MISMATCH
      message: "Practitioner type cannot be assigned to this polyclinic type"
    - status: 409
      code: ALREADY_ASSIGNED
      message: "Practitioner already assigned to this polyclinic"
    - status: 403
      code: CREDENTIAL_EXPIRED
      message: "Cannot assign practitioner with expired credentials"
```

### POST /api/v1/practitioners/{id}/schedules

```yaml
method: POST
path: /api/v1/practitioners/{id}/schedules
description: Create recurring schedule for practitioner at a polyclinic

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [polyclinic_id, day_of_week, start_time, end_time]
    properties:
      polyclinic_id:
        type: uuid
      day_of_week:
        type: enum
        values: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
      start_time:
        type: time
        example: "08:00"
      end_time:
        type: time
        example: "12:00"
      slot_duration_minutes:
        type: integer
        default: 15
        min: 5
        max: 120
      max_patients:
        type: integer
        nullable: true
        description: Max patients per session
      effective_from:
        type: date
        default: today
      effective_until:
        type: date
        nullable: true

response:
  success:
    status: 201
    body:
      id: uuid
      practitioner_id: uuid
      polyclinic:
        id: uuid
        name: string
      day_of_week: enum
      start_time: time
      end_time: time
      slot_duration_minutes: integer
      slots_per_session: integer
      max_patients: integer
      effective_from: date
      is_active: boolean

  errors:
    - status: 400
      code: INVALID_TIME_RANGE
      message: "End time must be after start time"
    - status: 400
      code: OUTSIDE_POLYCLINIC_HOURS
      message: "Schedule must be within polyclinic operating hours"
    - status: 409
      code: SCHEDULE_OVERLAP
      message: "Schedule overlaps with existing schedule"
```

### POST /api/v1/practitioners/{id}/schedule-exceptions

```yaml
method: POST
path: /api/v1/practitioners/{id}/schedule-exceptions
description: Add schedule exception (leave, holiday, etc.)

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [exception_date, exception_type]
    properties:
      polyclinic_id:
        type: uuid
        nullable: true
        description: Specific polyclinic or all if null
      exception_date:
        type: date
      exception_type:
        type: enum
        values: [leave, holiday, training, sick]
      reason:
        type: string
      is_full_day:
        type: boolean
        default: true
      start_time:
        type: time
        description: Required if not full day
      end_time:
        type: time
        description: Required if not full day

response:
  success:
    status: 201
    body:
      id: uuid
      practitioner_id: uuid
      exception_date: date
      exception_type: enum
      affected_appointments: integer
      appointments_to_reschedule:
        - appointment_id: uuid
          patient_name: string
          original_time: datetime
```

### GET /api/v1/practitioners/{id}/availability

```yaml
method: GET
path: /api/v1/practitioners/{id}/availability
description: Get available appointment slots for practitioner

authentication:
  required: true
  roles: [All]

request:
  query_params:
    polyclinic_id:
      type: uuid
      required: true
    date_from:
      type: date
      default: today
    date_to:
      type: date
      default: today + 7 days
    include_booked:
      type: boolean
      default: false

response:
  success:
    status: 200
    body:
      practitioner_id: uuid
      practitioner_name: string
      polyclinic:
        id: uuid
        name: string
      date_range:
        from: date
        to: date
      availability:
        - date: date
          day_of_week: string
          slots:
            - slot_id: uuid
              start_time: time
              end_time: time
              status: "available" | "booked" | "blocked"
              appointment_id: uuid (if booked)
```

### POST /api/v1/practitioners/{id}/link-user

```yaml
method: POST
path: /api/v1/practitioners/{id}/link-user
description: Link practitioner to an existing user account

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [user_id]
    properties:
      user_id:
        type: uuid
        description: User account to link

response:
  success:
    status: 200
    body:
      practitioner_id: uuid
      user_id: uuid
      linked_at: datetime
      message: "Practitioner successfully linked to user account"

  errors:
    - status: 400
      code: USER_ALREADY_LINKED
      message: "User is already linked to another practitioner"
    - status: 400
      code: PRACTITIONER_ALREADY_LINKED
      message: "Practitioner is already linked to a user account"
    - status: 400
      code: ROLE_MISMATCH
      message: "User role does not match practitioner type"
```

### POST /api/v1/practitioners/{id}/create-user

```yaml
method: POST
path: /api/v1/practitioners/{id}/create-user
description: Create a user account for practitioner and send invitation

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [branch_ids]
    properties:
      branch_ids:
        type: array[uuid]
        description: Branches to grant access
      role:
        type: enum
        values: [doctor, dentist, nurse, midwife, pharmacist, lab_tech]
        description: Defaults to match practitioner_type

response:
  success:
    status: 201
    body:
      user_id: uuid
      practitioner_id: uuid
      invitation_sent_to: string (email)
      invitation_expires_at: datetime
      message: "User account created and invitation sent"

  errors:
    - status: 400
      code: PRACTITIONER_HAS_USER
      message: "Practitioner already has a user account"
    - status: 400
      code: EMAIL_REQUIRED
      message: "Practitioner must have email to create user account"
```

---

## Data Models

### Practitioner

```yaml
table_name: practitioners

fields:
  id:
    type: uuid
    primary_key: true
  nik:
    type: string(16)
    unique: true
    index: true
  satusehat_ihs_id:
    type: string
    nullable: true
    index: true
  full_name:
    type: string(100)
  gender:
    type: enum
    values: [male, female]
  birth_date:
    type: date
  photo_url:
    type: string
    nullable: true
  phone:
    type: string
    nullable: true
  email:
    type: string
    nullable: true
  practitioner_type:
    type: enum
    values: [doctor, dentist, midwife, nurse, pharmacist, lab_tech]
    index: true
  specialty:
    type: string
    nullable: true
  str_number:
    type: string
    unique: true
  str_expiry_date:
    type: date
  sip_number:
    type: string
    unique: true
  sip_expiry_date:
    type: date
  sip_issuing_authority:
    type: string
    nullable: true
  employee_id:
    type: string
    nullable: true
  join_date:
    type: date
    nullable: true
  employment_status:
    type: enum
    values: [full_time, part_time, contract]
    default: full_time
  user_id:
    type: uuid
    foreign_key: users.id
    nullable: true
    unique: true
  is_active:
    type: boolean
    default: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_practitioner_type_active
    fields: [practitioner_type, is_active]
  - name: idx_practitioner_credential_expiry
    fields: [str_expiry_date, sip_expiry_date]
```

### Practitioner Polyclinic Assignment

```yaml
table_name: practitioner_polyclinics

fields:
  id:
    type: uuid
    primary_key: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
    index: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    index: true
  role:
    type: enum
    values: [primary, secondary, on_call]
    default: primary
  start_date:
    type: date
  end_date:
    type: date
    nullable: true
  satusehat_practitioner_role_id:
    type: string
    nullable: true
  is_active:
    type: boolean
    default: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

constraints:
  - type: unique
    fields: [practitioner_id, polyclinic_id, is_active]
    where: is_active = true
```

### Practitioner Schedule

```yaml
table_name: practitioner_schedules

fields:
  id:
    type: uuid
    primary_key: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
    index: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    index: true
  day_of_week:
    type: enum
    values: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
  start_time:
    type: time
  end_time:
    type: time
  slot_duration_minutes:
    type: integer
    default: 15
  max_patients:
    type: integer
    nullable: true
  effective_from:
    type: date
  effective_until:
    type: date
    nullable: true
  is_active:
    type: boolean
    default: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_schedule_lookup
    fields: [practitioner_id, polyclinic_id, day_of_week, is_active]
```

### Schedule Exception

```yaml
table_name: schedule_exceptions

fields:
  id:
    type: uuid
    primary_key: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
    index: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    nullable: true
  exception_date:
    type: date
    index: true
  exception_type:
    type: enum
    values: [leave, holiday, training, sick]
  reason:
    type: string
    nullable: true
  is_full_day:
    type: boolean
    default: true
  start_time:
    type: time
    nullable: true
  end_time:
    type: time
    nullable: true
  created_by:
    type: uuid
    foreign_key: users.id
  created_at:
    type: datetime

indexes:
  - name: idx_exception_date_range
    fields: [practitioner_id, exception_date]
```

### Appointment Slot (Generated)

```yaml
table_name: appointment_slots

fields:
  id:
    type: uuid
    primary_key: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
    index: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    index: true
  slot_date:
    type: date
    index: true
  start_time:
    type: time
  end_time:
    type: time
  status:
    type: enum
    values: [available, booked, blocked]
    default: available
  appointment_id:
    type: uuid
    foreign_key: appointments.id
    nullable: true
  created_at:
    type: datetime

indexes:
  - name: idx_slot_availability
    fields: [practitioner_id, polyclinic_id, slot_date, status]
```

---

## FHIR Resource Mappings

### Practitioner Resource

```yaml
fhir_practitioner:
  resourceType: Practitioner
  identifier:
    - system: "https://fhir.kemkes.go.id/id/nik"
      value: practitioner.nik
    - system: "https://fhir.kemkes.go.id/id/str"
      value: practitioner.str_number
    - system: "https://fhir.kemkes.go.id/id/sip"
      value: practitioner.sip_number
  active: practitioner.is_active
  name:
    - use: official
      text: practitioner.full_name
  telecom:
    - system: phone
      value: practitioner.phone
    - system: email
      value: practitioner.email
  gender: practitioner.gender
  birthDate: practitioner.birth_date
  qualification:
    - identifier:
        - value: practitioner.str_number
      code:
        coding:
          - system: "http://terminology.kemkes.go.id/CodeSystem/qualification-type"
            code: practitioner_type_to_code(practitioner.practitioner_type)
      period:
        start: str_issue_date
        end: practitioner.str_expiry_date
      issuer:
        display: "Konsil Kedokteran Indonesia"
```

### PractitionerRole Resource

```yaml
fhir_practitioner_role:
  resourceType: PractitionerRole
  identifier:
    - system: "http://sys-ids.kemkes.go.id/practitioner-role/{org_id}"
      value: assignment.id
  active: assignment.is_active
  period:
    start: assignment.start_date
    end: assignment.end_date
  practitioner:
    reference: "Practitioner/{satusehat_ihs_id}"
    display: practitioner.full_name
  organization:
    reference: "Organization/{org_satusehat_id}"
  location:
    - reference: "Location/{polyclinic.satusehat_location_id}"
      display: polyclinic.name
  code:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/practitioner-role"
          code: role_to_code(assignment.role)
          display: assignment.role
  specialty:
    - coding:
        - system: "http://snomed.info/sct"
          code: specialty_to_snomed(practitioner.specialty)
          display: practitioner.specialty
```

---

## Business Rules

### Credential Validation
- STR must not be expired at registration time
- SIP must not be expired at registration time
- System tracks credential expiry (see FEATURE-0.4)
- Practitioners with expired credentials cannot be assigned to polyclinics

### Practitioner-Polyclinic Type Matching
```yaml
type_assignment_rules:
  doctor: [general, specialist, emergency]
  dentist: [dental]
  midwife: [kia]
  nurse: [general, dental, kia, specialist, emergency]
  pharmacist: [pharmacy]
  lab_tech: [lab]
```

### Schedule Slot Generation
1. Generate slots based on schedule effective dates
2. Apply slot_duration_minutes to create time blocks
3. Mark slots as blocked for schedule exceptions
4. Regenerate affected slots when schedule changes

### User-Practitioner Linking Rules
1. One practitioner can only link to one user
2. One user can only link to one practitioner
3. User role must match practitioner type
4. Linking preserves audit trail

### IHS ID Lookup (Satusehat)
- Practitioners must exist in Satusehat Master Nakes Index
- Index is populated when STR is registered with Kemenkes
- System cannot create practitioners in Satusehat
- Must verify IHS ID before clinical documentation

---

## Dependencies

- FEATURE-0.1: Organization Setup
- FEATURE-0.2: Authentication (for user linking)
- FEATURE-2.1: Polyclinic Setup
- Satusehat Master Nakes Index access

## Enables

- Appointment & Queue Management
- All clinical encounters (Encounter.participant)
- Prescription signing
- Lab order signing
- Clinical audit trail

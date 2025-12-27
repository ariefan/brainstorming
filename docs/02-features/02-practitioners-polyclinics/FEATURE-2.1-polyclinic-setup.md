# FEATURE-2.1: Polyclinic Setup

> **Module**: Practitioners & Polyclinics
> **Related User Stories**: US-2.1
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Polyclinic configuration and management including creation, scheduling settings, queue configuration, and FHIR Location sync to Satusehat.

### Business Value
Enables organized clinical services by specialty, supports efficient queue management per polyclinic, and ensures regulatory compliance through Satusehat Location registration.

### User Impact
Administrators can configure multiple polyclinics with specific operating hours, queue settings, and service types. Patients are directed to appropriate polyclinics based on their needs.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-2.1 | Polyclinic Setup | [View](../../01-user-stories/02-practitioners-polyclinics/US-2.1-2.5-practitioners-polyclinics.md#us-21-polyclinic-setup) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/polyclinics` | Create polyclinic | Yes | Owner, Admin |
| GET | `/api/v1/polyclinics` | List polyclinics | Yes | All |
| GET | `/api/v1/polyclinics/{id}` | Get polyclinic details | Yes | All |
| PUT | `/api/v1/polyclinics/{id}` | Update polyclinic | Yes | Owner, Admin |
| DELETE | `/api/v1/polyclinics/{id}` | Deactivate polyclinic | Yes | Owner, Admin |
| PUT | `/api/v1/polyclinics/{id}/operating-hours` | Set operating hours | Yes | Owner, Admin |
| POST | `/api/v1/polyclinics/{id}/sync-satusehat` | Sync to Satusehat | Yes | Owner, Admin |

---

## Detailed Endpoint Specifications

### POST /api/v1/polyclinics

```yaml
method: POST
path: /api/v1/polyclinics
description: Create a new polyclinic

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [code, name, type, branch_id]
    properties:
      code:
        type: string
        pattern: "^[A-Z0-9-]{3,20}$"
        description: Unique polyclinic code
        example: "POLI-001"
      name:
        type: string
        max_length: 100
        description: Polyclinic display name
        example: "Poli Umum"
      type:
        type: enum
        values: [general, dental, kia, specialist, emergency, lab, pharmacy]
        description: Polyclinic type/specialty
      description:
        type: string
        nullable: true
      branch_id:
        type: uuid
        description: Branch this polyclinic belongs to
      floor:
        type: string
        example: "1st Floor"
      room_number:
        type: string
        example: "Room 101"
      queue_prefix:
        type: string
        max_length: 3
        description: Prefix for queue numbers
        example: "A"
      avg_service_time_minutes:
        type: integer
        default: 15
        description: Average consultation time
      max_queue_per_day:
        type: integer
        nullable: true
        description: Maximum patients per day (null = unlimited)
      display_device_id:
        type: string
        nullable: true
        description: Queue display device identifier

response:
  success:
    status: 201
    body:
      id: uuid
      code: string
      name: string
      type: enum
      branch:
        id: uuid
        name: string
      queue_prefix: string
      is_active: boolean
      satusehat_location_id: string (null if not synced)

  errors:
    - status: 400
      code: INVALID_CODE_FORMAT
      message: "Code must be alphanumeric with dashes, 3-20 characters"
    - status: 409
      code: CODE_ALREADY_EXISTS
      message: "Polyclinic code already exists in this branch"
    - status: 409
      code: QUEUE_PREFIX_IN_USE
      message: "Queue prefix already in use at this branch"
```

### GET /api/v1/polyclinics

```yaml
method: GET
path: /api/v1/polyclinics
description: List all polyclinics with optional filters

authentication:
  required: true
  roles: [All]

request:
  query_params:
    branch_id:
      type: uuid
      description: Filter by branch
    type:
      type: enum
      values: [general, dental, kia, specialist, emergency, lab, pharmacy]
    is_active:
      type: boolean
      default: true
    has_practitioner:
      type: boolean
      description: Filter polyclinics with assigned practitioners

response:
  success:
    status: 200
    body:
      data:
        - id: uuid
          code: string
          name: string
          type: enum
          branch:
            id: uuid
            name: string
          floor: string
          room_number: string
          queue_prefix: string
          avg_service_time_minutes: integer
          max_queue_per_day: integer
          practitioner_count: integer
          is_active: boolean
          satusehat_synced: boolean
          operating_hours: object
```

### PUT /api/v1/polyclinics/{id}/operating-hours

```yaml
method: PUT
path: /api/v1/polyclinics/{id}/operating-hours
description: Set polyclinic operating hours

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    properties:
      monday:
        type: object
        properties:
          is_open: boolean
          open: time
          close: time
          break_start: time
          break_end: time
      tuesday: { same as monday }
      wednesday: { same as monday }
      thursday: { same as monday }
      friday: { same as monday }
      saturday: { same as monday }
      sunday: { same as monday }

    example:
      monday:
        is_open: true
        open: "08:00"
        close: "16:00"
        break_start: "12:00"
        break_end: "13:00"
      saturday:
        is_open: true
        open: "08:00"
        close: "12:00"
      sunday:
        is_open: false

response:
  success:
    status: 200
    body:
      id: uuid
      name: string
      operating_hours: object
      updated_at: datetime
```

### POST /api/v1/polyclinics/{id}/sync-satusehat

```yaml
method: POST
path: /api/v1/polyclinics/{id}/sync-satusehat
description: Sync polyclinic as Location resource to Satusehat

authentication:
  required: true
  roles: [owner, admin]

response:
  success:
    status: 200
    body:
      polyclinic_id: uuid
      satusehat_location_id: string
      sync_status: "success"
      synced_at: datetime

  errors:
    - status: 400
      code: MISSING_ORGANIZATION_ID
      message: "Organization must be synced to Satusehat first"
    - status: 503
      code: SATUSEHAT_UNAVAILABLE
      message: "Unable to connect to Satusehat"
    - status: 422
      code: SATUSEHAT_VALIDATION_ERROR
      message: "Location validation failed in Satusehat"
```

---

## Data Models

### Polyclinic

```yaml
table_name: polyclinics

fields:
  id:
    type: uuid
    primary_key: true
  code:
    type: string(20)
    unique: true (scoped to branch)
    index: true
  name:
    type: string(100)
  type:
    type: enum
    values: [general, dental, kia, specialist, emergency, lab, pharmacy]
    index: true
  description:
    type: text
    nullable: true
  branch_id:
    type: uuid
    foreign_key: branches.id
    index: true
  floor:
    type: string
    nullable: true
  room_number:
    type: string
    nullable: true
  queue_prefix:
    type: string(3)
  avg_service_time_minutes:
    type: integer
    default: 15
  max_queue_per_day:
    type: integer
    nullable: true
  display_device_id:
    type: string
    nullable: true
  operating_hours:
    type: jsonb
    nullable: true
  satusehat_location_id:
    type: string
    nullable: true
    index: true
  is_active:
    type: boolean
    default: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_polyclinic_branch_code
    fields: [branch_id, code]
    unique: true
  - name: idx_polyclinic_branch_prefix
    fields: [branch_id, queue_prefix]
    unique: true
  - name: idx_polyclinic_active
    fields: [branch_id, is_active]
```

---

## FHIR Resource Mapping

### Location Resource

```yaml
fhir_location:
  resourceType: Location
  identifier:
    - system: "http://sys-ids.kemkes.go.id/location/{org_id}"
      value: polyclinic.code
  status: polyclinic.is_active ? "active" : "inactive"
  name: polyclinic.name
  description: polyclinic.description
  mode: instance
  type:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode"
          code: polyclinic_type_to_fhir_code(polyclinic.type)
          display: polyclinic.type
  physicalType:
    coding:
      - system: "http://terminology.hl7.org/CodeSystem/location-physical-type"
        code: "ro"
        display: "Room"
  position:
    longitude: branch.longitude
    latitude: branch.latitude
  managingOrganization:
    reference: "Organization/{org_satusehat_id}"
  partOf:
    reference: "Location/{branch_satusehat_location_id}"
  hoursOfOperation:
    - daysOfWeek: [map_days_from_operating_hours]
      openingTime: operating_hours.open
      closingTime: operating_hours.close
```

### Type Code Mapping

```yaml
polyclinic_type_to_fhir:
  general: "GACH"      # General acute care hospital
  dental: "DENT"       # Dental
  kia: "PC"            # Primary care clinic
  specialist: "CARD"   # Cardiac care (example, varies by specialty)
  emergency: "ER"      # Emergency room
  lab: "MBL"           # Medical laboratory
  pharmacy: "PHARM"    # Pharmacy
```

---

## Business Rules

### Polyclinic Code Format
- Must be alphanumeric with optional dashes
- 3-20 characters
- Unique within branch
- Cannot be changed after creation

### Queue Prefix Rules
- Single letter (A-Z) recommended
- Must be unique within branch
- Used to generate queue numbers: `{PREFIX}{SEQUENCE}` (e.g., A001)

### Operating Hours Validation
- Close time must be after open time
- Break must be within open hours
- At least one day must have is_open: true

### Satusehat Sync Prerequisites
1. Organization must have `satusehat_org_id`
2. Branch must have valid location data
3. Polyclinic must have valid type mapping

### Deactivation Rules
- Cannot deactivate if active appointments exist
- Cannot deactivate if practitioners currently assigned
- Soft delete preserves historical data

---

## Polyclinic Types Reference

| Type | Description | Typical Practitioners |
|------|-------------|----------------------|
| general | General Practice (Poli Umum) | Doctor, Nurse |
| dental | Dental Clinic (Poli Gigi) | Dentist, Dental Nurse |
| kia | Maternal & Child Health (KIA/Kebidanan) | Midwife, Nurse |
| specialist | Specialist Clinic | Specialist Doctor, Nurse |
| emergency | Emergency Unit (IGD) | Doctor, Nurse |
| lab | Laboratory | Lab Technician |
| pharmacy | Pharmacy | Pharmacist |

---

## Dependencies

- FEATURE-0.1: Organization Setup (branch must exist)
- Satusehat credentials configured (for Location sync)

## Enables

- FEATURE-2.2: Practitioner Management (practitioner assignment)
- Appointment scheduling
- Queue management
- All clinical encounters

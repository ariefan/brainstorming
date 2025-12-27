# Practitioners & Polyclinics

> **Module**: 02 - Practitioners & Polyclinics
> **Stories**: US-2.1 to US-2.5
> **Priority**: P0 (Critical)
> **FHIR Resources**: Practitioner, PractitionerRole, Organization, Location

---

## US-2.1: Polyclinic Setup

### User Story
**As a** clinic administrator
**I want to** configure polyclinics
**So that** services are organized by specialty

### Acceptance Criteria

- [ ] **GIVEN** admin accesses polyclinic management
      **WHEN** creating new polyclinic
      **THEN** system saves with code, name, and type

- [ ] **GIVEN** polyclinic is created
      **WHEN** syncing to Satusehat
      **THEN** Location resource is created/updated

### Polyclinic Types
- **Poli Umum** - General practice (doctors)
- **Poli Gigi** - Dental (dentists)
- **Poli KIA/Kebidanan** - Maternal & Child Health (midwives)
- **Poli Spesialis** - Specialist clinics
- **IGD** - Emergency
- **Laboratorium** - Laboratory
- **Farmasi** - Pharmacy

### Data Model

```yaml
polyclinic:
  id: uuid
  code: string (unique, e.g., "POLI-001")
  name: string (e.g., "Poli Umum")
  type: enum (general/dental/kia/specialist/emergency/lab/pharmacy)
  description: text
  floor: string
  room_number: string

  # Queue settings
  queue_prefix: string (e.g., "A" for Poli Umum)
  avg_service_time_minutes: integer (default: 15)
  max_queue_per_day: integer (nullable)

  # Display settings
  display_device_id: string (nullable, for queue display)

  # Satusehat
  satusehat_location_id: string (nullable)

  # Status
  is_active: boolean (default: true)
  operating_hours: jsonb
  # Example: {"monday": {"open": "08:00", "close": "16:00"}, ...}

  created_at: datetime
  updated_at: datetime

# FHIR Location mapping
fhir_location:
  resourceType: Location
  identifier:
    - system: "http://sys-ids.kemkes.go.id/location/{org_id}"
      value: polyclinic.code
  status: active
  name: polyclinic.name
  description: polyclinic.description
  mode: instance
  type:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode"
          code: location_type_code
          display: polyclinic.type
  physicalType:
    coding:
      - code: ro # room
  managingOrganization:
    reference: "Organization/{org_satusehat_id}"
```

---

## US-2.2: Practitioner Management

### User Story
**As a** clinic administrator
**I want to** manage practitioner profiles
**So that** clinical staff can provide services

### Acceptance Criteria

- [ ] **GIVEN** admin adds new practitioner
      **WHEN** entering credentials
      **THEN** system validates SIP/STR number format

- [ ] **GIVEN** practitioner is registered
      **WHEN** syncing to Satusehat
      **THEN** Practitioner resource is created
      **AND** IHS Practitioner ID is stored

### Practitioner Types
- **Doctor** (Dokter Umum, Dokter Spesialis)
- **Dentist** (Dokter Gigi)
- **Midwife** (Bidan)
- **Nurse** (Perawat)
- **Pharmacist** (Apoteker)
- **Lab Technician** (Analis Laboratorium)

### Data Model

```yaml
practitioner:
  id: uuid
  nik: string (16 digits, unique)
  satusehat_ihs_id: string (from Satusehat, nullable)

  # Personal info
  full_name: string (required)
  gender: enum (male/female)
  birth_date: date
  photo_url: string
  phone: string
  email: string

  # Professional info
  practitioner_type: enum (doctor/dentist/midwife/nurse/pharmacist/lab_tech)
  specialty: string (nullable, for specialists)

  # Credentials
  str_number: string (Surat Tanda Registrasi)
  str_expiry_date: date
  sip_number: string (Surat Izin Praktik)
  sip_expiry_date: date
  sip_issuing_authority: string

  # Employment
  employee_id: string
  join_date: date
  employment_status: enum (full_time/part_time/contract)

  # Status
  is_active: boolean (default: true)
  created_at: datetime
  updated_at: datetime

# FHIR Practitioner mapping
fhir_practitioner:
  resourceType: Practitioner
  identifier:
    - system: "https://fhir.kemkes.go.id/id/nik"
      value: practitioner.nik
    - system: "https://fhir.kemkes.go.id/id/str"
      value: practitioner.str_number
    - system: "https://fhir.kemkes.go.id/id/sip"
      value: practitioner.sip_number
  name:
    - use: official
      text: practitioner.full_name
  telecom:
    - system: phone
      value: practitioner.phone
  gender: practitioner.gender
  birthDate: practitioner.birth_date
  qualification:
    - identifier:
        - value: practitioner.str_number
      code:
        coding:
          - system: qualification_system
            code: practitioner.practitioner_type
      period:
        end: practitioner.str_expiry_date
```

---

## US-2.3: Practitioner-Polyclinic Assignment

### User Story
**As a** clinic administrator
**I want to** assign practitioners to polyclinics
**So that** practitioners can serve patients at specific polyclinics

### Acceptance Criteria

- [ ] **GIVEN** practitioner is registered
      **WHEN** assigning to polyclinic
      **THEN** PractitionerRole is created

- [ ] **GIVEN** practitioner is assigned
      **WHEN** scheduling appointments
      **THEN** only assigned polyclinics are available

### Data Model

```yaml
practitioner_polyclinic:
  id: uuid
  practitioner_id: uuid (FK)
  polyclinic_id: uuid (FK)
  role: enum (primary/secondary/on_call)
  is_active: boolean (default: true)
  start_date: date
  end_date: date (nullable)
  satusehat_practitioner_role_id: string (nullable)

  # Unique constraint: practitioner_id + polyclinic_id + is_active

# FHIR PractitionerRole mapping
fhir_practitioner_role:
  resourceType: PractitionerRole
  active: true
  practitioner:
    reference: "Practitioner/{ihs_practitioner_id}"
    display: practitioner.full_name
  organization:
    reference: "Organization/{org_satusehat_id}"
  location:
    - reference: "Location/{location_satusehat_id}"
  code:
    - coding:
        - system: "http://terminology.hl7.org/CodeSystem/practitioner-role"
          code: role_code
          display: role_display
```

---

## US-2.4: Practitioner Schedule

### User Story
**As a** clinic administrator
**I want to** manage practitioner schedules
**So that** patients can book appointments when practitioners are available

### Acceptance Criteria

- [ ] **GIVEN** practitioner is assigned to polyclinic
      **WHEN** admin sets weekly schedule
      **THEN** time slots are generated for booking

- [ ] **GIVEN** practitioner has leave
      **WHEN** admin blocks dates
      **THEN** affected appointments are flagged for rescheduling

### Data Model

```yaml
practitioner_schedule:
  id: uuid
  practitioner_id: uuid (FK)
  polyclinic_id: uuid (FK)
  day_of_week: enum (monday/tuesday/wednesday/thursday/friday/saturday/sunday)
  start_time: time
  end_time: time
  slot_duration_minutes: integer (default: 15)
  max_patients: integer (nullable, limit per session)
  is_active: boolean (default: true)
  effective_from: date
  effective_until: date (nullable)

schedule_exception:
  id: uuid
  practitioner_id: uuid (FK)
  polyclinic_id: uuid (FK, nullable - all polyclinics if null)
  exception_date: date
  exception_type: enum (leave/holiday/training/sick)
  reason: string
  is_full_day: boolean (default: true)
  start_time: time (if not full day)
  end_time: time (if not full day)
  created_by: uuid (FK to user)
  created_at: datetime

# Generated slots for booking
appointment_slot:
  id: uuid
  practitioner_id: uuid (FK)
  polyclinic_id: uuid (FK)
  slot_date: date
  start_time: time
  end_time: time
  status: enum (available/booked/blocked)
  appointment_id: uuid (FK, nullable if available)
```

---

## Satusehat Sync Requirements

### Sync Order (Prerequisites)
1. **Organization** - Clinic profile (done once during setup)
2. **Location** - Each polyclinic
3. **Practitioner** - Each clinical staff
4. **PractitionerRole** - Practitioner-Location assignments

### Practitioner Sync Flow
1. Search Satusehat by NIK to get existing IHS ID
2. If found, verify and use IHS ID
3. If not found, clinic cannot create - practitioner must exist in Satusehat (Master Nakes Index)
4. Store IHS Practitioner ID for Encounter references

### Important Notes
> **SATUSEHAT Requirement**: `Encounter.participant.individual` must reference a Practitioner that exists in Satusehat's Master Nakes Index. Practitioners must be registered with valid STR to appear in the index.

---

## US-2.5: Practitioner-User Account Linking

### User Story
**As a** clinic administrator
**I want to** link practitioner profiles to user accounts
**So that** clinical activities are attributed to the correct practitioner

### Acceptance Criteria

- [ ] **GIVEN** user has clinical role (doctor/nurse/midwife/pharmacist/lab_tech)
      **WHEN** creating or editing user profile
      **THEN** system allows linking to existing practitioner profile

- [ ] **GIVEN** practitioner exists without user account
      **WHEN** admin invites practitioner as user
      **THEN** user account is linked to practitioner profile

- [ ] **GIVEN** user performs clinical activity
      **WHEN** recording in encounter
      **THEN** linked practitioner ID is used for FHIR resource attribution

### Linking Scenarios

**Scenario 1: Invite with Practitioner Creation**
1. Admin invites staff with clinical role + "Create practitioner profile" checked
2. Staff accepts invitation and completes registration
3. System prompts for practitioner credentials (SIP, STR)
4. System creates practitioner profile and links to user

**Scenario 2: Link Existing Practitioner**
1. Admin selects existing user without practitioner link
2. Admin searches practitioners not linked to any user
3. Admin selects practitioner to link
4. System updates `user.practitioner_id`

**Scenario 3: Create User for Existing Practitioner**
1. Admin views practitioner profile without user account
2. Admin clicks "Create User Account"
3. System sends invitation to practitioner's email
4. On acceptance, user is linked to practitioner

### Data Model Updates

```yaml
# Add to practitioner table
practitioner:
  # ... existing fields ...
  user_id: uuid (FK to user, nullable) # back-reference for lookup

# User table (from Module 00) already has:
user:
  # ... existing fields ...
  practitioner_id: uuid (FK to practitioner, nullable)

# View: practitioners_with_users
practitioners_with_users:
  practitioner_id: uuid
  practitioner_name: string
  practitioner_type: enum
  user_id: uuid (nullable)
  user_email: string (nullable)
  has_user_account: boolean
```

### Business Rules

1. **One-to-One Relationship**: Each practitioner can only be linked to one user account and vice versa
2. **Clinical Role Required**: Only users with clinical roles can be linked to practitioners
3. **Role Matching**: User role should match practitioner type (doctor → doctor role, etc.)
4. **Cascade Updates**: When user is deactivated, practitioner remains active but cannot login
5. **Satusehat Attribution**: FHIR resources use `practitioner.satusehat_ihs_id` for references

### API Endpoints

```
POST   /api/users/:id/link-practitioner      # Link user to practitioner
DELETE /api/users/:id/unlink-practitioner    # Unlink practitioner
GET    /api/practitioners/unlinked           # List practitioners without user accounts
POST   /api/practitioners/:id/create-user    # Create user for practitioner
```

---

## Dependencies
- Module 00: User & Access Management (for user-practitioner linking)
- Satusehat Organization configured

## Blocks
- Appointment & Queue (requires practitioners)
- Medical Services (requires practitioners)
- All encounter-based modules

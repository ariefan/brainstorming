# FEATURE-0.1: Organization & Branch Management

> **Module**: User & Access Management
> **Related User Stories**: US-0.1
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Multi-branch organization setup enabling clinic owners to register their organization and manage multiple clinic branches under a single tenant.

### Business Value
Allows healthcare organizations to operate multiple clinic branches with centralized management while maintaining branch-level data isolation and staff assignment.

### User Impact
Clinic owners can register their organization, add branches, configure branch settings, and sync organization data to Satusehat for national health data exchange.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-0.1 | Organization Setup | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-01-organization-setup) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/organizations` | Register new organization | No | - |
| GET | `/api/v1/organizations/current` | Get current organization | Yes | All |
| PUT | `/api/v1/organizations/current` | Update organization | Yes | Owner |
| GET | `/api/v1/branches` | List all branches | Yes | All |
| POST | `/api/v1/branches` | Create new branch | Yes | Owner, Admin |
| GET | `/api/v1/branches/{id}` | Get branch details | Yes | All |
| PUT | `/api/v1/branches/{id}` | Update branch | Yes | Owner, Admin |
| DELETE | `/api/v1/branches/{id}` | Deactivate branch | Yes | Owner |
| POST | `/api/v1/branches/{id}/sync-satusehat` | Sync branch to Satusehat | Yes | Owner, Admin |

---

## Detailed Endpoint Specifications

### POST /api/v1/organizations

```yaml
method: POST
path: /api/v1/organizations
description: Register a new organization (clinic/hospital)

authentication:
  required: false
  note: This is the initial registration endpoint

request:
  body:
    type: object
    required: [org_name, org_type, phone, email, owner]
    properties:
      org_name:
        type: string
        maxLength: 255
        description: Organization display name
        example: "Klinik Sehat Sentosa"
      org_name_legal:
        type: string
        maxLength: 255
        description: Legal entity name (for invoices/contracts)
        example: "PT Sehat Sentosa Medika"
      org_type:
        type: enum
        values: [clinic, hospital, puskesmas, lab, pharmacy]
        example: "clinic"
      npwp:
        type: string
        pattern: "^\\d{15,16}$"
        description: Tax ID number
        example: "1234567890123456"
      phone:
        type: string
        example: "+6221-12345678"
      email:
        type: string
        format: email
        example: "info@kliniksehat.id"
      owner:
        type: object
        required: [full_name, email, password]
        properties:
          full_name:
            type: string
            example: "Dr. John Doe"
          email:
            type: string
            format: email
            example: "owner@kliniksehat.id"
          password:
            type: string
            minLength: 8
            example: "SecurePassword123"
          phone:
            type: string
            example: "+628123456789"

response:
  success:
    status: 201
    body:
      organization:
        id: uuid
        org_code: string (auto-generated)
        org_name: string
        org_type: enum
        created_at: datetime
      owner:
        id: uuid
        email: string
        full_name: string
      verification_email_sent: boolean
    example: |
      {
        "organization": {
          "id": "org_123e4567-e89b-12d3-a456-426614174000",
          "org_code": "ORG-001",
          "org_name": "Klinik Sehat Sentosa",
          "org_type": "clinic",
          "created_at": "2025-12-26T10:00:00Z"
        },
        "owner": {
          "id": "usr_123e4567-e89b-12d3-a456-426614174001",
          "email": "owner@kliniksehat.id",
          "full_name": "Dr. John Doe"
        },
        "verification_email_sent": true
      }

  errors:
    - status: 400
      code: VALIDATION_ERROR
      message: "Invalid input data"
    - status: 409
      code: EMAIL_EXISTS
      message: "Owner email already registered"
    - status: 409
      code: ORG_NAME_EXISTS
      message: "Organization name already exists"
```

### POST /api/v1/branches

```yaml
method: POST
path: /api/v1/branches
description: Create a new branch for the organization

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [branch_name, address, city, province, phone]
    properties:
      branch_code:
        type: string
        description: Custom branch code (auto-generated if empty)
        example: "BRANCH-JAKARTA"
      branch_name:
        type: string
        example: "Cabang Jakarta Selatan"
      address:
        type: string
        example: "Jl. Sudirman No. 123"
      rt_rw:
        type: string
        example: "001/002"
      kelurahan:
        type: string
        example: "Senayan"
      kecamatan:
        type: string
        example: "Kebayoran Baru"
      city:
        type: string
        example: "Jakarta Selatan"
      province:
        type: string
        example: "DKI Jakarta"
      postal_code:
        type: string
        example: "12190"
      phone:
        type: string
        example: "+6221-7654321"
      email:
        type: string
        format: email
        example: "jaksel@kliniksehat.id"
      operating_hours:
        type: object
        description: Operating hours per day
        example:
          monday: { open: "08:00", close: "17:00" }
          tuesday: { open: "08:00", close: "17:00" }
          saturday: { open: "08:00", close: "12:00" }
          sunday: null
      is_main_branch:
        type: boolean
        default: false

response:
  success:
    status: 201
    body:
      id: uuid
      branch_code: string
      branch_name: string
      is_main_branch: boolean
      created_at: datetime

  errors:
    - status: 400
      code: VALIDATION_ERROR
      message: "Invalid input data"
    - status: 409
      code: BRANCH_CODE_EXISTS
      message: "Branch code already exists"
    - status: 409
      code: MAIN_BRANCH_EXISTS
      message: "Organization already has a main branch"
```

---

## Data Models

### Entity: Organization

```yaml
table_name: organizations
description: Healthcare organization (clinic, hospital, puskesmas)

fields:
  id:
    type: uuid
    primary_key: true
  org_code:
    type: string
    max_length: 20
    unique: true
    auto_generated: true
    pattern: "ORG-XXX"
  org_name:
    type: string
    max_length: 255
    nullable: false
  org_name_legal:
    type: string
    max_length: 255
    nullable: true
  org_type:
    type: enum
    values: [clinic, hospital, puskesmas, lab, pharmacy]
  satusehat_org_id:
    type: string
    nullable: true
    description: FHIR Organization ID from Satusehat
  npwp:
    type: string
    max_length: 20
    nullable: true
  nib:
    type: string
    nullable: true
  phone:
    type: string
    max_length: 20
  email:
    type: string
    max_length: 255
  website:
    type: string
    nullable: true
  timezone:
    type: string
    default: "Asia/Jakarta"
  is_active:
    type: boolean
    default: true
  subscription_plan:
    type: enum
    values: [free, basic, professional, enterprise]
    default: free
  created_at:
    type: timestamp
    default: now()
  updated_at:
    type: timestamp
    auto_update: true

relationships:
  - type: has_many
    entity: Branch
    foreign_key: organization_id
  - type: has_many
    entity: User
    foreign_key: organization_id
```

### Entity: Branch

```yaml
table_name: branches
description: Organization branch/clinic location

fields:
  id:
    type: uuid
    primary_key: true
  organization_id:
    type: uuid
    foreign_key: organizations.id
  branch_code:
    type: string
    max_length: 50
    unique: true (within organization)
  branch_name:
    type: string
    max_length: 255
  satusehat_location_id:
    type: string
    nullable: true
    description: FHIR Location ID from Satusehat
  address:
    type: text
  rt_rw:
    type: string
    nullable: true
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
  latitude:
    type: decimal
    nullable: true
  longitude:
    type: decimal
    nullable: true
  phone:
    type: string
  email:
    type: string
    nullable: true
  operating_hours:
    type: jsonb
    description: Hours per day of week
  is_main_branch:
    type: boolean
    default: false
  is_active:
    type: boolean
    default: true
  created_at:
    type: timestamp
    default: now()
  updated_at:
    type: timestamp
    auto_update: true

indexes:
  - name: idx_branch_org
    fields: [organization_id]
  - name: idx_branch_code
    fields: [organization_id, branch_code]
    unique: true

constraints:
  - type: unique
    condition: Only one is_main_branch=true per organization
```

---

## Business Logic

### Validation Rules

```yaml
- rule: Organization name uniqueness
  condition: org_name must be unique across all organizations
  error: ORG_NAME_EXISTS

- rule: Owner email uniqueness
  condition: Owner email must not exist as any user
  error: EMAIL_EXISTS

- rule: Single main branch
  condition: Only one branch can be is_main_branch=true per organization
  error: MAIN_BRANCH_EXISTS

- rule: Branch code format
  condition: branch_code must be alphanumeric with hyphens only
  error: INVALID_BRANCH_CODE
```

### Processing Flow

```
Organization Registration:
1. Validate organization data
2. Validate owner data
3. Check uniqueness constraints
4. Create organization record
5. Create owner user with is_owner=true
6. Send verification email to owner
7. Return success with org and owner details

Branch Creation:
1. Validate branch data
2. Check if branch code unique within org
3. If is_main_branch=true, check no existing main branch
4. Create branch record
5. Optionally sync to Satusehat as FHIR Location
6. Return created branch
```

---

## Satusehat Integration

### FHIR Organization Resource

```json
{
  "resourceType": "Organization",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/organization",
      "value": "{org_code}"
    }
  ],
  "active": true,
  "type": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/organization-type",
          "code": "prov",
          "display": "Healthcare Provider"
        }
      ]
    }
  ],
  "name": "{org_name}",
  "telecom": [
    { "system": "phone", "value": "{phone}", "use": "work" },
    { "system": "email", "value": "{email}", "use": "work" }
  ]
}
```

### FHIR Location Resource (Branch)

```json
{
  "resourceType": "Location",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/location/{org_satusehat_id}",
      "value": "{branch_code}"
    }
  ],
  "status": "active",
  "name": "{branch_name}",
  "mode": "instance",
  "address": {
    "use": "work",
    "line": ["{address}"],
    "city": "{city}",
    "postalCode": "{postal_code}",
    "country": "ID"
  },
  "managingOrganization": {
    "reference": "Organization/{org_satusehat_id}"
  }
}
```

---

## Dependencies

- None (foundation feature)

## Enables

- User Authentication (FEATURE-0.2)
- User Management (FEATURE-0.3)
- All clinical features require organization/branch context

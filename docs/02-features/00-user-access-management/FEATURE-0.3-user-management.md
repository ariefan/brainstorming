# FEATURE-0.3: User & Role Management

> **Module**: User & Access Management
> **Related User Stories**: US-0.6, US-0.7, US-0.8, US-0.9, US-0.10
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Complete user lifecycle management including role assignment, practitioner linking, profile updates, user deactivation/reactivation, and activity audit logging.

### Business Value
Enables administrators to manage staff access, assign appropriate roles per branch, and maintain a complete audit trail of all system activities for compliance.

### User Impact
Administrators can manage staff members, assign roles, and track activities. Users can update their profiles and manage notification preferences.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-0.6 | User Role Assignment | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-06-user-role-assignment) |
| US-0.7 | User-Practitioner Linking | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-07-user-practitioner-linking) |
| US-0.8 | Audit Logging | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-08-audit-logging) |
| US-0.9 | User Profile Management | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-09-user-profile-management) |
| US-0.10 | User Deactivation & Reactivation | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-010-user-deactivation--reactivation) |

---

## API Endpoints Overview

### User Management
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/users` | List users in organization | Yes | Owner, Admin |
| GET | `/api/v1/users/{id}` | Get user details | Yes | Owner, Admin, Self |
| PUT | `/api/v1/users/{id}` | Update user | Yes | Owner, Admin |
| POST | `/api/v1/users/{id}/deactivate` | Deactivate user | Yes | Owner, Admin |
| POST | `/api/v1/users/{id}/reactivate` | Reactivate user | Yes | Owner, Admin |

### Role & Branch Assignment
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/users/{id}/branches` | Get user's branch assignments | Yes | Owner, Admin |
| POST | `/api/v1/users/{id}/branches` | Assign user to branch | Yes | Owner, Admin |
| PUT | `/api/v1/users/{id}/branches/{branch_id}` | Update role in branch | Yes | Owner, Admin |
| DELETE | `/api/v1/users/{id}/branches/{branch_id}` | Remove from branch | Yes | Owner, Admin |

### Practitioner Linking
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/users/{id}/link-practitioner` | Link to practitioner | Yes | Owner, Admin |
| DELETE | `/api/v1/users/{id}/unlink-practitioner` | Unlink practitioner | Yes | Owner, Admin |
| GET | `/api/v1/practitioners/unlinked` | List unlinked practitioners | Yes | Owner, Admin |

### Profile Management
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/profile` | Get own profile | Yes | All |
| PUT | `/api/v1/profile` | Update own profile | Yes | All |
| POST | `/api/v1/profile/change-email` | Request email change | Yes | All |
| POST | `/api/v1/profile/verify-email` | Verify new email | No | - |
| POST | `/api/v1/profile/avatar` | Upload avatar | Yes | All |

### Audit Logs
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/audit-logs` | List audit logs | Yes | Owner, Admin |
| GET | `/api/v1/audit-logs/export` | Export audit logs | Yes | Owner |
| GET | `/api/v1/audit-logs/user/{id}` | User activity log | Yes | Owner, Admin |

---

## Predefined System Roles

```yaml
roles:
  owner:
    code: "owner"
    name: "Organization Owner"
    description: "Full organization access, manages all branches"
    can_manage: [owner, admin, doctor, nurse, midwife, pharmacist, lab_tech, front_desk, cashier]

  admin:
    code: "admin"
    name: "Branch Administrator"
    description: "Manages branch, users, and master data"
    can_manage: [doctor, nurse, midwife, pharmacist, lab_tech, front_desk, cashier]

  doctor:
    code: "doctor"
    name: "Doctor"
    description: "Clinical access, diagnose, prescribe"
    clinical_role: true
    requires_practitioner: true

  nurse:
    code: "nurse"
    name: "Nurse"
    description: "Vital signs, assist clinical"
    clinical_role: true
    requires_practitioner: true

  midwife:
    code: "midwife"
    name: "Midwife (Bidan)"
    description: "Maternal and child health services"
    clinical_role: true
    requires_practitioner: true

  pharmacist:
    code: "pharmacist"
    name: "Pharmacist (Apoteker)"
    description: "Pharmacy and medication dispensing"
    clinical_role: true
    requires_practitioner: true

  lab_tech:
    code: "lab_tech"
    name: "Lab Technician"
    description: "Laboratory operations"
    clinical_role: true
    requires_practitioner: true

  front_desk:
    code: "front_desk"
    name: "Front Desk"
    description: "Registration, queue, appointments"
    clinical_role: false

  cashier:
    code: "cashier"
    name: "Cashier"
    description: "Billing and payments"
    clinical_role: false
```

---

## Detailed Endpoint Specifications

### POST /api/v1/users/{id}/deactivate

```yaml
method: POST
path: /api/v1/users/{id}/deactivate
description: Deactivate a user account

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [reason]
    properties:
      reason:
        type: enum
        values: [resignation, termination, leave, transfer, other]
      reason_notes:
        type: string
        description: Additional details
      effective_date:
        type: date
        description: Future-dated deactivation (optional)
        example: "2026-01-31"

response:
  success:
    status: 200
    body:
      user_id: uuid
      status: "deactivated"
      deactivated_at: datetime
      sessions_terminated: integer
      notification_sent: boolean

  errors:
    - status: 400
      code: CANNOT_DEACTIVATE_SELF
      message: "Cannot deactivate your own account"
    - status: 400
      code: CANNOT_DEACTIVATE_OWNER
      message: "Cannot deactivate organization owner"
    - status: 403
      code: INSUFFICIENT_PERMISSIONS
      message: "Cannot deactivate users with higher roles"

business_rules:
  - All active sessions terminated immediately
  - Email notification sent to user
  - User cannot login after deactivation
  - Historical data preserved (encounters, prescriptions)
  - If effective_date in future, deactivation scheduled
```

### POST /api/v1/users/{id}/branches

```yaml
method: POST
path: /api/v1/users/{id}/branches
description: Assign user to a branch with role

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [branch_id, role]
    properties:
      branch_id:
        type: uuid
      role:
        type: enum
        values: [admin, doctor, nurse, midwife, pharmacist, lab_tech, front_desk, cashier]
      is_primary:
        type: boolean
        default: false
        description: Make this the user's primary branch

response:
  success:
    status: 201
    body:
      user_id: uuid
      branch_id: uuid
      role: enum
      is_primary: boolean
      assigned_at: datetime

  errors:
    - status: 400
      code: ALREADY_ASSIGNED
      message: "User already assigned to this branch"
    - status: 400
      code: ROLE_REQUIRES_PRACTITIONER
      message: "Clinical role requires linked practitioner"
    - status: 403
      code: CANNOT_ASSIGN_ROLE
      message: "Cannot assign role higher than your own"
```

### POST /api/v1/users/{id}/link-practitioner

```yaml
method: POST
path: /api/v1/users/{id}/link-practitioner
description: Link user account to clinical practitioner profile

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [practitioner_id]
    properties:
      practitioner_id:
        type: uuid
        description: Existing practitioner to link

response:
  success:
    status: 200
    body:
      user_id: uuid
      practitioner_id: uuid
      practitioner_name: string
      practitioner_type: enum

  errors:
    - status: 400
      code: PRACTITIONER_ALREADY_LINKED
      message: "Practitioner already linked to another user"
    - status: 400
      code: USER_ALREADY_LINKED
      message: "User already linked to a practitioner"
    - status: 400
      code: ROLE_MISMATCH
      message: "User role does not match practitioner type"

business_rules:
  - One-to-one relationship (practitioner ↔ user)
  - Role must match practitioner type (doctor → doctor role)
  - Practitioner IHS ID used for FHIR resource attribution
```

### GET /api/v1/audit-logs

```yaml
method: GET
path: /api/v1/audit-logs
description: List audit log entries with filters

authentication:
  required: true
  roles: [owner, admin]

request:
  query_params:
    user_id:
      type: uuid
      description: Filter by specific user
    action:
      type: enum
      values: [login, logout, create, read, update, delete, export, print]
    resource_type:
      type: string
      description: Filter by resource (patient, encounter, etc.)
    date_from:
      type: date
      example: "2025-12-01"
    date_to:
      type: date
      example: "2025-12-31"
    page:
      type: integer
      default: 1
    per_page:
      type: integer
      default: 50
      max: 100

response:
  success:
    status: 200
    body:
      data:
        - id: uuid
          user_id: uuid
          user_email: string
          user_role: string
          action: enum
          resource_type: string
          resource_id: uuid
          resource_description: string
          details: object
          ip_address: string
          created_at: datetime
      meta:
        total: integer
        page: integer
        per_page: integer
        total_pages: integer
```

---

## Audit Event Categories

```yaml
authentication:
  - login_success
  - login_failure
  - logout
  - password_change
  - mfa_enabled
  - mfa_disabled

user_management:
  - user_created
  - user_updated
  - user_deactivated
  - user_reactivated
  - role_assigned
  - role_removed
  - practitioner_linked
  - practitioner_unlinked

patient_data:
  - patient_created
  - patient_updated
  - patient_viewed
  - medical_record_accessed
  - medical_record_exported
  - medical_record_printed

clinical_actions:
  - encounter_created
  - diagnosis_recorded
  - prescription_created
  - lab_ordered
  - procedure_performed

financial:
  - invoice_created
  - payment_received
  - refund_processed
```

---

## Business Rules

### Deactivation Rules
- Users cannot deactivate themselves
- Organization owner cannot be deactivated (must transfer ownership first)
- Admin can only deactivate users with equal or lower roles
- All active sessions terminated on deactivation
- Email notification sent to deactivated user
- Future-dated deactivation supported (effective last day)

### Role Assignment Rules
- Admins can only assign roles they can manage
- Clinical roles (doctor, nurse, etc.) require linked practitioner
- Only one primary branch per user
- Role changes logged in audit trail

### Practitioner Linking Rules
- One-to-one relationship enforced
- User role must match practitioner type
- Unlinking removes clinical action capability
- Linked practitioner IHS ID used for Satusehat attribution

---

## Dependencies

- FEATURE-0.1: Organization Setup
- FEATURE-0.2: Authentication

## Enables

- Clinical features require user context and roles
- Audit logs for compliance reporting

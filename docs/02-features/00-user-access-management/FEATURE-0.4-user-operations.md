# FEATURE-0.4: User Operations & Notifications

> **Module**: User & Access Management
> **Related User Stories**: US-0.11, US-0.12, US-0.13, US-0.14
> **Implementation Priority**: P1 (High)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Advanced user operations including staff transfers between branches, bulk user management, credential expiry alerts, and notification preferences management.

### Business Value
Enables efficient workforce management across multiple branches, automated credential compliance monitoring, and customizable notification delivery.

### User Impact
Administrators can efficiently manage staff transfers and bulk operations. Staff receive timely credential expiry alerts. Users can customize their notification preferences.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-0.11 | Staff Transfer Between Branches | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-011-staff-transfer-between-branches) |
| US-0.12 | Bulk User Management Operations | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-012-bulk-user-management-operations) |
| US-0.13 | Credential Expiry Alerts | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-013-credential-expiry-alerts) |
| US-0.14 | User Notification Preferences | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-014-user-notification-preferences) |

---

## API Endpoints Overview

### Staff Transfers
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/users/{id}/transfer` | Transfer staff to branch | Yes | Owner, Admin |
| GET | `/api/v1/users/{id}/transfers` | Get transfer history | Yes | Owner, Admin |
| DELETE | `/api/v1/transfers/{id}` | Cancel pending transfer | Yes | Owner, Admin |

### Bulk Operations
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/users/bulk/import` | Bulk import users via CSV | Yes | Owner, Admin |
| POST | `/api/v1/users/bulk/assign-role` | Bulk role assignment | Yes | Owner, Admin |
| POST | `/api/v1/users/bulk/deactivate` | Bulk deactivation | Yes | Owner, Admin |
| GET | `/api/v1/users/bulk/operations` | List bulk operations | Yes | Owner, Admin |
| GET | `/api/v1/users/bulk/operations/{id}` | Get operation status | Yes | Owner, Admin |

### Credential Expiry
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/credentials/expiring` | List expiring credentials | Yes | Owner, Admin |
| GET | `/api/v1/credentials/alerts` | Get credential alerts | Yes | Owner, Admin |
| POST | `/api/v1/credentials/alerts/{id}/acknowledge` | Acknowledge alert | Yes | Owner, Admin |

### Notification Preferences
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/notifications/preferences` | Get user preferences | Yes | All |
| PUT | `/api/v1/notifications/preferences` | Update preferences | Yes | All |
| GET | `/api/v1/notifications` | Get in-app notifications | Yes | All |
| POST | `/api/v1/notifications/{id}/read` | Mark as read | Yes | All |
| POST | `/api/v1/notifications/read-all` | Mark all as read | Yes | All |

---

## Detailed Endpoint Specifications

### POST /api/v1/users/{id}/transfer

```yaml
method: POST
path: /api/v1/users/{id}/transfer
description: Transfer staff member to another branch

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [to_branch_id, effective_date]
    properties:
      to_branch_id:
        type: uuid
        description: Target branch
      effective_date:
        type: date
        description: When transfer takes effect
        example: "2026-01-01"
      transfer_type:
        type: enum
        values: [permanent, temporary]
        default: permanent
      end_date:
        type: date
        description: For temporary transfers only
        example: "2026-03-31"
      new_role:
        type: enum
        values: [admin, doctor, nurse, midwife, pharmacist, lab_tech, front_desk, cashier]
        description: Role at new branch (defaults to current role)
      retain_old_branch_access:
        type: boolean
        default: false
        description: Keep read-only access to old branch
      reason:
        type: string
        description: Transfer reason
        example: "Staff reallocation"

response:
  success:
    status: 201
    body:
      transfer_id: uuid
      user_id: uuid
      from_branch: { id: uuid, name: string }
      to_branch: { id: uuid, name: string }
      transfer_type: enum
      effective_date: date
      status: "pending" | "completed"
      notification_sent: boolean

  errors:
    - status: 400
      code: SAME_BRANCH
      message: "Cannot transfer to same branch"
    - status: 400
      code: INVALID_EFFECTIVE_DATE
      message: "Effective date cannot be in the past"
    - status: 403
      code: NO_ACCESS_TO_BRANCH
      message: "You don't have admin access to target branch"
```

### POST /api/v1/users/bulk/import

```yaml
method: POST
path: /api/v1/users/bulk/import
description: Import users from CSV file

authentication:
  required: true
  roles: [owner, admin]

request:
  content_type: multipart/form-data
  body:
    file:
      type: file
      format: csv
      max_size: 5MB
    branch_id:
      type: uuid
      description: Default branch for imported users
    send_invitations:
      type: boolean
      default: true
      description: Send invitation emails

csv_format: |
  email,full_name,role,branch_code,create_practitioner
  doctor1@clinic.id,Dr. John Doe,doctor,BRANCH-A,yes
  nurse1@clinic.id,Jane Smith,nurse,BRANCH-A,no
  admin1@clinic.id,Admin User,admin,BRANCH-MAIN,no

response:
  success:
    status: 202
    body:
      operation_id: uuid
      status: "processing"
      total_rows: integer
      message: "Bulk import started. Check status via GET /bulk/operations/{id}"

  errors:
    - status: 400
      code: INVALID_FILE_FORMAT
      message: "File must be CSV format"
    - status: 400
      code: MISSING_REQUIRED_COLUMNS
      message: "CSV must contain: email, full_name, role"
```

### GET /api/v1/users/bulk/operations/{id}

```yaml
method: GET
path: /api/v1/users/bulk/operations/{id}
description: Get bulk operation status and results

authentication:
  required: true
  roles: [owner, admin]

response:
  success:
    status: 200
    body:
      operation_id: uuid
      operation_type: "import" | "role_assign" | "deactivate"
      status: "pending" | "processing" | "completed" | "failed"
      total_rows: integer
      processed_rows: integer
      success_count: integer
      failure_count: integer
      errors:
        - row_number: integer
          email: string
          error: string
      started_at: datetime
      completed_at: datetime
      download_error_report_url: string
```

### GET /api/v1/credentials/expiring

```yaml
method: GET
path: /api/v1/credentials/expiring
description: List practitioners with expiring credentials

authentication:
  required: true
  roles: [owner, admin]

request:
  query_params:
    days_ahead:
      type: integer
      default: 90
      description: Show credentials expiring within N days
    branch_id:
      type: uuid
      description: Filter by branch
    credential_type:
      type: enum
      values: [sip, str, all]
      default: all
    status:
      type: enum
      values: [expiring, expired, all]
      default: all

response:
  success:
    status: 200
    body:
      data:
        - practitioner_id: uuid
          practitioner_name: string
          practitioner_type: enum
          credential_type: "sip" | "str"
          credential_number: string
          expiry_date: date
          days_until_expiry: integer
          status: "expiring" | "expired" | "grace_period" | "blocked"
          user_linked: boolean
          branches: [{ id: uuid, name: string }]
      summary:
        total_expiring: integer
        expiring_30_days: integer
        expiring_60_days: integer
        expiring_90_days: integer
        expired: integer
```

### PUT /api/v1/notifications/preferences

```yaml
method: PUT
path: /api/v1/notifications/preferences
description: Update user notification preferences

authentication:
  required: true
  roles: [All]

request:
  body:
    type: object
    properties:
      preferences:
        type: array
        items:
          type: object
          properties:
            notification_type:
              type: string
              example: "appointment_assigned"
            email_enabled:
              type: boolean
            sms_enabled:
              type: boolean
            in_app_enabled:
              type: boolean
            push_enabled:
              type: boolean
      quiet_hours:
        type: object
        properties:
          enabled:
            type: boolean
          start_time:
            type: time
            example: "22:00"
          end_time:
            type: time
            example: "07:00"

response:
  success:
    status: 200
    body:
      updated_preferences: integer
      message: "Preferences updated successfully"

  errors:
    - status: 400
      code: CANNOT_DISABLE_CRITICAL
      message: "Cannot disable critical security notifications"
```

---

## Notification Types

```yaml
notification_types:
  # Cannot be disabled (critical)
  critical:
    - password_changed
    - account_deactivated
    - login_from_new_device

  # Default: Email + In-app
  authentication:
    - password_reset_requested

  # Default: In-app only
  work:
    - appointment_assigned
    - patient_arrival
    - lab_result_ready
    - prescription_ready
    - shift_reminder

  # Default: Email + In-app
  administrative:
    - role_changed
    - branch_transfer
    - credential_expiring

  # Default: Email
  system:
    - system_maintenance
    - policy_update
```

---

## Credential Expiry Rules

```yaml
credential_expiry:
  alert_schedule:
    - 90 days before: first_alert
    - 60 days before: second_alert
    - 30 days before: third_alert
    - 7 days before: final_alert
    - expired: daily_reminder

  grace_period:
    duration_days: 60
    behavior: |
      Practitioner can work but sees warning banner.
      Clinical actions logged with expired_credential flag.

  hard_stop:
    duration_days: 90
    behavior: |
      Practitioner cannot login.
      Must renew credential before access restored.

  alert_recipients:
    - Practitioner (direct notification)
    - Branch admins (where practitioner works)
    - Organization owner (summary report)
```

---

## Business Rules

### Staff Transfer Rules
- Admin can only transfer users within branches they manage
- Immediate transfers switch active session context
- Future-dated transfers scheduled automatically
- Temporary transfers auto-revert after end_date
- Notification sent to transferred staff

### Bulk Operation Rules
- Maximum 500 rows per bulk import
- All rows validated before processing
- Failed rows returned in error report
- Invitations sent asynchronously (not blocking)
- Operation status queryable for progress

### Credential Expiry Rules
- Daily automated check at 2 AM
- Alerts de-duplicated (one per expiry window)
- Acknowledgement stops repeat notifications
- Grace period allows continued work with warning
- Hard stop after 90 days of expiry

---

## Dependencies

- FEATURE-0.1: Organization Setup
- FEATURE-0.2: Authentication
- FEATURE-0.3: User Management
- Module 02: Practitioners (for credential tracking)

## Enables

- Workforce optimization across branches
- Compliance monitoring for clinical credentials
- Personalized notification experience

# User & Access Management

> **Module**: 00 - User & Access Management
> **Stories**: US-0.1 to US-0.14
> **Priority**: P0 (Critical)
> **Foundation**: Required for all other modules

---

## US-0.1: Organization Setup

### User Story
**As a** clinic owner
**I want to** register my organization and create branches
**So that** I can set up multi-branch clinic operations

### Acceptance Criteria

- [ ] **GIVEN** new organization registration
      **WHEN** owner completes registration form
      **THEN** organization is created with owner as first user

- [ ] **GIVEN** organization is created
      **WHEN** owner adds a branch
      **THEN** branch is created with address and contact details

- [ ] **GIVEN** organization exists
      **WHEN** syncing to Satusehat
      **THEN** FHIR Organization resource is created/updated

### Data Model

```yaml
organization:
  id: uuid
  org_code: string (unique, auto-generated)
  org_name: string
  org_name_legal: string (nullable) # legal entity name
  org_type: enum (clinic/hospital/puskesmas/lab/pharmacy)

  # Identifiers
  satusehat_org_id: string (nullable) # FHIR Organization ID
  npwp: string (nullable)
  nib: string (nullable) # Nomor Induk Berusaha
  situ: string (nullable) # Surat Izin Tempat Usaha

  # Contact
  phone: string
  email: string
  website: string (nullable)

  # Billing
  billing_email: string (nullable)
  billing_address: text (nullable)

  # Settings
  timezone: string (default: "Asia/Jakarta")
  currency: string (default: "IDR")
  fiscal_year_start: integer (default: 1) # month

  # Status
  is_active: boolean (default: true)
  subscription_plan: enum (free/basic/professional/enterprise)
  subscription_expires_at: datetime (nullable)

  created_at: datetime
  updated_at: datetime

branch:
  id: uuid
  organization_id: uuid (FK)
  branch_code: string (unique within org)
  branch_name: string

  # Location
  satusehat_location_id: string (nullable) # FHIR Location ID
  address: text
  rt_rw: string (nullable)
  kelurahan: string
  kecamatan: string
  city: string
  province: string
  postal_code: string
  latitude: decimal (nullable)
  longitude: decimal (nullable)

  # Contact
  phone: string
  email: string (nullable)
  fax: string (nullable)

  # Operating hours (JSON)
  operating_hours: jsonb
  # Example: {"monday": {"open": "08:00", "close": "17:00"}, ...}

  # Flags
  is_main_branch: boolean (default: false)
  is_active: boolean (default: true)

  created_at: datetime
  updated_at: datetime
```

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
    {
      "system": "phone",
      "value": "{phone}",
      "use": "work"
    },
    {
      "system": "email",
      "value": "{email}",
      "use": "work"
    }
  ],
  "address": [
    {
      "use": "work",
      "type": "both",
      "line": ["{address}"],
      "city": "{city}",
      "postalCode": "{postal_code}",
      "country": "ID"
    }
  ]
}
```

---

## US-0.2: User Invitation & Registration

### User Story
**As an** organization owner or admin
**I want to** invite staff members to join the system
**So that** they can access features based on their roles

### Acceptance Criteria

- [ ] **GIVEN** owner/admin wants to add staff
      **WHEN** sending invitation email
      **THEN** invitation link is generated and emailed

- [ ] **GIVEN** staff receives invitation
      **WHEN** clicking invitation link
      **THEN** registration form is shown with pre-filled data

- [ ] **GIVEN** staff completes registration
      **WHEN** submitting form
      **THEN** account is created and email verified

### Data Model

```yaml
user_invitation:
  id: uuid
  organization_id: uuid (FK)
  branch_id: uuid (FK, nullable) # if inviting for specific branch

  # Invitation details
  email: string
  full_name: string
  role: enum (admin/doctor/nurse/midwife/pharmacist/lab_tech/front_desk/cashier)

  # Token
  invitation_token: string (unique, hashed)
  expires_at: datetime # 7 days from creation

  # Status
  status: enum (pending/accepted/expired/revoked)
  accepted_at: datetime (nullable)

  # Inviter
  invited_by: uuid (FK to user)
  invited_at: datetime

  # If creating practitioner
  create_practitioner: boolean (default: false)
  practitioner_type: enum (doctor/dentist/midwife/nurse/pharmacist/lab_tech, nullable)

user:
  id: uuid
  email: string (unique)
  phone: string (nullable)
  password_hash: string

  # Profile
  full_name: string
  avatar_url: string (nullable)

  # Organization
  organization_id: uuid (FK)

  # Linked clinical profile
  practitioner_id: uuid (FK to practitioner, nullable)

  # Status
  is_owner: boolean (default: false)
  is_active: boolean (default: true)
  email_verified: boolean (default: false)
  email_verified_at: datetime (nullable)

  # Security
  password_changed_at: datetime (nullable)
  must_change_password: boolean (default: false)
  last_login_at: datetime (nullable)
  last_login_ip: string (nullable)
  failed_login_count: integer (default: 0)
  locked_until: datetime (nullable)

  # MFA
  mfa_enabled: boolean (default: false)
  mfa_method: enum (sms/email/totp, nullable)
  mfa_secret: string (encrypted, nullable)
  mfa_recovery_codes: array[string] (encrypted, nullable)

  created_at: datetime
  updated_at: datetime

user_branch:
  id: uuid
  user_id: uuid (FK)
  branch_id: uuid (FK)
  role: enum (owner/admin/doctor/nurse/midwife/pharmacist/lab_tech/front_desk/cashier)
  is_primary: boolean (default: false) # primary branch for this user
  is_active: boolean (default: true)
  assigned_at: datetime
  assigned_by: uuid (FK to user)
```

### Invitation Flow

```
1. Admin enters staff email, name, role
2. System generates invitation token (valid 7 days)
3. System sends invitation email with link
4. Staff clicks link → Registration page
5. Staff enters password, phone (optional)
6. System creates user account
7. System assigns user to branch with role
8. If clinical role → Prompt to create practitioner profile
```

---

## US-0.3: User Authentication

### User Story
**As a** registered user
**I want to** login to the system
**So that** I can access my assigned features

### Acceptance Criteria

- [ ] **GIVEN** user has valid credentials
      **WHEN** logging in with email/password
      **THEN** session is created and user is redirected

- [ ] **GIVEN** user is logged in
      **WHEN** session expires or user logs out
      **THEN** session is terminated and user must re-authenticate

- [ ] **GIVEN** user has multiple branches
      **WHEN** logging in
      **THEN** user can select active branch

### Data Model

```yaml
user_session:
  id: uuid
  user_id: uuid (FK)

  # Session
  session_token: string (unique, hashed)
  refresh_token: string (unique, hashed)

  # Context
  branch_id: uuid (FK) # currently active branch

  # Device info
  user_agent: string
  ip_address: string
  device_type: enum (web/mobile/tablet)
  device_name: string (nullable)

  # Status
  is_active: boolean (default: true)

  # Timestamps
  created_at: datetime
  expires_at: datetime
  last_activity_at: datetime
  revoked_at: datetime (nullable)

login_attempt:
  id: uuid
  email: string
  ip_address: string
  user_agent: string
  success: boolean
  failure_reason: enum (invalid_email/invalid_password/account_locked/account_inactive/mfa_required, nullable)
  user_id: uuid (FK, nullable) # if email matched
  attempted_at: datetime
```

### Session Management

```yaml
session_config:
  access_token_ttl: 15 minutes
  refresh_token_ttl: 7 days
  max_sessions_per_user: 5
  session_idle_timeout: 30 minutes

  # Security
  rotate_refresh_token: true
  invalidate_on_password_change: true
  require_mfa_after_days: 30 # prompt MFA setup after 30 days
```

---

## US-0.4: Two-Factor Authentication

### User Story
**As a** user concerned about security
**I want to** enable two-factor authentication
**So that** my account is protected even if password is compromised

### Acceptance Criteria

- [ ] **GIVEN** user wants to enable 2FA
      **WHEN** choosing SMS/email method
      **THEN** OTP is sent to phone/email for verification

- [ ] **GIVEN** 2FA is enabled
      **WHEN** logging in
      **THEN** system prompts for OTP after password

- [ ] **GIVEN** user loses access to 2FA device
      **WHEN** using recovery code
      **THEN** user can login and reset 2FA

### Data Model

```yaml
mfa_verification:
  id: uuid
  user_id: uuid (FK)

  # OTP
  otp_code: string (hashed)
  otp_method: enum (sms/email)
  otp_destination: string # phone or email (masked)

  # Purpose
  purpose: enum (login/setup/password_reset)

  # Status
  expires_at: datetime # 5 minutes
  verified_at: datetime (nullable)
  attempts: integer (default: 0)
  max_attempts: integer (default: 3)

  created_at: datetime

mfa_recovery_log:
  id: uuid
  user_id: uuid (FK)
  recovery_code_used: string (partial, masked)
  used_at: datetime
  ip_address: string
```

### MFA Configuration

```yaml
mfa_config:
  otp_length: 6
  otp_ttl_seconds: 300 # 5 minutes
  max_otp_attempts: 3
  resend_cooldown_seconds: 60
  recovery_codes_count: 10

  # Rate limiting
  max_otp_requests_per_hour: 5
```

---

## US-0.5: Password Management

### User Story
**As a** user
**I want to** manage my password securely
**So that** I can recover access and maintain security

### Acceptance Criteria

- [ ] **GIVEN** user forgets password
      **WHEN** requesting password reset
      **THEN** reset link is sent to email

- [ ] **GIVEN** user clicks reset link
      **WHEN** entering new password
      **THEN** password is updated and all sessions invalidated

- [ ] **GIVEN** user is logged in
      **WHEN** changing password
      **THEN** old password is verified before change

### Data Model

```yaml
password_reset:
  id: uuid
  user_id: uuid (FK)

  # Token
  reset_token: string (unique, hashed)
  expires_at: datetime # 1 hour

  # Status
  status: enum (pending/used/expired)
  used_at: datetime (nullable)

  # Request info
  requested_ip: string
  requested_at: datetime

password_history:
  id: uuid
  user_id: uuid (FK)
  password_hash: string
  created_at: datetime
```

### Password Policy

```yaml
password_policy:
  min_length: 8
  require_uppercase: true
  require_lowercase: true
  require_number: true
  require_special: false

  # History
  prevent_reuse_count: 5 # cannot reuse last 5 passwords

  # Expiry
  max_age_days: 90 # optional password expiry
  warn_before_days: 14

  # Lockout
  max_failed_attempts: 5
  lockout_duration_minutes: 30
```

---

## US-0.6: User Role Assignment

### User Story
**As an** organization owner or admin
**I want to** assign roles to users per branch
**So that** access is controlled appropriately

### Acceptance Criteria

- [ ] **GIVEN** user exists in organization
      **WHEN** assigning to a branch
      **THEN** user gains access with specified role

- [ ] **GIVEN** user has role in branch
      **WHEN** role is changed
      **THEN** permissions are updated immediately

- [ ] **GIVEN** user is removed from branch
      **WHEN** accessing that branch
      **THEN** access is denied

### Predefined System Roles

```yaml
roles:
  owner:
    description: "Full organization access, manages all branches"
    permissions:
      - "*" # all permissions
    can_manage_roles: [owner, admin, doctor, nurse, midwife, pharmacist, lab_tech, front_desk, cashier]

  admin:
    description: "Manages branch, users, and master data"
    permissions:
      - user:read
      - user:create
      - user:update
      - user:delete
      - practitioner:*
      - polyclinic:*
      - master_data:*
      - patient:*
      - appointment:*
      - queue:*
      - report:read
    can_manage_roles: [doctor, nurse, midwife, pharmacist, lab_tech, front_desk, cashier]

  doctor:
    description: "Clinical access, diagnose, prescribe"
    permissions:
      - patient:read
      - patient:create
      - patient:update
      - encounter:*
      - diagnosis:*
      - prescription:*
      - lab_order:create
      - lab_result:read
      - referral:*
      - medical_record:read
      - queue:read
      - queue:call
    can_manage_roles: []

  nurse:
    description: "Vital signs, assist clinical"
    permissions:
      - patient:read
      - patient:create
      - patient:update
      - encounter:read
      - encounter:update
      - vital_signs:*
      - queue:read
      - queue:call
    can_manage_roles: []

  midwife:
    description: "Maternal and child health services"
    permissions:
      - patient:read
      - patient:create
      - patient:update
      - encounter:*
      - kia:*
      - anc:*
      - pnc:*
      - immunization:*
      - family_planning:*
      - vital_signs:*
      - queue:read
      - queue:call
    can_manage_roles: []

  pharmacist:
    description: "Pharmacy and medication dispensing"
    permissions:
      - patient:read
      - prescription:read
      - dispense:*
      - inventory:*
      - pharmacy_queue:*
    can_manage_roles: []

  lab_tech:
    description: "Laboratory operations"
    permissions:
      - patient:read
      - lab_order:read
      - lab_result:*
      - specimen:*
      - lab_queue:*
    can_manage_roles: []

  front_desk:
    description: "Registration, queue, appointments"
    permissions:
      - patient:read
      - patient:create
      - patient:update
      - appointment:*
      - queue:*
      - encounter:create
    can_manage_roles: []

  cashier:
    description: "Billing and payments"
    permissions:
      - patient:read
      - invoice:*
      - payment:*
      - receipt:*
      - cash_closing:*
    can_manage_roles: []
```

### Permission Checking

```yaml
# Permission format: resource:action
# Actions: create, read, update, delete, * (all)

# Example checks:
permission_check:
  - resource: "patient"
    action: "create"
    requires: "patient:create" OR "patient:*"

  - resource: "prescription"
    action: "create"
    requires: "prescription:create" OR "prescription:*"
    additional: "Must be doctor or midwife role"
```

---

## US-0.7: User-Practitioner Linking

### User Story
**As a** clinical staff member
**I want to** link my user account to my practitioner profile
**So that** my clinical activities are properly attributed

### Acceptance Criteria

- [ ] **GIVEN** user has clinical role (doctor/nurse/midwife/pharmacist/lab_tech)
      **WHEN** creating practitioner profile
      **THEN** practitioner is linked to user account

- [ ] **GIVEN** practitioner exists without user account
      **WHEN** inviting as user
      **THEN** user account is linked to existing practitioner

- [ ] **GIVEN** user performs clinical activity
      **WHEN** recording in encounter
      **THEN** linked practitioner ID is used for attribution

### Data Model

```yaml
# Link is stored in user table
user:
  practitioner_id: uuid (FK to practitioner, nullable)

# Practitioner table (from Module 02)
practitioner:
  id: uuid
  user_id: uuid (FK to user, nullable) # back-reference

  # Credentials (existing from US-2.2)
  practitioner_type: enum
  license_number: string
  # ... other fields
```

### Linking Workflow

```
Scenario 1: Invite with practitioner creation
1. Admin invites staff with role=doctor, create_practitioner=true
2. Staff accepts invitation
3. System prompts for practitioner credentials (SIP, STR)
4. System creates practitioner profile
5. System links user.practitioner_id = practitioner.id

Scenario 2: Link existing practitioner
1. Admin goes to user management
2. Selects user without practitioner link
3. Searches existing practitioners
4. Selects practitioner to link
5. System updates user.practitioner_id

Scenario 3: Create user for existing practitioner
1. Admin goes to practitioner management
2. Selects practitioner without user account
3. Clicks "Create User Account"
4. System creates invitation for practitioner's email
5. On acceptance, user is linked to practitioner
```

---

## US-0.8: Audit Logging

### User Story
**As a** compliance officer
**I want to** track all user activities
**So that** security incidents can be investigated

### Acceptance Criteria

- [ ] **GIVEN** user performs any action
      **WHEN** action completes
      **THEN** audit log entry is created

- [ ] **GIVEN** admin needs to investigate
      **WHEN** searching audit logs
      **THEN** logs can be filtered by user, action, date, resource

- [ ] **GIVEN** compliance requirements
      **WHEN** exporting audit logs
      **THEN** logs are available in standard format

### Data Model

```yaml
audit_log:
  id: uuid

  # Actor
  user_id: uuid (FK)
  user_email: string # denormalized for historical record
  user_role: string # role at time of action

  # Organization context
  organization_id: uuid (FK)
  branch_id: uuid (FK, nullable)

  # Action
  action: enum (login/logout/create/read/update/delete/export/print)
  resource_type: string # e.g., "patient", "encounter", "prescription"
  resource_id: uuid (nullable)
  resource_description: string (nullable) # e.g., "Patient: John Doe (MRN123)"

  # Details
  details: jsonb
  # Example: {"field_changes": {"status": {"from": "draft", "to": "active"}}}

  # Request context
  ip_address: string
  user_agent: string
  request_id: string (nullable) # for request tracing

  # Result
  status: enum (success/failure)
  failure_reason: text (nullable)

  # Timestamp
  created_at: datetime

# Indexes for common queries
indexes:
  - user_id, created_at DESC
  - organization_id, created_at DESC
  - resource_type, resource_id
  - action, created_at DESC
```

### Audit Categories

```yaml
audit_categories:
  authentication:
    - login_success
    - login_failure
    - logout
    - password_change
    - mfa_enabled
    - mfa_disabled
    - session_revoked

  user_management:
    - user_created
    - user_updated
    - user_deactivated
    - role_assigned
    - role_removed
    - invitation_sent

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

  sensitive_operations:
    - bulk_export
    - bulk_delete
    - configuration_changed
    - integration_credentials_updated
```

### Retention Policy

```yaml
audit_retention:
  default_retention_years: 7 # comply with medical record retention

  # Archiving
  archive_after_months: 12
  archive_storage: cold_storage

  # Sensitive data
  anonymize_after_years: 10

  # Deletion
  delete_after_years: 15
```

---

## US-0.9: User Profile Management

### User Story
**As a** user
**I want to** update my profile information
**So that** my contact details and preferences are current

### Acceptance Criteria

- [ ] **GIVEN** user is logged in
      **WHEN** updating name, phone, or avatar
      **THEN** changes are saved immediately

- [ ] **GIVEN** user changes email address
      **WHEN** submitting new email
      **THEN** verification email is sent to new address
      **AND** old email remains active until verified

- [ ] **GIVEN** user updates phone number
      **WHEN** saving new phone
      **THEN** OTP is sent to verify ownership (if used for 2FA)

### Data Model

```yaml
user_profile_change:
  id: uuid
  user_id: uuid (FK)
  field_changed: enum (email/phone/name/avatar)
  old_value: string
  new_value: string

  # Email change workflow
  verification_token: string (nullable, for email change)
  verification_expires_at: datetime (nullable)
  verified_at: datetime (nullable)

  # Status
  status: enum (pending/verified/expired/cancelled)
  changed_at: datetime
```

### Business Rules

1. **Email Change**: Old email remains login method until new email is verified
2. **Phone Change**: If phone is used for 2FA, verify with OTP before changing
3. **Name Change**: Takes effect immediately, reflected in all future records
4. **Avatar Upload**: Maximum 2MB, formats: JPG, PNG
5. **Audit Trail**: All profile changes are logged in audit_log

---

## US-0.10: User Deactivation & Reactivation

### User Story
**As an** admin
**I want to** deactivate and reactivate user accounts
**So that** staff who leave or return can be managed properly

### Acceptance Criteria

- [ ] **GIVEN** admin deactivates a user
      **WHEN** deactivation is confirmed
      **THEN** user cannot login
      **AND** all active sessions are terminated
      **AND** user is notified via email

- [ ] **GIVEN** user is deactivated
      **WHEN** viewing past records
      **THEN** deactivated user's name still appears (historical data preserved)

- [ ] **GIVEN** admin reactivates a user
      **WHEN** reactivation is confirmed
      **THEN** user can login again with same credentials
      **AND** user receives reactivation email

### Deactivation Workflow

```
1. Admin selects user to deactivate
2. System prompts for reason (resignation/termination/leave/transfer)
3. Admin confirms deactivation
4. System:
   - Sets user.is_active = false
   - Records deactivation timestamp and reason
   - Terminates all active sessions
   - Sends notification email to user
   - Creates audit log entry
5. User receives "Account deactivated" email with reason and contact
```

### Reactivation Workflow

```
1. Admin selects deactivated user
2. System shows deactivation history
3. Admin clicks "Reactivate"
4. System prompts: "Reset password?" (optional)
5. Admin confirms
6. System:
   - Sets user.is_active = true
   - Records reactivation timestamp
   - Optionally sends password reset email
   - Sends "Welcome back" email
   - Creates audit log entry
```

### Data Model

```yaml
user_deactivation:
  id: uuid
  user_id: uuid (FK)
  action: enum (deactivate/reactivate)
  reason: text
  performed_by: uuid (FK to user)
  performed_at: datetime
  effective_date: date (nullable) # future-dated deactivation
```

### Business Rules

1. **Cannot Self-Deactivate**: Users cannot deactivate their own accounts
2. **Owner Protection**: Organization owner cannot be deactivated (must transfer ownership first)
3. **Grace Period**: Optionally set effective_date in future (e.g., last day of employment)
4. **Data Retention**: User's historical records remain visible (encounters, prescriptions, etc.)
5. **Reactivation Approval**: Only users with admin or owner role can reactivate

---

## US-0.11: Staff Transfer Between Branches

### User Story
**As an** admin
**I want to** transfer staff between branches
**So that** workforce can be reallocated as needed

### Acceptance Criteria

- [ ] **GIVEN** user works at Branch A
      **WHEN** admin transfers to Branch B
      **THEN** user's primary branch changes to Branch B
      **AND** user's active session switches to Branch B context

- [ ] **GIVEN** user has access to multiple branches
      **WHEN** viewing transfer history
      **THEN** all past branch assignments are visible

- [ ] **GIVEN** staff member is transferred
      **WHEN** transfer takes effect
      **THEN** staff receives notification email with new branch details

### Transfer Workflow

```
1. Admin selects staff member
2. Admin clicks "Transfer to Another Branch"
3. System shows current branch assignments
4. Admin selects:
   - Target branch
   - Effective date (immediate or future)
   - Role at new branch (keep same or change)
   - Access retention: keep access to old branch? (Yes/No)
5. Admin enters transfer reason
6. Admin confirms transfer
7. System:
   - If immediate: updates user_branch.is_primary
   - If future: schedules transfer
   - Creates transfer record
   - Sends notification to staff
   - Creates audit log
```

### Data Model

```yaml
staff_transfer:
  id: uuid
  user_id: uuid (FK)
  from_branch_id: uuid (FK)
  to_branch_id: uuid (FK)

  # Transfer details
  transfer_type: enum (permanent/temporary)
  effective_date: date
  end_date: date (nullable, for temporary transfers)

  # Role change
  old_role: enum
  new_role: enum

  # Access
  retain_old_branch_access: boolean (default: false)

  # Workflow
  reason: text
  initiated_by: uuid (FK to user)
  initiated_at: datetime
  status: enum (pending/completed/cancelled)
  completed_at: datetime (nullable)
```

### Business Rules

1. **Primary Branch**: User can only have one primary branch at a time
2. **Access Retention**: If retain_old_branch_access = true, user has read-only access to old branch
3. **Temporary Transfer**: Automatically reverts after end_date
4. **Active Sessions**: User's active sessions are switched to new branch context
5. **Practitioner Impact**: If user is linked to practitioner, practitioner assignments remain unchanged (separate workflow)

---

## US-0.12: Bulk User Management Operations

### User Story
**As an** admin
**I want to** perform bulk operations on users
**So that** large-scale user management is efficient

### Acceptance Criteria

- [ ] **GIVEN** admin has CSV file with user data
      **WHEN** uploading for bulk invite
      **THEN** system validates all rows and sends invitations to valid entries

- [ ] **GIVEN** admin selects multiple users
      **WHEN** performing bulk role assignment
      **THEN** selected users are updated with new role

- [ ] **GIVEN** admin performs bulk deactivation
      **WHEN** confirming action
      **THEN** all selected users are deactivated with same reason

### Bulk Operations Supported

1. **Bulk Invite**
   - Upload CSV with: email, full_name, role, branch
   - System validates each row
   - Sends invitations to valid entries
   - Returns error report for invalid entries

2. **Bulk Role Assignment**
   - Select multiple users
   - Assign same role to all
   - Optionally apply to specific branch only

3. **Bulk Deactivation**
   - Select multiple users
   - Provide single reason
   - Deactivate all at once

4. **Bulk Branch Assignment**
   - Select multiple users
   - Assign to branch with role
   - Optionally remove from other branches

### Bulk Invite CSV Format

```csv
email,full_name,role,branch_code,create_practitioner
doctor1@clinic.id,Dr. John Doe,doctor,BRANCH-A,yes
nurse1@clinic.id,Jane Smith,nurse,BRANCH-A,no
admin1@clinic.id,Admin User,admin,BRANCH-MAIN,no
```

### Data Model

```yaml
bulk_operation:
  id: uuid
  operation_type: enum (invite/role_assign/deactivate/branch_assign)

  # File upload (for bulk invite)
  file_url: string (nullable)
  total_rows: integer
  valid_rows: integer
  invalid_rows: integer
  error_report: jsonb (nullable)

  # Status
  status: enum (pending/processing/completed/failed)
  initiated_by: uuid (FK to user)
  initiated_at: datetime
  completed_at: datetime (nullable)

bulk_operation_item:
  id: uuid
  bulk_operation_id: uuid (FK)
  row_number: integer

  # Item data
  item_data: jsonb # varies by operation type

  # Result
  status: enum (pending/success/failed)
  error_message: text (nullable)
  user_id: uuid (FK, nullable) # created user if success
```

### Business Rules

1. **Validation**: All rows validated before any invitations sent
2. **Partial Success**: If some rows fail, successful rows still processed
3. **Error Report**: CSV with failed rows and error reasons
4. **Async Processing**: Bulk operations run asynchronously for large batches
5. **Notifications**: Users receive individual invitation emails (not bulk)

---

## US-0.13: Credential Expiry Alerts

### User Story
**As an** admin
**I want to** receive alerts for expiring practitioner credentials
**So that** staff can renew licenses before expiry

### Acceptance Criteria

- [ ] **GIVEN** practitioner's SIP expires in 30 days
      **WHEN** daily check runs
      **THEN** admin receives email alert with practitioner details

- [ ] **GIVEN** practitioner's license has expired
      **WHEN** practitioner attempts to login
      **THEN** system displays warning message about expired credential

- [ ] **GIVEN** credential expiry alert
      **WHEN** admin acknowledges alert
      **THEN** alert is marked as acknowledged

### Alert Schedule

```yaml
credential_expiry_alerts:
  # Alert timing (days before expiry)
  first_alert: 90 days before
  second_alert: 60 days before
  third_alert: 30 days before
  final_alert: 7 days before

  # After expiry
  expired_alert: daily until renewed

  # Grace period
  grace_period_days: 60 # practitioner can still work
  hard_stop_days: 90 # system blocks access
```

### Alert Workflow

```
1. System runs daily credential expiry check
2. For each credential expiring within alert windows:
   - Check if alert already sent for this window
   - If not, create alert record
   - Send email to:
     * Practitioner (reminder to renew)
     * Admin (action required)
     * Owner (notification)
3. If credential expired:
   - Send daily reminder
   - Display warning on practitioner's dashboard
   - If past grace period: block clinical actions
   - If past hard stop: block login
```

### Data Model

```yaml
credential_expiry_alert:
  id: uuid
  practitioner_id: uuid (FK)
  credential_type: enum (sip/str)
  expiry_date: date

  # Alert details
  alert_level: enum (90_days/60_days/30_days/7_days/expired)
  sent_at: datetime

  # Acknowledgement
  acknowledged: boolean (default: false)
  acknowledged_by: uuid (FK to user, nullable)
  acknowledged_at: datetime (nullable)

  # Action taken
  renewal_status: enum (pending/submitted/approved/not_required)
  renewal_date: date (nullable)
```

### Business Rules

1. **Alert Recipients**: Practitioner + all admins at practitioner's branches
2. **Acknowledgement**: Admins can acknowledge to stop repeat alerts
3. **Grace Period**: Practitioner can work for 60 days after expiry with warning
4. **Hard Stop**: After 90 days, practitioner cannot login until renewed
5. **Renewal Upload**: Practitioner or admin uploads new credential document

---

## US-0.14: User Notification Preferences

### User Story
**As a** user
**I want to** manage my notification preferences
**So that** I only receive notifications I want

### Acceptance Criteria

- [ ] **GIVEN** user accesses notification settings
      **WHEN** viewing preferences
      **THEN** all notification types are listed with enable/disable toggles

- [ ] **GIVEN** user disables email notifications
      **WHEN** notification is triggered
      **THEN** email is not sent but in-app notification still appears

- [ ] **GIVEN** user sets quiet hours (e.g., 10 PM - 7 AM)
      **WHEN** notification is triggered during quiet hours
      **THEN** notification is queued and sent after quiet hours end

### Notification Types

```yaml
notification_types:
  # Authentication
  - login_from_new_device # Email + SMS
  - password_changed # Email
  - password_reset_requested # Email

  # Work-related
  - shift_reminder # Email + SMS (1 hour before shift)
  - appointment_assigned # In-app + Email
  - patient_arrival # In-app
  - lab_result_ready # In-app
  - prescription_ready # In-app

  # Administrative
  - role_changed # Email + In-app
  - branch_transfer # Email
  - account_deactivated # Email
  - credential_expiring # Email + SMS (for practitioners)

  # System
  - system_maintenance # Email (to all users)
  - policy_update # Email + In-app
```

### Preference Levels

1. **All Channels**: Email + SMS + In-app + Push (mobile)
2. **Email + In-app**: Default for most notifications
3. **In-app Only**: No external communications
4. **Disabled**: No notifications (except critical security alerts)

### Data Model

```yaml
user_notification_preference:
  id: uuid
  user_id: uuid (FK)
  notification_type: string

  # Channels
  email_enabled: boolean (default: true)
  sms_enabled: boolean (default: false)
  in_app_enabled: boolean (default: true)
  push_enabled: boolean (default: true)

  # Quiet hours
  quiet_hours_enabled: boolean (default: false)
  quiet_hours_start: time (nullable)
  quiet_hours_end: time (nullable)

  updated_at: datetime

notification_queue:
  id: uuid
  user_id: uuid (FK)
  notification_type: string

  # Content
  subject: string
  message: text
  action_url: string (nullable)

  # Delivery
  scheduled_for: datetime
  sent_at: datetime (nullable)
  delivery_status: enum (queued/sent/failed/cancelled)

  # Channels sent
  sent_via_email: boolean
  sent_via_sms: boolean
  sent_via_in_app: boolean

  # User interaction
  read_at: datetime (nullable, for in-app)
  clicked_at: datetime (nullable)
```

### Business Rules

1. **Critical Alerts**: Security alerts cannot be disabled (account_deactivated, password_changed)
2. **Quiet Hours**: Only non-urgent notifications are queued (urgent alerts sent immediately)
3. **Batching**: Multiple notifications of same type batched into digest (hourly or daily)
4. **Opt-out Links**: All emails include "Manage preferences" link
5. **Default Preferences**: New users get organization's default notification settings

---

## Dependencies

- None (foundation module)

## Blocks
- All other modules (this module is required for user authentication and access control)

---

## API Endpoints Overview

### Authentication
```
POST   /api/auth/register          # Owner registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Refresh access token
POST   /api/auth/forgot-password   # Request password reset
POST   /api/auth/reset-password    # Reset password with token
POST   /api/auth/change-password   # Change password (authenticated)
```

### MFA
```
POST   /api/auth/mfa/enable        # Enable MFA
POST   /api/auth/mfa/verify        # Verify OTP during login
POST   /api/auth/mfa/disable       # Disable MFA
POST   /api/auth/mfa/recovery      # Use recovery code
```

### Organization & Branch
```
GET    /api/organization           # Get organization details
PUT    /api/organization           # Update organization
GET    /api/branches               # List branches
POST   /api/branches               # Create branch
PUT    /api/branches/:id           # Update branch
DELETE /api/branches/:id           # Deactivate branch
```

### User Management
```
GET    /api/users                  # List users in organization
POST   /api/users/invite           # Send invitation
GET    /api/users/:id              # Get user details
PUT    /api/users/:id              # Update user
DELETE /api/users/:id              # Deactivate user
POST   /api/users/:id/branches     # Assign to branch
DELETE /api/users/:id/branches/:bid # Remove from branch
POST   /api/users/:id/link-practitioner # Link to practitioner
```

### Audit
```
GET    /api/audit-logs             # List audit logs (with filters)
GET    /api/audit-logs/export      # Export audit logs
```


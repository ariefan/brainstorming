# FEATURE-0.2: User Authentication

> **Module**: User & Access Management
> **Related User Stories**: US-0.2, US-0.3, US-0.4, US-0.5
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Complete authentication system including user invitation, registration, login/logout, two-factor authentication (2FA), and password management.

### Business Value
Enables secure access to the clinical system, ensuring only authorized staff can access patient data and perform clinical operations.

### User Impact
Staff can receive invitations to join the system, register accounts, login securely with optional 2FA, and recover accounts when needed.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-0.2 | User Invitation & Registration | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-02-user-invitation--registration) |
| US-0.3 | User Authentication | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-03-user-authentication) |
| US-0.4 | Two-Factor Authentication | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-04-two-factor-authentication) |
| US-0.5 | Password Management | [View](../../01-user-stories/00-user-access-management/US-0.1-0.14-user-access-management.md#us-05-password-management) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/auth/invite` | Send invitation to staff | Yes | Owner, Admin |
| GET | `/api/v1/auth/invitations` | List pending invitations | Yes | Owner, Admin |
| DELETE | `/api/v1/auth/invitations/{id}` | Revoke invitation | Yes | Owner, Admin |
| POST | `/api/v1/auth/register` | Complete registration from invitation | No | - |
| POST | `/api/v1/auth/login` | User login | No | - |
| POST | `/api/v1/auth/logout` | User logout | Yes | All |
| POST | `/api/v1/auth/refresh` | Refresh access token | Yes | All |
| POST | `/api/v1/auth/mfa/enable` | Enable 2FA | Yes | All |
| POST | `/api/v1/auth/mfa/verify` | Verify 2FA code during login | No | - |
| POST | `/api/v1/auth/mfa/disable` | Disable 2FA | Yes | All |
| POST | `/api/v1/auth/mfa/recovery` | Use recovery code | No | - |
| POST | `/api/v1/auth/forgot-password` | Request password reset | No | - |
| POST | `/api/v1/auth/reset-password` | Complete password reset | No | - |
| POST | `/api/v1/auth/change-password` | Change password (logged in) | Yes | All |

---

## Detailed Endpoint Specifications

### POST /api/v1/auth/invite

```yaml
method: POST
path: /api/v1/auth/invite
description: Send invitation to new staff member

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [email, full_name, role, branch_id]
    properties:
      email:
        type: string
        format: email
        example: "doctor@clinic.id"
      full_name:
        type: string
        example: "Dr. Jane Smith"
      role:
        type: enum
        values: [admin, doctor, nurse, midwife, pharmacist, lab_tech, front_desk, cashier]
        example: "doctor"
      branch_id:
        type: uuid
        description: Branch to assign user to
      create_practitioner:
        type: boolean
        default: false
        description: Auto-create practitioner profile for clinical roles
      practitioner_type:
        type: enum
        values: [doctor, dentist, midwife, nurse, pharmacist, lab_tech]
        description: Required if create_practitioner=true

response:
  success:
    status: 201
    body:
      invitation_id: uuid
      email: string
      expires_at: datetime
      status: "pending"
    example: |
      {
        "invitation_id": "inv_123e4567-e89b-12d3-a456-426614174000",
        "email": "doctor@clinic.id",
        "expires_at": "2026-01-02T10:00:00Z",
        "status": "pending"
      }

  errors:
    - status: 400
      code: VALIDATION_ERROR
      message: "Invalid input data"
    - status: 409
      code: EMAIL_EXISTS
      message: "Email already registered"
    - status: 409
      code: INVITATION_EXISTS
      message: "Pending invitation exists for this email"
```

### POST /api/v1/auth/register

```yaml
method: POST
path: /api/v1/auth/register
description: Complete registration from invitation

authentication:
  required: false

request:
  body:
    type: object
    required: [invitation_token, password]
    properties:
      invitation_token:
        type: string
        description: Token from invitation email
      password:
        type: string
        minLength: 8
        description: Must contain uppercase, lowercase, and number
      phone:
        type: string
        description: Optional phone number

response:
  success:
    status: 201
    body:
      user_id: uuid
      email: string
      full_name: string
      role: enum
      branch_id: uuid
      requires_practitioner_setup: boolean

  errors:
    - status: 400
      code: INVALID_TOKEN
      message: "Invalid or expired invitation token"
    - status: 400
      code: WEAK_PASSWORD
      message: "Password does not meet requirements"
```

### POST /api/v1/auth/login

```yaml
method: POST
path: /api/v1/auth/login
description: User login

authentication:
  required: false

request:
  body:
    type: object
    required: [email, password]
    properties:
      email:
        type: string
        format: email
      password:
        type: string
      branch_id:
        type: uuid
        description: Optional - select branch context for multi-branch users

response:
  success:
    status: 200
    body:
      access_token: string
      refresh_token: string
      token_type: "Bearer"
      expires_in: integer (seconds)
      user:
        id: uuid
        email: string
        full_name: string
        role: enum
      branch:
        id: uuid
        branch_name: string
      mfa_required: boolean
      mfa_token: string (if mfa_required=true)
    example: |
      {
        "access_token": "eyJhbGciOiJIUzI1NiIs...",
        "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
        "token_type": "Bearer",
        "expires_in": 900,
        "user": {
          "id": "usr_123",
          "email": "doctor@clinic.id",
          "full_name": "Dr. Jane Smith",
          "role": "doctor"
        },
        "branch": {
          "id": "brn_456",
          "branch_name": "Cabang Jakarta"
        },
        "mfa_required": false
      }

  errors:
    - status: 401
      code: INVALID_CREDENTIALS
      message: "Invalid email or password"
    - status: 403
      code: ACCOUNT_LOCKED
      message: "Account locked due to too many failed attempts"
    - status: 403
      code: ACCOUNT_INACTIVE
      message: "Account has been deactivated"
    - status: 403
      code: CREDENTIAL_EXPIRED
      message: "Practitioner credentials have expired"
```

### POST /api/v1/auth/mfa/verify

```yaml
method: POST
path: /api/v1/auth/mfa/verify
description: Verify 2FA code to complete login

authentication:
  required: false

request:
  body:
    type: object
    required: [mfa_token, otp_code]
    properties:
      mfa_token:
        type: string
        description: Token from login response when mfa_required=true
      otp_code:
        type: string
        length: 6
        description: OTP from SMS or email

response:
  success:
    status: 200
    body:
      access_token: string
      refresh_token: string
      token_type: "Bearer"
      expires_in: integer

  errors:
    - status: 400
      code: INVALID_OTP
      message: "Invalid or expired OTP"
    - status: 429
      code: TOO_MANY_ATTEMPTS
      message: "Too many failed attempts, please request new OTP"
```

### POST /api/v1/auth/forgot-password

```yaml
method: POST
path: /api/v1/auth/forgot-password
description: Request password reset email

authentication:
  required: false

request:
  body:
    type: object
    required: [email]
    properties:
      email:
        type: string
        format: email

response:
  success:
    status: 200
    body:
      message: "If email exists, reset instructions have been sent"
    note: Always returns success to prevent email enumeration

rate_limiting:
  limit: 3 requests per hour per email
```

### POST /api/v1/auth/reset-password

```yaml
method: POST
path: /api/v1/auth/reset-password
description: Complete password reset with token

authentication:
  required: false

request:
  body:
    type: object
    required: [reset_token, new_password]
    properties:
      reset_token:
        type: string
        description: Token from reset email
      new_password:
        type: string
        minLength: 8

response:
  success:
    status: 200
    body:
      message: "Password reset successful"
      sessions_terminated: true

  errors:
    - status: 400
      code: INVALID_TOKEN
      message: "Invalid or expired reset token"
    - status: 400
      code: WEAK_PASSWORD
      message: "Password does not meet requirements"
    - status: 400
      code: PASSWORD_REUSED
      message: "Cannot reuse recent passwords"
```

---

## Business Logic

### Password Policy

```yaml
password_requirements:
  min_length: 8
  require_uppercase: true
  require_lowercase: true
  require_number: true
  require_special: false
  prevent_reuse_count: 5

lockout_policy:
  max_failed_attempts: 5
  lockout_duration_minutes: 30
```

### Session Management

```yaml
session_config:
  access_token_ttl_minutes: 15
  refresh_token_ttl_days: 7
  max_sessions_per_user: 5
  session_idle_timeout_minutes: 30
```

### MFA Configuration

```yaml
mfa_config:
  otp_length: 6
  otp_ttl_seconds: 300
  max_otp_attempts: 3
  resend_cooldown_seconds: 60
  methods: [sms, email]
  recovery_codes_count: 10
```

### Authentication Flow

```
Standard Login:
1. Validate email/password
2. Check account status (active, not locked)
3. If MFA enabled:
   a. Generate MFA token
   b. Send OTP via preferred method
   c. Return mfa_required=true
4. If MFA not enabled:
   a. Generate access/refresh tokens
   b. Create session record
   c. Return tokens and user info

MFA Verification:
1. Validate MFA token
2. Verify OTP code
3. If valid:
   a. Generate access/refresh tokens
   b. Create session record
   c. Return tokens
4. If invalid:
   a. Increment attempt counter
   b. Lock after max attempts
```

---

## Security Considerations

### Token Security
- Access tokens are short-lived (15 minutes)
- Refresh tokens stored securely and rotated on use
- All sessions terminated on password change
- Sessions can be individually revoked

### Rate Limiting
- Login: 10 attempts per minute per IP
- Password reset: 3 per hour per email
- OTP verification: 3 attempts per token

### Audit Events
- All authentication events logged
- Failed attempts tracked with IP and user agent
- Session creation and termination recorded

---

## Dependencies

- FEATURE-0.1: Organization Setup (requires organization context)

## Enables

- All authenticated features
- User profile management
- Clinical operations

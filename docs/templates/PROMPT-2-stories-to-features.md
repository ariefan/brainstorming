# AI Agent Prompt: Convert User Stories to Feature Specifications

## Your Role
You are an expert Software Architect and API Designer who also manages technical documentation structure.

## Input
You will receive:
1. **One or more structured user story files** (paths + content)
2. **Current project context**: Existing feature docs structure (if any)

## Output
You will generate:
1. **One or more feature specification files** with detailed endpoint specifications
2. **File placement instructions**
3. **Updated index/README**
4. **OPTIONAL: API spec snippets** (OpenAPI/TypeSpec - can skip if generating later)

---

## PART 1: Analyze User Stories & Decide File Structure

### Step 1: Identify Features

**One feature may cover multiple user stories:**

```yaml
input:
  - US-1.1: User Registration
  - US-1.2: User Login
  - US-1.3: Password Reset

analysis:
  feature_grouping:
    FEATURE-1: Authentication System
      stories: [US-1.1, US-1.2, US-1.3]
      reason: "All related to user authentication lifecycle"
      endpoints: 6
      entities: [User, PasswordResetToken, EmailVerificationToken]
```

### Step 2: Apply Feature File Splitting Rules

**RULE 1: Single feature file when...**
- All endpoints operate on same primary entity
- Related CRUD operations
- Endpoints < 10
- Combined spec < 800 lines

**RULE 2: Split feature into multiple files when...**
- Multiple distinct entities (User vs Order vs Payment)
- Feature has >10 endpoints
- Clear sub-features exist (User Management → [Registration, Authentication, Profile])
- Any single entity spec would be > 500 lines

**RULE 3: Create feature subfolders when...**
- Feature has >3 sub-features
- Feature is complex domain (e.g., E-commerce → [Catalog, Cart, Checkout, Orders, Payments])

### Step 3: Generate File Paths

**Naming Convention:**
```
docs/02-features/
  ├── [NN-module-name]/
  │   ├── FEATURE-X-feature-name.md          # Simple feature
  │   ├── FEATURE-X.Y-sub-feature-name.md    # Sub-feature
  │   ├── [sub-domain]/                       # For complex features
  │   │   ├── FEATURE-X.Y.Z-specific.md
  │   │   └── README.md
  │   └── README.md
  └── README.md
```

**ID Assignment:**
- Format: `FEATURE-X` or `FEATURE-X.Y`
- X = Module number (matches user story module)
- Y = Sub-feature (if split)
- Examples:
  - `FEATURE-1` - Authentication (covers US-1.1, US-1.2, US-1.3)
  - `FEATURE-1.1` - User Registration (if split from auth)
  - `FEATURE-1.2` - User Login (if split from auth)

---

## PART 2: Generate File Organization Plan

```yaml
file_organization_plan:
  source_stories:
    - US-1.1: "docs/01-user-stories/01-authentication/generated/US-1.1-1.3-user-authentication.md"
  
  output_files:
    - path: "docs/02-features/01-authentication/FEATURE-1-authentication.md"
      feature_id: FEATURE-1
      title: "Authentication System"
      user_stories: [US-1.1, US-1.2, US-1.3]
      entities: [User, EmailVerificationToken, PasswordResetToken]
      endpoints_count: 6
      reason: "All authentication-related operations, manageable in single file"
  
  api_spec_snippets:  # OPTIONAL - can skip if using TypeSpec later
    - path: "docs/03-api-spec/snippets/authentication-endpoints.yaml"
      description: "OpenAPI spec for authentication endpoints (optional)"
      note: "Can be generated later from feature specs"
  
  index_updates:
    - path: "docs/02-features/01-authentication/README.md"
      action: "create"
    
    - path: "docs/02-features/README.md"
      action: "update"
```

---

## PART 3: Design API Endpoints

For each user story, determine required CRUD operations:

| User Story Action | HTTP Method | Endpoint Pattern |
|-------------------|-------------|------------------|
| Create/Register/Add | POST | `/api/v1/resources` |
| Get/View/Retrieve | GET | `/api/v1/resources/{id}` |
| List/Browse/Search | GET | `/api/v1/resources?filters` |
| Update/Modify/Edit | PUT/PATCH | `/api/v1/resources/{id}` |
| Delete/Remove/Cancel | DELETE | `/api/v1/resources/{id}` |

### RESTful Best Practices
1. **Nouns for resources, verbs for actions**: `/users` not `/getUsers`
2. **Plural nouns**: `/users` not `/user`
3. **Hierarchical relationships**: `/users/{id}/orders`
4. **Query parameters for filtering**: `/users?status=active&role=admin`
5. **Consistent naming**: snake_case or camelCase (choose one, be consistent)

### HTTP Status Codes
- `200 OK`: Successful GET, PUT, PATCH
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Resource already exists
- `422 Unprocessable Entity`: Semantic validation error
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Response Format
```json
// Success response
{
  "data": {...},
  "meta": {
    "timestamp": "ISO 8601",
    "request_id": "uuid"
  }
}

// Error response
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {...}
  },
  "meta": {
    "timestamp": "ISO 8601",
    "request_id": "uuid"
  }
}

// List response with pagination
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 20,
    "total_pages": 5
  }
}
```

---

## PART 4: Generate Feature Content

### Template Structure for Single Feature File

```markdown
# FEATURE-1: Authentication System

> **Module**: Authentication  
> **User Stories**: US-1.1, US-1.2, US-1.3  
> **Priority**: P0 (Critical)  
> **Status**: 📝 Design

---

## Feature Overview

### Description
Complete authentication system including user registration, email verification, login/logout, and password reset functionality.

### Business Value
Enables users to create accounts and securely access the platform, foundational for all user-specific features.

### User Impact
Users can register, verify their email, login securely, and recover their account if they forget their password.

---

## Related User Stories

| Story ID | Title | Link |
|----------|-------|------|
| US-1.1 | User Registration | [View](../../01-user-stories/01-authentication/generated/US-1.1-1.3-user-authentication.md#us-11-user-registration) |
| US-1.2 | User Login | [View](../../01-user-stories/01-authentication/generated/US-1.1-1.3-user-authentication.md#us-12-user-login) |
| US-1.3 | Password Reset | [View](../../01-user-stories/01-authentication/generated/US-1.1-1.3-user-authentication.md#us-13-password-reset) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | User Story |
|--------|------|-------------|------|------------|
| POST | `/api/v1/auth/register` | Register new user | No | US-1.1 |
| POST | `/api/v1/auth/verify-email` | Verify email address | No | US-1.1 |
| POST | `/api/v1/auth/login` | User login | No | US-1.2 |
| POST | `/api/v1/auth/logout` | User logout | Yes | US-1.2 |
| POST | `/api/v1/auth/reset-password` | Request password reset | No | US-1.3 |
| PUT | `/api/v1/auth/reset-password/{token}` | Complete password reset | No | US-1.3 |

---

## Detailed Endpoint Specifications

[... For each endpoint, use the FEATURE-TEMPLATE.md format ...]

---

## Data Models

[... Entity definitions following FEATURE-TEMPLATE.md ...]

---

[... Complete all sections from FEATURE-TEMPLATE.md ...]
```

### Template for Split Sub-Features

When splitting, create an overview file + individual files:

**FEATURE-1-authentication-overview.md:**
```markdown
# FEATURE-1: Authentication System Overview

This feature is split into sub-features:

- [FEATURE-1.1: User Registration](./FEATURE-1.1-user-registration.md)
- [FEATURE-1.2: User Login](./FEATURE-1.2-user-login.md)
- [FEATURE-1.3: Password Management](./FEATURE-1.3-password-management.md)

## Shared Data Models

### Entity: User
[... shared entity definition ...]

## Cross-Cutting Concerns

- Authentication: JWT tokens with 1-hour expiry
- Rate Limiting: 10 requests/min for auth endpoints
- Security: bcrypt password hashing (cost: 12)
```

---

## PART 5: Generate API Specs (OPTIONAL)

**NOTE**: This part is OPTIONAL. Skip if you're planning to use TypeSpec or another API specification format.

For each feature, you can optionally create OpenAPI 3.0 snippets OR TypeSpec definitions that can be merged into the main spec:

**File**: `docs/03-api-spec/snippets/authentication-endpoints.yaml`

```yaml
# Authentication Endpoints
# Generated from FEATURE-1
# Source User Stories: US-1.1, US-1.2, US-1.3

paths:
  /api/v1/auth/register:
    post:
      summary: Register new user
      operationId: registerUser
      tags: [Authentication]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterRequest'
      responses:
        '201':
          description: User registered successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RegisterResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          $ref: '#/components/responses/Conflict'

  /api/v1/auth/verify-email:
    post:
      summary: Verify email address
      operationId: verifyEmail
      tags: [Authentication]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VerifyEmailRequest'
      responses:
        '200':
          description: Email verified successfully
        '400':
          $ref: '#/components/responses/BadRequest'
        '404':
          $ref: '#/components/responses/NotFound'

  /api/v1/auth/login:
    post:
      summary: User login
      operationId: loginUser
      tags: [Authentication]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LoginResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'

components:
  schemas:
    RegisterRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
          example: user@example.com
        password:
          type: string
          format: password
          minLength: 8
          example: SecurePass123
    
    RegisterResponse:
      type: object
      properties:
        user_id:
          type: string
          format: uuid
        email:
          type: string
        status:
          type: string
          enum: [UNVERIFIED, VERIFIED]
        created_at:
          type: string
          format: date-time
    
    VerifyEmailRequest:
      type: object
      required: [token]
      properties:
        token:
          type: string
          format: uuid
    
    LoginRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          format: password
    
    LoginResponse:
      type: object
      properties:
        access_token:
          type: string
        token_type:
          type: string
          example: Bearer
        expires_in:
          type: integer
          example: 3600
        user:
          $ref: '#/components/schemas/User'
    
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
        status:
          type: string
          enum: [UNVERIFIED, VERIFIED, SUSPENDED]
        created_at:
          type: string
          format: date-time
  
  responses:
    BadRequest:
      description: Invalid request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    Unauthorized:
      description: Authentication required or failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    Conflict:
      description: Resource already exists
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
  
  schemas:
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object
        meta:
          type: object
          properties:
            timestamp:
              type: string
              format: date-time
            request_id:
              type: string
              format: uuid
```

---

## PART 6: Generate Index Files

### Feature Module README

```markdown
# Authentication Module - Features

> **Module ID**: 01  
> **Features**: 1  
> **Total Endpoints**: 6

## Features

| Feature ID | Title | User Stories | Endpoints | Status |
|------------|-------|--------------|-----------|--------|
| FEATURE-1 | Authentication System | US-1.1, US-1.2, US-1.3 | 6 | 📝 Design |

## Endpoints Summary

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/verify-email` - Verify email
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/reset-password` - Request password reset
- `PUT /api/v1/auth/reset-password/{token}` - Complete password reset

## Files

- [`FEATURE-1-authentication.md`](./FEATURE-1-authentication.md) - Complete authentication feature specification

## API Documentation

- [OpenAPI Snippet](../../03-api-spec/snippets/authentication-endpoints.yaml)
- [Postman Collection](../../03-api-spec/postman/authentication.json) *(to be generated)*

## Related User Stories

- [US-1.1-1.3: User Authentication](../../01-user-stories/01-authentication/generated/US-1.1-1.3-user-authentication.md)
```

### Project-Level Features Index

```markdown
# Features Index

> **Last Updated**: 2025-12-25  
> **Total Features**: 1  
> **Total Endpoints**: 6

## Features by Module

| Module | Feature ID | Title | Endpoints | Status |
|--------|------------|-------|-----------|--------|
| 01. Authentication | FEATURE-1 | Authentication System | 6 | 📝 Design |

## API Endpoints Count

- Total Endpoints: 6
- By Method:
  - POST: 5
  - PUT: 1
  - GET: 0
  - DELETE: 0
- By Auth Required:
  - Public: 5
  - Authenticated: 1

## Implementation Status

- 📝 Design: 1 feature (6 endpoints)
- 🚧 Development: 0 features (0 endpoints)
- 🧪 Testing: 0 features (0 endpoints)
- ✅ Released: 0 features (0 endpoints)

## Quick Links

- [OpenAPI Specification](../03-api-spec/openapi.yaml)
- [All Endpoints List](./endpoints-index.md)
- [User Stories](../01-user-stories/)
- [API Documentation](../03-api-spec/)
```

---

## PART 7: Output Format

```markdown
# 📋 File Organization Plan

[... YAML plan from Part 2 ...]

---

# 📁 Generated Files

## File 1: FEATURE-1-authentication.md

**Path**: `docs/02-features/01-authentication/FEATURE-1-authentication.md`

```markdown
[... complete feature spec following FEATURE-TEMPLATE.md ...]
```

---

## File 2: authentication-endpoints.yaml

**Path**: `docs/03-api-spec/snippets/authentication-endpoints.yaml`

```yaml
[... OpenAPI snippet from Part 5 ...]
```

---

## File 3: Authentication Module README

**Path**: `docs/02-features/01-authentication/README.md`

```markdown
[... README from Part 6 ...]
```

---

## File 4: Features Index

**Path**: `docs/02-features/README.md`

```markdown
[... index from Part 6 ...]
```

---

# 🤖 AI GENERATION NOTES

## API Design Decisions
- Chose `/auth` prefix for all authentication endpoints (industry standard)
- Used JWT tokens for stateless authentication
- Separate verify-email endpoint (not query param) for better REST semantics
- Password reset uses two-step process: request → complete
- Logout endpoint included for client-side token cleanup (optional in JWT)

## Entity Relationships
- User → EmailVerificationToken (1:many, allows resend scenarios)
- User → PasswordResetToken (1:many, allows multiple requests)
- Tokens have expiry timestamps for security

## Security Considerations
- Password hashed with bcrypt (cost factor: 12)
- Rate limiting on all auth endpoints (10 req/min)
- Email verification tokens expire in 24h
- Password reset tokens expire in 1h (shorter for security)
- JWT tokens expire in 1h
- Refresh token mechanism recommended for production (not in this spec)

## Alternative Approaches Considered
1. **Session-based auth**: Rejected - not suitable for stateless API, complex for distributed systems
2. **OAuth only (no email/password)**: Rejected - requirement is email-based auth, OAuth can be Phase 2
3. **Magic link login**: Deferred to Phase 2 - adds complexity, current approach is proven
4. **Single endpoint for password reset**: Rejected - two-step is more secure and flexible

## Recommendations
- Consider adding 2FA (Two-Factor Authentication) in Phase 2
- Implement refresh token mechanism for production
- Add account lockout after N failed login attempts
- Consider rate limiting by user ID not just IP
- Add login activity log for security auditing
- Implement device fingerprinting for suspicious login detection

## Data Model Notes
- User status: UNVERIFIED → VERIFIED → (potentially) SUSPENDED
- Soft delete recommended (add deleted_at column) instead of hard delete
- Consider adding last_login_at for analytics
- Email stored in lowercase for consistency

## Performance Considerations
- Index on users.email for fast lookup
- Index on tokens.token for fast verification
- Consider Redis for token blacklist (logout functionality)
- Token cleanup job needed to remove expired tokens

## Missing Information from User Stories
- Token expiry times (made assumptions: email 24h, password 1h)
- Password complexity requirements (assumed: min 8, mixed case + number)
- Whether to support refresh tokens (recommended adding)
- Rate limiting specifics (assumed 10/min)
- Whether to log authentication events (recommended)

## Confidence Level
**High** - Standard authentication patterns, well-defined requirements, industry best practices applied

## Next Steps
1. Review and approve this specification
2. Implement database migrations
3. Set up JWT secret key management
4. Configure email service integration
5. Implement rate limiting middleware
6. Write unit and integration tests
7. Set up monitoring and alerting
```

---

## Commands to Execute

```bash
# Create feature documentation structure
mkdir -p docs/02-features/01-authentication
mkdir -p docs/03-api-spec/snippets

# Create feature spec
# (User copies content from File 1 above)

# Create OpenAPI snippet
# (User copies content from File 2 above)

# Create module README
# (User copies content from File 3 above)

# Create features index
# (User copies content from File 4 above)
```

---

## Quality Checklist

Before outputting, verify:
- [ ] All CRUD operations from user stories are covered
- [ ] Endpoints follow RESTful conventions
- [ ] HTTP status codes are appropriate
- [ ] Error scenarios are comprehensive
- [ ] Data models match user story requirements
- [ ] Security considerations are addressed
- [ ] Performance requirements are realistic
- [ ] OpenAPI spec is valid YAML
- [ ] Cross-references to user stories are correct
- [ ] File organization follows the rules

---

## Usage Instructions

**To use this prompt:**

1. Provide structured user story files (output from Prompt 1)
2. Optionally provide existing feature structure
3. Review the file organization plan
4. Review API design decisions
5. Copy generated files to your project
6. Merge OpenAPI snippets into main spec

**Example:**

```
Now, process the following user stories:

**Source Files**:
- docs/01-user-stories/01-authentication/generated/US-1.1-1.3-user-authentication.md

**Existing Feature Structure**: None - new project

**User Story Content**:
[... paste user story content here ...]
```

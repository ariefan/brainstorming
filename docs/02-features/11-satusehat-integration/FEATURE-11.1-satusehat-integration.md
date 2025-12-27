# FEATURE-11.1: Satusehat Integration

> **Module**: Satusehat Integration (FHIR R4)
> **Related User Stories**: US-11.1, US-11.2, US-11.3, US-11.4, US-11.5
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Integration with Indonesia's national health information exchange (Satusehat) using FHIR R4 standard. Includes OAuth2 authentication, resource sync workflow, patient IHS lookup, encounter bundle sync, and comprehensive error handling with retry mechanisms.

### Business Value
Enables regulatory compliance by exchanging clinical data with the national health information system, supports patient data portability across healthcare facilities, and enables BPJS claim validation through Satusehat encounter integration.

### User Impact
Administrators can configure Satusehat credentials, clinical staff benefit from automatic data sync without manual entry, and patients have their health records available nationally.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-11.1 | Authentication & Organization Setup | [View](../../01-user-stories/11-satusehat-integration/US-11.1-11.5-satusehat-integration.md#us-111-authentication--organization-setup) |
| US-11.2 | Resource Sync Workflow | [View](../../01-user-stories/11-satusehat-integration/US-11.1-11.5-satusehat-integration.md#us-112-resource-sync-workflow) |
| US-11.3 | Patient IHS Lookup | [View](../../01-user-stories/11-satusehat-integration/US-11.1-11.5-satusehat-integration.md#us-113-patient-ihs-lookup) |
| US-11.4 | Encounter Bundle Sync | [View](../../01-user-stories/11-satusehat-integration/US-11.1-11.5-satusehat-integration.md#us-114-encounter-bundle-sync) |
| US-11.5 | Error Handling & Retry | [View](../../01-user-stories/11-satusehat-integration/US-11.1-11.5-satusehat-integration.md#us-115-error-handling--retry) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/satusehat/config` | Get Satusehat configuration | Yes | Admin |
| POST | `/api/v1/satusehat/config` | Configure Satusehat credentials | Yes | Owner, Admin |
| PUT | `/api/v1/satusehat/config` | Update configuration | Yes | Owner, Admin |
| POST | `/api/v1/satusehat/config/test` | Test connection | Yes | Admin |
| POST | `/api/v1/satusehat/token/refresh` | Force token refresh | Yes | Admin |
| GET | `/api/v1/satusehat/organization` | Get organization from Satusehat | Yes | Admin |
| POST | `/api/v1/satusehat/locations/sync` | Sync polyclinics as Locations | Yes | Admin |
| GET | `/api/v1/satusehat/practitioner/lookup` | Lookup practitioner by NIK | Yes | Admin |
| POST | `/api/v1/satusehat/practitioners/sync` | Sync practitioners | Yes | Admin |
| GET | `/api/v1/satusehat/patient/lookup` | Lookup patient IHS ID by NIK | Yes | All |
| GET | `/api/v1/satusehat/sync-queue` | List sync queue | Yes | Admin |
| POST | `/api/v1/satusehat/sync-queue/{id}/retry` | Retry failed sync | Yes | Admin |
| POST | `/api/v1/satusehat/encounters/{id}/sync` | Sync encounter | Yes | All |
| GET | `/api/v1/satusehat/encounters/{id}/status` | Get encounter sync status | Yes | All |
| GET | `/api/v1/satusehat/errors` | List sync errors | Yes | Admin |
| POST | `/api/v1/satusehat/errors/{id}/resolve` | Mark error resolved | Yes | Admin |
| GET | `/api/v1/satusehat/health` | Health check | Yes | Admin |
| GET | `/api/v1/satusehat/stats` | Sync statistics | Yes | Admin |

---

## Detailed Endpoint Specifications

### POST /api/v1/satusehat/config

```yaml
method: POST
path: /api/v1/satusehat/config
description: Configure Satusehat integration credentials

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [client_id, client_secret, org_satusehat_id, environment]
    properties:
      client_id:
        type: string
        description: OAuth2 client ID from Satusehat
      client_secret:
        type: string
        description: OAuth2 client secret
      org_satusehat_id:
        type: string
        description: Organization ID in Satusehat
      org_name:
        type: string
      environment:
        type: enum
        values: [sandbox, production]
        default: sandbox

response:
  success:
    status: 201
    body:
      id: uuid
      org_satusehat_id: string
      org_name: string
      environment: enum
      is_active: boolean
      token_status: enum (valid/expired/not_obtained)
      created_at: datetime

  errors:
    - status: 400
      code: INVALID_CREDENTIALS
      message: "Could not authenticate with Satusehat"
    - status: 409
      code: CONFIG_EXISTS
      message: "Satusehat configuration already exists"
```

### POST /api/v1/satusehat/config/test

```yaml
method: POST
path: /api/v1/satusehat/config/test
description: Test Satusehat connection and credentials

authentication:
  required: true
  roles: [admin]

response:
  success:
    status: 200
    body:
      connection_status: enum (success/failed)
      token_obtained: boolean
      token_expires_in: integer
      organization_verified: boolean
      organization_name: string
      api_version: string
      latency_ms: integer

  errors:
    - status: 400
      code: CONFIG_NOT_FOUND
      message: "Satusehat configuration not found"
    - status: 503
      code: CONNECTION_FAILED
      message: "Could not connect to Satusehat"
```

### GET /api/v1/satusehat/patient/lookup

```yaml
method: GET
path: /api/v1/satusehat/patient/lookup
description: Lookup patient's IHS ID from Satusehat by NIK

authentication:
  required: true
  roles: [All]

request:
  query_params:
    nik:
      type: string
      required: true
      pattern: "^[0-9]{16}$"
      description: Indonesian NIK (16 digits)

response:
  success:
    status: 200
    body:
      lookup_status: enum (found/not_found)
      ihs_patient_id: string (nullable)
      patient_data:
        name: string
        gender: enum
        birth_date: date
        address: string
      registration_required: boolean
      registration_instructions: string (nullable)

  errors:
    - status: 400
      code: INVALID_NIK
      message: "NIK must be 16 digits"
    - status: 404
      code: PATIENT_NOT_FOUND
      message: "Patient not registered in Satusehat"
    - status: 503
      code: SATUSEHAT_UNAVAILABLE
      message: "Satusehat service unavailable"
```

### GET /api/v1/satusehat/practitioner/lookup

```yaml
method: GET
path: /api/v1/satusehat/practitioner/lookup
description: Lookup practitioner's IHS ID by NIK

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    nik:
      type: string
      required: true
      description: Practitioner NIK

response:
  success:
    status: 200
    body:
      lookup_status: enum (found/not_found)
      ihs_number: string (nullable)
      practitioner_data:
        name: string
        nik: string
        registration_number: string
        specialty: string
      verified: boolean
```

### POST /api/v1/satusehat/encounters/{id}/sync

```yaml
method: POST
path: /api/v1/satusehat/encounters/{id}/sync
description: Sync encounter and all related resources to Satusehat

authentication:
  required: true
  roles: [All]

request:
  path_params:
    id:
      type: uuid
      description: Encounter ID

response:
  success:
    status: 200
    body:
      encounter_id: uuid
      satusehat_encounter_id: string
      sync_status: enum (completed/partial/pending)
      resources_synced:
        - resource_type: string
          local_id: uuid
          satusehat_id: string
          status: enum (success/failed/pending)
          error: string (nullable)
      synced_at: datetime

  errors:
    - status: 400
      code: ENCOUNTER_NOT_COMPLETE
      message: "Encounter must be finished before sync"
    - status: 400
      code: PATIENT_NOT_REGISTERED
      message: "Patient must have IHS ID before sync"
    - status: 400
      code: PRACTITIONER_NOT_REGISTERED
      message: "Practitioner must have IHS ID before sync"
```

### GET /api/v1/satusehat/sync-queue

```yaml
method: GET
path: /api/v1/satusehat/sync-queue
description: List sync queue items

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    status:
      type: enum
      values: [pending, processing, completed, failed, skipped]
    resource_type:
      type: enum
      values: [Patient, Encounter, Condition, Observation, Procedure, MedicationRequest, MedicationDispense, ServiceRequest, DiagnosticReport]
    date_from:
      type: date
    date_to:
      type: date
    limit:
      type: integer
      default: 50
    offset:
      type: integer
      default: 0

response:
  success:
    status: 200
    body:
      summary:
        total: integer
        pending: integer
        processing: integer
        completed: integer
        failed: integer
      data:
        - id: uuid
          resource_type: string
          resource_id: uuid
          operation: enum
          status: enum
          priority: integer
          retry_count: integer
          error_message: string (nullable)
          created_at: datetime
          completed_at: datetime (nullable)
```

### GET /api/v1/satusehat/errors

```yaml
method: GET
path: /api/v1/satusehat/errors
description: List sync errors for troubleshooting

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    error_category:
      type: enum
      values: [transient, client, auth, not_found, server, unknown]
    resolution_status:
      type: enum
      values: [pending, auto_resolved, manual_resolved, ignored]
    date_from:
      type: date

response:
  success:
    status: 200
    body:
      data:
        - id: uuid
          resource_type: string
          resource_id: string
          operation: string
          error_category: enum
          http_status: integer
          error_code: string
          error_message: string
          request_url: string
          resolution_status: enum
          timestamp: datetime
```

---

## Data Models

### Satusehat Config

```yaml
table_name: satusehat_configs

fields:
  id:
    type: uuid
    primary_key: true
  organization_id:
    type: uuid
    foreign_key: organizations.id
    unique: true
  client_id:
    type: string(255)
    encrypted: true
  client_secret:
    type: string(255)
    encrypted: true
  environment:
    type: enum
    values: [sandbox, production]
  org_satusehat_id:
    type: string(100)
  org_name:
    type: string(255)
  current_access_token:
    type: text
    encrypted: true
    nullable: true
  token_expires_at:
    type: datetime
    nullable: true
  last_token_refresh:
    type: datetime
    nullable: true
  is_active:
    type: boolean
    default: true
  last_sync_at:
    type: datetime
    nullable: true
  last_error:
    type: text
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_satusehat_config_org
    fields: [organization_id]
    unique: true
```

### Satusehat Location

```yaml
table_name: satusehat_locations

fields:
  id:
    type: uuid
    primary_key: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    unique: true
  satusehat_location_id:
    type: string(100)
  location_name:
    type: string(255)
  location_type:
    type: string(50)
  synced_at:
    type: datetime
  status:
    type: enum
    values: [active, inactive]
    default: active

indexes:
  - name: idx_satusehat_location_poli
    fields: [polyclinic_id]
    unique: true
  - name: idx_satusehat_location_id
    fields: [satusehat_location_id]
```

### Satusehat Practitioner

```yaml
table_name: satusehat_practitioners

fields:
  id:
    type: uuid
    primary_key: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
    unique: true
  ihs_number:
    type: string(100)
    description: Satusehat Practitioner ID
  nik:
    type: string(16)
  practitioner_name:
    type: string(255)
  verified_at:
    type: datetime
  verification_method:
    type: enum
    values: [nik_lookup, manual]
  status:
    type: enum
    values: [active, inactive]
    default: active

indexes:
  - name: idx_satusehat_pract_local
    fields: [practitioner_id]
    unique: true
  - name: idx_satusehat_pract_ihs
    fields: [ihs_number]
```

### Patient IHS

```yaml
table_name: patient_ihs_lookups

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
  nik:
    type: string(16)
  lookup_status:
    type: enum
    values: [found, not_found, error]
  ihs_patient_id:
    type: string(100)
    nullable: true
  ihs_patient_data:
    type: jsonb
    nullable: true
  registration_required:
    type: boolean
    default: false
  registration_instructions:
    type: text
    nullable: true
  searched_at:
    type: datetime
  searched_by:
    type: uuid
    foreign_key: users.id

indexes:
  - name: idx_patient_ihs_patient
    fields: [patient_id]
  - name: idx_patient_ihs_nik
    fields: [nik]
```

### Satusehat Sync Queue

```yaml
table_name: satusehat_sync_queue

fields:
  id:
    type: uuid
    primary_key: true
  resource_type:
    type: enum
    values: [Patient, Encounter, Condition, Observation, Procedure, MedicationRequest, MedicationDispense, ServiceRequest, DiagnosticReport, Composition]
  resource_id:
    type: uuid
  operation:
    type: enum
    values: [create, update, search]
  fhir_resource:
    type: jsonb
    description: FHIR resource payload
  depends_on:
    type: jsonb
    nullable: true
    description: Array of queue IDs that must complete first
  encounter_id:
    type: uuid
    nullable: true
    description: Group by encounter
  status:
    type: enum
    values: [pending, processing, completed, failed, skipped]
    default: pending
  priority:
    type: integer
    default: 0
  retry_count:
    type: integer
    default: 0
  max_retries:
    type: integer
    default: 3
  next_retry_at:
    type: datetime
    nullable: true
  satusehat_id:
    type: string(100)
    nullable: true
  response_status:
    type: integer
    nullable: true
  response_body:
    type: jsonb
    nullable: true
  error_message:
    type: text
    nullable: true
  created_at:
    type: datetime
  started_at:
    type: datetime
    nullable: true
  completed_at:
    type: datetime
    nullable: true

indexes:
  - name: idx_sync_queue_status
    fields: [status]
  - name: idx_sync_queue_encounter
    fields: [encounter_id]
  - name: idx_sync_queue_resource
    fields: [resource_type, resource_id]
  - name: idx_sync_queue_retry
    fields: [status, next_retry_at]
```

### Satusehat Error Log

```yaml
table_name: satusehat_error_logs

fields:
  id:
    type: uuid
    primary_key: true
  sync_queue_id:
    type: uuid
    foreign_key: satusehat_sync_queue.id
    nullable: true
  resource_type:
    type: string(50)
  resource_id:
    type: string(100)
  operation:
    type: string(20)
  error_category:
    type: enum
    values: [transient, client, auth, not_found, server, unknown]
  http_status:
    type: integer
    nullable: true
  error_code:
    type: string(50)
    nullable: true
  error_message:
    type: text
  error_details:
    type: jsonb
    nullable: true
  request_url:
    type: string(500)
  request_body:
    type: jsonb
    nullable: true
  response_body:
    type: jsonb
    nullable: true
  resolution_status:
    type: enum
    values: [pending, auto_resolved, manual_resolved, ignored]
    default: pending
  resolution_notes:
    type: text
    nullable: true
  resolved_by:
    type: uuid
    nullable: true
  resolved_at:
    type: datetime
    nullable: true
  timestamp:
    type: datetime

indexes:
  - name: idx_error_log_category
    fields: [error_category]
  - name: idx_error_log_status
    fields: [resolution_status]
  - name: idx_error_log_timestamp
    fields: [timestamp]
```

### Satusehat Consent

```yaml
table_name: satusehat_consents

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
  consent_given:
    type: boolean
  consent_scope:
    type: enum
    values: [all, encounter_only, none]
  consent_datetime:
    type: datetime
  consent_method:
    type: enum
    values: [written, verbal, electronic]
  witnessed_by:
    type: uuid
    nullable: true
  consent_document_url:
    type: string(500)
    nullable: true
  valid_from:
    type: datetime
  valid_until:
    type: datetime
    nullable: true
  revoked:
    type: boolean
    default: false
  revoked_at:
    type: datetime
    nullable: true
  revoked_reason:
    type: text
    nullable: true

indexes:
  - name: idx_consent_patient
    fields: [patient_id]
  - name: idx_consent_valid
    fields: [valid_from, valid_until]
```

---

## FHIR Resource Sync Order

```
┌─────────────────────────────────────────────────────────┐
│  PREREQUISITES (One-time setup)                         │
├─────────────────────────────────────────────────────────┤
│  1. Organization  → Get org_satusehat_id               │
│  2. Location      → Create for each polyclinic         │
│  3. Practitioner  → Lookup IHS ID by NIK               │
│  4. PractitionerRole → Link Practitioner to Location   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  PER PATIENT (First visit)                              │
├─────────────────────────────────────────────────────────┤
│  5. Patient       → Search by NIK, get IHS Patient ID  │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  PER ENCOUNTER (Each visit)                             │
├─────────────────────────────────────────────────────────┤
│  6. Encounter     → Create (status: arrived)           │
│  7. Observation   → Vital signs (link to Encounter)    │
│  8. Condition     → Diagnoses (link to Encounter)      │
│  9. Procedure     → Procedures (link to Encounter)     │
│ 10. MedicationRequest → Prescriptions                  │
│ 11. MedicationDispense → Pharmacy dispense             │
│ 12. ServiceRequest → Lab orders                        │
│ 13. DiagnosticReport → Lab results                     │
│ 14. Encounter     → Update (status: finished)          │
└─────────────────────────────────────────────────────────┘
```

---

## Error Handling

### Error Categories

| Category | Examples | Action |
|----------|----------|--------|
| Transient | 429 (rate limit), 503 (unavailable) | Retry with exponential backoff |
| Client Error | 400 (bad request), 422 (validation) | Log, fix data, manual retry |
| Auth Error | 401 (unauthorized) | Refresh token, retry |
| Not Found | 404 (resource not found) | Check dependencies |
| Server Error | 500, 502, 504 | Retry, escalate if persistent |

### Retry Configuration

```yaml
retry_config:
  max_retries: 3
  initial_delay_ms: 1000
  max_delay_ms: 60000
  backoff_multiplier: 2

rate_limiting:
  requests_per_minute: 60
  burst_size: 10

circuit_breaker:
  failure_threshold: 5
  recovery_timeout_ms: 30000
```

---

## OAuth2 Authentication Flow

```yaml
oauth2_flow:
  endpoint: /oauth2/v1/accesstoken
  method: POST
  content_type: application/x-www-form-urlencoded

  request:
    grant_type: client_credentials
    client_id: "{client_id}"
    client_secret: "{client_secret}"

  response:
    access_token: string
    token_type: "Bearer"
    expires_in: 3600

token_management:
  - Store encrypted access token
  - Track expiration time
  - Auto-refresh 5 minutes before expiry
  - Include in all API requests as Bearer token
```

---

## Business Rules

### Prerequisites
- Organization must have valid Satusehat credentials
- All polyclinics must be synced as Locations before encounters
- Practitioners must have verified IHS IDs before being referenced
- Patients must have IHS Patient ID before encounter sync

### Sync Triggers
- Encounter completion triggers automatic sync
- Failed syncs are queued for retry
- Manual sync available for admin intervention

### Data Consent
- Patient consent required for data sharing
- Consent scope determines what resources are synced
- Revoked consent stops future syncs

### Resource Dependencies
- Encounter requires: Patient, Practitioner, Location
- Condition requires: Encounter
- Observation requires: Encounter
- MedicationRequest requires: Encounter, Medication
- All resources must be synced in dependency order

---

## Satusehat API Endpoints Reference

### Base URLs

| Environment | URL |
|-------------|-----|
| Sandbox | `https://api-satusehat-stg.dto.kemkes.go.id` |
| Production | `https://api-satusehat.kemkes.go.id` |

### Common Endpoints

| Resource | Method | Path |
|----------|--------|------|
| Token | POST | `/oauth2/v1/accesstoken` |
| Patient Search | GET | `/fhir-r4/v1/Patient?identifier=https://fhir.kemkes.go.id/id/nik\|{NIK}` |
| Practitioner Search | GET | `/fhir-r4/v1/Practitioner?identifier=https://fhir.kemkes.go.id/id/nik\|{NIK}` |
| Encounter | POST/GET/PUT | `/fhir-r4/v1/Encounter` |
| Condition | POST/GET | `/fhir-r4/v1/Condition` |
| Observation | POST/GET | `/fhir-r4/v1/Observation` |
| MedicationRequest | POST/GET | `/fhir-r4/v1/MedicationRequest` |
| DiagnosticReport | POST/GET | `/fhir-r4/v1/DiagnosticReport` |

---

## Dependencies

- All clinical modules (data sources)
- FEATURE-1.1: Patient Registration (patient NIK)
- FEATURE-2.2: Practitioner Management (practitioner NIK)
- FEATURE-2.1: Polyclinic Setup (Location sync)

## Enables

- FEATURE-12.1: BPJS Integration (claim validation via Encounter ID)
- National health data portability
- Regulatory compliance

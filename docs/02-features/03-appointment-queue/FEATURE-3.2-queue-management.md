# FEATURE-3.2: Queue Management

> **Module**: Appointment & Queue
> **Related User Stories**: US-3.2, US-3.3, US-3.4, US-3.5
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Real-time queue management system with walk-in registration, queue display integration, audio announcements, and supervisor dashboard for monitoring patient flow across all polyclinics.

### Business Value
Optimizes patient flow, reduces perceived wait times through transparency, and enables efficient resource allocation across clinical areas.

### User Impact
Patients receive clear queue numbers and estimated wait times. Staff can efficiently call patients with audio announcements. Supervisors can monitor and balance queues across polyclinics.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-3.2 | Walk-in Registration & Queue | [View](../../01-user-stories/03-appointment-queue/US-3.1-3.6-appointment-queue.md#us-32-walk-in-registration--queue) |
| US-3.3 | Queue Display System | [View](../../01-user-stories/03-appointment-queue/US-3.1-3.6-appointment-queue.md#us-33-queue-display-system) |
| US-3.4 | Queue Calling with Audio | [View](../../01-user-stories/03-appointment-queue/US-3.1-3.6-appointment-queue.md#us-34-queue-calling-with-audio) |
| US-3.5 | Queue Management Dashboard | [View](../../01-user-stories/03-appointment-queue/US-3.1-3.6-appointment-queue.md#us-35-queue-management-dashboard) |

---

## API Endpoints Overview

### Queue Operations
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| POST | `/api/v1/queues` | Create queue entry (walk-in) | Yes | Front Desk |
| GET | `/api/v1/queues` | List queue entries | Yes | All |
| GET | `/api/v1/queues/{id}` | Get queue details | Yes | All |
| POST | `/api/v1/queues/{id}/call` | Call patient | Yes | Clinical |
| POST | `/api/v1/queues/{id}/recall` | Re-call patient | Yes | Clinical |
| POST | `/api/v1/queues/{id}/skip` | Skip patient | Yes | Clinical |
| POST | `/api/v1/queues/{id}/serve` | Start serving | Yes | Clinical |
| POST | `/api/v1/queues/{id}/complete` | Complete service | Yes | Clinical |
| POST | `/api/v1/queues/{id}/transfer` | Transfer to another queue | Yes | Clinical |

### Queue Display
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/queues/display/{polyclinic_id}` | Get display data | No | Public |
| WS | `/ws/queue/{polyclinic_id}` | WebSocket for real-time updates | No | Public |

### Dashboard
| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/queues/dashboard` | Get dashboard overview | Yes | Admin, Front Desk |
| GET | `/api/v1/queues/metrics` | Get queue metrics | Yes | Admin |

---

## Detailed Endpoint Specifications

### POST /api/v1/queues

```yaml
method: POST
path: /api/v1/queues
description: Create queue entry for walk-in patient

authentication:
  required: true
  roles: [front_desk, admin]

request:
  body:
    type: object
    required: [patient_id, polyclinic_id]
    properties:
      patient_id:
        type: uuid
      polyclinic_id:
        type: uuid
      practitioner_id:
        type: uuid
        nullable: true
        description: Assigned practitioner (auto-assign if null)
      priority:
        type: enum
        values: [normal, priority]
        default: normal
      priority_reason:
        type: enum
        values: [elderly, disabled, emergency]
        description: Required if priority is set
      is_bpjs:
        type: boolean
        default: false
      chief_complaint:
        type: string
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      queue_number: string
      queue_date: date
      patient:
        id: uuid
        name: string
        mrn: string
      polyclinic:
        id: uuid
        name: string
      practitioner:
        id: uuid
        name: string
      priority: enum
      status: "waiting"
      position_in_queue: integer
      estimated_wait_minutes: integer
      check_in_time: datetime
      ticket_printed: boolean

  errors:
    - status: 400
      code: POLYCLINIC_CLOSED
      message: "Polyclinic is not operating today"
    - status: 400
      code: QUEUE_FULL
      message: "Maximum queue capacity reached"
    - status: 409
      code: ALREADY_IN_QUEUE
      message: "Patient already in queue for this polyclinic"
```

### POST /api/v1/queues/{id}/call

```yaml
method: POST
path: /api/v1/queues/{id}/call
description: Call patient from queue

authentication:
  required: true
  roles: [doctor, nurse, midwife]

request:
  body:
    type: object
    properties:
      room:
        type: string
        description: Room/station where patient should go
        example: "Room 1"
      play_audio:
        type: boolean
        default: true

response:
  success:
    status: 200
    body:
      id: uuid
      queue_number: string
      patient_name: string
      status: "called"
      called_time: datetime
      call_count: integer
      room: string
      audio_queued: boolean

  errors:
    - status: 400
      code: INVALID_STATUS
      message: "Can only call patients with 'waiting' status"
    - status: 400
      code: MAX_CALLS_REACHED
      message: "Maximum call attempts reached. Please skip patient"
```

### POST /api/v1/queues/{id}/skip

```yaml
method: POST
path: /api/v1/queues/{id}/skip
description: Skip patient who doesn't respond after multiple calls

authentication:
  required: true
  roles: [doctor, nurse, midwife]

request:
  body:
    type: object
    properties:
      reason:
        type: string
        description: Reason for skipping

response:
  success:
    status: 200
    body:
      id: uuid
      queue_number: string
      status: "skipped"
      skipped_at: datetime
      can_rejoin: boolean
      rejoin_window_minutes: integer
```

### GET /api/v1/queues/display/{polyclinic_id}

```yaml
method: GET
path: /api/v1/queues/display/{polyclinic_id}
description: Get queue display data for a polyclinic

authentication:
  required: false

response:
  success:
    status: 200
    body:
      polyclinic:
        id: uuid
        name: string
      current_serving:
        - queue_number: string
          patient_name: string (first name only)
          room: string
          started_at: datetime
      waiting:
        - queue_number: string
          patient_name: string (first name only)
          priority: boolean
      recently_called:
        - queue_number: string
          status: string
          time: datetime
      statistics:
        total_waiting: integer
        estimated_wait_minutes: integer
        total_served_today: integer
        avg_service_time_minutes: integer
      last_updated: datetime
```

### WebSocket /ws/queue/{polyclinic_id}

```yaml
websocket: /ws/queue/{polyclinic_id}
description: Real-time queue updates for display

events:
  # Server to Client
  queue_update:
    type: "update"
    data:
      action: "called" | "serving" | "completed" | "skipped" | "new"
      queue_number: string
      patient_name: string
      room: string
      statistics:
        total_waiting: integer
        estimated_wait_minutes: integer

  queue_call:
    type: "call"
    data:
      queue_number: string
      patient_name: string
      room: string
      call_count: integer
      audio:
        text_id: string
        text_en: string
```

### GET /api/v1/queues/dashboard

```yaml
method: GET
path: /api/v1/queues/dashboard
description: Get queue dashboard overview for all polyclinics

authentication:
  required: true
  roles: [admin, front_desk]

request:
  query_params:
    branch_id:
      type: uuid
      description: Filter by branch

response:
  success:
    status: 200
    body:
      branch:
        id: uuid
        name: string
      summary:
        total_waiting: integer
        total_being_served: integer
        total_completed_today: integer
        avg_wait_time_minutes: decimal
      polyclinics:
        - polyclinic_id: uuid
          polyclinic_name: string
          waiting: integer
          serving: integer
          completed: integer
          avg_wait_minutes: decimal
          avg_service_minutes: decimal
          practitioners:
            - id: uuid
              name: string
              status: "available" | "serving" | "break" | "offline"
              current_patient: string
              patients_served: integer
          alerts:
            - type: "long_wait" | "high_volume" | "staff_shortage"
              message: string
              severity: "warning" | "critical"
```

---

## Data Models

### Queue

```yaml
table_name: queues

fields:
  id:
    type: uuid
    primary_key: true
  queue_number:
    type: string
    format: "X999"
    index: true
  queue_date:
    type: date
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  appointment_id:
    type: uuid
    foreign_key: appointments.id
    nullable: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    index: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
  branch_id:
    type: uuid
    foreign_key: branches.id
  priority:
    type: enum
    values: [normal, priority]
    default: normal
  priority_reason:
    type: enum
    values: [elderly, disabled, emergency]
    nullable: true
  status:
    type: enum
    values: [waiting, called, serving, completed, skipped, transferred]
    default: waiting
    index: true
  check_in_time:
    type: datetime
  called_time:
    type: datetime
    nullable: true
  called_count:
    type: integer
    default: 0
  serve_start_time:
    type: datetime
    nullable: true
  serve_end_time:
    type: datetime
    nullable: true
  estimated_wait_minutes:
    type: integer
  actual_wait_minutes:
    type: integer
    nullable: true
  service_duration_minutes:
    type: integer
    nullable: true
  room:
    type: string
    nullable: true
  checked_in_by:
    type: uuid
    foreign_key: users.id
  served_by:
    type: uuid
    foreign_key: practitioners.id
    nullable: true
  transferred_from_queue_id:
    type: uuid
    foreign_key: queues.id
    nullable: true
  transfer_reason:
    type: string
    nullable: true
  notes:
    type: text
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

constraints:
  - type: unique
    fields: [queue_date, queue_number, branch_id]

indexes:
  - name: idx_queue_display
    fields: [queue_date, polyclinic_id, status]
  - name: idx_queue_patient_date
    fields: [patient_id, queue_date]
```

### Queue Call Log

```yaml
table_name: queue_call_logs

fields:
  id:
    type: uuid
    primary_key: true
  queue_id:
    type: uuid
    foreign_key: queues.id
    index: true
  call_number:
    type: integer
  called_at:
    type: datetime
  called_by:
    type: uuid
    foreign_key: users.id
  room:
    type: string
    nullable: true
  audio_played:
    type: boolean
    default: false
```

### Queue Display Config

```yaml
table_name: queue_display_configs

fields:
  id:
    type: uuid
    primary_key: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
  device_name:
    type: string
  device_id:
    type: string
    unique: true
  display_type:
    type: enum
    values: [tv, monitor, tablet]
  show_waiting_count:
    type: boolean
    default: true
  show_estimated_wait:
    type: boolean
    default: true
  show_recent_called:
    type: boolean
    default: true
  max_waiting_display:
    type: integer
    default: 10
  audio_enabled:
    type: boolean
    default: true
  audio_voice:
    type: enum
    values: [male, female]
    default: female
  audio_language:
    type: enum
    values: [id, en]
    default: id
  audio_volume:
    type: integer
    default: 80
  is_active:
    type: boolean
    default: true
  last_heartbeat:
    type: datetime
    nullable: true
```

---

## Queue Number Format

| Polyclinic Type | Prefix | Example |
|-----------------|--------|---------|
| General (Poli Umum) | A | A001, A002 |
| Dental (Poli Gigi) | B | B001, B002 |
| KIA (Kebidanan) | C | C001, C002 |
| Specialist | D | D001, D002 |
| Priority | P | P001, P002 |

---

## Audio Announcement

### Format (Indonesian)
```
"Nomor antrian [A zero zero two],
 atas nama [Bapak/Ibu FirstName],
 silakan menuju [Poli Umum],
 [Ruang satu]"
```

### Format (English)
```
"Queue number [A zero zero two],
 [Mr./Mrs. FirstName],
 please proceed to [General Clinic],
 [Room one]"
```

---

## Business Rules

### Queue Number Generation
- Reset daily at midnight
- Prefix based on polyclinic queue_prefix
- Sequential within prefix per day
- Priority patients get "P" prefix

### Call Rules
- Maximum 3 calls before skip allowed
- 2-minute gap between calls
- Skipped patients can rejoin within 30 minutes

### Wait Time Estimation
- Based on: (patients ahead * avg service time)
- Adjusted for priority patients
- Updated every queue state change

### Transfer Rules
- Can transfer to any polyclinic
- Original queue number preserved
- Maintains priority status

---

## Dependencies

- FEATURE-1.1: Patient Registration
- FEATURE-3.1: Appointment Booking
- WebSocket infrastructure
- Audio/TTS service

## Enables

- All clinical encounters (start from queue)
- FEATURE-4.1: Clinical Encounter

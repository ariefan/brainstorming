# FEATURE-3.1: Appointment Booking

> **Module**: Appointment & Queue
> **Related User Stories**: US-3.1, US-3.6
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Online and in-clinic appointment booking system with practitioner availability, slot management, confirmation workflow, and automated reminders via SMS/WhatsApp.

### Business Value
Enables patients to book appointments conveniently, reduces walk-in congestion, and improves resource utilization through predictable scheduling.

### User Impact
Patients can book appointments online 24/7, receive automated confirmations and reminders, and have reduced wait times at the clinic.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-3.1 | Online Appointment Booking | [View](../../01-user-stories/03-appointment-queue/US-3.1-3.6-appointment-queue.md#us-31-online-appointment-booking) |
| US-3.6 | Appointment Reminders | [View](../../01-user-stories/03-appointment-queue/US-3.1-3.6-appointment-queue.md#us-36-appointment-reminders) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/appointments/availability` | Get available slots | Yes | All |
| POST | `/api/v1/appointments` | Create appointment | Yes | Patient, Front Desk |
| GET | `/api/v1/appointments` | List appointments | Yes | All |
| GET | `/api/v1/appointments/{id}` | Get appointment details | Yes | All |
| PUT | `/api/v1/appointments/{id}` | Update appointment | Yes | Front Desk, Admin |
| POST | `/api/v1/appointments/{id}/confirm` | Confirm appointment | Yes | Patient, Front Desk |
| POST | `/api/v1/appointments/{id}/cancel` | Cancel appointment | Yes | Patient, Front Desk |
| POST | `/api/v1/appointments/{id}/reschedule` | Reschedule appointment | Yes | Patient, Front Desk |
| POST | `/api/v1/appointments/{id}/check-in` | Check-in for appointment | Yes | Front Desk |

---

## Detailed Endpoint Specifications

### GET /api/v1/appointments/availability

```yaml
method: GET
path: /api/v1/appointments/availability
description: Get available appointment slots for booking

authentication:
  required: true
  roles: [All]

request:
  query_params:
    polyclinic_id:
      type: uuid
      required: true
    practitioner_id:
      type: uuid
      description: Specific practitioner (optional, shows all if omitted)
    date_from:
      type: date
      default: today
    date_to:
      type: date
      default: today + 7 days
      max: today + 30 days
    include_bpjs:
      type: boolean
      default: false
      description: Filter for BPJS-accepting slots

response:
  success:
    status: 200
    body:
      polyclinic:
        id: uuid
        name: string
      date_range:
        from: date
        to: date
      practitioners:
        - practitioner_id: uuid
          practitioner_name: string
          specialty: string
          accepts_bpjs: boolean
          availability:
            - date: date
              day_of_week: string
              slots:
                - slot_id: uuid
                  start_time: time
                  end_time: time
                  status: "available" | "limited" | "full"
                  remaining_slots: integer
```

### POST /api/v1/appointments

```yaml
method: POST
path: /api/v1/appointments
description: Create a new appointment

authentication:
  required: true
  roles: [patient, front_desk, admin]

request:
  body:
    type: object
    required: [patient_id, polyclinic_id, appointment_date, start_time]
    properties:
      patient_id:
        type: uuid
      polyclinic_id:
        type: uuid
      practitioner_id:
        type: uuid
        nullable: true
        description: Null for "any available"
      slot_id:
        type: uuid
        description: Specific slot from availability
      appointment_date:
        type: date
      start_time:
        type: time
      is_bpjs:
        type: boolean
        default: false
      bpjs_referral_number:
        type: string
        description: Required if is_bpjs is true
      chief_complaint:
        type: string
        description: Reason for visit
      notes:
        type: string

response:
  success:
    status: 201
    body:
      id: uuid
      confirmation_number: string
      patient:
        id: uuid
        name: string
      polyclinic:
        id: uuid
        name: string
      practitioner:
        id: uuid
        name: string
      appointment_date: date
      start_time: time
      end_time: time
      status: "booked"
      is_bpjs: boolean
      confirmation_sent_to: string

  errors:
    - status: 400
      code: SLOT_NOT_AVAILABLE
      message: "Selected slot is no longer available"
    - status: 400
      code: PAST_DATE
      message: "Cannot book appointments in the past"
    - status: 400
      code: BPJS_REFERRAL_REQUIRED
      message: "BPJS referral number required for BPJS appointments"
    - status: 409
      code: DUPLICATE_APPOINTMENT
      message: "Patient already has appointment at this time"
```

### POST /api/v1/appointments/{id}/cancel

```yaml
method: POST
path: /api/v1/appointments/{id}/cancel
description: Cancel an appointment

authentication:
  required: true
  roles: [patient, front_desk, admin]

request:
  body:
    type: object
    required: [cancellation_reason]
    properties:
      cancellation_reason:
        type: string
        description: Reason for cancellation

response:
  success:
    status: 200
    body:
      id: uuid
      status: "cancelled"
      cancelled_at: datetime
      cancellation_reason: string
      refund_applicable: boolean
      slot_released: boolean

  errors:
    - status: 400
      code: ALREADY_CANCELLED
      message: "Appointment already cancelled"
    - status: 400
      code: ALREADY_COMPLETED
      message: "Cannot cancel completed appointment"
    - status: 400
      code: TOO_LATE_TO_CANCEL
      message: "Cancellation window has passed"
```

---

## Data Models

### Appointment

```yaml
table_name: appointments

fields:
  id:
    type: uuid
    primary_key: true
  confirmation_number:
    type: string
    format: "APT-YYYYMMDD-XXXX"
    unique: true
    index: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    index: true
  polyclinic_id:
    type: uuid
    foreign_key: polyclinics.id
    index: true
  practitioner_id:
    type: uuid
    foreign_key: practitioners.id
    nullable: true
  slot_id:
    type: uuid
    foreign_key: appointment_slots.id
    nullable: true
  branch_id:
    type: uuid
    foreign_key: branches.id
  appointment_date:
    type: date
    index: true
  start_time:
    type: time
  end_time:
    type: time
  booking_source:
    type: enum
    values: [online, phone, walk_in]
    default: online
  booking_date:
    type: datetime
  booked_by:
    type: uuid
    foreign_key: users.id
    nullable: true
  is_bpjs:
    type: boolean
    default: false
  bpjs_referral_number:
    type: string
    nullable: true
  status:
    type: enum
    values: [booked, confirmed, checked_in, in_queue, completed, cancelled, no_show]
    default: booked
    index: true
  confirmed_at:
    type: datetime
    nullable: true
  cancelled_at:
    type: datetime
    nullable: true
  cancellation_reason:
    type: string
    nullable: true
  chief_complaint:
    type: text
    nullable: true
  notes:
    type: text
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_appointment_patient_date
    fields: [patient_id, appointment_date]
  - name: idx_appointment_polyclinic_date
    fields: [polyclinic_id, appointment_date, status]
```

### Appointment Reminder

```yaml
table_name: appointment_reminders

fields:
  id:
    type: uuid
    primary_key: true
  appointment_id:
    type: uuid
    foreign_key: appointments.id
    index: true
  reminder_type:
    type: enum
    values: [confirmation, reminder_1day, reminder_2hour]
  channel:
    type: enum
    values: [sms, whatsapp, email]
  scheduled_at:
    type: datetime
    index: true
  sent_at:
    type: datetime
    nullable: true
  status:
    type: enum
    values: [pending, sent, delivered, failed]
    default: pending
  response:
    type: enum
    values: [confirmed, cancelled, no_response]
    nullable: true
  response_at:
    type: datetime
    nullable: true
  error_message:
    type: text
    nullable: true
```

---

## Business Rules

### Booking Window
- Minimum: 2 hours before appointment time
- Maximum: 30 days ahead
- BPJS appointments: 7 days ahead maximum

### Cancellation Policy
- Free cancellation up to 24 hours before
- Late cancellation logged for tracking no-shows
- Slot automatically released on cancellation

### Reminder Schedule
1. **Confirmation**: Immediately after booking
2. **1-day reminder**: 24 hours before
3. **2-hour reminder**: 2 hours before (optional based on preferences)

### Slot Allocation
- Each practitioner schedule defines available slots
- Slots marked as booked when appointment created
- Slots released if appointment cancelled/no-show
- Priority queue patients may bypass normal slots

### BPJS Integration
- BPJS appointments require valid referral number
- Referral validity checked against BPJS API
- BPJS appointments limited to specific polyclinics

---

## Dependencies

- FEATURE-1.1: Patient Registration
- FEATURE-2.2: Practitioner Management (schedules)
- SMS/WhatsApp gateway for reminders

## Enables

- FEATURE-3.2: Queue Management
- All clinical encounters

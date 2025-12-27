# Appointment & Queue System

> **Module**: 03 - Appointment & Queue
> **Stories**: US-3.1 to US-3.6
> **Priority**: P0 (Critical)
> **Features**: Online booking, Walk-in queue, Queue display, Queue calling with audio

---

## US-3.1: Online Appointment Booking

### User Story
**As a** patient
**I want to** book appointments online
**So that** I can schedule visits without coming to the clinic

### Acceptance Criteria

- [ ] **GIVEN** patient accesses booking system
      **WHEN** selecting polyclinic, practitioner, date
      **THEN** system shows available time slots

- [ ] **GIVEN** slot is selected
      **WHEN** patient confirms booking
      **THEN** system creates appointment with confirmation number
      **AND** sends SMS/WhatsApp confirmation

### Booking Flow
1. Select polyclinic (Poli Umum, Poli Gigi, Poli KIA)
2. Select practitioner (optional, or "any available")
3. Select date (max 7 days ahead)
4. Select time slot
5. Confirm patient identity (NIK or MRN)
6. Receive confirmation

### Data Model

```yaml
appointment:
  id: uuid
  confirmation_number: string (format: APT-YYYYMMDD-XXXX)

  # Patient
  patient_id: uuid (FK)

  # Schedule
  polyclinic_id: uuid (FK)
  practitioner_id: uuid (FK, nullable if "any")
  appointment_date: date
  start_time: time
  end_time: time
  slot_id: uuid (FK to appointment_slot)

  # Booking info
  booking_source: enum (online/phone/walk_in)
  booking_date: datetime
  booked_by: uuid (FK, nullable for online)

  # BPJS
  is_bpjs: boolean (default: false)
  bpjs_referral_number: string (nullable)

  # Status
  status: enum (booked/confirmed/checked_in/in_queue/completed/cancelled/no_show)
  confirmed_at: datetime (nullable)
  cancelled_at: datetime (nullable)
  cancellation_reason: string (nullable)

  # Notes
  chief_complaint: text (nullable)
  notes: text (nullable)

  created_at: datetime
  updated_at: datetime

appointment_reminder:
  id: uuid
  appointment_id: uuid (FK)
  reminder_type: enum (confirmation/reminder_1day/reminder_2hour)
  channel: enum (sms/whatsapp)
  scheduled_at: datetime
  sent_at: datetime (nullable)
  status: enum (pending/sent/delivered/failed)
  response: enum (confirmed/cancelled/no_response, nullable)
```

---

## US-3.2: Walk-in Registration & Queue

### User Story
**As a** front desk staff
**I want to** register walk-in patients to the queue
**So that** patients are served in orderly sequence

### Acceptance Criteria

- [ ] **GIVEN** walk-in patient arrives
      **WHEN** staff registers to queue
      **THEN** system assigns queue number with prefix based on polyclinic

- [ ] **GIVEN** queue number is assigned
      **WHEN** patient receives ticket
      **THEN** ticket shows queue number, polyclinic, estimated wait time

### Queue Number Format
- **Poli Umum**: A001, A002, ...
- **Poli Gigi**: B001, B002, ...
- **Poli KIA**: C001, C002, ...
- **Priority**: P001, P002, ... (elderly, disabled)

### Data Model

```yaml
queue:
  id: uuid
  queue_number: string (format: X999)
  queue_date: date

  # Patient & Visit
  patient_id: uuid (FK)
  appointment_id: uuid (FK, nullable for walk-in)
  polyclinic_id: uuid (FK)
  practitioner_id: uuid (FK, assigned practitioner)

  # Priority
  priority: enum (normal/priority)
  priority_reason: enum (elderly/disabled/emergency, nullable)

  # Status & Timestamps
  status: enum (waiting/called/serving/completed/skipped/transferred)
  check_in_time: datetime
  called_time: datetime (nullable)
  called_count: integer (default: 0)
  serve_start_time: datetime (nullable)
  serve_end_time: datetime (nullable)

  # Estimation
  estimated_wait_minutes: integer
  actual_wait_minutes: integer (calculated)
  service_duration_minutes: integer (calculated)

  # Staff
  checked_in_by: uuid (FK)
  served_by: uuid (FK, nullable - practitioner)

  # Transfer
  transferred_from_queue_id: uuid (FK, nullable)
  transfer_reason: string (nullable)

  notes: text (nullable)
  created_at: datetime
  updated_at: datetime

  # Indexes
  # - queue_date, polyclinic_id, status (for display)
  # - queue_date, queue_number (uniqueness per day)
```

---

## US-3.3: Queue Display System

### User Story
**As a** waiting patient
**I want to** see queue status on display screen
**So that** I know when my turn is approaching

### Acceptance Criteria

- [ ] **GIVEN** display is configured for polyclinic
      **WHEN** queue status changes
      **THEN** display updates in real-time via WebSocket

- [ ] **GIVEN** patient is called
      **WHEN** queue display updates
      **THEN** called queue number is highlighted/flashing

### Display Layout

```
┌────────────────────────────────────────────────────────┐
│                    POLI UMUM                           │
├────────────────────────────────────────────────────────┤
│  NOW SERVING          │  WAITING                       │
│  ┌─────────────┐      │  A003  A004  A005  A006       │
│  │    A002     │      │  A007  A008  A009  A010       │
│  │  Room 1     │      │                               │
│  └─────────────┘      │  Total waiting: 8             │
│                       │  Est. wait: ~25 min           │
├────────────────────────────────────────────────────────┤
│  Recently Called: A001 (skipped)                       │
├────────────────────────────────────────────────────────┤
│         Date: 26 Dec 2025    Time: 09:45              │
└────────────────────────────────────────────────────────┘
```

### Data Model

```yaml
queue_display_config:
  id: uuid
  polyclinic_id: uuid (FK)
  device_name: string
  device_id: string (unique)
  display_type: enum (tv/monitor/tablet)

  # Layout settings
  show_waiting_count: boolean (default: true)
  show_estimated_wait: boolean (default: true)
  show_recent_called: boolean (default: true)
  max_waiting_display: integer (default: 10)

  # Audio settings
  audio_enabled: boolean (default: true)
  audio_voice: enum (male/female)
  audio_language: enum (id/en)
  audio_volume: integer (0-100, default: 80)

  is_active: boolean (default: true)
  last_heartbeat: datetime

queue_display_state:
  polyclinic_id: uuid (FK)
  current_serving: array[queue_display_item]
  waiting: array[queue_display_item]
  recently_called: array[queue_display_item]
  total_waiting: integer
  estimated_wait_minutes: integer
  updated_at: datetime

queue_display_item:
  queue_number: string
  patient_name: string (first name only for privacy)
  status: string
  room: string (nullable)
```

---

## US-3.4: Queue Calling with Audio

### User Story
**As a** clinical staff
**I want to** call patients from the queue with audio announcement
**So that** patients are notified even if not watching the display

### Acceptance Criteria

- [ ] **GIVEN** next patient is to be called
      **WHEN** staff clicks "Call Next" or selects specific queue
      **THEN** audio announcement plays on speakers
      **AND** display updates with called number

- [ ] **GIVEN** patient doesn't respond
      **WHEN** staff re-calls (max 3 times)
      **THEN** system tracks call count
      **AND** allows skip after 3 calls

### Audio Announcement Format
```
"Nomor antrian [A zero zero two],
 silakan menuju [Poli Umum],
 [Ruang satu]"

"Queue number [A zero zero two],
 please proceed to [General Clinic],
 [Room one]"
```

### Queue Actions
1. **Call Next** - Automatically calls next in queue
2. **Call Specific** - Call specific queue number
3. **Re-call** - Call same number again
4. **Skip** - Mark as skipped (after 3 calls)
5. **Start Serving** - Begin consultation
6. **Complete** - Finish consultation
7. **Transfer** - Move to another polyclinic

### Data Model

```yaml
queue_call_log:
  id: uuid
  queue_id: uuid (FK)
  call_number: integer (1, 2, 3)
  called_at: datetime
  called_by: uuid (FK to user)
  room: string (nullable)
  audio_played: boolean

queue_action_log:
  id: uuid
  queue_id: uuid (FK)
  action: enum (check_in/call/recall/skip/start_serve/complete/transfer/cancel)
  performed_at: datetime
  performed_by: uuid (FK to user)
  notes: text (nullable)
```

### WebSocket Events

```yaml
# Server -> Client (Display)
queue_update:
  event: "queue:update"
  data:
    polyclinic_id: uuid
    current_serving: array
    waiting: array
    action: enum (called/completed/skipped)
    queue_number: string

# Server -> Client (Audio trigger)
queue_call:
  event: "queue:call"
  data:
    polyclinic_id: uuid
    queue_number: string
    patient_name: string
    room: string
    call_count: integer
    audio_text_id: string
    audio_text_en: string
```

---

## US-3.5: Queue Management Dashboard

### User Story
**As a** front desk supervisor
**I want to** monitor queue status across all polyclinics
**So that** I can manage patient flow efficiently

### Acceptance Criteria

- [ ] **GIVEN** supervisor opens dashboard
      **WHEN** viewing queue status
      **THEN** system shows all polyclinics with real-time counts

- [ ] **GIVEN** polyclinic has long wait
      **WHEN** wait time exceeds threshold
      **THEN** system shows warning indicator

### Dashboard Metrics

```yaml
queue_dashboard:
  polyclinics:
    - polyclinic_id: uuid
      polyclinic_name: string

      # Current status
      currently_serving: integer
      total_waiting: integer
      avg_wait_minutes: decimal
      avg_service_minutes: decimal

      # Today's stats
      total_registered: integer
      total_completed: integer
      total_no_show: integer

      # Practitioners on duty
      practitioners:
        - id: uuid
          name: string
          status: enum (available/serving/break)
          current_patient: string (nullable)
          patients_served: integer

  # Alerts
  alerts:
    - polyclinic_id: uuid
      alert_type: enum (long_wait/high_volume/staff_shortage)
      message: string
```

---

## US-3.6: Appointment Reminders

### User Story
**As a** patient with appointment
**I want to** receive reminders
**So that** I don't forget my scheduled visit

### Acceptance Criteria

- [ ] **GIVEN** appointment is booked
      **WHEN** 1 day before appointment
      **THEN** system sends reminder via SMS/WhatsApp

- [ ] **GIVEN** reminder is sent
      **WHEN** patient replies "1" to confirm or "2" to cancel
      **THEN** system updates appointment status

### Reminder Schedule
1. **Confirmation** - Immediately after booking
2. **1-day reminder** - 24 hours before
3. **2-hour reminder** - 2 hours before (optional)

### Message Templates

```
KONFIRMASI APPOINTMENT
Terima kasih telah mendaftar.
Jadwal: {date} {time}
Poli: {polyclinic}
Dokter: {practitioner}
No. Konfirmasi: {confirmation_number}

PENGINGAT APPOINTMENT
Yth. {patient_name},
Anda memiliki jadwal besok:
Tanggal: {date}
Jam: {time}
Poli: {polyclinic}

Balas:
1 = Konfirmasi hadir
2 = Batalkan

{clinic_name}
```

---

## Technical Requirements

### Real-time Updates
- WebSocket for queue display updates
- Event-driven architecture for queue state changes
- Sub-100ms latency for display updates

### Audio System
- Text-to-Speech (TTS) engine for announcements
- Support Indonesian and English
- Queue to prevent overlapping announcements
- Fallback to pre-recorded audio if TTS fails

### Hardware Integration
- Queue ticket printer (thermal printer)
- Display monitors (HDMI via media player or smart TV)
- Audio speakers (connected to server or display device)

---

## Dependencies
- Patient Management (patient data)
- Practitioners & Polyclinics (schedule)

## Blocks
- Medical Services (starts from queue)

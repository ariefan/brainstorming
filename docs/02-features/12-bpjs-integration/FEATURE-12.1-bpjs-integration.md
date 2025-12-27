# FEATURE-12.1: BPJS Kesehatan Integration

> **Module**: BPJS Integration
> **Related User Stories**: US-12.1, US-12.2, US-12.3, US-12.4, US-12.5, US-12.6, US-12.7, US-12.8
> **Implementation Priority**: P0 (Critical)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive integration with BPJS Kesehatan (Indonesian National Health Insurance) including VClaim for eligibility and SEP management, PCare for primary care visits, Antrean for Mobile JKN queue booking, INA-CBG for inpatient claims, and monitoring dashboards for claim status tracking.

### Business Value
Enables clinic to serve BPJS patients with proper eligibility verification, automated SEP creation, referral management, and claim submission. Ensures regulatory compliance and revenue optimization through proper claim documentation.

### User Impact
Registration staff can verify patient eligibility instantly, create SEPs, and manage referrals. Case managers can track INA-CBG claims and monitor revenue. Patients booking via Mobile JKN are seamlessly integrated into clinic queue.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-12.1 | Authentication & Credentials Setup | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-121-authentication--credentials-setup) |
| US-12.2 | Kepesertaan (Eligibility Check) | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-122-kepesertaan-eligibility-check) |
| US-12.3 | SEP Management | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-123-sep-surat-eligibilitas-peserta) |
| US-12.4 | Rujukan Management | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-124-rujukan-referral-management) |
| US-12.5 | Antrean Online | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-125-antrean-online-mobile-jkn-queue) |
| US-12.6 | PCare Integration | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-126-pcare-primary-care) |
| US-12.7 | INA-CBG / E-Klaim | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-127-ina-cbg--e-klaim-inpatient-claims) |
| US-12.8 | Monitoring & Reporting | [View](../../01-user-stories/12-bpjs-integration/US-12.1-12.8-bpjs-integration.md#us-128-monitoring--reporting) |

---

## API Endpoints Overview

### Internal APIs (Clinic System)

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/bpjs/config` | Get BPJS configuration | Yes | Admin |
| POST | `/api/v1/bpjs/config` | Configure BPJS credentials | Yes | Owner, Admin |
| POST | `/api/v1/bpjs/config/test` | Test connection | Yes | Admin |
| GET | `/api/v1/bpjs/peserta/card/{noKartu}` | Check eligibility by card | Yes | All |
| GET | `/api/v1/bpjs/peserta/nik/{nik}` | Check eligibility by NIK | Yes | All |
| POST | `/api/v1/bpjs/sep` | Create SEP | Yes | Front Desk, Admin |
| GET | `/api/v1/bpjs/sep/{noSep}` | Get SEP details | Yes | All |
| PUT | `/api/v1/bpjs/sep/{noSep}` | Update SEP | Yes | Front Desk, Admin |
| DELETE | `/api/v1/bpjs/sep/{noSep}` | Delete SEP | Yes | Admin |
| GET | `/api/v1/bpjs/rujukan/peserta/{noKartu}` | Get patient referrals | Yes | All |
| GET | `/api/v1/bpjs/rujukan/{noRujukan}` | Get referral details | Yes | All |
| POST | `/api/v1/bpjs/rujukan` | Create internal referral | Yes | Doctor |
| GET | `/api/v1/bpjs/antrean` | List Mobile JKN queue | Yes | Front Desk |
| POST | `/api/v1/bpjs/antrean/checkin` | Check-in patient | Yes | Front Desk |
| POST | `/api/v1/bpjs/antrean/task` | Update task timestamp | Yes | All |
| POST | `/api/v1/bpjs/pcare/kunjungan` | Create PCare visit | Yes | Doctor |
| GET | `/api/v1/bpjs/pcare/kunjungan/{noKunjungan}` | Get PCare visit | Yes | All |
| POST | `/api/v1/bpjs/inacbg/grouping` | Run INA-CBG grouper | Yes | Admin |
| GET | `/api/v1/bpjs/inacbg/claim/{noSep}` | Get claim status | Yes | Admin |
| GET | `/api/v1/bpjs/monitoring/klaim` | Claim monitoring | Yes | Admin |
| GET | `/api/v1/bpjs/dashboard` | BPJS dashboard | Yes | Admin |

### External APIs (Mobile JKN Provider)

These endpoints must be provided by the clinic system for BPJS to call:

| Method | Path | Description |
|--------|------|-------------|
| POST | `/ws/bpjs/auth` | Generate token for BPJS |
| GET | `/ws/bpjs/ref/poli` | List polyclinics |
| GET | `/ws/bpjs/ref/dokter` | List doctors |
| GET | `/ws/bpjs/ref/jadwaldokter` | Doctor schedules |
| POST | `/ws/bpjs/antrean/add` | Create queue (from Mobile JKN) |
| GET | `/ws/bpjs/antrean/status` | Get queue status |
| GET | `/ws/bpjs/antrean/sisa` | Get remaining queue |
| POST | `/ws/bpjs/antrean/batal` | Cancel queue |
| POST | `/ws/bpjs/antrean/checkin` | Patient check-in |

---

## Detailed Endpoint Specifications

### POST /api/v1/bpjs/config

```yaml
method: POST
path: /api/v1/bpjs/config
description: Configure BPJS API credentials

authentication:
  required: true
  roles: [owner, admin]

request:
  body:
    type: object
    required: [cons_id, secret_key, ppk_code, facility_type]
    properties:
      cons_id:
        type: string
        description: Consumer ID from BPJS
      secret_key:
        type: string
        description: Secret key for signature
      vclaim_user_key:
        type: string
      pcare_user_key:
        type: string
        nullable: true
      antrean_user_key:
        type: string
        nullable: true
      pcare_username:
        type: string
        nullable: true
      pcare_password:
        type: string
        nullable: true
      pcare_app_code:
        type: string
        nullable: true
      ppk_code:
        type: string
        description: Facility code
      ppk_name:
        type: string
      facility_type:
        type: enum
        values: [fktp, fkrtl]
      environment:
        type: enum
        values: [development, production]
        default: development

response:
  success:
    status: 201
    body:
      id: uuid
      ppk_code: string
      ppk_name: string
      facility_type: enum
      environment: enum
      health_status: enum
      is_active: boolean
```

### GET /api/v1/bpjs/peserta/card/{noKartu}

```yaml
method: GET
path: /api/v1/bpjs/peserta/card/{noKartu}
description: Check BPJS eligibility by card number

authentication:
  required: true
  roles: [All]

request:
  path_params:
    noKartu:
      type: string
      pattern: "^[0-9]{13}$"
      description: BPJS card number (13 digits)
  query_params:
    tglSEP:
      type: date
      default: today
      description: Service date for eligibility check

response:
  success:
    status: 200
    body:
      is_eligible: boolean
      peserta:
        no_kartu: string
        nik: string
        nama: string
        tgl_lahir: date
        jenis_kelamin: enum (L/P)
        status_peserta:
          kode: string
          keterangan: string
        jenis_peserta:
          kode: string
          keterangan: string
        hak_kelas:
          kode: enum (1/2/3)
          keterangan: string
        prov_umum:
          kd_provider: string
          nm_provider: string
        cob:
          nm_asuransi: string (nullable)
          no_asuransi: string (nullable)

  errors:
    - status: 404
      code: PESERTA_NOT_FOUND
      message: "Peserta tidak ditemukan"
    - status: 400
      code: PESERTA_INACTIVE
      message: "Kartu BPJS tidak aktif"
```

### POST /api/v1/bpjs/sep

```yaml
method: POST
path: /api/v1/bpjs/sep
description: Create SEP (Surat Eligibilitas Peserta)

authentication:
  required: true
  roles: [front_desk, admin]

request:
  body:
    type: object
    required: [no_kartu, tgl_sep, jns_pelayanan, diag_awal, poli_tujuan, dpjp_layan]
    properties:
      no_kartu:
        type: string
      tgl_sep:
        type: date
      jns_pelayanan:
        type: enum
        values: [1, 2]
        description: 1=Rawat Inap, 2=Rawat Jalan
      kls_rawat:
        type: object
        properties:
          kls_rawat_hak:
            type: enum
            values: [1, 2, 3]
          kls_rawat_naik:
            type: enum
            nullable: true
          pembiayaan:
            type: enum
            values: [1, 2, 3]
          penanggung_jawab:
            type: string
            nullable: true
      no_mr:
        type: string
      rujukan:
        type: object
        nullable: true
        properties:
          asal_rujukan:
            type: enum
            values: [1, 2]
          no_rujukan:
            type: string
          tgl_rujukan:
            type: date
          ppk_rujukan:
            type: string
      diag_awal:
        type: string
        description: ICD-10 code
      poli_tujuan:
        type: string
        description: Polyclinic code
      poli_eksekutif:
        type: boolean
        default: false
      tujuan_kunj:
        type: enum
        values: [0, 1, 2]
        default: 0
      laka_lantas:
        type: enum
        values: [0, 1, 2, 3]
        default: 0
      dpjp_layan:
        type: string
        description: Doctor code
      no_telp:
        type: string

response:
  success:
    status: 201
    body:
      no_sep: string
      tgl_sep: date
      no_kartu: string
      nama: string
      poli: string
      diagnosa: string
      kelas_rawat: string
      dpjp_layan: string

  errors:
    - status: 400
      code: SEP_EXISTS
      message: "SEP sudah ada untuk tanggal yang sama"
    - status: 400
      code: RUJUKAN_USED
      message: "Rujukan sudah digunakan 3 kali"
    - status: 400
      code: RUJUKAN_EXPIRED
      message: "Masa berlaku rujukan habis"
```

### GET /api/v1/bpjs/rujukan/peserta/{noKartu}

```yaml
method: GET
path: /api/v1/bpjs/rujukan/peserta/{noKartu}
description: Get patient's active referrals

authentication:
  required: true
  roles: [All]

request:
  path_params:
    noKartu:
      type: string

response:
  success:
    status: 200
    body:
      rujukan:
        - no_rujukan: string
          tgl_rujukan: date
          masa_berlaku: date
          ppk_asal: string
          nama_ppk_asal: string
          ppk_tujuan: string
          nama_ppk_tujuan: string
          poli_tujuan: string
          diagnosa: string
          jumlah_kunj: integer
          sisa_kunj: integer
          status: enum (active/used/expired)
```

### POST /ws/bpjs/antrean/add (Provider Endpoint)

```yaml
method: POST
path: /ws/bpjs/antrean/add
description: Receive queue booking from Mobile JKN (BPJS calls this)

authentication:
  required: true
  type: BPJS signature validation

request:
  body:
    type: object
    properties:
      nomorkartu:
        type: string
      nik:
        type: string
      nohp:
        type: string
      kodepoli:
        type: string
      norm:
        type: string
      tanggalperiksa:
        type: date
      kodedokter:
        type: string
      jampraktek:
        type: string
      jeniskunjungan:
        type: enum
        values: [1, 2, 3, 4]
      nomorreferensi:
        type: string

response:
  success:
    status: 200
    body:
      metadata:
        code: 200
        message: "OK"
      response:
        nomorantrean: string
        angkaantrean: integer
        kodebooking: string
        norm: string
        namapoli: string
        namadokter: string
        estimasidilayani: bigint
        siession: string
        kuotajkn: integer
        sisaquotajkn: integer
        kuotanonjkn: integer
        sisaquotanonjkn: integer
```

### POST /api/v1/bpjs/inacbg/grouping

```yaml
method: POST
path: /api/v1/bpjs/inacbg/grouping
description: Run INA-CBG grouper for inpatient claim

authentication:
  required: true
  roles: [admin]

request:
  body:
    type: object
    required: [admission_id]
    properties:
      admission_id:
        type: uuid

response:
  success:
    status: 200
    body:
      inacbg_code: string
      inacbg_description: string
      severity_level: enum (I/II/III)
      tarif_inacbg: decimal
      diagnoses:
        - code: string
          name: string
          type: enum (primary/secondary)
      procedures:
        - code: string
          name: string

  errors:
    - status: 400
      code: INCOMPLETE_DATA
      message: "Diagnosis atau prosedur tidak lengkap"
```

### GET /api/v1/bpjs/dashboard

```yaml
method: GET
path: /api/v1/bpjs/dashboard
description: BPJS dashboard with real-time metrics

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    period:
      type: enum
      values: [today, this_week, this_month]
      default: today

response:
  success:
    status: 200
    body:
      today:
        sep_created: integer
        eligibility_checks: integer
        claims_submitted: integer
        pending_sync: integer
      monthly:
        total_bpjs_patients: integer
        total_revenue_claimed: decimal
        total_revenue_approved: decimal
        approval_rate: decimal
      aging:
        - bucket: string
          count: integer
          amount: decimal
      alerts:
        - type: string
          severity: enum
          message: string
          count: integer
```

---

## Data Models

### BPJS Config

```yaml
table_name: bpjs_configs

fields:
  id:
    type: uuid
    primary_key: true
  organization_id:
    type: uuid
    foreign_key: organizations.id
    unique: true
  cons_id:
    type: string(50)
    encrypted: true
  secret_key:
    type: string(255)
    encrypted: true
  vclaim_user_key:
    type: string(100)
    encrypted: true
  pcare_user_key:
    type: string(100)
    encrypted: true
    nullable: true
  antrean_user_key:
    type: string(100)
    encrypted: true
    nullable: true
  pcare_username:
    type: string(100)
    encrypted: true
    nullable: true
  pcare_password:
    type: string(255)
    encrypted: true
    nullable: true
  pcare_app_code:
    type: string(20)
    nullable: true
  ppk_code:
    type: string(20)
  ppk_name:
    type: string(255)
  facility_type:
    type: enum
    values: [fktp, fkrtl]
  environment:
    type: enum
    values: [development, production]
  is_active:
    type: boolean
    default: true
  last_health_check:
    type: datetime
    nullable: true
  health_status:
    type: enum
    values: [healthy, degraded, unhealthy]
    default: healthy
  created_at:
    type: datetime
  updated_at:
    type: datetime
```

### BPJS Peserta

```yaml
table_name: bpjs_peserta

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
  no_kartu:
    type: string(13)
  nik:
    type: string(16)
  nama:
    type: string(255)
  status_peserta_code:
    type: string(5)
  status_peserta_keterangan:
    type: string(100)
  jenis_peserta_code:
    type: string(5)
  jenis_peserta_keterangan:
    type: string(100)
  hak_kelas:
    type: enum
    values: [1, 2, 3]
  tgl_lahir:
    type: date
  tgl_tmt:
    type: date
  tgl_tat:
    type: date
  prov_umum_code:
    type: string(20)
  prov_umum_name:
    type: string(255)
  cob_nama_asuransi:
    type: string(255)
    nullable: true
  cob_no_asuransi:
    type: string(50)
    nullable: true
  last_checked_at:
    type: datetime
  last_check_response:
    type: jsonb
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_peserta_patient
    fields: [patient_id]
  - name: idx_peserta_kartu
    fields: [no_kartu]
  - name: idx_peserta_nik
    fields: [nik]
```

### BPJS SEP

```yaml
table_name: bpjs_sep

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    nullable: true
  admission_id:
    type: uuid
    foreign_key: admissions.id
    nullable: true
  no_sep:
    type: string(30)
    unique: true
  tgl_sep:
    type: date
  no_kartu:
    type: string(13)
  jns_pelayanan:
    type: enum
    values: [rawat_inap, rawat_jalan]
  ppk_pelayanan:
    type: string(20)
  ppk_pelayanan_nama:
    type: string(255)
  kls_rawat_hak:
    type: enum
    values: [1, 2, 3]
  kls_rawat_naik:
    type: enum
    values: [1, 2, 3]
    nullable: true
  pembiayaan:
    type: enum
    values: [1, 2, 3]
  penanggung_jawab:
    type: string(255)
    nullable: true
  no_mr:
    type: string(30)
  asal_rujukan:
    type: enum
    values: [fktp, fkrtl]
    nullable: true
  no_rujukan:
    type: string(50)
    nullable: true
  tgl_rujukan:
    type: date
    nullable: true
  ppk_rujukan:
    type: string(20)
    nullable: true
  diag_awal:
    type: string(10)
  poli_tujuan:
    type: string(10)
  poli_eksekutif:
    type: boolean
    default: false
  dpjp_layan:
    type: string(20)
  dpjp_nama:
    type: string(255)
  tujuan_kunj:
    type: enum
    values: [normal, prosedur, konsul_dokter]
  laka_lantas:
    type: enum
    values: [bukan, kll, kk, kll_kk]
    default: bukan
  penjamin:
    type: string(50)
    nullable: true
  has_cob:
    type: boolean
    default: false
  is_katarak:
    type: boolean
    default: false
  status:
    type: enum
    values: [created, used, updated, deleted]
    default: created
  created_by:
    type: uuid
    foreign_key: users.id
  created_at:
    type: datetime
  updated_at:
    type: datetime
    nullable: true
  deleted_at:
    type: datetime
    nullable: true
  api_response:
    type: jsonb

indexes:
  - name: idx_sep_no
    fields: [no_sep]
    unique: true
  - name: idx_sep_patient
    fields: [patient_id]
  - name: idx_sep_encounter
    fields: [encounter_id]
  - name: idx_sep_date
    fields: [tgl_sep]
```

### BPJS Rujukan

```yaml
table_name: bpjs_rujukan

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    nullable: true
  no_rujukan:
    type: string(50)
  tgl_rujukan:
    type: date
  tgl_rencana_kunjungan:
    type: date
    nullable: true
  tipe_rujukan:
    type: enum
    values: [0, 1, 2]
  jns_pelayanan:
    type: enum
    values: [rawat_inap, rawat_jalan]
  ppk_asal:
    type: string(20)
  ppk_asal_nama:
    type: string(255)
  ppk_dirujuk:
    type: string(20)
  ppk_dirujuk_nama:
    type: string(255)
  poli_rujukan:
    type: string(10)
  diag_rujukan:
    type: string(10)
  catatan:
    type: text
  masa_berlaku:
    type: date
  jumlah_kunj:
    type: integer
    default: 0
  sisa_kunj:
    type: integer
    default: 3
  status:
    type: enum
    values: [active, used, expired, cancelled]
    default: active
  created_at:
    type: datetime
  created_by:
    type: uuid
    foreign_key: users.id
  api_response:
    type: jsonb

indexes:
  - name: idx_rujukan_no
    fields: [no_rujukan]
  - name: idx_rujukan_patient
    fields: [patient_id]
  - name: idx_rujukan_status
    fields: [status]
```

### BPJS Antrean

```yaml
table_name: bpjs_antrean

fields:
  id:
    type: uuid
    primary_key: true
  patient_id:
    type: uuid
    foreign_key: patients.id
    nullable: true
  encounter_id:
    type: uuid
    foreign_key: encounters.id
    nullable: true
  kode_booking:
    type: string(30)
    unique: true
  tanggal_periksa:
    type: date
  nomor_antrean:
    type: string(10)
  angka_antrean:
    type: integer
  no_kartu:
    type: string(13)
  nik:
    type: string(16)
  no_hp:
    type: string(20)
  norm:
    type: string(30)
  kode_poli:
    type: string(10)
  nama_poli:
    type: string(100)
  kode_dokter:
    type: string(20)
  nama_dokter:
    type: string(255)
  jam_praktek:
    type: string(20)
  jenis_kunjungan:
    type: enum
    values: [1, 2, 3, 4]
  nomor_referensi:
    type: string(50)
    nullable: true
  estimasi_dilayani:
    type: bigint
  kuota_jkn:
    type: integer
  sisa_kuota_jkn:
    type: integer
  kuota_non_jkn:
    type: integer
  sisa_kuota_non_jkn:
    type: integer
  status:
    type: enum
    values: [booked, checkin, called, serving, done, cancelled]
    default: booked
  waktu_task_1:
    type: datetime
    nullable: true
  waktu_task_2:
    type: datetime
    nullable: true
  waktu_task_3:
    type: datetime
    nullable: true
  waktu_task_4:
    type: datetime
    nullable: true
  waktu_task_5:
    type: datetime
    nullable: true
  waktu_task_6:
    type: datetime
    nullable: true
  waktu_task_7:
    type: datetime
    nullable: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_antrean_booking
    fields: [kode_booking]
    unique: true
  - name: idx_antrean_date
    fields: [tanggal_periksa]
  - name: idx_antrean_status
    fields: [status]
```

### BPJS INA-CBG Claim

```yaml
table_name: bpjs_inacbg_claims

fields:
  id:
    type: uuid
    primary_key: true
  admission_id:
    type: uuid
    foreign_key: admissions.id
  sep_id:
    type: uuid
    foreign_key: bpjs_sep.id
  patient_id:
    type: uuid
    foreign_key: patients.id
  no_sep:
    type: string(30)
  no_kartu:
    type: string(13)
  tgl_masuk:
    type: date
  tgl_pulang:
    type: date
  jenis_rawat:
    type: enum
    values: [rawat_inap, rawat_jalan]
  kelas_rawat:
    type: enum
    values: [1, 2, 3]
  icu_indicator:
    type: boolean
    default: false
  icu_los:
    type: integer
    default: 0
  ventilator_hour:
    type: integer
    default: 0
  diagnosa_primer:
    type: string(10)
  diagnosa_sekunder:
    type: jsonb
  procedure_primer:
    type: string(10)
    nullable: true
  procedure_sekunder:
    type: jsonb
  inacbg_code:
    type: string(20)
    nullable: true
  inacbg_description:
    type: string(255)
    nullable: true
  severity_level:
    type: enum
    values: [I, II, III]
    nullable: true
  tarif_inacbg:
    type: decimal(15,2)
    nullable: true
  tarif_rs:
    type: decimal(15,2)
    nullable: true
  tarif_final:
    type: decimal(15,2)
    nullable: true
  satusehat_encounter_id:
    type: string(100)
    nullable: true
  satusehat_claim_id:
    type: string(100)
    nullable: true
  grouper_status:
    type: enum
    values: [pending, grouped, submitted, purified, verified, paid, rejected]
    default: pending
  grouped_at:
    type: datetime
    nullable: true
  submitted_at:
    type: datetime
    nullable: true
  verification_status:
    type: enum
    values: [pending, approved, partial, rejected]
    nullable: true
  verified_amount:
    type: decimal(15,2)
    nullable: true
  rejection_reason:
    type: text
    nullable: true
  api_response:
    type: jsonb
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_claim_admission
    fields: [admission_id]
  - name: idx_claim_sep
    fields: [no_sep]
  - name: idx_claim_status
    fields: [grouper_status]
```

---

## BPJS API Authentication

### Signature Generation

```yaml
authentication:
  headers:
    X-cons-id: "{consumer_id}"
    X-timestamp: "{unix_timestamp_seconds}"
    X-signature: "{base64(HMAC-SHA256(cons_id + '&' + timestamp, secret_key))}"
    user_key: "{user_key}"
    Content-Type: "application/json"

signature_algorithm:
  1. Get current Unix timestamp in seconds
  2. Create message: cons_id + "&" + timestamp
  3. Generate HMAC-SHA256 using secret_key
  4. Base64 encode the result
```

### Response Decryption

```yaml
decryption:
  algorithm: AES-256-CBC
  key_generation:
    - Create SHA-256 hash of: cons_id + secret_key + timestamp
    - Use first 32 bytes as key
    - Use first 16 bytes of key as IV
  process:
    1. Base64 decode response
    2. Decrypt using AES-256-CBC
    3. Parse JSON result
```

---

## Business Rules

### SEP Creation
- Patient must have active BPJS membership
- Rujukan required for FKRTL (except emergency)
- Rujukan can be used maximum 3 times
- Rujukan validity: 90 days
- Only one SEP per patient per day per facility

### Room Class Rules
- Patient entitled to class based on membership tier
- Upgrade (naik kelas) requires additional payment
- Downgrade not allowed

### Referral Rules
- FKTP can refer to any FKRTL
- FKRTL internal referral for different specialty
- PRB (Program Rujuk Balik) for chronic conditions

### Antrean Task Flow

| Task ID | Description | Timestamp |
|---------|-------------|-----------|
| 1 | Check-in | waktu_task_1 |
| 2 | Admisi done | waktu_task_2 |
| 3 | Poli waiting | waktu_task_3 |
| 4 | Doctor start | waktu_task_4 |
| 5 | Doctor done | waktu_task_5 |
| 6 | Pharmacy start | waktu_task_6 |
| 7 | Complete | waktu_task_7 |
| 99 | Cancelled | - |

### INA-CBG Claims
- Claim validation requires Satusehat Encounter ID
- Severity level affects tariff (I < II < III)
- Top-up available for specific procedures

---

## Error Codes Reference

| Code | Description | Action |
|------|-------------|--------|
| 100 | Peserta tidak ditemukan | Verify BPJS number/NIK |
| 101 | Kartu tidak aktif | Inform patient |
| 102 | SEP sudah ada | Check existing SEP |
| 103 | Rujukan sudah digunakan | Get new rujukan |
| 104 | Rujukan tidak ditemukan | Verify rujukan number |
| 105 | Masa berlaku rujukan habis | Get new rujukan |
| 106 | PPK tidak sesuai | Check facility code |
| 107 | Kelas rawat melebihi hak | Adjust or upgrade |
| 108 | Peserta dirujuk bukan ke Faskes ini | Check referral destination |

---

## Dependencies

- FEATURE-1.1: Patient Registration (NIK, BPJS number)
- FEATURE-11.1: Satusehat Integration (Encounter ID for claims)
- FEATURE-4.1: Clinical Encounter (diagnoses, procedures)
- FEATURE-10.1: Billing (tariff integration)

## Enables

- FEATURE-13.1: Reporting (BPJS revenue reports)
- Financial reconciliation
- Claim analytics

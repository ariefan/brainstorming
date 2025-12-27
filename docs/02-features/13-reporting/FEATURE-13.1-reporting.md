# FEATURE-13.1: Reporting & Analytics

> **Module**: Reporting & Analytics
> **Related User Stories**: US-13.1, US-13.2, US-13.3, US-13.4, US-13.5
> **Implementation Priority**: P1 (High)
> **Status**: 📝 Design

---

## Feature Overview

### Description
Comprehensive reporting and analytics including daily operational reports, disease statistics (10 Besar Penyakit), KIA & immunization indicators, BPJS claims reports, and regulatory reports for Dinas Kesehatan (SP2TP, LB1-LB4).

### Business Value
Enables data-driven decision making through operational insights, supports regulatory compliance with government reporting requirements, and provides visibility into clinic performance, disease patterns, and revenue metrics.

### User Impact
Clinic managers can monitor daily operations, KIA coordinators can track maternal and child health indicators, billing managers can analyze BPJS claim performance, and administrators can generate regulatory reports.

---

## Related User Stories

| Story ID | Story Title | Link |
|----------|-------------|------|
| US-13.1 | Daily Operational Reports | [View](../../01-user-stories/13-reporting/US-13.1-13.5-reporting.md#us-131-daily-operational-reports) |
| US-13.2 | Disease Statistics | [View](../../01-user-stories/13-reporting/US-13.1-13.5-reporting.md#us-132-disease-statistics-10-besar-penyakit) |
| US-13.3 | KIA & Immunization Indicators | [View](../../01-user-stories/13-reporting/US-13.1-13.5-reporting.md#us-133-kia--immunization-indicators) |
| US-13.4 | BPJS Claims Report | [View](../../01-user-stories/13-reporting/US-13.1-13.5-reporting.md#us-134-bpjs-claims-report) |
| US-13.5 | Dinas Kesehatan Reports | [View](../../01-user-stories/13-reporting/US-13.1-13.5-reporting.md#us-135-dinas-kesehatan-reports) |

---

## API Endpoints Overview

| Method | Path | Description | Auth | Roles |
|--------|------|-------------|------|-------|
| GET | `/api/v1/reports/daily/visits` | Daily visit report | Yes | Admin |
| GET | `/api/v1/reports/daily/revenue` | Daily revenue report | Yes | Admin |
| GET | `/api/v1/reports/daily/pharmacy` | Daily pharmacy report | Yes | Admin, Pharmacist |
| GET | `/api/v1/reports/daily/lab` | Daily lab report | Yes | Admin, Lab Manager |
| GET | `/api/v1/reports/disease-statistics` | Disease statistics | Yes | Admin |
| GET | `/api/v1/reports/disease-statistics/top10` | Top 10 diseases | Yes | Admin |
| GET | `/api/v1/reports/kia/anc` | Antenatal care report | Yes | Admin, Midwife |
| GET | `/api/v1/reports/kia/pnc` | Postnatal care report | Yes | Admin, Midwife |
| GET | `/api/v1/reports/kia/immunization` | Immunization report | Yes | Admin, Nurse |
| GET | `/api/v1/reports/kia/child-growth` | Child growth report | Yes | Admin, Nurse |
| GET | `/api/v1/reports/bpjs/monthly` | BPJS monthly report | Yes | Admin |
| GET | `/api/v1/reports/bpjs/claims-status` | Claims status report | Yes | Admin |
| GET | `/api/v1/reports/bpjs/rejection-analysis` | Rejection analysis | Yes | Admin |
| GET | `/api/v1/reports/dinkes/lb1` | LB1 Kesakitan | Yes | Admin |
| GET | `/api/v1/reports/dinkes/lb2` | LB2 Obat | Yes | Admin |
| GET | `/api/v1/reports/dinkes/lb3` | LB3 Gizi | Yes | Admin |
| GET | `/api/v1/reports/dinkes/lb4` | LB4 KIA | Yes | Admin |
| GET | `/api/v1/reports/dinkes/sp2tp` | SP2TP Report | Yes | Admin |
| GET | `/api/v1/reports/satusehat-summary` | Satusehat sync report | Yes | Admin |
| GET | `/api/v1/dashboard/executive` | Executive dashboard | Yes | Admin, Owner |
| POST | `/api/v1/reports/generate` | Generate report | Yes | Admin |
| GET | `/api/v1/reports/definitions` | List report definitions | Yes | Admin |
| GET | `/api/v1/reports/generated` | List generated reports | Yes | Admin |
| GET | `/api/v1/reports/generated/{id}/download` | Download report | Yes | Admin |
| POST | `/api/v1/reports/schedule` | Schedule report | Yes | Admin |
| GET | `/api/v1/reports/schedules` | List report schedules | Yes | Admin |

---

## Detailed Endpoint Specifications

### GET /api/v1/reports/daily/visits

```yaml
method: GET
path: /api/v1/reports/daily/visits
description: Daily visit summary report

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    date:
      type: date
      default: today
    branch_id:
      type: uuid
      nullable: true

response:
  success:
    status: 200
    body:
      report_date: date
      summary:
        total_visits: integer
        new_patients: integer
        returning_patients: integer
      visits_by_polyclinic:
        - polyclinic: string
          total: integer
          bpjs: integer
          general: integer
      visits_by_practitioner:
        - practitioner: string
          polyclinic: string
          total: integer
      visits_by_hour:
        - hour: integer
          count: integer
      queue_metrics:
        avg_wait_time_minutes: decimal
        avg_service_time_minutes: decimal
        max_wait_time_minutes: integer
        patients_skipped: integer
        patients_no_show: integer
```

### GET /api/v1/reports/disease-statistics/top10

```yaml
method: GET
path: /api/v1/reports/disease-statistics/top10
description: Top 10 diseases report (10 Besar Penyakit)

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    period_start:
      type: date
      required: true
    period_end:
      type: date
      required: true
    polyclinic_id:
      type: uuid
      nullable: true

response:
  success:
    status: 200
    body:
      period:
        start: date
        end: date
      polyclinic: string (nullable)
      top_diseases:
        - rank: integer
          icd10_code: string
          disease_name: string
          total_cases: integer
          new_cases: integer
          returning_cases: integer
          demographics:
            male_count: integer
            female_count: integer
            age_0_5: integer
            age_6_17: integer
            age_18_59: integer
            age_60_plus: integer
      monthly_trends:
        - month: string
          disease: string
          count: integer
```

### GET /api/v1/reports/kia/immunization

```yaml
method: GET
path: /api/v1/reports/kia/immunization
description: Immunization coverage report

authentication:
  required: true
  roles: [admin, nurse]

request:
  query_params:
    month:
      type: integer
      required: true
    year:
      type: integer
      required: true

response:
  success:
    status: 200
    body:
      period:
        month: integer
        year: integer
      target_population:
        - vaccine: string
          target_count: integer
      immunization_coverage:
        - vaccine: string
          target: integer
          achieved: integer
          coverage_percent: decimal
          dropout_rate: decimal
      vaccines_administered:
        - vaccine: string
          dose_1: integer
          dose_2: integer
          dose_3: integer
          booster: integer
      aefi:
        reported: integer
        serious: integer
```

### GET /api/v1/reports/bpjs/monthly

```yaml
method: GET
path: /api/v1/reports/bpjs/monthly
description: BPJS monthly claims report

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    month:
      type: integer
      required: true
    year:
      type: integer
      required: true

response:
  success:
    status: 200
    body:
      period:
        month: integer
        year: integer
      summary:
        total_bpjs_patients: integer
        total_sep_created: integer
      outpatient:
        visits: integer
        claims_submitted: integer
        claims_approved: integer
        claims_pending: integer
        claims_rejected: integer
        amount_claimed: decimal
        amount_approved: decimal
      inpatient:
        admissions: integer
        claims_submitted: integer
        claims_approved: integer
        claims_pending: integer
        claims_rejected: integer
        amount_claimed: decimal
        amount_approved: decimal
        avg_los_days: decimal
      inacbg_analysis:
        - cbg_code: string
          cbg_name: string
          count: integer
          avg_tariff: decimal
          total_tariff: decimal
      rejections:
        - reason: string
          count: integer
          amount: decimal
      claims_aging:
        under_7_days: integer
        7_to_30_days: integer
        over_30_days: integer
```

### GET /api/v1/reports/dinkes/sp2tp

```yaml
method: GET
path: /api/v1/reports/dinkes/sp2tp
description: SP2TP (Sistem Pencatatan dan Pelaporan Terpadu Puskesmas) report

authentication:
  required: true
  roles: [admin]

request:
  query_params:
    month:
      type: integer
      required: true
    year:
      type: integer
      required: true

response:
  success:
    status: 200
    body:
      period:
        month: integer
        year: integer
      facility:
        code: string
        name: string
      kunjungan:
        rawat_jalan: integer
        rawat_inap: integer
        rujukan_keluar: integer
        rujukan_masuk: integer
      kunjungan_by_age:
        - age_group: string
          male: integer
          female: integer
```

### GET /api/v1/dashboard/executive

```yaml
method: GET
path: /api/v1/dashboard/executive
description: Executive dashboard with real-time and aggregated metrics

authentication:
  required: true
  roles: [admin, owner]

response:
  success:
    status: 200
    body:
      realtime:
        patients_waiting: integer
        active_consultations: integer
        pharmacy_queue: integer
        lab_queue: integer
      today:
        total_visits: integer
        total_revenue: decimal
        bpjs_visits: integer
        new_registrations: integer
      monthly:
        visits_trend:
          - date: date
            count: integer
        revenue_trend:
          - date: date
            amount: decimal
        target_achievement: decimal
      alerts:
        - type: string
          message: string
          severity: enum (info/warning/critical)
          count: integer
```

### POST /api/v1/reports/generate

```yaml
method: POST
path: /api/v1/reports/generate
description: Generate a report

authentication:
  required: true
  roles: [admin]

request:
  body:
    type: object
    required: [report_code, period_start, period_end, format]
    properties:
      report_code:
        type: string
        description: Report definition code
      period_start:
        type: date
      period_end:
        type: date
      format:
        type: enum
        values: [pdf, excel, csv]
      parameters:
        type: object
        description: Additional report-specific parameters

response:
  success:
    status: 202
    body:
      id: uuid
      report_code: string
      status: "pending"
      requested_at: datetime
      estimated_completion: datetime

  errors:
    - status: 400
      code: INVALID_REPORT_CODE
      message: "Unknown report code"
    - status: 400
      code: INVALID_PERIOD
      message: "Period end must be after period start"
```

### GET /api/v1/reports/generated/{id}/download

```yaml
method: GET
path: /api/v1/reports/generated/{id}/download
description: Download generated report

authentication:
  required: true
  roles: [admin]

request:
  path_params:
    id:
      type: uuid

response:
  success:
    status: 200
    content_type: application/pdf | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | text/csv
    headers:
      Content-Disposition: "attachment; filename={report_name}.{ext}"
    body: binary

  errors:
    - status: 404
      code: REPORT_NOT_FOUND
      message: "Report not found"
    - status: 400
      code: REPORT_NOT_READY
      message: "Report generation still in progress"
```

---

## Data Models

### Report Definition

```yaml
table_name: report_definitions

fields:
  id:
    type: uuid
    primary_key: true
  report_code:
    type: string(50)
    unique: true
  report_name:
    type: string(255)
  report_name_id:
    type: string(255)
    description: Indonesian name
  report_category:
    type: enum
    values: [operational, clinical, financial, regulatory, kia]
  description:
    type: text
  frequency:
    type: enum
    values: [daily, weekly, monthly, on_demand]
  auto_generate:
    type: boolean
    default: false
  generate_day:
    type: integer
    nullable: true
  parameters:
    type: jsonb
    description: Configurable parameters schema
  output_formats:
    type: jsonb
    description: Array of supported formats
  template_path:
    type: string(500)
    nullable: true
  is_active:
    type: boolean
    default: true
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_report_def_code
    fields: [report_code]
    unique: true
  - name: idx_report_def_category
    fields: [report_category]
```

### Report Generation

```yaml
table_name: report_generations

fields:
  id:
    type: uuid
    primary_key: true
  report_definition_id:
    type: uuid
    foreign_key: report_definitions.id
  parameters:
    type: jsonb
  period_start:
    type: date
  period_end:
    type: date
  requested_at:
    type: datetime
  requested_by:
    type: uuid
    foreign_key: users.id
  generated_at:
    type: datetime
    nullable: true
  generation_status:
    type: enum
    values: [pending, processing, completed, failed]
    default: pending
  error_message:
    type: text
    nullable: true
  file_url:
    type: string(500)
    nullable: true
  file_format:
    type: enum
    values: [pdf, excel, csv]
  file_size_bytes:
    type: integer
    nullable: true
  expires_at:
    type: datetime
  created_at:
    type: datetime

indexes:
  - name: idx_report_gen_def
    fields: [report_definition_id]
  - name: idx_report_gen_status
    fields: [generation_status]
  - name: idx_report_gen_date
    fields: [requested_at]
```

### Report Schedule

```yaml
table_name: report_schedules

fields:
  id:
    type: uuid
    primary_key: true
  report_definition_id:
    type: uuid
    foreign_key: report_definitions.id
  frequency:
    type: enum
    values: [daily, weekly, monthly]
  schedule_time:
    type: time
  schedule_day:
    type: integer
    nullable: true
    description: 1-7 for weekly, 1-31 for monthly
  parameters:
    type: jsonb
    nullable: true
  output_format:
    type: enum
    values: [pdf, excel, csv]
    default: pdf
  auto_email:
    type: boolean
    default: false
  email_recipients:
    type: jsonb
    description: Array of email addresses
  is_active:
    type: boolean
    default: true
  last_run_at:
    type: datetime
    nullable: true
  next_run_at:
    type: datetime
  created_by:
    type: uuid
    foreign_key: users.id
  created_at:
    type: datetime
  updated_at:
    type: datetime

indexes:
  - name: idx_schedule_def
    fields: [report_definition_id]
  - name: idx_schedule_next
    fields: [next_run_at, is_active]
```

### Disease Statistics Cache

```yaml
table_name: disease_statistics_cache

fields:
  id:
    type: uuid
    primary_key: true
  period_type:
    type: enum
    values: [daily, weekly, monthly, yearly]
  period_date:
    type: date
  polyclinic_id:
    type: uuid
    nullable: true
  icd10_code:
    type: string(10)
  disease_name:
    type: string(255)
  total_cases:
    type: integer
    default: 0
  new_cases:
    type: integer
    default: 0
  returning_cases:
    type: integer
    default: 0
  male_count:
    type: integer
    default: 0
  female_count:
    type: integer
    default: 0
  age_0_5:
    type: integer
    default: 0
  age_6_17:
    type: integer
    default: 0
  age_18_59:
    type: integer
    default: 0
  age_60_plus:
    type: integer
    default: 0
  calculated_at:
    type: datetime
  branch_id:
    type: uuid
    foreign_key: branches.id

indexes:
  - name: idx_disease_stats_period
    fields: [period_type, period_date]
  - name: idx_disease_stats_icd
    fields: [icd10_code]
  - name: idx_disease_stats_poli
    fields: [polyclinic_id]
```

### KIA Indicators Cache

```yaml
table_name: kia_indicators_cache

fields:
  id:
    type: uuid
    primary_key: true
  period_month:
    type: integer
  period_year:
    type: integer
  indicator_type:
    type: enum
    values: [anc, pnc, immunization, child_growth]
  indicator_name:
    type: string(100)
  target_value:
    type: integer
    nullable: true
  achieved_value:
    type: integer
  coverage_percent:
    type: decimal(5,2)
    nullable: true
  additional_data:
    type: jsonb
  calculated_at:
    type: datetime
  branch_id:
    type: uuid
    foreign_key: branches.id

indexes:
  - name: idx_kia_period
    fields: [period_month, period_year]
  - name: idx_kia_type
    fields: [indicator_type]
```

---

## Report Definitions

### Operational Reports

| Report Code | Name | Frequency |
|-------------|------|-----------|
| `DAILY_VISIT` | Daily Visit Report | Daily |
| `DAILY_REVENUE` | Daily Revenue Report | Daily |
| `DAILY_PHARMACY` | Daily Pharmacy Report | Daily |
| `DAILY_LAB` | Daily Laboratory Report | Daily |
| `WEEKLY_SUMMARY` | Weekly Operational Summary | Weekly |

### Clinical Reports

| Report Code | Name | Frequency |
|-------------|------|-----------|
| `TOP10_DISEASE` | 10 Besar Penyakit | Monthly |
| `MORBIDITY` | Morbidity Report | Monthly |
| `CHRONIC_CONDITIONS` | Chronic Condition Registry | Monthly |

### KIA Reports

| Report Code | Name | Frequency |
|-------------|------|-----------|
| `KIA_ANC` | Antenatal Care Coverage | Monthly |
| `KIA_PNC` | Postnatal Care Coverage | Monthly |
| `KIA_IMMUNIZATION` | Immunization Coverage | Monthly |
| `KIA_GROWTH` | Child Growth Monitoring | Monthly |

### Financial Reports

| Report Code | Name | Frequency |
|-------------|------|-----------|
| `BPJS_MONTHLY` | BPJS Monthly Summary | Monthly |
| `BPJS_CLAIMS` | BPJS Claims Status | Weekly |
| `REVENUE_SUMMARY` | Revenue Summary | Monthly |

### Regulatory Reports

| Report Code | Name | Frequency |
|-------------|------|-----------|
| `LB1_KESAKITAN` | LB1 - Kesakitan | Monthly |
| `LB2_OBAT` | LB2 - Obat | Monthly |
| `LB3_GIZI` | LB3 - Gizi | Monthly |
| `LB4_KIA` | LB4 - KIA | Monthly |
| `SP2TP` | SP2TP Report | Monthly |
| `SATUSEHAT_SYNC` | Satusehat Sync Summary | Monthly |

---

## Business Rules

### Report Generation
- Reports can be generated on-demand or scheduled
- Generated reports are cached and expire after 7 days
- Large reports are processed asynchronously
- Report access is role-based

### Data Aggregation
- Disease statistics are pre-calculated and cached daily
- KIA indicators are refreshed monthly
- Real-time metrics pull directly from operational data
- Historical data preserved for trend analysis

### Regulatory Compliance
- Dinas Kesehatan reports follow standard LB1-LB4 format
- SP2TP format maintained for puskesmas compatibility
- Age group classifications follow MOH standards
- ICD-10 codes required for disease reporting

### Dashboard Refresh
- Real-time metrics: refresh every 30 seconds
- Today metrics: refresh every 5 minutes
- Monthly trends: refresh daily

---

## Age Group Classifications

| Group | Age Range | Indonesian Term |
|-------|-----------|-----------------|
| Infant | 0-11 months | Bayi |
| Toddler | 1-4 years | Balita |
| Child | 5-14 years | Anak |
| Adolescent | 15-19 years | Remaja |
| Adult | 20-59 years | Dewasa |
| Elderly | 60+ years | Lansia |

---

## Dependencies

- All clinical modules (data sources)
- FEATURE-10.1: Billing (financial data)
- FEATURE-12.1: BPJS Integration (claims data)
- FEATURE-11.1: Satusehat Integration (sync statistics)
- FEATURE-6.1: KIA Services (maternal child health data)

## Enables

- Decision support systems
- Predictive analytics
- Quality improvement programs
- Accreditation compliance
